/**
 * 表单模版
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-06 15:13:27
 *</pre>
 */
$(function() {
	var formTemplate  = new FormTemplate();
	formTemplate.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#formTemplateGrid",// 列表对象
			PAGER : "#formTemplatePager",// 列表分页
			FORM : '#formTemplateForm'// 表单form
	};
	/**
	 * 表单模版 对象
	 * @returns {FormTemplate}
	 */
	FormTemplate = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	FormTemplate.prototype = {
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
						url :  __ctx+'/platform/form/formTemplate/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','模板名称','模版别名','模版描述','模板分类','样式','模版内容','创建人ID','创建时间','更新人ID','更新时间','管理'],
				        colModel: [{
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'alias',
				                	   index: 'alias_'
				                	 					                	 	}, {
				                 	   name:'desc',
				                	   index: 'desc_'
				                	 					                	 	}, {
				                 	   name:'typeId',
				                	   index: 'type_id_'
				                	 					                	 	}, {
				                 	   name:'style',
				                	   index: 'style_'
				                	 					                	 	}, {
				                 	   name:'content',
				                	   index: 'content_'
				                	 					                	 	}, {
				                 	   name:'createBy',
				                	   index: 'create_by_'
				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_',
				                	 	formatter: 'timestamp'
				                	 	
				                	 	}, {
				                 	   name:'updateBy',
				                	   index: 'update_by_'
				                	 					                	 	}, {
				                 	   name:'updateTime',
				                	   index: 'update_time_',
				                	 	formatter: 'timestamp'
				                	 	
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/form/formTemplate/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/form/formTemplate/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/form/formTemplate/get.htm?id={id}'
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
				frm.ajaxForm({
					success : me._showResponse
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
							window.location.href = __ctx+'/platform/form/formTemplate/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


