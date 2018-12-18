/** ***************************模版***************************** */
this["DataTemplatebuilder"] = this["DataTemplatebuilder"] || {};
this["DataTemplatebuilder"]["templates"] = this["DataTemplatebuilder"]["templates"]
		|| {};

// ----------------------------------------------编辑模版---------------------------------------------------------
/**
 * 编辑-基础模版
 */
this["DataTemplatebuilder"]["templates"]["edit/base"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		// 个性化设置
		__p += ((__t = (DataTemplatebuilder.dataTempates[rf
				.get(DataTemplatebuilder.options.TEMPLATE_TYPE)].edit({
			rf : rf
		}))) == null ? '' : __t)
				+ '\n';
	}
	return __p
};

/**
 * 模版属性
 */
this["DataTemplatebuilder"]["templates"]["edit/common"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join, __type = 'list',__isHide =obj.isHide?true:false;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__type = rf.get("template_type");
		__p += '<div class="setting-panel panel  '+(__isHide?'hidden':'')+'">\n'
				+ '<div class="panel-heading"  >'
				+ '<span data-toggle="collapse" data-target="#templateProperty">'
				+ DataTemplatebuilder.lang.TEMPLATE_TYPE[__type] + '</span>';
			__p += 	 '  </div>'
				+ '<div class="panel-body collapse in" id="templateProperty" >\n'
				+ '<div class="panel-body-content">';
			
		if (typeof initQuery !== 'undefined') {;
			__p += '<div class="form-group">'
					+ '<label>初始化是否查询：</label>'
					+ '<select data-rv-value="model.'
					+ ((__t = (DataTemplatebuilder.options.attrs.INIT_QUERY)) == null ? '': __t) + '" >' + '<option value="Y">是</option>'
					+ ' <option value="N">否</option>' + '</select>' + '</div>';
		}

		if (typeof needPage !== 'undefined') {;
			var isHide = rf.get(DataTemplatebuilder.options.attrs.NEED_PAGE) == 'Y'?false:true;
			__p += '<div class="form-group">'
					+ '<label>是否分页：</label>'
					+ '<select class="js-change-page" data-rv-value="model.'
					+ ((__t = (DataTemplatebuilder.options.attrs.NEED_PAGE)) == null ? ''
							: __t) + '" >' + '<option value="Y">是</option>'
					+ ' <option value="N">否</option>' + '</select>' + '</div>';
			
			__p += '<div id="pageSize" class="form-group '+(isHide?'hidden':'')+'" >'
					+ '	<label>分页大小：</label>'
					+ '	<select data-rv-value="model.'	+ ((__t = (DataTemplatebuilder.options.attrs.PAGE_SIZE)) == null ? '': __t) + '" >' 
					+ '		<option value="10">10</option>'
					+ '		<option value="20">20</option>'
					+ ' 		<option value="50">50</option>'
					+ 	'		<option value="100">100</option>' 
					+ '	</select>'
					+ '</div>';
		}



		if (typeof expand !== 'undefined') {;
			__p += '<div class="form-group">'
					+ '<label>初始化是否展开：</label>'
					+ '<select data-rv-value="model.'+ ((__t = (DataTemplatebuilder.options.attrs.EXPAND)) == null ? ''	: __t) + '" >' 
					+'<option value="Y">是</option>'
					+ ' <option value="N">否</option>' 
					+ '</select>' 
					+ '</div>';
		}

		
		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};




/**
 * 组合模版属性
 */
