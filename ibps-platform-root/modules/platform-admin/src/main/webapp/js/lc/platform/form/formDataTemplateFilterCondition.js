/**
 * 日期插件
 */
;(function($) {
	$.fn.my97 = function(options) {
		if (!this.length)
			return this;
		options = $.extend(true, {}, options);

		this.each(function() {
			var _this = $(this);
			_this.bind("click", function() {
				options["onpicking"] = function(dp) {
					_this.trigger("change");
				};
				WdatePicker(options);
				_this.blur();
			});
		});
	}
})(jQuery);

$(function() {
	formDataTemplateFilterCondition.init();
});

var formDataTemplateFilterCondition = {

	init : function() {
		this.label = $("#label");
		this.type = $("[name='type']");
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
			rules : this.getRules()
		});
	},
	getRules : function() {
		var rules = {};
		if (!this.data.filter) {
			rules = {
				condition : 'AND',
				rules : [ {
					empty : true
				} ]
			};
		} else {
			rules = this.data.filter;
		}

		return rules;
	},
	fields2filters : function() {
		var filters = [];
		$.each(this.fields, function(i, field) {
			var filter = {
				id : field.name,
				label : field.label,
				type : 'string'
			};

			if (field.field_type == "datePicker") {
				filter.type = 'date';
				filter.plugin = 'my97';
				filter.plugin_config = {
					format : 'yyyy-MM-dd'
				};
			} else if (field.field_type == "radio") {
				filter.input = 'radio';
				var options = field["field_options"]["options"], values = {};
				$.each(options, function(i, o) {
					values[o.val] = o.label;
				});
				filter.values = values;
			} else if (field.field_type == "checkbox") {
				filter.input = 'checkbox';
				var options = field["field_options"]["options"], values = {};
				$.each(options, function(i, o) {
					values[o.val] = o.label;
				});
				filter.values = values;
			} else if (field.field_type == "select") {
				filter.input = 'select';
				var options = field["field_options"]["options"], values = {};
				$.each(options, function(i, o) {
					values[o.val] = o.label;
				});
				filter.values = values;
			}

			filters.push(filter);
		})

		return filters;
	},
	initData : function() {
		this.data = frameElement.dialog.params.data;
		
		this.fields = frameElement.dialog.params.fields;


		this.label.val(this.data.label);

		$("input[name='type'][value=" + this.data.type + "]").prop("checked",
				true);

		/*
		 * if(this.data.type == 'condition'){
		 * this.builder.queryBuilder('setRules', this.data.filter); }
		 */
		RightsSetting.init (this.rights,this.rightsDiv);
		RightsSetting.setRights(	this.data.rights);
	},
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
							RightsSetting.setRights(	data);
						}
					}).show();
				});
	},
	UUID : function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
				function(c) {
					var r = Math.random() * 16 | 0, v = c == 'x' ? r
							: (r & 0x3 | 0x8);
					return v.toString(16);
				});
	},
	getData : function() {
		var type = $("input[name='type']:checked").val();
		filter = '';
		if (type == 'condition') {
			var rules = this.builder.queryBuilder('getRules');
			if ($.isEmptyObject(rules)) {
				return;
			}
			filter = rules;
		} else {

		}

		this.data = {
			label : this.label.val(),
			type : this.type.val(),
			filter : filter,
			rights : JSON.parse(this.rights.val())
		};
		return this.data;
	}
};
