
/**
 * t_spryj
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:35:04
 *</pre>
 */
$(function() {
	shenPRYJ  = new ShenPRYJ();
	shenPRYJ.init();
	
	formUrl = shenPRYJ.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#shenPRYJGrid",// 列表对象
			PAGER : "#shenPRYJPager",// 列表分页
			FORM : '#shenPRYJForm'// 表单form
	};
	/**
	 * t_spryj 对象
	 * @returns {ShenPRYJ}
	 */
	ShenPRYJ = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ShenPRYJ.prototype = {
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
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/loanp/DaiKSSCSP/shenPRYJ/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','借款申请人','授信金额','授信期限','担保方式','贷款类别','贷款金额','贷款期限','月利率','归还方式','借贷id ','审批人Id','审批人签名','审批人签字时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'jksqr',
				                	   index: 'jksqr'

				                	 					                	 	}, {
				                 	   name:'sxje',
				                	   index: 'sxje'

				                	 					                	 	}, {
				                 	   name:'sxqx',
				                	   index: 'sxqx'

				                	 					                	 	}, {
				                 	   name:'dbfs',
				                	   index: 'dbfs'

				                	 	}, {
				                 	   name:'dklb',
				                	   index: 'dklb'

				                	 	}, {
				                 	   name:'dkje',
				                	   index: 'dkje'

				                	 					                	 	}, {
				                 	   name:'dkqx',
				                	   index: 'dkqx'

				                	 					                	 	}, {
				                 	   name:'yll',
				                	   index: 'yll'

				                	 					                	 	}, {
				                 	   name:'ghfs',
				                	   index: 'ghfs'

				                	 	}, {
				                 	   name:'jdid',
				                	   index: 'jdid'

				                	 					                	 	}, {
				                 	   name:'sprid',
				                	   index: 'sprId'

				                	 					                	 	}, {
				                 	   name:'sprqm',
				                	   index: 'sprqm'

				                	 					                	 	}, {
				                 	   name:'sprqzsj',
				                	   index: 'sprqzsj'
				                	 	,formatter: 'timestamp'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/DaiKSSCSP/shenPRYJ/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/DaiKSSCSP/shenPRYJ/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/DaiKSSCSP/shenPRYJ/get.htm?id={id}'
									}]
								} ],
								loadComplete: function(){
									try{
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									}catch(e){}
								}
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				me.formUrl.submit(me._showResponse);
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage().split("@")[0]+ ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/xinDai/liucheng/xinDaiLiuCheng/zhuren.htm?jdid='+msg.getMessage().split("@")[1];
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


