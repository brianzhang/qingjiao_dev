	// 查询条件model
	(function() {
		var i, _i, _len, _ref;
		var $, _str;
		$ = jQuery;
		_str = _.str;
		DataTemplateRenderer.Models.ResponseQuery = Backbone.DeepModel.extend({
			initialize : function(_attrs, options, response_fields) {
				this.options = options;
				this.response_fields = response_fields;
				this["field_type"] = _attrs["field_type"];
				this.form_field = _attrs["form_field"];
			},
			getLabel : function() {
				return this.get("label");
			},
			getName : function() {
				return this.get("name");
			},
			getFieldOptions:function(key){
				return this.get("field_options")? this.get("field_options")[key]:null;
			},
			getFieldName : function() {
				return this.get("name");
			}
		});
		//下拉
		DataTemplateRenderer.Models.ResponseQuerySelect = DataTemplateRenderer.Models.ResponseQuery.extend({
					getOptions : function() {
						 return this.getFieldOptions("options")||[];
					}
				});
		//单选
		DataTemplateRenderer.Models.ResponseQueryRadio = DataTemplateRenderer.Models.ResponseQuerySelect.extend({});
		//多选
		DataTemplateRenderer.Models.ResponseQueryCheckbox = DataTemplateRenderer.Models.ResponseQuerySelect.extend({});
		
		// 选择器
		DataTemplateRenderer.Models.ResponseQuerySelector = DataTemplateRenderer.Models.ResponseQuery
				.extend({
					getBindId : function() {
						return this.getFieldOptions("bind_id");
					},
					getBindName : function() {
						var id;
						if ($.isEmpty(id = this.getBindId()))
							return "";
						return this.response_fields[id]? this.response_fields[id].get("field_name"):"";
					},
					getSelectorType : function() {
						return this.getFieldOptions("selector_type")||'user';
					}
				});
		
		// 自定义对话框
		DataTemplateRenderer.Models.ResponseQueryCustomDialog = DataTemplateRenderer.Models.ResponseQuery
				.extend({
					getDialogKey : function() {
						return this.getFieldOptions("dialog")||'';
					},
					getDialogType : function() {
						return this.getFieldOptions("dialog_type")||'dialog';
					},
					getIcon:function(){
						return 'fa fa-search-plus';
					}
				});

		// 数据字典
		DataTemplateRenderer.Models.ResponseQueryDictionary = DataTemplateRenderer.Models.ResponseQuery
				.extend({
					getDictionary : function() {
						 return this.getFieldOptions("dictionary")||'';
					}
				});
		

		_ref = _.without(DataTemplateRenderer.FIELD_TYPES, "select", "checkbox","radio","selector",'customDialog', "dictionary");
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			DataTemplateRenderer.Models["ResponseQuery" + (_str.capitalize(i))] = DataTemplateRenderer.Models.ResponseQuery
					.extend({
						field_type : i
					});
		}

	}).call(this);