/**
 * ibps_system_identity【流水号】
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-16 10:27:35
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var identity  = new Identity();
	identity.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#identityGrid",// 列表对象
			PAGER : "#identityPager",// 列表分页
			FORM : '#identityForm'// 表单form
	};
	/**
	 * ibps_system_identity【流水号】 对象
	 * @returns {Identity}
	 */
	Identity = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Identity.prototype = {
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
						url :  __ctx+'/platform/system/identity/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','名称','别名','规则','生成类型','流水号长度','初始值','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'name',
				                 	   width : 30,
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'alias',
				                 	   width : 30,
				                	   index: 'alias_'
				                	 					                	 	}, {
				                 	   name:'regulation',
				                 	   width : 40,
				                	   index: 'regulation_'
				                	 					                	 	}, {
				                 	   name:'genType',
				                 	   width : 20,
				                	   index: 'gen_type_',
				                	   formatter : 'dataFormat',
									   formatoptions : {
											value : [{
												name:0,
												value:'每天生成',
												css:'red'
											},{
												name:1,
												value:'每月生成',
												css:'red'
											},{
												name:2,
												value:'每年生成',
												css:'red'
											},{
												name:3,
												value:'递增',
												css:'red'
											}]
									    }
				                	 					                	 	}, {
				                 	   name:'noLength',
				                 	  width : 30,
				                	   index: 'no_length_'
				                	 					                	 	}, {
				                 	   name:'initValue',
				                 	  width : 20,
				                	   index: 'init_value_'
				                	 					                	 	}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/system/identity/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/system/identity/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/system/identity/get.htm?id={id}'
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
				var $el = $(this);
				$el.button('loading');
				form.attr("action","save.htm");
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
			
			// 测试
			$(document).on('click', 'a.fa-test', function() {
				form.attr("action","test.htm");
				frm.ajaxForm(function(data){
					//success : me._showResponse
					DialogUtil.alert(data);
				});
				if (frm.valid())
					form.submit();
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
							window.location.href = __ctx+'/platform/system/identity/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


