// TODO 模板渲染model
	(function() {
		var i, _i, _len, _ref;
		var $, _str;
		$ = jQuery;
		_str = _.str;
		DataTemplateRenderer.Models.ResponseTemplate = Backbone.DeepModel
				.extend({
					initialize : function(_attrs, dataTemplateRenderer,options) {
						this.template_renderer = dataTemplateRenderer;
						
						this.response_data =_attrs;
						this.response_fields =  this.getFields((_attrs?_attrs.fields:[]));
						
						this.ext_attrs = _attrs.ext_attrs||{};
						
						this.options = options||{};
						
						this[DataTemplateRenderer.key.template_type] = _attrs[DataTemplateRenderer.key.template_type];

					},
					getFields:function(fields){
						var response_fields = {};
						if($.isEmpty(fields))
							return response_fields ;
						var model, rf, _i, _len, _ref;
						for (_i = 0, _len = fields.length; _i < _len; _i++) {
							rf = fields[_i];
							model = new Backbone.DeepModel(rf);

							response_fields[rf.name] = model;
						}
						
						return response_fields;
					},
					getDomId : function() {
						return this.cid;
					},
					getData :function(){
						return this.get("data");
					},
					changeData:function(){
						if(	this.options.changeData)
							this.options.changeData(this.getData());
					}
				});
		//列表
		DataTemplateRenderer.Models.ResponseTemplateList = DataTemplateRenderer.Models.ResponseTemplate
				.extend({
					getViewId : function() {
						return this.getDomId() + "Grid";
					},
					getView :function(){
						return this.$view;
					},
					getPagerId : function() {
						return this.getDomId() + "Pager";
					},
					getData:function(){
						return this.get("data");
					}
				});
		

		//值对象
		DataTemplateRenderer.Models.ResponseTemplateValueSource = DataTemplateRenderer.Models.ResponseTemplateList
				.extend({});

		_ref = _.without(DataTemplateRenderer.TEMPLATE_TYPES, "list","valueSource");
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			DataTemplateRenderer.Models["ResponseTemplate" + (_str.capitalize(i))] = DataTemplateRenderer.Models.ResponseTemplate
					.extend({
						template_type : i
					});
		}

	}).call(this);