/** ***************************模版***************************** */
this["DataTemplatebuilder"] = this["DataTemplatebuilder"] || {};
this["DataTemplatebuilder"]["templates"] = this["DataTemplatebuilder"]["templates"] || {};

/**
 * 模版属性
 */
this["DataTemplatebuilder"]["templates"]["property/base"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading">模版属性</div>\n'
				+ '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';
		__p += '<div class="form-group">'
				+ '<label >模版标题<span class="required">*</span></label>'
				+ '<input type="text" id="templateName"   data-rv-input="model.'
				+ ((__t = (DataTemplatebuilder.options.NAME)) == null ? '' : __t)
				+ '"  />' + '</div>';
		
		__p += '<div class="form-group">'
			+ '<label >模版key<span class="required">*</span></label>'
			+ '<input type="text" id="templateKey"   data-rv-input="model.'
			+ ((__t = (DataTemplatebuilder.options.KEY)) == null ? '' : __t)
			+ '"  />' + '</div>';

		__p += '<div class="form-group">'
				+ '<label >模版分类</label>'
				+ '<div style="position: relative;"><input type="hidden" id="typeId" data-rv-value="model.'
				+ ((__t = (DataTemplatebuilder.options.TYPE_ID)) == null ? '' : __t)
				+ '"  />'
				+ '<input type="text" class="form-control dropdownTree" data-rv-value="model.'
				+ ((__t = (DataTemplatebuilder.options.TYPE_NAME)) == null ? ''
						: __t)
				+ '"  readonly  id="typeName" name="typeName" data-toggle="dropdownTree"  data-type="DATA_TEMPLATE_TYPE" data-id="#typeId"'
				+ '"  />' + '</div></div>';
		
		__p += '<div class="form-group">'
			+ '<label>模版类型</label>'
			+ '<select class="js-change-type" data-last="'+rf.get(DataTemplatebuilder.options.TYPE)+'" data-rv-value="model.'
			+ ((__t = (DataTemplatebuilder.options.TYPE)) == null ? ''
					: __t) + '" >' 
			+'<option value="default" >默认</option>'
			+'<option value="dialog" >对话框</option>'
			+'<option value="valueSource" >值来源</option>'
			+	 '</select>' + 
			'</div>';
		var ishide =true;
		if(rf.get(DataTemplatebuilder.options.TYPE) != 'valueSource')
			 ishide= false;
		
		__p += '<div class="form-group '+(ishide?"hidden":"")+'"  id="showtypeGroup">'
			+ '<label>展示形式</label>'
			+ '<select class="js-change-showtype"  data-last="'+rf.get(DataTemplatebuilder.options.SHOWTYPE)+'"  data-rv-value="model.'
			+ ((__t = (DataTemplatebuilder.options.SHOWTYPE)) == null ? ''
					: __t) + '" >' 
				+'<option value="list"  selected="selected">列表</option>'
				+'<option value="tree" >树形</option>'
				+'<option value="compose" >组合</option>'
			+	 '</select>' + 
			'</div>';

		if(rf.get(DataTemplatebuilder.options.SHOWTYPE) == 'compose')
			 ishide= false;
		else{
			 ishide= true;
		}
			
		__p += '<div class="form-group '+(ishide?"hidden":"")+'"  id="composetypeGroup" >'
			+ '<label>组合类型</label>'
			+ '<select  class="js-change-composetype"  data-last="'+rf.get(DataTemplatebuilder.options.SHOWTYPE)+'" data-rv-value="model.'
			+ ((__t = (DataTemplatebuilder.options.COMPOSETYPE)) == null ? ''
					: __t) + '" >' 
				+'<option value="treeList"  >左树右列表</option>'
				+'<option value="listTree" >左列表右树</option>'
			+	 '</select>' + 
			'</div>';
		
		__p += '<div class="form-group '+(ishide?"":"hidden")+'"   id="datasetGroup" >'
				+ '<label >数据集<span class="required">*</span></label>'
				+ '<div class="select-list "  >'
				+ '<div data-rv-show="model.datasetKey">'
				+ '<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.datasetName" class="select-name"></span></div>'
				+ '<div class="actions select-actions pull-right" style="display: none;">'
				+ '<a class="rechoose-link   js-select-dataset"  data-role="rechoose"   href="javascript:void(0)" >重新选择</a> |'
				+ '<a class="delete-link  js-remove-dataset" data-role="remove"  href="javascript:void(0)" >删除</a> '
				+ '</div>'
				+ '</div>'
				+ '<label class="js-select-dataset"   data-rv-hide="model.datasetKey"><div class="plus">+</div>'
				+ '<div class="select-empty"> 请选择数据集</div>' + '</label>'
				+ '</div>' + '</div>';

		
		__p += '<div class="form-group  '+(ishide?"":"hidden")+'" id="uniqueGroup">'
			+ '<label>唯一字段</label>'
			+ '<select data-rv-value="model.'
			+ ((__t = (DataTemplatebuilder.options.UNIQUE)) == null ? ''
					: __t) + '" >' ;
					_.each(DataTemplatebuilder.fields,
							function(g, i) {;
								__p +=		'<option value="'+ g.name +'">'+ g.label +'</option>';
							});
		__p += 	 '</select>' + '</div>';
		
		__p +=  ' </div>'+ ' </div>'+' </div>';
		//扩展属性
		__p += DataTemplatebuilder.templates['property/attributes']({});
	    // ==============模版脚本=====
		   __p += '<div class="setting-panel panel">\n'+
		   					'<div class="panel-heading">模版脚本</div>\n'+
		   						'<div class="panel-body collapse in" >\n'+
		   							'<div class="panel-body-content">';
		  __p += '<a class="btn btn-sm  btn-block  btn-info js-template-script mt-5"  >设置模版脚本</a>';
		  
	__p += 		'</div>'+
				' </div>'+
			' </div>';
	}
	return __p
};

