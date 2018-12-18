/** ***************************模版***************************** */
this["DataTemplatebuilder"] = this["DataTemplatebuilder"] || {};
/**
 * 列表
 */
(function() {
	var alias = 'list';
	DataTemplatebuilder.registerDataTempate(alias,{
				order : 1,// 组内序号
				view : "<%= DataTemplatebuilder.templates['view/query-condition']({rf:rf}) %>" +
						"<%= DataTemplatebuilder.templates['view/list']({rf:rf}) %>",
				edit : "<%= DataTemplatebuilder.templates['edit/common']({rf:rf,initQuery:true,needPage:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/query-field']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/display-field']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/filter-condition']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/sort-field']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/result-field']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/function-button']({rf:rf,type:'list'}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/function-button']({rf:rf,type:'edit'}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/extend-setting']({rf:rf}) %>\n",
				addButton: "<span class='symbol'><span class='fa fa-list'></span> "+  DataTemplatebuilder.lang.TEMPLATE_TYPE[alias]+"</span>",
				defaultAttributes : function(attrs) {// 默认值
					var defAttrs = {};
					
					
					defAttrs[DataTemplatebuilder.options.defattrs.DATA_TITLE] = {
							type:'first'
					};
					defAttrs[DataTemplatebuilder.options.defattrs.INIT_QUERY] = 'Y';
					defAttrs[DataTemplatebuilder.options.defattrs.NEED_PAGE] = 'Y';
					defAttrs[DataTemplatebuilder.options.defattrs.PAGE_SIZE] = '20';
					
					attrs[DataTemplatebuilder.options.ATTRS_KEY]  = defAttrs;
	
					return attrs;
				}
			});

}).call(this);

