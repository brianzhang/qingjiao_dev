/**
 * 数据模版展示页面
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-10-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function(window) {
	var $, _str;
	$ = jQuery;
	_str = _.str;

	(function() {
		var DataTemplateRenderer;
		window.DataTemplateRenderer = DataTemplateRenderer = Backbone.View
				.extend({
					defaults : {
						target : '[data-template-renderer]'
					},
					constructor : function(options) {
						var p, _i, _len, _ref;
						this.options = $.extend(
								{}, this.defaults, options);
						this.setElement($(this.options.target));

					      // 表单的事件
				    	  if(options.attrs && options.attrs.script){
				    		  try {
				    			  $("head") .append('<script type="text/javascript">  try {\n'+options.attrs.script+'\n} catch (e) {window.console && console.error(e);}</script>');
							} catch (e) {
							   	 if(console){ 
							   		 console.info(e);
							   	}
							}
				    	  }
						
						this.trigger('viewRendered', this);
					

						// 加载模板
						this.loadTemplateServer((function(_this) {
									return function() {
										var _base;
										// 如果有绑定表单-》初始化表单字段
										_this.initFormFields();
										
										// 初始化模板Model
										_this.initResponseTemplates();
										// 初始化模板视图
										_this.initVeiwTemplates();

										_this.trigger('ready');
								        // 页面加载完成事件
								          $.JTemplate._onLoad(_this);
										
										return typeof (_base = _this.options).onReady === "function" ? _base
												.onReady()
												: void 0;
									}
								})(this));
					},
					/**
					 * 加载模板server
					 */
					loadTemplateServer : function(cb) {
						if ((this.options.templates != null))
							return cb();
						else {
							var _base;
							return typeof (_base = this.options).onReady === "function" ? _base
									.onReady()
									: void 0;
						}
					},
					// 如果有绑定表单-》初始化表单字段
					initFormFields : function() {
						var model, rf, _i, _len, _ref;
						this.response_fields = {};
						_ref = this.options.fields;
						if($.isEmpty(_ref))
							return;
						for (_i = 0, _len = _ref.length; _i < _len; _i++) {
							rf = _ref[_i];
							model = new Backbone.DeepModel(rf);

							this.response_fields[rf.name] = model;

							if (model.get(FormOptions.t.mappings.IS_PK))
								this.unique = rf.name ? rf.name: this.unique;
						}
					},
					getTemplateType:function(options){
						if(options.type == 'valueSource'){
							return  options.type;
						}else{
							if(options.showType == 'compose')
								return options.composeType;
							else
								return options.showType;
						}
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
					initResponseTemplates : function() {
						var model, rf, _i, _len, _ref;
						this.response_templates = new Backbone.Collection;
						_ref = this.options.templates;
						var isDialog =  this.options.type == 'dialog'?true:false,
							showType =  this.options.showType,
							template_type =  this.getTemplateType(this.options);
						
						if(showType == 'compose'){
							rf = {};
							rf.templates = _ref;
						}else{
							rf = _ref[0];
							rf["datasetKey"] = this.options.datasetKey;
							rf["unique"] = this.options.unique ? this.options.unique: DataTemplateRenderer.key.pkKey;
							rf["fields"] = this.options.fields;
						}
						
						rf[DataTemplateRenderer.key.template_type] =template_type;
						rf["isSingle"] = this.options["isSingle"]||false;
						rf["isDialog"] =  isDialog;
						rf["dynamic_params"] = this.options["params"]||"";
						rf["shows"] = this.options["shows"]||"";
						rf["ext_attrs"] = this.options["attrs"]||{};
						rf["ext_attrs"]["template_key"] =  this.options["key"];
						rf["label"] = this.options["name"];
						
						model = new DataTemplateRenderer.Models["ResponseTemplate"+ (_str.capitalize(rf[DataTemplateRenderer.key.template_type]))](rf, this);

						this.response_templates.add(model);
					},
					initVeiwTemplates : function() {
						var view;
						this.response_template_views =  new Backbone.Collection;
						this.response_templates.each((function(_this) {
									return function(rf) {
										view = new DataTemplateRenderer.Views["ResponseTemplate"+ (_str.capitalize(rf[DataTemplateRenderer.key.template_type]))]({
													model : rf
												});
										_this.$el.append(view.render().el);
										_this.response_template_views.add(view);
									};
								})(this));
					},
				
					getData:function(){
						//获得选中的值的对象
						var  data = [];
						this.response_templates.each(function(rf) {   
							data =  rf.getData();
						});
						return data||[] ;
					},
					cleanSelected:function(){
						this.response_template_views.each((function(_this) {
							return function(rf) {
								Backbone.trigger('cleanSelected');
							};
						})(this));
					}

				});
		DataTemplateRenderer.TEMPLATE_TYPES = ["list","tree","treeList","listTree","dialogList","dialogTree","dialogTreeList","dialogListTree","valueSource" ];

		DataTemplateRenderer.BUTTON_TYPES = _.keys(FormButtons.t.buttons);

		// //all 所有，toolbar 顶部，manage 管理

		DataTemplateRenderer.DEFAULT_BUTTONS = FormButtons.t.buttons;

		DataTemplateRenderer.FIELD_TYPES = FormOptions.t.INPUT_FIELD_TYPES;
		
		DataTemplateRenderer.DICTIONARY_CACHE = {};

		DataTemplateRenderer.key = {
			template_type : "template_type",
			name : "name",
			pkKey : "id_"
		}
		DataTemplateRenderer.Views = {};

		DataTemplateRenderer.Models = {};
	}).call(this);

	(function() {
		DataTemplateRenderer.VERSION = '1.1.0';
	}).call(this);

	
	// ==========TODO 模板界面 ===============
	if (!window.JST) {
		window.JST = {};
	}
	
	window.JST["partials/response_template"] = function(__obj) {
		var _safe = function(value) {
			if (typeof value === 'undefined' && value == null)
				value = '';
			var result = new String(value);
			result.ecoSafe = true;
			return result;
		};
		return (function() {
			var __out = [], __self = this, _print = function(value) {
				if (typeof value !== 'undefined' && value != null)
					__out.push(value.ecoSafe ? value : __self.escape(value));
			}, _capture = function(callback) {
				var out = __out, result;
				__out = [];
				callback.call(this);
				result = __out.join('');
				__out = out;
				return _safe(result);
			};

			(function() {
				_print(_safe(JST["templates/" + this.template_type](this)));

			}).call(this);

			return __out.join('');
		}).call((function() {
			var obj = {
				escape : function(value) {
					return ('' + value).replace(/&/g, '&amp;').replace(/</g,
							'&lt;').replace(/>/g, '&gt;').replace(/"/g,
							'&quot;');
				},
				safe : _safe
			}, key;
			for (key in __obj)
				obj[key] = __obj[key];
			return obj;
		})());
	};
	
	


})(window);