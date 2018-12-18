
/** *******************************国际化*********************************************** */
this["DataTemplatebuilder"] = this["DataTemplatebuilder"] || {};
this["DataTemplatebuilder"]["lang"] = this["DataTemplatebuilder"]["lang"] || {};

(function() {
	DataTemplatebuilder.lang = {
		dict : {
			UNSAVED_CHANGES : '您的表单有些修改尚未保存,是否确定离开？'
		},
		TEMPLATE_TYPE : {
			list:'列表',
			tree:'树形',
			treeList:'左树右列表',
			listTree:'左列表右树',
			dialogList : '对话框-列表',
			dialogTree : '对话框-树形',
			dialogListTree : '对话框-左列表右树',
			dialogTreeList : '对话框-左树右列表',
			valueSource:'值来源',
			composeTree:'组合-树形',
			composeList:'组合-列表',
		},
		//编辑页按钮
		EDIT_BUTTONS : {
			'close' : '关闭',
			'save' : '保存',
			'print' : '打印',
			'startFlow' : '启动流程',
			'custom':'[自定义]'
		},
		//功能按钮
		LIST_FUNCTION_BUTTONS:{
			'search' : '搜索',
			'resetSearch' : '重置',
			'moreSearch':'更多',
			'add' : '添加',
			'remove' : '删除',
			"edit" : '编辑',
			'detail' : '明细',
			'print' : '打印',
/*			'batchModify' : '批量修改',
			'import' : '导入',*/
			'export' : '导出',
			'startFlow' : '启动流程',
			'defStartFlow' : '自定义启动流程',
			'custom':'[自定义]'
		},
		TREE_FUNCTION_BUTTONS:{
			'refresh':'刷新',
			'expand':'展开',
			'compress':'收缩',
			'custom':'[自定义]'
		},
		TREE_CONTEXTMENU_BUTTONS:{
			'add' : '添加',
			'remove' : '删除',
			"edit" : '编辑',
			'detail' : '明细'
		},
		//对话框按钮
		DIALOG_BUTTONS : {
			'ok' : '确定',
			'cancel':'取消',
			'clean': '清空',
			'cleanSelected': '清空选择',
			'custom':'[自定义]'
		}
	};
}).call(this);