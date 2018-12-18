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
		var TemplateRenderer;
		window.TemplateRenderer = TemplateRenderer = Backbone.View
				.extend({
					defaults : {
						target : '[data-template-renderer]'
					},
					constructor : function(options) {
						var p, _i, _len, _ref;
						this.response_data = options, this.options = $.extend(
								{}, this.defaults, options);
						this.setElement($(this.options.target));

					      // 表单的事件
				    	  if(options.attrs && options.attrs.script){
				    		  try {
				    			  $("head") .append('<script type="text/javascript">  try {\n'+options.attrs.script+'\n} catch (e) {if(console){ console.info(e);	}}</script>');
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
										// 初始化字段
										_this.initFormFields();
										// 初始化模板Model
										_this.initResponseTemplates();
										if(_this.isQueryConditions())
										// 顶部按钮,和查询条件
										_this.initToolbarPanel();
										// 初始化模板视图
										_this.initVeiwTemplates();
										// 收缩/展开
										_this.handlerCollapseExpand();

										_this.trigger('ready');
								        // 表单加载完成事件
								          $.JList._onLoad(_this);
										
										return typeof (_base = _this.options).onReady === "function" ? _base
												.onReady()
												: void 0;
									}
								})(this));
					},
					isQueryConditions:function(){
						if(!this.options.attrs)
							return true;
						return this.options.attrs.queryConditions == 'N'?false:true;
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
					initFormFields : function() {
						var model, rf, _i, _len, _ref;
						this.response_fields = {};
						this.response_field_names = {};
						this.pkKey = this.options.pk ? this.options.pk
								: TemplateRenderer.key.pk;
						_ref = this.options.fields;
						for (_i = 0, _len = _ref.length; _i < _len; _i++) {
							rf = _ref[_i];
							model = new Backbone.DeepModel(rf);

							this.initDictionary(model);

							this.response_fields[rf.name] = model;
							
							this.response_field_names[rf.field_name] = model;

							if (model.get(FormOptions.t.mappings.IS_PK))
								this.pkKey = rf.field_name ? rf.field_name: this.pkKey;
						}
					},
					initDictionary : function(model) {
						var me = this, 
							typeKey = model.get(FormOptions.t.mappings.DICTIONARY);
						
						if ($.isEmpty(typeKey) || $.isNotEmpty(TemplateRenderer.DICTIONARY_CACHE[typeKey]))
							return;
						$.ajax({
							type : "GET",
							url : __ctx
									+ "/platform/cat/dictionary/getByTypeKeyForDic.htm",
							data : {
								typeKey : typeKey,
								displayMode : model.get(FormOptions.t.mappings.DISPLAY_MODE),
								split : model.get(FormOptions.t.mappings.SPLIT)
							},
							dataType : "json",
							async : false,
							success : function(data) {
								var options = [];
								
								_.each(data, function(d) {
									options.push({
										val : d.key,
										label : d.name
									});
								});
								
								model.set(FormOptions.t.mappings.OPTIONS,options);

							}
						});
						
						$.ajax({
							type : "GET",
							url : __ctx
									+ "/platform/cat/dictionary/getByTypeKeyForComBo.htm",
							data : {
								typeKey : typeKey,
								displayMode : model.get(FormOptions.t.mappings.DISPLAY_MODE),
								split : model.get(FormOptions.t.mappings.SPLIT)
							},
							dataType : "json",
							async : false,
							success : function(data) {
								TemplateRenderer.DICTIONARY_CACHE[typeKey] = data;
							}
						});
			},
			parseDicData : function(options, __data){
				var me = this;
				_.each(__data, function(d) {
					options.push({
						val : d.key,
						label : d.name
					});
					if(undefined != d.children){
						me.parseDicData(options, d.children);
					}
				});
			},
			initResponseTemplates : function() {
				var model, rf, _i, _len, _ref, fieldType;
				this.response_toolbar_buttons = new Backbone.Collection;
				this.response_search_buttons =  new Backbone.Collection;
				this.response_manage_buttons = [];
				this.response_templates = new Backbone.Collection;
				_ref = this.options.templates;
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					rf = _ref[_i];
					model = new TemplateRenderer.Models["ResponseTemplate"+ (_str.capitalize(rf[TemplateRenderer.key.template_type]))](rf, this);

					this.setResponseButtons(rf.function_buttons ? rf.function_buttons: []);

					this.response_templates.add(model);
				}
			},
			setResponseButtons : function(buttons) {
				var model, rf, _i, _len,isHasSeach = false;
				for (_i = 0, _len = buttons.length; _i < _len; _i++) {
					rf = buttons[_i];
					//查询列默认是顶部
					if(FormButtons.t.hasSearchPermission(rf.button_type) && !rf.position)
						rf.position = 'toolbar';
					if(rf.button_type == 'search')
						isHasSeach =true;
					//顶部按钮
					if (FormButtons.t.hasButton(rf.button_type,'toolbar',rf.position))
						this.response_toolbar_buttons.add(this.getButtonModel(rf));
					//查询按钮
					if (FormButtons.t.hasButton(rf.button_type,'search',rf.position)){
						rf.size = 'btn-lg';
						this.response_search_buttons.add(this.getButtonModel(rf));
					}
					
					//管理列按钮
					if (FormButtons.t.hasButton(rf.button_type,'manage',rf.position))
						this.response_manage_buttons.push(rf);
				}
				if(!isHasSeach){//判断是否加入搜索条件，并且没有在查询条件列 如果没有就放在第一位
					this.setSearchButtonModel();
				}

				
			},
			/**
			 * 顶部面板
			 */
			initToolbarPanel : function() {
				this.toolbar_panel = $(JST['partials/toolbar-panel']());
				// 查询条件
				this.initQueryCondition();
				
				// 顶部按钮
				this.initToolbarButtons(this.toolbar_panel);

				// 查询条件按钮
				this.initSearchButtons();

				this.$el.before(this.toolbar_panel);
			},
			initSearchButtons : function(){
				var searchButtons = this.response_search_buttons;
				if(searchButtons.length <=0)
					return;
				
				var isBottom =  false;
				var seachFormEl = this.toolbar_panel.find(".search-form");
					seachFormEl.append('<div class="form-group js-form-search-group"><div class="js-search-btn-group "  ></div></div>');
				if(isBottom){
					seachFormEl.find(".js-form-search-group").addClass("search-form-group-bottom");
					seachFormEl.find(".js-search-btn-group").addClass("search-btn-group");
				}else{
					seachFormEl.find(".js-form-search-group").removeClass("search-form-group-bottom").addClass("search-form-group-top");
					seachFormEl.find(".js-search-btn-group").removeClass("search-btn-group").addClass("search-btn-group-top");
				}
					
					
				var buttonEl =  seachFormEl.find(".js-search-btn-group");
				searchButtons.each((function(_this) {
					return function(rf) {
						var queryColumns;
						if(rf["button_type"] == 'moreSearch')
							queryColumns =  _this.response_more_querys;
						view = new TemplateRenderer.Views["ResponseButton"+ (_str.capitalize(rf["button_type"]))]({
									model : rf,
									queryColumns:queryColumns
								});
						
						buttonEl.append(view.render().el);
					};
				})(this));
			},
			/**
			 * 顶部按钮
			 */
			initToolbarButtons : function() {
				var view, buttonsEl;
				buttonsEl = this.toolbar_panel.find(".buttons");
				
				this.response_toolbar_buttons
						.each((function(_this) {
							return function(rf) {
								var queryColumns;
								if(rf["button_type"] == 'moreSearch')
									queryColumns =  _this.response_more_querys;
								view = new TemplateRenderer.Views["ResponseButton"+ (_str.capitalize(rf["button_type"]))]({
											model : rf,
											queryColumns:queryColumns
										});
								buttonsEl.append(view.render().el);
							};
						})(this));
				},
				getButtonModel : function(rf) {
					if (!rf)
						return null;
					rf = _.extend(TemplateRenderer.DEFAULT_BUTTON[rf.button_type],rf);
					return new TemplateRenderer.Models["ResponseButton"+ (_str.capitalize(rf["button_type"]))](rf,
							this);
				},
				setSearchButtonModel : function() {
					var model = this.getButtonModel({
						button_type : "search"
					});
					this.response_toolbar_buttons.unshift(model);
				},
				/**
				 * 查询条件
				 */
				initQueryCondition : function() {
					var view, queryEl, model, rf, _i = 0, _len, _ref;

					this.initQueryConditionModel();
					if (this.response_querys.length == 0)
						return;
					queryEl = this.toolbar_panel.find(".search-form");
					this.toolbar_panel.find(".toolbar-body").removeClass("hidden");

					this.response_querys.each((function(_this) {
								return function(rf) {
									view = new TemplateRenderer.Views["ResponseQuery"
											+ (_str.capitalize(rf["field_type"]))]({
												model : rf
											});
									queryEl.append(view.render().el);
								};
							})(this));
					// TODO IE8 需要修复
					queryEl.wrap('<div  class="form-inline p-xxs"></div>');
					
					
				},
					initQueryConditionModel : function() {
						var model, rf, _i, _len, _ref, formField;
						this.response_querys = new Backbone.Collection;
						
						this.response_more_querys = [];
						
						_ref = this.options.query_condition ? this.options.query_condition
								: [];
						for (_i = 0, _len = _ref.length; _i < _len; _i++) {
							rf = _ref[_i];
							formField = this.response_fields[rf.name];
							if ($.isEmpty(formField))
								continue;
							rf.field_type = formField.get("field_type");
							rf.form_field = formField;
							if (rf.field_type == 'select'
									|| rf.field_type == 'radio') {
								rf.field_type = 'select';
							}
							rf.field_name = formField.get("field_name");
							model = new TemplateRenderer.Models["ResponseQuery"
									+ (_str.capitalize(rf['field_type']))](rf,
									this.options, this.response_fields);
							var isCommon = rf.common =='N'?false:true;
							if(isCommon)
								this.response_querys.add(model);
							this.response_more_querys.push(rf);
							
						}
					},
					initVeiwTemplates : function() {
						var view;
						this.response_templates
								.each((function(_this) {
									return function(rf) {
										view = new TemplateRenderer.Views["ResponseTemplate"
												+ (_str.capitalize(rf[TemplateRenderer.key.template_type]))]({
													model : rf
												});
										_this.$el.append(view.render().el);
									};
								})(this));

						this.handlerRowAction();
					},
					/**
					 * 收缩/展开
					 */
					handlerCollapseExpand : function() {
						// 收缩、展开
						$(document).on(
										"click",
										".toolbar-box .tools .collapse, .toolbar-box .tools .expand",
										function() {
											var self = $(this),
												el = self.parents(".toolbar-box")
													.children(".toolbar-body");
											if (self.hasClass("collapse")) {
												$.cookie("isCollapse", true);
												self.attr("title", "展开");
												self.removeClass("collapse").addClass("expand");
												var i = self.children(".fa-angle-double-up");
												i.removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
												self.parents('.toolbar-box')
														.addClass("toolbar-border-bottom");
												el.slideUp(200, function() {
													// 重置表格的尺寸
													// me.resizeGridSize();
												});
											} else {
												$.cookie("isCollapse", false);
												self.attr("title", "收缩");
												self.removeClass("expand")
														.addClass("collapse");
												var i = self
														.children(".fa-angle-double-down");
												i.removeClass("fa-angle-double-down")
														.addClass("fa-angle-double-up");
												self.parents('.toolbar-box')
														.removeClass("toolbar-border-bottom");
												el.slideDown(200, function() {
													// 重置表格的尺寸
													// me.resizeGridSize();
												});
											}
										});
						if ($.cookie && $.cookie("isCollapse") == "true")
							$('.toolbar-box .tools .collapse').click();
					},
					handlerRowAction : function() {
						$(document).on("click", ".rowOps a.btn", function() {
							if ($(this).hasClass('disabled'))
								return false;
							var self = $(this), url = self.attr('action');
							if (url == null || url == '') {
								DialogUtil.toastr('未找到配置参数[action]!');
								return false;
							}
							window.location.href = url;
						});
					}

				});
		TemplateRenderer.TEMPLATE_TYPES = [ "datatable","treeForm" ];

		TemplateRenderer.BUTTON_TYPES = _.keys(FormButtons.t.buttons);

		// //all 所有，toolbar 顶部，manage 管理

		TemplateRenderer.DEFAULT_BUTTON = FormButtons.t.buttons;

		TemplateRenderer.FIELD_TYPES = FormOptions.t.INPUT_FIELD_TYPES;

		TemplateRenderer.key = {
			template_type : "template_type",
			name : "name",
			pk : "id_"
		}
		TemplateRenderer.Views = {};

		TemplateRenderer.Models = {};
		
		//数据字典缓存
		TemplateRenderer.DICTIONARY_CACHE = {};
		//选择器缓存
		TemplateRenderer.SELECTOR_CACHE ={};
	}).call(this);

	(function() {
		TemplateRenderer.VERSION = '1.0.0';
	}).call(this);

	// TODO 模板渲染model
	(function() {
		var i, _i, _len, _ref;
		TemplateRenderer.Models.ResponseTemplate = Backbone.DeepModel
				.extend({
					initialize : function(_attrs, templateRenderer) {
						this.template_renderer = templateRenderer;

						this.handerAttrs(_attrs,
								templateRenderer.response_fields);

						this.response_data = _.extend(_attrs, {
							formKey : templateRenderer.options.formKey
						});
						this[TemplateRenderer.key.template_type] = _attrs[TemplateRenderer.key.template_type];
					},
					getDomId : function() {
						return this.cid;
					},
					handerAttrs : function(_attrs, response_fields) {
						_.each(_attrs.display_columns, function(c) {
							if (response_fields[c.name]) {
								c["field_name"] = response_fields[c.name]
										.get("field_name");
							}
						});
					}
				});
		// 数据模板
		TemplateRenderer.Models.ResponseTemplateDatatable = TemplateRenderer.Models.ResponseTemplate
				.extend({
					getGridId : function() {
						return this.getDomId() + "Grid";
					},
					initGrid : function() {
						this.$grid = $("#" + this.getGridId());
						return this.$grid;
					},
					getPagerId : function() {
						return this.getDomId() + "Pager";
					}
				});
		
		TemplateRenderer.Models.ResponseTemplateTreeForm = TemplateRenderer.Models.ResponseTemplate.extend({});
		
		_ref = _.without(TemplateRenderer.template_type, "datatable","treeForm");
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			TemplateRenderer.Models["ResponseTemplate" + (_str.capitalize(i))] = TemplateRenderer.Models.ResponseTemplate
					.extend({
						template_type : i
					});
		}

	}).call(this);

	// TODO 模版渲染
	(function() {
		var i, _i, _j, _len, _len1, _ref, _ref1;

		TemplateRenderer.Views.ResponseTemplate = Backbone.View.extend({
			events : {},
			initialize : function(options) {
				this.model = options.model;
				this.template_type = this.model.template_type;
			},
			render : function() {
				this.$el.html(JST['partials/response_template'](this));
				return this;
			},
			getDomId : function() {
				return this.model.getDomId();
			},
			getManageButtons : function() {
				return this.model.template_renderer.response_manage_buttons;
			}
		});

		// 数据表格
		TemplateRenderer.Views.ResponseTemplateDatatable = TemplateRenderer.Views.ResponseTemplate
				.extend({
					template_type : 'datatable',
					className : 'jqGrid_wrapper',
					getGridId : function() {
						return this.model.getGridId();
					},
					getPagerId : function() {
						return  this.model.response_data["need_page"] == 'N'?null:this.model.getPagerId();
					},
					render : function() {
						TemplateRenderer.Views.ResponseTemplate.prototype.render
								.apply(this, arguments);
						setTimeout(
								(function(_this) { // 等页面渲染好了再进行渲染
									return function() {
										_this.model.initGrid();
										var $grid = _this.model.$grid;
										var options = {
												url : __ctx+ "/platform/form/formDataTemplate/getDataTableJson.htm",
												postData : {
													response_data : JSON.stringify(_this.model.response_data)
												},
												datatype : _this.model.get("init_query") == "Y" ? "json": "local",
												pager : _this.getPagerId(),
												colModel : _this.getColModel(),
												loadError : function(e) {
													DialogUtil.error('加载数据失败，请检查配置！');
												},
												loadComplete : function(data) {
													_this.model.viewData =data.rows;
													try {
														if ($grid.jqGrid('getGridParam','datatype') != 'json')
															$grid.jqGrid('setGridParam',{datatype : 'json'});
														$(".rowOps",this).each(function() {
																			$(this).rowOps();
																		});
														_this.resizeGridSize();
													} catch (e) {
													}
												}
											};
										if(_this.model.response_data["need_page"]  == 'N')
													options.rowNum = null;
										$grid.GridExt(options);
										return _this;
									};
								})(this), 0);
						return this;
					},
					resizeGridSize : function() {
						var $grid = this.model.$grid;
						// 窗口高度-距离顶部高度-标题-分页
						var newGridHeight = $(window).height()
								- $($grid, ".jqGrid_wrapper").offset().top - 30
								- 30;
						$grid.jqGrid("setGridHeight", newGridHeight);
						$grid.jqGrid("resizeGrid", {
							base : $grid,
							offset : 0
						});
					},
					getColModel : function() {
						var _this = this, displayColumns = this.model
								.get("display_columns"), response_fields = this.model.template_renderer.response_fields ? this.model.template_renderer.response_fields
								: {}, colModel = [];

						this.pk = this.model.template_renderer.pkKey;
						// 加入主键
						/*colModel.push({
							name : this.pk,
							hidden : true,
							key : true
						});*/

						var displayPk = false;
						_.each(displayColumns,function(column) {
								var field = response_fields[column.name];
								if ($.isEmpty(field))
									return false;
								var model = {
									name : field.get("field_name"),
									label : column.label,
									align:column.align?column.align:'left'
								}, 
								fieldType = field.get(FormOptions.t.mappings.FIELD_TYPE);

								if(_this.pk == model.name){
									model.key = true;
									model.hidden = false;
									displayPk = true;
								}
								
								/*if (fieldType == 'hidden') {
									model.hidden = true;
								}else */if (fieldType == 'editor') {
									model.sortable = false;
								}else if (fieldType == 'datePicker') {
									model.formatter = 'timestamp';
									model.formatoptions = column["field_options"]['datefmt'] ? column["field_options"]['datefmt']: field.get("field_options.datefmt");
								} else if (fieldType == 'radio'
										|| fieldType == 'checkbox'
										|| fieldType == 'select'
										|| fieldType == 'dictionary') {
									model.formatter = 'dataFormat';
									var options = [];
									_.each(field.get(FormOptions.t.mappings.OPTIONS),function(n) {
														options.push({
																	name : n.val,
																	value : n.label
																});
													});
									model.formatoptions = {
										valueseparator : ',',
										value : options
									};
								} else if (fieldType == 'selector') {
									if ($.isEmpty(field.get(FormOptions.t.mappings.BIND_ID))) {
										model.formatter = "selector";
										model.formatoptions = "name";
									}
									
									//处理ID存储
									if('id' == field.get(FormOptions.t.mappings.STORE)){
											model.formatter = function(val, opts, rowData) {
												if($.isEmpty(val))
													return "";
												var  aryVal = val.split(","),
													 type = field.get(FormOptions.t.mappings.SELECTOR_TYPE);
													data =[];
												for (var i = 0; i < aryVal.length; i++) {
													var value = aryVal[i];
													data.push( _this.getSelectorNameValue(type,value));
												}	
										
												var rtn = data.join(",");
												return  $.isEmpty(rtn)?val:rtn;
											}
									}
									
								}else if (fieldType == 'customDialog') {//自定义对话框
									model.formatter = function(val, opts, rowData) {
											if($.isEmpty(val))
												return "";
											var data = _this.getCustomDialogValue(field,val);
											return  $.isEmpty(data)?val:data;
										}
								} else if (fieldType == 'linkdata') {
									model.formatter = function(val, opts, rowData) {
										if($.isEmpty(val))
											return "";
										var   linkConfig =  field.get(FormOptions.t.mappings.LINK_CONFIG)||{},
							       		 __key =  field.get(FormOptions.t.mappings.LINKDATA),
							    	     __linkKey  = linkConfig.id||'id_',
							    	     __linkText  = linkConfig.text||'name_';
								
										var data = _this.getLinkdataValue(__key,__linkKey,__linkText,val);
										return  $.isEmpty(data)?val:data;
									}
									
								}else if (fieldType == 'attachment') {
									model.formatter ='attachment';
								} else if (fieldType == 'address') {
									model.formatter = function(cellval, opts, rowData) {
										var v = {}, rtn = "";
										try {
											v = JSON.parse(cellval);
										} catch (e) {
										}
										if ($.isEmpty(v)) 
											return "";
										return _this.getAddressData(field, v,'country')
												+ _this.getAddressData(field,v,'province')
												+ _this.getAddressData(field,v,'city')
												+ _this.getAddressData(field,v,'district')
												+ (v.street ? v.street: "");
									}
								}
								colModel.push(model);
							});

						if(!displayPk){
							colModel.push({
								name : this.pk,
								hidden : true,
								key : true
							});
						}
						this.buildManageButtons(colModel);

						return colModel;
					},
				    getSelectorNameValue:function(type,id){
				    	var rtn ="";
				    	$.ajax({
							  type: "GET",
							  url: __ctx+ "/platform/org/partyUser/getSelectorInfo.htm",
							  data:{
								  type:type,
					      	      id:id
							  },
							  dataType: "json",
						        async:false,
							  success: function(data){
								  rtn =  data.name;
							  }
				    	});
				    	return rtn;
				    },
				    //处理json格式值
				    processJsonValue:function(value){
				    	if($.isEmpty(value))
				    		return [];
						if($.isArray(value))//数组
							return value;

						try {
							var v = JSON.parse(value);
							if($.isEmpty(v))
								 v =[];
							return v
						} catch (e) {return [];	}
				    },
				    //处理id值
				    processIDValue:function(value,type){
				    	var _this= this,
				    		ids = value.split(","),
				    		datas=[];
						_.each(ids,function(id,i){
							var obj = {};
							obj[FormOptions.t.DATA_KEY.TITLE] = _this.getCustomDialogNameValue(type,id);
							datas.push(obj);
						});
				    	return datas;
				    },
				    getCustomDialogNameValue:function(type,id){
				    	var d = "",nameObj={};
				    	$.ajax({
							  type: "GET",
							  url: __ctx+ "/platform/data/dataTemplate/getDataById.htm",
							  data:{
								  key:type,
					      	      id:id
							  },
							  dataType: "json",
							  async: false,
							  success: function(results){
								  var d ={};
								 if(results.result){
									 var data = results.data;
									 if($.isNotEmpty(data)){
										 d = data[0];
										 nameObj[FormOptions.t.DATA_KEY.TITLE] = d[results.title];
									 }
								 }
								 
								  return nameObj[FormOptions.t.DATA_KEY.TITLE]
							  }
				    	});
				    	return nameObj[FormOptions.t.DATA_KEY.TITLE];
				    },
				    getCustomDialogValue:function(field,value){
				    	var type =  field.get(FormOptions.t.mappings.DIALOG);
				     	var store =  field.get(FormOptions.t.mappings.STORE)||'json';
				     	var rtn =[];
				    	if($.isEmpty(value))
				    		rtn = [];
				    	if('json' == store){
				    		rtn = this.processJsonValue(value);
				    	}else if('id' == store){//id需要查询数据库。返回名称
				    		rtn= this.processIDValue(value,type);
				    	}else{
				    		rtn = [];
				    	}
				    	return _.compact(_.pluck(rtn, FormOptions.t.DATA_KEY.TITLE)).join(',')||'';
				    	
				    },
				    
				    getLinkdataValue:function(key,__linkKey,__linkText,value){
				    	var  rtn = [];
				    	  $.ajax({
					            url: __ctx+ "/platform/data/dataTemplate/getLinkDataByKey.htm", 
					            data: {
					            	"key": key
					            },
					            dataType:'json',
					            async:false,
					            success: function (results) { 
					            	var data = results.data,
					            		  item,
					            		  arrayValue = value.split(",");
					                for (var d = 0; d < data.length; d++) {
					                	item = data[d]; 
					                    if( _.contains(arrayValue, item[__linkKey]) ){
					                    	rtn.push(item[__linkText]);
					                    }
					                }
					            } 
					        }); 
				    	  return rtn.join(',');
				    },
					// 获取展示的值
					getTextValue : function(data, value) {
						var rtn = '';
						if ($.isEmpty(value) || $.isEmpty(data))
							return rtn;
						$.each(data, function(i, address) {
							$.each(address, function(j, v) {
								if (v.code == value) {
									rtn = v.address
									return false;
								}
							});
							if ($.isNotEmpty(rtn))
								return false;
						});
						return rtn || "";
					},
					getTop : function(field) {
						return field.get(FormOptions.t.mappings.TOP) ? field.get(FormOptions.t.mappings.TOP) : 'country';
					},
					getLevel : function(field) {
						return field.get(FormOptions.t.mappings.LEVEL) ? field.get(FormOptions.t.mappings.LEVEL) : 'district';
					},
					getTopval : function(field) {
						var top = this.getTop(field),
							rtnVal = '0', 
							topval = field.get(FormOptions.t.mappings.TOPVAL);
						if ($.isEmpty(topval))
							return rtnVal;
						if (top == 'province') {
							rtnVal = topval['country'];
						} else if (top == 'city') {
							rtnVal = topval["province"];
						} else if (top == 'district') {
							rtnVal = topval["city"];
						}
						return rtnVal;
					},
					getAddressData : function(field, v, type) {
						if ($.isEmpty(v))
							return "";
						var top = this.getTop(field),
							 level = this.getLevel(field),
							topval = this.getTopval(field);

						if (type === 'country' && v.country) {
							topval = (top == 'country') ? topval : 0;
							if ($.isEmpty(topval))
								return "";
							return this.getTextValue(WorldDistricts[topval],
									v.country);
						} else if (type === 'province' && v.province) {
							var topval1 = $.isNotEmpty(v.country) ? v.country
									: null;
							if ($.isEmpty(topval1) && top == 'province')
								topval1 = topval;
							if ($.isEmpty(topval1))
								return "";
							return this.getTextValue(WorldDistricts[topval1],
									v.province);
						} else if (type === 'city' && v.city) {
							var topval1 = $.isNotEmpty(v.province) ? v.province
									: null;
							if ($.isEmpty(topval1) && top == 'city')
								topval1 = topval;
							if ($.isEmpty(topval1))
								return "";
							return WorldDistricts[topval1] ? (WorldDistricts[topval1][v.city] || "")
									: "";
						} else if (type === 'district' && v.district) {
							var topval1 = $.isNotEmpty(v.city) ? v.city : null;
							if ($.isEmpty(topval1) && top == 'district')
								topval1 = topval;
							if ($.isEmpty(topval1))
								return "";
							return WorldDistricts[topval1] ? (WorldDistricts[topval1][v.district] || "") : "";
						} else {
							return "";
						}
					},
					/**
					 * 构建管理按钮
					 */
					buildManageButtons : function(colModel) {
						if (this.getManageButtons().length == 0)
							return;
						var _this = this, buttons = [];
						_.each(this.getManageButtons(), function(button,i) {
							var btn = {
								label : button.label,
								classes : _this.getStyle(button)+_this.getIcon(button),
								action : 'javascript:TemplateRenderer.button.'
										+ button.button_type + '(\'{'
										+ _this.pk + '}\',\''
										+ _this.getGridId() + '\','
										+ i + ')'
							};
							buttons.push(btn);
						});
						TemplateRenderer.button.variables ={
								formKey:this.model.response_data['formKey'],
								templateKey:this.model.template_renderer.options["id"],
								flowKey:this.model.template_renderer.options['attrs']?this.model.template_renderer.options['attrs']['flow_key']:'',
								printId:this.model.template_renderer.options['attrs']?this.model.template_renderer.options['attrs']['print_id']:'',
								model:this.model,
								edit_buttons:this.model.get("edit_buttons"),
							    buttons :this.getManageButtons()
						};
						
						colModel.push({
							name : '__manage',
							label : '管理',
							width : '40px',
							sortable : false,
							classes : "rowOps",
							formatter : 'manage',
							formatoptions : buttons
						});
					},
					getStyle : function(button) {
						return button.style?( ' btn ' +button.style) : ' btn btn-primary ';
					},
					getIcon : function(button) {
						return button.icon?(' ' + button.icon) :( ' fa fa-'+button.button_type);
					}

				});
		
		// 数据表格
		TemplateRenderer.Views.ResponseTemplateTreeForm = TemplateRenderer.Views.ResponseTemplate.extend({
					template_type : 'treeForm',
					className : 'laout_wrapper',
					render : function() {
						$('body').append(JST['partials/response_template'](this));
						setTimeout((function(_this) { // 等页面渲染好了再进行渲染
							return function() {
								_this._initLayout();
								// 初始化树形
								_this._initTree();

								_this.initTreeEvent();
								
								_this._initForm();
								
								return _this;
							};
						})(this), 0);
						return this;
					},
					_initForm:function(){
						var id =  this.getDomId()+"Form"
					},
					_initLayout:function(){
						var layout =   $('body').layout({ applyDefaultStyles: true});  
						layout.addPinBtn( ".pinBtn", "west" );
						var me =this;
						this._treeFrameResize();
						// 缩放时候计算高度
						$(window).resize(function(){  
							me._treeFrameResize();
						});
					},
					_treeFrameResize:function(){
						$('.treeFrame').height( $(window).height()-20);
						$("#"+this.getTreeId()).height( $(window).height()-145);
					},
					getTreeId : function() {
						return this.model.getDomId()+"Tree";
					},
					getFormFrameId:function(){
						return this.model.getDomId()+"FormFrame";
					},
					getDisplayColumns:function(){
						return this.model.get("display_columns")||{};
					},
					initTreeEvent:function(){
						var _this = this;
						$('.tree-toolbar').on("click", "a.btn", function() {
							var action = $(this).data("action") ;
							if (action == 'refresh') {// 刷新
								_this._initTree();
							} else if (action == 'expand') {// 展开
								_this.dialogTree.expandAll(true);
							} else if(action == 'compress')  {//收缩
								_this.dialogTree.expandAll(false);
							}
						});
					},
					getIdName:function(){
						return this.getDisplayColumns()["id_name"];
					},
					getTextName:function(){
						return this.getDisplayColumns()["text_name"];
					},
					getPidName:function(){
						return this.getDisplayColumns()["pid_name"]||"";
					},
					getTopValue:function(){
						return this.getDisplayColumns()["top_value"]||"";
					},
					getTopDisplayValue:function(){
						return this.getDisplayColumns()["top_display_value"]||"";
					},
					_initTree:function(){
						var _this = this,
						url = __ctx+ "/platform/form/formDataTemplate/getTreeDataJson.htm",
								displayColumns = this.getDisplayColumns(),
								idKey = this.getIdName(), 
								pidKey = this.getPidName(), 
								nameKey = this.getTextName(),
								topValue = this.getTopValue(),
								topDisplayValue = this.getTopDisplayValue();
							var setting = {
								async : {
									enable : false
								},
								data : {
									key : {
										name : nameKey
									},
									simpleData : {
										enable : true,
										idKey : idKey,
										pIdKey : pidKey,
										rootPId:topValue
									}
								},
								callback : {
									onClick: function(e, treeId, treeNode) {
										_this.treeOnLeftClick.apply(_this, arguments);
									},
									onRightClick :function(e, treeId, treeNode) {
										_this.treeOnRightClick.apply(_this, arguments);
									}
								}
			
							};
			
							$.ajax({
								url : url,
								type : "post",
								data : {
									isRoot : true,
									response_data : JSON.stringify(this.model.response_data)
								},
								success : function(results) {
									if(!results.result){
										DialogUtil.error(results.msg,results.cause);
										return;
									}
									var data = results.data;
									if($.isNotEmpty(topDisplayValue)){//把顶部的加入
										var top ={};
										top[idKey] = topValue;
										top[pidKey] = null;
										top[nameKey] = topDisplayValue;
										data.push(top);
									}
										
									_this.dialogTree = $.fn.zTree.init($("#"+_this.getTreeId()), setting, data);
									if (_this.getExpand()) {
										_this.dialogTree.expandAll(true);
									}
									_this._treeFrameResize();
									// 缩放时候计算高度
									$(window).resize(function(){  
										_this._treeFrameResize();
									});
								}
							});
					},
					getExpand : function() {
						return this.model.get("attrs.expand") == 'Y' ? false : true;
					},
					treeOnLeftClick:function(e, treeId, treeNode){
						if($.isNotEmpty(treeNode[this.getIdName()]))
							this.editNode(treeNode,false);
					},
					treeOnRightClick:function(e, treeId, treeNode){
						var _this = this;
						if (!treeNode) 
							return;
						this.dialogTree.selectNode(treeNode);
					
						//获取当前点击左树
						var pid = treeNode[this.getPidName()];
						var id = treeNode[this.getIdName()];
						var menu=null;
						///特殊节点能新增
						if(($.isEmpty(pid) || id ==  this.getTopValue()) && 	treeNode.level == 0){
							menu=$('#rootMenu');
						}else{
							menu=$('#subMenu');
						}
							
						menu.contextMenu(e,{
							onItem: function(context, ev) {
								var target =$(ev.target), 
								action = target.data("action");
							if (target.hasClass('disabled'))
								return false;
							switch (action) {
								case "node_add":// 增加节点
									_this.addNode(treeNode);
									break;
								case "node_edit":// 编辑节点
									_this.editNode(treeNode,true);
									break;
								case "node_del":// 删除节点
									_this.delNode(treeNode);
									break;
								case "node_sort":// 节点排序
									_this.sortNode(treeNode);
									break;
							}
							}
						});
					},
					getPidKey:function(){
						return this.model.template_renderer.response_field_names[this.getPidName()].get("name");
					},
					addNode:function(node){
						var _this = this,
							$formFrame = $("#"+this.getFormFrameId()),
							formFrame =$formFrame[0];
						
						$formFrame.attr("src",__ctx+"/platform/form/formDataTemplate/treeForm.htm");
						var pid = {};
						pid[this.getPidKey()] = node[this.getIdName()];
						//传递参数
						formFrame.params= {
								pid:pid,
								formKey:this.model.response_data['formKey'],
								isEdit:true,
								edit_buttons:this.model.get("edit_buttons")
						};
						//回调方法
						formFrame.callback = function(){
							//刷新树
							_this._initTree();
						}
					},
					editNode:function(node,isEdit){
						var _this = this,
							$formFrame = $("#"+this.getFormFrameId()),
							formFrame =$formFrame[0];
						$formFrame.attr("src",__ctx+"/platform/form/formDataTemplate/treeForm.htm");
						//传递参数
						formFrame.params= {
								pk:node[this.getIdName()],
								formKey:this.model.response_data['formKey'],
								isEdit:isEdit,
								edit_buttons:this.model.get("edit_buttons")
						};
						//回调方法
						formFrame.callback = function(){
							//刷新树
							_this._initTree();
						}
					},
					delNode:function(node){
						if(node.children != null && node.children.length > 0) {
							DialogUtil.toastr("请先删除子节点！");
							return;
						}
						var _this=this,
							params = {
								formKey : this.model.response_data['formKey'],
								id :node[this.getIdName()]
							};
						
						DialogUtil.confirm('确认删除吗？',
								function(rtn) {
									if (!rtn)
										return;
							$.post(__ctx+ '/platform/form/formDataTemplate/removeFormData.htm',
									params,function(data) {
												if (data.result == 1) {
													DialogUtil.toastr(data.message,true);
													//刷新树
													_this._initTree();
												} else {
													DialogUtil.toastr('删除失败！'+ data.message,true);
												}
											}, "json");
						});
					}
						
				
			});
		

		_ref = _.without(TemplateRenderer.TEMPLATE_TYPES, "datatable","treeForm");
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			TemplateRenderer.Views["ResponseTemplate" + (_str.capitalize(i))] = TemplateRenderer.Views.ResponseTemplate
					.extend({
						template_type : i
					});
		}

	}).call(this);

	// TODO 模版渲染
	(function() {
		TemplateRenderer.button = {
			'remove' : function(id, gridId) {
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit('remove',{
						id:id,
						gridId:gridId
				 });
				 if(!beforSubmitResult)
					 return ;
				var params = {
					formKey : this.variables.formKey,
					id : id
				};
				TemplateRenderer.removeRecord(this.getGrid(gridId), params);
			},
			// 编辑
			'edit' : function(id, gridId) {
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit('edit',{
						id:id,
						gridId:gridId
				 });
				 if(!beforSubmitResult)
					 return ;
	
				var params = {
					formKey : this.variables.formKey,
					templateKey:this.variables.templateKey,
					flowKey : this.variables.flowKey,
					pk : id,
					isEdit : true,
					edit_buttons : this.variables.edit_buttons,
					printId : this.variables.printId
				};
				TemplateRenderer.editDialog(this.getGrid(gridId), params);
			},
			'detail' : function(id, gridId) {
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit('detail',{
						id:id,
						gridId:gridId
				 });
				 if(!beforSubmitResult)
					 return ;
				var params = {
					formKey :  this.variables.formKey,
					templateKey:this.variables.templateKey,
					flowKey : this.variables.flowKey,
					pk : id,
					isEdit : false,
					data:data,
					edit_buttons :  this.variables.edit_buttons,
					printId :  this.variables.printId
				};
				TemplateRenderer.editDialog(this.getGrid(gridId), params);
			},
			'print':function(id,gridId){
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit('print',{
						id:id,
						gridId:gridId
				 });
				 if(!beforSubmitResult)
					 return ;
				
				if($.isEmpty(this.printId)){
					DialogUtil.msg("请设置打印模版！");
					return;
				}
				var url =  __ctx+"/platform/form/formPrintTemplate/print.htm";
			    DialogUtil.dialog({
			    	content:url,
			      	params:{
			    		id: this.variables.printId,
			    		pk:id
			    	},
			    	area: ['100%', '100%'],
					maxmin:false,
					title:false
			    });
			},
			'custom' : function(id, gridId,i) {
				var button = this.variables.buttons[i];
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit(button["code"],{
						id:id,
						gridId:gridId,
						gridData:gridData
				 });
				 if(!beforSubmitResult)
					 return ;
			},
			'startFlow' : function(id, gridId, i) {
				
				var $grid, defKey;
            	var formKey = this.variables.formKey;

				var selStartFlow = this.variables.buttons[i].selStartFlow;
				
				if(typeof(selStartFlow) != "undefined"&&selStartFlow ==="true"){
					
					new BpmDefinitionDialog({
						params:{
							formKey:formKey
						},
						isSingle:true,
						callback : function(data,index) {
							defKey = data[0].defKey;
							startFlow();
							DialogUtil.close(index);
						}
					}).show();

				}else{
				
					defKey =  this.variables.flowKey;
					if ($.isEmpty(defKey)) {
						DialogUtil.msg("请绑定流程！");
						return;
					}
					startFlow();
				}
				
				var startFlow = function(){
	            	
	            	var lid = DialogUtil.load();
	            	var url = __ctx+'/platform/form/formDataTemplate/startFlowFromList.htm';
	                $.post(url, {'id': id, 'defKey': defKey, "formKey":formKey}, function (responseText) {
	                	DialogUtil.close(lid);
	                	var msg = new com.lc.form.ResultMessage(responseText);
	        			if (msg.isSuccess()) {
	        				DialogUtil.msg(msg.getMessage());
	        			} else {
	        				DialogUtil.error(msg.getMessage());
	        			}
	                });
				}
				
			},
			_beforeSubmit:function(action,params){
				var index = $("#"+params.gridId).jqGrid("getInd", params.id);
				var gridData = 	 this.variables.model.viewData[index-1];
				params =$.extend({
					gridData:gridData
				}, this.variables,params);
				// 前置事件
				 var beforSubmitResult = $.JList._beforeSubmit(this,action,'manage',params);
				 
			     if (typeof (beforSubmitResult) != "undefined" && !beforSubmitResult) {
		               return false;
			     }
			     return true;
			},
			getGrid:function(gridId){
				return  $("#" + gridId);
			}
		}

	}).call(this);

	(function() {
		TemplateRenderer.editDialog = function($grid, params) {
			DialogUtil.dialog({
				content : __ctx + '/platform/form/formDataTemplate/edit.htm',
				params : params,
				area : [ '100%', '100%' ],
				maxmin : false,
				title : false,
				callback : function(rtn) {
					if ($grid) {
						// 重新加载
						$grid.jqGrid('setGridParam', {
							postData : {}, // 发送数据
							page : 1
						}).trigger("reloadGrid"); // 重新载入
					}
				}
			});
		};

		TemplateRenderer.removeRecord = function($grid, params) {
			DialogUtil.confirm(
							'确认删除吗？',
							function(rtn) {
								if (!rtn)
									return;
								// url 要设置
								$.post(__ctx+ '/platform/form/formDataTemplate/removeFormData.htm',
												params,function(data) {
													if (data.result == 1) {
														DialogUtil.toastr(data.message,true);
														$grid.trigger('reloadGrid');
													} else {
														DialogUtil.toastr('删除失败！'+ data.message,true);
													}
												}, "json");
							});
		}
	}).call(this);
	// TODO 按钮渲染model
	(function() {
		var i, _i, _len, _ref;
		TemplateRenderer.Models.ResponseButton = Backbone.DeepModel.extend({
			initialize : function(_attrs, templateRenderer) {
				this.options = templateRenderer.options;
				this.response_fields = templateRenderer.response_fields;
				this.formKey = this.options.formKey;
				this.response_templates = templateRenderer.response_templates;
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
			getLabel : function() {
				return this.get("label");
			},
			getSize:function(){
				return this.get("size")||'';
			},
			getStyle : function() {
				return this.get("style") || 'btn-primary';
			},
			getIcon : function() {
				return this.get("icon") || 'fa fa-cog';
			}
		});

		_ref = _.without(TemplateRenderer.BUTTON_TYPES, "$");
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			TemplateRenderer.Models["ResponseButton" + (_str.capitalize(i))] = TemplateRenderer.Models.ResponseButton
					.extend({
						button_type : i
					});
		}

	}).call(this);

	// TODO 按钮渲染
	(function() {
		var i, _i, _j, _len, _len1, _ref, _ref1;

		TemplateRenderer.Views.ResponseButton = Backbone.View.extend({
			events : {
				'click [data-toggle="button"]' : '_onClick'
			},
			initialize : function(options) {
				this.model = options.model;
				this.queryColumns = options.queryColumns;
				this.button_type = this.model.button_type;
			},
			tagName : 'div',
			className : 'btn-group',
			render : function() {
				this.$el.html(JST['partials/response_button'](this));
				return this;
			},
			_onClick : function(e) {
				var r = false;
				// 前置事件
				 var beforSubmitResult = $.JList._beforeSubmit(this, (this.model.button_type=='custom'?this.model.get("code"):this.model.button_type),'toolbar',  this.model);
				 
			     if (typeof (beforSubmitResult) != "undefined" && !beforSubmitResult) {
	                    return;
			     }

				if (this.onClick) {
					var r = this.onClick(e);
					if (r)
						return this;
				}
				// 后置事件
			},
			getDomId : function() {
				return this.cid;
			},
			getGridCheckedId : function(grid) {
				return grid.jqGrid('getGridParam', 'selarrrow');
			},
			getGridKeyName : function(grid) {
				return grid.jqGrid('getGridParam', 'keyName');
			}
		});

		TemplateRenderer.Views.ResponseButtonSearch = TemplateRenderer.Views.ResponseButton
				.extend({
					onClick : function(e) {
						this._search(this.$el);
					},
					_search : function(obj) {
						if ($(obj).hasClass('disabled'))
							return;
						var searchForm = $(obj).closest("div .toolbar-panel")
								.find(".search-form");
						if (searchForm.length == 0)
							return;

						this.searchForm(searchForm);
					},
					searchForm:function(form){
						var data = this._serializeObject(form);
						this.searchData(data);
					},
					searchData :function(data){
						this.model.response_templates.each((function(_this) {
							return function(model) {
								if (model.template_type == 'datatable') {
									model.$grid.jqGrid('setGridParam', {
										postData : data, // 发送数据
										page : 1
									}).trigger("reloadGrid"); // 重新载入
								}
							};
						})(this));
					},
					_serializeObject : function(form) {
						var o = {}, a = $(form).serializeArray();
						$.each(a, function() {
							var v = this.value || '';
							if (o[this.name]) {
								o[this.name] = o[this.name] + "," + v;
							} else {
								o[this.name] = v;
							}
						});
						return o;
					}
				});
		//重置
		TemplateRenderer.Views.ResponseButtonResetSearch= TemplateRenderer.Views.ResponseButtonSearch.extend({
			onClick : function(e) {
				this._reset(this.$el);
			},
			_reset : function(obj) {
				if ($(obj).hasClass('disabled'))
					return;
				var searchForm = $(obj).closest("div .toolbar-panel")
						.find(".search-form");
				if (searchForm.length == 0)
					return;
				searchForm[0].reset();
				searchForm.find('[type="hidden"]').val("");
				this.searchForm(searchForm);
			}
		});
		
		//更多查询
		TemplateRenderer.Views.ResponseButtonMoreSearch= TemplateRenderer.Views.ResponseButtonSearch.extend({
			onClick : function(e) {
				this._more(this.$el);
			},
			_more : function(obj) {
				var _this = this;
				if ($(obj).hasClass('disabled'))
					return;
				DialogUtil.dialog({
					title:'更多查询条件',
		    		area: ['100%', '100%'],
		    		params: {
		    			queryColumns : this.queryColumns,
		    			options:this.options
		    		},
		    		content:__ctx+'/platform/form/formDataTemplate/moreSearch.htm',
		    		btn:[{
		            	label: '搜索',
		            	iconCls:'btn btn-primary fa fa-search',
		                action: function(dialog,index) {
		                	var data = DialogUtil.getChildFrameWindow(index).formDataTemplateMoreSearch.getData();
	                 			if(!data) return;
	                 		_this.searchData(data);
		              	  	DialogUtil.close(index);
		                }
		            },{
		            	label: '清空',
		            	iconCls:'btn btn-success fa fa-clean',
		                action: function(dialog,index) {
		                	
		                	DialogUtil.getChildFrameWindow(index).formDataTemplateMoreSearch.clean();

		                }
		            }, {
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
				});
			}
		});
		
		
		// 添加
		TemplateRenderer.Views.ResponseButtonAdd = TemplateRenderer.Views.ResponseButton
				.extend({
					onClick : function() {
						var $grid, edit_buttons,printId,flowKey,templateKey;
						templateKey = this.model.options['id']?this.model.options['id']:'';
						flowKey = this.model.options['attrs']?this.model.options['attrs']['flow_key']:'';
						 printId = this.model.options['attrs']?this.model.options['attrs']['print_id']:'';
						this.model.response_templates.each(function(model) {
							$grid = model.$grid;
							edit_buttons = model.get("edit_buttons");
						});

						TemplateRenderer.editDialog($grid, {
							formKey : this.model.formKey,
							templateKey:templateKey,
							flowKey : flowKey,
							isEdit : true,
							edit_buttons : edit_buttons,
							printId : printId
						});
					}
				});

		// 编辑
		TemplateRenderer.Views.ResponseButtonEdit = TemplateRenderer.Views.ResponseButton
				.extend({
					onClick : function() {
						var formKey = this.model.formKey;
						var 	templateKey = this.model.options['id']?this.model.options['id']:'';
						var printId =this.model.options['attrs']?this.model.options['attrs']['print_id']:'';
						var flowKey =this.model.options['attrs']?this.model.options['attrs']['flow_key']:'';
						this.model.response_templates
								.each((function(_this) {
									return function(model) {
										if (model.template_type == 'datatable') {
											var edit_buttons = model.get("edit_buttons");
											var ids = _this.getGridCheckedId(model.$grid);
											if (ids == null || ids.length == 0) {
												DialogUtil.toastr('请选择记录!');
												return false;
											}
											if (ids.length > 1) {
												DialogUtil.toastr('已经选择了多项,请选择一项进行操作!');
												return false;
											}
											var params = {
												formKey : formKey,
												templateKey:templateKey,
												flowKey : flowKey,
												pk : ids[0],
												isEdit : true,
												edit_buttons : edit_buttons,
												printId : printId
											};
											TemplateRenderer.editDialog(
													model.$grid, params);
										}
									};
								})(this));
					}
				});
		// 明细
		TemplateRenderer.Views.ResponseButtonDetail = TemplateRenderer.Views.ResponseButton
				.extend({
					onClick : function() {
						var formKey = this.model.formKey;
						var 	templateKey = this.model.options['id']?this.model.options['id']:'';
						var printId = this.model.options['attrs']?this.model.options['attrs']['print_id']:'';
						this.model.response_templates
								.each((function(_this) {
									return function(model) {
										if (model.template_type == 'datatable') {
											var edit_buttons = model
													.get("edit_buttons");
											var ids = _this
													.getGridCheckedId(model.$grid);
											if (ids == null || ids.length == 0) {
												DialogUtil.toastr('请选择记录!');
												return false;
											}
											if (ids.length > 1) {
												DialogUtil
														.toastr('已经选择了多项,请选择一项进行操作!');
												return false;
											}

											var params = {
												formKey : formKey,
												templateKey:templateKey,
												pk : ids[0],
												edit_buttons : edit_buttons,
												printId : printId
											};
											TemplateRenderer.editDialog(
													model.$grid, params);
										}

									};
								})(this));
					}
				});

		// 删除
		TemplateRenderer.Views.ResponseButtonRemove = TemplateRenderer.Views.ResponseButton
				.extend({
					onClick : function() {
						var formKey = this.model.formKey;
						this.model.response_templates.each((function(_this) {
							return function(model) {
								var ids = _this.getGridCheckedId(model.$grid);
								if (ids == null || ids.length < 1) {
									DialogUtil.toastr('请选择记录!');
									return false;
								}
								var params = {
									formKey : formKey,
									id : ids.join(',')
								};
								TemplateRenderer.removeRecord(model.$grid,
										params);
							};
						})(this));
					}
				});
		//打印
		TemplateRenderer.Views.ResponseButtonPrint = TemplateRenderer.Views.ResponseButton
				.extend({
					onClick : function() {
						TemplateRenderer.button.formKey =  this.model.formKey;
						TemplateRenderer.button.printId = this.model.options['attrs']?this.model.options['attrs']['print_id']:'';
						this.model.response_templates.each((function(_this) {
							return function(model) {
								var ids = _this.getGridCheckedId(model.$grid);
								if (ids == null || ids.length < 1) {
									DialogUtil.toastr('请选择记录!');
									return false;
								}
								TemplateRenderer.button.print(ids[0],model.$grid)
							};
						})(this));
					}
				});
		// 导入
		TemplateRenderer.Views.ResponseButtonImport = TemplateRenderer.Views.ResponseButton
				.extend({
					onClick : function() {
						var fields = this.model.options.fields, formKey = this.model.formKey;
						this.model.response_templates
								.each((function(_this) {
									return function(model) {
										var $grid = model.$grid;
										DialogUtil
												.dialog({
													content : __ctx
															+ '/platform/form/formDataTemplate/import.htm',
													params : {
														formKey : formKey,
														fields : fields
													},
													area : [ '60%', '80%' ],
													title : "导入数据",
													callback : function(rtn) {
														if (rtn && $grid) {
															// 重新加载
															$grid.jqGrid('setGridParam',{
																				postData : {}, // 发送数据
																				page : 1
																			}).trigger(
																			"reloadGrid"); // 重新载入
														}
													}
												});
									};
								})(this));
					}
				});

		// 导出
		TemplateRenderer.Views.ResponseButtonExport = TemplateRenderer.Views.ResponseButton
				.extend({
					events : _.extend({},
									TemplateRenderer.Views.ResponseButton.prototype.events,{
										'click [data-action]' : 'doAction'
									}),
					className : 'btn-group dropdown',
					onClick : function() {
						return false;
					},
					doAction : function(e) {
						var me = this, $el = $(e.currentTarget), action = $el
								.data("action"), params = {}, form = $('#exportForm'), ids;

						var curModel = this.model.response_templates.models[0];

						if (action == 'exportSelected') {
							ids = this.getGridCheckedId(curModel.$grid);
							if (ids == null || ids.length == 0) {
								DialogUtil.toastr('请选择记录!');
								return false;
							}
							params.ids = ids.join(",");
						} else if (action == 'exportCurPage'){
							var gridParam = curModel.$grid
									.jqGrid('getGridParam');
							params.page = gridParam.page;
							params.rows = gridParam.rowNum;
						}
						
						params.response_data = JSON.stringify(curModel.response_data);
						params.action = action;
						
						// 勾选导出字段
						var export_columns = $.extend(true, {}, curModel.response_data.export_columns);
						var export_columns_result = export_columns.fields;
						if(export_columns.select_field == 'Y'){
							DialogUtil.dialog({
					    		title:'导出字段勾选',
					    		area: ['20%', '90%'],
					    		params: {
					    			data : $.extend(true, [], export_columns.fields)
					    		},
					    		content:__ctx+'/platform/form/formDataTemplate/selectField.htm',
					    		btn:[{
					            	label: '确定',
					            	iconCls:'btn btn-primary fa fa-ok',
					                action: function(dialog,index) {
					              	  	var data = DialogUtil.getChildFrameWindow(index).formDataTemplateSelectField.getData();
					              	  	if(!data) return;
					              	  	export_columns.fields = data;
					              	  	var exportColumns =JSON.stringify(export_columns)
					        			if($.isEmpty(exportColumns)){
											DialogUtil.toastr('请设置导出字段!');
										}
					              	  
										params.export_columns = exportColumns;
										me.submit(form, params);
										
					              	  	DialogUtil.close(index);
					                }
					            }, {
					            	label: '取消',
					            	iconCls:'btn btn-danger fa fa-cancel',
					                action: function(dialog,index) {
					                	DialogUtil.close(index);
					                }
					            }]
					    	});
						}else{
							var exportColumns = JSON.stringify(export_columns);
							if($.isEmpty(exportColumns)){
								DialogUtil.toastr('请设置导出字段!');
							}
							params.export_columns = export_columns
							me.submit(form, params);
						}
					}, 
					submit : function(form, params){
						form.empty();
						for ( var key in params) {
							var input = $("<input type='hidden' name='" + key
									+ "' value='" + params[key] + "'/>");
							form.append(input);
						}
						form.submit();
					}
				});

		// 批量修改
		TemplateRenderer.Views.ResponseButtonBatchModify = TemplateRenderer.Views.ResponseButton
				.extend({
					onClick : function() {
						var response_fields = this.model.response_fields;
						this.model.response_templates
								.each((function(_this) {
									return function(model) {
										var $grid = model.$grid, ids = _this
												.getGridCheckedId($grid);
										if (ids == null || ids.length < 1) {
											DialogUtil.toastr('请选择记录!');
											return false;
										}
										var fields = _this
												.getDisplayField(
														response_fields,
														model
																.get("display_columns")), params = {
											id : ids.join(','),
											fields : fields
										};

										DialogUtil.dialog({
													title : '批量修改',
													params : params,
													content : __ctx
															+ '/platform/form/formDataTemplate/batchModify.htm',
													area : [ '50%', '50%' ],
													callback : function(rtn) {
														if ($grid) {
															// 重新加载
															$grid.jqGrid('setGridParam',
																			{
																				postData : {}, // 发送数据
																				page : 1
																			})
																	.trigger(
																			"reloadGrid"); // 重新载入
														}
													},
													btn : [
															{
																label : '保存',
																iconCls : 'btn btn-primary fa fa-ok',
																action : function(
																		dialog,
																		index) {
																	DialogUtil
																			.getChildFrameWindow(
																					index)
																			.saveData();
																}
															},
															{
																label : '取消',
																iconCls : 'btn btn-danger fa fa-cancel',
																action : function(
																		dialog,
																		index) {
																	DialogUtil
																			.close(index);
																}
															} ]
												});
									};
								})(this));
					},
					getDisplayField : function(response_fields, display_columns) {
						var rtn = [];
						_.each(
										display_columns,
										function(column) {
											if (response_fields[column.name])
												rtn
														.push(response_fields[column.name].attributes);
										});
						return rtn;
					}
				});

		// 启动流程
		TemplateRenderer.Views.ResponseButtonStartFlow = TemplateRenderer.Views.ResponseButton
				.extend({
					onClick : function() {
						var $grid, defKey;
		            	var formKey = this.model.formKey;

						this.model.response_templates.each(function(model) {
							$grid = model.$grid;
						});
						
						var ids = $($grid).jqGrid('getGridParam','selarrrow');
		            	if (ids == null || ids.length == 0) {
		            		DialogUtil.toastr('请选择数据！');
		            		return;
		            	}
						
						var selStartFlow = this.model.attributes.selStartFlow;
						
						if(typeof(selStartFlow) != "undefined"&&selStartFlow ==="true"){
							
							new BpmDefinitionDialog({
								params:{
									formKey:formKey
								},
								isSingle:true,
								callback : function(data,index) {
									defKey = data[0].defKey;
									startFlow();
									DialogUtil.close(index);
								}
							}).show();

						}else{
						
							defKey =  this.model.options.attrs?this.model.options.attrs.flow_key:'';
							if ($.isEmpty(defKey)) {
								DialogUtil.msg("请绑定流程！");
								return;
							}
							startFlow();
						}
						
						var startFlow = function(){
			            	
			            	var url = __ctx+'/platform/form/formDataTemplate/startFlowFromList.htm';
			            	DialogUtil.confirm('确定启动流程？', function(rtn) {
			            		var lid = DialogUtil.load();
			            		$.post(url, {'id': ids.join(','), 'defKey': defKey, "formKey":formKey}, 
					                function (responseText) {
					                	DialogUtil.close(lid);
					                	var msg = new com.lc.form.ResultMessage(responseText);
					        			if (msg.isSuccess()) {
					        				DialogUtil.msg(msg.getMessage());
					        			} else {
					        				DialogUtil.error(msg.getMessage());
					        			}
					                }
			            		);
			            	});
						}

						/*DialogUtil
							.dialog({
								title : '启动流程',
								content : __ctx
										+ '/platform/bpmn/instance/bpmInst/toStart.htm?defKey='
										+ defKey,
								area : [ '100%', '100%' ],
								callback : function(rtn) {
									if ($grid) {
										// 重新加载
										$grid.jqGrid('setGridParam', {
											postData : {}, // 发送数据
											page : 1
										}).trigger("reloadGrid"); // 重新载入
									}
									//
								}
							});*/
					}
				});

		_ref = _.without(TemplateRenderer.BUTTON_TYPES, "search","resetSearch","moreSearch", "add","edit","detail", "remove", 'print', 'batchModify', 'import',
				'export', 'startFlow');
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			TemplateRenderer.Views["ResponseButton" + (_str.capitalize(i))] = TemplateRenderer.Views.ResponseButton
					.extend({
						button_type : i
					});
		}
	}).call(this);

	// 查询条件model
	(function() {
		var i, _i, _len, _ref;
		TemplateRenderer.Models.ResponseQuery = Backbone.DeepModel.extend({
			initialize : function(_attrs, options, response_fields) {
				this.options = options;
				this.response_fields = response_fields;
				this["field_type"] = _attrs["field_type"];
				this["field_name"] = _attrs["field_name"];
				this.form_field = _attrs["form_field"];
			},
			getLabel : function() {
				return this.get("label");
			},
			getName : function() {
				return this.get("name");
			},
			getFieldName : function() {
				return this.get("field_name");
			}
		});

		TemplateRenderer.Models.ResponseQuerySelect = TemplateRenderer.Models.ResponseQuery
				.extend({
					getOptions : function() {
						return (this.get("form_field") ? this.get("form_field")
								.get(FormOptions.t.mappings.OPTIONS) : [])
								|| [];
					}
				});

		TemplateRenderer.Models.ResponseQueryCheckbox = TemplateRenderer.Models.ResponseQuery
				.extend({
					getOptions : function() {
						return (this.get("form_field") ? this.get("form_field")
								.get(FormOptions.t.mappings.OPTIONS) : [])
								|| [];
					}
				});
		// 选择器
		TemplateRenderer.Models.ResponseQuerySelector = TemplateRenderer.Models.ResponseQuery
				.extend({
					getBindId : function() {
						return this.get("field_options.bind_id");
					},
					getBindName : function() {
						var id;
						if ($.isEmpty(id = this.getBindId()))
							return "";
						return this.response_fields[id].get("field_name");
					},
					getSelectorType : function() {
						return this.form_field
								.get("field_options.selector_type");
					}
				});

		// 数据字典
		TemplateRenderer.Models.ResponseQueryDictionary = TemplateRenderer.Models.ResponseQuery
				.extend({
					getDictionary : function() {
						return (this.form_field ? this.form_field
								.get(FormOptions.t.mappings.DICTIONARY) : '')
								|| '';
					}
				});

		_ref = _.without(TemplateRenderer.FIELD_TYPES, "select", "checkbox",
				"selector", "dictionary");
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			TemplateRenderer.Models["ResponseQuery" + (_str.capitalize(i))] = TemplateRenderer.Models.ResponseQuery
					.extend({
						button_type : i
					});
		}

	}).call(this);

	// TODO 查询条件渲染
	(function() {
		var i, _i, _j, _len, _len1, _ref, _ref1;

		TemplateRenderer.Views.ResponseQuery = Backbone.View.extend({
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

		TemplateRenderer.Views.ResponseQuerySelector = TemplateRenderer.Views.ResponseQuery
				.extend({
					button_type : 'selector',
					render : function() {
						TemplateRenderer.Views.ResponseQuery.prototype.render
								.apply(this, arguments);
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
		TemplateRenderer.Views.ResponseQueryAddress = TemplateRenderer.Views.ResponseQuery
				.extend({
					button_type : 'address',
					render : function() {
						TemplateRenderer.Views.ResponseQuery.prototype.render
								.apply(this, arguments);
						setTimeout(
								(function(_this) {
									return function() {
										var name = _this.model.getName();
										var $el = $('[data-toggle="address"]');
										$el
												.citypicker()
												.on(
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
		
		TemplateRenderer.Views.ResponseQueryDictionary = TemplateRenderer.Views.ResponseQuery
		.extend({
			button_type : 'dictionary',
			render : function() {
				TemplateRenderer.Views.ResponseQuery.prototype.render
						.apply(this, arguments);
				setTimeout((function(_this) {
					return function() {

						$('[data-toggle="clear"]', _this.$el).each(
								function() {
									SelectorDialog.clear($(this));
								});
					};
				})(this), 0);

				return this;
			}
		});

		_ref = _.without(TemplateRenderer.FIELD_TYPES, "selector", "address","dictionary");
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			TemplateRenderer.Views["ResponseQuery" + (_str.capitalize(i))] = TemplateRenderer.Views.ResponseQuery
					.extend({
						button_type : i
					});
		}

	}).call(this);

	// ============国际化===============
	TemplateRendererZH_CN = {
		"loading" : "加载中",

		"template_type" : {
			"close" : "数据模板"
		}
	};
	if (typeof TemplateRenderer !== 'undefined')
		TemplateRenderer.t = TemplateRendererZH_CN;

	// ========== 模板界面 ===============
	if (!window.JST) {
		window.JST = {};
	}

	window.JST["templates/datatable"] = function(__obj) {
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
				_print(_safe('<table id="' + this.getGridId() + '" ></table>'));

				// 是否分页
				_print(_safe('<div id="' + this.getPagerId() + '"></div>'));

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
	
	window.JST["templates/treeForm"] = function(__obj) {
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
				_print(_safe('<div class="ui-layout-west">'
				+'<div class=" layout-header">'
				+'	<h5>'+this.model.get("label")+'</h5>'
				+'	<div class="layout-tools">'
				+'		<a herf="javascript:void(0);" class="pinBtn"> <i class="fa fa-angle-double-left"></i>'
				+'		</a>'
				+'	</div>'
				+'</div>'
				
				+'<div class="tree-toolbar">'
				+' 	<a class="btn btn-primary fa fa-refresh" data-action= "refresh" title="刷新"></a>'
				+'		<a class="btn btn-primary fa fa-expand"  data-action= "expand" title="展开"></a> '
				+'		<a class="btn btn-primary fa fa-compress" data-action= "compress" title="收缩"></a>'
				+'	</div>'
				+'		<div id="'+this.getTreeId()+'" class="ztree"  style="overflow: auto;"></div>'
				+' </div>'
				+' <div class="ui-layout-center">'
				+'  <div class="treeFrame">'
				+'  	<iframe id="'+this.getDomId()+'FormFrame" src="'+__ctx+'/platform/form/formDataTemplate/treeForm.htm" frameborder="no" width="100%" height="100%"></iframe>'
				+'  </div>'
				+'</div>'));
				
				_print(_safe('<div id="subMenu" class="bootstrap-contextmenu">'
				+'<ul class="dropdown-menu" role="menu">'
				+'<li><a data-action="node_add" tabindex="-1"><i class="fa fa-add"></i>&nbsp;&nbsp;增加</a></li>'
				+'<li><a data-action="node_edit" tabindex="-1"><i class="fa fa-edit"></i>&nbsp;&nbsp;编辑</a></li>'
				+'	<li><a data-action="node_del" tabindex="-1"><i class="fa fa-remove"></i>&nbsp;&nbsp;删除</a></li>'
				+'</ul>'
				+'</div>'));

			_print(_safe('<div id="rootMenu" class="bootstrap-contextmenu">'
					+'<ul class="dropdown-menu" role="menu">'
					+'<li><a data-action="node_add" tabindex="-1"><i class="fa fa-add"></i>&nbsp;&nbsp;增加</a></li>'
					+'</ul>'
					+'</div>'));

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

	window.JST["partials/search-label"] = function(__obj) {
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

				_print(_safe('<label   class="search-label">'
						+ this.model.get("label") + ':</label>'));

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

	window.JST["query_fields/text"] = function(__obj) {
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

				_print(_safe('<input type="text"  name="Q^'
						+ this.model.getFieldName()
						+ '^SL"  class="form-control"  /> '));

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

	window.JST["query_fields/datePicker"] = function(__obj) {
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
				_print(_safe(JST["partials/search-label"](this)));
				_print(_safe('<input type="text"  name="Q^'
						+ this.model.getFieldName()
						+ '^DL"  class="form-control  datepicker"   /> '));
				_print(_safe('<label   class="search-label">至：</label>'));
				_print(_safe('<input type="text"  name="Q^'
						+ this.model.getFieldName()
						+ '^DG"  class="form-control datepicker"  /> '));
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

	window.JST["query_fields/select"] = function(__obj) {
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
				_print(_safe('<select name="Q^' + this.model.getFieldName()
						+ '^S"  class="form-control search-select"  >\n  '));
				_print(_safe('\n<option  value="">请选择</option>\n  '));

				_ref = this.model.getOptions();
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					option = _ref[_i];
					_print(_safe('\n    <option value="'));
					_print(option.val);
					_print(_safe('">\n      '));
					_print(option.translated_label || option.label);
					_print(_safe('\n    </option>\n  '));
				}

				_print(_safe('\n</select>\n'));
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

	window.JST["query_fields/checkbox"] = function(__obj) {
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
				_print(_safe('<select name="Q^' + this.model.getFieldName()
						+ '^SL"  class="form-control search-select"  >\n  '));
				_print(_safe('\n<option  value="">请选择</option>\n  '));

				_ref = this.model.getOptions();
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					option = _ref[_i];
					_print(_safe('\n    <option value="'));
					_print(option.val);
					_print(_safe('">\n      '));
					_print(option.translated_label || option.label);
					_print(_safe('\n    </option>\n  '));
				}

				_print(_safe('\n</select>\n'));
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
	// 查询字段选择器
	window.JST["query_fields/selector"] = function(__obj) {
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
				var bindId = this.model.getBindId(), bindName = this.model
						.getBindName(), name = this.model.getName(), fieldName = this.model
						.getFieldName(), selectorType = this.model
						.getSelectorType();

				_print(_safe('<div class="input-group ">'));
				if ($.isNotEmpty(bindId)) {
					_print(_safe('<input type="hidden" name="Q^' + bindName
							+ '^S"  id="' + bindId + '"  value=""/> '));
					_print(_safe('<input type="text" class="form-control search-selector"  id="'
							+ name
							+ '" name="'
							+ fieldName
							+ '" readonly="readonly"/> '
							+ '<span class="input-group-btn"> '
							+ '<button type="button" class="btn  btn-info btn-mm"  data-toggle="selector" data-type="'
							+ selectorType
							+ '" data-id="#'
							+ bindId
							+ '" data-name="#'
							+ name
							+ '" > '
							+ '<i class="fa fa-user"></i></button> '
							+ '</span> '));
				} else {
					_print(_safe('<input type="hidden" name="Q^' + fieldName
							+ '^SL"  id="' + name + 'ID"  value=""/> '));
					_print(_safe('<input type="text" class="form-control search-selector"  id="'
							+ name
							+ '" name="'
							+ fieldName
							+ '" readonly="readonly"/> '
							+ '<span class="input-group-btn"> '
							+ '<button type="button" class="btn  btn-info btn-mm"  data-toggle="selector" data-type="'
							+ selectorType
							+ '" data-id="#'
							+ name
							+ 'ID" data-name="#'
							+ name
							+ '" > '
							+ '<i class="fa fa-user"></i></button> '
							+ '</span> '));
				}
				_print(_safe('</div> '));

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

	window.JST["query_fields/dictionary"] = function(__obj) {
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
				var fieldName = this.model.getFieldName(), 
					name = this.model.getName(), 
					dic = this.model.getDictionary(),
					dicStr = JSON2.stringify(TemplateRenderer.DICTIONARY_CACHE[dic]).replaceAll('"','quot');

				_print(_safe('<input type="hidden" name="Q^' + fieldName + '^SIN"  id="' + name + '" /> '));
				
				_print(_safe('<textarea style="display:none;"  id="' + name + '_dicStr" >'+dicStr+'</textarea>  '));
				
				_print(_safe('<input type="text" readonly="readonly"  class="form-control comboTree" '
						+ 'data-toggle="dictionary" data-dic="'+ dic +'" '
						+ 'data-display_mode="path" data-isquery="true" '
						+ 'data-key="#' + name + '" name="' + name + '" /> '));


				_print(_safe('\n\n  '));
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

	window.JST["query_fields/address"] = function(__obj) {
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
				var fieldName = this.model.getFieldName(), name = this.model
						.getName();
				_print(_safe('<input type="hidden" name="Q^' + fieldName
						+ '^SL"  id="' + name + '"  value=""/> '));
				_print(_safe('<div style="position: relative;float:right;" ><input type="text" readonly="readonly"  class="form-control " '
						+ 'data-toggle="address"   /></div>  '));

				_print(_safe('\n\n  '));
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

	// 查询字段
	window.JST["partials/response_query_field"] = function(__obj) {
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

				if (this.field_type == 'datePicker') {// 日期范围
					_print(_safe(JST["query_fields/" + this.field_type](this)));
				} else if (this.field_type == 'radio'
						|| this.field_type == 'select') {// 单选、多选、下拉
					_print(_safe(JST["partials/search-label"](this)));
					_print(_safe(JST["query_fields/select"](this)));
				} else if (this.field_type == 'checkbox'
						|| this.field_type == 'selector'
						|| this.field_type == 'dictionary'
						|| this.field_type == 'address') {// 选择器
					_print(_safe(JST["partials/search-label"](this)));
					_print(_safe(JST["query_fields/" + this.field_type](this)));
				} else {// 其他
					_print(_safe(JST["partials/search-label"](this)));
					_print(_safe(JST["query_fields/text"](this)));
				}

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

	// 顶部按钮组
	window.JST["partials/response_button"] = function(__obj) {
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
				if (this.model.isDropdown()) {
					_print(_safe('<a data-toggle="dropdown" class="dropdown-toggle btn '
							+ this.model.getSize()
							+ ' '
							+ this.model.getStyle()
							+ ' '
							+ this.model.getIcon()
							+ '"  href="javascript:void(0)"  >'
							+ this.model.getLabel()
							+ '<i class="ace-icon fa fa-angle-down icon-on-right"></i>'
							+ '</a>' + '<ul class="dropdown-menu">'));

					_
							.each(
									this.model.getDropdown(),
									function(d) {
										_print(_safe('<li>'
												+ '<a href="javascript:void(0)"   data-action="'
												+ d.alias + '">' + d.label
												+ '</a></li>'));
									});
					_print(_safe('</ul>'));
				} else {
					_print(_safe('<a class="btn  '
							+ this.model.getSize()
							+ ' '
							+ this.model.getStyle()
							+ ' '
							+ this.model.getIcon()
							+ '" data-toggle="button" href="javascript:void(0)" >'
							+ this.model.getLabel() + '</a> '));
				}
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

	// 查询条件
	window.JST["partials/query_condition"] = function(__obj) {
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
				_print(_safe('<a class="btn btn-primary fa fa-search" href="javascript:void(0)" ></a> '));

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

	// 顶部面板
	window.JST["partials/toolbar-panel"] = function(__obj) {
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
				_print(_safe('<div  class="toolbar-panel ">'
						+ '<div class="toolbar-box">'
						+ '<div class="toolbar-head clearfix">'
						+ '<div class="buttons"> </div>'
						+ '<div class="tools">'
						+ '<a href="javascript:void(0);" class="collapse">'
						+ '<i class="bigger-180 fa  fa-angle-double-up"></i>'
						+ '</a>' + '</div></div>'
						+ '<div class="toolbar-body hidden" >'
						+ '<form role="form" class="search-form"></form>'
						+ '</div></div></div> '));
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