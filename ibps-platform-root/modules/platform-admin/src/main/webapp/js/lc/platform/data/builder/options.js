
/** ***************************模版常量***************************** */
this["DataTemplatebuilder"] = this["DataTemplatebuilder"] || {};
this["DataTemplatebuilder"]["options"] = this["DataTemplatebuilder"]["options"] || {};

(function() {
	DataTemplatebuilder.options = {
		HTTP_ENDPOINT : __ctx + '/platform/data/dataTemplate/save.htm',
		HTTP_METHOD : 'POST',

		TEMPLATE_TYPE : 'template_type',
		//查询字段
		QUERY_COLUMNS : 'query_columns',
		//显示字段
		DISPLAY_COLUMNS : 'display_columns',
		//过滤条件
		FILTER_CONDITIONS : 'filter_conditions',
		//排序字段
		SORT_COLUMNS : 'sort_columns',
		//返回字段
		RESULT_COLUMNS : 'result_columns',
		//导出字段
		EXPORT_COLUMNS : 'export_columns',
		//===统一功能按钮
		BUTTONS: 'buttons',
		//对话框按钮
		DIALOG_BUTTONS: 'buttons.dialog_buttons',
		//功能按钮
		FUNCTION_BUTTONS : 'buttons.function_buttons',
		//右键菜单按钮
		CONTEXTMENU_BUTTONS: 'buttons.contextmenu_buttons',
		//编辑按钮
		EDIT_BUTTONS : 'buttons.edit_buttons',
		
		//===树形
		ID_KEY: 'display_columns.id_key',
		
		NAME_KEY: 'display_columns.name_key',
		
		PID_KEY: 'display_columns.pid_key',
		
		ROOT_PID: 'display_columns.root_pid',
		
		ROOT_LABEL: 'display_columns.root_label',
		
		IS_SCRIPT: 'display_columns.is_script',
		
		NAME : 'name',
		KEY:'key',
		TYPE_ID:"typeId",
		TYPE_NAME:"typeName",
		DATASET_KEY:'datasetKey',
		DATASET_NAME:'datasetName',
		UNIQUE:'unique',
		
		TYPE:"type",
		SHOWTYPE:"showType",
		COMPOSETYPE:"composeType",
		
		ATTRS_KEY:"attrs",
		defattrs:{
			INIT_QUERY : 'init_query',
			NEED_PAGE : 'need_page',
			PAGE_SIZE:'page_size',
			EXPAND:'expand',
			MULTI:'multi',
			WIDTH:'width',
			HEIGHT:'height',
			DATA_TITLE:'data_title',
			DEFAULT_FILTER : 'default_filter',
			BIND_TEMPLATE: 'bind_template'
				
		},
		
		attrs:{//扩展属性
			INIT_QUERY : 'attrs.init_query',
			NEED_PAGE : 'attrs.need_page',
			PAGE_SIZE:'attrs.page_size',
			EXPAND:'attrs.expand',
			DEFAULT_FILTER : 'attrs.default_filter',
			
			MULTI:'attrs.multi',
			WIDTH:'attrs.width',
			HEIGHT:'attrs.height',
			DATA_TITLE:'attrs.data_title',
			
			BIND_TEMPLATE: 'attrs.bind_template',
			BIND_TEMPLATE_KEY : 'attrs.bind_template_key',
			BIND_TEMPLATE_NAME : 'attrs.bind_template_name',
			
			DATASET_KEY: 'attrs.dataset_key',
			
			REF_FIELD: 'attrs.ref_field',
			REF_FIELD_NAME: 'attrs.ref_field_name',
				
			FORM_KEY:"attrs.form_key",
			FORM_NAME:"attrs.form_name",
			FLOW_KEY:"attrs.flow_key",
			FLOW_NAME:"attrs.flow_name",
			PRINT_ID:"attrs.print_id",
			PRINT_NAME:"attrs.print_name",
			SCRIPT:"attrs.script"
				
		}

	};

}).call(this);