// TODO 查询条件渲染
	(function() {
		var i, _i, _j, _len, _len1, _ref, _ref1;
		var $, _str;
			$ = jQuery;
			_str = _.str;
		DataTemplateRenderer.Views.ResponseQuery = Backbone.View.extend({
			events : {},
			initialize : function(options) {
				this.model = options.model;
				this.field_type = this.model.field_type;
			},
			tagName : 'div',
			className : 'form-group',
			render : function() {
				this.$el.html(JST['partials/response_query_field'](this));
				return this;
			},
			getDomId : function() {
				return this.cid;
			}
		});
		DataTemplateRenderer.Views.ResponseQueryDateRange = DataTemplateRenderer.Views.ResponseQuery
		.extend({
			field_type : 'dateRange',
			render : function() {
				DataTemplateRenderer.Views.ResponseQuery.prototype.render
						.apply(this, arguments);
				setTimeout((function(_this) {
					return function() {
						DatetimepickerUtil.initDateRange();
					};
				})(this), 0);

				return this;
			}
		});
		
		DataTemplateRenderer.Views.ResponseQuerySelector = DataTemplateRenderer.Views.ResponseQuery
				.extend({
					field_type : 'selector ',
					render : function() {
						DataTemplateRenderer.Views.ResponseQuery.prototype.render.apply(this, arguments);
						setTimeout((function(_this) {
							return function() {
								$('[data-toggle="selector"]', _this.$el).each(
										function() {
											SelectorDialog.selector($(this));
										});

								$('[data-toggle="clear"]', _this.$el).each(
										function() {
											SelectorDialog.clear($(this));
										});
							};
						})(this), 0);

						return this;
					}
				});
		
	DataTemplateRenderer.Views.ResponseQueryCustomDialog = DataTemplateRenderer.Views.ResponseQuery.extend({
			field_type : 'customDialog ',
			events: {
				 'click [data-toggle="customdialog"]':'selectDialog'	
			},
			selectDialog:function(){
				var dialogType = this.model.getDialogType(),
						dialogKey = this.model.getDialogKey(),
						isSingle = true,
						name = this.model.getName(),
						$id = $("#"+name+"ID");
						$name = $("#"+name);
				if(dialogType =='dialog' ){
		    		if($.isEmpty(dialogKey)){
		    			DialogUtil.msg("未绑定对话框");
		    			return;
		    		}
		    		
		    		DataTemplateUtil.open(dialogKey,{
		    		 	isSingle : isSingle,
		    			params:{},
		    			callback:function(data){
		    				var idVal ="",nameVal ="";
				    		if($.isNotEmpty(data)){
				    			var d = data[0];
				    			idVal = d[FormOptions.t.DATA_KEY.ID];
				    			nameVal = d[FormOptions.t.DATA_KEY.TITLE];
				    		}
				    		$id.val(idVal);
				    		$name.val(nameVal);
		    			}
		    		});
		    	}
				//TODO 其他未做
			}
		});
		
		DataTemplateRenderer.Views.ResponseQueryAddress = DataTemplateRenderer.Views.ResponseQuery
				.extend({
					field_type : 'address',
					render : function() {
						DataTemplateRenderer.Views.ResponseQuery.prototype.render
								.apply(this, arguments);
						setTimeout(
								(function(_this) {
									return function() {
										var name = _this.model.getName();
										var $el = $('[data-toggle="address"]');
										$el.citypicker().on(
														"cp:updated",
														function(el) {
															var cp = $el.data('citypicker'), val = '';
															$.isNotEmpty(val = cp.getCode('district'))
																|| $.isNotEmpty(val = cp.getCode('city'))
																|| $.isNotEmpty(val = cp.getCode('province'))
																|| $.isNotEmpty(val = cp.getCode('country'));

															$("#" + name).val(val);
														});
										$el.citypicker().on("cp:reset",
												function(el) {
													$("#" + name).val("");
												})
									};
								})(this), 0);

						return this;
					}
				});

		_ref = _.without(DataTemplateRenderer.FIELD_TYPES,"dateRange", "selector","customDialog", "address");
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			DataTemplateRenderer.Views["ResponseQuery" + (_str.capitalize(i))] = DataTemplateRenderer.Views.ResponseQuery
					.extend({
						field_type : i
					});
		}

	}).call(this);