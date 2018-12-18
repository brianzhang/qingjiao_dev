/** ***************************模版***************************** */
this["DataTemplatebuilder"] = this["DataTemplatebuilder"] || {};
/**
 * 值来源
 */
(function() {
	var alias = 'valueSource';
	DataTemplatebuilder.registerDataTempate(alias,{
				order : 1,// 组内序号
				view :"<%= DataTemplatebuilder.templates['view/value-source']({rf:rf}) %>",
				edit : "<%= DataTemplatebuilder.templates['edit/common']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/query-field']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/filter-condition']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/result-field']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/sort-field']({rf:rf}) %>\n",
				addButton: "<span class='symbol'><span class='fa fa-list'></span> "+  DataTemplatebuilder.lang.TEMPLATE_TYPE[alias]+"</span>",
				defaultAttributes : function(attrs) {// 默认值
					return attrs;
				}
			});

}).call(this);