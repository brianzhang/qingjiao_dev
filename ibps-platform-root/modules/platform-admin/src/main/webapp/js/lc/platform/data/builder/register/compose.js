/** ***************************模版***************************** */
this["DataTemplatebuilder"] = this["DataTemplatebuilder"] || {};

/**
 * 组合--树形
 */
(function() {
	var alias = 'composeTree';
	DataTemplatebuilder.registerDataTempate(alias,{
				order : 2,// 组内序号
				view : "<%= DataTemplatebuilder.templates['view/composeTree']({rf:rf}) %>",
				edit : "<%= DataTemplatebuilder.templates['edit/compose']({rf:rf,bindTree:true}) %>\n"
						+"<%= DataTemplatebuilder.templates['edit/common']({rf:rf,isHide:true,expand:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/tree-display-field']({rf:rf,isHide:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/filter-condition']({rf:rf,isHide:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/sort-field']({rf:rf,isHide:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/function-button']({rf:rf,type:'tree',isHide:true}) %>\n",
				addButton: "<span class='symbol'><span class='fa fa-tree'></span> "+  DataTemplatebuilder.lang.TEMPLATE_TYPE[alias]+"</span>",
				
				defaultAttributes : function(attrs) {// 默认值
					var defAttrs = {},defButtons ={};
					
					defAttrs[DataTemplatebuilder.options.defattrs.BIND_TEMPLATE] = 'Y';
					
					attrs[DataTemplatebuilder.options.ATTRS_KEY]  = defAttrs;
	
					
					return attrs;
				}
			});

}).call(this);


/**
 * 组合--列表
 */
(function() {
	var alias = 'composeList';
	DataTemplatebuilder.registerDataTempate(alias,{
				order : 1,// 组内序号
				view : "<%= DataTemplatebuilder.templates['view/query-condition']({rf:rf}) %>" +
						"<%= DataTemplatebuilder.templates['view/composeList']({rf:rf}) %>",
				edit : "<%= DataTemplatebuilder.templates['edit/compose']({rf:rf,bindList:true}) %>\n"
						+"<%= DataTemplatebuilder.templates['edit/common']({rf:rf,isHide:true,initQuery:true,needPage:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/query-field']({rf:rf,isHide:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/display-field']({rf:rf,isHide:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/filter-condition']({rf:rf,isHide:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/sort-field']({rf:rf,isHide:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/function-button']({rf:rf,type:'list',isHide:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/function-button']({rf:rf,type:'edit',isHide:true}) %>\n",
				addButton: "<span class='symbol'><span class='fa fa-list'></span> "+  DataTemplatebuilder.lang.TEMPLATE_TYPE[alias]+"</span>",
				defaultAttributes : function(attrs) {// 默认值
					var defAttrs = {},defButtons ={};
					
					defAttrs[DataTemplatebuilder.options.defattrs.BIND_TEMPLATE] = 'Y';
					
					attrs[DataTemplatebuilder.options.ATTRS_KEY]  = defAttrs;
		
					return attrs;
				}
			});

}).call(this);



/**
 * 组合--对话框
 */
(function() {
	var alias = 'treeList';
	DataTemplatebuilder.registerDataTempate(alias,{
		view:"",
		edit:""
			});
	var alias = 'listTree';
	DataTemplatebuilder.registerDataTempate(alias,{
		view:"",
		edit:""
			});

}).call(this);