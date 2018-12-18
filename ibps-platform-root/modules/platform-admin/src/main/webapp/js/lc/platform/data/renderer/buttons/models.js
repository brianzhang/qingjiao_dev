	// TODO 按钮渲染model
	(function() {
		var i, _i, _len, _ref;
		var $, _str;
		$ = jQuery;
		_str = _.str;
		
		DataTemplateRenderer.Models.ResponseButton = Backbone.DeepModel.extend({
			initialize : function(_attrs,view) {
				var templateRenderer = view.model.template_renderer;
				this.options = view.model.ext_attrs
				this.response_fields = templateRenderer.response_fields;
				this.template_model = view.model;
				this.template_view = view;
				this["button_type"] = _attrs["button_type"];
			},
			isDropdown : function() {
				return this.get("dropdown") ? true : false;
			},
			getDropdown : function() {
				return this.get("dropdown");
			},
			getType : function() {
				return this.get("button_type");
			},
			isLabel:function(){
				return $.isEmpty( this.get("is_label"))?true: this.get("is_label");
			},
			getLabel : function() {
				return this.isLabel()?( this.get("label")||""):"";
			},
			getTitle : function(){
				return !this.isLabel()?( this.get("label")||""):"";
			},
			getSize : function() {
				return this.get("size")|| ' ';
			},
			getStyle : function() {
				return this.get("style")|| 'btn-primary';
			},
			getIcon : function() {
				return this.get("icon")||'fa fa-cog';
			}
			
		});

		_ref = DataTemplateRenderer.BUTTON_TYPES;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			DataTemplateRenderer.Models["ResponseButton" + (_str.capitalize(i))] = DataTemplateRenderer.Models.ResponseButton
					.extend({
						button_type : i
					});
		}

	}).call(this);