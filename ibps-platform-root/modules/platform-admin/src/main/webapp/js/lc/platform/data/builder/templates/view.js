/** ***************************模版***************************** */
this["DataTemplatebuilder"] = this["DataTemplatebuilder"] || {};
this["DataTemplatebuilder"]["templates"] = this["DataTemplatebuilder"]["templates"] || {};


// TODO=================================预览视图====================

/**
 * 所有控件基础
 */
this["DataTemplatebuilder"]["templates"]["view/base"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {

		// 模版内容
		__p += '<div class="template-content">'
				+ ((__t = (DataTemplatebuilder.dataTempates[rf.get(DataTemplatebuilder.options.TEMPLATE_TYPE)].view({
					rf : rf
				}))) == null ? '' : __t) + '</div>\n\n';


	}
	return __p
};


//模版头部
this["DataTemplatebuilder"]["templates"]["view/template-header"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="template-title">'
				+ ((__t = (DataTemplatebuilder.helpers.simple_format(rf
						.get(DataTemplatebuilder.options.NAME)))) == null ? ''
						: __t) + '\n  ';

		__p += '</div>\n';
	}
	return __p
};


/**
 *列表
 */
this["DataTemplatebuilder"]["templates"]["view/list"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		var columns = rf.get(DataTemplatebuilder.options.DISPLAY_COLUMNS);
		__p += '<div class="data-table">';

		if (columns && columns.length > 0) {;
			width = 200 * columns.length >= 1000 ? 200 * columns.length : 1000;
			__p += '<ul  class="column-list" style="width: ' + width + 'px;">';
			_.each(columns, function(g, i) {;
				if (_.isEmpty(g) || g.length == 0)
					return true;
				column = new Backbone.DeepModel(g);
				__p += '<li  style="opacity: 1;"  class="column" >'
						+ '<label class="label-name">' + g.label + '</label>'
						+ '<div class="column-content">&nbsp;' +

						'</div>' + '</li>';
			});
			__p += ' </ul>';
		} else {;
			__p += '<div  class="no-column">' + '<span >您尚未设置显示字段。</span>'
					+ '<br><span >请添加显示字段</span>' + '</div>';

		};
		__p += '</div>\n';
	}
	return __p
};

/**
 *列表
 */
this["DataTemplatebuilder"]["templates"]["view/composeList"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		var columns = rf.get(DataTemplatebuilder.options.DISPLAY_COLUMNS);
		__p += '<div class="data-table">';

		if (columns && columns.length > 0) {;
			width = 200 * columns.length >= 1000 ? 200 * columns.length : 1000;
			__p += '<ul  class="column-list" style="width: ' + width + 'px;">';
			_.each(columns, function(g, i) {;
				if (_.isEmpty(g) || g.length == 0)
					return true;
				column = new Backbone.DeepModel(g);
				__p += '<li  style="opacity: 1;"  class="column" >'
						+ '<label class="label-name">' + g.label + '</label>'
						+ '<div class="column-content">&nbsp;' +

						'</div>' + '</li>';
			});
			__p += ' </ul>';
		} else {;
		var bindTemplate = rf.get(DataTemplatebuilder.options.attrs.BIND_TEMPLATE);
		if(bindTemplate == 'Y'){
				if($.isEmpty(rf.get(DataTemplatebuilder.options.attrs.BIND_TEMPLATE_KEY))){
					__p += '<div  class="no-column">[列表结构]' + '<span >未绑定模版</span>' + '</div>';
				}else{
					
					__p += '<div  class="no-column">[列表结构]' + '<span >已绑定模版：【'+rf.get(DataTemplatebuilder.options.attrs.BIND_TEMPLATE_NAME)+'】</span>' + '</div>';
				}
		}else{
			
			__p += '<div  class="no-column">' + '<span >您尚未设置显示字段。</span>'
			+ '<br><span >请添加显示字段</span>' + '</div>';
		}

		};
		__p += '</div>\n';
	}
	return __p
};

/**
*树形
*/
this["DataTemplatebuilder"]["templates"]["view/composeTree"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		var columns = rf.get(DataTemplatebuilder.options.DISPLAY_COLUMNS);
		__p += '<div class="data-table">';
		var bindTemplate = rf.get(DataTemplatebuilder.options.attrs.BIND_TEMPLATE);
		if(bindTemplate == 'Y'){
				if($.isEmpty(rf.get(DataTemplatebuilder.options.attrs.BIND_TEMPLATE_KEY))){
					__p += '<div  class="no-column">[树形结构]' + '<span >未绑定模版</span>' + '</div>';
				}else{
					
					__p += '<div  class="no-column">[树形结构]' + '<span >已绑定模版：【'+rf.get(DataTemplatebuilder.options.attrs.BIND_TEMPLATE_NAME)+'】</span>' + '</div>';
				}
		}else{
			__p += '<div  class="no-column">' + '<span >您尚未设置显示字段。</span>'
			+ '<br><span >请添加显示字段</span>' + '</div>';
		}
		__p += '</div>\n';
	}
	return __p
};


/**
 *树形
 */
this["DataTemplatebuilder"]["templates"]["view/tree"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		var columns = rf.get(DataTemplatebuilder.options.DISPLAY_COLUMNS);
		__p += '<div class="data-table">';
		if (columns && columns["name_key"] ) {;
			__p += '<div  class="no-column">' + '<span >树形【已设置显示字段】</span>' + '</div>';
		}else{
			__p += '<div  class="no-column">' + '<span class="required">树形【未正确设置显示字段】</span>' + '</div>';
		}
		__p += '</div>\n';
	}
	return __p
};
/**
 *值来源
 */
this["DataTemplatebuilder"]["templates"]["view/value-source"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		var columns = rf.get(DataTemplatebuilder.options.RESULT_COLUMNS);
		__p += '<div class="data-table">';
		if (columns && columns.length > 0) {;
		__p += '<div  class="no-column">' + '<span >值来源【已设置返回字段】</span>' + '</div>';
		}else{
			__p += '<div  class="no-column">' + '<span class="required" >值来源【未设置返回字段】</span>' + '</div>';
		}
		__p += '</div>\n';
	}
	return __p
};


/**
 *列表
 */
this["DataTemplatebuilder"]["templates"]["view/treeList"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		
		__p += '<div class="data-table">左树右列表';
		
		__p += '</div>\n';
	}
	return __p
};


//=================================查询条件视图====================

// 查询条件页面
this["DataTemplatebuilder"]["templates"]["view/query-condition"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="query-condition"><div class="query-title" data-toggle="collapse" data-target="#query-condition"><i class="fa fa-filter"></i>查询条件</div>';

		__p += '<div id="query-condition" class="collapse "></div></div>'
	}
	return __p
};
