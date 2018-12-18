/**
 * 数据模版
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：zhuangxh@bpmhome.cn
 * 创建时间：2017-09-30 17:32:58
 *</pre>
 */
$(function() {
	dataTemplate  = new DataTemplate();
	dataTemplate.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#dataTemplateGrid",// 列表对象
			PAGER : "#dataTemplatePager",// 列表分页
			FORM : '#dataTemplateForm'// 表单form
	};
	/**
	 * 数据模版 对象
	 * @returns {DataTemplate}
	 */
	DataTemplate = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DataTemplate.prototype = {
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
						url :  __ctx+'/platform/data/dataTemplate/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','名称','模版key','数据集key','分类ID','类型','描述','查询字段','显示字段','查询条件','排序字段','返回字段','功能按钮','导出字段','扩展字段','其它参数','创建人ID','创建时间','更新人ID','更新时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'key',
				                	   index: 'key_'
				                	 					                	 	}, {
				                 	   name:'datasetKey',
				                	   index: 'dataset_key_'
				                	 					                	 	}, {
				                 	   name:'typeId',
				                	   index: 'type_id_'
				                	 					                	 	}, {
				                 	   name:'type',
				                	   index: 'type_'
				                	 					                	 	}, {
				                 	   name:'desc',
				                	   index: 'desc_'
				                	 					                	 	}, {
				                 	   name:'queryColumns',
				                	   index: 'query_columns_'
				                	 					                	 	}, {
				                 	   name:'displayColumns',
				                	   index: 'display_columns_'
				                	 					                	 	}, {
				                 	   name:'conditionsColumns',
				                	   index: 'conditions_columns_'
				                	 					                	 	}, {
				                 	   name:'sortColumns',
				                	   index: 'sort_columns_'
				                	 					                	 	}, {
				                 	   name:'returnColumns',
				                	   index: 'return_columns_'
				                	 					                	 	}, {
				                 	   name:'functionButtons',
				                	   index: 'function_buttons_'
				                	 					                	 	}, {
				                 	   name:'exportColumns',
				                	   index: 'export_columns_'
				                	 					                	 	}, {
				                 	   name:'extColumns',
				                	   index: 'ext_columns_'
				                	 					                	 	}, {
				                 	   name:'param',
				                	   index: 'param_'
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
										action:__ctx+'/platform/data/dataTemplate/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/data/dataTemplate/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/data/dataTemplate/get.htm?id={id}'
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
							window.location.href = __ctx+'/platform/data/dataTemplate/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