/**
 * 扩展属性
 */
this["DataTemplatebuilder"]["templates"]["property/attributes"] = function(obj) {
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
		   
			__p += '<div class="form-group">'
				+ '<label >表单<span class="required">*</span></label>'
				+ '<div class="select-list "  >'
				+ '<div data-rv-show="model.attrs.form_key">'
				+ '<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.attrs.form_name" class="select-name"></span></div>'
				+ '<div class="actions select-actions pull-right" style="display: none;">'
				+ '<a class="rechoose-link   js-select-form"  data-role="rechoose"   href="javascript:void(0)" >重选</a> |'
				+ '<a class="delete-link  js-remove-form" data-role="remove"  href="javascript:void(0)" >删除</a>| '
				+ '<a class="rights-link   js-rights-form"  data-role="rights"   href="javascript:void(0)" >权限</a>'
				+ '</div>'
				+ '</div>'
				+ '<label class="js-select-form"   data-rv-hide="model.attrs.form_key"><div class="plus">+</div>'
				+ '<div class="select-empty"> 请选择表单</div>' + '</label>'
				+ '</div>' + '</div>';
			
			__p += '<div class="form-group">'
				+ '<label >打印模版<span class="required">*</span></label>'
				+ '<div class="select-list "  >'
				+ '<div data-rv-show="model.attrs.print_name">'
				+ '<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.attrs.print_name" class="select-name"></span></div>'
				+ '<div class="actions select-actions pull-right" style="display: none;">'
				+ '<a class="rechoose-link   js-select-print-template"  data-role="rechoose"   href="javascript:void(0)" >重选</a> |'
				+ '<a class="delete-link  js-remove-print-template" data-role="remove"  href="javascript:void(0)" >删除</a> '
				+ '</div>'
				+ '</div>'
				+ '<label class="js-select-print-template" data-rv-hide="model.attrs.print_id"><div class="plus">+</div>'
				+ '<div class="select-empty">请选择打印模版</div>' + '</label>'
				+ '</div>' + '</div>';
			

		__p += '<div class="form-group">'
				+ '<label >绑定流程</label>'
				+ '<div class="select-list "  >'
				+ '<div data-rv-show="model.attrs.flow_name">'
				+ '<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.attrs.flow_name" class="select-name"></span></div>'
				+ '<div class="actions select-actions pull-right" style="display: none;">'
				+ '<a class="rechoose-link   js-select-flow"  data-role="rechoose"   href="javascript:void(0)" >重新选择</a> |'
				+ '<a class="delete-link  js-remove-flow" data-role="remove"  href="javascript:void(0)" >删除</a> '
				+ '</div>'
				+ '</div>'
				+ '<label class="js-select-flow" data-rv-hide="model.attrs.flow_key"><div class="plus">+</div>'
				+ '<div class="select-empty">请选择流程</div>' + '</label>'
				+ '</div>' + '</div>';
		

			__p += 		'</div>'+
			' </div>'+
			' </div>';
					
	}
	return __p
};


/**
 * 对话框属性
 */
this["DataTemplatebuilder"]["templates"]["dialog/base"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		
		__p += DataTemplatebuilder.templates['dialog/attributes']({});
		__p += 	DataTemplatebuilder.templates['edit/function-button']({rf:rf,type:'dialog'});
		__p += 	DataTemplatebuilder.templates['dialog/script']({rf:rf});
		
	}
	return __p
};

/**
 * 对话框---模版属性
 */
this["DataTemplatebuilder"]["templates"]["dialog/attributes"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		
		
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading">对话框-属性</div>\n'
				+ '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';
		
		__p += '<div class="form-group">'
			+ '		<label>是否多选：</label>'
			+ '			<select data-rv-value="model.'+ ((__t = (DataTemplatebuilder.options.attrs.MULTI)) == null ? '': __t) + '" >' 
			+ '				<option value="Y">多选</option>'
			+ '				<option value="N">单选</option>' 
			+ '		</select>' 
			+ '	</div>';
		

			__p += '<div class="form-group">'
					+ '	<label >尺寸：宽</label>'
					+ '	<input type="text"  data-rv-input="model.'	+ ((__t = (DataTemplatebuilder.options.attrs.WIDTH)) == null ? '': __t)+ '"  style="width:80px;"/>'
					+ '	<label >&nbsp;&nbsp;&nbsp;&nbsp;高</label>'
					+ '	<input type="text"  data-rv-input="model.'+ ((__t = (DataTemplatebuilder.options.attrs.HEIGHT)) == null ? '': __t) + '"  style="width:80px;"/>' 
					+ '</div>';

		
		__p +=  ' </div>'+ ' </div>'+' </div>';

	}
	return __p
};
/**
 * 模版属性
 */
this["DataTemplatebuilder"]["templates"]["dialog/script"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		
		// ==============模版脚本=====
		__p += '<div class="setting-panel panel">\n'+
							'<div class="panel-heading">对话框模版脚本</div>\n'+
								'<div class="panel-body collapse in" >\n'+
									'<div class="panel-body-content">';
		__p += '<a class="btn btn-sm  btn-block  btn-info js-template-script mt-5"  >设置对话框模版脚本</a>';
		
		__p += 		'</div>'+
				' </div>'+
			' </div>';

	}
	return __p
};
