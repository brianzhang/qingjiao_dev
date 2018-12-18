// TODO 模版渲染
(function() {
	var i, _i, _j, _len, _len1, _ref, _ref1;

	var $ = jQuery, _str=_.str;
	
	var 	DATE_FORMATS ={
		"date" : "yyyy-MM-dd",
		"datetime" : "yyyy-MM-dd HH:mm:ss",
		"time" : "HH:mm:ss"
	};

	DataTemplateRenderer.Views.ResponseTemplate = Backbone.View.extend({
		events : {},
		initialize : function(options) {
			this.model = options.model;
			this.template_type = this.model.template_type;
			this.unique = this.model.get("unique");
			this.callback = options.callback;
			this.changeData = options.changeData;
		    Backbone.on('cleanSelected', this.cleanSelected, this);
		},
		render : function() {
			this.$el.html(JST['partials/response_template'](this));
			return this;
		},
		forceRender:function(){
			if(this.changeData ){
				this.changeData(this.model.get("data"));
			}
		},
		getDomId : function() {
			return this.model.getDomId();
		},
		isSingle:function(){
			return this.model.get("isSingle");
		},
		isDialog:function(){
			return this.model.get("isDialog");
		},
		isComposeDialog:function(){
			return  this.model.get("isComposeDialog");
		},
		
		getResponseFields:function(){
			return this.model.response_fields||{};
		},
		convertField:function(column){
			var  response_fields = this.getResponseFields();
			var field = response_fields[column.name] || null,
				same =  (column["same"] && column["same"] == 'N')?false:true,
				fieldType = same?(field?(field.get("field_type")):null):column["field_type"],
				fieldOptions = same?(field?(field.get("field_options")||{}):{}):(column["field_options"]||{}), 
				dataType = field?field.get("type"):'varchar';
				
				fieldType = fieldType||'text';
				fieldOptions = fieldOptions||{};
				dataType = dataType||'varchar';
			//字段是日期类型
			if(dataType == 'date' && (fieldType !="datePicker"  &&  fieldType !="dateRange"  ))
				fieldType = "datePicker";
			if( fieldType=="datePicker"  ||  fieldType =="dateRange" ) {
				var datefmtType = fieldOptions['datefmt_type'];
				if(datefmtType != 'custom')
					fieldOptions["datefmt"] = DATE_FORMATS[datefmtType]||'yyyy-MM-dd HH:mm:ss';
			}
		
			
			column["field_type"]= fieldType;
			column["field_options"] = fieldOptions;
			column["data_type"] = dataType;
			return column;
		},
		cleanSelected:function(){
			this.model.set("data", null);
			this.model.trigger('change');
		},
		getViewObj:function(){
			if(this.$view)
				return this.$view;
			this.$view =  $("#" + this.getViewId());
			return  this.$view;
		},
	});
	
	//TODO 默认--列表
	DataTemplateRenderer.Views.ResponseTemplateList = DataTemplateRenderer.Views.ResponseTemplate
			.extend({
				template_type : 'list',
				className : 'wrapper wrapper-content ',
				events : {
					'click .js-remove-selected' : 'removeSelected',
					'click [data-filter-key]':'selectFilterCondition'
				},
				initialize:function(options){
					DataTemplateRenderer.Views.ResponseTemplate.prototype.initialize.apply(this, arguments);
	
					//初始化查询条件
					this.initQueryConditionModel();
					//包含顶部和管理列按钮
					this.initResponseButtons();
					//初始化显示字段
					this.initDisplayColumns();
					//初始化未过滤显示字段
					this.initOrigDisplayColumns();
					//初始化结果返回字段
					this.initResultColumns();
					//展开
					this.handlerCollapseExpand();
					//处理
					this.handlerRowAction();
				},
				/**
				 * 初始化对话框展示数据
				 */
				initShowData:function(){
					var shows = this.model.get("shows");
					if($.isEmpty(shows))
						return;
					this.addSelectedDatas(shows.data);
				},
				addSelectedDatas :function(datas){
					if($.isEmpty(datas))
						return;
					for (var _i = 0, _len = datas.length; _i < _len; _i++) {
						this.addSelected(datas[_i]);
					}
				
				},
				/**
				 * 收缩/展开
				 */
				handlerCollapseExpand : function() {
					var _this = this;
					// 收缩、展开
					$(document).on("click",".toolbar-box .tools .collapse, .toolbar-box .tools .expand",
									function() {
										var self = $(this),
											el = self.parents(".toolbar-box").children(".toolbar-body");
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
												_this.resizeGridSize();
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
												_this.resizeGridSize();
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
				},
				convertDisplayColumnData:function(column){
					column = this.convertField(column);
					column["sortable"] =  (column["data_type"] == 'clob'?false:(column.sortable == 'N' ? false: true));
					
					if (column["field_type"] == 'dictionary') {
						this.initDictionary(column['field_options']['dictionary']);
					}
					return column;
					
				},
				initOrigDisplayColumns:function(){
					if(this.origDisplayColumns)
						return this.origDisplayColumns;
					this.origDisplayColumns = [];
					
					var  _this = this,
						origDisplayColumns = this.model.get("orig_display_columns");
					if($.isEmpty(origDisplayColumns)){
						this.origDisplayColumns = this.displayColumns;
						return 	this.origDisplayColumns;
					}
						
					_.each(origDisplayColumns,function(column) {
						_this.origDisplayColumns.push(_this.convertDisplayColumnData(column));
					});
					
					return this.origDisplayColumns;
				},
				
				initDisplayColumns : function(){
					if(this.displayColumns)
						return this.displayColumns;
					this.displayColumns = [];
					
					var  _this = this,
						display_columns = this.model.get("display_columns");
					if($.isEmpty(display_columns))
							return 	this.displayColumns;
					_.each(display_columns,function(column) {
						_this.displayColumns.push(_this.convertDisplayColumnData(column));
					});
					
					return this.displayColumns;
				
				},
				initResultColumns : function(){
					if(this.resultColumns)
						return this.resultColumns;
					this.resultColumns = [];
					if(!this.isDialog() &&  !this.isComposeDialog()){
						return this.resultColumns;
					}
					
					var  _this = this,
						result_columns = this.model.get("result_columns");
					
					if($.isEmpty(result_columns)){
							//如果空则去显示字段
						//	this.resultColumns  =  this.displayColumns;
							return 	this.resultColumns;
					}
			
					_.each(result_columns,function(column) {
						column = _this.convertField(column);
						
						if (column["field_type"] == 'dictionary') {
							_this.initDictionary(column['field_options']['dictionary']);
						}
						_this.resultColumns.push(column);
					});
					
					return this.resultColumns;
				},
				/**
				 * 初始化数据字典
				 * 通用比较多
				 */
				initDictionary : function(typeKey) {
					if ($.isEmpty(typeKey)|| $.isNotEmpty(DataTemplateRenderer.DICTIONARY_CACHE[typeKey]))
						return;
					$.ajax({
								type : "GET",
								url : __ctx
										+ "/platform/cat/dictionary/getByTypeKeyForDic.htm",
								data : {
									typeKey : typeKey
								},
								dataType : "json",
								async : false,
								success : function(data) {
									var options = [];
									_.each(data, function(d) {
										options.push({
											name : d.key,
											value : d.name
										});
									})
									DataTemplateRenderer.DICTIONARY_CACHE[typeKey] = options;
								}
							});
				},
				/**
				 * 包含顶部和管理列按钮
				 */
				initResponseButtons:function(){
					//顶部按钮
					this.response_toolbar_buttons = new Backbone.Collection;
					//查询条件
					this.response_search_buttons =  new Backbone.Collection;
					//管理列
					this.response_manage_buttons = [];
					
					var model, rf, _i, _len, position,buttons,isHasSeach=false;
					
					buttons = this.model.get("buttons.function_buttons");
					if($.isNotEmpty(buttons)){
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
					}
					if(!isHasSeach){//判断是否加入搜索条件，并且没有在查询条件列 如果没有就放在第一位
						this.initDefaultButtons();
					}
				},
				//初始化默认按钮
				initDefaultButtons : function() {
					var model = this.getButtonModel({
						button_type : "search"
					});
					this.response_toolbar_buttons.unshift(model);
				},
				getButtonModel : function(rf) {
					if (!rf)
						return null;
					rf = _.extend(DataTemplateRenderer.DEFAULT_BUTTONS[rf.button_type],rf);
					return new DataTemplateRenderer.Models["ResponseButton"+ (_str.capitalize(rf["button_type"]))](rf, this);
				},
				initQueryConditionModel : function() {
					var model, rf, _i, _len, _ref, formField;
					this.response_querys = new Backbone.Collection;
					this.response_more_querys = [];
					_ref = this.model.get("query_columns") || [];
					//加入关联关系的列表
					var _refField = this.model.get("attrs.ref_field"),
						isRefField =false;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						rf = _ref[_i];
						rf = this.convertField(rf);
						if(_refField ==  rf.name){
							isRefField = true;
							rf.ref_field = _refField;
						}
						model = new DataTemplateRenderer.Models["ResponseQuery"
								+ (_str.capitalize(rf['field_type']))](rf,
								this.options, this.getResponseFields());

						
						var isCommon = rf.common =='N'?false:true;
						//常用条件
						if(isCommon)
							this.response_querys.add(model);
						//更多条件
						this.response_more_querys.push(rf);
					}
					
					if($.isNotEmpty(_refField) && !isRefField){
						 rf = {};
						rf.name= _refField;
						rf.field_type= 'hidden';
						rf.ref_field =_refField;
						model = new DataTemplateRenderer.Models["ResponseQuery"+ (_str.capitalize(rf['field_type']))](rf,
						        								this.options,  this.getResponseFields());
						 this.response_querys.add(model);
					}
				},
				//视图id
				getViewId : function() {
					return this.getDomId()+"Grid";
				},
				getPagerId : function() {
					return this.isNeedPage() ? this.model.getPagerId() : null;
				},
				isNeedPage : function() {
					return this.model.get("attrs.need_page") == 'Y' ? true: false;
				},
				getRowNum:function(){
					if (!this.isNeedPage())
						return  null;
					return parseInt(this.model.get("attrs.page_size")||'20',10);
				},
				getDatatype :function(){
					return this.model.get("attrs.init_query") == "Y" ? "json": "local";
				},
				getOptions:function(){
					var _this =this;
					return  {
						url : __ctx+ "/platform/data/dataTemplate/queryDataTableJson.htm",
						postData : {
							response_data : JSON.stringify(this.model.response_data),
							filter_condition_key:this.model.get("filter_condition_key")||''
						},
						datatype : this.getDatatype(),
						pager : this.getPagerId(),
						colModel : this.getColModel(),
						loadError : function(e) {
							$.console().info(e);
							DialogUtil.error('加载数据失败，请检查配置！',e.responseText);
						},
						rowNum: this.getRowNum(),
						multiboxonly : this.isSingle(),
						loadBeforeSend : function() {
							if (_this.isSingle()) {
								$('#cb_' + _this.getViewId()).hide();
							}
						},
						loadComplete : function(data) {
							_this.viewData =data.rows;
							try {
								if (_this.getViewObj() .jqGrid('getGridParam', 'datatype') != 'json')
									_this.getViewObj() .jqGrid('setGridParam', {
										datatype : 'json'
									});
								if ($.isNotEmpty(_this.response_manage_buttons)){
									$(".rowOps",this).each(function() {
										$(this).rowOps();
									});
								}
								
								_this.resizeGridSize();
							} catch (e) {
							}
						}
					};
				},
				initGrid : function() {
					var _this = this, 
						options = {};
					
					if(	this.isDialog() || this.isComposeDialog()){
						options = this.getDialogOptions();
					}else{
						options = this.getOptions();
					}
					
					this.getViewObj().GridExt(options);

					// 重置列表
					$(window).resize(function() {
						_this.resizeGridSize();
					});
				},

				// 初始化顶部按钮
				initToolbarButtons : function() {
					this.toolbar_panel = this.$el.find(".toolbar-panel");
					var view, buttonsEl,_code,_this =this;
						buttonsEl = this.toolbar_panel.find(".buttons");
					this.response_toolbar_buttons_view  = {};
					this.response_toolbar_buttons.each((function(_this) {
								return function(rf) {
									_code = rf["button_type"] == 'custom'? rf["code"] :rf["button_type"];
									var queryColumns;
									if(rf.button_type == 'moreSearch')
										queryColumns =  _this.response_more_querys;
									view = new DataTemplateRenderer.Views["ResponseButton"+ (_str.capitalize(rf["button_type"]))]({
												model : rf,
												queryColumns:queryColumns
											});
									_this.response_toolbar_buttons_view[_code] = view;
									buttonsEl.append(view.render().el);
								};
							})(this));
				},

				initQueryConditionView : function() {
					var view, queryEl, model, rf, _i = 0, _len, _ref;
					if (this.response_querys.length == 0)
						return;
					queryEl = this.toolbar_panel.find(".search-form");
					this.toolbar_panel.find(".toolbar-body").removeClass("hidden");

					this.response_querys.each((function(_this) {
								return function(rf) {
									view = new DataTemplateRenderer.Views["ResponseQuery"+ (_str.capitalize(rf["field_type"]))]({
												model : rf
											});
									queryEl.append(view.render().el);
								};
							})(this));

					queryEl.wrap('<div  class="form-inline p-xxs"></div>');
				},
				initSearchButtons:function(){
					var  searchButtons = this.response_search_buttons;
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
					var  buttonEl =  seachFormEl.find(".js-search-btn-group"),
						 _code;
					searchButtons.each((function(_this) {
						return function(rf) {
							_code = rf["button_type"] == 'custom'? rf["code"] :rf["button_type"];
							var queryColumns;
							if(rf["button_type"] == 'moreSearch')
								queryColumns =  _this.response_more_querys;
							view = new DataTemplateRenderer.Views["ResponseButton"+ (_str.capitalize(rf["button_type"]))]({
										model : rf,
										queryColumns:queryColumns
									});
							_this.response_toolbar_buttons_view[_code] = view;
							
							buttonEl.append(view.render().el);
						};
					})(this));
				},
				render : function() {
					DataTemplateRenderer.Views.ResponseTemplate.prototype.render
							.apply(this, arguments);
					setTimeout((function(_this) { // 等页面渲染好了再进行渲染
						return function() {

							//初始化展示字段
							_this.initShowData();
							// 顶部按钮
							_this.initToolbarButtons();
							// 查询条件
							_this.initQueryConditionView();
							// 查询按钮
							_this.initSearchButtons();
							// 初始化表格
							_this.initGrid();
							return _this;
						};
					})(this), 0);
					return this;
				},
				resizeGridSize : function() {
					var $view = this.getViewObj();
					// 窗口高度-距离顶部高度-标题-分页
					var newGridHeight = $(window).height()
							- $($view, ".jqGrid_wrapper").offset().top - 30;
					if(this.isNeedPage())
						newGridHeight = newGridHeight-30 ;
					$view.jqGrid("setGridHeight", newGridHeight);
					//
					if(this.isComposeDialog()){
						var westWidth= $(".ui-layout-west").width();
						$view.jqGrid("setGridWidth", $(window).width()- westWidth,true);
					}
					
					$view.jqGrid("resizeGrid", {
						base : $view,
						offset : 0
					});
				},
				getColModel : function() {
					var colModel = [];
	
					//显示字段
					this.setDisplayColumnsModel(colModel);
					//结果（返回）字段
					this.initResultColumnsModel(colModel);
					//主键（唯一）字段
					this.initUniqueColumn(colModel);
					//管理列
					this.initManageButtons(colModel);
					//初始化 actions变量
					this.initActionsVariables();
					
					return colModel;
				},
				initActionsVariables :function(){
					//当前模版xxxx
					DataTemplateRenderer.actions.variables[this.getDomId() ] =  {
						templateView:this,
						templateKey : this.model.ext_attrs['template_key'],
						formKey : this.model.ext_attrs['form_key'],
						flowKey:this.model.ext_attrs['flow_key'],
						printId : this.model.ext_attrs['print_id'],
						edit_buttons : this.model.get("buttons.edit_buttons"),
						buttons :this.response_manage_buttons
					};	
				},
				setDisplayColumnsModel:function(colModel){
					if($.isEmpty(this.origDisplayColumns))
						return;
					var displayColumnMap ={};
					if($.isNotEmpty(this.displayColumns)){
						_.each(this.displayColumns,function(column) {
							displayColumnMap[ column.name]= true;
						});
					}
					
					var _this = this;
					_.each(this.origDisplayColumns,function(column) {
						var name = column.name,
							  model = {
									name : name,
									label : column.label,
									sortable:column.sortable,
									align:column.align?column.align:'left'
								}, 
								fieldType = column["field_type"],
								fieldOptions = column["field_options"]||{},
								noRightStyle =  column["noRightStyle"];
						
					
						if(!displayColumnMap[name] && $.isNotEmpty(noRightStyle)){
								model.formatter = function(val, opts, rowData) {
									return  noRightStyle=='asterisk'? "***":'';
								}
							colModel.push(model);	
							return true;
						}
						var  customFormatterResult = _this._customFormatter(name,column,model);
						 if(customFormatterResult){
							_this.formatterModel(model,fieldType,fieldOptions)
						 }
						colModel.push(model); 
					
					});	
				},
				//自定义格式数据事件
				_customFormatter:function(name,column,model){
					 var customFormatterResult = $.JTemplate._customFormatter(this,name,column,model);
				     if (typeof (customFormatterResult) != "undefined" && customFormatterResult) {
			               return false;
				     }
				     return true;
				},
				formatterModel:function(model,fieldType,fieldOptions){
					var _this = this;
					if (fieldType == 'hidden') { //隐藏域
						model.hidden = true;
					} else if (fieldType == 'number') {// 数字格式
						var numberType = fieldOptions['number_type'] ;
						
						if(numberType != 'orig' ){// 原来
							model.formatter = numberType;
						 var decimalPlaces=  numberType =='integer'?0:(fieldOptions['decimal_places']||2);
						 var thousandsSeparator = 	(fieldOptions['thousands_separator']||'');
						 var prefix =  numberType =='currency'?(fieldOptions['prefix']||''):'';
						 var suffix =  numberType =='currency'?(fieldOptions['suffix']||''):'';
							model.formatoptions = {
									decimalSeparator : ".",//小数分隔符，如”.”
									thousandsSeparator : thousandsSeparator,//千分位分隔符，如”,”
									decimalPlaces : decimalPlaces ,//小数保留位数,大于0.
									defaultValue : '',
									prefix:prefix,
									suffix:suffix
							};
						}
					}else if (fieldType == 'datePicker') {// 日期格式
						model.formatter = 'timestamp';
						model.formatoptions =  fieldOptions['datefmt'] ? fieldOptions['datefmt']
								: 'yyyy-MM-dd HH:mm:ss';
					} else if (fieldType == 'select' ||  fieldType== "radio" ||  fieldType== "checkbox") {
						model.formatter = 'dataFormat';
						var options = [];
						_.each(fieldOptions["options"],function(n) {
											options.push({
														name : n.val,
														value : n.label
													});
										});
						model.formatoptions = {
							valueseparator : ',',
							value : options
						};
					} else if (fieldType == 'dictionary') {
						model.formatter = 'dataFormat';
						var options = DataTemplateRenderer.DICTIONARY_CACHE[fieldOptions['dictionary']];
						model.formatoptions = {
							valueseparator : ',',
							value : options
						};
					}else if (fieldType == 'customDialog') { 
						model.formatoptions = fieldOptions;
						model.formatter = function(val, opts, rowData) {
							if($.isEmpty(val))
								return "";
							var data = _this.getCustomDialogValue(opts.colModel.formatoptions,val);
							return  $.isEmpty(data)?val:data;
						};
					}else if (fieldType == 'linkdata') { 
						model.formatoptions = fieldOptions;
							model.formatter = function(val, opts, rowData) {
								if($.isEmpty(val))
									return "";
								var  formatoptions = opts.colModel.formatoptions;
								var   linkConfig = formatoptions['link_config']||{},
										__key =  formatoptions['linkdata'],
										__linkKey  = linkConfig.id||'id_',
										__linkText  = linkConfig.text||'name_';
						
								var data = _this.getLinkdataValue(__key,__linkKey,__linkText,val);
								return  $.isEmpty(data)?val:data;
							};
						
					} else if (fieldType == 'selector') {
						//如果只有id，需要级联
						if ($.isEmpty(fieldOptions["bind_id"])) {
							model.formatter = "selector";
							model.formatoptions = "name";
						}
						//处理ID存储
						if('id' == fieldOptions['store']){
								model.formatoptions = fieldOptions;
								model.formatter = function(val, opts, rowData) {
									if($.isEmpty(val))
										return "";
									var  formatoptions = opts.colModel.formatoptions;
									var  aryVal = val.split(","),
										 type = formatoptions['selector_type'],
										data =[];
									if($.isEmpty(type))
										return val;
									for (var i = 0; i < aryVal.length; i++) {
										var value = aryVal[i];
										data.push( _this.getSelectorNameValue(type,value));
									}	
							
									var rtn = data.join(",");
									return  $.isEmpty(rtn)?val:rtn;
								}
						}
						
					} else if (fieldType == 'attachment') {
						model.formatter = 'attachment';
		
					} else if (fieldType == 'address') { 
						model.formatoptions = fieldOptions;
						model.formatter = function(cellval,
								opts, rowData) {
							var v = {}, rtn = "";
							try {
								v = JSON.parse(cellval);
							} catch (e) {
							}
							if ($.isEmpty(v))
								return "";
							var  formatoptions = opts.colModel.formatoptions;
							return _this.getAddressData(formatoptions, v, 'country')
									+ _this.getAddressData(formatoptions, v,'province')
									+ _this.getAddressData(formatoptions, v,'city')
									+ _this.getAddressData(formatoptions, v,'district')
									+ (v.street ? v.street: "");
						}
					}
					return model;
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
						  async: false,
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
			    processIDValue:function(value,dialog){
			    	var _this= this,
			    		ids = value.split(","),
			    		datas=[];
					_.each(ids,function(id,i){
						var obj = {};
						obj[FormOptions.t.DATA_KEY.TITLE] = _this.getCustomDialogNameValue(dialog,id);
						datas.push(obj);
					});
			    	return datas;
			    },
			    getCustomDialogNameValue:function(dialog,id){
			    	var d = "",nameObj={};
			    	$.ajax({
						  type: "GET",
						  url: __ctx+ "/platform/data/dataTemplate/getDataById.htm",
						  data:{
							  key:dialog,
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
				 getCustomDialogValue:function(fieldOptions,value){
				    	var dialog =  fieldOptions["dialog"];
				     	var store =  fieldOptions["store_mode"]||'id';
				     	var rtn =[];
				    	if($.isEmpty(value))
				    		rtn = [];
				    	if('json' == store){
				    		rtn = this.processJsonValue(value);
				    	}else if('id' == store){//id需要查询数据库。返回名称
				    		rtn= this.processIDValue(value,dialog);
				    	}else{
				    		rtn = [];
				    	}
				    	return _.compact(_.pluck(rtn, FormOptions.t.DATA_KEY.TITLE)).join(',')||'';
				    	
				    },
				    
				 getLinkdataValue:function(key,__linkKey,__linkText,value){
					 if($.isEmpty(key) )
						 return "";
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
				getTop : function(fieldOptions) {
					return 	fieldOptions["top"]?fieldOptions["top"] : 'country';
				},
				getLevel : function(fieldOptions) {
					return fieldOptions["level"]?fieldOptions["level"] : 'district';
				},
				getTopval : function(fieldOptions) {
					var top = this.getTop(fieldOptions),
						rtnVal = '0', 
						topval = fieldOptions["topval"];
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
				getAddressData : function(fieldOptions, v, type) {
					if ($.isEmpty(v))
						return "";
					var top = this.getTop(fieldOptions),
						 level = this.getLevel(fieldOptions),
						topval = this.getTopval(fieldOptions);

					if (type === 'country' && v.country) {
						topval = (top == 'country') ? topval : 0;
						if ($.isEmpty(topval))
							return "";
						return this.getTextValue(WorldDistricts[topval],
								v.country);
					} else if (type === 'province' && v.province) {
						var topval1 = $.isNotEmpty(v.country) ? v.country: null;
						if ($.isEmpty(topval1) && top == 'province')
							topval1 = topval;
						if ($.isEmpty(topval1))
							return "";
						return this.getTextValue(WorldDistricts[topval1],
								v.province);
					} else if (type === 'city' && v.city) {
						var topval1 = $.isNotEmpty(v.province) ? v.province: null;
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
				initUniqueColumn : function(colModel) {
					var _this = this,
						unique = _.find(colModel, function(model) {
							return model.name == _this.unique;
						});
			
					if ($.isNotEmpty(unique)) {
						_.each(colModel,function(model){
							if(model.name == _this.unique){
								model.key = true;
							}
						});
						return;
					}
					// 加入主键 或者唯一键
					colModel.push({
						name : this.unique,
						hidden : true,
						key : true
					});
				},
				initResultColumnsModel : function(colModel) {
					var resultColumns = this.getResultColumns();
					if($.isEmpty(resultColumns))
						return ;
					_.each(resultColumns, function(column) {
						var flag = _.find(colModel, function(model) {
							return model.name == column.name;
						});
						
						if ($.isEmpty(flag)) {
							colModel.push({
								label : column.label,
								name : column.name,
								hidden : true
							});
						}
					});

				},
				/**
				 * 初始化构建管理列按钮
				 */
				initManageButtons : function(colModel) {
					if ($.isEmpty(this.response_manage_buttons))
						return;
					var _this = this, buttons = [];
					_.each(this.response_manage_buttons, function(button, i) {
						var btn = {
							label : button.label,
							classes : _this.getStyle(button)+ _this.getIcon(button),
							action : 'javascript:DataTemplateRenderer.actions.'
									+ button.button_type + '(\'{' + _this.unique
									+ '}\',\'' + _this.getDomId() + '\',' + i
									+ ')'
						};
						buttons.push(btn);
					});
					
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
					return ' btn ' + ( button.style ? button.style :  DataTemplateRenderer.DEFAULT_BUTTONS[button.button_type]['style']);
				},
				getIcon : function(button) {
					return ' ' + ( button.icon ? (' ' + button.icon) : DataTemplateRenderer.DEFAULT_BUTTONS[button.button_type]['icon']);
				},
				reloadView : function(){
						this.getViewObj().trigger("reloadGrid");
				},
				//=============对话框特别属性======
				
				/**
				 * 对话框的选项
				 *  多选择，触发事件
				 */
				getDialogOptions:function(){
					var _this = this,
						options = this.getOptions();
					return  $.extend(true,{},{
						onSelectAll :function(rowids, status) {
							_this.onSelectAll(rowids, status);
						},
						onSelectRow : function(rowid, status) {
							_this.onSelectRow(rowid, status);
						}
					}, options);
				},
				getSelectedContainerEl :function(){
					if($.isNotEmpty(this.selectedContainerEl))
						return 	this.selectedContainerEl;
					//组合
					if(this.isComposeDialog()){
						this.selectedContainerEl =  $("body").find("div[name='selected-container']");
					}else{
						this.selectedContainerEl =  this.$el.find("div[name='selected-container']");
					}
					return 	this.selectedContainerEl;
				},
				getResultColumns:function(){
					return this.resultColumns;	
				},
				// 选择所有
				onSelectAll : function(rowids, status) {
					if($.isEmpty(this.getResultColumns())){
						DialogUtil.msg("请检查是否设置返回字段！");
						return;
					}
					for (var i = 0; i < rowids.length; i++) {
						this.onSelectRow(rowids[i], status);
					}
				},
				onSelectRow : function(rowid, status) {
					if($.isEmpty(this.getResultColumns())){
						DialogUtil.msg("请检查是否设置返回字段！");
						return;
					}
					var index =  this.getViewObj().jqGrid("getInd", rowid),
						data = this.viewData[index-1],
						idVal = data?data[this.unique]:rowid;
						
					var isExists =  this.isDataExists(idVal);
						
					if(status && isExists)
						return;
					
					if (isExists) {
						this.removeSelectedId(idVal);
					} else {
						this.addSelected(data);
					}
				
				},
				isDataExists:function(id){
					var _this = this;
					return  _.find(	this.model.get("data")||[],function(data){
						return (data[_this.unique]||data[FormOptions.t.DATA_KEY.ID]) == id;
					});
				},
				addSelected : function(resultData) {
					var resultColumns = this.getResultColumns(),
						$selectedContainer= this.getSelectedContainerEl();
					//单选处理
					if (this.isSingle()) {
						var records = $selectedContainer.find(".selected-span");
						if (records.length == 1)
							$(records[0]).remove();
					}

					var data = {};
					_.each(resultColumns, function(column, i) {
						var name = column["name"],
							val = resultData[name] ? resultData[name] : '';
							
						//处理日期类型字段
						if(column.data_type == 'date'){
							 val = $.format(val,'yyyy-MM-dd HH:mm:ss');
						}
						data[name] = val;
					});
					
					data[FormOptions.t.DATA_KEY.ID] = resultData[this.unique] || (resultData[FormOptions.t.DATA_KEY.ID]||"");
					
					
					data = this.handleSelectedData(data);

					this.addData(data);
					// 展示演示
					var html = this.getSelectedTemplate(data);
					$selectedContainer.append(
							$(html));
				},
				addData : function(d) {
					var data =  [];
					if (!this.isSingle()) {//单选清除之前的数据
						data = this.model.get("data") ? this.model.get("data"): [];
					}
					data.push(d);
					this.model.set("data", data);
					this.forceRender();
				},
				removeSelectedId : function(id) {
					var $el = this.getSelectedContainerEl().find(".selected-span[data-id='" + id+ "']");
					this.removeSelectedEl($el);
				},
				removeSelected : function(e) {
					var $target = $(e.currentTarget), 
						 $el = $target.closest(".selected-span");
					this.removeSelectedEl($el);
				},
				removeSelectedEl : function($el) {
					var index =this.getSelectedContainerEl().find(".selected-span").index($el),
						 data = this.model.get("data")||[];
					if($.isEmpty(data))
						return;
					data.splice(index, 1);
					this.model.set("data", data);
					this.forceRender();
					$el.remove();
				},
				getSelectedTemplate : function(data) {
					return JST['partials/selected-data-template'](this,{
						data:data
					});
				},
				handleSelectedData:function(data){
					var _this =this;
		
					if ($.isEmpty(this.resultColumns))
						return  ;	
					var title = '',
							dataTitle = 	this.model.get("attrs.data_title")||{},
							dataTitleType =  $.isNotEmpty(dataTitle)?(dataTitle.type||'first'):'first';
							dataTitleTitle = dataTitle.title||"";
				
				
					 if(dataTitleType == 'custom'){//自定义
						 var  d = dataTitleTitle.split(/(\$[0-9a-zA-Z\._]+#[0-9A-Fa-f]*)/g);
						var rtn =[];
						 _.each(d, function(n, i) {
							 var a="";
			    	    	  if (/^\$(_widget_)/.test(n)) {	  //对字段进行处理
			                      var f = n.replace("$_widget_", "").split("#"),
			                         	g = f[0];
			                     a =_this.buildTitle(data,g);
			    	    	  }else{
			    	    		a =n;
			    	    	  }
			    	    	  rtn.push(a);
			              });
						 title = rtn.join("");
					}else {//第一个
						title = this.buildTitle(data,this.resultColumns[0]["name"]);
					}
					data[FormOptions.t.DATA_KEY.TITLE] = title;
					return data;
				},
				buildTitle:function(data,name){
					return data[name]|| '';
				},
				cleanSelected:function(){
					DataTemplateRenderer.Views.ResponseTemplate.prototype.cleanSelected.apply(this, arguments);
					//渲染
					 this.getSelectedContainerEl().empty();
					 this.getViewObj().jqGrid('resetSelection');
				},
				//=============过滤条件======
				hasFilterCondition:function(){
					var filterConditions = this.getFilterCondition();
					if($.isEmpty(filterConditions))
						return false;
					return filterConditions.length >1?true:false;
				},
				getFilterCondition:function(){
					return 	 this.model.get("filter_conditions");
				},
				getCurrentFilterCondition:function(){
					var filterConditions = this.getFilterCondition();
					var curKey =this.model.get("filter_condition_key");
					var filterCondition;
					if(!curKey)
						filterCondition = filterConditions[0];
					else
						filterCondition = _.find(filterConditions, function(n){ return n.key === curKey; });
					 return filterCondition?filterCondition.label:"";
				},
				selectFilterCondition:function(e){
				    var $el = $(e.currentTarget),
				    	 key = $el.data("filter-key");
				    this.model.set("filter_condition_key",key);
				    this.getViewObj().jqGrid('setGridParam', {
						postData:{
							filter_condition_key:key
						}});
				    this.$el.find("[data-filter-condition]").html(this.getCurrentFilterCondition());
					this.response_toolbar_buttons_view["search"].$el.find("[data-toggle='button']").trigger("click");
				}
			});
	

	//TODO 树形
	DataTemplateRenderer.Views.ResponseTemplateTree = DataTemplateRenderer.Views.ResponseTemplate
			.extend({
				template_type : 'tree',
				initialize:function(options){
					DataTemplateRenderer.Views.ResponseTemplate.prototype.initialize.apply(this, arguments);
					//包含顶部和右键按钮
					this.initResponseButtons();
					//初始化查询条件
					this.initQueryConditionModel();
					//结果（返回）字段
					this.initResultColumns();
					
				},
				getFunctionButtons:function(){
					return this.model.get("buttons.function_buttons");
				},
				/**
				 * 获取右键菜单
				 */
				getContextmenuButtons:function(){
					return this.model.get("buttons.contextmenu_buttons");
				},
				initResponseButtons:function(){
					this.response_toolbar_buttons = new Backbone.Collection;
					
					this.response_root_menu_buttons = [];
					this.response_sub_menu_buttons = [];
					
					var model, rf, _i, _len, position,buttons,buttons1;
						buttons =  this.getFunctionButtons();
					if($.isNotEmpty(buttons)){
						for (_i = 0, _len = buttons.length; _i < _len; _i++) {
							rf = buttons[_i];
							if(!FormButtons.t.hasButton(rf.button_type,'toolbar',rf.position))
								continue;
							//是否显示名字
							rf["is_label"] = false;
							this.response_toolbar_buttons.add(this.getButtonModel(rf));
						}
					}
					
					
					//=== 右键按钮
					buttons1 =  this.getContextmenuButtons();
					
					if($.isNotEmpty(buttons1)){
						for (_i = 0, _len = buttons1.length; _i < _len; _i++) {
							rf = buttons1[_i];
							var defButton =  DataTemplateRenderer.DEFAULT_BUTTONS[rf.button_type] ? DataTemplateRenderer.DEFAULT_BUTTONS[rf.button_type]:null;
							position = defButton?defButton.contextmenu: 'all';
							if(!rf.icon)
								rf["icon"] =  defButton? defButton.icon:'';
				
							position =  (rf.position && position == 'all') ?rf.position:position;
	
							if (position == 'all' || position == 'root')
								this.response_root_menu_buttons.push(rf);
							if (position == 'all' || position == 'sub')
								this.response_sub_menu_buttons.push(rf);
						}
					}
					
				},
				getButtonModel : function(rf) {
					if (!rf)
						return null;
					rf = _.extend(DataTemplateRenderer.DEFAULT_BUTTONS[rf.button_type],rf);
					return new DataTemplateRenderer.Models["ResponseButton"+ (_str.capitalize(rf["button_type"]))](rf, this);
				},
				initQueryConditionModel:function(){
					var model, rf, _i, _len, _ref, formField;
					this.response_querys = new Backbone.Collection;
					_ref = this.model.get("query_columns") || [];

					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						rf = _ref[_i];
						rf = this.convertField(rf);
						model = new DataTemplateRenderer.Models["ResponseQuery"
								+ (_str.capitalize(rf['field_type']))](rf,
								this.options, this.response_fields);
						this.response_querys.add(model);
					}
					
				},
				getDisplayColumnModel:function(){
					var models = [],
						idKey = this.getIdKey(),
						pidKey = this.getPIdKey(),
						namekey = this.getNameKey();
					if(idKey){
						models.push({
							name:idKey
						});
					}
					if(pidKey){
						models.push({
							name:pidKey
						});
					}
					if(namekey){
						models.push({
							name:namekey
						});
					}
						
					return models;
				},
				initResultColumns:function(){
					if(this.resultColumns)
						return this.resultColumns;
					this.resultColumns = [];
					if(!this.isDialog()){
						return this.resultColumns;
					}
					
					var  _this = this,
						result_columns = this.model.get("result_columns");
					
					if($.isEmpty(result_columns)){
							//如果空则去显示字段  id name typeid
						//	this.resultColumns  = this.getDisplayColumnModel();
							return 	this.resultColumns;
					}
			
						
					_.each(result_columns,function(column) {
						column = _this.convertField(column);
						
						if (column["field_type"] == 'dictionary') {
							_this.initDictionary(column['field_options']['dictionary']);
						}
						_this.resultColumns.push(column);
					});
					
					return this.resultColumns;
				},
				render : function() {
					var _this = this;
					DataTemplateRenderer.Views.ResponseTemplate.prototype.render.apply(this, arguments);
					setTimeout((function(_this) { // 等页面渲染好了再进行渲染
						return function() {
							// 初始化树形
							_this._initTree();
							//初始化顶部按钮
							_this.initToolbarButtons();
							//初始化右键菜单
							_this.initContextmenuButtons();
							return _this;
						};
					})(this), 0);
					return this;
				},

				// 初始化顶部按钮
				initToolbarButtons : function() {
					var view, buttonsEl;
						buttonsEl = this.$el.find(".tree-toolbar");
					if(this.response_toolbar_buttons.length == 0){
						buttonsEl.hide();
						return ;
					}
					this.response_toolbar_buttons.each((function(_this) {
								return function(rf) {
									//rf.isLabel = false;
									view = new DataTemplateRenderer.Views["ResponseButton"+ (_str.capitalize(rf["button_type"]))]({
												model : rf
											});
									buttonsEl.append(view.render().el);
								};
							})(this));
				},
				initContextmenuButtons :function(){
					if ($.isEmpty(this.response_root_menu_buttons)  && $.isEmpty(this.response_sub_menu_buttons))
						return;
					var _this = this,
						rootEl =$("#"+this.getViewId()+"RootMenu").find(".dropdown-menu"),
						subEl =$("#"+this.getViewId()+"SubMenu").find(".dropdown-menu");
					
					_.each(this.response_root_menu_buttons, function(button, i) {
							rootEl.append(  '<li><a data-action="'+button.button_type+'" tabindex="-1"><i class="'+button.icon+'"></i>&nbsp;&nbsp;'+button.label+'</a></li>');
					});
					_.each(this.response_sub_menu_buttons, function(button, i) {
						subEl.append(  '<li><a data-action="'+button.button_type+'" tabindex="-1"><i class="'+button.icon+'"></i>&nbsp;&nbsp;'+button.label+'</a></li>');
					});
				},
				getViewId : function() {
					return this.getDomId()+"Tree";
				},
				getDisplayColumns : function() {
					return this.model.get("display_columns")||{};
				},
				getExpand : function() {
					return this.model.get("attrs.expand") == 'N' ? false : true;
				},
				getSetting:function(){
					var _this = this;
					return  {
							data : {
								key : {
									name :  this.getNameKey(),
								},
								simpleData : {
									enable : true,
									idKey : this.getIdKey(),
									pIdKey : this.getPIdKey()
								}
							},
							check : {
								enable : this.getCheckEnable(),
								chkboxType : {
									"Y" : "s",
									"N" : ""
								},
								radioType : "all",
								chkStyle : this.isSingle() ? "radio" : "checkbox",
							},
							callback : {
								onClick : function(event, treeId, treeNode) {
									_this.zTreeOnClick.apply(_this, arguments);
								},
								onRightClick :function(e, treeId, treeNode) {
									_this.zTreeOnRightClick.apply(_this, arguments);
								},
								onCheck : function(event, treeId, treeNode) {
									_this.zTreeOnCheck.apply(_this, arguments);
								},
								beforeExpand : function(treeId, treeNode) {
									_this.zTreeBeforeExpand.apply(_this, arguments);
								},
								onAsyncSuccess :function(treeId, treeNode){
									_this.zTreeonAsyncSuccess.apply(_this, arguments);
								},
								onAsyncError : function(treeId, treeNode){
									_this.zTreeOnAsyncError.apply(_this, arguments);
								}
							}

						};
				},
				getIdKey:function(){
					return this.getDisplayColumns()["id_key"];
				},
				getPIdKey:function(){
					return this.getDisplayColumns()["pid_key"];
				},
				getNameKey:function(){
					return this.getDisplayColumns()["name_key"];
				},
				getRootId:function(){
					if(this.rootId)
						return  this.rootId;
					this.rootId =  this.getDisplayColumns()["root_id"];
					return this.rootPId;
				},
				getRootLabel:function(){
					return  this.getDisplayColumns()["root_label"];
				},
				_initTree : function() {
					var _this = this;
					$.ajax({
						url :  __ctx+ "/platform/data/dataTemplate/queryTreeDataJson.htm",
						type : "post",
						data : {
							response_data : JSON.stringify(this.model.response_data)
						},
						success : function(results) {
							if(!results.result){
								DialogUtil.alert(results.msg);
								return;
							}
							var setting = _this.getSetting(),
								data = results.data,
								rootLabel = results.rootLabel;
							//顶部id
							_this.rootId= $.isEmpty(results.rootPId)?"":results.rootPId;
		
							setting = _this.setPidSetting(setting);
							//设置顶部的数据
							_this.setTopData(data,results.rootLabel);
							
							//树形渲染
							_this.$treeObj = $.fn.zTree.init(_this.getViewObj(), setting,data);
							
							if (_this.getExpand()) 
								_this.$treeObj.expandAll(true);
							_this._treeFrameResize();
							// 缩放时候计算高度
							$(window).resize(function(){  
								_this._treeFrameResize();
							});
							
							//初始化选中字段
							_this.initShowData();
						}
					});

				},
				/**
				 * 缩放时候计算高度
				 */
				_treeFrameResize:function (id){
					this.getViewObj().height( $(window).height()-85);
				},
				setPidSetting:function(setting){
					if($.isEmpty(this.rootId))
						return setting;
					var options ={
							data:{
								simpleData : {
									rootPId:	this.rootId
								}
							} };
					return 	 $.extend(true, setting, options);
				},
				setTopData:function(data,rootLabel){
					if($.isNotEmpty(rootLabel)){//把顶部的加入
						var top ={};
						top[this.getIdKey()] = this.rootId;
						top[this.getPIdKey()] = null;
						top["__isRoot"] = true;
						top[this.getNameKey()] = rootLabel;
						data.push(top);
					}
//					else{
//						DialogUtil.msg("请检查是否设置根节点父节点的名称！");
//					}	
				},
				zTreeBeforeExpand : function(treeId, treeNode) {
					if (!treeNode.isAjaxing) {
						this.$treeObj.reAsyncChildNodes(treeNode, "refresh",
								true);
					}
				},
				zTreeonAsyncSuccess : function() {

				},
				zTreeOnAsyncError : function() {

				},
				zTreeOnClick : function(event, treeId, treeNode) {
					if(this.callback)
						this.callback("treeOnClick",arguments);
					//弹窗类型 有check按钮
					if(this.getCheckEnable())
						this.$treeObj.checkNode(treeNode, null, false, true);
					
				},
				zTreeOnCheck : function(event, treeId, treeNode) {
					this.model.set("data", []);
					this.model.set("data", this.getCheckData());
				},
				zTreeOnRightClick:function(event, treeId, treeNode) {
					var _this = this;
					if (!treeNode) 
						return;
					this.$treeObj.selectNode(treeNode);
				
					//获取当前点击左树
					var pidVal = treeNode[this.getPIdKey()],
						idVal = treeNode[this.getIdKey()],
						menu;
					///特殊节点能新增
					if(($.isEmpty(pidVal) || idVal ==  this.rootId) && 	treeNode.level == 0){
						if($.isEmpty(this.response_root_menu_buttons))
							return ;
						menu=$('#'+this.getViewId()+'RootMenu');
					}else{
						if($.isEmpty(this.response_sub_menu_buttons))
							return ;
						menu=$('#'+this.getViewId()+'SubMenu');
					}
						
					menu.contextMenu(event,{
						onItem: function(context, e) {
							var target =$(e.target), 
							action = target.data("action");
						if (target.hasClass('disabled'))
							return false;
						switch (action) {
							case "add":// 增加节点
								_this.editNode(treeNode,false);
								break;
							case "edit":// 编辑节点
								_this.editNode(treeNode,true);
								break;
							case "remove":// 删除节点
								_this.delNode(treeNode);
								break;
						}
						}
					});
				},
				getCheckData : function() {
					var checkedNodes = this.$treeObj.getCheckedNodes(),
						checkData = [];
					if ($.isEmpty(checkedNodes))
						return checkData;
					var resultColumns = this.resultColumns;
					if($.isEmpty(resultColumns)){
						DialogUtil.msg("请检查是否设置返回字段！");
						return;
					}
					var _this = this;
					_.each(checkedNodes, function(node, i) {
						var d = {};
						_.each(resultColumns, function(column, j) {
							var name = column["name"];
							d[name] = node[name] ? node[name] : '';
						});
						var id =  node[_this.getIdKey()];
						if($.isNotEmpty(id)){
							//增加返回值
							d[FormOptions.t.DATA_KEY.ID] = id;
							d[FormOptions.t.DATA_KEY.TITLE] =  node[_this.getNameKey()];
							checkData.push(d);
						}
			
					});
					return checkData;
				},
				reloadView:function(){
					this._initTree();
				},
				expandView: function() {
					this.$treeObj.expandAll(true);
				},
				compressView: function() {
					this.$treeObj.expandAll(false);
				},
				//=========对话框
				/**
				 * 初始化对话框展示数据
				 */
				initShowData:function(){
					var shows = this.model.get("shows");
					if($.isEmpty(shows))
						return;
					this.addSelectedDatas(shows.data);
				},
				addSelectedDatas :function(datas){
					if($.isEmpty(datas))
						return;
					for (var _i = 0, _len = datas.length; _i < _len; _i++) {
						var node = this.$treeObj.getNodeByParam(this.getIdKey(), datas[_i][FormOptions.t.DATA_KEY.ID], null);
						if($.isNotEmpty(node))
							this.$treeObj.checkNode(node, true, false,true);
					}
				
				},
				getCheckEnable:function(){
					return this.isDialog()? true:false;
				},
				cleanSelected : function(){
					 DataTemplateRenderer.Views.ResponseTemplate.prototype.cleanSelected.apply(this, arguments);
						// this.getSelectedContainerEl().empty();
					this.$treeObj.checkAllNodes(false);
					if(this.isSingle()){//修复单选bug
						var checkedNodes = this.$treeObj.getCheckedNodes();
						if(checkedNodes.length >0){
							this.$treeObj.checkNode(checkedNodes[0], false, null, true);	
						}
					}
				}
				
			});
	
	
	//TODO 值来源 
	DataTemplateRenderer.Views.ResponseTemplateValueSource = DataTemplateRenderer.Views.ResponseTemplateList.extend({
		events : {
			'click .js-search' : 'onSearch'
		},
		initialize:function(options){
			DataTemplateRenderer.Views.ResponseTemplate.prototype.initialize.apply(this, arguments);
		},
		onSearch : function(e){
			var $el = $(e.currentTarget),_this = this;
			var searchForm = $($el).closest("div .toolbar-panel").find(".search-form");
			if (searchForm.length == 0)
				return;
			var postData = this._serializeObject(searchForm);
			this.getViewObj().jqGrid('setGridParam', {
				url :__ctx+ "/platform/data/dataTemplate/queryDataTableJson.htm",
				postData : postData, // 发送数据
				page : 1,
				loadComplete:function(){
					var rowData = 	_this.getViewObj().jqGrid("getRowData");
					if(rowData.length!=0){
						$('#queryResults').show();
						$('#queryResults').empty().append('<pre class="code-popup">'+JSON.stringify(rowData, null, 2).replace(/</g, '&lt;').replace(/>/g, '&gt;')+'</pre>')
					}else{
						DialogUtil.alert("获取的数据为空！");
					}
				}
			}).trigger("reloadGrid"); // 重新载入
	
		},
		_serializeObject : function(form) {
			var o = {}, a = $(form).serializeArray();
			$.each(a, function() {
				var v = this.value || '';
				if (o[this.name]) {
					o[this.name] = o[this.name] +","+ v;
				} else {
					o[this.name] =v;
				}
			});
			return o;
		},
		render : function() {
			DataTemplateRenderer.Views.ResponseTemplate.prototype.render.apply(this, arguments);
				setTimeout((function(_this) { // 等页面渲染好了再进行渲染
					return function() {
						// 初始化表格
						_this.initGrid();
						return _this;
					};
				})(this), 0);
				return this;
		},
		initGrid : function() {
			this.getViewObj().GridExt( this.getOptions());
		},
		getOptions:function(){
			var _this =this;
			return {
				url : __ctx+ "/platform/data/dataTemplate/queryDataTableJson.htm",
				postData : {
					response_data : JSON.stringify(this.model.response_data)
				},
				datatype :  "local",
				colModel : this.getColModel(),
				loadError : function(e) {
					DialogUtil.error('加载数据失败，请检查配置！');
				},
				rowNum:null,
				loadComplete : function() {
					try {
						if (_this.getViewObj().jqGrid('getGridParam', 'datatype') != 'json'){
							_this.getViewObj().jqGrid('setGridParam', {
								datatype : 'json'
							});
						}
					} catch (e) {
					}
				}
			};
		},
		getColModel:function(){
			var colModel = [],
				resultColumns = this.model.get("result_columns");
			if($.isEmpty(resultColumns))
				return colModel;
			_.each(resultColumns, function(column) {
					colModel.push({
						label : column.label,
						name : column.name,
						hidden : true
					});
			});
			return colModel;
		}
		
	});
	
	//TODO 组合-树列表
	DataTemplateRenderer.Views.ResponseTemplateTreeList= DataTemplateRenderer.Views.ResponseTemplate.extend({
		template_type : 'treeList',
		className : 'laout_wrapper',
		initialize:function(options){
			DataTemplateRenderer.Views.ResponseTemplate.prototype.initialize.apply(this, arguments);
			this.templateData ={};
			this.templateAttrs = {};
			this.initTemplateData();
			this.$el = $('body');
		},
		/**
		 * 初始化模版数据
		 */
		initTemplateData:function(){
			var _this =  this,
				templates =  this.model.get("templates"),
				keys ={};
			
			_.each(templates,function(template,i){
				var key = i+"";
				if(template.attrs.bind_template == 'Y'){
					if( template.attrs.bind_template_key){
						keys[key] = template.attrs.bind_template_key;
						_this.templateAttrs[key] = template.attrs;
					}else{
						keys[key] = null;
						_this.templateAttrs[key] = {};
						
					}
			
				}else{
					_this.templateData[key] = {
							templates:[template]
						};
				}
			});
		
			//获取绑定模版数据
			this.getTemplateData(keys);
			
		},
		getTemplateData:function(keys){
			if($.isEmpty(keys)){
				return;
			}
			var _this = this;
			$.ajax({
				url :  __ctx+ "/platform/data/dataTemplate/getTemplateData.htm",
				type : "post",
				dataType:"json",
				async:false,
				data : {
					keys:JSON.stringify(keys)
				},
				success : function(results) {
						if(!results.result){
							DialogUtil.alert(results.msg);
							return;
						}
						_.each(results.data,function(d,i){
							_this.templateData[i] = eval('(' + d + ')');
						});
				}
			});
		},
		render : function() {
			this.$el.append(JST['partials/response_template'](this));
			
			setTimeout((function(_this) { // 等页面渲染好了再进行渲染
				return function() {
					//初始化布局
					_this._initLayout();
					// 初始化树形
					_this._initTree();
					//初始化列表
					_this._initList();
					//初始化事件
					_this._initJsEvent();
		
					return _this;
				};
			})(this), 0);
			return this;
		},
		//初始化事件
		_initJsEvent:function(){
			var _this = this;
			$(".selector-container").on("click","a.js-remove-selected", function(e){
			  _this.removeSelected(e);
			});
		},
		removeSelected:function(e){
			this.listView.removeSelected.apply(this.listView,arguments);
		},
		getTreeLabel:function(){
			return this.getTreeDataTemplate()["label"]||"";
		},
		getTreeDataTemplate:function(){
			if(this.response_data_tree)
				return this.response_data_tree;
			var _key =  this.getTreeKey(),
				data =  this.templateData[_key],template;
			if($.isEmpty(data)){
				DialogUtil.msg("未绑定树模版");
				return {};
			}
				
			var  fields = this.datasets2Fields(data.datasets);
			template = data.templates[0];
			template.attrs = _.extend(template.attrs, this.templateAttrs[_key]);
			this.response_data_tree = _.extend(template, {
				type:"tree",
				label:data.name,
				datasetKey : data.datasetKey,
				unique:data.unique,
				fields:fields,
				isSingle : this.isSingle()
			});
			return this.response_data_tree;
		},
		getListDataTemplate:function(){
			if(this.response_data_list)
				return this.response_data_list;
			var _key =  this.getListKey(),
				data =  this.templateData[_key],template;
			if($.isEmpty(data)){
				DialogUtil.msg("未绑定列表模版");
				return {};
			}
			var  fields =  this.datasets2Fields(data.datasets);
			template = data.templates[0];
			template.attrs = _.extend(template.attrs, this.templateAttrs[_key]);
			this.response_data_list = _.extend(template, {
				type:"list",
				label:data.name,
				datasetKey : data.datasetKey,
				unique:data.unique,
				fields:fields,
				isComposeDialog:this.isDialog()?true:false,
				isSingle : this.isSingle(),
				shows:this.model.get("shows"),
				ext_attrs:data.attrs
			});
			return this.response_data_list;
		},
		datasets2Fields:function(datasets){
			if($.isEmpty(datasets))
				return [];
			var fields = [],dataset;
			for (var _i = 0, _len = datasets.length; _i < _len; _i++) {
			   	dataset = datasets[_i];
			   	if(dataset.attrType == 'column'){
			   		fields.push(dataset);
			   	}
			}
			return fields;
		},
		_getChidrenVal:function(aryVal,treeNode,key){
			var children =  treeNode.children;
			if($.isEmpty(children))
				return;
			for (var i = 0; i < children.length; i++) {
				var v= children[i][key];
				if($.isNotEmpty(v))
					aryVal.push(v);
				 this._getChidrenVal(aryVal,children[i],key);
			}
		},
		_initTree : function() {
			var _this =this,
				rf = this.getTreeDataTemplate(),
				type =rf[DataTemplateRenderer.key.template_type],
				model,
				_refField;
			if($.isEmpty(rf))
				return;
			
			 model = new DataTemplateRenderer.Models["ResponseTemplate"+(_str.capitalize(type))](rf, this.model.template_renderer);
			_refField =  model.get("attrs.ref_field");
			
			this.treeView = new DataTemplateRenderer.Views["ResponseTemplate"+(_str.capitalize(type)) ]({
							model : model,
							callback:function(action,params){
								if(action == 'treeOnClick'){
									var treeNode  =  params[2],
										curNodeVal =treeNode[_refField],
										refFieldVal="";
									if(treeNode["__isRoot"] || $.isEmpty(curNodeVal) )
										refFieldVal = "";
									else{
										var aryVal = [];
										aryVal.push(curNodeVal);
										_this._getChidrenVal(aryVal,treeNode,_refField);
										refFieldVal = aryVal.join(",");
									}
						
									var $refField =	_this.listView.toolbar_panel.find("[ref-field]");
									if($refField.length == 0)
										return;
									$refField.val(refFieldVal);
									
									if(	_this.listView.response_toolbar_buttons_view["search"]){
										_this.listView.response_toolbar_buttons_view["search"].$el.find("[data-toggle='button']").trigger("click");
									}
									
								}
							}
						});
			
			this.$el.find(".compose-tree").append(this.treeView.render().el);
		},
		_initList:function(){
			var _this =this,
				rf = this.getListDataTemplate(),
				type =rf[DataTemplateRenderer.key.template_type],
				model;
			if($.isEmpty(rf))
				return;
			 model = new DataTemplateRenderer.Models["ResponseTemplate"+(_str.capitalize(type))](rf, this.model.template_renderer);
			this.listView = new DataTemplateRenderer.Views["ResponseTemplate"+(_str.capitalize(type))]({
							model : model,
							changeData:function(data){
								_this.model.set("data",[]);
								_this.model.set("data",data);
								_this.model.trigger('change');
							}
						});
			
			this.$el.find(".compose-list").append(this.listView.render().el);
		},
		cleanSelected:function(){
			DataTemplateRenderer.Views.ResponseTemplate.prototype.cleanSelected.apply(this, arguments);
			//渲染
			this.listView.getSelectedContainerEl().empty();
			this.listView.getViewObj().jqGrid('resetSelection');
		},
		_initLayout:function(){
			var  _this =this,
					layout,
					options={ applyDefaultStyles: true};
			if(this.isDialog()){
				options = $.extend({},{
					north:{
						spacing_open:			1	,	
						togglerLength_open:		0	,		
						togglerLength_closed:	-1	,
						resizable: 				false
					}
				}, options);
			}
			
			layout =   $('body').layout(options);  
			layout.addPinBtn( ".pinBtn",this.getTreePosition());
			this._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){  
				_this._treeFrameResize();
			});
		},

		_treeFrameResize:function(){
			$('.listFrame').height( $(window).height()-20);
			$("#"+this.getTreeId()).height( $(window).height()-145);
		},
		getTreeId : function() {
			return this.getDomId()+"Tree";
		},
		getGridId :function(){
			return this.getDomId()+"Grid";
		},
		getPagerId :function(){
			return this.getDomId()+"Pager";
		},
		//=========个性化
		getTreeKey:function(){
			return "0";
		},
		getListKey:function(){
			return "1";
		},
		getTreePosition:function(){
			return "west";
		}
	});
	
	//TODO 组合-列表树
	DataTemplateRenderer.Views.ResponseTemplateListTree= DataTemplateRenderer.Views.ResponseTemplateTreeList.extend({
		template_type : 'listTree',
		//=========个性化
		getTreeKey:function(){
			return "1";
		},
		getListKey:function(){
			return "0";
		},
		getTreePosition:function(){
			return "east";
		}
	});


	_ref = _.without(DataTemplateRenderer.TEMPLATE_TYPES,"list","tree","valueSource","treeList","listTree");
	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		i = _ref[_i];
		DataTemplateRenderer.Views["ResponseTemplate" + (_str.capitalize(i))] = DataTemplateRenderer.Views.ResponseTemplate
				.extend({
					template_type : i
				});
	}

}).call(this);