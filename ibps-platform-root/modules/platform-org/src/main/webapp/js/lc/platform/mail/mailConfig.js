/**
 * 外部邮件用户设置
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-05-04 16:59:36
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	mailConfig  = new MailConfig();
	mailConfig.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#mailConfigGrid",// 列表对象
			PAGER : "#mailConfigPager",// 列表分页
			FORM : '#mailConfigForm'// 表单form
	};
	/**
	 * 外部邮件用户设置 对象
	 * @returns {MailConfig}
	 */
	MailConfig = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	MailConfig.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/mail/mailConfig/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','账号名称','外部邮件地址','是否默认','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 }, {
				                 	   name:'userName',
				                	   index: 'user_name_'
				                	}, {
				                 	   name:'mailAddress',
				                	   index: 'mail_address_'
				                	}, {
				                 	   name:'isDefault',
				                	   index: 'is_default_',
			                		   formatter : 'dataFormat',
										formatoptions : {
											value : [{
												name:"false",
												value:'否',
												css:'red'
											},{
												name:"true",
												value:'是',
												css:'green'
											}]
										}  
				                	},  {
										name : '__manage',
										width : 30,
										sortable:false,
										classes:'rowOps',
										formatter : 'manage',
										formatoptions :[{
											label:'编辑',
											classes:'btn btn-primary fa fa-edit',
											action:__ctx+'/platform/mail/mailConfig/edit.htm?id={id}'
										},{
											label:'删除',
											classes:'btn btn-primary fa fa-remove',
											action:__ctx+'/platform/mail/mailConfig/remove.htm?id={id}'
										},{
											label:'明细',
											classes:'btn btn-primary fa fa-detail',
											action: __ctx+'/platform/mail/mailConfig/get.htm?id={id}'
										}]
								} ]
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				$('#mailConfigForm').attr('action','save.htm');
				var $el = $(this);
				$el.button('loading'); 
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
                    	me._showResponse(responseText);
                    },
                    error: function(){
                    	$el.button('reset'); 
                    }
				});
				if (frm.valid())
					form.submit();
				else{
					$el.button('reset'); 
				}
			});
			// 处理表测试
			$(document).on('click', 'a.fa-bug', function() {
				$('#mailConfigForm').attr('action','test.htm');
				var $el = $(this);
				$el.button('loading'); 
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
                    	me._testShowResponse(responseText);
                    },
                    error: function(){
                    	$el.button('reset'); 
                    }
				});
				if (frm.valid())
					form.submit();
				else{
					$el.button('reset'); 
				}
			});
			
			//
			$(document).on('change', '#mailType', function() {
				var self = $(this),val= self.val(),other =  (val=='pop3'?'imap':'pop3');
				$("."+val).show();
				$("."+other).hide();
			});
			
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/mail/mailConfig/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		_testShowResponse:function(responseText){
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.alert(msg.getMessage());
			} else {
				DialogUtil.error(msg.getMessage(),msg.getCause());
			}
		}
	};
})();


