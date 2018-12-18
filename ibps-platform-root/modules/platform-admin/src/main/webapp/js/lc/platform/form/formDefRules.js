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
				options["onpicking"] = function(dp) {
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
	formDefRules.init();
});

var formDefRules = {
	OPERATORS :[
	            { type: 'eq',            nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean'] },
			    { type: 'not',        nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean'] },
			    { type: 'contains',               nb_inputs: 1, multiple: true,  apply_to: ['string', ] },
			    { type: 'not_contains',           nb_inputs: 1, multiple: true,  apply_to: ['string'] },
			    { type: 'gt',             nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime'] },
			    { type: 'lt',    			nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime'] },
			    { type: 'between',          nb_inputs: 2, multiple: false, apply_to: ['number', 'datetime'] },
			    { type: 'not_between',      nb_inputs: 2, multiple: false, apply_to: ['number', 'datetime'] },
			    { type: 'shorter',     nb_inputs: 1, multiple: false, apply_to: ['string'] },
			    { type: 'longer',     nb_inputs: 1, multiple: false, apply_to: ['string'] },
			    { type: 'present',           nb_inputs: 0, multiple: false,  apply_to: ['string', 'number', 'datetime', 'boolean'] },
			    { type: 'blank',         nb_inputs: 0, multiple: false, apply_to: ['string'] }
	],
	init : function() {

		this.initData();

		this.initEvent();
		
	},
	initEvent:function(){
		var me = this;
		$('#createRules').on("click",function(){
			me.initRule();
		});
	},
	initRule:function(data){
		var id = $.uniqueId(),
			tempData = {id:id,fields:this.fields};
		if($.isNotEmpty(data)){
			tempData.conditionType = data.type?data.type:'show';
		}
		
		var	html = template('ruleTemp', tempData),
			h  = $(html);
		$("#builder").append(h);
		this.initRemoveRule(h);
		this.initMultiselect(h,$.isEmpty(data)?null:data.fields);
		this.initQueryBuilder(id,$.isEmpty(data)?null:data.conditions);
	},
	initRemoveRule:function(h){
		$(".remove-rule",h).on("click",function(){
			var self = $(this);
			DialogUtil.confirm("确定删除?",function(r){
				if(r){
					self.closest("fieldset").remove();
				}
			});
	
		});
	},
	initMultiselect:function(h,data){
		var sel =$('.condition-field',h);
		sel.multiselect({
			nonSelectedText: "未选择",
			allSelectedText: "全选",
	        uncheckAllText: '全不选',
	        nSelectedText:'已选择'
		});
		if($.isNotEmpty(data))
		sel.multiselect('select',data);
		
	},
	initQueryBuilder : function(id,data) {
		$("#builder"+id).queryBuilder({
			plugins : [ 'sortable', 'bt-tooltip-errors'],
			conditions:['any','all'],
			allow_empty : true,
			allow_groups:false,
			filters : this.fields2filters(),
			rules : this.getRules(data),
			operators: this.OPERATORS
		});
	},
	getRules : function(data) {
		var rules = {};
		if ($.isEmpty(data)) {
			rules = {
				condition : 'any',
				rules : [{
					empty : true
				} ]
			};
		} else {
			rules = data;
		}

		return rules;
	},
	fields2filters : function() {
		var filters = [];
		$.each(this.fields, function(i, field) {
			if(!field.name)
				return true;
			var filter = {
				id : field.name,
				label : field.label,
				type : 'string'
			};
			
			if (field.field_type == "text" || field.field_type == "textarea" || field.field_type == "editor"   ) {
				filter.operators = ['eq','not','contains','not_contains','shorter','longer','present','blank'];
			}else if (field.field_type == "datePicker") {
				filter.operators = ['eq','not','gt','lt','between','not_between','present','blank'];
				filter.type = 'date';
				
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
			
			}  else if (field.field_type == "number") {
				filter.operators = ['eq','not','gt','lt','between','not_between','present','blank'];
				filter.type = 'integer';
			}
			else if (field.field_type == "radio" || field.field_type == "checkbox" || field.field_type == "select") {
				filter.operators = ['eq','not','contains','not_contains','present','blank'];
				filter.field_type = field.field_type ;
				filter.input = field.field_type ;
				var options = field["field_options"]["options"], values = {};
				$.each(options, function(i, o) {
					values[o.val] = o.label;
				});
				filter.values = values;
			}
			else if (field.field_type == "dictionary") {
				filter.operators = ['eq','not','contains','not_contains','present','blank'];
				var dictionary = field["field_options"]["dictionary"];
				
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
					  return '\
					  <div style="position: relative;">\
					  <input type="hidden" name="'+name+'_ID" id="'+name+'_ID" value="">\
					  <input type="text"   name="'+name+'_Name" id="'+name+'_Name"  class="form-control dropdownTree"  data-toggle="dropdownTree" data-dic="'+dictionary+'"  data-key="#'+name+'_ID" readonly="readonly"></div> ';
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
				
				
			}else if (field.field_type == "selector") {
				filter.operators = ['eq','not','contains','not_contains','present','blank'];
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
					 $container.on('click', '[ data-toggle="selector"]', function(){
							var options = $(this).data();
						  SelectorDialog.clickEvent(options,function(ids,names){
							  rule.value= getSelector(ids,names);
						  });
					 });
					  return '\
					  <input type="hidden" name="'+name+'_ID" id="'+name+'_ID" value="">\
					  <input type="text" class="form-control search-selector" name="'+name+'_Name"  id="'+name+'_Name"  readonly="readonly">\
					  <button type="button" class="btn  btn-info btn-mm" data-toggle="selector" data-type="'+selectorType+'" data-id="#'+name+'_ID" data-name="#'+name+'_Name"> <i class="fa fa-'+selectorType+'"></i></button> ';
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

			}
			filters.push(filter);
		});
		return filters;
	},
	initData : function() {
		this.fields =  frameElement.dialog.params.fields;
		var data = frameElement.dialog.params.data;
		if($.isEmpty(data))
			return;
	      var  _i, _len, _ref;
	      for (_i = 0, _len = data.length; _i < _len; _i++) {
	    	   this.initRule(data[_i]);
	      }
	},
	getData : function() {
		var rules =[],flag = false;
		$(".rule-fieldset").each(function(){
			var self = $(this), rule ={};
			var conditions = self.find(".query-builder").queryBuilder('getRules');
			  if ($.isEmptyObject(conditions)) {
				   flag =true;
				  return false;
			  }else{
				  flag = false;
			  }
			
			rule.conditions = conditions;
			
			rule.type=self.find(".condition-type").val();
			rule.fields=self.find(".condition-field").val();
			rules.push(rule);
		});
		if(flag)
			return;
		//return;
		  if (!$.isEmptyObject(rules)) 
			  return rules;
		  else{
			  DialogUtil.msg("请设置规则！");
			  return; 
		  }

	/*	var rules = this.builder.queryBuilder('getRules');
		  if (!$.isEmptyObject(rules)) {
			  	return JSON.parse(JSON.stringify(rules, null, 2));
		}
		  return;*/
	}
};
