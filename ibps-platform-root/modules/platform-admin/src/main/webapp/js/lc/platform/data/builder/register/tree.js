/** ***************************模版***************************** */
this["DataTemplatebuilder"] = this["DataTemplatebuilder"] || {};
/**
 * 树形
 */
(function() {
	var alias = 'tree';
	DataTemplatebuilder.registerDataTempate(alias,{
				order : 2,// 组内序号
				view : "<%= DataTemplatebuilder.templates['view/tree']({rf:rf}) %>",
				edit : "<%= DataTemplatebuilder.templates['edit/common']({rf:rf,expand:true}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/tree-display-field']({rf:rf}) %>\n"
/*						+ "<%= DataTemplatebuilder.templates['edit/query-field']({rf:rf}) %>\n"*/
						+ "<%= DataTemplatebuilder.templates['edit/filter-condition']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/sort-field']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/result-field']({rf:rf}) %>\n"
						+ "<%= DataTemplatebuilder.templates['edit/function-button']({rf:rf,type:'tree'}) %>\n",
/*						+ "<%= DataTemplatebuilder.templates['edit/function-button']({rf:rf,type:'contextmenu'}) %>\n",*/
				addButton: "<span class='symbol'><span class='fa fa-tree'></span> "+  DataTemplatebuilder.lang.TEMPLATE_TYPE[alias]+"</span>",
				defaultAttributes : function(attrs) {// 默认值
					var defAttrs = {},defButtons ={};
					
					defAttrs[DataTemplatebuilder.options.defattrs.EXPAND] = 'Y';
					
					attrs[DataTemplatebuilder.options.ATTRS_KEY]  = defAttrs;
	
					
					attrs[DataTemplatebuilder.options.BUTTONS]  = defButtons;
					
					return attrs;
				},
				defaultDialogAttrs:function(attrs){
					var defAttrs = {};
					
					defAttrs[DataTemplatebuilder.options.defattrs.WIDTH] = '40';
					defAttrs[DataTemplatebuilder.options.defattrs.HEIGHT] = '60';
					
					attrs[DataTemplatebuilder.options.ATTRS_KEY]  = _.extend(attrs[DataTemplatebuilder.options.ATTRS_KEY], defAttrs);
					return attrs;
				}
			});

}).call(this);