this["DataTemplatebuilder"]["templates"]["edit/compose"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join, __type = 'list',__isHide =obj.isHide?true:false;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__type = rf.get("template_type");
		var  bindType = (typeof bindTree !== 'undefined')?"tree": (typeof bindList !== 'undefined')?"list":"";
		var bindTypeName = bindType == "tree"?"树形":"列表";
		__p += '<div class="setting-panel panel  ">\n'
				+ '<div class="panel-heading"  >'
				+ '<span data-toggle="collapse" data-target="#templateProperty">'
				+ DataTemplatebuilder.lang.TEMPLATE_TYPE[__type] + '</span>  </div>';
		
			__p += 	  '<div class="panel-body collapse in" id="templateProperty" >\n'
				+ '<div class="panel-body-content">';
			
	/*		__p += '<div class="form-group">'
					+ '<label>是否绑定模版：</label>'
					+ '<select data-rv-value="model.'
					+ ((__t = (DataTemplatebuilder.options.attrs.BIND_TEMPLATE)) == null ? '': __t) + '" >' + '<option value="Y">是</option>'
					+ ' <option value="N">否</option>' + '</select>' + '</div>';*/
			
			__p += '<div class="form-group">'
				+ '<label >'+bindTypeName+'数据模版<span class="required">*</span></label>'
				+ '<div class="select-list "  >'
				+ '	<div data-rv-show="model.'
				+ ((__t = (DataTemplatebuilder.options.attrs.BIND_TEMPLATE_KEY)) == null ? '': __t) + '">'
				+ '		<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.'
				+ ((__t = (DataTemplatebuilder.options.attrs.BIND_TEMPLATE_NAME)) == null ? '': __t) + '" class="select-name js-template-setting"></span></div>'
				+ '			<div class="actions select-actions pull-right" style="display: none;">'
				+ '				<a class="rechoose-link   js-select-template" data-type="'+bindType+'"    data-role="rechoose"   href="javascript:void(0)" >重新选择</a> |'
				+ '				<a class="delete-link  js-remove-template" data-type="'+bindType+'"  data-role="remove"  href="javascript:void(0)" >删除</a> '
				+ '		</div>'
				+ '</div>'
				+ '<label class="js-select-template"  data-type="'+bindType+'"  data-rv-hide="model.'
				+ ((__t = (DataTemplatebuilder.options.attrs.BIND_TEMPLATE_KEY)) == null ? '': __t) + '"><div class="plus">+</div>'
				+ '<div class="select-empty"> 请选择'+bindTypeName+'</div>' + '</label>'
				+ '</div>' + '</div>';
		
			__p += '<div class="form-group">'
				+ '<label>关联字段：</label>'
				+   '	<select   data-rv-value="model.'
				+ ((__t = (DataTemplatebuilder.options.attrs.REF_FIELD)) == null ? '': __t) + '" class=" js-select-ref-field" '
				+   '	  data-toggle="select2" data-multiple="false"   >'  
				 + ' </select>' + '</div>';
		
		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};


/**
 * 设置权限
 */
this["DataTemplatebuilder"]["templates"]["edit/setting-rights"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		
	__p +=	'<div class="dropdown">'
		+ '	<a href="javascript:void(0)" class="btn-action dropdown-toggle fa fa-shield "  data-toggle="dropdown" title="快捷权限设置"></a>'
		+ '	<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >'
		+ '		<li><a href="javascript:void(0);"   class="js-setting-rights" data-rights="'+rights+'"   data-type="none" >无</a></li>'
		+ '		<li><a href="javascript:void(0);"   class="js-setting-rights" data-rights="'+rights+'"  data-type="all" >所有人</a></li>'
		+ '		<li><a href="javascript:void(0);"   class="js-setting-rights" data-rights="'+rights+'"  data-type="custom" >自定义</a></li>'
		+ '	</ul>' 
		+ '</div>' 
		}
	return __p
};

/**
 * 编辑设置--查询条件
 */
