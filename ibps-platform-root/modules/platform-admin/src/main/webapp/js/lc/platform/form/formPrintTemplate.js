/**
 * 表单打印模版
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：zhuangxh@bpmhome.cn
 * 创建时间：2017-07-06 09:48:44
 *</pre>
 */
$(function() {
	formPrintTemplate  = new FormPrintTemplate();
	formPrintTemplate.init();
	
	formUrl = formPrintTemplate.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#formPrintTemplateGrid",// 列表对象
			PAGER : "#formPrintTemplatePager",// 列表分页
			FORM : '#formPrintTemplateForm'// 表单form
	};
	/**
	 * 表单打印模版 对象
	 * @returns {FormPrintTemplate}
	 */
	FormPrintTemplate = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	FormPrintTemplate.prototype = {
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
						url :  __ctx+'/platform/form/formPrintTemplate/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','表单KEY','名称','模版内容','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'formKey',
				                	   index: 'form_key_'
				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'content',
				                	   index: 'content_'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/form/formPrintTemplate/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/form/formPrintTemplate/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/form/formPrintTemplate/get.htm?id={id}'
									}]
								} ]
	
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
				formUrl.submit(me._showResponse);
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
							window.location.href = __ctx+'/platform/form/formPrintTemplate/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


