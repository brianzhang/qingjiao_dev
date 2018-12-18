/**
 * 日期插件
 */
;(function($) {
	$.fn.WdatePicker = function(options) {
		if (!this.length)
			return this;
		options = $.extend(true, {}, options);

		this.each(function() {
			var _this = $(this);
			_this.bind("click", function() {
				options["onpicked"] = function(dp) {
					_this.trigger("change");
				};
				options["onclearing"] = function(dp) {
					_this.trigger("change");
				};
				options["errDealMode"] =4;
				WdatePicker(options);
			});
		});
	};
		
})(jQuery);

$(function() {
	dataTemplateFilterCondition.init();
});

var dataTemplateFilterCondition = {
	init : function() {
		this.label = $("#label");
		this.type = $("[name='type']");
		this.key = $("#key");
		this.builder = $("#builder");
		this.rightsDiv = $("#rightsDiv");
		this.rights = $("#rights");

		this.initData();
		this.bindSettingRights();
		this.initQueryBuilder();
	},
	initQueryBuilder : function() {
		this.builder.queryBuilder({
			plugins : [ 'sortable', 'bt-tooltip-errors' ],
			allow_empty : true,
			filters : this.fields2filters(),
			sources : this.getSources(),
			rules : this.getRules()
		});
	},
	getSources : function(){
		return [
				'fixed',
				'dynamic',
				'script'
			];
	},
	getRules : function() {
		var rules = {};
		if (!this.data.filter) {
			rules = {
				condition : 'AND',
				rules : [{
					empty : true
				}]
			};
		} else {
			var _filter = $.extend(true, {}, this.data.filter);
			rules = _filter;
		}

		return rules;
	},
	getType : function(dataType){
		var type  = 'string';
		switch(dataType){//字段数据类型
		case 'number':
			type = 'double';
			break;
		case 'date':
			type = 'date';
			break;
		default:
			type = 'string';
		}
		return type;
	},
	fields2filters : function() {
		var me = this,filters = [];
		$.each(this.fields, function(i, field) {
			if('column' != field.attrType){
				return false;
			}
		
			var filter = {
				id : field.name,
				label : field.label,
				origin_field : field
			};
			var type = me.getType(field.type);
			
			switch(field.field_type){//字段控件类型
			case 'text':
			case 'textarea':
				type = 'string';
				break;
			case 'editor':
				filter.operators = [
				                      'contains',
				                      'not_contains',
				                      'is_empty',
				                      'is_not_empty',
				                      'is_null',
				                      'is_not_null'];
				break;
			case 'number':
				filter.operators = ['equal','not_equal','less',
				                    'less_or_equal',
				                    "between",
				                    "not_between",
				                    'greater',
				                    'greater_or_equal',
				                    'is_null','is_not_null'];
				break;
			case 'datePicker':
				type = 'date';
				filter.operators = ['equal','not_equal','less',
				                    'less_or_equal',
				                    "between",
				                    "not_between",
				                    'greater',
				                    'greater_or_equal',
				                    'is_null','is_not_null'];
				if(typeof WdatePicker !== 'undefined'){//my97DatePicker
					filter.plugin = 'WdatePicker';
					filter.plugin_config = {
						format : 'yyyy-MM-dd'
					};
				}else{
					filter.plugin = 'datetimepicker';
					filter.plugin_config = {
						format:  'yyyy-MM-dd',
				 		language:'zh_CN',
			    		bootcssVer:3,
						autoclose:true,
						todayBtn:  1,
				    };
				}
				break;
			case 'number':
				type = 'double';
				break;
			case 'radio':
			case 'checkbox':
			case 'select':
				filter.operators = ['equal','not_equal','in','not_in','is_null','is_not_null'];
				filter.input =  field.field_type;
				var options = field["field_options"]["options"], values = {};
				$.each(options, function(i, o) {
					values[o.val] = o.label;
				});
				filter.values = values;
				break;
			case 'dictionary':
				type = 'string';
				filter.operators = [
								    'equal',
				                    'not_equal',
				                    'in',
				                    'not_in',
				                    'is_empty',
				                    'is_not_empty',
				                    'is_null',
				                    'is_not_null'
				                ];
				var dictionary = field["field_options"]["dictionary"];
				if($.isNotEmpty(dictionary)){
					function getValue(rule){
						var key = rule.$el.find('.rule-value-container [name$=_ID]').val();
						 	name= rule.$el.find('.rule-value-container [name$=_Name]').val();
						if($.isEmpty(key) || $.isEmpty(name))
							return ;
				        return {
				        	key:key,
				        	name:name
				        };
					}
					
					filter.input = function(rule, name) {
						 var $container = rule.$el.find('.rule-value-container');
					     $container.on('blur', '[name="'+ name +'_Name"]', function(){
					    	 	rule.value = getValue(rule);
					    	 	return true;
					       });
						  return '<div style="position: relative;">\
								  <input type="hidden" name="'+name+'_ID" id="'+name+'_ID" value="">\
								  <input type="text"   name="'+name+'_Name" id="'+name+'_Name" \
								  class="form-control dropdownTree"  data-toggle="dropdownTree" \
								  data-dic="'+dictionary+'"  data-key="#'+name+'_ID" readonly="readonly"></div>';
					};
					
					filter.valueGetter = function(rule) {
				        return getValue(rule);
				    };
				    
				  	filter.valueSetter = function(rule, value) {
				        if (rule.operator.nb_inputs > 0 && $.isNotEmpty(value) ) {
				           rule.$el.find('.rule-value-container [name$=_ID]').val(value.key);
				          rule.$el.find('.rule-value-container [name$=_Name]').val(value.name);
				        }
				    };
				}
				
				
				break;
			case 'selector':
				type = 'string';
				filter.operators = [
				    'equal',
                    'not_equal',
                    'contains',
                    'not_contains',
                    'in',
                    'not_in',
                    'is_empty',
                    'is_not_empty',
                    'is_null',
                    'is_not_null'
                ];
				var selectorType = field["field_options"]["selector_type"];
				filter.field_type = field.field_type ;
				function getSelector(ids,names){
					var _i,_len,selector =[];
					if(ids.length <= 0){
						rule.value = null;
						return;
					}
					for (_i = 0, _len = ids.length; _i < _len; _i++) {
						selector.push({
							id:ids[_i],
							name:names[_i]
						});
					}
					return selector;
				}
				
				filter.input = function(rule, name) {
					var $container = rule.$el.find('.rule-value-container');
					$container.off("click").on('click', '[ data-toggle="selector"]', function(){
						var options = $(this).data();
						SelectorDialog.clickEvent(options,function(ids,names){
							rule.value= getSelector(ids,names);
						});
					});
					return '<input type="hidden" name="'+name+'_ID" id="'+name+'_ID" value="">\
							<input type="text" class="form-control search-selector" name="'+name+'_Name" \
							id="'+name+'_Name"  readonly="readonly">\
							<button type="button" class="btn  btn-info btn-mm" data-toggle="selector" \
							data-type="'+selectorType+'" data-id="#'+name+'_ID" data-name="#'+name+'_Name"> \
							<i class="fa fa-'+selectorType+'"></i></button> ';
				};
				
				filter.valueGetter = function(rule) {
					var ids = rule.$el.find('.rule-value-container [name$=_ID]').val();
						 names = rule.$el.find('.rule-value-container [name$=_Name]').val();
					if($.isEmpty(ids) || $.isEmpty(names))
						return ;
			        return getSelector(ids,names);
			    };
			    
			  	filter.valueSetter = function(rule, value) {
			        if (rule.operator.nb_inputs > 0 && $.isNotEmpty(value) ) {
						var ids = _.compact(_.pluck(value, 'id')).join(','),
			    			names = _.compact(_.pluck(value, 'name')).join(',');
						
			           rule.$el.find('.rule-value-container [name$=_ID]').val(ids);
			          rule.$el.find('.rule-value-container [name$=_Name]').val(names);
			        }
			    };
				break;
			}
		
			filter.type = type;
			//屏蔽附件/签名
			if(field.field_type != "attachment" &&  field.field_type != "signature"){
				filters.push(filter);
			}
		});

		return filters;
	},
	
	/**
	 * 绑定权限设置事件
	 */
	bindSettingRights : function() {
		var _this = this;
		$(document).on(
			"click",
			"#settingRights",
			function() {
				var data = $.isEmpty(_this.rights.val()) ? {} : JSON
						.parse(_this.rights.val());
				new RightsDefDialog({
					data : data,
					title : '字段权限',
					key : 'formRights',
					callback : function(data) {
						RightsSetting.setRights(data);
					}
				}).show();
			}
		);
	},
	/**
	 * 生成唯一串
	 */
	UUID : function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
			function(c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r
						: (r & 0x3 | 0x8);
				return v.toString(16);
			});
	},
	/**
	 * 初始化数据
	 */
	initData : function() {
		this.data = frameElement.dialog.params.data;
		
		this.fields = frameElement.dialog.params.fields;

		this.label.val(this.data.label);
		
		this.key.val($.isEmpty(this.data.key)?this.UUID():this.data.key);

		$("input[name='type'][value=" + this.data.type + "]").prop("checked", true);

		/*
		 * if(this.data.type == 'condition'){
		 * this.builder.queryBuilder('setRules', this.data.filter); }
		 */
		RightsSetting.init(this.rights, this.rightsDiv);
		RightsSetting.setRights(this.data.rights);
	},
	/**
	 * 获取返回数据
	 */
	getData : function() {
		var type = $("input[name='type']:checked").val(),
			filter = '';
		if ('condition' == type) {
			var rules = this.builder.queryBuilder('getRules');
			if ($.isEmptyObject(rules)) {
				return;
			}
			var _rules = $.extend(true, {}, rules);
			filter = _rules;
		} else if('expression' == type){
			//TODO 表达式过滤
		}

		this.data = {
			label : this.label.val(),
			type : this.type.val(),
			key:this.key.val(),
			filter : filter,
			rights : JSON.parse(this.rights.val())
		};
		return this.data;
	}
};