this["DataTemplatebuilder"]["templates"]["edit/query-field"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,__isHide =obj.isHide?true:false;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel '+(__isHide?'hidden':'')+'">\n'
				+ '<div class="panel-heading row">'
				+ '<div class="pull-left" >查询字段</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle add-column fa fa-add  "  data-toggle="dropdown"  title="添加字段"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right dropdown-menu-lg  float-right" role="menu" >';
		_.each(DataTemplatebuilder.fields,
						function(g, i) {;
							__p += '<li><a href="javascript:void(0);"   class="js-add-query-column" data-name="'
									+ g.name + '" >' + g.label + '</a></li>';
						});

		__p += '</ul></div>';

		__p += '<div  class="pull-right divider-line ">'
			+ ((__t = ( DataTemplatebuilder.templates['edit/setting-rights']({
				rights : 'query'
			}))) == null ? '' : __t) 
				+ '</div></div></div>\n';
		
		__p += '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="query-columns columns"><div class="query-column column"  data-rv-each-column=\'model.'
				+ ((__t = (DataTemplatebuilder.options.QUERY_COLUMNS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="column:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-query-column fa fa-cog"></i>'
				+ '<i data-role="remove_choice" class="js-remove-query-column fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-query-column  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};

/**
 * 显示字段-列表
 */
this["DataTemplatebuilder"]["templates"]["edit/display-field"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,__isHide =obj.isHide?true:false;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel  '+(__isHide?'hidden':'')+'" >\n'
				+ '<div class="panel-heading row"  data-toggle="collapse" >'
				+ '<div class="pull-left" >显示字段</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle add-column fa fa-add"  data-toggle="dropdown"  title="添加字段"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right dropdown-menu-lg  float-right" role="menu" >';
		_.each(DataTemplatebuilder.fields,function(g, i) {;
					__p += '<li><a href="javascript:void(0);"   class="js-add-display-column" data-name="'
							+ g.name + '" >' + g.label + '</a></li>';
				});
		__p += '</ul></div>';

		__p += '<div  class="pull-right divider-line ">'
			+ ((__t = ( DataTemplatebuilder.templates['edit/setting-rights']({
				rights : 'display'
			}))) == null ? '' : __t) 
				+ '</div></div></div>\n';
		

		__p += '<div class="panel-body collapse in"  id="displayColumns">\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="display-columns columns"><div class="display-column column"  data-rv-each-column=\'model.'
				+ ((__t = (DataTemplatebuilder.options.DISPLAY_COLUMNS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="column:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-display-column fa fa-cog"></i>'
				+ '<i data-role="remove_choice" class="js-remove-display-column fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-display-column  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};

/**
 * 显示字段---树形
 */
this["DataTemplatebuilder"]["templates"]["edit/tree-display-field"] = function(
		obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,__isHide =obj.isHide?true:false;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel  '+(__isHide?'hidden':'')+'">\n'
				+ '		<div class="panel-heading row"  data-toggle="collapse" >'
				+ '		<div class="pull-left" >显示字段</div></div>';

		__p += '<div class="panel-body collapse in"  id="displayColumns">\n'
			  + '	<div class="panel-body-content">';

		__p += '<div class="form-group">'
			+ '<label >ID字段:</label>'
			+ '<select data-rv-value="model.'
			+ ((__t = (DataTemplatebuilder.options.ID_KEY)) == null ? ''
					: __t)
			+ '" >';
				_.each(DataTemplatebuilder.fields,function(g, i) {;
					__p += 	 '<option value="'
						+ g.name + '">' + g.label + '</option>'
						});
		__p += '</select></div>';
	
		__p += '<div class="form-group">'
				+ '<label >父ID字段:</label>'
				+ '<select data-rv-value="model.'
				+ ((__t = (DataTemplatebuilder.options.PID_KEY)) == null ? ''
						: __t)
				+ '" >';
				_.each(DataTemplatebuilder.fields,function(g, i) {;
					__p += 	 '<option value="'
						+ g.name + '">' + g.label + '</option>'
						});
		__p += '</select></div>';
			
	
		__p += '<div class="form-group">'
				+ '<label >显示字段:</label>'
				+ '<select data-rv-value="model.'
				+ ((__t = (DataTemplatebuilder.options.NAME_KEY)) == null ? ''
						: __t)
				+ '"  >';
				_.each(DataTemplatebuilder.fields,function(g, i) {;
					__p += 	 '<option value="'
						+ g.name + '">' + g.label + '</option>'
						});
		__p += '</select></div>';
	
		
		__p += '<div class="form-group">'
				+ '<label >根节点的父ID值:</label>'
				+ '<textarea data-rv-input=\'model.'
				+ ((__t = (DataTemplatebuilder.options.ROOT_PID)) == null ? ''
						: __t) + '\' ></textarea>' + '</div>';

		__p += '<div class="form-group">'
				+ '<label >虚拟根节点显示值:</label>'
				+ '<textarea data-rv-input=\'model.'
				+ ((__t = (DataTemplatebuilder.options.ROOT_LABEL)) == null ? ''
						: __t) + '\' ></textarea>' + '</div>';

		__p += '<div class="form-group">'
				+ '<div class="checkbox">'
				+ '<label><input type="checkbox" data-rv-checked="model.'
				+ ((__t = (DataTemplatebuilder.options.IS_SCRIPT)) == null ? ''
						: __t) + '" />父类值来源是否groovy脚本</label>' + '</div>'
				+ '</div>';

		__p += ' 		</div>' + ' 	</div>' + ' </div>';
	}
	return __p
};

/**
 * 过滤条件
 */
this["DataTemplatebuilder"]["templates"]["edit/filter-condition"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,__isHide =obj.isHide?true:false;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel  '+(__isHide?'hidden':'')+'">\n'
				+ '<div class="panel-heading row">'
				+ '<div class="pull-left" >过滤条件</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left">'
				+ '<a href="javascript:void(0)" class="btn-action fa fa-add js-add-filter-condition"  title="添加条件"></a>';
		__p += '</div>\n';
		
		__p += '<div  class="pull-right divider-line ">'
			+ ((__t = ( DataTemplatebuilder.templates['edit/setting-rights']({
				rights : 'filter'
			}))) == null ? '' : __t) 
				+ '</div></div></div>\n';

		__p += '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="filter-conditions columns"><div class="filter-condition column"  data-rv-each-condition=\'model.'
				+ ((__t = (DataTemplatebuilder.options.FILTER_CONDITIONS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="condition:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-filter-condition fa fa-cog"></i>'
				+ '<i data-role="remove_choice" class="js-remove-filter-condition fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-filter-condition  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};

/**
 * 排序字段
 */
this["DataTemplatebuilder"]["templates"]["edit/sort-field"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,__isHide =obj.isHide?true:false;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel  '+(__isHide?'hidden':'')+'">\n'
				+ '<div class="panel-heading row"  data-toggle="collapse" >'
				+ '<div class="pull-left" >排序字段</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle add-column fa fa-add"  data-toggle="dropdown"  title="添加字段"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right dropdown-menu-lg float-right" role="menu" >';
		_.each(DataTemplatebuilder.fields,function(g, i) {;
					__p += '<li><a href="javascript:void(0);"   class="js-add-sort-column" data-name="'
							+ g.name + '" >' + g.label + '</a></li>';
				});
		__p += '</ul></div>';

		__p += '</div></div>\n';

		__p += '<div class="panel-body collapse in"  id="displayColumns">\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="sort-columns columns"><div class="sort-column column"  data-rv-each-column=\'model.'
				+ ((__t = (DataTemplatebuilder.options.SORT_COLUMNS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" ><span  data-rv-text="column:label"></span>\n  '
				+ '  <span data-rv-show="column:direction | eq asc" style="color: #8a6d3b;" >升序</span> '
				+ '<span   data-rv-show="column:direction | eq desc" style="color: #8a6d3b;">降序</span></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-sort-column js-setting-sort-column-asc fa  fa-sort-alpha-asc " title="设置降序" data-rv-show="column:direction | eq asc"></i>'
				+ ' <i data-role="setting_choice" class="js-setting-sort-column  js-setting-sort-column-desc fa  fa-sort-alpha-desc " title="设置升序"  data-rv-show="column:direction | eq desc"></i>'
				+ '<i data-role="remove_choice" class="js-remove-sort-column fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-sort-column  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};

/**
 * 返回字段
 */
this["DataTemplatebuilder"]["templates"]["edit/result-field"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,__isHide =obj.isHide?true:false;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel  '+(__isHide?'hidden':'')+'">\n'
				+ '<div class="panel-heading row"  data-toggle="collapse" >'
				+ '<div class="pull-left" >返回字段</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle add-column fa fa-add"  data-toggle="dropdown"  title="添加字段"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right dropdown-menu-lg  float-right" role="menu" >';
		_.each(DataTemplatebuilder.fields,function(g, i) {;
					__p += '<li><a href="javascript:void(0);"   class="js-add-result-column" data-name="'
							+ g.name + '" >' + g.label + '</a></li>';
				});
		__p += '</ul></div>';

		__p += '<div  class="pull-right divider-line ">'
			+ ((__t = ( DataTemplatebuilder.templates['edit/setting-rights']({
				rights : 'result'
			}))) == null ? '' : __t) 
				+ '</div></div></div>\n';
		

		__p += '<div class="panel-body collapse in"  id="resultColumns">\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="result-columns columns"><div class="result-column column"  data-rv-each-column=\'model.'
				+ ((__t = (DataTemplatebuilder.options.RESULT_COLUMNS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="column:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-result-column fa fa-cog"></i>'
				+ '<i data-role="remove_choice" class="js-remove-result-column fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-result-column  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};



/**
 * 扩展属性
 */
this["DataTemplatebuilder"]["templates"]["edit/extend-setting"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		

		__p += '<div class="setting-panel panel">\n'+
							'<div class="panel-heading">扩展属性</div>\n'+
								'<div class="panel-body collapse in" >\n'+
									'<div class="panel-body-content">';
		
		__p += '<div class="form-group">'+
						'<label>数据标题:</label>'+
						'<a class="btn btn-sm btn-info  btn-block  js-settring-datatitle mt-5"  >设置数据标题</a>'+
					'</div>\n';
		
		// ==============导出字段=====
		__p += '<div class="form-group">'+
						'<label>导出字段:</label>'+
						'<a class="btn btn-sm btn-info btn-block  js-export-column mt-5"  >设置导出字段</a>'+
					'</div>\n';

		
		__p += 		'</div>'+
				' </div>'+
			' </div>';

	}
	return __p
};



/**
 * 功能按钮
 */
this["DataTemplatebuilder"]["templates"]["edit/function-button"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,__isHide =obj.isHide?true:false;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		var __title,__buttons,__key,__rights;
		if(type=='list'){
			__title = '列表-功能按钮';
			__buttons = DataTemplatebuilder.lang.LIST_FUNCTION_BUTTONS;
			__key = DataTemplatebuilder.options.FUNCTION_BUTTONS;
			__rights = 'function_buttons';
		}else if(type == 'tree'){
			__title = '树形-功能按钮';
			__buttons = DataTemplatebuilder.lang.TREE_FUNCTION_BUTTONS;
			__key = DataTemplatebuilder.options.FUNCTION_BUTTONS
			__rights = 'function_buttons';
		}else if(type == 'contextmenu'){
			__title = '树形-右键菜单按钮';
			__buttons = DataTemplatebuilder.lang.TREE_CONTEXTMENU_BUTTONS;
			__key = DataTemplatebuilder.options.CONTEXTMENU_BUTTONS
			__rights = 'contextmenu_buttons';
		}else if(type == 'dialog'){
			__title = '对话框-功能按钮';
			__buttons = DataTemplatebuilder.lang.DIALOG_BUTTONS;
			__key = DataTemplatebuilder.options.DIALOG_BUTTONS;
			__rights = 'dialog_buttons';
		}else if(type == 'edit'){
			__title = '编辑页-功能按钮';
			__buttons = DataTemplatebuilder.lang.EDIT_BUTTONS;
			__key = DataTemplatebuilder.options.EDIT_BUTTONS;
			__rights = 'edit_buttons';
		}
		
		__p += '<div class="setting-panel panel  '+(__isHide?'hidden':'')+'">\n'
				+ '<div class="panel-heading row">'
				+ '<div class="pull-left" >'+__title+'</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle fa fa-add add-button"  data-toggle="dropdown"  title="添加按钮"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right float-right" role="menu" >';
		_.each(__buttons,function(g, i) {;
							__p += '<li><a href="javascript:void(0);"   class="js-add-function-button" data-type="'+type+'"    data-button_type="'
									+ i	+ '">'+ __buttons[i]
									+ '</a></li>';
						});
		__p += '</ul></div>';
		
		__p += '<div  class="pull-right divider-line ">'
			+ ((__t = ( DataTemplatebuilder.templates['edit/setting-rights']({
				rights : __rights
			}))) == null ? '' : __t) 
				+ '</div></div></div>\n';
		
		__p += '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="'+type+'-function-buttons columns"><div class="'+type+'-function-button column"  data-rv-each-button=\'model.'
				+ ((__t = (__key)) == null ? ''	: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="button:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice"  data-type="'+type+'"  class="js-setting-function-button fa fa-cog"></i>'
				+ '<i data-role="remove_choice"   data-type="'+type+'"   class="js-remove-function-button fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice"    data-type="'+type+'"  class=" js-sort-function-button  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';

	}
	return __p
};



