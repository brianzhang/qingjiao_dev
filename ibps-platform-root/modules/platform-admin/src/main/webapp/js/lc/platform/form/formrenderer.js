/**
 * 表单模版展示页面
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-10-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function(window){
var $, _str;

$ = jQuery;

_str = _.str;


(function() {
	  var FormRenderer;
	// 表单渲染
	  window.FormRenderer = FormRenderer = Backbone.View.extend({
	    defaults: {
	      enablePages: true,
	      ctx: 'http://www.bpmhome.cn',
	      target: '[data-formrenderer]',
	      validateImmediately: true, // 是否初始验证
	      response: {},
	      responderLanguage: void 0,
	      preview: false,
	      skipValidation: void 0,
	      saveParams: {},
	      showLabels: false,
	      scrollToPadding: 0,
	      plugins: ['Toolbar']
	    },
	    constructor: function(options) {
	      var p, _i, _len, _ref,loadForm;
	      this.fr = this;
	      this.options = $.extend({}, this.defaults, options);
	      this.requests = 0;
	      this.state = new Backbone.Model({
	        hasChanges: false
	      });
	      this.setElement($(this.options.target));
	      this.$el.addClass('fr-form');
	      
	      this.$el.data('formrenderer-instance', this);
	      this.subviews = {
	    	pages:{}, 
	        tabs: {},
	        foldCards: {}
	      };
	      // 请求数据头
	      this.serverHeaders = {
	        'X-FR-Version': FormRenderer.VERSION,
	        'X-FR-URL': document.URL
	      };
	      // 插件
	      this.plugins = _.map(this.options.plugins, (function(_this) {
	        return function(pluginName) {
	          return new FormRenderer.Plugins[pluginName](_this);
	        };
	      })(this));
	      _ref = this.plugins;
	      
	      // 表单加载前的事件
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        p = _ref[_i];
	        if (typeof p.beforeFormLoad === "function") {
	          p.beforeFormLoad();
	        }
	      }
	      
	      // 表单设置的脚本
    	  if(options.attrs && options.attrs.script){
    		  try {
    			  $("head") .append('<script type="text/javascript">  try {\n'+options.attrs.script+'\n} catch (e) {if(console){ console.info(e);	}}</script>');
			} catch (e) {
			   	 if(console){ 
			   		 console.info(e);
			   	}
			}
    	  }
	      // 构建主页面
	      this.$el.html(JST['main'](this));
	      this.trigger('viewRendered', this);

	      loadForm = (function(_this) {
		        return function() {
		        	return _this.loadForm();
		        	};
		        })(this);
	     // 处理加载表单
	      this.loadFromServer(loadForm);
	      
	      return this;
	    },
	    loadForm:function(){
	          var _base, _j, _len1, _ref1,p;
	          this.$el.find('.fr-loading').remove();
	          // 初始化表头
	          this.initFormHeader();
	          // 初始化字段
	          this.initResponseFields();

	          this.initPages();
	          
	          if (this.options.enablePages) {
	        	  this.initPagination();
	          } else {
	        	  this.initNoPagination();
	            }
	
	          // 折叠
	          this.initFoldCards();
	
	          // 加载后处理插件
	          _ref1 = this.plugins;
	          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	            p = _ref1[_j];
	            if (typeof p.afterFormLoad === "function") {
	              p.afterFormLoad();
	            }
	          }
	          // 是否立刻验证表单
	          if (this.options.validateImmediately) {
	            this.validate();
	          }
	    
	          // 初始化公式计算
	          this.initCalFormula();
	          // 初始联动计算
	          this.initCalLinkage();
	          // 初始化表单提交验证
	          this.initFormSubmitVerify();
	          // 初始化表单规则
	          this.initRules();
	          
	          // 表单加载完成
	          this.trigger('ready');
	          
	          // 表单加载完成事件
	          $.JForm._onLoad(this);
	          return typeof (_base = this.options).onReady === "function" ? _base.onReady.apply(this) : void 0;
	    },
	 
	    // 跨域支持
	    corsSupported: function() {
	      return 'withCredentials' in new XMLHttpRequest();
	    },
	    projectUrl: function() {
	      return "" + __ctx+ "/projects/" + this.options.project_id;
	    },
	    loadFromServer: function(cb) {
	      if (this.options.fields != null ) 
	        return cb();
	      // 如果字段为空 从服务器获取表单 暂时不起作用
	      return $.ajax({
	        url: "" +  __ctx+ "/api/form_renderer/load",
	        type: 'get',
	        dataType: 'json',
	        data: this.loadParams(),
	        headers: this.serverHeaders,
	        success: (function(_this) {
	          return function(data) {
	            var _base, _base1, _ref;
	            _this.options.response.id = data.response_id;
	            (_base = _this.options).fields || (_base.fields = data.project.fields);
	            (_base1 = _this.options.response).responses || (_base1.responses = ((_ref = data.response) != null ? _ref.responses : void 0) || {});
	            if (_this.options.afterSubmit == null) {
	              _this.options.afterSubmit = {
	                method: 'page',
	                html: data.project.after_response_page_html || ("<p>" + FormRenderer.t.thanks + "</p>")
	              };
	            }
	            return cb();
	          };
	        })(this),
	        error: (function(_this) {
	          return function(xhr) {
	            var _ref;
	            if (!_this.corsSupported()) {
	              return _this.$el.find('.fr-loading').html(FormRenderer.t.not_supported.replace(/\:url/g, _this.projectUrl()));
	            } else {
	              _this.$el.find('.fr-loading').text("" + FormRenderer.t.error_loading + ": \"" + (((_ref = xhr.responseJSON) != null ? _ref.error : void 0) || 'Unknown') + "\"");
	              return _this.trigger('errorSaving', xhr);
	            }
	          };
	        })(this)
	      });
	      
	    },
	    // 初始表头
	    initFormHeader:function(){
			var model  = new Backbone.DeepModel({
		    		name:  this.options.name,
		    		desc: this.options.desc,
		    		attrs:this.options.attrs
			   });
			this.setVariables(model);
	    	if($.isEmpty(this.options.name))
	    		return;
		    if( model.get(FormOptions.t.propertys.HIDE_NAME)  && model.get(FormOptions.t.propertys.HIDE_DESC))
		    	return;
		    
		    var   view =  new FormRenderer.Views.FormHeader({
		    	model: model
		    });
		   var header = $('<div class="fr-form-header-wrapper"></div>');
		   header.append(view.render().el)
		   this.$el.before(header);
	    },
	    setVariables:function(model){
	    	// 只读样式
	    	var readStyle = model.get("attrs.read_style");
	    	if($.isNotEmpty(readStyle))
	    		 FormRenderer.variables.read_style =readStyle ;
	    	// 是否冒号
	    	var colon = model.get("attrs.colon");
	    	if($.isNotEmpty(colon))
	    		 FormRenderer.variables.colon =colon ;
	    	
	    	var pageStyle = model.get("attrs.page_style");
	    
	    	FormRenderer.variables.page_style =$.isNotEmpty(pageStyle)?pageStyle:'chain-number' ;
	    },
	    // 初始化字段
	    initResponseFields: function() {
	      var model, rf, _i, _len, _ref,_response,response_sub_fields,isSubTable;
	      // 所有的字段 model
	      this.response_models ={};
	      // 视图
	      this.response_views = {};
	      // 公式计算
	      this.response_formula = {};
	      
	      // 联动
	      this.response_linkage = {};
	
	      // 字段
	      this.response_fields = new Backbone.Collection;
	      // 子表主字段
	      response_sub_fields = new Backbone.Collection;
	      
      	  _response = this.options.response;
      	  
     	   this.code = this.options.code;
     	   
      	  _ref = this.options.fields;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    	  rf = _ref[_i]; 
	    	  model = new FormRenderer.Models["ResponseField" + (_str.capitalize(rf.field_type))](rf, {
		          form_renderer: this
		        });
	    	  
		        model.initPresetParams();
		       	// ====设置预设值 和 加载数据
		       	model.setExistingValue(this.getResponseData(_response?_response.responses:null,model));

		       // ====设置计算公式
		       	FormRendererUtil.setResponseFormula(model,this.response_formula);
		       	
		       	// ====设置联动
		       	FormRendererUtil.setResponseLinkage(model,this.response_linkage);
		       	
		       	if(model.isSubTable()){
		       		model.initResponseFields();
		       	} 
		       	// ====设置权限
		       	model.setExistingPermission(this.getPermissionData( _response?_response.permissions:null,model,this.options.isRead));
		       	
		     	this.response_models[rf.name] = model;
		        if(model.isSubTable() ){ // 子表
		        	response_sub_fields.add(model);
		         }
		        this.response_fields.add(model);
	      }
	      // 对子表的数据改变进行合并计算
		 this.mergeSubTable(response_sub_fields);
	      
	      return this.listenTo(this.response_fields, 'change:value change:value.*', $.proxy(this._onChange, this));
	    },
	    /**
		 * 对子表的数据改变进行合并计算
		 */
	    mergeSubTable:function(response_sub_fields){
	      if(response_sub_fields.length == 0 || $.isEmpty(this.response_formula))
	    	  return;
	    	_.each(response_sub_fields.models,(function(_this) {
		        return function(rf) {
		        		rf.mergeFormula(_this.response_formula);
		        	};
		        })(this));
	    },
	    /**
		 * 初始化公式计算
		 */
	    initCalFormula:function(){
	    	if($.isEmpty(this.response_formula))
	    		return;
	    	// 整理有公式的字段 现在只在主表
		      this.listenTo(this.response_fields, 'change:value change:value.*', (function(_this) {
			        return function(rf) {
			        	// 子表 子表在自己的类计算出来
			           	if(rf.isSubTable() )
			           		return;
		           		// 进行运算
		        		var key = rf.get(FormOptions.t.mappings.CODE)+FormRendererUtil.TABLE_SEPARATOR+rf.get(FormOptions.t.mappings.NAME);
	            		if(_this.response_formula[key] ){
	            			FormRendererUtil.runCalFormula(_this.response_formula[key],_this.response_models,rf);
	            		}
			        };
			      })(this));
		      // 不需要字段的进行公式计算 比如获取但其当前时间
		     FormRendererUtil.runCalFormula(this.response_formula[FormRendererUtil.NOT_NEED_FIELD],this.response_models);
		     //子表的公式进行初始化运算	
		      this.response_fields.each((function(_this) {
			        return function(rf) {
			           	if(rf.isSubTable && !rf.isSubTable() )
			           		 return false;
			           	rf.runCalFormulaAll();
			        };
		      })(this));
	    },
	    initCalLinkage : function(){
	    	if($.isEmpty(this.response_linkage))
	    		return;
	    	// 整理有公式的字段 现在只在主表
		      this.listenTo(this.response_fields, 'change:value change:value.*', (function(_this) {
			        return function(rf) {
			        	// 子表 子表在自己的类code出来
			           	if(rf.isSubTable() )
			           		return;
		           		// 进行运算
		        		var key = rf.get(FormOptions.t.mappings.CODE)+FormRendererUtil.TABLE_SEPARATOR+rf.get(FormOptions.t.mappings.NAME);
	            		if(_this.response_linkage[key] ){
	            			FormRendererUtil.runLinkage(_this.response_linkage[key],_this.response_models,rf);
	            		}
			        };
			      })(this));
	    },
	  
     	/**
		 * 设置展示的值 和默认的值
		 */
	    getResponseData:function(responses,model){
        	var responseData;
	    	if($.isEmpty(responses) || $.isEmpty(responses[model.get(FormOptions.t.mappings.NAME)]))
	    		return null;
        	model.set(FormOptions.t.mappings.IS_DEFAULT,false);
        	responseData = responses[model.get(FormOptions.t.mappings.NAME)];
        	// 绑定其他
        	if(	$.isNotEmpty(model.get(FormOptions.t.mappings.OPTION_OTHER_ID))){
        		model.setExistingOtherValue(responses[model.get(FormOptions.t.mappings.OPTION_OTHER_ID)]);
        	}
        	return responseData;
	    },
	    /**
		 * 获取表单字段权限
		 */
	    getPermissionData:function(permissions,model,isRead){
	     	var permissionData = null,
	     		fieldType = model.get(FormOptions.t.mappings.FIELD_TYPE),
	     		 isNonInputField = $.inArray(fieldType,FormOptions.t.NON_INPUT_FIELD_TYPES) >-1,
	     		 name = model.get(FormOptions.t.mappings.NAME),
	     		isSpecial = false;
        	if(!permissions || $.isEmpty(name))
	    		return null;
        	if(isNonInputField && permissions.fields){// 非输入字段
       			permissionData= permissions.fields[name]?permissions.fields[name]:null;
        	}else if(fieldType == 'opinion' && permissions.opinions){// 意见 特殊处理
        		isSpecial = true;
       			permissionData = permissions.opinions[name]?permissions.opinions[name]:null;
       		} else if(fieldType == 'table' && permissions.tables){// 表
       			isSpecial = true;
   				permissionData = permissions.tables[name]?permissions.tables[name]:null;
       		}else { // 字段
       			permissionData= permissions.fields[name]?permissions.fields[name]:null;
       		}
	    	if(isRead && !isNonInputField && !isSpecial ){// 如果只读
	    		permissionData = permissionData!='h'?FormOptions.t.PERMISSIONS.READ:permissionData;
	    	}
       		return permissionData;
	
	    },
	  
	    // ===================初始化分页===============================
	    initPages: function() {
		    var  currentPageInLoop, page;
		      this.numPages = this.response_fields.filter(function(rf) {
		        return rf.get('field_type') === 'page_break';
		      }).length;
		      
		      this.state.set('activePage', 1);
		      
		      currentPageInLoop = 0;
		      if( this.numPages == 0){// 没有分页
		    	  this.addPage(++currentPageInLoop);
		    	  this.options.enablePages = false;
		      }else{
		    	  this.options.enablePages = true;
		      }
		      this.response_fields.each((function(_this) {
		        return function(rf) {
		          if (rf.get('field_type') === 'page_break') {
		        	  return _this.addPage(++currentPageInLoop,rf);
		          } else {
		        	  if(! _this.subviews.pages[currentPageInLoop]){
		        	  	 _this.addPage(++currentPageInLoop);
		        	  }
		            return _this.subviews.pages[currentPageInLoop].models.push(rf);
		          }
		        };
		      })(this));
		      
		      _ref = this.subviews.pages;
		      _results = [];
		      for (pageNumber in _ref) {
			        page = _ref[pageNumber];
			        // 初始化Tab标签
			        page.initTabs();
			        _results.push(this.$el.append(page.render().el));
		      }
		      return _results;
	    },
	    addPage:function(currentPage,model){
	        return this.subviews.pages[currentPage] = new FormRenderer.Views.Page({
	            form_renderer: this,
	            model:model?model:this.getNotSetPageBreakModel()
	          });	
	    },
	    getNotSetPageBreakModel:function(){
	 	  var rf= {
      	  			 field_type  :"page_break",
      	  			 label:"未命名"
      	  	 };
	 	  	return  new FormRenderer.Models["ResponseField" + (_str.capitalize(rf.field_type))](rf, {
 		          form_renderer: this
		        });
	    },
	    initPagination: function() {
	      this.subviews.pagination = new FormRenderer.Views.Pagination({
	        form_renderer: this
	      });
	      this.$el.prepend(this.subviews.pagination.render().el);
	     return this.subviews.pages[this.state.get('activePage')].show();
	    },
	    initNoPagination: function() {
	      var page, pageNumber, _ref, _results;
	      _ref = this.subviews.pages;
	      _results = [];
	      for (pageNumber in _ref) {
	        page = _ref[pageNumber];
	        _results.push(page.show());
	      }
	      return _results;
	    },

	    // ===================分页end===============================
	  
	    
	    // ===================初始化折叠卡end===============================
	    // 初始化折叠卡
	    initFoldCards: function() {
	      var addFoldCard, foldCard = null, foldCardNumber, _ref, _results;
	      this.foldCardsModel = {};
	      addFoldCard = (function(_this) {
		        return function() {
		          return new FormRenderer.Views.FoldCard({
		            form_renderer: _this
		          });
		        };
		      })(this);
	      
	      var current_fold_card_id = null, current_fold_card_end = null, end = false;
	      this.response_fields.each((function(_this) {
	        return function(rf) {
	          if (rf.get('field_type') === 'fold_card') {// FoldCard标识
	        	  current_fold_card_id = rf.get('f_id');
	        	  current_fold_card_end = rf.get('name');
	        	  
	        	  _this.subviews.foldCards[current_fold_card_id] = addFoldCard();
	        	  _this.subviews.foldCards[current_fold_card_id].model = rf;
	        	  end = false;
	          } else {
	        	  if($.isNotEmpty(current_fold_card_end) && !end){
	        		  if(rf.get('name') == current_fold_card_end){
	        			  end = true;
	        		  }
	        		  // 设置包含的字段
	        		  _this.subviews.foldCards[current_fold_card_id].models.push(rf);
	        	  }
	          }
	        };
	      })(this));
	      
	      _ref = this.subviews.foldCards;
	      _results = [];
	      for (foldCardNumber in _ref) {
	    	  foldCard = _ref[foldCardNumber];
	    	  // 初始化事件
	    	  foldCard.bind();
	    	  // 初始化折叠状态
	    	  foldCard.collapse();
	    	  if (!this.isFoldCardValid(foldCard.model.get('f_id'))){
	    		  FormRendererUtil.qtip(foldCard.model.attributes.$el);
	    	  }
	      }
	      return _results;
	    },
	    // ===================折叠卡end===============================
	    
	    // 初始化表单规则（只对主表）
	    initRules: function() {
	      this.listenTo(this.response_fields, 'change:value change:value.*', (function(_this) {
	        return function(rf) {
	          return _this.runRules(rf);
	        };
	      })(this));
	      
	    this.allRules = [];
	  	var _ref,_i,_len, rule_fields,_this = this;
	      	_ref = this.options.attrs?this.options.attrs.rules:null;
		  if($.isEmpty(_ref))
			  return this.allRules;
		  
		  rule_fields = this.getRuleFields(_ref);

	      this.allRules = _.compact( _.flatten(this.response_fields.map(function(rf) {
    	  		var  fieldRules = rule_fields[rf.get("name")];
    	  		if(!fieldRules)
    	  			return;
	  			rf.set(FormOptions.t.mappings.RULES,fieldRules);
	  			 return _.extend({}, {
	  				 	rules:fieldRules,
    		            parent: rf
    		   });
		  })));
	    var _r,conditions;
	    // 初始化时候需要计算规则
	    _.each(this.allRules, (function(_this) {
	        return function(rule) {
	        	_.each( rule.rules, function(rules)  {
	 			   _.each(rules.conditions.rules, function(rule) {
	 				   	var rf =  	_this.response_models[rule.field];
	 					if(rf) return _this.runRules(rf);
	   			 });
	 		   });
	        };
	      })(this));
	    
	      return this.allRules;
	    },
	    getRuleFields:function(_ref){
	    	var rule_fields ={};
		    for (_i = 0, _len = _ref.length; _i < _len; _i++) {  
		    	var ref =_ref[_i] ;
		    	var r = {};
		    	$.cloneObject(ref, r);
		    	delete r.fields ;
		    	 _.each(ref.fields,function(f){
		    		if(!rule_fields[f]){
		    			 rule_fields[f] =[];
		    		}
		    		rule_fields[f].push(r);
		    	 });
			 }
		    return rule_fields;
	    },
	    activatePage: function(newPageNumber) {
	        this.subviews.pages[this.state.get('activePage')].hide();
	        this.subviews.pages[newPageNumber].show();
	        window.scrollTo(0, this.options.scrollToPadding);
	        return this.state.set('activePage', newPageNumber);
	    },
	    /**
		 * 初始化表单提交验证
		 */
	    initFormSubmitVerify :function(){
	    	var _ref,_i,_len,verify;
		      this.response_verifys = new Backbone.Collection;
	      	  _ref = this.options.attrs?this.options.attrs.verifys:null;
      	  if($.isEmpty(_ref))
      		  return;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    	 this.response_verifys.add(new Backbone.DeepModel(_ref[_i]));
    	 }
	    },
	    // 表单验证
	    validate: function() {
	      var page, foldCard, valid, p, _ref;
	      
	      _ref = this.subviews.foldCards;
	      for (p in _ref) {
	    	  foldCard = _ref[p];
	    	  foldCard.validate();
	      }

	      _ref = this.subviews.pages;
	      for (p in _ref) {
	    	  page = _ref[p];
	    	  page.validate();
	      }
	      
	      this.trigger('afterValidate afterValidate:all');
	      // 验证折叠
	      valid =  this.areAllFoldCardsValid();
	      if(!valid){
	    	  this.state.set("error","form_error");
	    	  return valid;
	      }
	      
	      // 验证标签页
	     valid =  this.areAllPagesValid();
	     if(!valid){
	    	 this.state.set("error","form_error");
	    	 return valid;
	     }
	     return this.formSubmitVerify();
	    },
	    // 表单提交验证
	    formSubmitVerify:function(){
	    	this.state.set("error",null);
	    	if($.isEmpty(this.response_verifys) || this.response_verifys.length ==0){
	    		return true;
	    	}
	    	var valid = true,_ref,_i,_len,rf;
	    	_ref = this.response_verifys.models;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) { 
	        	rf = _ref[_i];
	        	valid  = FormRendererUtil.runFormSubmitVerify(rf.get("formula"),this.response_models,this);
	    		if(!valid){
	    			this.state.set("error",rf.get("msg"));
	    			return valid;
	    		}else{
	    			this.state.set("error",null);
	    		}
	        }
	    	return valid;
	    },
	    getErrorMsg:function(){
	    	if( this.state.get("error") == "form_error"){
	    		return FormRenderer.t["form_error"];
	    	}
	    	return this.state.get("error")	;
	    },
		getPageModel:function(pageNumber){
			return this.subviews.pages[pageNumber].model;
		},
		getActivePageModel:function(){
			return this.getPageModel(this.state.get('activePage'));
		},
	    isPageVisible: function(pageNumber) {
	      return this.subviews.pages[pageNumber] && !!_.find(this.subviews.pages[pageNumber].models, (function(rf) {
	        return rf.isVisible;
	      }));
	    },
	    /*------------------------*/
	    /**
		 * 折叠卡是否有效
		 */
	    isFoldCardValid: function(f_id) {
	    	if(undefined == this.subviews.foldCards[f_id]){return true}
	    	return !_.find(this.subviews.foldCards[f_id].models, (function(rf) {
	    		if(rf.field_type == 'table' ){  // 子表需要特殊验证
	    		     if(rf.input_field && rf.errors.length > 0)
	    		    	 return true;
	    		     if(  $.isEmpty(rf.errorsub))
	    			   return false;
	    		     // 遍历子表错误
		    		  var rtn = false,_i,_len,errorsub=rf.errorsub;
		    		  for (_i in errorsub)  {
	    			      for ( _j = 0, _len =errorsub[_i].length; _j < _len; _j++) {
	    			    	  if($.isNotEmpty(errorsub[_i][_j]))return true;
	    			      }
		    		  }
	    		      return rtn;
	    		}else{
	    			return rf.input_field && rf.errors.length > 0;  
	    		}
	      }));
	    },
	    invalidFoldCards: function() {
	      var _i, _ref, _results;
	      return _.filter((function() {
	        _results = [];
	        for (_i in this.subviews.foldCards){
	        	if(undefined != this.subviews.foldCards[_i].model)
	        		_results.push(this.subviews.foldCards[_i].model.get('f_id'));
	        }
	        return _results;
	      }).apply(this), (function(_this) {
	        return function(f_id) {
	          return _this.isFoldCardValid(f_id) === false;
	        };
	      })(this));
	    },
	    areAllFoldCardsValid: function() {
	      return this.invalidFoldCards().length === 0;
	    },

	    /**
		 * 标签页是否有效
		 */
	    isPageValid: function(pageNumber) {
	      return !_.find(this.subviews.pages[pageNumber].models, (function(rf) {
	    	  if(rf.field_type == 'table' ){  // 子表需要特殊验证
    		     if(rf.input_field && rf.errors.length > 0)
    		    	 return true;
    		     if(  $.isEmpty(rf.errorsub))
    			   return false;
    		     // 遍历子表错误
	    		  var rtn = false,_i,_len,errorsub=rf.errorsub;
	    		  for (_i in errorsub)  {
    			      for ( _j = 0, _len =errorsub[_i].length; _j < _len; _j++) {
    			    	  	if($.isNotEmpty(errorsub[_i][_j]))return true;
    			      }
	    		  }
    		      return rtn;
	    	  }else{
	  	        return rf.input_field && rf.errors.length > 0;  
	    	  }
	      }));
	    },
	    // focus到第一个错误
	    focusFirstError: function() {
	        var page, view;
	        page = this.invalidPages()[0];
	        this.activatePage(page);
	        view = this.subviews.pages[page].firstViewWithError();
	        window.scrollTo(0, view.$el.offset().top - this.options.scrollToPadding);
	        return view.focus();
	    },
	    invalidPages: function() {
	      var _i, _ref, _results;
	       return   _.filter((function() {
		        _results = [];
		        for (var _i = 1, _ref = this.numPages; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
		        return _results;
		      }).apply(this), (function(_this) {
		        return function(x) {
		        	if(x== 0)
		        		return false;
		          return _this.isPageValid(x) === false;
		        };
		      })(this));
	    },
	    areAllPagesValid: function() {
	      return this.invalidPages().length === 0;
	    },
	    visiblePages: function() {
	    	return _.tap([], (function(_this) {
	            return function(a) {
	              var num, _, _ref, _results;
	              _ref = _this.subviews.pages;
	              _results = [];
	              for (num in _ref) {
	                _ = _ref[num];
	                if (_this.isPageVisible(num)) {
	                  _results.push(a.push(parseInt(num, 10)));
	                } else {
	                  _results.push(void 0);
	                }
	              }
	              return _results;
	            };
	          })(this));
	    },
	    isFirstPage: function() {
	        var first;
	        first = this.visiblePages()[0];
	        return !first || (this.state.get('activePage') === first);
	      },
	      isLastPage: function() {
	        var last;
	        last = _.last(this.visiblePages());
	        return !last || (this.state.get('activePage') === last);
	      },
	      previousPage: function() {
	        return this.visiblePages()[_.indexOf(this.visiblePages(), this.state.get('activePage')) - 1];
	      },
	      nextPage: function() {
	        return this.visiblePages()[_.indexOf(this.visiblePages(), this.state.get('activePage')) + 1];
	      },
	      handlePreviousPage: function() {
	        return this.activatePage(this.previousPage());
	      },
	      handleNextPage: function() {
	        if (this.isLastPage() || !this.options.enablePages) {
	          return this;
	        } else {
	          return this.activatePage(this.nextPage());
	        }
	      },
	    // 获取值
	    getValue: function() {
	      return _.tap({}, (function(_this) {
	        return function(h) {
	          return _this.response_fields.each(function(rf) {
	            var gotValue;
	            if (!rf.input_field || !rf.formula_field || ( !rf.isVisible && rf.field_type != 'hidden')) {// 隐藏，但是不是隐藏域的要获取值
	              return;
	            }
	            gotValue = rf.getValue();
	            if ( $.isNotEmpty(gotValue) && (typeof gotValue === 'object') && gotValue.merge) {
	              delete gotValue.merge;
	              return _.extend(h, gotValue);
	            } else {
	            	if( _this.isEmpty(gotValue) ) gotValue = '';
	              return h[rf.get(FormOptions.t.mappings.NAME)] = gotValue;
	            }
	          });
	        };
	      })(this));
	    },
	    /**
		 * 特殊的判断为空 空数组和空对象不做为空判断
		 */
	    isEmpty:function(obj){
    	  if (obj == null) return true;
          if (typeof obj=== "string") return obj.length === 0;
          return   obj === undefined;
	    },
	    loadParams: function() {
	      return {
	        v: 0,
	        response_id: this.options.response.id,
	        project_id: this.options.project_id,
	        responder_language: this.options.responderLanguage
	      };
	    },
	    
	    // ======条件
	    reflectConditions: function() {
	      var page, _, _ref, _ref1;
	      _ref = this.subviews.pages;
	      for (_ in _ref) {
	        page = _ref[_];
	        page.reflectConditions();
	      }
	      return (_ref1 = this.subviews.pagesContainer) != null ? _ref1.render() : void 0;
	    },
	    runRules: function(rf) {
	      var needsRender;
	      needsRender = false;
	      _.each(this.rulesForResponseField(rf), function(c) {
	        if (c.parent.calculateRules()) {
	          return needsRender = true;
	        }
	      });
	      if (needsRender) {
	        return this.reflectConditions();
	      }
	    },
	   rulesForResponseField: function(rf) {
		   var _r,conditions;
	      return _.filter(this.allRules, function(rule) {
	    	  if(rule.rules.length == 0)
	    		  return ;
    		   for (_r in rule.rules) {
    			   if( !rule.rules[_r])
    			   		continue;
    		        return _.filter(rule.rules[_r].conditions, function(condition) {
    			        return ("" + condition.id) === ("" + rf.get(FormOptions.t.mappings.NAME));
    			      });
    		   }
	      });
	    },
	    isConditionalAction: function(condition) {
	      return (new FormRenderer.ConditionChecker(this, condition)).isPass();
	    }
	  });

	  // 字段类型
	  FormRenderer.INPUT_FIELD_TYPES = FormOptions.t.INPUT_FIELD_TYPES;

	  // 不用输入字段类型，
	  FormRenderer.NON_INPUT_FIELD_TYPES = FormOptions.t.NON_INPUT_FIELD_TYPES;
	  // 所有字段类型
	  FormRenderer.FIELD_TYPES = _.union(FormRenderer.INPUT_FIELD_TYPES, FormRenderer.NON_INPUT_FIELD_TYPES);

	  FormRenderer.BUTTON_CLASS = 'fr-button';
	  
	  FormRenderer.variables ={
			  read_style: 'text',
			   colon:true
	  		};
	  // 选择器缓存
	  FormRenderer.SELECTOR_CACHE ={};
	  // 自定义对话框缓存
	  FormRenderer.CUSTOM_DIALOG_CACHE ={};
	  
	  // 数据字典缓存
	  FormRenderer.DICTIONARY_CACHE={};
	  
	  FormRenderer.Views = {};

	  FormRenderer.Models = {};

	  FormRenderer.Validators = {};

	  FormRenderer.Plugins = {};

	  FormRenderer.addPlugin = function(x) {
	    return this.prototype.defaults.plugins.push(x);
	  };

	  FormRenderer.removePlugin = function(x) {
	    return this.prototype.defaults.plugins = _.without(this.prototype.defaults.plugins, x);
	  };

	}).call(this);

	
	
// HTML格式和清洁
(function() {
  var ALLOWED_ATTRIBUTES, ALLOWED_TAGS, autoLink, sanitize, simpleFormat;

  ALLOWED_TAGS = ['a', 'p', 'br', 'b', 'strong', 'em', 'i'];

  ALLOWED_ATTRIBUTES = ['href', 'target'];

  autoLink = function(str) {
    var pattern;
    pattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
    return str.replace(pattern, "$1<a href='$2' target='_blank'>$2</a>");
  };

  simpleFormat = function(str) {
    if (str == null) {
      str = '';
    }
    return ("" + str).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2');
  };

  sanitize = function(str) {
    return DOMPurify.sanitize(str, {
      ALLOWED_TAGS: ALLOWED_TAGS,
      ALLOWED_ATTR: ALLOWED_ATTRIBUTES
    });
  };

  FormRenderer.formatHTML = function(unsafeHTML) {
    return sanitize(autoLink(simpleFormat(unsafeHTML)));
  };

}).call(this);	
	
(function() {
  FormRenderer.getLength = function(wordsOrChars, val) {
	    var trimmed;
	    trimmed = _str.trim(val);
	    if (wordsOrChars === 'words') {
	    	return (trimmed.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || '').length;
	    } else {
	      return trimmed.length;
	    }
	  };
}).call(this);
// 转换标准化数字（不包含单位（货币））
(function() {
	FormRenderer.normalizeNumber = function(value, units) {
	  var returnVal;
		if(_.isNumber(value))
			return value;
	  returnVal = value.replace(/,/g, '').replace(/-/g, '').replace(/^\+/, '').trim();
	  if (units) {
	    returnVal = returnVal.replace(new RegExp(units + '$', 'i'), '').trim();
	  }
	  return returnVal;
	};
}).call(this);

(function() {
	// 转换成Boolean值
	FormRenderer.toBoolean = function(str) {
	  return _.contains(['True', 'Yes', 'true', '1', 1, 'yes','Y','y','T','t', true], str);
	};
}).call(this);


(function() {
  FormRenderer.VERSION = '1.0.2';
}).call(this);
// ////////////验证框架 ////////////////////////////////////////////////////
// 整型验证
(function() {
	FormRenderer.Validators.IntegerValidator = {
	validate: function(model,value) {
			var normalized;
			if (!model.get(FormOptions.t.mappings.INTEGER)) {
				return;
			}
			normalized = FormRenderer.normalizeNumber(value+"", model.get(FormOptions.t.mappings.UNITS));
			if (!normalized.match(/^-?\d+$/)) {
				return 'integer';
			}
		}
	};
}).call(this);

// 最大、最小字符串长度验证
(function() {
	FormRenderer.Validators.MinMaxLengthValidator = {
			validate: function(model,value) {
				var count, max, min;
				if (!(model.get(FormOptions.t.mappings.MINLENGTH) || model.get(FormOptions.t.mappings.MAXLENGTH))) {
				  return;
				}
				min = parseInt(model.get(FormOptions.t.mappings.MINLENGTH), 10) || void 0;
				max = parseInt(model.get(FormOptions.t.mappings.MAXLENGTH), 10) || void 0;
				count = FormRenderer.getLength(model.getLengthValidationUnits(),value);
				if (min && count < min) {
					return {
						 key: 'short',
						 args:min
					  };
				} else if (max && count > max) {
					return {
						 key: 'long',
						 args:max
					  };
			}
		}
 };

}).call(this);

// 最大、最小值验证
(function() {
	FormRenderer.Validators.MinMaxValidator = {
		validate: function(model,value) {
			var max, min;
			if (!(model.get(FormOptions.t.mappings.MIN) || model.get(FormOptions.t.mappings.MAX))) {
			  return;
			}
			min = model.get(FormOptions.t.mappings.MIN) && parseFloat(model.get(FormOptions.t.mappings.MIN));
			max = model.get(FormOptions.t.mappings.MAX) && parseFloat(model.get(FormOptions.t.mappings.MAX));
			if (min && value < min) {
			  return {
					 key: 'small',
					 args:min
				  };
			} else if (max && value > max) {
			  return {
					 key: 'large',
					 args:max
				  };
			}
		}
	};
}).call(this);

// 数字验证
(function() {
	FormRenderer.Validators.NumberValidator = {
		validate: function(model,value) {
			var normalized;
			normalized = FormRenderer.normalizeNumber(value+"", model.get(FormOptions.t.mappings.UNITS));
			if (!normalized.match(/^-?\d*(\.\d+)?$/)) {
			  return 'number';
			}
		}
	};
}).call(this);

// 小数验证
(function() {
	FormRenderer.Validators.DecimalValidator = {
		validate: function(model,value) {
			var normalized,decimalLen ;
			if (!(decimalLen =model.get(FormOptions.t.mappings.DECIMAL))) {
				return;
			}
			normalized = FormRenderer.normalizeNumber(value+"", model.get(FormOptions.t.mappings.UNITS));
			var	len = (normalized + '').replace(/^[^.]*[.]*/, '').length;
			if(len>decimalLen){
				return {
					 key: 'max_decimal_len',
					 args:decimalLen
				  };
			}
		}
	};
}).call(this);
// 日期验证
(function() {
	FormRenderer.Validators.DateValidator = {
			validate: function(model,value) {
				// 判断是否是有效日期
				  return;
			}
	}
}).call(this);



// 日期验证范围验证-开始、结束时间
(function() {
	// 设置时间差
	function setDataInterval(curDate,d,interval,type){
		d = (type == 'before'?-d:d);
		if(interval == 'y'){// 年
			curDate.setFullYear(curDate.getFullYear()+d);
		} else if(interval == 'm'){// 月
			curDate.setMonth(curDate.getMonth()+d);
		} else if(interval == 'd'){// 日
			curDate.setDate(curDate.getDate()+d);
		}else if(interval == 'h'){// 时
			curDate.setHours(curDate.getHours()+d);
		}else if(interval == 'mi'){// 分
			curDate.setMinutes(curDate.getMinutes()+d);
		}else if(interval == 's'){// 秒
			curDate.setSeconds(curDate.getSeconds()+d);
		}
		return curDate;
	}
	
	function getDateTime(value,format){
		format = format?format:'yyyy-MM-dd hh:mm:ss';
		return DateDealFmt.dealFmt(value,format).getTime();
	}
	
	FormRenderer.Validators.StartEndDateValidator = {
			validate: function(model,value) {
				if (!(model.get(FormOptions.t.mappings.START_DATE_TYPE) || model.get(FormOptions.t.mappings.END_DATE_TYPE)))
					  return;
				if($.isEmpty(value))
					return;
			var	startType = model.get(FormOptions.t.mappings.START_DATE_TYPE),
					endType = model.get(FormOptions.t.mappings.END_DATE_TYPE),
					curValTime = getDateTime(value,model.get(FormOptions.t.mappings.DATEFMT)), 
					startDate,// 开始时间
					startTime,// 开始时间时间戳
					endDate,// 结束时间
					endTime;// /结束时间时间戳
	
				if(startType == 'specific'){// 特定时间
					startDate =model.get(FormOptions.t.mappings.START_DATE);
				}else if(startType == 'today'){
					var curDate = new Date();// 获取当前时间
					startDate = $.format(curDate,model.get(FormOptions.t.mappings.DATEFMT));
				}else if(startType == 'before'){
					var curDate = new Date();// 获取当前时间
					curDate = setDataInterval(curDate,parseInt(model.get(FormOptions.t.mappings.START_DATE),10),model.get(FormOptions.t.mappings.START_DATE_INTERVAL),startType);
					startDate = $.format(curDate,model.get(FormOptions.t.mappings.DATEFMT));
				}else if(startType == 'after'){
					var curDate = new Date();// 获取当前时间
					curDate = setDataInterval(curDate,parseInt(model.get(FormOptions.t.mappings.START_DATE),10),model.get(FormOptions.t.mappings.START_DATE_INTERVAL),startType);
					startDate = $.format(curDate,model.get(FormOptions.t.mappings.DATEFMT));
				}
				
				if(endType == 'specific'){
					endDate = model.get(FormOptions.t.mappings.END_DATE);
				}	if(endType == 'today'){
					var curDate = new Date();// 获取当前时间
					endDate = $.format(curDate,model.get(FormOptions.t.mappings.DATEFMT));
				}else if(endType == 'before'){
					var curDate = new Date();// 获取当前时间
					curDate = setDataInterval(curDate,parseInt(model.get(FormOptions.t.mappings.END_DATE),10),model.get(FormOptions.t.mappings.END_DATE_INTERVAL),endType);
					endDate = $.format(curDate,model.get(FormOptions.t.mappings.DATEFMT));
				}else if(endType == 'after'){
					var curDate = new Date();// 获取当前时间
					curDate = setDataInterval(curDate,parseInt(model.get(FormOptions.t.mappings.END_DATE),10),model.get(FormOptions.t.mappings.END_DATE_INTERVAL),endType);
					endDate = $.format(curDate,model.get(FormOptions.t.mappings.DATEFMT));
				}
				
				if($.isNotEmpty(startDate)){
					try{
						startTime =getDateTime(startDate,model.get(FormOptions.t.mappings.DATEFMT));
					} catch (e) {}
				}
			
				if($.isNotEmpty(endDate)){
					try{
						endTime = getDateTime(endDate,model.get(FormOptions.t.mappings.DATEFMT));
					} catch (e) {}
				}
				
				// 时间范围
				if( $.isNotEmpty(startTime)  && $.isNotEmpty(startDate) && $.isEmpty(endTime) && $.isNotEmpty(endDate) && (curValTime < startTime || curValTime > endTime) ){
					return {
						 key: 'startEndDate',
						 args:[startDate,endDate]
					  };
				}
			
				// 开始时间
				if($.isNotEmpty(startTime) && $.isNotEmpty(startDate) && curValTime < startTime){
					return {
						 key: 'startDate',
						 args:startDate
					  };
				}
				// 结束时间
				else if($.isNotEmpty(endTime) && $.isNotEmpty(endDate) && curValTime > endTime){
					return {
						 key: 'endDate',
						 args:endDate
					  };
				}
				
				 return;
			}
	}
}).call(this);


// 多少项验证 （主要是多选用）
(function() {
	FormRenderer.Validators.MinMaxNumValidator = {
			validate: function(model,value) {
				var max, min,item =0,arrayValue=[];
				if (!(model.get(FormOptions.t.mappings.MINMUM) || model.get(FormOptions.t.mappings.MAXMUM))) {
				  return;
				}
				min = model.get(FormOptions.t.mappings.MINMUM) && parseFloat(model.get(FormOptions.t.mappings.MINMUM));
				max = model.get(FormOptions.t.mappings.MAXMUM) && parseFloat(model.get(FormOptions.t.mappings.MAXMUM));
			
				if($.isNotEmpty(value)){
					if($.isPlainObject(value)){
						arrayValue = model.getObjectValue(value);
					}else	if($.isArray(value)){
						arrayValue = model.getArrayValue(value);
					}else{
						arrayValue = value.split(",");
					}
					item = arrayValue.length;
				}
				if (min && item < min) {
				  return {
						 key: 'smallmum',
						 args:min
					  };
				} else if (max && item > max) {
				  return {
						 key: 'largemum',
						 args:max
					  };
				}
		}
	};
}).call(this);

// 地址验证
(function() {
	FormRenderer.Validators.AddressValidator = {
		validate: function(model,value) {
			if($.isEmpty(value))
				return "required";
			var v = model.toJSONValue(value);
			if($.isEmpty(v.country) && $.isEmpty(v.province) && $.isEmpty(v.city )&& $.isEmpty(v.district ) )
				return  'address';
			return ;
		}
	};
}).call(this);

// 正则表达式验证( 身份证、电话号码等)
(function() {
	FormRenderer.Validators.RegularValidator = {
		validate: function(model,value) {
			var dataFormat;
			if (!(model.get(FormOptions.t.mappings.DATA_FORMAT))){
			  return;
			}
			dataFormat = model.get(FormOptions.t.mappings.DATA_FORMAT) ;
			if (FormOptions.t.DATA_FORMAT[dataFormat]){
				if(!FormOptions.t.DATA_FORMAT[dataFormat].test(value))
					  return dataFormat;
			} else {
				// 自定义格式
				var	dataFormatValue  = model.get(FormOptions.t.mappings.DATA_FORMAT_VALUE) ;
				if($.isEmpty(dataFormatValue))
					return;
				try {
					var	dataFormatMsg = model.get(FormOptions.t.mappings.DATA_FORMAT_MSG) ;
					if(!eval(dataFormatValue).test(value))
						  return {
							 key: 'custom',
							 args: $.isEmpty(dataFormatMsg)?"格式":dataFormatMsg// 这个替换成提示字符
						};
				} catch (e) {
					return;
				}
			}
		}
	};
}).call(this);

// =================表单规则条件====================
(function() {
	  var presenceMethods,
	  	_METHOD,
	    __indexOf = [].indexOf || function(item) { 
		  	for (var i = 0, l = this.length; i < l; i++) { 
		  		if (i in this && this[i] === item) return i; 
			 } return -1;
		};

	 // 默认的方法
	  presenceMethods = ['present', 'blank','is_blank'];
	  
	 _METHOD ="operator";

	  FormRenderer.ConditionChecker = (function() {
	    function ConditionChecker(form_renderer, condition) {
	      this.form_renderer = form_renderer;
	      this.condition = condition;
	      this.responseField =  this.responseField();
	      this.field_type =  this.getFieldType();
	      this.conditionValue = this.getConditionValue();
	      this.value = this.getValue();
	    }
	    ConditionChecker.prototype.getFieldType =function(){
	    	return  this.responseField.get(FormOptions.t.mappings.FIELD_TYPE);
	    }
	    
	    // 获取条件的值
	    ConditionChecker.prototype.getValue =  function() {
	    	var _ref = this.responseField;
	       if( _ref == null)
	    	   return "";
	       if(this.field_type == "radio" || 
	    		   this.field_type == "checkbox" ||
	    		   this.field_type == "editor" )
	    	   return _ref.getValueText() || "";
	       else if(this.field_type == "selector" ){
	    	   return _ref.getIds() || "" ;  
	       }else if(this.field_type == "dictionary"){// 数据字典
	    	   var val = _ref.getValue();
	    	   if(this.conditionValue != val){
			    	var dic = FormRenderer.DICTIONARY_CACHE[this.responseField.attributes.field_options.dictionary];
	   				var nodes = JSON.getPnodeBySub(dic,val,true);
	   				if(nodes.length>0){
		   				var idx = 0;
		   				var cond = this.condition;
		   				$.each(nodes,function(d, e) {
		   					var node = nodes[d].key;
		   					if(cond.value.key==node){
				   				val = nodes[d].key;
		   					}
		   				});
	   				}
	    	   }
   				return val || "" ;
	       }
	       else{
	    	   return _ref.getValue() || "" ;  
	       }
	    };
	    // 获取条件值
	    ConditionChecker.prototype.getConditionValue = function() {
	    	if(!this.condition)
	    		return '';
	    	if(this.field_type== "checkbox")// 多选
	    		return _.isArray(this.condition.value)?this.condition.value.join(","):this.condition.value;
		    if(this.field_type == "selector")// 选择器
		    	return  _.compact(_.pluck(this.condition.value, 'id')).join(',');
		    if(this.field_type == "dictionary")// 数据字典
		    	return this.condition.value?(this.condition.value.key||""):"";
	    	// 需要设置当前人 或者当前时间 如果是选择器还特别处理
	    	if(this.condition.value == "{curTime}"){
	    		return $.format(new Date(),this.responseField.get(FormOptions.t.mappings.DATEFMT));
	    	}
	    	if(this.condition.value == "{curUserName}"){
	    		return __currentFullname;
	    	}
	    	if(this.condition.value == "{curUserId}"){
	    		return __currentUserId;
	    	}
	    	if(this.condition.value == "{curAccount}"){
	    		return __currentAccount;
	    	}
	    	
	    	return this.condition.value||'';
	    };
	    
	    // 等于
	    ConditionChecker.prototype.method_eq = function() {
	  	    return  this.value.toLowerCase() === this.conditionValue.toLowerCase();
	    };

	    // 包含
	    ConditionChecker.prototype.method_contains = function() {
	      return this.value.toLowerCase().indexOf(this.conditionValue.toLowerCase()) > -1;
	    };

	    // 不等于
	    ConditionChecker.prototype.method_not = function() {
	      return !this.method_eq();
	    };
	    // 不包含
	    ConditionChecker.prototype.method_not_contains = function() {
	      return !this.method_contains();
	    };

	    // 大于
	    ConditionChecker.prototype.method_gt = function() {
	    	if(this.condition.type == 'date'){// 日期格式
	    		var curTime = FormulaUtil.DATE(this.value).getTime(),
	    				time = FormulaUtil.DATE(this.conditionValue).getTime();
    			return curTime >=time;
	    	}else{
	    		return parseFloat(this.value) >= parseFloat(this.conditionValue);
	    	}
	    };
	    // 小于
	    ConditionChecker.prototype.method_lt = function() {
	    	if(this.condition.type == 'date'){// 日期格式
	    		var curTime = FormulaUtil.DATE(this.value).getTime(),
    					time = FormulaUtil.DATE(this.conditionValue).getTime();
	    		return curTime <=time;
	    	}else{
	    	    return parseFloat(this.value) <= parseFloat(this.conditionValue);
	    	}
	    };
	    // 不超过..字符
	    ConditionChecker.prototype.method_shorter = function() {
	      return this.length() < parseInt(this.conditionValue, 10);
	    };
	    // 不少于..字符
	    ConditionChecker.prototype.method_longer = function() {
	      return this.length() > parseInt(this.conditionValue, 10);
	    };
	    
	    // 在..之间
	    ConditionChecker.prototype.method_between = function() {
	    	var val = this.conditionValue,start= val[0],end =val[1];
	    	if(this.condition.type == 'date'){
	    		var curTime = FormulaUtil.DATE(this.value).getTime(),
	    			startTime = FormulaUtil.DATE(start).getTime(),
	    			endTime= FormulaUtil.DATE(end).getTime();
	    		if(($.isEmpty(start) && curTime <=endTime) ||(curTime >=startTime && $.isEmpty(end))||
	    				(curTime >=startTime  && curTime <=endTime))
	    			return true;
	    	}else {
	    	    return parseFloat(this.value) >=  parseFloat(start) &&  parseFloat(this.value) <=  parseFloat(end);
	    	}
	    	return false;
	    };

	    // 不在..之间
	    ConditionChecker.prototype.method_not_between = function() {
		      return !this.method_between();
	    };
		    
	    // 包含所有
	    ConditionChecker.prototype.method_present = function() {
	    	if(_.isString(this.value))
	    		return !!this.value.match(/\S/);
	    	else
	    		return true;
	    };
	    // 为空
	    ConditionChecker.prototype.method_blank = function() {
	      return !this.method_present();
	    };
	    // 是否空白
	    ConditionChecker.prototype.method_is_blank = function() {
		      return $.isEmpty(this.value)
		};
	    
	    // 长度
	    ConditionChecker.prototype.length = function() {
	      return FormRenderer.getLength(this.responseField.getLengthValidationUnits(), this.value);
	    };

	    // 判断是否有效
	    ConditionChecker.prototype.isValid = function() {
	      var _ref;
	      return this.responseField &&_.all(['id', _METHOD], ((function(_this) {
	        return function(x) {
	          return _this.condition[x];
	        };
	      })(this)))&&((_ref = this.condition[_METHOD], _.indexOf(presenceMethods, _ref) >= 0) || this.condition['value']);
	    };
	    
	    
	    // 是否通过
	    ConditionChecker.prototype.isPass = function() {
	      var _ref;
	      if (!this.isValid()) {
	        return true;
	      }
	      if (_ref = this.condition[_METHOD],_.indexOf( presenceMethods, _ref) >= 0) {
	        return this["method_" + this.condition[_METHOD]]();
	      } else {
	        return this.method_present() && this["method_" + this.condition[_METHOD]]();
	      }
	    };

	    ConditionChecker.prototype.responseField = function() {
	      return this.form_renderer.response_fields.findWhere({"name":this.condition.id});
	    };

	    return ConditionChecker;

	  })();

}).call(this);

// ===========分页 TODO===================
(function() {
	  FormRenderer.Views.Pagination = Backbone.View.extend({
		className:'fr-pagination',
	    events: {
	      'click [data-activate-page]': function(e) {
	        e.preventDefault();
	        return this.form_renderer.activatePage($(e.currentTarget).data('activate-page'));
	      }
	    },
	    initialize: function(options) {
	      this.form_renderer = options.form_renderer;
	      this.$el.addClass("page-"+FormRenderer.variables.page_style );
	      this.listenTo(this.form_renderer.state, 'change:activePage', this.render);
	      return this.listenTo(this.form_renderer, 'afterValidate', this.render);
	    },
	    render: function() {
	      this.$el.html(JST['partials/pagination'](this));
	      this.form_renderer.trigger('viewRendered', this);
	      return this;
	    }
	  });

	}).call(this);


// ===========标签 TODO===================
(function() {
  FormRenderer.Views.TabsContainer = Backbone.View.extend({
	className: 'fr-nav-tabs tabs-container',
    events: {
      'click [data-activate-tab]': function(e) {
        e.preventDefault();
        return this.page_renderer.activateTab($(e.currentTarget).data('activate-tab'));
      }
    },
    initialize: function(options) {
      this.form_renderer = options.form_renderer;
      this.page_renderer = options.page_renderer;
      this.listenTo(this.page_renderer.state, 'change:activeTab', this.render);
      return this.listenTo(this.form_renderer, 'afterValidate', this.render);
    },
    render: function() {
      this.$el.html(JST['partials/tabsContainer'](this));
      this.form_renderer.trigger('viewRendered', this);
      FormRendererUtil.qtip(this.$el);
      return this;
    }
  });

}).call(this);

// ===========表单字段===================
(function() {
  var i, _i, _len, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  
  // =========== 表单渲染model ===================
  FormRenderer.Models.ResponseField = Backbone.DeepModel.extend({
    input_field: true,
    formula_field:true,
    field_type: void 0,
    validators: [],
    sync: function() {},
    initialize: function(_attrs, options) {
      if (options == null) {
        options = {};
      }
      this.form_renderer = options.form_renderer;
      // 错误
      this.errors = [];
      // 是否可见
      this.isVisible = true;
      // 是否只读
      this.isReadOnly = false;
      // 是否能编辑
      this.isCanEdit = false;
     // 是否必填
      this.isRequired = this.get(FormOptions.t.mappings.REQUIRED);
      // 是否置空
      this.isBlank = false;
      // 是否级联
      this.isCascade = false;
      
      this.isSub = _attrs[	FormOptions.t.mappings.IS_SUB]?true:false;
      
      
      this.calculateRules();
      if (this.hasLengthValidations()) {
        return this.listenTo(this, 'change:value', this.calculateLength);
      }
    },
    //初始化预设参数
    initPresetParams:function(){
     	this.set(FormOptions.t.mappings.CODE,this.form_renderer.code);
        
      	this.set(FormOptions.t.mappings.IS_DEFAULT,true);
    },
    isDefault:function(){
    	return this.get(FormOptions.t.mappings.IS_DEFAULT);
    },
    getCode:function(){
      	return this.get(FormOptions.t.mappings.CODE);
    },
 	isReadOriginal:function(){
       	return FormRenderer.variables.read_style == 'original';
    },
    // 是否是子表
    isSubTable:function(){
    	return this.get(FormOptions.t.mappings.FIELD_TYPE) == 'table';
    },
    validate: function(opts) {
      var errorIs, errorKey, errorWas, validator, _i, _len, _ref;
      if (opts == null) {
        opts = {};
      }
      errorWas = this.get('error');
      this.errors = [];
      // 隐藏、只读权限不验证
      if(!this.isVisible || this.field_type == 'hidden'  || 
    	  this.getPermission() == FormOptions.t.PERMISSIONS.READ || 
		  this.getPermission() == FormOptions.t.PERMISSIONS.READ_POST || 
		  this.getPermission() == FormOptions.t.PERMISSIONS.HIDE){
          return;
      }      
      if (!this.hasValue()) {
        if (this.canRequired()) {
          this.errors.push(FormRenderer.t.errors.required);
        }
      } else {
        _ref = this.validators;
        if(_ref.length >0){
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          validator = _ref[_i];
	          if(validator){
		          errorKey = validator.validate(this,this.getValidateValue());
		          if (errorKey) {
		        	  this.errors.push(this.formatError(errorKey));
		          }
	          }
	        }
        }
      }
      errorIs = this.getError();

	  if(errorIs){
	        this.set('error', errorIs);
	        if(this.getEl())
	        	this.getEl().qtipError(this.getError());	
	  }else{
	        this.set('error', null);
	        if(this.getEl())
	        	this.getEl().qtipSuccess();	
	  }
      return this.form_renderer.trigger('afterValidate afterValidate:one', this);
    },
    /**
	 * 格式化错误消息
	 */
    formatError:function(errorKey){
    	if($.isEmpty(errorKey))
    		return null;
		if ($.type(errorKey)  === "string") 
			return  FormRenderer.t.errors[errorKey];
		if ($.isPlainObject(errorKey)) {// 如果是对象
		 var msg = FormRenderer.t.errors[errorKey.key],
		 	 args = errorKey.args;
			if (!$.isArray(args)) // 不是数组类型的
				args = [args]
			$.each(args,function(d, e) {
				msg = msg.replace(RegExp("\\{" + d + "\\}", "g"), e);
			});
			return msg;
    	}
    },
    getEl:function(){
    	return this.get("$el");
    },
    getPlaceholder:function(){
    	return this.get(FormOptions.t.mappings.PLACEHOLDER)||"";
    },
    getDomId: function() {
	      return this.cid;
    },
    canRequired: function() {
      return this.get(FormOptions.t.mappings.REQUIRED);
    },
    getError: function() {
      if (this.errors.length > 0) {
        return this.errors.join(' ');
      }
    },
    hasLengthValidations: function() {
      var _ref;
      return (_ref = FormRenderer.Validators.MinMaxLengthValidator, __indexOf.call(this.validators, _ref) >= 0) && (this.get(FormOptions.t.mappings.MINLENGTH) || this.get(FormOptions.t.mappings.MAXLENGTH));
    },
    calculateLength: function() {
      return this.set('currentLength', FormRenderer.getLength(this.getLengthValidationUnits(), this.get('value')));
    },
    hasMinMaxValidations: function() {
      var _ref;
      return (_ref = FormRenderer.Validators.MinMaxValidator, __indexOf.call(this.validators, _ref) >= 0) && (this.get(FormOptions.t.mappings.MIN) || this.get(FormOptions.t.mappings.MAX));
    },
    getLengthValidationUnits: function() {
      return this.get( FormOptions.t.mappings.MIN_MAX_LENGTH_UNITS) || 'characters';
    },
    getDefaultValueType: function() {
    	return this.get( FormOptions.t.mappings.DEFAULT_VALUE_TYPE)|| FormOptions.t.DEFAULT_VALUE_TYPE[0];
    },
    setExistingValue: function(x) {
      if ($.isNotEmpty(x,true)){        // 默认值
    	  this.set('value', x);
      }
      this.setDefaultValue();
    },
    getDynamicValue:function(value){
    	var _this = this,rtn;
    	$.ajax({
            url: __ctx+"/platform/form/formDef/getScriptValue.htm",
            type: "post",
            async: false,
            data: {
            	script:value
            },
            success: function(data) {
            	var result= JSON.parse(data);
            	if(result.result == 1){
            		rtn =  result.message;
            	}else{
            		// 脚本允许异常
            	}
            }
          });
        return rtn;  
    },
    setDefaultValue:function(){
        if(this.isDefault()) {
      	  var val = this.getDefaultValue();
      	  this.set(FormOptions.t.mappings.IS_DEFAULT,false);
    	  this.setExistingValue(val);
        }
    },
    getDefaultValue:function(){
    	if($.isEmpty(this.get( FormOptions.t.mappings.DEFAULT_VALUE)) )
    		return null;
    	var val = this.get( FormOptions.t.mappings.DEFAULT_VALUE);
        if(  this.getDefaultValueType()== 'fixed'  ){// 默认值固定值
        	return  val;
        }else  if( this.getDefaultValueType() == 'dynamic'  ){// 动态值
        	return this.getDynamicValue(val);
        }
        return null;  
    },   
    setConditionsValue:function(x){
    	return this.setExistingValue(x);
    },
    getValidateValue:function(){
    	return this.getValue();
    },
    getValue: function() {
      return this.get('value');
    },
    toText: function(val) {
    	if(val) return val;
    	return this.getValue()||"";
    },
    hasValue: function() {
      return $.isNotEmpty(this.get('value'));
    },
    hasAnyValueInHash: function() {
      return _.some(this.get('value'), function(v, k) {
        return !!v;
      });
    },
    hasValueHashKey: function(keys) {
      return _.some(keys, (function(_this) {
        return function(key) {
          return !!_this.get("value." + key);
        };
      })(this));
    },
    getPermission:function(){
    	return  this.get(FormOptions.t.mappings.PERMISSION);
    },
    /**
     * 默认权限
     */
    getDefaultRigths : function(){
    	var hideRights = this.get(FormOptions.t.mappings.HIDE_RIGHTS);
    	if($.isNotEmpty(hideRights) && hideRights ){
    		return  FormOptions.t.PERMISSIONS.HIDE;
    	}
    	var readRights = this.get(FormOptions.t.mappings.READ_RIGHTS);
    	if($.isNotEmpty(readRights) && readRights ){
    		return  FormOptions.t.PERMISSIONS.READ;
    	}
    	return  FormOptions.t.PERMISSIONS.EDIT;
    },
    /**
	 * 设置权限
	 */
    setExistingPermission:function(x){
    	if(!x)
    		 x = this.getDefaultRigths();
    	if(x == FormOptions.t.PERMISSIONS.REQUIRED){// 必填时候设置
            this.set(FormOptions.t.mappings.REQUIRED, true);
            this.isRequired = true;
    	}
        this.set(FormOptions.t.mappings.PERMISSION, x);
    },
    getAttr: function(key) {
        return this.get(key);
    },
    getOptions: function() {
      return this.get( FormOptions.t.mappings.OPTIONS) || [];
    },
    getColumns: function() {
      return this.get(FormOptions.t.mappings.COLUMNS) || [];
    },
    getRules: function() {
      return this.get(FormOptions.t.mappings.RULES) || [];
    },
    isRules: function() {
      return this.getRules().length > 0;
    },
    // 计算规则
    calculateRules:function(){
    	// 前一个值
    	var prevValue = false;
    	if(!this.form_renderer)
    		return prevValue;
    	  if( !this.isRules())
    		return  prevValue;
    	  var _this = this;
	   	 _.each( this.getRules(),function(rule){
	   		 var type = rule.type, 	// 类型
		   		 condition = rule.conditions; // 条件
	   		 
	   		var isPass = _[condition.condition](condition.rules, (function() {
		   	      return function(c) {
		          	if(_this.form_renderer.isConditionalAction)// 修复子表
		          		return _this.form_renderer.isConditionalAction(c);
		          	else
		          		return _this.form_renderer.form_renderer.isConditionalAction(c);
		          };
	   		 	})());
	   		
	   		if(isPass){
	   			// 处理动作
	   			switch (type) {
	   				case 'show':// 是否可见
	   					_this.isVisible = true;
						break;
	   				case 'hide':// 是否可见
						_this.isVisible = false;
						break;
	   				case 'required':// 必填
	   					_this.isRequired = true;
						break;
	   				case 'notrequired':// 非必填
						_this.isRequired = false;
						break;
	   				case 'blank':// 置空
	   					_this.isBlank = true;
						break;
	 				case 'read':// 只读
	 						_this.isConditional =true
	 						_this.isReadOnly = true;
						break;
	   				case 'edit':// 编辑
	   					_this.isConditional =true
 						_this.isReadOnly = false;
						break;
				default:
					break;
				}
	   		}else{
	   			switch (type) {
   				case 'show':
   					_this.isVisible = false;// 是否可见
					break;
   				case 'hide':
					_this.isVisible = true;// 是否可见
					break;
   				case 'required':// 必填
   					_this.isRequired = false;
					break;
   				case 'notrequired':// 非必填
					_this.isRequired = true;
					break;
   				case 'blank':// 置空
   					_this.isBlank = false;
					break;
   				case 'read':// 只读
   					_this.isReadOnly = false;
   					_this.isConditional =true
					break;
   				case 'edit':// 编辑
   					_this.isReadOnly = true;
   					_this.isConditional =true
					break;
				default:
					break;
				}
	   		}
	   		
	   		prevValue =true;
		 });
    	
	   	 return prevValue;
    },
    getSize: function() {
      return this.get( FormOptions.t.mappings.SIZE) || 'small';
    },
    getWidth:function(){
    	return (this.get(FormOptions.t.mappings.WIDTH)?this.get(FormOptions.t.mappings.WIDTH):'150')+ 'px' ;
    },
    sizeToHeaderTag: function() {
      return {
        large: 'h2',
        medium: 'h3',
        small: 'h4'
      }[this.getSize()];
    },
    /**
	 * 子表字段所在行
	 */
    getColumn:function(){
    	return this.get("column");
    },
    /**
	 * 子表字段所在列
	 */
    getRow:function(){
    	return this.get("row");
   }
  });
  
  // =========== 表单渲染View ===================
  FormRenderer.Views.ResponseField = Backbone.View.extend({
	    wrapper: 'label',
	    field_type: void 0,
	    className: 'fr_response_field',
	    events: {
	      'blur input, textarea, select': '_onBlur'
	    },
	    initialize: function(options) {
	      this.form_renderer = options.form_renderer;
	      if (this.form_renderer && this.form_renderer.options) {
	        this.showLabels = this.form_renderer.options.showLabels;
	      } else {
	        this.showLabels = options.showLabels;
	      }
	      this.model = options.model;
	      
	      this.isSub = options.isSub?options.isSub:false;
	      if( this.isSub)
	    	  this.subMode = options.subMode
	      
	      this.listenTo(this.model, 'afterValidate', this.render);
	      // 验证
	      this.listenTo(this.model, 'change:value change:value.*', this._onInput);
	      this.listenTo(this.model, 'change:currentLength', this.auditLength);
	      // 重新渲染视图
	      this.listenTo(this.model, 'change:$redoView', this._reRender);
	      this.$el.addClass("fr_response_field_" + this.field_type)
	      		// 占比
	      		.addClass( this.gridsToOccupy());

	      if (this.model.id) {
	        return this.$el.attr('id', "fr_response_field_" + this.model.id);
	      }
	    },
	    _reRender:function(){
			return this.render();
	    },
	    /**
		 * 宽度占比
		 */
	    gridsToOccupy:function(){
	    	var gridsToOccupy = this.model.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY);
	    	if(!gridsToOccupy)
	    		return 'col-sm-12';
	    	var v =  parseInt(gridsToOccupy);
	     	if(v == 1){
	     		return 'col-sm-3';
	     	}else if(v == 2){
	     		return 'col-sm-6';
	     	}else if(v == 3){
	     		return 'col-sm-9';
	     	}else{
	     		return 'col-sm-12';
	     	}
	    },
	    getDomId: function() {
	      return this.model.getDomId();
	    },
	    // 编辑权限 、只读原型
	    canInput:function(){
	    	return this.isEdit()  ||  this.model.isReadOriginal();
	    },
	    // 是否隐藏
	    isHide:function(){
	    	return  this.getPermission() == FormOptions.t.PERMISSIONS.HIDE;
	    },
	    // 是否编辑权限
	    isEdit:function(){
	    	return this.getPermission() == FormOptions.t.PERMISSIONS.EDIT || this.getPermission() == FormOptions.t.PERMISSIONS.REQUIRED;
	    },
	    // 是否只读
	    isRead:function(){
	    	return this.getPermission() == FormOptions.t.PERMISSIONS.READ;
	    },
	   getPermission: function() {
	      	if(this.model.isSubTable()){
	      		var permission =  this.model.get(FormOptions.t.mappings.SUB_PERMISSION);
	      		if($.isNotEmpty(permission) && FormOptions.t.PERMISSIONS.HIDE == permission ){
	      			return FormOptions.t.PERMISSIONS.HIDE;
	      		}
		        if (this.form_renderer.options.isRead) // 如果只读
		        	return FormOptions.t.PERMISSIONS.READ;
		        return permission || this.model.getDefaultRigths();
		   }else{
			    return this.model.get(FormOptions.t.mappings.PERMISSION)||this.model.getDefaultRigths();
		   }
	    },
	    getAttr: function(attr) {
	    	return  this.model.get(attr);
		},
	    reflectConditions: function() {
	    	if(!this.model.isRules())
	    		return;
	      if (this.model.isVisible) {
	         this.setShow();
	      } else {
	    	  this.setHide();
	      }
	     
	      // 必填
	      if (this.model.isRequired) {
	    	  this.model.set(FormOptions.t.mappings.REQUIRED,true);
	    	  this.$el.find(".fr-required").removeClass("hidden");
	      } else {
	     	  this.model.set(FormOptions.t.mappings.REQUIRED,false);
	     	 this.$el.find(".fr-required").addClass("hidden");
	      }
	  	  this.model.validate({
	          clearOnly: true
	        });
	      
	      // 置空 （满足置空条件，又置空）
	  	  if (this.model.isBlank) { 
	  		  this.model.set(FormOptions.t.mappings.IS_DEFAULT,false);
	  		  this.model.setConditionsValue(null);
	  	  }
	      
	    },
	    _onBlur: function(e) {
	      if (this.model.hasValue()) {
	    	  setTimeout((function(_this) {
		          return function() {
		            var newActive;
		            newActive = document.activeElement;
		            if (!$.contains(_this.el, newActive)) {
		              if (_this._isPageButton(newActive)) {
		                return $(document).one('mouseup', function() {
		                  return _this.model.validate();
		                });
		              } else {
		                return _this.model.validate();
		              }
		            }
		          };
		        })(this), 1);
	        return  this;
	      }
	    },
	    hasLabel:function(){
	    	return (this.isSub && this.subMode != 'block' ) ||  this.field_type == 'hidden';
	    },
	    _isPageButton: function(el) {
	      return el && (el.hasAttribute('data-fr-next-page') || el.hasAttribute('data-fr-previous-page'));
	    },
	    _onInput: function() {
	        return this.model.validate({
	          clearOnly: true
	        });
	    },
	    focus: function() {
	      return this.$el.find(':input:eq(0)').focus();
	    },
	    auditLength: function() {
	      var $lc, validation;
	      if (!this.model.hasLengthValidations()) {
	        return;
	      }
	      if (!($lc = this.$el.find('.fr_length_counter'))[0]) {
	        return;
	      }
	      validation = FormRenderer.Validators.MinMaxLengthValidator.validate(this.model);
	      if (validation === 'short') {
	        return $lc.addClass('is_short').removeClass('is_long');
	      } else if (validation === 'long') {
	        return $lc.addClass('is_long').removeClass('is_short');
	      } else {
	        return $lc.removeClass('is_short is_long');
	      }
	    },
	    render: function() {
	      var _ref;
	      this.$el[this.model.getError() ? 'addClass' : 'removeClass']('error');
	      this.$el.html(JST['partials/response_field'](this));
	      rivets.bind(this.$el, {
	        model: this.model
	      });
	      this.model.set("$el",  this.$el);
	      this.auditLength();
	      if ((_ref = this.form_renderer) != null) {
	        _ref.trigger('viewRendered', this);
	      }
	      
	      return this;
	    },
	    // 设置隐藏
	    setHide : function(){
	    	this.model.isVisible = false;
	    	this.$el.hide();
	    },
	    // 设置显示
	    setShow : function(){
	    	this.model.isVisible = true;
	    	this.$el.show();
	    	this.trigger('shown');
	    },
	    getModel:function(self,options){
	    	if(self.model.isSubTable()){// 子表
				return  self.model.subModels[options[FormOptions.t.table.ROW]][options[FormOptions.t.table.COLUMN]];
			}else{
				return self.model;
			}
	    }
	  });
}).call(this); 


// =========== 表头字段 ===================
(function() {  
	FormRenderer.Views.FormHeader =  Backbone.View.extend({
		    className: 'fr-form-header',
		  	initialize: function(options) {
		      this.model = options.model;
		    },
		    render: function() {
		      this.$el.html(JST['partials/form_header'](this));
		      return this;
		    }
	});
}).call(this);  	 

  // =========== 未输入字段 ===================
(function() {  
  FormRenderer.Models.NonInputResponseField = FormRenderer.Models.ResponseField.extend({
    input_field: false,
    field_type: void 0,
    validate: function() {},
    sync: function() {},
    // 设置权限
    setExistingPermission:function(x){
    	if(!x) x = FormOptions.t.PERMISSIONS.SHOW;
        this.set(FormOptions.t.mappings.PERMISSION, x);
    }
  });
  
  FormRenderer.Views.NonInputResponseField = FormRenderer.Views.ResponseField.extend({
    render: function() {
      var _ref;
      this.$el.html(JST['partials/non_input_response_field'](this));
      if ((_ref = this.form_renderer) != null) {
        _ref.trigger('viewRendered', this);
      }
      return this;
    }
  });

}).call(this);
  
// =========== 隐藏域字段 ===================
(function() { 
  FormRenderer.Models.ResponseFieldHidden = FormRenderer.Models.ResponseField.extend({
	    field_type:  'hidden'
  });
  
  FormRenderer.Views.ResponseFieldHidden = FormRenderer.Views.ResponseField.extend({
	    field_type:  'hidden',
	    render: function() {
		      FormRenderer.Views.ResponseField.prototype.render.apply(this, arguments);
		      this.setHide();
		      return this;
		  }
  });
	
}).call(this);
  
// =========== 文本框字段 ===================
(function() { 
	  FormRenderer.Models.ResponseFieldText = FormRenderer.Models.ResponseField.extend({
	    field_type: 'text',
	    validators: [FormRenderer.Validators.MinMaxLengthValidator,FormRenderer.Validators.RegularValidator]
	  });
	  
	  FormRenderer.Views.ResponseFieldText = FormRenderer.Views.ResponseField.extend({
		  field_type: 'text'
	  });
	
}).call(this);
  
// =========== 多行文本框字段 ===================
(function() { 
  FormRenderer.Models.ResponseFieldTextarea = FormRenderer.Models.ResponseField.extend({
    field_type: 'textarea',
    validators: [FormRenderer.Validators.MinMaxLengthValidator],
    getHeight:function(){
    	return this.get(FormOptions.t.mappings.HEIGHT) ||50;
    }
  });
  
  FormRenderer.Views.ResponseFieldTextarea = FormRenderer.Views.ResponseField.extend({
	  field_type: 'textarea'
  });
  
}).call(this);  

// =========== 数字字段 ===================
(function() { 
	 FormRenderer.Models.ResponseFieldNumber = FormRenderer.Models.ResponseField.extend({
		    field_type: 'number',
		    validators: [FormRenderer.Validators.NumberValidator, FormRenderer.Validators.MinMaxValidator, FormRenderer.Validators.IntegerValidator, FormRenderer.Validators.DecimalValidator],
		    calculateSize: function() {
		      var digits, digitsInt;
		      if ((digitsInt = parseInt(this.get(FormOptions.t.mappings.MAX), 10))) {
		        digits = ("" + digitsInt).length;
		      } else {
		        digits = 6;
		      }
		      if (!this.get(FormOptions.t.mappings.INTEGER_ONLY)) {
		        digits += 2;
		      }
		      if (digits > 6) {
		        return 'seven_plus';
		      } else if (digits > 3) {
		        return 'four_six';
		      } else {
		        return 'one_three';
		      }
		    }
		  });
	 
	  FormRenderer.Views.ResponseFieldNumber = FormRenderer.Views.ResponseField.extend({
		    field_type: 'number'
	  });
	 
}).call(this);  	
  


// =========== 单项选择字段 ===================
(function() { 
	FormRenderer.Models.ResponseFieldRadio = FormRenderer.Models.ResponseField.extend({
	    field_type: 'radio',
	    initialize: function() {
	      FormRenderer.Models.ResponseField.prototype.initialize.apply(this, arguments);
	      return this.on('change:value.selected', function(_, val) {
	        return this.set('showOther', val === 'Other');
	      });
	    },
	    /**
		 * 其它值
		 */
	    setExistingOtherValue:function(x){
	    	 if($.isNotEmpty(x))
	    		 return this.set('value.other', x);
	    },
	    setExistingValue: function(x) {
		      if($.isNotEmpty(x))
		    	 return this.set('value.checked', x);
		      this.setDefaultValue();
	    },
	    setDefaultValue:function(){
	    	var defaultOption;
	        if (this.isDefault() && (defaultOption = _.find(this.getOptions(), (function(option) {
	            return FormRenderer.toBoolean(option.checked);
	          })))) {
	            return this.set('value.checked', defaultOption.val);
	          } else {
	            return this.set('value',null);
	          }
	    },
	    getTapValue:function(x){
	    	if($.type(x) === "string")
				return x;
	      var k,v;
	      if ( $.isNotEmpty(x) && (typeof x === 'object')){
	          for (k in x) {
	        	  v = x[k];
	        	  if(k != 'merge' &&$.isNotEmpty(v))
	        		  return v;
	          } 
	      }
		  return v;
	    },
	    getValue: function() {
	    	return _.tap({
	        merge: true
	      }, (function(_this) {
	        return function(h) {
	          h["" + (_this.get(FormOptions.t.mappings.NAME))] = _this.get('value.checked')?_this.get('value.checked'):"";
	          if(_this.get('value.other')){
	        	  return h["" + (_this.get(FormOptions.t.mappings.OPTION_OTHER_ID))] = _this.get('value.other');
	          }
	        };
	      })(this));
	    },
	    toText: function() {
	    	return (this.getValue() || {})["" + this.get(FormOptions.t.mappings.NAME)];
	    },
	    getValueText:function(){
	    	return (this.getValue() || {})["" + this.get(FormOptions.t.mappings.NAME)];
	    },
	    hasValue: function() {
	      return !!this.get('value.checked');
	    }
	  });
	
	
	 FormRenderer.Views.ResponseFieldRadio = FormRenderer.Views.ResponseField.extend({
		    field_type: 'radio'
	  });
	
}).call(this);  	


// =========== 多项选择字段 ===================
(function() { 
	  FormRenderer.Models.ResponseFieldCheckbox = FormRenderer.Models.ResponseField.extend({
		validators: [FormRenderer.Validators.MinMaxNumValidator],
	    field_type: 'checkbox',
	    initialize: function() {
	      FormRenderer.Models.ResponseField.prototype.initialize.apply(this, arguments);
	      return this.on('change:value.other_checkbox', function(_, val) {
	        return this.set('showOther', val);
	      });
	    },
	    /**
		 * 其它值
		 */
	    setExistingOtherValue:function(x){
	   	 if($.isNotEmpty(x))
	   		 return this.set('value.other', x);
	   },
	    getTapValue:function(x){
	    	var value =  _.tap({}, (function(_this) {
	            return function(h) {
	              var i, option, _i, _j, _len, _len1, _ref, _ref1, _results;
	              if (!$.isEmpty(x)) {  // 不为空
	                _ref = _this.getOptions();
	               var v = _str.words(x,",");
	                for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	                  option = _ref[i];
	                  var b = false;
	                  if(_.contains(v, option.val))
	                	  b =true;
	                  h["" + option.val] =b;
	                }
	                // 其他选项
	                if (x.Other != null) {
	                  h['other_checkbox'] = true;
	                  return h['other'] = x.Other;
	                }
	              } else {
	            	  _results = [];
	            	  if(!_this.isDefault())// 有默认值
	            		  return [];
	                _ref1 = _this.getOptions();
	                
	                for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
	                  option = _ref1[i];
	                  _results.push(h["" + option.val] = FormRenderer.toBoolean(option.checked));
	                }
	                return _results;
	              }
	            };
	          })(this));
	    	
	    	return value;
	    },
	    setExistingValue: function(x) {
	      return this.set('value', this.getTapValue(x));
	    },
	    /**
		 * 对象
		 */
	     getObjectValue: function(x) {
	        var k, returnValue=[],value={},v;
		      if ( $.isNotEmpty(x) && (typeof x === 'object') && x.merge)
		          delete x.merge;
		      $.extend(value, x);
		      for (k in value) {
		    	  v = value[k];
		        if(v === true)
		        	returnValue.push(k);
		      }
		      return returnValue;
	      },
	      /**
			 * 数组
			 */
	      getArrayValue:function(x){
	    	  var k, returnValue=[], v;
		      for (k in x) {
		        v = x[k];
		        if ( $.isNotEmpty(v) && v === 'merge'){
		        	continue;
		        }
		        if(v === true)
		        	returnValue.push(k);
		      }
		      return returnValue;
	      },
	      getValue: function() {
	        var k, returnValue =[], v, _ref,other="";
	        	_ref = this.get('value');
		        for (k in _ref) {
		          v = _ref[k];
		          if(v === true)
		          	returnValue.push(k);
		        }
		      if(this.get(FormOptions.t.mappings.IS_SUB)){// 子表单
		    	  return returnValue.join(",");
		      }else{
		    		return _.tap({
		    	        merge: true
		    	      }, (function(_this) {
		    	        return function(h) {
		    	          h["" + (_this.get(FormOptions.t.mappings.NAME))] =returnValue.join(",");
		    	          if(_this.get('value.other')){
		    	        	  return h["" + (_this.get(FormOptions.t.mappings.NAME)) + "_other"] = _this.get('value.other');
		    	          }
		    	        };
		    	      })(this));
		      }
	    },
	    getValidateValue:function(){
	    	return this.getValueText();
	    },
	    toText: function() {
	    	return (this.getValue() || {})["" + this.get(FormOptions.t.mappings.NAME)];
	    },
	    getValueText:function(){
	    	return (this.getValue() || {})["" + this.get(FormOptions.t.mappings.NAME)];
	    },
	    hasValue: function() {
	      return this.hasAnyValueInHash();
	    }
	  });
	
	 FormRenderer.Views.ResponseFieldCheckbox = FormRenderer.Views.ResponseField.extend({
		    field_type: 'checkbox'
	  });
  
}).call(this);  	

// =========== 下拉框字段 ===================
(function() {   
	 FormRenderer.Models.ResponseFieldSelect = FormRenderer.Models.ResponseField.extend({
		    field_type: 'select',
		    setExistingValue: function(x) {
		      if (x != null) {
		        return FormRenderer.Models.ResponseField.prototype.setExistingValue.apply(this, arguments);
		      } else {
		          var checkedOption;
		    	  if(!this.isDefault()){
		    	      return this.unset();
		    	  }
		        checkedOption = _.find(this.getOptions(), (function(option) {
		          return FormRenderer.toBoolean(option.checked);
		        }));
		        
		        if (!checkedOption && !this.get( FormOptions.t.mappings.INCLUDE_BLANK)) {
		          checkedOption = _.first(this.getOptions());
		        }
		        if (this.isDefault() && checkedOption) {
		          return this.set('value', checkedOption.val);
		        } else {
		          return this.unset('value');
		        }
		      }
	    },
	    toText: function(val) {
	    	if(!val)
	    	   	 val = this.getValue();
	    	var option = _.find(this.getOptions(), (function(option) {
	            return  option.val ==val;
	          }));
	        return option?(option.label||''):'';
	     }
	  });
	 FormRenderer.Views.ResponseFieldSelect = FormRenderer.Views.ResponseField.extend({
		    field_type: 'select'
	  });
	
}).call(this);  	

// =========== 日期字段 ===================
(function() {   
	  FormRenderer.Models.ResponseFieldDatePicker = FormRenderer.Models.ResponseField.extend({
	    field_type: 'datePicker',
	    validators: [FormRenderer.Validators.DateValidator,FormRenderer.Validators.StartEndDateValidator],
	    setExistingValue: function(x) {
	    	if (!$.isEmpty(x)){
		        this.set('value',  $.format(x,this.get(FormOptions.t.mappings.DATEFMT)));
		    }else{
		    	  if(  this.isDefault() && 
		    			  this.getDefaultValueType() ==  'today'  ){
		    	        this.set('value',  $.format(new Date(),this.get(FormOptions.t.mappings.DATEFMT)));
		    	  }else{
		    			FormRenderer.Models.ResponseField.prototype.setExistingValue.apply(this, arguments);
		    	  }
		     }
	    }
	  });
	  
	  FormRenderer.Views.ResponseFieldDatePicker = FormRenderer.Views.ResponseField.extend({
		    field_type: 'datePicker',
		    events: function(){
		    	return _.extend({}, FormRenderer.Views.ResponseField.prototype.events,this.extEvents);
		    },
		    extEvents:{
		    	 'click [data-toggle="datepicker"]': function(e){
		    		 return FormRenderer.Views.ResponseFieldDatePicker.prototype.selectDatePicker.apply(this, arguments);
		    	 }
		    },
		    selectDatePicker:function(e){
		    	if(this.isRead() && !this.model.isSubTable())
		    		return
		    	var _this =this,
		    		$el =  $(e.target),
		    		datePicker;
		
		    	if($el.hasClass('fa')){// 点击图标
		    		datePicker = $el.siblings(".date-control");
		    		$el =  datePicker;
		    	}else{
		    		datePicker = $el.closest(".date-control");
		    	}
		    	if(!datePicker && datePicker.length == 0 )
		    		return;
		    	
		    	var	options= datePicker.data(),
		    		model = this.model;
		    	if(!options)
		    		return;

	    		if(this.model.isSubTable()){
	    			var column = options[FormOptions.t.table.COLUMN];
	    			model = this.model.response_columns[column];
	    			model.set(FormOptions.t.table.ROW,options[FormOptions.t.table.ROW]);
	    			if(this.model.columnIsRead(column)){
	    				return
	    			}
	    		}
	    		//权限以字段权限为准

		    	DatetimepickerUtil.show($el,{
		    		dateFmt:(model.get(FormOptions.t.mappings.DATEFMT)?model.get(FormOptions.t.mappings.DATEFMT):'yyyy-MM-dd'),
		    		onpicking:function(val){
		    			FormRenderer.Views.ResponseFieldDatePicker.prototype.setValue.apply(_this,[model,val]);
		    		},
		    		onclearing:function(val){
		    			FormRenderer.Views.ResponseFieldDatePicker.prototype.setValue.apply(_this,[model,val]);
		    		}
		    	});
		    	
				$el.focus();
		    },
		    setValue:function(model,val){ 
		    	if(this.model.isSubTable()){
		      	    this.model.setValue(model.get(FormOptions.t.table.COLUMN),model.get(FormOptions.t.table.ROW),val);
		      	    this.model.validateSub(model.get(FormOptions.t.table.ROW),model.get(FormOptions.t.table.COLUMN));
		      	}else{
		      		this.model.set('value', val);
		      	}
		    }
		  });  
	  
}).call(this);  	



// =========== 日期范围字段 ===================
(function() {   
	FormRenderer.Models.ResponseFieldDateRange = FormRenderer.Models.ResponseField.extend({
		  field_type: 'dateRange',
		  validators: [FormRenderer.Validators.DateValidator],
		  setExistingValue: function(x) {
		 	 if (x) {
		      this.set('value',  $.format(x,this.get(FormOptions.t.mappings.DATEFMT)));
		    }
		    // 默认值
		    if(this.isDefault() && this.get( FormOptions.t.mappings.DEFAULT_VALUE) ){
		        this.set('value',this.get( FormOptions.t.mappings.DEFAULT_VALUE)  );
		    }
		  }
		});
	
	 // 日期控件范围
	  FormRenderer.Views.ResponseFieldDateRange = FormRenderer.Views.ResponseField.extend({
		    field_type: 'dateRange',
		    events: function(){
		    	return _.extend({}, FormRenderer.Views.ResponseField.prototype.events,this.extEvents);
		    },
		    extEvents:{
			   	 'click [data-toggle="datepicker"]': function(e){
			   		 return FormRenderer.Views.ResponseFieldDateRange.prototype.selectDatePicker.apply(this, arguments);
			   	 }
		    },
		    selectDatePicker:function(e){
		    	if(this.isRead())
		    		return;
		    	var _this =this,
		    	$el =  $(e.target),datePicker =$el.closest("[datepicker]"),
				dateFmt=  (datePicker.attr('datefmt')?datePicker.attr('datefmt'):'yyyy-MM-dd');
		    	
		    	DatetimepickerUtil.show($el,{
		    		dateFmt:dateFmt,
		    		onpicking:function(val){
		    			_this.setDatePickerValue(val);
		    		},
		    		onclearing:function(val){
		    			_this.setDatePickerValue(val);
		    		}
		    	});
				$el.focus();
		    },
		    setDatePickerValue: function(val) {
		      	if(this.model.isSub){
		      	  return this.model.set('value.'+this.model.getColumn() +'.'+ this.model.getRow(), val);
		      	}else{
		            return this.model.set('value', val);
		      	}
		    }
		  }); 
	
}).call(this);  	
// =========== 富文本框字段 ===================
(function() { 
	  FormRenderer.Models.ResponseFieldEditor = FormRenderer.Models.ResponseField.extend({
	    field_type: 'editor',
	    validators: [FormRenderer.Validators.MinMaxLengthValidator],
	    setExistingValue: function(x) {
	    		if($.isNotEmpty(x)){
	    			this.set("value",x);
	    			if(this.editor)
	    				this.editor.setContent(x);
	    		}
		  },
	    /**
		 * 获取验证的值
		 */
	    getValidateValue:function(){
	    	return this.editor?this.editor.getPlainTxt():(this.getValue()||"");
	    },
	    toText:function(){
	    	return this.editor?_str.trim(this.editor.getPlainTxt()):(this.getValue()||"");
	    },
	    getValueText:function(){
	    	return  this.toText();
	    },
	    getHeight:function(){
	    	return this.get(FormOptions.t.mappings.HEIGHT) ||150;
	    }
	  });
	  
	  
	  FormRenderer.Views.ResponseFieldEditor = FormRenderer.Views.ResponseField.extend({
		    field_type: 'editor',
		    initialize: function() {
		        FormRenderer.Views.ResponseField.prototype.initialize.apply(this, arguments);
		        return this.on('shown', function() {
		          var _ref;
		          this.refreshing = true;
		          if ((_ref = this.model.editor) != null) {
		        	// _ref._onResize();
		          }
		          return setTimeout((function(_this) {
		            return function() {
		              return _this.refreshing = false;
		            };
		          })(this), 0);
		        });
		    },
		    render: function() {
		     	if(this.model.editor)// 如果有了就不重新渲染了
		    		return this;
		        FormRenderer.Views.ResponseField.prototype.render.apply(this, arguments);
		        if (this.form_renderer) 
		        	this.initView();
		        return this;
		    },
		    initView:function(){
		    	var editor;
		        try {
				return setTimeout((function(_this) {
		            return function() {
		               	if(!document.getElementById(_this.getDomId()))
			        		return _this;
		        		_this.model.editor = editor = UE.getEditor(_this.getDomId(),_this.getConfig());
		        		
		  		      // 页面渲染好后如果有值
						if(editor){
							editor.ready( function( e ) {
								if(!$.isEmpty(_this.model.getValue()))
									editor.setContent(_this.model.getValue());
								editor.addListener('selectionchange',function(){
								     _this.model.set("value",editor.getContent());
								});
								editor.addListener('contentChange',function(){
								     _this.model.set("value",editor.getContent());
								});
							 });
						}
						return _this;
		      		};
		          })(this), 0);
				} catch (e) {
					if(	console)
						console.error(e);
				}
		    },
		    getConfig:function(){
		    	var config  = 	window.UEDITOR_CONFIG;
		       	if(this.model.getHeight())
		       		config.initialFrameHeight = this.model.getHeight();
		     	if(this.model.get(FormOptions.t.mappings.MAXLENGTH))
		     		config.maximumWords = this.model.get(FormOptions.t.mappings.MAXLENGTH);
		     	var placeholder =  this.model.get(FormOptions.t.mappings.PLACEHOLDER)||""
		      if($.isNotEmpty(placeholder))
		     			placeholder = '<span style=" color:#bfbfbf">'+placeholder+'</span>';
		      	config.initialContent = placeholder ;
		      	config.autoClearinitialContent  = true;
		     	
		     	var toolbars = this.model.get(FormOptions.t.mappings.TOOLBARS);
		     	if(toolbars && toolbars.length >0){
		     		config.toolbars.splice(0,window.UEDITOR_CONFIG.toolbars.length);
		     		config.toolbars.push(toolbars);
		     	}
		     	config.readonly = this.isRead();
		     	return config;
		    }
	});
	  
}).call(this);  	

// =========== 数据字典字段 ===================
(function() {   
	  FormRenderer.Models.ResponseFieldDictionary = FormRenderer.Models.ResponseField.extend({
		    field_type: 'dictionary',
		    initPresetParams:function(){
		        FormRenderer.Models.ResponseField.prototype.initPresetParams.apply(this, arguments);
		    	this.initDictionaryCache(this.get(FormOptions.t.mappings.DICTIONARY));
		    },
		    initDictionaryCache:function(typeKey){
		    	if($.isEmpty(typeKey) || $.isNotEmpty(FormRenderer.DICTIONARY_CACHE[typeKey])){
		    		return;
		    	}
		    	FormRenderer.DICTIONARY_CACHE[typeKey]  = {};
		    	
		    	$.ajax({
					  type: "GET",
					  url: __ctx+ "/platform/cat/dictionary/getByTypeKeyForComBo.htm",
					  data:{
			      	    	typeKey:typeKey,
			      	    	displayMode : this.get(FormOptions.t.mappings.DISPLAY_MODE)||'path',
							split : this.get(FormOptions.t.mappings.SPLIT)
					  },
					  dataType: "json",
					  async: false,
					  success: function(data){
						  FormRenderer.DICTIONARY_CACHE[typeKey] = data;
					  }
	  	    	});
		    },
		    setExistingValue: function(x) {
		    	if ($.isNotEmpty(x)){
					this.set('showvalue',this.getShowValue(x));
					this.set('value',  x);
		      }else{
		    		FormRenderer.Models.ResponseField.prototype.setExistingValue.apply(this, arguments);
		      }
		    },
		    getDisplayMode:function(){
		    	return this.get(FormOptions.t.mappings.DISPLAY_MODE)||'name';
		    },
		    getSplit:function(){
		    	return  this.get(FormOptions.t.mappings.SPLIT) || '/';
		    },
		    isPath:function(){
		    	 return this.getDisplayMode() == 'path'?true:false;
		    },
		    getShowValue:function(x,model){
		    	if(!model)
		    		model = this;
	    		var dic = FormRenderer.DICTIONARY_CACHE[model.get(FormOptions.t.mappings.DICTIONARY)],
	    			  displayMode = model.getDisplayMode(),
	    			  split = model.getSplit(),
	    			  isPath = model.isPath(),
	    			  nodes = JSON.getPnodeBySub(dic,x,isPath),
	    			  names = [];
				if(isPath){
					for(var idx=0;idx<nodes.length;idx++){
						var node = nodes[idx];
						names.push(node.name);
					}
					val = names.join(split);
				}else{
					if(nodes.length > 0)
					val  =nodes[0].name;
				}
				return val;
		    },
		    getDictionaryVal:function(model){
	    		var x = model.get("value");
	    		if( $.isEmpty(x))
	    			return '';
	    		return  model.getShowValue(x,model);	
		    },
		    toText:function(){
		    	return this.getDictionaryVal(this);
		    }
	  });
	  
	  // 数据字典
	  FormRenderer.Views.ResponseFieldDictionary = FormRenderer.Views.ResponseField.extend({
		    field_type: 'dictionary',
		    events: function(){
		    	return _.extend({}, FormRenderer.Views.ResponseField.prototype.events,this.extEvents);
		    },
		    extEvents: {
		    	'click [data-toggle="dictionary"]': function(e){
		    		 return FormRenderer.Views.ResponseFieldDictionary.prototype.selectDictionary.apply(this, arguments);
		    	 }
		    },
		    /**
			 * 设置位置
			 */
			setPosition: function($el,$tree,$box,options) {
				var top = $el.offset().top,
					left = $el.offset().left,
					$clone = $tree.clone().appendTo($('body')),
					treeHeight = $clone.outerHeight(),
					h = $el.outerHeight();
				$clone.remove();
				var offsetBot = $(window).height() - treeHeight
						- top - h, maxHeight = $(window).height()
						- top - h;

				if (options.height == 'auto' && offsetBot < 0)
					maxHeight = maxHeight + offsetBot;
				$box.css({
					top : (top + h),
					left : left,
					'max-height' : 200
				});
				$el.addClass("open");
			},
			
			/**
			 * 数据字典
			 */
			selectDictionary:function(e){
			    if(this.isRead() && !this.model.isSubTable())
			    		return
	    		var model = this.model,
	    			dictionaryKey,
					$el =$(e.currentTarget),
	    			options = $el.data();
	    		if(this.model.isSubTable()){
	    			var column = options[FormOptions.t.table.COLUMN];
	    			model = this.model.response_columns[column];
	    			model.set(FormOptions.t.table.ROW,options[FormOptions.t.table.ROW]);
	    			if(this.model.columnIsRead(column))
	    				return
	    		}
	    		dictionaryKey = model.get(FormOptions.t.mappings.DICTIONARY);
	    		if($.isEmpty(dictionaryKey)){
	    			DialogUtil.msg("请绑定数据字典!");
	    			return;
	    		}
				
	    		var _this =this,
	    			w = parseFloat($el.css('width')),
	    			h = $el.outerHeight();

	    		 options.width = options.width || $el.outerWidth();
	    		 options.height = options.height || '200';
		    		
		    		
		    		var treeid = options.treeid?options.treeid: $.uniqueId(),
		    			$tree = $("#"+treeid),
		    			$box =   $('#' + treeid + '_select_box');
		    		if($tree.length == 0){
		    			$tree = $('<div class="dict-select hidden" id="dict_select_'+treeid+'"><i class="fa fa-list"></i>'+(model.get(FormOptions.t.mappings.PLACEHOLDER)||'请选择')+'</div><ul id="' + treeid+ '" class="ztree dict-tree hidden" ></ul>'),
		    			$el.attr("treeid",treeid).css("cursor", "pointer").after($tree);
		    		}
		    		
		    		// 绑定隐藏事件
		    		$("*").bind("mousedown", function(event){
		    			if(event.target.id == $el.attr("id") || event.target.id == $box.attr("id") || $(event.target).parents("#" + $box.attr("id")).length > 0)
		    				return;
		    			$box.hide();
	    			});
		    		
		    		$("#dict_select_"+treeid).off('click').on("click",function(e){
		    			FormRenderer.Views.ResponseFieldDictionary.prototype.setValue.apply(_this,[model]);
		    			// 选择
		    			$box.hide();
		    		});

		    		if ($box && $box.length) {
		    			FormRenderer.Views.ResponseFieldDictionary.prototype.setPosition($el,$tree,$box,options);
		    			setTimeout(function(){
		    				$box.show();
		    				$el.addClass("open");
		    			},10);
		    			return;
		    		}
		    		
		    		var multiple =  model.get(FormOptions.t.mappings.MULTIPLE)=='Y'?true:false;
		    		
		    		var setting = {
		    			data : {
		    				key : {
		    					name : "name"
		    				},
		    				simpleData : {
		    					enable : true,
		    					idKey : "id",
		    					pIdKey : "parentId",
		    					rootPId : null
		    				}
		    			},
		    			view : {
		    				selectedMulti : false,
		    				showIconFont : true
		    			},
		    			check : {
							enable :multiple?true:false,
							chkboxType : {
								"Y" : "s",
								"N" : ""
							},
							radioType : "all",
							chkStyle :multiple? "checkbox" : "radio",
						},
		    			callback : {
		    				onClick : function(e, treeId, treeNode) {
		    					var selectMode = model.get(FormOptions.t.mappings.SELECT_MODE)||'any',
		    						displayMode = model.get(FormOptions.t.mappings.DISPLAY_MODE)||'name',
		    						split = model.get(FormOptions.t.mappings.SPLIT) || '/';
		    					// 任意节点选择、叶节点选择模式，默认叶节点选择模式
		    					if(selectMode == 'leaf' && treeNode.isParent){
		    						DialogUtil.msg("请选择节点!");
		    						return;
		    					}
		    					
		    					var _tnode = $.extend(true, {}, treeNode);
		    					if(displayMode == undefined || displayMode == 'path'){
		    						var pathName = '';
		    						
		    						var pathNameFunc = function(__pathName, __treeNode){
		    							if(undefined == __treeNode || null == __treeNode){
		    								return __pathName;
		    							}else if(typeof(__treeNode)!='undefined'&&__treeNode!=null){
		    								__pathName += split + pathNameFunc(__treeNode.name, __treeNode.getParentNode());
		    							}
		    							
		    							return __pathName;
		    						};
		    						
		    						pathName = pathNameFunc(treeNode.name, treeNode.getParentNode());
		    						
		    						var tmps = pathName.split(split);
	    							var rsArr = [];
		    						if(tmps.length>0){
		    							for(var ix=tmps.length-1;ix>=0;ix--){
		    								rsArr.push(tmps[ix]);
		    							}
		    						}
		    						
		    						_tnode.name = rsArr.join(split);
		    					}
		    					
		    					FormRenderer.Views.ResponseFieldDictionary.prototype.setValue.apply(_this,[model, _tnode]);
		    					$el.blur();
		    					$box.hide();
		    				}
		    			}
		    		};


		    		$box = $('<div id="'+ treeid+ '_select_box" class="tree-box"></div>')
		    				.css({
		    					position : 'absolute',
		    					'zIndex' : 99999,
		    					'min-width' : options.width,
		    					height : options.height,
		    					overflow : 'auto',
		    					background : '#FFFFFF',
		    					border : '1px #EEE solid'
		    				}).hide().appendTo($('body'));
		    		

		    			var url = __ctx+ "/platform/cat/dictionary/getByTypeKeyForComBo.htm?typeKey="+ dictionaryKey;
	
		    			$.post(url, options.params ? options.params: {}, function(data) {
		    				var tree = $.fn.zTree.init($('#'+ treeid), setting, data);
		    				// 展开所有
		    				tree.expandAll(true);
		    				$tree.appendTo($box).css('width','100%').removeClass('hidden').show();
		    				FormRenderer.Views.ResponseFieldDictionary.prototype.setPosition($el,$tree,$box,options);
		    				$box.show();
		    			});
		    },
		    setValue:function(model,obj){ 
		    	var key =obj?obj.key:'',name=obj?obj.name:'';
		    	
		    	if(this.model.isSubTable()){
  		      	    this.model.setValue(model.get(FormOptions.t.table.COLUMN),model.get(FormOptions.t.table.ROW),key);
  		      	    this.model.set('showvalue.'+model.get(FormOptions.t.table.COLUMN)+"."+model.get(FormOptions.t.table.ROW),name);
  		      	}else{
  		      		this.model.set('value', key);
  		      		this.model.set('showvalue',name);
  		      	}
		    }
	  });        
	
}).call(this);  	
 
// =========== 自动编号字段 ===================
(function() {   
	  FormRenderer.Models.ResponseFieldAutoNumber = FormRenderer.Models.ResponseField.extend({
	    field_type: 'autoNumber'
	  });
	  
	  FormRenderer.Views.ResponseFieldAutoNumber = FormRenderer.Views.ResponseField.extend({
		    field_type: 'autoNumber',
		    render: function() {
		        FormRenderer.Views.ResponseField.prototype.render.apply(this, arguments);
		        if (this.form_renderer)
		        	this.initAutoNumber();
		        return this;
		    },
		    initAutoNumber:function(){
		    	var _this =this;
		    	if(!$.isEmpty(this.model.get("value")))
		    		return this;
	    		if($.isEmpty(this.model.get(FormOptions.t.mappings.IDENTITY))){
        			this.model.set("warn","未绑定编号");
        			return this;
        		}
	        	if(FormRenderer.toBoolean(this.model.get(FormOptions.t.mappings.INIT))){// 初始化加载编号,从服务器加载
		    	    $.get(  __ctx+ "/platform/system/identity/getNextIdByAlias.htm",{
		    	    	alias:this.model.get(FormOptions.t.mappings.IDENTITY)
		    	    	},function(data){
		    	    		var rtn = eval('(' + data + ')');
		    	    		if(rtn.result == 1){
		    	    			_this.model.unset("warn");
		    	    			_this.model.set("value",rtn.message);
		    	    		}
		    	    		else
		    	    			_this.model.set("warn",rtn.message);
		    	    });
		    	    
	        	}else {
	        		_this.model.set("placeholder",  this.model.get( FormOptions.t.mappings.PLACEHOLDER)?this.model.get( FormOptions.t.mappings.PLACEHOLDER):"表单提交后生成编号");
	        	}
		    }
		  });  
}).call(this); 

// =========== 上传附件 字段 ===================
(function() {   
	 FormRenderer.Models.ResponseFieldAttachment = FormRenderer.Models.ResponseField.extend({
		    field_type: 'attachment',
		    setExistingValue: function(x) {
				return this.set('value',x);
		    },
		    getFileVal:function(id, fileName){
		    	return {
		            id: id,
		            fileName: fileName
		          };
		    },
		    setVal:function(files,model){
		        var val = $.isNotEmpty(files)?JSON.stringify(files):"";
		        if(model){ // 子表
		      	  return   model.set('value.'+this.get(FormOptions.t.table.COLUMN)+"."+this.get(FormOptions.t.table.ROW),val);
		        }else{
		      	  return this.set('value', val);
		        }	
		    },
		    addFile: function(addFiles,model) {
		    	 var files;
		      files = this.getFiles(model).slice(0);
		      _.each(addFiles,function(f,i){
		    	     files.push(f);
		      });
		      return this.setVal(files,model);
		    },
		    removeFile: function(idx,model) {
		      var files;
		      files =_.clone(this.getFiles(model).slice(0));
		      files.splice(idx, 1);
		      return files;
		    },
		    rechooseFile:function(idx,file,model){
		        var files;
		        files =_.clone(this.getFiles(model).slice(0));
		        files.splice(idx, 1,file);
		        return files;
		    },
		    getFiles: function(model) {
		    	var files;
		    	if(model){
		    		files  = model.get("value."+this.get(FormOptions.t.table.COLUMN)+"."+this.get(FormOptions.t.table.ROW));
		    	}else{
		    		files = this.get('value');
		    	}
		    	try {
		    		return $.isNotEmpty(files)? JSON.parse(files): [];
				} catch (e) {
					return  [];
				}
		    },
		    canAddFile: function() {
		      return this.getFiles().length < this.maxFiles();
		    },
		    getValue: function() {
		      if (this.hasValue()) {
		        return JSON.stringify( this.getFiles() );
		      } else {
		        return "";
		      }
		    },
		    toText: function() {
		      return _.compact(_.pluck(this.getFiles(), 'fileName')).join(' ');
		    },
		    hasValue: function() {
		      return _.any(this.getFiles(), function(h) {
		        return !!h.id;
		      });
		    },
		    // =========配置参数=========
		   // 指定接受哪些类型的文件
		    getAccept:function(){
			    var mediaType = this.get(FormOptions.t.mappings.MEDIA_TYPE);
		    	if($.isEmpty(mediaType))
					return null;
			    var x;
				if(x = MimeType.ACCEPT[mediaType]){
					return x;
				 }else{
					 var media = this.get(FormOptions.t.mappings.MEDIA)||'',
					 	  mimeTypes =  _.map(media. split(","), function(x) {
	  			          return "." + x;
				        });
					return {
		    			    title: '自定义',
		    			    extensions: media,
		    			    mimeTypes:mimeTypes.join(",")
		    			};
				 }
		    },
		    // 允许文件类型
		    getAcceptedExtensions: function() {
			    var mediaType = this.get(FormOptions.t.mappings.MEDIA_TYPE);
			    if($.isEmpty(mediaType))
			    	   return [];
			      var x;
			      if ((x = MimeType.FILE_TYPES[mediaType])) {
			        return _.map(x, function(x) {
			          return "." + x;
			        });
				  }else{
					  return (this.get(FormOptions.t.mappings.MEDIA)||"").split(",");
			  }
		    },
		    // 最大上传数
		    maxFiles: function() {
		      if (this.get(FormOptions.t.mappings.MAX_FILE_QUANTITY) && this.get(FormOptions.t.mappings.MAX_FILE_QUANTITY) !='-1') {
		        return this.get(FormOptions.t.mappings.MAX_FILE_QUANTITY);
		      } else {
		        return 9999999999999999;
		      }
		    },
		    // 最大上传文件数量
		    getMaxSize: function() {
		        if (this.get(FormOptions.t.mappings.MAX_FILE_SIZE)) {
		            return this.get(FormOptions.t.mappings.MAX_FILE_SIZE) *1024*1024;
		          } else {
		            return 100 *1024*1024;
		          }
		    }
		  });
	 
	  // 附件
	  FormRenderer.Views.ResponseFieldAttachment = FormRenderer.Views.ResponseField.extend({
		    field_type: 'attachment',
		    initialize: function() {
		        FormRenderer.Views.ResponseField.prototype.initialize.apply(this, arguments);
		    },
		    render: function() {
		        FormRenderer.Views.ResponseField.prototype.render.apply(this, arguments);
		        this.initFileEvent();
		        return this;
		    },
		    events: function(){
		    	return _.extend({}, FormRenderer.Views.ResponseField.prototype.events,this.extEvents);
		    },
		    extEvents: {
		      'click [data-toggle="file-remove"]':function(e){
		    		 return FormRenderer.Views.ResponseFieldAttachment.prototype.doFileRemove.apply(this, arguments);
		      },
		      'click [data-toggle="file-add"]' : function(e){
		    		 return FormRenderer.Views.ResponseFieldAttachment.prototype.doFileAdd.apply(this, arguments);
		      },
		      'click [data-toggle="file-rechoose"]' : function(e){
		    		 return FormRenderer.Views.ResponseFieldAttachment.prototype.doFileRechoose.apply(this, arguments);
		      }
		    },
		    // 初始化事件
		    initFileEvent : function(){
	    		setTimeout(function(){
	    		      // 附件重选,删除
		    		$(document).on("mouseenter", ".fr-file:not(.error)", function() {
			          return $(this).find(".file-actions").show();
			      }),
			      $(document).on("mouseleave", ".fr-file:not(.error)", function() {
			          return $(this).find(".file-actions").hide();
			      });
		    	      //预览视图
		    	$(".image-popup").magnificPopup({
			            type: 'image',
			            closeOnContentClick: true,
			            image: {
			              verticalFit: false
			            }
			          }); 
		    	$(".iframe-popup").magnificPopup({
			             disableOn: 700,
			             type: 'iframe',
			             mainClass: 'mfp-fade',
			             removalDelay: 160,
			             preloader: false,
			             fixedContentPos: false
			         });	
	    		 }, 1);
		    },
		    /**
			 * 上传文件
			 */
		    UploadFile:function(model,params,cabllback,isRechoose){
			    	// 最多上传个数
			    var	maxFiles =  isRechoose?1:model.maxFiles(),
			    	// 文件格式
			    	 fileFormates =(fileFormates =( model.getAcceptedExtensions()||[]).join(","))?fileFormates:null,
	    			 // 指定接受哪些类型的文件
	    			 accept = model.getAccept(),
			    	// 文件尺寸
			    	maxUploadSize = model.getMaxSize();
		    	
		    	new UploadDialog({
		    		fileFormates:fileFormates,
		    		maxUploadSize:maxUploadSize,
		    		maxUploadNum:maxFiles,
		    		accept:accept,
					callback:function(data){
						 if(data.length ==0)
							 return;
						 var  files =[];
						 // 整理过的数据
						  for (var _i = 0, _len = data.length; _i < _len; _i++) {
							  files.push(model.getFileVal(data[_i].id, data[_i].fileName));
						  }
						  
						 if(isRechoose)
							return  cabllback(files);
						 
						var  allFiles =  model.getFiles();
						if((allFiles.length + files.length)> maxFiles ){
							var index = data.length -(files.length + data.length-maxFiles);
							files.splice(index);
						}
						return  cabllback(files);
					 }
				 }).show();
		    },
		    // 添加（新增）文件
		    doFileAdd:function(e){
				var _this =  this,
		    		$el =  $(e.target),
		    		parentEl  = $el.closest(".fr-attachment"),
		    		options= parentEl.data(),
		    		model;
				
	     		if(_this.model.isSubTable()){// 子表
	    			model = this.model.response_columns[options["column"]];
	    			model.set(FormOptions.t.table.ROW,options["row"]);
	    		}else{
	    			model = this.model;
	    		}
	     		
		    	FormRenderer.Views.ResponseFieldAttachment.prototype.UploadFile(model,{},function(data){
		    		model.addFile(data,_this.model.isSubTable()?_this.model:null);
		    		_this.render();
		    	});
		    },
		    // 删除文件
		    doFileRemove: function(e) {
		      var idx,files,parentEl,options,model;
		      		parentEl  = $(e.target).closest(".fr-attachment"),
		      		options = parentEl.data();
		      		idx = parentEl.find('[data-toggle="file-remove"]').index(e.target);

	      		if(this.model.isSubTable()){// 子表
	    			model = this.model.response_columns[options["column"]];
	    			model.set(FormOptions.t.table.ROW,options["row"]);
	    		}else{
	    			model = this.model;
	    		}	
	      		
	      		files = model.removeFile(idx,(this.model.isSubTable()?this.model:null));
	      		model.setVal(files,this.model.isSubTable()?this.model:null);
		       return this.render();
		    },
		    // 重新选择文件
		    doFileRechoose:function(e){
				var _this =  this,
			 		idx, files,
		    		$el =  $(e.target),
		       		parentEl  = $el.closest(".fr-attachment"),
		    		options= parentEl.data(),
		    		model,
		    		parentModel;
	    		
	     		if(_this.model.isSubTable()){// 子表
	    			model = this.model.response_columns[options["column"]];
	    			model.set(FormOptions.t.table.ROW,options["row"]);
	    			parentModel =this.model;
	    		}else{
	    			model = this.model;
	    		}
	     		
	     		idx = parentEl.find('[data-toggle="file-rechoose"]').index(e.target);
	     	
			   FormRenderer.Views.ResponseFieldAttachment.prototype.UploadFile(model,{},function(data){
	    		 if(data.length ==0)
	    			 return ;
	    		 files = model.rechooseFile(idx,data[0],parentModel);
	  			 model.setVal(files,parentModel);
	  			_this.render();
	    	},true);
		    }
	  	});
}).call(this);  	
 
// =========== 选择器 字段 ===================
(function() {   
  // 选择器
  FormRenderer.Models.ResponseFieldSelector = FormRenderer.Models.ResponseField.extend({
    field_type: 'selector',
    setExistingValue: function(x) {
    	if($.isNotEmpty(x)){
    		return this.set('value',x);
    	}else{
    	var selectors = this.getDefaultVal();
    	 if($.isNotEmpty(selectors)){
    		 return  this.setValue(selectors);
    	  }else{
    		  return this.set('value',null);
    		}
    	}
    },
    getDefaultVal:function(){
    	   if(this.isDefault() && this.get( FormOptions.t.mappings.DEFAULT_VALUE)  && 
    			   this.getDefaultValueType() ==FormOptions.t.DEFAULT_VALUE_TYPE[0]  ){// 默认值固定值
 	    	var data =  this.get( FormOptions.t.mappings.DEFAULT_VALUE),
 	    		selectors = [];
	    	  if($.isEmpty(data.value))
	    		  return;
	    	  if(data.type == 'dynamic'){// 动态值
	    		 var selector_type = this.get(FormOptions.t.mappings.SELECTOR_TYPE);
	    		  if(selector_type == 'user'){
	    			  selectors.push({
	    				  id:__currentUserId,
	    				  name:__currentFullname
	    			  });
	    		  }else   if(selector_type == 'org'){
	    			  selectors.push({
	    				  id:__currentOrgId,
	    				  name:__currentOrgName
	    			  });
	    		  }else if(selector_type =='position'){
	    			  selectors= selectors.concat(
	    					  this.getPositionByCurrentUser(__currentUserId)
	    			  );
	    		  }else if(selector_type =='role'){
	    			 selectors= selectors.concat(
	    				  this.getRoleByCurrentUser(__currentUserId)
	    			  );
	    			  
	    		  }
	    		  // 其他 需从后台获取
	    	  }else{ // 固定值
	    		  selectors.push(data.value);
	    	  }
	    	  return  selectors;  
    	   }
    	 return null ;  
    },
    /**
     * 根据当前用户id获得岗位
     */
    getPositionByCurrentUser:function(__currentUserId){
    	$.ajax({
    		type: "GET",
    		url: __ctx+ "/platform/org/partyDialog/getPositionByCurrentUser.htm",
    		data:{
    			id:__currentUserId
    		},
    		dataType: "json",
    		async: false,
    		success: function(data){
    			selector =[];
    			positionList = data.positionList;
    			if(positionList){
    				for (_i = 0;  _i < positionList.length; _i++) {
    					selector.push({
    						id:positionList[_i].id,
    						name:positionList[_i].name
    					});
    				}
    			}
    		}
    	});
    	return selector;
    },
    /**
	 * 根据当前用户id获得角色
	 */
	getRoleByCurrentUser:function(__currentUserId){
			$.ajax({
				type: "GET",
				url: __ctx+ "/platform/org/partyDialog/getRoleByCurrentUser.htm",
				data:{
					id:__currentUserId
				},
				dataType: "json",
				async: false,
				success: function(data){
					selector =[];
					roleList = data.roleList;
					if(roleList){
						for (_i = 0;  _i < roleList.length; _i++) {
							selector.push({
								id:roleList[_i].id,
								name:roleList[_i].name
							});
						}
					}
				}
			});
			return selector;
    },
    convertSelectorValue:function(ids,names){
		if($.isEmpty(ids))
			return [];
		var _i,_len,selector = [];
		for (_i = 0, _len = ids.length; _i < _len; _i++) {
			selector.push({
				id:ids[_i],
				name:names[_i]
			});
		}
		return selector;
    },
    // 是否绑定ID
    isBindId:function(){
    	return  $.isNotEmpty(this.get(FormOptions.t.mappings.BIND_ID));
    },
    // 绑定ID的model
    getBindIdModel:function(){
    	return this.form_renderer.response_models[this.get(FormOptions.t.mappings.BIND_ID)] ;
    },
    getBindIdVal:function(bindModel,model){
    	if(model)
    		return model.get("value."+this.get(FormOptions.t.table.COLUMN)+"."+this.get(FormOptions.t.table.ROW))||"";

    	if($.isEmpty(bindModel))
    		return "";
    	return bindModel.getValue()||"";
    },
    // 数据存储
    getStore:function(){
    	return this.get(FormOptions.t.mappings.STORE)||'json';
    },
    // 获取value存储的值
    getModelValue:function(model){
    	if(model){
    		return  model.get("value."+this.get(FormOptions.t.table.COLUMN)+"."+this.get(FormOptions.t.table.ROW))||"";
    	}else{
    		return this.get('value')||"";
    	}
    },
    // 处理json格式值
    processJsonValue:function(value){
    	if($.isEmpty(value))
    		return [];
		if($.isArray(value))// 数组
			return value;

		try {
			var v = JSON.parse(value);
			if($.isEmpty(v))
				 v =[];
			return v
		} catch (e) {return [];	}
    },
    getType:function(){
    	return this.get(FormOptions.t.mappings.SELECTOR_TYPE)||'user';
    },
    getNameValue:function(type,id){
		 var key = type+"@"+id;
    	var name = FormRenderer.SELECTOR_CACHE[key];
    	if($.isNotEmpty(name))
    		return name;
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
				  FormRenderer.SELECTOR_CACHE[key] = data.name;
				  return data.name;
			  }
    	});
    	return FormRenderer.SELECTOR_CACHE[key];
    },
    setSelectorCache:function(selectors){
    	if($.isEmpty(selectors))
    		return;
    	var type = this.getType();
    	for (var i = 0; i < selectors.length; i++) {
    		var selector = selectors[i],
    			id  = selector["id"],
    			name = selector["name"];
   			var key = type+"@"+id;
			FormRenderer.SELECTOR_CACHE[key] = name||' ' ;
		}
    },
    // 处理id值
    processIDValue:function(value){
    	var _this= this,
    		ids = value.split(","),
    		type= this.getType(),
    		selectors=[];
		_.each(ids,function(id,i){
			selectors.push({
				id:id,
				name:_this.getNameValue(type,id)
			});
		});
    	return selectors;
    },
    bindFieldTip:function(){
    	DialogUtil.alert("【"+this.get(FormOptions.t.mappings.LABEL)+"】请绑定ID字段，</br>“绑定ID“是一个表单存在的字段，" +
		"</br>且“绑定ID”字段要在该字段之前");
    },
    // 处理绑定id
    processBindValue:function(value,model){
    	if($.isEmpty(value))
    		return [];
    	var selectors= [],
			names =  value.split(","),
			bindModel =this.getBindIdModel(),
			bindIdVal;
				
		if($.isEmpty(bindModel)){
			this.bindFieldTip();
			return selectors;
		}
		bindIdVal =  this.getBindIdVal(bindModel,model);
		if(_.isEmpty(bindIdVal))
			return  selectors;
		
			
		_.each( bindIdVal.split(","),function(id,i){
			if($.isEmpty(names[i]))
				return true;
			selectors.push({
				id:id,
				name:names[i]||''
			});
		});
	
		return selectors;
    },
    /**
	 * 获取选择器数据格式 返回格式一定是数组： [{id:"xxxx":name:"xxx"}]
	 */
    getSelector:function(model){
    	var value = this.getModelValue(model),
    			store = this.getStore();
       	if($.isEmpty(value))
    		return [];
    	if('json' == store){
    		return this.processJsonValue(value);
    	}else if('id' == store){// id需要查询数据库。返回名称
    		return this.processIDValue(value);
    	}else if('bind' == store){// 绑定id
    		return this.processBindValue(value,model);
    	}else{
    		return [];
    	}
    },
    
    /**
	 * 设置值 传入一定是 数组 格式是 [{id:"xxxx":name:"xxx"}]
	 */
    setValue:function(selectors){
    	var store = this.getStore();
    	var value ="";
    	if('json' == store){
    		 value = $.isNotEmpty(selectors)? JSON.stringify(selectors):"";
    	}else if('id' == store){// id需要查询数据库。返回名称
    		value  = _.compact(_.pluck(selectors, 'id')).join(',');
    		this.setSelectorCache(selectors);
    	}else if('bind' == store){// 绑定id
    		var ids = _.compact(_.pluck(selectors, 'id')).join(','),
	    		names = _.compact(_.pluck(selectors, 'name')).join(','),
	    		bindModel=	this.getBindIdModel();
	  		if($.isEmpty(bindModel)){
	  			this.bindFieldTip();
				return this;
			}
	  		// 设置绑定的值
      		bindModel.set('value', ids);
      		
      		value = names;
    	}
    	
    	return this.set('value', value);
    },
    removeSelector:function(idx){
        var selectors  =_.clone(this.getSelector().slice(0));
        selectors.splice(idx, 1);
        return selectors;
    },
    getValue: function() {
		  if (!this.hasValue())
			  return "";
		  return this.get("value");
     },
	  toText: function() {
	    return _.compact(_.pluck(this.getSelector(), 'name')).join(' ');
	  },
	  getIds: function() {
	      return _.compact(_.pluck(this.getSelector(), 'id')).join(' ');
	  },
	  hasValue: function() {
	    return _.any(this.getSelector(), function(h) {
	      return !!h.id;
	    });
	  }
  });
  
  // 选择器
  FormRenderer.Views.ResponseFieldSelector = FormRenderer.Views.ResponseField.extend({
	    field_type: 'selector',
	    events: function(){
	    	return _.extend({}, FormRenderer.Views.ResponseField.prototype.events,this.extEvents);
	    },
	    extEvents: {
	    	'click [data-toggle="selector"]':  function(e){
	           	e.preventDefault(); e.stopPropagation();
	    		 return FormRenderer.Views.ResponseFieldSelector.prototype.selectorDialog.apply(this, arguments);
	    	},
	    	'click  [data-toggle="selector-remove"]': function(e){
	           	e.preventDefault(); e.stopPropagation();
	    		 return FormRenderer.Views.ResponseFieldSelector.prototype.doSelectorRemove.apply(this, arguments);
	    	}
	    },
	    getPlaceholder:function(){
	    	return   this.model.getPlaceholder()||('请选择'+(FormRenderer.t.selector_type[this. model.getType()]?FormRenderer.t.selector_type[this. model.getType()]:''));
	    },
	    selectorDialog:function(e){
    		if(this.isRead() && !this.model.isSubTable())
	    		return
			var _this =  this,
		    		$el =  $(e.target),
		    		parentEl  = $el.closest(".fr-selector"),
		    		options= parentEl.data(),
		    		column = options[FormOptions.t.table.COLUMN],
		    		model = FormRenderer.Views.ResponseField.prototype.getModel(this,options);
			// 如果该子表只读  
     		if(this.model.isSubTable() && (this.model.getMode() == "dialog" || this.model.columnIsRead(column))){
 					return;
     		}

		   var type = model.getType(),
		    	isSingle = FormRenderer.toBoolean(model.get(FormOptions.t.mappings.IS_SINGLE)),
		    	selectorData = model.getSelector();
	    	
		switch (type) {
			case 'user':
				new PersonDialog({
					isSingle:isSingle, // 是否单选
					params:FormRenderer.Views.ResponseFieldSelector.prototype.userDataConvert(selectorData),	
					callback : function(ids, names) {
						FormRenderer.Views.ResponseFieldSelector.prototype.setSelectorData.apply(_this,[ids, names,model,options]);
					}
				}).show();
				break;
			case 'role':
				new RoleDialog({
					isSingle:isSingle,
					params:selectorData,	
					callback : function(ids,names) {
						FormRenderer.Views.ResponseFieldSelector.prototype.setSelectorData.apply(_this,[ids, names,model,options]);
					}
				}).show();
				break;
			case 'org':
				new OrgDialog({
					isSingle:isSingle,
					params:selectorData,	
					callback : function(ids,names) {
						FormRenderer.Views.ResponseFieldSelector.prototype.setSelectorData.apply(_this,[ids, names,model,options]);
					}
				}).show();
				break;
			case 'position':
				new PositionDialog({
					isSingle:isSingle,
					params:selectorData,	
					callback : function(ids,names) {
						FormRenderer.Views.ResponseFieldSelector.prototype.setSelectorData.apply(_this,[ids, names,model,options]);
					}
				}).show();
				break;
			case 'party':
				new PartyDialog({
					isSingle:isSingle,
					partyType:options.partyType,
					params:selectorData,	
					callback : function(ids,names) {
						FormRenderer.Views.ResponseFieldSelector.prototype.setSelectorData.apply(_this,[ids, names,model,options]);
					}
				}).show();
				break;
			case 'group':
				new GroupDialog({
					isSingle:isSingle,
					dimKey:options.dimKey,
					params:selectorData,	
					callback : function(ids,names) {
						FormRenderer.Views.ResponseFieldSelector.prototype.setSelectorData.apply(_this,[ids, names,model,options]);
					}
				}).show();
				break;
			default:
				break;
			}
	    },

		// 删除
		doSelectorRemove:function(e){
		    var idx,
				$el =  $(e.target).hasClass('.fr-selector-remove')?$(e.target): ($(e.target).closest('[data-toggle="selector-remove"]')),
			  	parentEl  = $el.closest(".fr-selector"),
	    		options= parentEl.data(),
	    		idx = parentEl.find('[data-toggle="selector-remove"]').index($el),
	    		model = FormRenderer.Views.ResponseField.prototype.getModel(this,options);

	 		FormRenderer.Views.ResponseFieldSelector.prototype.renderValue.apply(this,[model,model.removeSelector(idx)]);
		},
		 // 用户数据转换
	    userDataConvert:function(selector){
	    	var data = [];
			if(selector.length  == 0)
				return [];
			for (_i = 0, _len = selector.length; _i < _len; _i++) {
				data.push({
					id:selector[_i].id,
					fullname:selector[_i].name
				});
			}
			return data;
		},

		/**
		 * 设置选择器的值
		 */
		setSelectorData:function(ids,names,model,options){
	 		FormRenderer.Views.ResponseFieldSelector.prototype.renderValue.apply(this,[model,model.convertSelectorValue(ids,names)]);
		},
		renderValue:function(model,selector){
			if(this.model.isSubTable()){// 子表
				var store = model.getStore(),
					value = "";
			 	if('json' == store){
		    		value = $.isEmpty(selector)?"":JSON.stringify(selector) 
		    	}else if('id' == store){// id需要查询数据库。返回名称
		       		value  = _.compact(_.pluck(selector, 'id')).join(',');
		       		// 设置缓存
		    		model.setSelectorCache(selector);
		    	}else if('bind' == store){// 绑定id
		    		// 设置绑定id的值
		    		var ids = _.compact(_.pluck(selector, 'id')).join(',');
					var bindIdModel = model.getBindIdModel();
					bindIdModel.set("value",ids);
					this.model.setValue(bindIdModel.get(FormOptions.t.table.COLUMN),model.get(FormOptions.t.table.ROW), ids);
					
					value =  _.compact(_.pluck(selector, 'name')).join(',');
		    	}
				
				this.model.setValue(model.get(FormOptions.t.table.COLUMN),model.get(FormOptions.t.table.ROW), value);
				return this.render();
			}else{
				this.model.setValue(selector);
				return this.render();
			}
		}
	  });  
  
  
}).call(this);  

  
// =========== 自定义对话框 字段 ===================
(function() {   
	  FormRenderer.Models.ResponseFieldCustomDialog = FormRenderer.Models.ResponseField.extend({
		    field_type: 'customDialog',
		    setExistingValue: function(x) {
		    	if ($.isNotEmpty(x,true)){
		     		this.setValue( this.getDialogData(x));
		      }else{
		    		FormRenderer.Models.ResponseField.prototype.setExistingValue.apply(this, arguments);
		      }
		    },
		    // 数据存储
		    getStore:function(){
		    	return this.get(FormOptions.t.mappings.STORE)||'json';
		    },
		    /**
			 * 设置值 传入一定是 数组 格式是 [{id:"xxxx":name:"xxx"}]
			 */
		    setValue:function(data){
		    	var store = this.getStore();
		    	var value ="";
		    	if('json' == store){
		    		 value = $.isNotEmpty(data)? JSON.stringify(data):"";
		    	}else if('id' == store){// id需要查询数据库。返回名称
		    		value  = _.compact(_.pluck(data, FormOptions.t.DATA_KEY.ID)).join(',');
		     		// 设置缓存
		    		this.setDataCache(data);
		    	}
		    	 this.set('showvalue',this.getShowValue(data));
		    	return this.set('value', value);
		    },
		    setDataCache:function(data){
		    	if($.isEmpty(data))
		    		return;
		    	var type =  this.get(FormOptions.t.mappings.DIALOG);
		    	for (var i = 0; i < data.length; i++) {
			    	var key = type+"@"+data[i][FormOptions.t.DATA_KEY.ID];
			    	FormRenderer.CUSTOM_DIALOG_CACHE[key]  = data[i];
				}
	
		    },
		    getShowValue:function(data){
		    	return _.compact(_.pluck(data, FormOptions.t.DATA_KEY.TITLE)).join(',')||'';
		    },
		    // 获取value存储的值
		    getModelValue:function(model){
		    	if(model){
		    		return  model.get("value."+this.get(FormOptions.t.table.COLUMN)+"."+this.get(FormOptions.t.table.ROW))||"";
		    	}else{
		    		return this.get('value')||"";
		    	}
		    },
		    // 处理json格式值
		    processJsonValue:function(value){
		    	if($.isEmpty(value))
		    		return [];
				if($.isArray(value))// 数组
					return value;

				try {
					var v = JSON.parse(value);
					if($.isEmpty(v))
						 v =[];
					return v
				} catch (e) {return [];	}
		    },
		    // 处理id值
		    processIDValue:function(value){
		    	var _this= this,
		    		ids = value.split(","),
		    		datas=[];
				_.each(ids,function(id,i){
					var obj = {};
					obj[FormOptions.t.DATA_KEY.ID] = id;
					$.extend(obj,_this.getNameValue(id));
					datas.push(obj);
				});
		    	return datas;
		    },
		    getNameValue:function(id){
		    	var _this = this;
	    		var type =  this.get(FormOptions.t.mappings.DIALOG);
		    	var key = type+"@"+id;
		    	var d = FormRenderer.CUSTOM_DIALOG_CACHE[key];
		    	if($.isNotEmpty(d))
		    		return d;
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
								 d[FormOptions.t.DATA_KEY.TITLE] = d[results.title];
							 }
						 }
						 
						 FormRenderer.CUSTOM_DIALOG_CACHE[key] = d;
						  
						  return d;
					  }
		    	});
		    	return FormRenderer.CUSTOM_DIALOG_CACHE[key];
		    },
		    getDialogValue:function(model){
		    	var value = this.getModelValue(model);
		    	return this.getDialogData(value);
		    },
		    getDialogData:function(value){
		       	if($.isEmpty(value))
		    		return [];
				var store = this.getStore();
		       	if($.isEmpty(value))
		    		return [];
		    	if('json' == store){
		    		return this.processJsonValue(value);
		    	}else if('id' == store){// id需要查询数据库。返回名称
		    		return this.processIDValue(value);
		    	}else{
		    		return [];
		    	}
		    },
		    toText:function(){
		    	return  this.getShowValue(this.getDialogValue());
		    }
		  });
	  // 自定义对话框
	  FormRenderer.Views.ResponseFieldCustomDialog = FormRenderer.Views.ResponseField.extend({
		    field_type: 'customDialog',
		    events: function(){
		    	return _.extend({}, FormRenderer.Views.ResponseField.prototype.events,this.extEvents);
		    },
		    extEvents: {
		        'click [data-toggle="customdialog"]':function(e){
		    		e.preventDefault(); e.stopPropagation();
		        	return	FormRenderer.Views.ResponseFieldCustomDialog.prototype.selectDialog.apply(this, arguments);
		    	 }
		    },
		    selectDialog:function(e){
	    		if(this.isRead() && !this.model.isSubTable())
		    		return
	    		var _this =  this,
			    		$el =  $(e.target),
			    		model,
			    		modelMap,
			    		bindParams,
			    		isSubTable;
	    		
	    		bindParams  = FormRenderer.Views.ResponseFieldCustomDialog.prototype.getBindParams.call(this,$el);
	    		model  = bindParams.model;
	    		modelMap = bindParams.modelMap;
	    		isSubTable = bindParams.isSubTable;
		    	if($.isEmpty(model)){
		    		DialogUtil.msg("model未定义");
	    			return false;
		    	}
		    	
		   		// 如果该子表只读
	     		if(this.model.isSubTable() &&  this.model.columnIsRead(model.get(FormOptions.t.table.COLUMN))){
	     			return;
	     		}
		    	
		    	var	dialogType =	model.get(FormOptions.t.mappings.DIALOG_TYPE) || 'dialog',
		    			dialogKey =  model.get(FormOptions.t.mappings.DIALOG),
		    			bindObj = 	model.get(FormOptions.t.mappings.BIND),
		    			paramsObj = 	model.get(FormOptions.t.mappings.PARAMS),
		    			isSingle = FormRenderer.toBoolean(model.get(FormOptions.t.mappings.IS_SINGLE));
			
		    	var dynamicParams  = FormRenderer.Views.ResponseFieldCustomDialog.prototype.getDynamicParams.call(this,$.extend({
		    		paramsObj : paramsObj
		    	},bindParams));
		    	
		    	if(dialogType =='dialog' ){
		    		if($.isEmpty(dialogKey)){
		    			DialogUtil.msg("未绑定对话框");
		    			return;
		    		}
		    	
		    		DataTemplateUtil.open(dialogKey,{
		    		 	isSingle : isSingle,
		    			params:dynamicParams,
		    			shows:{
		    				data: model.getDialogValue((isSubTable?this.model:null))
		    			},
		    			callback:function(data){
				    		if(!data &&data.length == 0)
				    			return;
				    		FormRenderer.Views.ResponseFieldCustomDialog.prototype.renderValue.apply(_this,[model,data]);
				    		
				    		_.each(bindObj,function(obj,i){
				    			var name = obj.name,field = obj.fieldName;
				    			if($.isEmpty(name) || $.isEmpty(field) || !modelMap[name])
				    				return true;
				    			// 设置指定的值 ,不同类型设置的值也是不同的，需要设置
			    				FormRenderer.Views.ResponseFieldCustomDialog.prototype.setBindValue.call(_this,	$.extend({
				    				data : data,
				    				field:field,
			    					name:name,
						    	},bindParams));
				    		});
		    			}
		    		});
		    	} else if(dialogType =='custom' ){
		    		if($.isEmpty(dialogKey)){
		    			DialogUtil.msg("未绑定对话框");
		    			return;
		    		}
		    	
			    	CustomDialogUtil.open(dialogKey,dynamicParams,function(data){
			    		if(!data &&data.length == 0)
			    			return;
			    		_.each(bindObj,function(obj,i){
			    			var name = obj.name,field = obj.fieldName;
			    			if($.isEmpty(name) || $.isEmpty(field) || !modelMap[name])
			    				return true;
			    			// 设置指定的值 ,不同类型设置的值也是不同的，需要设置
		    				FormRenderer.Views.ResponseFieldCustomDialog.prototype.setBindValue.call(_this,	$.extend({
			    				data : data,
			    				field:field,
		    					name:name,
					    	},bindParams));
			    	
			    		});
			    	});
		    		
		    	}else if(dialogType =='url' ) {
		    		CustomDialogUtil.dialog({
		    			url :__ctx+bindObj.url,
		    			params:dynamicParams,
		    			callback:function(data){
		    				if(!data &&data.length == 0)
				    			return;
				    		_.each(bindObj.fields,function(obj,i){
				    			var name = obj.name,field = obj.fieldName;
				    			if($.isEmpty(name) || $.isEmpty(field) || !modelMap[name])
				    				return true;
				    			
				    			// 设置指定的值 ,不同类型设置的值也是不同的，需要设置
			    				FormRenderer.Views.ResponseFieldCustomDialog.prototype.setBindValue.call(_this,	$.extend({
				    				data : data,
				    				field:field,
			    					name:name,
						    	},bindParams));
				    		});
		    			}
		    		})
		    	}
		    },
		    getBindParams:function($el){
				var	model = this.model,
			    		modelMap = {},
			    		viewMap = {},
			    		isSubTable =this.model.isSubTable()?true: false,
	    				parentEl  = $el.closest("[data-toggle='customdialog']"),
	    				options= parentEl.find("[data-control='customdialog']").data();
						modelFunction=this.model;
					if(isSubTable){// 子表
						model = this.model.response_columns[options["column"]];
						model.set(FormOptions.t.table.ROW,options["row"]);
						modelMap = this.model.response_models;
						viewMap = this.form_renderer.response_views;
					}else{
						viewMap = this.form_renderer.response_views;
						modelMap = this.form_renderer.response_models;
					}
					
					return {
						modelFunction:modelFunction,
						model:model,
	  					isSubTable:isSubTable,
	  					viewMap:viewMap,// 视图主表用
	  					modelMap:modelMap,// model子表用
	  					options:options
  				}
		    },

		    getDynamicParams:function(options){
		    	if($.isEmpty(options.paramsObj))
		    		return {};
		    	var params ={};
		    	_.each(options.paramsObj,function(obj,i){
		    		var value,bindTbName,bindColumn;
		    		if(obj.value){
		    			str = obj.value.split(".");
		    			if(str.length >1){
		    				bindTbName = str[0];
			    			bindColumn = str[1];
		    			}else{
		    				bindColumn = str[0];
		    			}
		    		}
		    		if(obj.mode &&  obj.mode == 'bind'){// 绑定字段
		    			if(options.isSubTable){// 子表
		    				subtbName = options.model.get("code")//子表表名
		    				if(subtbName = bindTbName &&  options.modelMap[bindColumn]){
		    					$modelMap = options.modelMap[bindColumn]
		    					value = options.modelFunction.getExistingValue($modelMap.get(FormOptions.t.table.COLUMN),options.options[FormOptions.t.table.ROW])
		    				}else if(options.viewMap[bindColumn]){
		    					value =options.viewMap[bindColumn].model.getValue();
		    				}
		    			}else{
		    				if(options.viewMap[bindColumn])
		    					value =options.viewMap[bindColumn].model.getValue();
		    			}
		    		}else{
		    			value =bindColumn;
		    		}
		    		if($.isNotEmpty(value))
		    			params[obj.fieldName] = value;
		    	});
		    	return params;
		    },
		    setBindValue:function(params){
		    	var val =  _.pluck(params.data,params.field).join(",");
				if(params.isSubTable){// 子表
					var col = params.modelMap[params.name].get(FormOptions.t.table.COLUMN);
					var row = params.options[FormOptions.t.table.ROW];
					this.model.setExistingDefaultValue(col,row,val);
					this.render();
				}else{
					var curView = params.viewMap[params.name];
					curView.model.setExistingValue(val);
					curView.render();
				}
		    },
		    renderValue:function(model,data){
				if(this.model.isSubTable()){// 子表
					var store = model.getStore(),
						value = "";
				 	if('json' == store){
			    		value = $.isEmpty(data)?"":JSON.stringify(data);
			    	}else if('id' == store){// id需要查询数据库。返回名称
			       		value  = _.compact(_.pluck(data, '#id#')).join(',');
			       		// 设置缓存
			    		model.setDataCache(data);
			    	}
					this.model.setExistingDefaultValue(model.get(FormOptions.t.table.COLUMN),model.get(FormOptions.t.table.ROW),value);
					this.model.setValue(model.get(FormOptions.t.table.COLUMN),model.get(FormOptions.t.table.ROW), value);
					return this.render();
				}else{
					this.model.setValue(data);
					return this.render();
				}
			}
		  });  
}).call(this);  	

// =========== 关联数据 字段 ===================
(function() {   
	FormRenderer.Models.ResponseFieldLinkdata = FormRenderer.Models.ResponseField.extend({
	    field_type: 'linkdata',
	    toText:function(){
	    	 return _.compact(_.pluck(this.getData(), 'text')).join(',');
	    },
	    getMultiple:function(){
	    	return this.get(FormOptions.t.mappings.MULTIPLE)=='Y'?true:false;
	    },
	    getData:function(){
		       var dataUrl =  __ctx+ "/platform/data/dataTemplate/getLinkDataByKey.htm",
	       			value =  this.get('value'),
		       		 linkConfig =  this.get(FormOptions.t.mappings.LINK_CONFIG)||{},
		       		 __key =  this.get(FormOptions.t.mappings.LINKDATA),
		    	     __linkKey  = linkConfig.id||'id_',
		    	     __linkText  = linkConfig.text||'name_',
		    	     rtn = [];
		       	if($.isEmpty(value))
					return rtn;
				// 去服务器取吧
			  $.ajax({
		            url: dataUrl, 
		            data: {
		            	"key": __key,
		            	 "dataKey":__linkKey,
		            	 "dataKeyValue":value,
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
		                    	item.id = item[__linkKey];
		                    	item.text = item[__linkText];
		                    	rtn.push(item);
		                    }
		                }
		            } 
		        }); 
			  
			    return rtn;
		    },
	  });
	
	// 关联数据
	  FormRenderer.Views.ResponseFieldLinkdata = FormRenderer.Views.ResponseField.extend({
		    field_type: 'linkdata',
		    initialize: function() {
		        FormRenderer.Views.ResponseField.prototype.initialize.apply(this, arguments);
		        var _this = this;
		        $(window).resize(function() {
		        		if(_this.$view)
		        			 _this._onResize();
		        });
		        return this.on('shown', function() {
		          var _ref;
		          this.refreshing = true;
		          if ((_ref = this.$view) != null) {
		        	  	this._onResize();
			       }
		          return setTimeout((function(_this) {
		            return function() {
		              return _this.refreshing = false;
		              
		            };
		          })(this), 0);
		        });
		
		    },
		    _onResize:function(){
		    	var container = this.$view.siblings(".select2-container"),
		    		width =	this.$view.parent().outerWidth(false) + 'px';
		     	container.width(width);
		    },
		    render: function() {
		        FormRenderer.Views.ResponseField.prototype.render.apply(this, arguments);
		     	
		        setTimeout((function(_this) {
		             return function() {
		            	 if(_this.canInput())
		            		 _this._initView();
		            	 else
		            		 _this.loadLinkAtrr();
		             };
		         })(this), 0);
		       

		        return this;
		    },
		    // 初始化视图
		    _initView:function(){
		    	var $el = 	this.$view = 	 $("#"+this.getDomId()),
		    		_this = this,
					url =  __ctx+ "/platform/data/dataTemplate/getLinkData.htm",
					multiple = this.model.getMultiple(),
		    	    disabled = this.isRead()?true:false,
					clear = true,
					placeholder =  this.model.get(FormOptions.t.mappings.PLACEHOLDER)?this.model.get(FormOptions.t.mappings.PLACEHOLDER):'请选择',
		    	    __key =  this.model.get(FormOptions.t.mappings.LINKDATA),
		    	    linkConfig =  this.model.get(FormOptions.t.mappings.LINK_CONFIG)||{},
		    	    __linkKey  = linkConfig.id||'id_',
		    	    __linkText  = linkConfig.text||'name_',
		    	    rows = 20,
		    	    val = _this.model.getData(),
					dataValue = $.isNotEmpty(val) ?val:[];
	
			var params = {
					theme: "bootstrap",
					language: "zh-CN",
					multiple: multiple,
					allowClear: clear,
					disabled:disabled,
					placeholder:placeholder,
					formatSelection : function (item) {  // 选择结果中的显示
						return item.text;
					},
		    		formatResult : function (item) {// 【搜索】列表中的显示
						return (item != undefined && item.text != undefined)?item.text:"";  
		    		},
		    		createSearchChoice : function(term, data) {	// 创建搜索结果（使用户可以输入匹配值以外的其它值）
				        return {id: term, text: term};
				    },
					escapeMarkup : function (markup) {
						return markup;
					},
					initSelection:function (element, callback) {
				       	return  callback(dataValue);
		    		},
		    		templateSelection:function(item){
		    	    	if(!item || $.isEmpty(item.id))
				    		return  placeholder;
				    	return item? item.text:'';
		    		},
		    		templateResult: function (item) {
					    if (!item || !item.id) { 
					    	return "";
					    }
					    return item.text;
					},
					ajax : {
	    				    url: url,
	    				    dataType: 'json',
	    				    delay: 250,
	    				    data: function (_params) {
	    				    	
	    				    	return {
	    				    		queryValue:_params.term,// 查询
	    				    		queryKey:__linkText,
	    				    		dynamicParams:_this.getDynamicParams(),
	    				    		key:__key,
	    				    		page : _params.page|| 1,// 第几页，分页哦
	    				    		rows : rows// 每页显示多少行
	    				    	};
	    				    }
	    					,processResults: function (results,params) {
	    						var data = [];
	    						if(results.result){
	    				     		data = results.data;
						            // 重命名字段名
						            for (var i = 0; i < data.length; i++){
						            	var item =  data[i];
						                data[i].id = item[__linkKey];
						                data[i].text = item[__linkText];
						            }
	    						}else{
	    							DialogUtil.msg(results.msg);
	    						}
	    		
					            params.page = params.page || 1;
					            return {
					                results: data,
					                pagination : {
		                                more :  (params.page * rows) < results.totalCount// 总页数为10，那么1-9页的时候都可以下拉刷新
		                            }
					            };
	    					 },
	    				     cache: true
	    				}
				};
			$el.select2(params);
			

			var linkageParams  = this.getLinkageParams($el);
			
			$el.on("change", function (e) {
		    		var data = $el.select2("data"),value = "";
					if($.isNotEmpty(data)){
						if(multiple){
							value =  _.compact(_.pluck(data, 'id')).join(',');
				    	}else{
				    		value = data[0].id;
				    	}
					}
					_this.model.set("value",value);
					// / 设置联动数据
					_this.linkageData(linkageParams,data,true);
		         });
			
				// 初始化联动数据
				$el.on("initLinkData", function (e) {
					if($.isEmpty(arguments) || multiple)
						return;
					_this.linkageData(linkageParams,_.toArray(arguments).slice(1));
				});
				$el. trigger("initLinkData",dataValue);
			
		    },
		    getDynamicParams:function(){
		    	var dynamicParams ={},
		    		paramsObj =  this.model.get(FormOptions.t.mappings.LINK_CONDITION)||{};
		    	if($.isNotEmpty(paramsObj)){  //动态传参 
		    		var	viewMap = this.form_renderer.response_views;
		    		var bindParams ={
		   					isSubTable:false,//目前只支持主表
		   					viewMap:viewMap// 视图主表用
		    		}
			    	dynamicParams  = FormRenderer.Views.ResponseFieldCustomDialog.prototype.getDynamicParams.call(this,$.extend({
			    		paramsObj : paramsObj
			    	},bindParams));
		    	}	
		    	return JSON.stringify(dynamicParams);
		    },
		    loadLinkAtrr:function(){
		 	    var val = this.model.getData(),
		 	    	dataValue = $.isNotEmpty(val) ?val:[];
		    	this.linkageData(this.getLinkageParams(this.$el),dataValue);
		    },
		    getLinkAttr : function(){
		    	return this.model.get(FormOptions.t.mappings.LINK_ATTR)||{};
		    },
		    getLinkLinkage:function(){
		    	return this.model.get(FormOptions.t.mappings.LINK_LINKAGE)||{};
		    },
		    getLinkageParams:function($el){
				var	model = this.model,
			    		modelMap ={},
			    		viewMap ={},
			    		isSubTable =this.model.isSubTable()?true: false,
			    		options = $el.data();
						
					if(isSubTable){// 子表
						model = this.model.response_columns[options["column"]];
						model.set(FormOptions.t.table.ROW,options["row"]);
						modelMap = this.model.response_models;
					}else{
						viewMap = this.form_renderer.response_views;
						modelMap = this.form_renderer.response_models;
					}
					
				return {
	  					isSubTable:isSubTable,
	  					viewMap:viewMap,// 视图主表用
	  					modelMap:modelMap,// model子表用
	  					options:options
  					}
		    },
		    linkageData:function(params,data,isLinkage){
		    	var _this = this,
		    		multiple = this.model.getMultiple();
		    	if(multiple)
		    		return;
		    	// / 配置联动数据
				_.each(this.getLinkAttr(),function(obj,i){
	    			var name = obj.name,field = obj.field;
	    			if($.isEmpty(name) || $.isEmpty(field))
	    				return true;
	    			params["name"] = name ;
	    			params["value"] = _.pluck(data,field).join(",") ;
					FormRenderer.Views.ResponseFieldLinkdata.prototype.setBindValue.call(_this,params);
				});
				if(isLinkage){
					_.each(this.getLinkLinkage(),function(obj,i){
		    			var name = obj.name,field = obj.field;
		    			if($.isEmpty(name) || $.isEmpty(field))
		    				return true;
		    			params["name"] = name ;
		    			params["value"] = _.pluck(data,field).join(",") ;
						FormRenderer.Views.ResponseFieldLinkdata.prototype.setBindValue.call(_this,params);
					});
				}
		    },
		    setBindValue:function(params){
		    	var val = params.value;
				if(params.isSubTable){// 子表
					var col = params.modelMap[params.name].get(FormOptions.t.table.COLUMN),
						 row = params.options[FormOptions.t.table.ROW];
					this.model.setExistingDefaultValue(col,row,val);
					this.render();
				}else{
					var curView = params.viewMap[params.name];
					if(!curView){
						console.warn(params);
						return;
					}
					curView.model.setExistingValue(val);
					curView.render();
				}
		    }
	  });  
}).call(this);  



// =========== 地址 字段 ===================
(function() {  
	FormRenderer.Models.ResponseFieldAddress = FormRenderer.Models.ResponseField.extend({
	    field_type: 'address',
	    validators: [FormRenderer.Validators.AddressValidator],
	    setExistingValue: function(x) {
	    	if($.isNotEmpty(x)){
	    		this.setValue( this.toJSONValue(x));
	    	}else{
	        	FormRenderer.Models.ResponseField.prototype.setExistingValue.apply(this, arguments);
	    	}
	    },
	  	getDefaultValue:function(){
	  		var val = FormRenderer.Models.ResponseField.prototype.getDefaultValue.apply(this, arguments)||{};
			  if(this.get(FormOptions.t.mappings.IS_STREET))
				  val.street = this.get( FormOptions.t.mappings.STREET);
			  return val;
	  	},
	    setValue:function(x){
	    	return this.set('value',x);
	    },
	    toJSONValue:function(value){
			if($.isNotEmpty(value)){
				if($.isPlainObject(value)){
					return value;
				}else{
					try {
						return JSON.parse(value);
					} catch (e) {return {};	}
				}
			}else{
		 		return {};	
			}
	    },
	    getAddress:function(){
			return this.toJSONValue( this.get('value')||"");
	    },
	    hasValue:function(){
	    	var v = this.getAddress();
        	if($.isNotEmpty(v)){
        		var flag = true;
        		for(var k in v){
        		    if($.isNotEmpty(v[k])){
        		    	flag =  false;
        		    	break;
        		    }
        		}
        		if(flag)
        			return false;
	        	return true;
		    }else{
				return false;
		    }
	    },
	    getValue: function() {
	        if (this.hasValue()) {
	        	return JSON.stringify(this.getAddress());
	        } else {
	        	return "";
	        }
	    },
	    getStreet:function(){
	    	return this.getAddress()["street"]||"";
	    },
	    getTop:function(){
	    	return  this.get(FormOptions.t.mappings.TOP)?this.get(FormOptions.t.mappings.TOP):'country';
	    },
	    getLevel:function(){
	    	return this.get(FormOptions.t.mappings.LEVEL)? this.get(FormOptions.t.mappings.LEVEL):'district';
	    },
	    getTopval:function(){
	    	var top = this.getTop(),topval= this.get(FormOptions.t.mappings.TOPVAL);
	    	if($.isEmpty(topval) && top == 'country')
	    		return '0';
	    	if($.isEmpty(topval) && top != 'country'){
	    		DialogUtil.alert("未设置最大区域值");
		  		return '';
	  		}
	    	var rtnVal = [];
	    	if(top == 'country'){
	    		return '0';
	    	}else if(top == 'province'){
	    		 rtnVal.push(topval['country']) ;
	    	}else if(top == 'city'){
	    		 rtnVal.push(topval['country']) ;
	    		 rtnVal.push(topval['province']) ;
			}else if(top == 'district'){
		   		 rtnVal.push(topval['country']) ;
	    		 rtnVal.push(topval['province']) ;
	    		 rtnVal.push(topval['city']) ;
			}
	    	return rtnVal.join(",");
	    },
	    getShowTopval:function(){
	    	var top = this.getTop(),rtnVal= '0',topval= this.get(FormOptions.t.mappings.TOPVAL);
	    	if($.isEmpty(topval))
	    		return rtnVal;
	    	if(top == 'province'){
	    		 rtnVal = topval['country'] ;
	    	}else if(top == 'city'){
				rtnVal =  topval["province"];
			}else if(top == 'district'){
				rtnVal =    topval["city"];
			}
	    	return rtnVal;
	    },
	    // 获取展示的值
	    getTextValue:function(data,value){
	    	var rtn ='';
	    	if($.isEmpty(value))
	    		return rtn;
	        $.each(data, function (i, address) {
	           $.each(address, function (j, v) {
	        	   	if(v.code == value){
	        	   		rtn = v.address
	        	   		return false;
	        	   	}
	           });
	         	if($.isNotEmpty(rtn))
	         		return false;
	        });
	    	return rtn;
	    },
	    getAddressData:function(v,type){
	    	if($.isEmpty(v))
	    		return "";
			var top = this.getTop(),
				level = this.getLevel(),
				topval = this.getShowTopval();
			
	    	if(type === 'country' && v.country ){
	    		topval  =  (top == 'country') ?topval:0;
	    		if($.isEmpty(topval))
	    			return "";
	    		return this.getTextValue(WorldDistricts[topval],v.country);
	    	} else if(type === 'province' && v.province){
	    		var topval1   = $.isNotEmpty(v.country)?v.country:null;
	    		if($.isEmpty(topval1) && top == 'province')
	    			topval1 = topval;
	    		if($.isEmpty(topval1) )
	    			return "";
	    		return this.getTextValue(WorldDistricts[topval1],v.province);
	    	} else if(type === 'city' && v.city){
	    		var topval1   = $.isNotEmpty(v.province)?v.province:null;
	    		if($.isEmpty(topval1) && top == 'city')
	    			topval1 = topval;
	    		if($.isEmpty(topval1) )
	    			return "";
		 		return  WorldDistricts[topval1]?(WorldDistricts[topval1][v.city]||""):"";
		 	} else	if(type === 'district' && v.district ){
		 		var topval1   = $.isNotEmpty(v.city)?v.city:null;
	    		if($.isEmpty(topval1) && top == 'district')
	    			topval1 = topval;
	    		if($.isEmpty(topval1) )
	    			return "";
		 		return  WorldDistricts[topval1]?(WorldDistricts[topval1][v.district]||""):"";
		 	}else{
		 		return "";
		 	}
	    },
	    toText:function(){
	    	var v = this.get("value");
	    	if($.isEmpty(v))
	    		return "";
	    	return this.getAddressData(v,'country')+this.getAddressData(v,'province')+this.getAddressData(v,'city')+this.getAddressData(v,'district')+(v.street?v.street:"");
	    }
	  });
	
	// 地址控件
	  FormRenderer.Views.ResponseFieldAddress = FormRenderer.Views.ResponseField.extend({
		    field_type: 'address',
		    render: function() {
		        FormRenderer.Views.ResponseField.prototype.render.apply(this, arguments);
		        setTimeout((function(_this) {
		            	// 初始化数据
		            	var v =  _this.model.getAddress(),
		            		$el = _this.$el.find("[data-toggle='address']"),
		            		top = _this.model.getTop(),
		            		level = _this.model.getLevel(),
		            		topval = _this.model.getTopval();
		            	$el.citypicker({
		            		responsive:true,
		            		top:top,
		            		level:level,
		            		topval: topval,// 需要最顶级的值
		            		placeholder:'请选择',
		            		country: _this.model.getAddressData(v,'country'),
		            		province: _this.model.getAddressData(v,'province'),
		            		city:_this.model.getAddressData(v,'city',topval),
		            		district:_this.model.getAddressData(v,'district',topval)
		            	}).on("cp:updated",function(el){
				       		var cp = $el.data('citypicker'),
				       			val  ={
				       				'country':cp.getCode('country'),
				       				'province':cp.getCode('province'),
				       				'city':cp.getCode('city'),
				       				'district':cp.getCode('district')
				       			};
				       		_this.model.setValue(val);
				       }).on("cp:reset",function(el){
				    	   var street = _this.model.getStreet();
				    	   _this.model.setValue("");
				    	   var val = {};
				    	   if($.isNotEmpty(street)){
				    		   val["street"] = street;
				    		   _this.model.setValue(val);
				    	   }
				       		
				       });
		            	
		            	// reset
		            	
		            	if(_this.isRead())
		            		$el.citypicker('unbind');
		          })(this), 0);
		        return this;
		    }
		  });  
	
}).call(this);  
  


// =========== 签名 字段 ===================
(function() {  
	  FormRenderer.Models.ResponseFieldSignature = FormRenderer.Models.ResponseField.extend({
		    field_type: 'signature',
		    getHeight:function(){
		    	return this.get(FormOptions.t.mappings.HEIGHT) ||150;
		    }
		  });
	  
	  // 签名控件
	  FormRenderer.Views.ResponseFieldSignature = FormRenderer.Views.ResponseField.extend({
		    field_type: 'signature',
		    initialize: function() {
		        FormRenderer.Views.ResponseField.prototype.initialize.apply(this, arguments);
		        return this.on('shown', function(rf) {
		          var _ref;
		          this.refreshing = true;
		          if ((_ref = this.$view) != null) {
		        	  	this._onResize();
			       }
		          return setTimeout((function(_this) {
		            return function() {
		              return _this.refreshing = false;
		            };
		          })(this), 0);
		        });
		    },
		    events: function(){
		    	return _.extend({}, FormRenderer.Views.ResponseField.prototype.events,this.extEvents);
		    },
		    extEvents: {
		    	'click [data-toggle="signature-clear"]':  function(e){
		    		 return FormRenderer.Views.ResponseFieldSignature.prototype.clear.apply(this, arguments);
		    	},
		    	'click  [data-toggle="signature-undo"]': function(e){
		    		 return FormRenderer.Views.ResponseFieldSignature.prototype.undo.apply(this, arguments);
		    	}
		    },
		    _onResize:function(){
		    	 this.$view.jSignature("destroy");
            	// 重新渲染
		    	this.render();
		    },
		  
		    render: function() {
		        FormRenderer.Views.ResponseField.prototype.render.apply(this, arguments);
		        setTimeout((function(_this) {
		            return function() {
		            	_this._initView();
		            };	
			     })(this), 0);
		
		        return this;
		    },
		    _initView:function(){
		    	var _this = this;
		    	
		    	this.$view = $("#"+_this.getDomId());
		    	// 默认配置
		    	this.$view.jSignature({
            		signatureLine:true,
            		lineWidth:0.5,
            		width:'100%',
            		height:this.model.getHeight()
            		});
	             
		    	// 设置初始化值
            	if($.isNotEmpty(this.model.getValue())){
            		_this.$view.jSignature("setData","data:"+this.model.getValue());
            	}
            	if(this.isRead()){
            		this.setRead(true);
            	}else{
            		// 值改变 赋值给对象
            		this.$view.off("change").on('change', function(e){ 
            			var val ='',
            				data = $(e.target).jSignature('getData', 'image');
            			if (typeof data === 'string'){
            				val = data;
            			} else if($.isArray(data) && data.length === 2){
            				val = data.join(',')
            			} else {
            				try {
            					val = JSON.stringify(data);
            				} catch (ex) {
            					console.info(ex)
            				}
            			}
            			_this.model.set("value",val);
            		});
            	}
		    },
		    // 设置只读
		    setRead:function(state){
          		this.$view.jSignature('disable',state);
		    },
		    // 清除
		    clear:function(){
		    	this.$view.jSignature('clear');
		    	this.model.set("value","");
		    },
		    // 重做 这个功能未实现
		    undo:function(){
		    	this.$view.jSignature('undo');
		    }
    });  
	
}).call(this);  

// =========== office控件 字段 ===================
(function() {  
	FormRenderer.Models.ResponseFieldOffice = FormRenderer.Models.ResponseField.extend({
	    field_type: 'office',
	    getHeight:function(){
	    	return this.get(FormOptions.t.mappings.HEIGHT) ||500;
	    }
	  });
	 // office控件
	  FormRenderer.Views.ResponseFieldOffice = FormRenderer.Views.ResponseField.extend({
		    field_type: 'office',
		    initialize: function() {
		        FormRenderer.Views.ResponseField.prototype.initialize.apply(this, arguments);
		        return this.on('shown', function() {
		          var _ref;
		          this.refreshing = true;
		          if ((_ref = this.office) != null) {
		            _ref._onResize();
		          }
		          return setTimeout((function(_this) {
		            return function() {
		              return _this.refreshing = false;
		            };
		          })(this), 0);
		        });
		    },
		    _onResize:function(){
		    	
		    },
		    render: function() {
		        FormRenderer.Views.ResponseField.prototype.render.apply(this, arguments);
		        if (this.form_renderer) 
		        	this.initOffice();
		        return this;
		    },
		    
		    initOffice:function(){
		        try {
		        	// 配置
		        	this.initConfig();
		            return setTimeout((function(_this) {
			            return function() {
			            	_thisoffice = new OfficeControl({
			            		controlId : _this.getDomId(),
			            		fieldName : _this.model.get("name"),
			            		fileId : _this.model.get("value") || '',
			            		type : _this.model.get("field_options.office_type"),
			            		docName : _this.model.get("label") + new Date().getTime(),
			            		btns : _this.model.get("field_options.menubars"),
			            		callback : function(){
			            			_this.model.set("value", _thisoffice.options.fileId);
			            		}
			            	});
			            	_thisoffice.init();
			            };
			          })(this), 100);
				} catch (e) {
				}
		    },
		    
		    initConfig:function(){
		       	// var menubars = this.model.attributes.field_options.menubars;
		    }
	});
}).call(this);  

// =========== 子表 字段 ===================
(function() {  
	
	  FormRenderer.Models.ResponseFieldTable = FormRenderer.Models.ResponseField.extend({
		    field_type: 'table',
		    initialize: function() {
			   this.errorsub ={};
			   this.subModels= {};
			   this.subVeiws ={};
		      FormRenderer.Models.ResponseField.prototype.initialize.apply(this, arguments);
		      this.listenTo(this, 'change:value change:value.*', this.changeValue);
		      
		    },
		    initPresetParams :function(){
		        FormRenderer.Models.ResponseField.prototype.initPresetParams.apply(this, arguments);
		        this.code = this.get(FormOptions.t.mappings.NAME);
		     	this.set(FormOptions.t.mappings.CODE,this.code);
		    },
		    setExistingPermission:function(x){
		        FormRenderer.Models.ResponseField.prototype.setExistingPermission.apply(this, arguments);
		        if(this.form_renderer.options.isRead || $.isEmpty(x)) 
		        	return;
		        if(x.rights && x.rights == FormOptions.t.PERMISSIONS.REQUIRED){// 必填时候设置
		            this.set(FormOptions.t.mappings.REQUIRED, true);
		    	}
		    },
		    // 获取按钮权限
		    getButtonPermission :function(key){
		    	var buttons = this.get(FormOptions.t.mappings.BUTTONS_PERMISSION);
		    	if(buttons){
		    		return buttons[key]?buttons[key]:FormOptions.t.PERMISSIONS.SHOW;
		    	}else{// 默认是显示权限
		        	return FormOptions.t.PERMISSIONS.SHOW;
		    	}
		    },
		    getFieldsPermission :function(){
		    	var columnsPermission = this.get(FormOptions.t.mappings.COLUMNS_PERMISSION);
		    	if(columnsPermission){
		    		return {
						  fields:columnsPermission
					  };
		    	}else{ 
		    		return null;
		    	}
		    },
		    // 初始化子表字段
		    initResponseFields: function() {
		      var model, rf, _i, _len, _ref,response,_code;
		      
		      this.response_models ={};
		      this.response_columns= {};
		      // 公式计算
		      this.response_formula ={};
		      
		      _ref = this.get(FormOptions.t.mappings.COLUMNS);
		      if(!_ref)
		    	  return;
		      _code =  this.get(FormOptions.t.mappings.NAME);
		      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			        rf = _ref[_i]; 
			        rf.column =_i;
			        rf[	FormOptions.t.mappings.IS_SUB] = true;
			        rf[FormOptions.t.mappings.CODE] = _code;
			        model = new FormRenderer.Models["ResponseField" + (_str.capitalize(rf.field_type))](rf, {
			          form_renderer: this
			        });
		
			        // 初始化参数
			        model.initPresetParams();
		        	// =========设置预设值和加载默认数据
		        	model.setExistingValue(null);
				       	
		        	// =========设置计算公式 当前行的公式
		        	FormRendererUtil.setResponseFormula(model,this.response_formula);
		        	
			        this.response_models[rf.name] = model;
			        this.response_columns[_i] =model;
		      }
		    },
		    /**
			 * 合并改变子表的主表计算公式
			 */
		    mergeFormula:function(mainFormula){
		    	if($.isEmpty(mainFormula))
		    		return;
		    	var name = this.get(FormOptions.t.mappings.NAME);
		    	for(var key in  mainFormula){
		    		 var t = key.split(FormRendererUtil.TABLE_SEPARATOR);
		    		 if( t[0] != name)// 修改是当前表,则加入公式,否则不加入
		    			 continue;
				 	if(mainFormula[key]){
					 	if(!this.response_formula[key] )
	    			 		this.response_formula[key]  =[];
	    			 	for(var v in mainFormula[key]){// 把子表和主表的公式合并
	    			 		this.response_formula[key] .push(mainFormula[key][v]);
	    			 	}
				 	}
		    	}
		
		    },
		    /**
			 * 值改变 1、计算公式； 2、表单验证
			 */
		    changeValue:function(){
		    	// 改变的值
		    	var changed = this.changed.value,
		    		column =0,row=0;// 列
		    	if(!changed)// 只有值改变的就进行所有行和列的计算
		    		return  this.runCalFormulaAll();
		    	
		    	for(column in changed){
		    		for(row in changed[column]){
		    	    	// 找到需要公式计算的字段
		    	        this.runCalFormula(row,column);
		    	        // 改变值时候，进行子表验证
		    	        this.validateSub(row,column);
		    		}
		    	}
		    },
		    /**
			 * 进行公式计算
			 */
		    runCalFormula:function(row,column){
		        if($.isEmpty(this.response_formula))
		        	return;
		        var model,key;
		        model = this.response_columns[column];
	            if($.isEmpty(model))
		        	return;
	            key = model.get(FormOptions.t.mappings.CODE) +FormRendererUtil.TABLE_SEPARATOR+model.get(FormOptions.t.mappings.NAME);
		    	if(this.response_formula[key])
		    		FormRendererUtil.runCalFormula(this.response_formula[key],this.response_models,this,row);
		    },
		    /**
			 * 计算所有字段
			 */
		    runCalFormulaAll:function(){
		    	var columns = this.get(FormOptions.t.mappings.COLUMNS),row,_len,column,_len1;
		    	if(this.numRows == 0){ 
		    		   for (column = 0, _len1 =columns.length; column < _len1; column++) {
					      this.runCalFormula(0,column);
					   }
		    	}else{
		  	      for (row = 0, _len = this.numRows; row <= _len; row++) {
			    	   for (column = 0, _len1 =columns.length; column <= _len1; column++) {
					    	  this.runCalFormula(row,column);
					      }
			      }
		    	}
		    },
		    validate:function(){
	    	   FormRenderer.Models.ResponseField.prototype.validate.apply(this, arguments);
	    	   this.validateAll();
		    },
		    // 验证所有行数据
		    validateAll:function(){
		    	var columns = this.get(FormOptions.t.mappings.COLUMNS),row,_len,column,_len1;
		    	if(!columns  || columns.length <= 0)
		    		return;
			   for (row = 0, _len = this.numRows; row < _len; row++) {
			    	 for (column = 0, _len1 =columns.length; column < _len1; column++) {
					    this.validateSub(row,column);
					  }
			      }
		    }, 
		    // 验证子表
		    validateSub:function(row,column){
		    	if($.isEmpty(this.subModels) || $.isEmpty(this.subModels[row]))
		    		return;
		        var model = this.subModels[row][column];
		    	if($.isEmpty(model))
		    		return;
		        var errorIs, errorKey, errorWas, validator, _i, _len, _ref;
		        errorWas = model.get('error');
		        model.errors = [];
		        // 权限是隐藏、只读权限不验证
		        if(!model.isVisible ||
		        	model.field_type == 'hidden'  || 
		        	model.getPermission() == FormOptions.t.PERMISSIONS.READ || 
		        	model.getPermission() ==FormOptions.t.PERMISSIONS.READ_POST || 
		        	model.getPermission() ==FormOptions.t.PERMISSIONS.HIDE){
		            return;
		        }      
		        
		      // 把当前值设置到 该model 里面
		       var value = this.getValidateModelValue(model,column,row);
		        if ($.isEmpty(value)) {
		          if (model.canRequired()) {
		        	  model.errors.push(FormRenderer.t.errors.required);
		          }
		        } else {
		          _ref = model.validators;
		          if(_ref.length >0){
		  	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		  	          validator = _ref[_i];
		  	          if(validator){
		  		          errorKey = validator.validate(model,value);
		  		          if (errorKey) {
		  		        	  model.errors.push(this.formatError(errorKey));
		  		          }
		  	          }
		  	        }
		          }
		        }
		    errorIs = model.getError();
		      
	   		if(	!this.errorsub[row])
			   	this.errorsub[row]= [];
		   	  var code = this.get(FormOptions.t.mappings.CODE),$el = $('[data-el="'+code+'.'+column+'.'+row+'"]');
		  	  if(errorIs){
				model.set('error', errorIs);
				this.errorsub[row][column] = errorIs;
				// 获取当前
				$el.qtipError(errorIs);	
		  	  }else{
				model.set('error', null);
				this.errorsub[row][column] = null;
				$el.qtipSuccess(errorIs);	
		  	  }
		    },
		    canAddRows: function() {
		      return this.numRows < this.maxRows();
		    },
		    minRows: function() {
		      return parseInt(this.get(FormOptions.t.mappings.MINROWS), 10) || 0;
		    },
		    maxRows: function() {
		      if (this.get(FormOptions.t.mappings.MAXROWS)) {
		        return parseInt(this.get(FormOptions.t.mappings.MAXROWS), 10) || Infinity;
		      } else {
		        return Infinity;
		      }
		    },
		    getRowValue:function(row){
		    	if($.isEmpty(row) || !this.hasValue())
		    		return {};
		    	return this.getValue()[row];
		    },
		    // 验证值
		    getValidateModelValue:function(model,column,row){
		    	var val;
		    	 if (model.get(FormOptions.t.mappings.FIELD_TYPE) == 'checkbox'){
		    		 val = this.getCheckboxVal(this.getExistingValue(column,row)|| '');
		    	 }else{
		    		 val = this.getExistingValue(column,row);
		    	 }
		    	return val;
		    },
		    getExistingModelValue:function(model,column,row){
		    	var val = this.getExistingValue(column,row);
		    	if($.isEmpty(val))
		    		if($.isNotEmpty(model.attributes.value)){
		    			this.set("value."+column+"."+row,model.attributes.value)
		    			val=model.attributes.value
		    		}
		    		return val;
		    	if(model.get(FormOptions.t.mappings.FIELD_TYPE) == 'datePicker'){
		    		val = $.format(val,model.get(FormOptions.t.mappings.DATEFMT));
		    		this.setValue(column,row,val);
		    	}else if (model.get(FormOptions.t.mappings.FIELD_TYPE) == 'checkbox'){
		    		if(!$.isArray(val)  && !$.isPlainObject(val))// 数组就不进行设置值
		    			this.setValue(column,row,model.getTapValue(val));
		    	}else if (model.get(FormOptions.t.mappings.FIELD_TYPE) == 'radio'){
		    			this.setValue(column,row,model.getTapValue(val));
		    	}
				return val;
		    },
		    getExistingValue:function(column,row){
		    	return this.get("value."+column+"."+row);
		    },
		    setValue: function(column,row,x) {
		    	this.set("value." +column  + "." +row,x);
		    },
		    setExistingDefaultValue: function(column,row,x) {
		    	this.set("value." +column  + "." +row,x);
		    },
		    getKeyValue:function(key,column,row) {
		    	return this.get(key+"." +column  + "." +row);
		    },
		    setKeyValue: function(key,column,row,x) {
		    	this.set(key+"." +column  + "." +row,x);
		    },
		    getFirstColumnLength:function(x){
		    	return  _.isArray(x)?x.length:(this.getMode() == 'block'?1:0);
		    },
		    setExistingValue: function(x) {
		      this.numRows = Math.max(this.minRows(), this.getFirstColumnLength(x), 0);
		      if(  this.numRows  == 0)
		    	  return this;
		      // this.set(FormOptions.t.mappings.IS_DEFAULT,false);
		      return this.set('value', _.tap({}, (function(_this) {
		        return function(h) {
		        	
		          var column, i, j, _i, _ref1, _results;
		          _results = [];
		          for (i = _i = 0, _ref1 = _this.numRows - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) { // 循环行
		            _results.push((function() {
				              var _j, _len, _name, _ref2, _ref3, _results1;
				              _ref2 = this.getColumns();
				              _results1 = [];
				              for (j = _j = 0, _len = _ref2.length; _j < _len; j = ++_j) {
				                column = _ref2[j];
				                h[_name = "" + j] || (h[_name] = {});
				               
				                _results1.push(h["" + j]["" + i] = this.getPresetValue(column.name, i) || (x != null ? (_ref3 =x[i]) != null ? _ref3[column.name] : void 0 : void 0));
				              }
				              return _results1;
		            	}).call(_this));
		          }
		          return _results;
		        };
		      })(this)));
		    },
		    hasValue: function() {
		      return _.some(this.get('value'), (function(_this) {
		        return function(colVals, colNumber) {
		          return _.some(colVals, function(v, k) {
		            return !_this.getPresetValueByIndices(colNumber, k) && !!v;
		          });
		        };
		      })(this));
		    },
		    getColumnPermissionByName:function(columnName){
		    	 var _ref;
		    	return  (_ref = this.get(FormOptions.t.mappings.PERMISSION+".columns." + columnName))!= null ? _ref : FormOptions.t.PERMISSIONS.EDIT;;
		    },
		    getColumnPermission:function(column){
		    	return this.getColumnPermissionByName(column.name);
		    },
		    // 权限是否隐藏
		    columnIsHide: function(column) {
		      return this.getColumnPermission(column) ==FormOptions.t.PERMISSIONS.HIDE   ||  column.field_type =='hidden' ||  (column.field_options.hide );
		    },
		    // 权限是否只读
		    columnIsRead: function(column) {
		      if(this.form_renderer.options.isRead) return true;
		      return this.getColumnPermission(column) == FormOptions.t.PERMISSIONS.READ;
		    },
		    getPresetValue: function(columnName, row) {
		      var _ref;
		      return (_ref = this.get(FormOptions.t.mappings.PRESET_VALUES+"." + columnName)) != null ? _ref[row] : void 0;
		    },
		    getPresetValueByIndices: function(col, row) {
		      var _ref;
		      return (_ref = this.get(FormOptions.t.mappings.PRESET_VALUES+"." + (this.getColumns()[col].name))) != null ? _ref[row] : void 0;
		    },
		    getIsDefault:function(column,row){
		    	var isDefault = this.getKeyValue(FormOptions.t.mappings.IS_DEFAULT,column,row);
		    	if(!isDefault){
		    		this.setKeyValue(FormOptions.t.mappings.IS_DEFAULT,column,row,true);
		    		return true;
		    	}
		    	return isDefault;
		    },
		    getResponseModel:function(rf,permission){
		    	  var fieldType,row,column,model,attributes;
			        fieldType   = "ResponseField" + (_str.capitalize(rf.field_type));
				   	row = rf[FormOptions.t.table.ROW];
				   	column =	rf[FormOptions.t.table.COLUMN];
				   	if(!this.subModels[row])
						this.subModels[row]= [];
				  	if(this.subModels[row][column]){
				  		model = this.subModels[row][column];
				  		model.set(FormOptions.t.mappings.IS_SUB,true);
					 	model.setExistingPermission(permission);
				  	}else{
				  		attributes =  _.clone(this.response_columns[column].attributes);
					   	attributes[FormOptions.t.table.ROW] =row;
					   	attributes[	FormOptions.t.mappings.IS_SUB] = true;
					   	
					 	model =   new FormRenderer.Models[fieldType](attributes, {
					   		form_renderer: this
				        });
					 	model.setExistingPermission(permission);
					   	// 初始化值有几种
					   	// 1、新添加的默认值，2、重新渲染的，已经有值，3、初始表单有值的
						 // 当前的值
						model.set("value",this.getExistingModelValue(model,column,row));
						// 数据字典值特殊处理
						if(model.get(FormOptions.t.mappings.FIELD_TYPE) == 'dictionary'){
							var showValue = model.getDictionaryVal(model);
							model.set("showvalue",showValue);
							this.setKeyValue("showvalue",column,row,showValue);
						}
						else if(model.get(FormOptions.t.mappings.FIELD_TYPE) == 'customDialog'){
							var showValue = model.getShowValue(model.getDialogValue(this));
							model.set("showvalue",showValue);
							this.setKeyValue("showvalue",column,row,showValue);
						} 
				  	}
				   	
					 this.subModels[row][column]=model;

				return model;
		    },
		    getMode:function(){
		    	return this.get(FormOptions.t.mappings.MODE)?this.get(FormOptions.t.mappings.MODE):'inner';
		    },
		    getValue: function() {
		      var column,name, i, j,row,returnValue=[], _i, _j, _len, _ref, _ref1;
		      if(this.numRows == 0)
		    	  return returnValue;
		      var mode = this.getMode();
		      for (i = _i = 0, _ref = this.numRows - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
		          _ref1 = this.getColumns(), row ={};
		          for (j = _j = 0, _len = _ref1.length; _j < _len; j = ++_j) {
		            column = _ref1[j],name =column.name;
		            if(column.field_type== 'checkbox')
		            	row[name]  = this.getCheckboxVal(this.get("value." +j  + "." +i) || '');
		            else if (column.field_type== 'radio')
		            	row[name]  = this.getRadioVal(this.get("value." +j  + "." +i) || '');
		            else
		            	row[name] = this.get("value." +j  + "." +i) || '';
		          }
		          returnValue.push(row);
		        }
		  
		      return returnValue;
		    },
		    getRadioVal:function(x){
		    		if($.type(x) === "string")
		    			return x;
			      var k, returnValue=[],value={},v;
			      if ( $.isNotEmpty(x) && (typeof x === 'object') && x.merge)
			          delete x.merge;
			      $.extend(value, x);
			      for (k in value) {
			    	  v = value[k];
			        if(v === true)
			        	returnValue.push(k);
			      }
		      	return 	returnValue.join("");
		    },
		    getCheckboxVal:function(x){
			      var k, returnValue=[],value={},v;
			      if ( $.isNotEmpty(x) && (typeof x === 'object') && x.merge)
			          delete x.merge;
			      $.extend(value, x);
			      for (k in value) {
			    	  v = value[k];
			        if(v === true)
			        	returnValue.push(k);
			      }
		      	return 	returnValue.join(",");
		    },
		    toText: function() {
		      return _.flatten(_.values(this.getValue())).join(' ');
		    },
		    // 合计
		    calculateColumnTotals: function() {
		      var column, columnSum, columnVals, i, j, _i, _j, _len, _ref, _ref1, _results,v;
		      _ref = this.getColumns();
		      _results = [];
		      for (j = _i = 0, _len = _ref.length; _i < _len; j = ++_i) {
		        column = _ref[j];
		        columnVals = [];
		        for (i = _j = 0, _ref1 = this. numRows- 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
		        	v =this.get("value." + j + "." + i) || '';
		        	if(!_.isObject(v))// 修复对象的bug
		        		columnVals.push(parseFloat(v.replace(/\$?,?/g, '')));
		        }
		        columnSum = _.reduce(columnVals, function(memo, num) {
		          if (_.isNaN(num)) {
		            return memo;
		          } else {
		            return memo + num;
		          }
		        }, 0);
		        _results.push(this.set("columnTotals." + j, this.formatColumnSum(columnSum)));
		      }
		      return _results;
		    },
		    formatColumnSum: function(num) {
		      var parsed, precision, _ref;
		      if (num > 0) {
		        parsed = parseFloat(num.toFixed(10));
		        precision = ((_ref = ("" + parsed).split('.')[1]) != null ? _ref.length : void 0) || 0;
		        return _str.numberFormat(parsed, precision, '.', ',');
		      } else {
		        return '';
		      }
		    }
		  });
	  
	  // 子表单
	  FormRenderer.Views.ResponseFieldTable = FormRenderer.Views.ResponseField.extend({
		    field_type: 'table',
		    events: function(){
		    	return _.extend({}, FormRenderer.Views.ResponseField.prototype.events,this.extEvents,this.controlEvents());
		    },
		    extEvents: {
			      'click .js-action-button': 'actionRecord',// 按钮操作
			      'click .checkAll': 'handlerCheckAll',
			      'click .cbox':'handCheckBox'
		    },
		    controlEvents:function(){
		    	var events ={};
		    	_.extend(events, FormRenderer.Views.ResponseFieldDatePicker.prototype.extEvents);
		    	_.extend(events, FormRenderer.Views.ResponseFieldCustomDialog.prototype.extEvents);
		    	_.extend(events, FormRenderer.Views.ResponseFieldDictionary.prototype.extEvents);
		    	_.extend(events, FormRenderer.Views.ResponseFieldAttachment.prototype.extEvents);
		    	_.extend(events, FormRenderer.Views.ResponseFieldSelector.prototype.extEvents);
		    	return events;
		    },
		    handlerCheckAll:function(e){
		    	var $el =  $(e.target), state=$el.prop("checked");
				if(state) this.checkAll(true);
				else this.checkAll(false);
		    },
		    checkAll:function(checked){
		    	this.$el.find("input.cbox").each(function(){
		    		$(this).prop("checked", checked);
		    	});	
		    },
		    handCheckBox:function(e){
		       	var $el =  $(e.target), isChecked=$el.prop("checked"),checkAll = this.$el.find(".checkAll");
				if(!isChecked){
					checkAll.prop("checked", false);
				}else{
					var isAll = true;
			    	this.$el.find("input.cbox").each(function(){
						var isChecked=$(this).prop("checked");
						if(!isChecked){ 
							isAll = false;
						}
					});
					if(isAll){
						checkAll.prop("checked", true);
					}else{
						checkAll.prop("checked", false);
					}
				}
		    },
		  
		    initialize: function() {
		      FormRenderer.Views.ResponseField.prototype.initialize.apply(this, arguments);
		      this.initButtons();
		      this.isInit = true;
		      return this.on('shown', function() {
		        return this.initExpanding();
		      });
		    },
		    render: function() {
			  this.model.subModels ={};
		      FormRenderer.Views.ResponseField.prototype.render.apply(this, arguments);
		      // 初始化完成后再验证下所有字段
		  	   setTimeout((function(_this) {
				  _this.model.validateAll();
				})(this), 0);
		      this.initExpanding();
		      return this;
		    },
		    initButtons:function(){
				this.response_toolbar_buttons = [];
				this.response_manage_buttons = [];
		    	if(this.form_renderer.options.isRead) return this;
		 
				var model, rf, _i, _len,buttons=[];
					buttons =	this.model.get(FormOptions.t.mappings.BUTTONS);
				if($.isEmpty(buttons))
					return this;
				
				for (_i = 0, _len = buttons.length; _i < _len; _i++) {
					rf = buttons[_i];
					if(this.model.getButtonPermission(this._getActionCode(rf)) === FormOptions.t.PERMISSIONS.HIDE)
						continue;
					// 顶部按钮
					if (FormButtons.t.hasButton(rf.type,'toolbar',rf.position)){
						this.response_toolbar_buttons.push(rf);
					}
					// 管理列按钮
					if (FormButtons.t.hasButton(rf.type,'manage',rf.position)){
						// 特殊按钮处理
						if(this.canEditRow(rf))
							continue;
						this.response_manage_buttons.push(rf);
					}
					
				}
		    },
		    
		    initExpanding: function() {},
		    canEditRow:function(button) {
		    	return button.type == 'edit' && this.model.getMode() != 'dialog' ;
		    },
		    canManage : function(){
		    	if($.isEmpty(this.response_manage_buttons))
		    		return false;
		    	return true;
		    },
		    canToolbar : function(){
		    	if($.isEmpty(this.response_toolbar_buttons))
		    		return false;
		    	return true;
		    },
		    _getButton:function(index,isManage){
		    	if(isManage)
		    		return this.response_manage_buttons[index];
		    	else
		    		return this.response_toolbar_buttons[index];
		    },
		    _getActionCode:function(button){
				   return $.isNotEmpty(button.code)?button.code:(button.type=='custom'?(button.type+button.$index):button.type);
			 },
		    actionRecord:function(e){
			    e.preventDefault();
				var $el = $(e.currentTarget),
					isManage  =  $el.hasClass("btn-row")?true:false,
					index = $el.data("index"),
					button,
					params = {
						   model:this.model,
						   view: this
					},
				   type;
				// 按钮
				button= this._getButton(index,isManage);
				type = button.type;
				
				if(isManage)
					params["row"] = $el.closest('[data-row-index]').data('row-index');
				// 前置脚本
			    if(!this._subButtonEvent(this._getActionCode(button),isManage?"toolbar":"manage",params,true))
			    	return this;
			    
			    // 判断是否设置了自定义按钮
			    if(button.enabledCustom == 'Y' &&  !isManage){
			    	this.selectCustomDialogButton(button);
			    	return;
			    }
			    
			    
			    if(type == 'add'){// 添加
			    	return this.addRecord(e);
			    }else if(type == 'edit'){// 编辑
			    	return	this.editRecord(e);
			    }else if(type == 'remove'){// 删除
			    	if(isManage){
			    		return	this.removeRow(e);
			    	}else{
			    		return this.removeRecord(e);
			    	}
			    } else if(type == 'import'){
			    	return this.importRecord(e);
			    } else if(type == 'export'){
			    	return this.exportRecord(e);
			    }
			    return this;
		    },
		    selectCustomDialogButton:function(button){
		    	var _this =this,
		    	   	dialogKey = button.dialog.id,
		    		custom = button.custom,
		    		paramsObj =  custom.params,
		    		bindObj = custom.results,
		    		dynamicParams ={};
		    	if($.isEmpty(dialogKey)){
		    		DialogUtil.msg("未设置自定义对话框");
		    		return;
		    	}
		    	if($.isEmpty(bindObj)){
		    		DialogUtil.msg("未设置自定义对话框配置");
		    		return;
		    	}
		    	
		    	if($.isNotEmpty(paramsObj)){  //动态传参 
		    		var	viewMap = this.form_renderer.response_views;
		    		var bindParams ={
		   					isSubTable:false,//目前只支持主表
		   					viewMap:viewMap// 视图主表用
		    		}
			    	dynamicParams  = FormRenderer.Views.ResponseFieldCustomDialog.prototype.getDynamicParams.call(this,$.extend({
			    		paramsObj : paramsObj
			    	},bindParams));
		    	}
		    		
		    	DataTemplateUtil.open(dialogKey,{
		               params:dynamicParams,
				      callback:function(results){
				    		if(!results &&results.length == 0)
				    			return;
				            var data =[];
				            for (var _i = 0, _len = results.length; _i < _len; _i++) {
				              var result = results[_i],
				              		d ={};
					    		_.each(bindObj,function(obj,i){
					    			var name = obj.name,field = obj.fieldName;
					    			if($.isEmpty(name) || $.isEmpty(field) ){
					    				return true;
					    			}
					    			d[name] =  result[field];
					    		});
				              data.push(d);
				            }
			            _this.setCustomDialogModeValue(data);
				  	}
	    		});
		    },
		    /**
			 * 增加一行
			 */
		    addRecord: function() {
			  var mode = this.model.getMode();
			    if(mode == 'inner'){
			    	return this.innerMode();
			    }else if (mode == 'block'){
			    	return this.blockMode();
			    }else  if (mode == 'dialog'){
			    	this.dialogMode(true);
			    }else{
			    	return this.innerMode();
			    }
		    },
		   editRecord:function(e){
				var  row = $(e.currentTarget).closest('[data-row-index]').data('row-index');
			   this.dialogMode(false,row)
		   },
		   _subButtonEvent:function(action,position,params,isBefore){
				  // 前置事件
		       var  subButtonResult;
	    	   if(isBefore)
	    		   subButtonResult =	 $.JForm._beforeSubButton(this.form_renderer,action,position,params);
	    	   else
	    		   subButtonResult =	 $.JForm._afterSubButton(this.form_renderer,action,position,params);
                if (typeof (subButtonResult) != "undefined" && !subButtonResult) {
                    return false;
                }
                return true;
		   },
		   dialogMode:function(isAdd,row){
		    	var _this=this;
		    	var options = this.form_renderer.options;
		    	DialogUtil.dialog({
		    		  title:this.model.get("label"),
		    		  area: ['80%', '80%'],
		    		  params: {
		    			  response:{
		    				  responses:isAdd?null:this.model.getRowValue(row),
		    				  permissions:this.model.getFieldsPermission()
		    			  },
		       			  attrs:options.attrs,
		    			  code:this.model.get(FormOptions.t.mappings.CODE),
		    			  fields:this.model.get(FormOptions.t.mappings.COLUMNS)
		    		  },
		    		  content: __ctx+"/platform/form/formDef/dialogMode.htm",
		    		   btn:[{
				            	label: '确定',
				            	iconCls:'btn btn-primary fa fa-ok',
				                action: function(dialog,index) {
				              	  var  data = DialogUtil.getChildFrameWindow(index).getData();
				              	  if(!data)
				              		  return;
				              	  if(isAdd){
				              		  _this.model.numRows++;
				              		  row = _this.model.numRows-1;
				              	  }
				              	  // 设置值
				              	  _this.setDialogModeValue(data,row);
				              	  DialogUtil.close(index);
				                }
			    		   },{
			   	        	label: '取消',
			   	        	iconCls:'btn btn-danger fa fa-cancel',
			   	            action: function(dialog,index) {
			   	            	DialogUtil.close(index);
			   	            }
		   	        }]
		    	});
		  
		    },
		    setCustomDialogModeValue:function(data){
		  	  for (var _i = 0, _len = data.length; _i < _len; _i++) {
		    	   	var row = this.model.numRows;
			        this.model.numRows++;
	          	    this.setDialogModeValue(data[_i],row);
		    	}
		    },
		    /**
			 * 设置弹窗的值
			 */
		    setDialogModeValue:function(data,row){
			  // 设置值
				var columns =  this.model.response_columns;
				for (var col  in columns ){
					this.model.setExistingDefaultValue(col,row,	data[	columns[col].get(FormOptions.t.mappings.NAME)]);
				}
				this.render();
				return this;
		    },
		    /**
			 * 表内编辑模式
			 */
		    innerMode:function(){
				  this.model.numRows++;
				  // 设置默认值
				  this.setDefaultValue();
				  this.render();
				 return this;
		    },
		    /**
			 * 新增一行时候设置默认值
			 */
		    setDefaultValue:function(){
		    	var row =  this.model.numRows-1,
		    		  columns =  this.model.response_columns;
		    	for (var col  in columns ){
			       this.model.setExistingDefaultValue(col,row,columns[col].getValue());
			    }
		    },
		    /**
			 * 块模式
			 */
		    blockMode:function(){
				  this.model.numRows++;
				  this.render();
				  // 设置默认值
			      this.setDefaultValue();
				 return this;
		    },
		    /**
			 * 删除当前记录
			 */
		    removeRow: function(e) {
		       e.preventDefault();
		    	var  idx = $(e.currentTarget).closest('[data-row-index]').data('row-index');
		    	if($.isNotEmpty(idx))
		    		this.removeSelectRecords([idx]);
		    },
		    /**
			 * 删除多条记录
			 */
		    removeRecord:function(e){
		    	if(this.model.getMode() == 'block'){
		    		this.removeRow(e);
		    	}else{
		    		this.removeSelectRecord(e);
		    	}
		    },
		    removeSelectRecord:function(e){
		    	var rows =[];
		    	this.$el.find("input.cbox").each(function(){
					var isChecked=$(this).prop("checked");
					if(isChecked)
						rows.push( $(this).closest('[data-row-index]').data('row-index'));
				});
		    	
		    	if(rows.length == 0){
		    		DialogUtil.msg("请选择记录！");
		    		return;
		    	}
		    	this.removeSelectRecords(rows);
		    },
		    /**
			 * 删除选中的记录
			 */
		    removeSelectRecords:function(rows){
		    	var _this =this;
				DialogUtil.confirm('确认删除吗？',function(rtn){
					if(!rtn)
						return;
		    	if(rows.length ==0)
		    		return;
			    var  newVal = _this.getNotRemoveData(rows);
			    	newVal = _this.getNewVal(newVal);
			    _this.model.numRows =  _this.model.numRows-rows.length;
			    _this.model.attributes.value = newVal;
			    _this.model.errorsub = [];
			    _this.model.trigger('change change:value', _this.model);
				return   _this.render();
				});
		    },
		    /**
			 * 获取没删除的数据
			 */
		    getNotRemoveData:function(rows){
			      var col,row, modelVal, newVal, vals;
			      modelVal = this.model.get('value');
			      newVal = {};
	        	  for (col in modelVal) { 
	        		  vals = modelVal[col];
	        		  newVal[col] = _.tap({}, function(h) {
			          var i, val, _results;
			          	_results = [];
				          for (i in vals) {
				        	  val = vals[i];
				        	  i = parseInt(i, 10);
				     	   	var isExist   = _.find(rows,function(n){
							   return n==  i;
						     });
				     	   	if($.isEmpty(isExist))  _results.push(h[i] = val);
					     }
			          return _results;
			        });
			     }
	        	return newVal;
		    },
		    getNewVal:function(modelVal){
		    	 var col,row, modelVal, newVal, vals;
			      newVal = {};
			      for (col in modelVal) {
				        vals = modelVal[col];
				        newVal[col] = _.tap({}, function(h) {
				          var i, val, _results =[],j=0;
				          for (i in vals) {
				            _results.push(h[j++] = vals[i]);
				          }
				          return _results;
				        });
			     }	
			      return newVal;
		    },
		    importRecord:function(){
		    	DialogUtil.alert("开发中...");
		    },
		    exportRecord:function(){
		    	DialogUtil.alert("开发中...");
		    },
		    /**
			 * 获取字段展示形式 rf:字段 permission：权限，为空或不传入，为编辑，否则按传入的权限
			 */
		    getResponseFieldView:function(rf,permission){  
		    	var model =	this.model.getResponseModel(rf,permission),
		    		subMode = this.model.getMode();
				var view = new FormRenderer.Views["ResponseField" + (_str.capitalize(rf.field_type))]({
		  	          model: model,
		  	          subMode:subMode,
		  	          form_renderer: this,
		  	          isSub:true,
		  	          tableModel:this.model
		  	      }); 
			  var row = rf[FormOptions.t.table.ROW],
			   		column =	rf[FormOptions.t.table.COLUMN];
			   	if(!this.model.subVeiws[row])
			   		this.model.subVeiws[row]= {};
			  	this.model.subVeiws[row][column] = view;
				if(subMode== 'block'){
					 return view.render().el.outerHTML;
				}else{
					return view.render().$el.html();
				}
		    }
		  });

}).call(this);  



// =========== 流程图 字段 ===================
(function() { 
	FormRenderer.Models.ResponseFieldFlow_diagram = FormRenderer.Models.NonInputResponseField.extend({
	    field_type: 'flow_diagram'
	  });  
	    
	// 流程图
	  FormRenderer.Views.ResponseFieldFlow_diagram = FormRenderer.Views.NonInputResponseField.extend({
		    field_type: 'flow_diagram',
		    initialize: function() {
		        FormRenderer.Views.NonInputResponseField.prototype.initialize.apply(this, arguments);
		        return this.on('shown', function(rf) {
		          var _ref;
		          this.refreshing = true;
		          if ((_ref = this.view) != null) {
		        	  	this.reRender();
			       }
		          return setTimeout((function(_this) {
		            return function() {
		              return _this.refreshing = false;
		            };
		          })(this), 0);
		        });
		    },
		    render: function() {
		        FormRenderer.Views.NonInputResponseField.prototype.render.apply(this, arguments);
		        if($.isEmpty(this.getUrl()))
		        	return this;
		        setTimeout((function(_this) {
		            return function() {
		              _this.view =     $("#"+_this.getDomId());
		              _this.view.load(function() { 
		            	  $(this).height( $(this).contents().height()+20); 
      			}) ;
		        };
	          })(this), 0);
		        return this;
		    },
		    reRender:function(){
		    	this.view.height(this.view.contents().height()+20); 	
		    },
		    getUrl:function(){
		    	var url = '',
		    		options = this.form_renderer.options,
		    		bindFlow = options.bindFlow?true:false;
			    if(!bindFlow) 
			    	return "";
			    if($.isNotEmpty(options.taskId)){
			    	url  = '/platform/bpmn/bpmTask/flowImage.htm?taskId='+options.taskId;
			    }else   if($.isNotEmpty(options.instanceId)){
			    	url =  '/platform/bpmn/instance/bpmInst/flowImage.htm?id='+options.instanceId;
			    }else   if($.isNotEmpty(options.defId)){
			    	url =  '/platform/bpmn/image/gen.htm?defId='+options.defId;
			    }else   if($.isNotEmpty(options.flowKey) && $.isNotEmpty(options.pk)){// 流程key
																						// ，主键
			    	url =  '/platform/bpmn/instance/bpmInst/flowImage.htm?defKey='+options.flowKey+'&bizKey='+options.pk;
			    }
		    	
				return url;
		    }
	  });  
}).call(this);    



// =========== 审批历史 字段 ===================
(function() { 
	FormRenderer.Models.ResponseFieldApproval_history = FormRenderer.Models.NonInputResponseField.extend({
	    field_type: 'approval_history'
	  });  
	
	// 审批历史
	FormRenderer.Views.ResponseFieldApproval_history = FormRenderer.Views.ResponseField.extend({
		    field_type: 'approval_history',
		    initialize: function() {
		        FormRenderer.Views.NonInputResponseField.prototype.initialize.apply(this, arguments);
		        return this.on('shown', function(rf) {
		          var _ref;
		          this.refreshing = true;
		          if ((_ref = this.view) != null) {
		        	  	this.reRender();
			       }
		          return setTimeout((function(_this) {
		            return function() {
		              return _this.refreshing = false;
		            };
		          })(this), 0);
		        });
		    },
		    render: function() {
		        FormRenderer.Views.NonInputResponseField.prototype.render.apply(this, arguments);
		        if($.isEmpty(this.getUrl()))
		        	return this;
		        setTimeout((function(_this) {
			            return function() {
				              _this.view =     $("#"+_this.getDomId());
				              _this.view.load(function() { 
				            	  $(this).height($(this).contents().height()+20); 
				              }) ;
			        };
		        })(this), 0);
		        return this;
		    },
		    reRender:function(){
		    	this.view.height(this.view.contents().height()+20); 
			},
		    getUrl:function(){
				var url = '/platform/bpmn/instance/bpmInst/flowHistory.htm',
		    		options = this.form_renderer.options,
		    		bindFlow = options.bindFlow?true:false;
			    if(!bindFlow) 
			    	return "";
			    if($.isNotEmpty(options.taskId)){
			    	url  += '?taskId='+options.taskId;
			    }else   if($.isNotEmpty(options.instanceId)){
			    	url +=  '?instId='+options.instanceId;
			    }else  if($.isNotEmpty(options.flowKey) && $.isNotEmpty(options.pk)){// 流程key
																						// ，主键
			    	url +=  '?defKey='+options.flowKey+'&bizKey='+options.pk;
			    }else{
			    	url ='';
			    }
			    	
				return url;
		    }
	});  
}).call(this);    


// =========== 文本 字段 ===================
(function() {  
	FormRenderer.Models.ResponseFieldLabel = FormRenderer.Models.ResponseField.extend({
		formula_field: false,
	    field_type: 'label',
	    setExistingValue: function(x) {
	    	if($.isNotEmpty(x))
	    		return this.set('value',x);
	    	x = this.getDefaultValue();
	    	if($.isEmpty(x)){
	    		x = this.getPlaceholder();
	    		if($.isNotEmpty(x))
	    			x =  '<span class="fr-placeholder">'+x+'</span>';
	    	}
	    	return this.set('value',x);
	      },
	      getDefaultValue :function(){
	    	   	if($.isEmpty(this.get( FormOptions.t.mappings.DEFAULT_VALUE)) )
	        		return null;
	        	var val = this.get( FormOptions.t.mappings.DEFAULT_VALUE);
	            if(  this.getDefaultValueType()== 'fixed'  ){// 默认值固定值
	            	return  val;
	            }else  if( this.getDefaultValueType() == 'dynamic'  ){// 动态值
	            	return this.getDynamicValue(val);
	            }else  if( this.getDefaultValueType() == 'formula'  ){// 公式计算
	            	 return this.getFormulaValue();
	            }
	            return null;  
	      },
	      getFormulaValue:function(){
	    	  var val ="",
	    	  	curResponseFormula = [],
				responseFormulas =  this.form_renderer.response_formula,
				name = this.get("name");
	    	  
	            for (var k in responseFormulas) {
	            	var formulas = responseFormulas[k];
	                for (var i= 0; i < formulas.length; i++) {
	                	var formula =formulas[i],
					    	changename= formula.changename,// 修改字段
	             			changeObj = changename? changename.split(FormRendererUtil.TABLE_SEPARATOR):[];// 改变的对象
	         			if($.isNotEmpty(changeObj[1]) && changeObj[1] == name){
	         				curResponseFormula =  formulas;
	         				break;
	         			}
	                }
	            }
	            if($.isNotEmpty(curResponseFormula)){
	            	FormRendererUtil.runCalFormula(curResponseFormula,this.form_renderer.response_models);
	            	val = this.get("value");
	            }
	    	  return val;
	      }
	  });
	
	  FormRenderer.Views.ResponseFieldLabel = FormRenderer.Views.ResponseField.extend({
		    field_type: 'label',
		    initialize: function() {
		        FormRenderer.Views.ResponseField.prototype.initialize.apply(this, arguments);
		        this.model.setExistingValue(this.model.getDefaultValue());
		    }
	  });  

}).call(this);    

// =========== 其他字段 字段 ===================
(function() {   
	  var i, _i, _len, _ref,
	  _ref = _.without(FormRenderer.NON_INPUT_FIELD_TYPES,'flow_diagram','approval_history','label');
	  
	  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		    i = _ref[_i];
		    FormRenderer.Models["ResponseField" + (_str.capitalize(i))] = FormRenderer.Models.NonInputResponseField.extend({
		      field_type: i
		    });
		  }
	  
	  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    i = _ref[_i];
	    FormRenderer.Views["ResponseField" + (_str.capitalize(i))] = FormRenderer.Views.NonInputResponseField.extend({
	      field_type: i
	    });
	  }
	
}).call(this);  	

// 视图 分页(page) 页面
(function() {
  FormRenderer.Views.Page = Backbone.View.extend({
    className: 'fr-page',
    initialize: function(options) {
      this.form_renderer = options.form_renderer;
      this.model = options.model;
      this.models = [];
      this.views =[];
      this.state  =new Backbone.Model({
	        hasChanges: false
      });
      this.subviews = {
    	 tabs:{}
      };
       return this;
    },
    render: function() {
      var rf, view, _i, _len, _ref,tabNumber;
      this.hide();
      _ref = this.subviews.tabs;
      for (tabNumber in _ref) {
    	  view = _ref[tabNumber];
    	  this.$el.append(view.render().el);
    	  view.reflectConditions();
    	  this.views.push(view);
      }
      return this;
    },
    hide: function() {
      var view, _i, _len, _ref, _results;
      this.$el.hide();
      _ref = this.subviews.tabs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        _results.push(view.hide());
      }
      return _results;
    },
    show: function() {
      var view, _i, _len, _ref;
      this.$el.show();
      this.activateTab(this.state.get('activeTab'));
      return this;
    },
    initTabs :function(){
        var rf, view, _i, _len, _ref,currentTabInLoop;
       
        _ref = this.models;
        
        this.numTabs = this.models.filter(function(rf) {
            return rf.get('field_type') === 'tab_break';
          }).length;
        
        this.state.set('activeTab', 1);
        currentTabInLoop = 0;
        if( this.numTabs == 0){
        	this.addTab(++currentTabInLoop);
        }
        this.hasTabs =  this.numTabs>0?true:false;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            rf = _ref[_i];
	        if (rf.get('field_type') === 'tab_break') {// Tab标识
	        	 this.addTab(++currentTabInLoop,rf);
	        }else{
		      	  if(! this.subviews.tabs[currentTabInLoop]){
		      		 this.addTab(++currentTabInLoop);
	        	  }
	        	this.subviews.tabs[currentTabInLoop].models.push(rf);
	        }
        }
        this.initTabsContainer();
    },
    addTab:function(curTab,model){
   	 	return this.subviews.tabs[curTab] = new FormRenderer.Views.Tab({
	            form_renderer: this.form_renderer,
	           page_renderer:this,
	            model:model?model:this.getNotSetTabBreakModel()
	          });
    },
    getNotSetTabBreakModel:function(){
	 	  var rf= {
   	  			 field_type  :"tab_break",
   	  			 label:"未设置标签"
   	  	 };
 	  	return  new FormRenderer.Models["ResponseField" + (_str.capitalize(rf.field_type))](rf, {
	          form_renderer: this
	        });
    },
    initTabsContainer:function(){
    	if(this.hasTabs){
    		this.initHasTabsContainer();
    	}else{
    		this.initNoTabsContainer();
    	}
    },
    initHasTabsContainer: function() {
      this.subviews.tabContainer = new FormRenderer.Views.TabsContainer({
    	     form_renderer: this.form_renderer,
	         page_renderer:this
      });
      this.$el.prepend(this.subviews.tabContainer.render().el);
      return this.subviews.tabs[this.state.get('activeTab')].show();
    },
	initNoTabsContainer: function() {
      var tab, tabNumber, _ref, _results;
	      _ref = this.subviews.tabs;
	      _results = [];
      for (tabNumber in _ref) {
    	  tab = _ref[tabNumber];
    	  _results.push(tab.show());
      }
      return _results;
	},
	 visibleTabs: function() {
    	return _.tap([], (function(_this) {
            return function(a) {
              var num, _, _ref, _results;
              _ref = _this.subviews.tabs;
              _results = [];
              for (num in _ref) {
                _ = _ref[num];
                if (_this.isTabVisible(num)) {
                  _results.push(a.push(parseInt(num, 10)));
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            };
          })(this));
    },
    isTabVisible:function(tabNumber){
	      return this.subviews.tabs[tabNumber] && !!_.find(this.subviews.tabs[tabNumber].models, (function(rf) {
		        return rf.isVisible;
		      }));
    },
    getTabModel:function(tabNumber){
    	return this.subviews.tabs[tabNumber].model;
    },
    /**
	 * 标签页是否有效
	 */
    isTabValid: function(tabNumber) {
      return !_.find(this.subviews.tabs[tabNumber].models, (function(rf) {
    	  if(rf.field_type == 'table' ){  // 子表需要特殊验证
		     if(rf.input_field && rf.errors.length > 0)
		    	 return true;
		     if(  $.isEmpty(rf.errorsub))
			   return false;
		     // 遍历子表错误
    		  var rtn = false,_i,_len,errorsub=rf.errorsub;
    		  for (_i in errorsub)  {
			      for ( _j = 0, _len =errorsub[_i].length; _j < _len; _j++) {
			    	  	if($.isNotEmpty(errorsub[_i][_j]))return true;
			      }
    		  }
		      return rtn;
    	  }else{
  	        return rf.input_field && rf.errors.length > 0;  
    	  }
      }));
    },
    activateTab: function(newTabNumber) {
        this.subviews.tabs[this.state.get('activeTab')].hide();
        this.subviews.tabs[newTabNumber].show();
        window.scrollTo(0, this.form_renderer.options.scrollToPadding);
        return this.state.set('activeTab', newTabNumber);
    },
    reflectConditions: function() {
      var view, _i, _len, _ref, _results;
      _ref = this.views;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        _results.push(view.reflectConditions());
      }
      return _results;
    },
    validate: function() {
      var rf, _i, _len, _ref, _results;
      _ref = _.filter(this.models, (function(rf) {
        return rf.input_field;
      }));
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rf = _ref[_i];
        _results.push(rf.validate());
      }
      return _results;
    },
    firstViewWithError: function() {
      return _.find(this.views, function(view) {
        return view.model.errors.length > 0;
      });
    }
  });

}).call(this);	


// 视图 标签页(Tab) 页面 TODO
(function() {
  FormRenderer.Views.Tab = Backbone.View.extend({
    className: 'fr-tab',
    initialize: function(options) {
      this.form_renderer = options.form_renderer;
      this.page_renderer = options.page_renderer;// 父类
      this.model = options.model;
      this.models = [];
      return this.views = [];
    },
    render: function() {
      var rf, view, _i, _len, _ref;
      this.hide();
      _ref = this.models;

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rf = _ref[_i];
        view = new FormRenderer.Views["ResponseField" + (_str.capitalize(rf.field_type))]({
          model: rf,
          form_renderer: this.form_renderer
        });
        
        if($.isNotEmpty(rf.get("name")))
        	this.form_renderer.response_views[rf.get("name")] = view;
        this.$el.append(view.render().el);
        view.reflectConditions();
        this.views.push(view);
      }
      return this;
    },
    hide: function() {
      var view, _i, _len, _ref, _results;
      this.$el.hide();
      _ref = this.views;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        _results.push(view.trigger('hidden'));
      }
      return _results;
    },
    show: function() {
      var view, _i, _len, _ref, _results;
      this.$el.show();
      _ref = this.views;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        _results.push(view.trigger('shown'));
      }
      return _results;
    },
    reflectConditions: function() {
      var view, _i, _len, _ref, _results;
      _ref = this.views;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        _results.push(view.reflectConditions());
      }
      return _results;
    },
    validate: function() {
      var rf, _i, _len, _ref, _results;
      _ref = _.filter(this.models, (function(rf) {
        return rf.input_field;
      }));
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rf = _ref[_i];
        _results.push(rf.validate());
      }
      return _results;
    },
    firstViewWithError: function() {
      return _.find(this.views, function(view) {
        return view.model.errors.length > 0;
      });
    }
  });

}).call(this);	

// 视图 折叠卡
(function() {
  FormRenderer.Views.FoldCard = Backbone.View.extend({
	className: 'fr-fold-card-content',
    initialize: function(options) {
      this.form_renderer = options.form_renderer;
      this.models = [];
      FormRendererUtil.qtip(this.$el);
      return this.views = [];
    },
    bind : function(){
    	var _this = this;
        $('[data-f_id="'+this.model.get('f_id')+'"]').on('click', function(e){
      	  e.preventDefault(); e.stopPropagation();
      	  FormRenderer.Views.FoldCard.prototype.collapse.apply(_this, arguments);
        });
    },
    collapse : function(show){
    	var open = this.model.get(FormOptions.t.mappings.FOLD_CARD_OPEN),
    		_open = (undefined != show && true == show) ? true : ((true == open || 'true' == open) ? true : false);
    	
    	for(i in this.models){
    		if(_open){
    			this.models[i].attributes.$el.show();
    		}else{
    			this.models[i].attributes.$el.hide();
    		}
    	}
    	this.model.set(FormOptions.t.mappings.FOLD_CARD_OPEN, !_open);
    },
    reflectConditions: function() {
      var view, _i, _len, _ref, _results;
      _ref = this.views;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        _results.push(view.reflectConditions());
      }
      return _results;
    },
    validate: function() {
      var rf, _i, _len, _ref, _results;
      _ref = _.filter(this.models, (function(rf) {
        return rf.input_field;
      }));
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rf = _ref[_i];
        _results.push(rf.validate());
      }
      return _results;
    },
    firstViewWithError: function() {
      return _.find(this.views, function(view) {
        return view.model.errors.length > 0;
      });
    },
    render: function() {
        this.form_renderer.trigger('viewRendered', this);
        FormRendererUtil.qtip(this.$el);
        return this;
      }
  });

}).call(this);

	

// 插件
(function() {
  FormRenderer.Plugins.Base = (function() {
    function Base(fr) {
      this.fr = fr;
    }
    
    return Base;

  })();

}).call(this);	




// ================工具栏 TODO=========================
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FormRenderer.Plugins.Toolbar = (function(_super) {
    __extends(Toolbar, _super);

    function Toolbar() {
      return Toolbar.__super__.constructor.apply(this, arguments);
    }

    Toolbar.prototype.afterFormLoad = function() {
    	var attrs = this.fr.options.toolbar;
    	
    	if($.isEmpty(attrs) ||  (!this.fr.options.enablePages &&($.isEmpty(attrs.response_buttons) || attrs.response_buttons.length <=0)))
    		return;
      this.fr.subviews.toolbar = new FormRenderer.Plugins.Toolbar.View({
         form_renderer: this.fr,
         response_buttons:attrs.response_buttons
      });
      this.fr.$el.parent().before(this.fr.subviews.toolbar.render().el);
      return typeof  attrs.onReady === "function" ? attrs.onReady() : void 0;
    };

    return Toolbar;

  })(FormRenderer.Plugins.Base);

  FormRenderer.Plugins.Toolbar.View = Backbone.View.extend({
	className:"panel-toolbar hidden-print",
    events: {
      'click [data-fr-previous-page]': function(e) {
    	  e.preventDefault();
	        return this.form_renderer.handlePreviousPage();
      },
      'click [data-fr-next-page]': function(e) {
       		e.preventDefault();
       		var activePage = this.form_renderer.state.get('activePage');
       		if(!this.form_renderer.isPageValid(activePage) ){
       			DialogUtil.toastr("该步骤下有不规范的值！");
       			return this;
       		}else{
       	    	return this.form_renderer.handleNextPage();
       		}
	
      },
      'click [data-id]' :'_onClick'
    },
    initialize: function(options) {
      this.form_renderer = options.form_renderer;
      this.response_buttons = options.response_buttons;
      return this.listenTo(this.form_renderer.state, 'change:activePage change:hasChanges change:submitting change:hasServerErrors', this.render);
    },
    render: function() {
      this.$el.html(JST['plugins/toolbar'](this));
      if(this.form_renderer.trigger)
    	  this.form_renderer.trigger('viewRendered', this);
      return this;
    },
    getFormData:function(){
    	return this.form_renderer .getValue();	
    },
    getFormDataStr:function(){
    	if($.isEmpty(this.getFormData))
			  return "";
		 return JSON.stringify(this.getFormData());
    },
    getForm:function(){
    	return this.form_renderer;
    },
    _onClick:function(e){
      var $el = $(e.currentTarget),id=$el.data("id"),
      		btn	 = this.response_buttons.get(id);
      		r = false;
      
	  // 前置事件
       var beforSubmitResult = $.JForm._beforeSubmit(this.getForm(),btn.getAlias(),this.getFormData());
        if (typeof (beforSubmitResult) != "undefined" && !beforSubmitResult) {
            return;
        }
        
        //兼容之前配置的js前置事件
		  if(btn.get("beforeScript")){
			  var r =false;
				try {
					var beforeScript = btn.get("beforeScript");
			          r = new Function(beforeScript)();
	    		} catch (e) {
	    			DialogUtil.error("前置脚本出错了",e);
	    			r = true
	    		}
			  if(! r)
				  return ;
		  }
        
        btn.toolbar = this;
        btn.$el = $el;
		  
	  if(btn.action){
		   r = btn.action();
		  if(r)
			  return this;
	  }
    },
	  // 提交后的事件(目前只有保存有后置事件)
	  _afterSubmit:function(optins){
		//兼容之前配置的js 后置事件
		  var btn = optins.btn;
		  if(btn.get("afterScript")){
			  var r =false;
				try {
					var afterScript = btn.get("afterScript");
			          r = new Function(afterScript)();
	    		} catch (e) {
	    			DialogUtil.error("后置脚本出错了",e);
	    			r = true
	    		}
			  if(! r)
				  return true ;
		  }
	      return $.JForm._afterSubmit(this.getForm(),optins.alias,this.getFormData());
	  }
  });

}).call(this);

(function() {
	FormRenderer.Models.ResponseButton = Backbone.DeepModel.extend({
		initialize : function(_attrs, options) {
			this.alias = _attrs.alias;
			this.options = options;
		},
		getLabel : function() {
			return this.get("label") ? this.get("label"): this.label;
		},
		getStyle : function() {
			return this.get("style") ? this.get("style"): this.style;
		},
		getIcon : function() {
			return this.get("icon") ? this.get("icon") : this.icon;
		},
		getEnablePage : function() {
			return this.get("enablePage") ? this.get("enablePage"): this.enablePage;
		},
		getAlias : function() {
			return this.alias == 'custom' ? (this.get("code") ||(this.alias + this.get("$index"))): this.alias;
		},
		getToolbar : function(){
			return this.toolbar;
		},
		getForm:function(){
		  return this.getToolbar().getForm();
		},
		getFormData:function(){
		  if( this.getForm())
			  return this.getForm().getValue();
		  return;
		},
		//表单字符串
		getFormDataStr:function(){
		  if($.isEmpty(this.getFormData))
			  return "";
		 return JSON.stringify(this.getFormData());
		},
		getOptions:function(key){
			return this.options[key];
		},
		getVersion:function(){
		  return  this.getOptions("version");
	  	},
	  	_afterSubmit:function(){
	  		return this.getToolbar()._afterSubmit({
			 alias:this.getAlias(),
			 btn:this
	  		});
	  	},
	  	style : "btn-primary",
		icon : "fa fa-check-square"
	});
}).call(this);


// 国际化
var FormRendererZH_CN = {
	      'selector_type':{
	    	  'user':'用户',
	    	  'org':'组织',
	    	  'position':'岗位',
	    	  'role':'角色'
	      },
	      'buttons':{
	    	  "add":"添加",
	    	  "remove":"删除",
	    	  "edit":"编辑",
	    	  "remove_a_row ":"删除一行",
	    	  "import":"导入",
	    	  "export":"导出"
	      },
		"add_another_row":"添加一行",
		"back_to_tab":"回到:num页",
		"blind":"Blind",
		"bookmark_hint":"完成操作,复制下面的链接。",
		"characters":"字符",
		"clear":"清除",
		"click_to_set":"点击设置位置",
		"coordinates":"坐标",
		"country":"国家",
		"email":"邮箱",
		"errors":{
				"required":"必填.",
				"date":"请输入有效日期.",
				"email":"请输入正确的邮箱地址.",
				"idcard":"请输入有效的身份证.",
				"zip":"请输入正确的邮政编码.",
				"phone":"请输入正确的手机号码.",
				"telephone":"请输入正确的电话号码.",
				"integer":"请输入整型.",
				"number":"请输入有效的数字.",
				'max_decimal_len':'小数位不能超过{0}位.',
				"price":"请输入有效的价格.",
				"short":"字符不少于{0}字符",
				"long":"字符不超过{0}字符",
				"small":"输入数字不小于{0}",
				"large":"输入数字不大于{0}",
				"smallmum":"至少选择{0}项",
				"largemum":"最多选择{0}项",
				"time":"请输入有效的时间.",
				'startDate':'请选择时间不早于【{0}】时间',
				'endDate':'选择时间不晚于【{0}】 时间',
				'startEndDate':'请选择时间在{0}至{1}之间内',
				'address':'请选择完整的地址',
				"custom":'请输入正确的{0}'
			},
			"form_error":"表单存在不规范的值！",
			"error_bar":{"出错了":"你的表单存在错<a href='#'>验证错误</a>."},
			"error_loading":"加载表单出错",
			"error_saving":"保存错误",
			"hidden":"隐藏",
			"hidden_until_rules_met":"隐藏,直到满足规则",
			"loading_form":"加载表单...",
			"na":"N/A",
			"name":"名字",
			"next_page":"下一页",
			"other":"其他",
			"province":"省",
			"remove":"删除",
			"saved":"保存",
			"saving":"保存中...",
			"state":"状态",
			"submit":"提交",
			"submitting":"提交中",
			"upload":"请上传",
			"uploading":"上传中...",
			"upload_another":"上传一个文件",
			"words":"单词",
			"write_here":"其他选项",
			"zip_code":"邮政编码"};

if (typeof FormRenderer !== 'undefined') FormRenderer.t = FormRendererZH_CN;


// ============= 字段模版============
if (!window.JST) {
  window.JST = {};
}



// 隐藏域
window.JST["fields/hidden"] = function(__obj) {
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
	      _print(_safe('<input type="hidden"\n       id="'));
	    
	      _print(this.getDomId());
	    
	      _print(_safe('"\n   '));
	      
	      
	      if(this.isSub){ // 子表
	  	    _print(_safe(' data-column=\''));
	  	    _print(this.model.getColumn());
	  	    _print(_safe('\'\n    data-row=\''));
	  	    _print(this.model.getRow());
	  	    _print(_safe('\'\n   data-rv-input=\'model.value.'));
	  	    _print(this.model.getColumn());
	  	    _print(_safe('.'));
	  	    _print(this.model.getRow());
	  	    _print(_safe('\'\n    '));
	      }else{
	    	_print(_safe(' data-rv-input=\'model.value\' '));
	      }
	      _print(_safe('/>\n'));
 
 }).call(this);
 
 return __out.join('');
}).call((function() {
 var obj = {
   escape: function(value) {
     return ('' + value)
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;');
   },
   safe: _safe
 }, key;
 for (key in __obj) obj[key] = __obj[key];
 return obj;
})());
};

// 单行文本框
window.JST["fields/text"] = function(__obj) {
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
    	if(this.canInput()){// 编辑权限 、只读原型
	      _print(_safe('<input type="text"\n       id="'));
	    
	      _print(this.getDomId());
	    
	      _print(_safe('"\n   class="fr-form-control  size_'));
	    
	      _print(this.model.getSize());
	    
	      _print(_safe('"\n  '));
	      
	      _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
	      
	      if(this.isRead())
	            _print(_safe(' readonly="readonly"'));
	      
	      if(this.isSub){ // 子表
	  	    _print(_safe('  data-column=\''));
	  	    _print(this.model.getColumn());
	  	    _print(_safe('\'\n   data-row=\''));
	  	    _print(this.model.getRow());
	  	    _print(_safe('\'\n   data-rv-input=\'model.value.'));
	  	    _print(this.model.getColumn());
	  	    _print(_safe('.'));
	  	    _print(this.model.getRow());
	  	    _print(_safe('\'\n    '));
	      }else{
	    	_print(_safe(' data-rv-input=\'model.value\' '));
	      }
	 
	      _print(_safe('/>\n'));
    	} else if(this.isRead()){// 只读
    	  _print(_safe(JST["views/text"](this)));
    	}
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};


// 多行文本
window.JST["fields/textarea"] = function(__obj) {
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
	if(this.canInput()){// 编辑权限
		  _print(_safe('<textarea\n   id="'));
		
		  _print(this.getDomId());
		
		  _print(_safe('"\n   class="fr-form-control fr-control-textarea  size_'));
		
		  _print(this.model.getSize());
		  
		  _print(_safe('"\n  '));
		  
	      _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
	      
	      _print(_safe(' style="height:'+this.model.getHeight()+'px;"  '));
		  
		   if(this.isRead())// 只读
	            _print(_safe(' readonly="readonly"'));
		  if(this.isSub){ // 子表
		  	    _print(_safe(' data-column=\''));
			    _print(this.model.getColumn());
			    _print(_safe('\'\n   data-row=\''));
			    _print(this.model.getRow());
			    _print(_safe('\'\n   data-rv-input=\'model.value.'));
			    _print(this.model.getColumn());
			    _print(_safe('.'));
			    _print(this.model.getRow());
			    _print(_safe('\'\n    '));
		  }else{
			_print(_safe(' data-rv-input=\'model.value\' '));
		  }
		  
		  _print(_safe('/>\n'));
	} else if(this.isRead()){// 只读
	      _print(_safe(JST["views/text"](this)));
	}

}).call(this);

return __out.join('');
}).call((function() {
var obj = {
  escape: function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },
  safe: _safe
}, key;
for (key in __obj) obj[key] = __obj[key];
return obj;
})());
};


// 富文本框(不支持子表)
window.JST["fields/editor"] = function(__obj) {
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
	if(this.canInput()){// 编辑权限
		_print(_safe(' <div  type="text/plain" class="editor" width="100%"   '));
		
		_print(_safe(' id="'+this.getDomId()+'"></div> '));

	} else if(this.isRead()){// 只读
	    _print(_safe(' <div class="form-control-static" data-rv-html=\'model.value\'></div>'));
	}
}).call(this);

return __out.join('');
}).call((function() {
var obj = {
escape: function(value) {
  return ('' + value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
},
safe: _safe
}, key;
for (key in __obj) obj[key] = __obj[key];
return obj;
})());
};

// office控件(不支持子表)
window.JST["fields/office"] = function(__obj) {
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

	_print(_safe(' <div  class="office" width="100%" style="height:'+this.model.getHeight()+'px" '));
	
	_print(_safe(' id="'+this.getDomId()+'"></div> '));

}).call(this);

return __out.join('');
}).call((function() {
var obj = {
escape: function(value) {
  return ('' + value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
},
safe: _safe
}, key;
for (key in __obj) obj[key] = __obj[key];
return obj;
})());
};


// 数字
window.JST["fields/number"] = function(__obj) {
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
   	if(this.canInput()){// 编辑权限
	
	  _print(_safe('<input type="text"\n       id="'));
	
	  _print(this.getDomId());
	
	  _print(_safe('"\n   class="fr-form-control '));
	  
	  _print(_safe('"\n  '));
	  
      _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
	  
	   if(this.isRead())
           _print(_safe(' disabled="disabled"'));
	   
	  	if(this.isSub){ // 子表
		    _print(_safe('  data-column=\''));
		    _print(this.model.getColumn());
		    _print(_safe('\'\n     data-row=\''));
		    _print(this.model.getRow());
		    _print(_safe('\'\n     data-rv-input=\'model.value.'));
		    _print(this.model.getColumn());
		    _print(_safe('.'));
		    _print(this.model.getRow());
		    _print(_safe('\'\n    '));
		}else{
			_print(_safe(' data-rv-input=\'model.value\' '));
		}
	  	
	  _print(_safe(' />\n\n'));
	
	  _print(_safe('\n'));
  
	} else if(this.isRead()){// 只读
	      _print(_safe(JST["views/text"](this)));
	}

}).call(this);

return __out.join('');
}).call((function() {
var obj = {
  escape: function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },
  safe: _safe
}, key;
for (key in __obj) obj[key] = __obj[key];
return obj;
})());
};


// 单选
window.JST["fields/radio"] = function(__obj) {
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
		    var i, option, _i, _len, _ref,_arrangement,_arrangementClass =' radio-inline',include_other_option;
		    _ref = this.model.getOptions();
		    _arrangement = this.model.get(FormOptions.t.mappings.ARRANGEMENT);
		    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
		    	option = _ref[i],include_other_option=(option.include_other_option ?option.include_other_option==true:false);
		    	_arrangementClass = (_arrangement == 'vertical' &&  !include_other_option)?' radio':' radio-inline';
		   
		      
		      _print(_safe('\n  <label class=\'fr-control-option '+_arrangementClass+'  \'>\n    <input type=\'radio\'\n    name="'+this.getDomId()+'"    class="ibps"    '));
		      
		    	if(this.isSub){ // 子表
		    	    _print(_safe('    data-column=\''));
		    	    _print(this.model.getColumn());
		    	    _print(_safe('\'\n     data-row=\''));
		    	    _print(this.model.getRow());
		    	    _print(_safe('\'\n     data-rv-checked=\'model.value.'));
		    	    _print(this.model.getColumn());
		    	    _print(_safe('.'));
		    	    _print(this.model.getRow());
		    	    _print(_safe('\'\n    '));
		    	}else{
		    		_print(_safe(' data-rv-checked=\'model.value.checked\'\n   '));
		    	}
		        if(this.isRead()){
		            _print(_safe(' disabled="disabled"'));
		        }
		      _print(_safe('  value="'));
		      _print(option.val);
		      _print(_safe('" />\n   <span class="lbl"> '));
		      _print(option.translated_label || option.label);
		      _print(_safe('</span>\n  </label>\n'));
		      // 其他选项
		      if (option.include_other_option) {
		    	_print(_safe('<input type=\'text\' class=\'fr-other-input\'  '));
					if(this.isSub){ // 子表
						 _print(_safe('   		   data-column=\''));
				    	 _print(this.model.getColumn());
				    	 _print(_safe('\'\n     data-row=\''));
				    	 _print(this.model.getRow());
				    	 _print(_safe('\'\n     data-rv-input=\'model.value.other.'));
				    	 _print(this.model.getColumn());
				    	 _print(_safe('.'));
				    	 _print(this.model.getRow());
				    	 _print(_safe('.'));  
				    	 _print(option.val);
				    	 _print(_safe('\'\n    '));
					}else{
			    	     _print(_safe(' data-rv-input=\'model.value.other\' '));
					}	
			       if(this.isRead()){
			    	   _print(_safe(' disabled=\'disabled\' '));
			       }else{
			    	   _print(_safe('	placeholder=\''));
			    	   _print(FormRenderer.t.write_here);
			    	   _print(_safe('\'  '));
			       }
				_print(_safe('  />\n  '));
		      }
		    }
		    _print(_safe('\n'));
    
  }).call(this);
  
  return __out.join('');
}).call((function() {
  var obj = {
    escape: function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },
    safe: _safe
  }, key;
  for (key in __obj) obj[key] = __obj[key];
  return obj;
})());
};
// 多选择框
window.JST["fields/checkbox"] = function(__obj) {
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
		      var i, option, _i, _len, _ref,_arrangement,_arrangementClass =' checkbox-inline',include_other_option;
		    
		      _ref = this.model.getOptions();
		      _arrangement = this.model.get(FormOptions.t.mappings.ARRANGEMENT);
		      
		      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
		        option = _ref[i],include_other_option=(option.include_other_option ?option.include_other_option==true:false);
		       	 _arrangementClass = (_arrangement == 'vertical' &&  !include_other_option)?' checkbox':' checkbox-inline';
		        
		        _print(_safe('\n  <label class=\'fr-control-option '+_arrangementClass+'\'>\n    <input type=\'checkbox\'  class="ibps" '));
		        
		    	if(this.isSub){ // 子表
		    	    _print(_safe('   data-column=\''));
		    	    _print(this.model.getColumn());
		    	    _print(_safe('\'\n     data-row=\''));
		    	    _print(this.model.getRow());
		    	    _print(_safe('\'\n     data-rv-checked=\'model.value.'));
		    	    _print(this.model.getColumn());
		    	    _print(_safe('.'));
		    	    _print(this.model.getRow());
		       	    _print(_safe('.'));  
		    	    _print(option.val);
		    	    _print(_safe('\'\n    '));
		    	}else{
		    	     _print(_safe(' data-rv-checked=\'model.value.'));
		    	    _print(option.val);
		    	    _print(_safe('\'  '));
		    	}
		    	
		        if(this.isRead()){
		            _print(_safe(' disabled="disabled"'));
		        }
		        
		        _print(_safe('  />\n  <span class="lbl">'));
		        _print(option.translated_label || option.label);
		        _print(_safe('\n</span>  </label>\n'));
		        if (option.include_other_option) {
		        	_print(_safe('<input type=\'text\' class=\'fr-other-input\' ' ));
		        			if(this.isSub){ // 子表
		        				 _print(_safe('   		   data-column=\''));
		        		    	 _print(this.model.getColumn());
		        		    	 _print(_safe('\'\n     data-row=\''));
		        		    	 _print(this.model.getRow());
		        		    	 _print(_safe('\'\n     data-rv-input=\'model.value.other.'));
		        		    	 _print(this.model.getColumn());
		        		    	 _print(_safe('.'));
		        		    	 _print(this.model.getRow());
		        		    	 _print(_safe('.'));  
		        		    	 _print(option.val);
		        		    	 _print(_safe('\'\n    '));
		        			}else{
		        	    	     _print(_safe(' data-rv-input=\'model.value.other\' '));
		        			}	
				       if(this.isRead()){
				    	   _print(_safe(' disabled=\'disabled\' '));
				       }else{
				    	   _print(_safe('	placeholder=\''));
				    	   _print(FormRenderer.t.write_here);
				    	   _print(_safe('\'  '));
				       }
		    		_print(_safe(' />\n  '));
		          }
		      }
		      
		    _print(_safe('\n\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};
// 下拉框
window.JST["fields/select"] = function(__obj) {
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
       	if(this.canInput()){// 编辑权限
		      var option, _i, _len, _ref;
		      
		      _print(_safe('<select id="'));
		      _print(this.getDomId());
		      _print(_safe('" class="fr-form-control"'));
		    	
		        if(this.isRead()){
		            _print(_safe(' disabled="disabled"'));
		        }
		      
				if(this.isSub){ // 子表
			  	    _print(_safe('\n     data-column=\''));
				    _print(this.model.getColumn());
				    _print(_safe('\'\n     data-row=\''));
				    _print(this.model.getRow());
				    _print(_safe('\'\n     data-rv-value=\'model.value.'));
				    _print(this.model.getColumn());
				    _print(_safe('.'));
				    _print(this.model.getRow());
				    _print(_safe('\'\n    '));
				} else{
					_print(_safe(' data-rv-value=\'model.value\' '));
				}
		  	
			  _print(_safe(' >\n  '));
		    
		      if (this.model.get(FormOptions.t.mappings.INCLUDE_BLANK)) {
		        _print(_safe('\n    <option  value="">'+(this.model.get(FormOptions.t.mappings.INCLUDE_BLANK_VALUE)||'请选择')+'</option>\n  '));
		      }
		    
		      _print(_safe('\n\n  '));
		    
		      _ref = this.model.getOptions();
		      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		    	  option = _ref[_i];
		        _print(_safe('\n    <option value="'));
		        _print(option.val);
		        _print(_safe('">\n      '));
		        _print(option.translated_label || option.label);
		        _print(_safe('\n	 </option>\n  '));
		      }
		    
		      _print(_safe('\n</select>\n'));
    
    	} else if(this.isRead()){// 只读
    	   	   _print(_safe(' <div class="form-control-static" >'+this.model.toText()+'</div>'));
    	}
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};


// 日期控件
window.JST["fields/datePicker"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this,  _print= function(value) {
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
      if(this.canInput()){// 编辑权限
    	  _print(_safe('<div class="input-icon"  data-toggle="datepicker"  '));	  
    	  
    	  _print(_safe(' ><i class="fa fa-calendar" ></i><input type="text"\n       id="'));

    	  _print(this.getDomId());
    	  
    	  _print(_safe('"\n '));
    	  
	      _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
	      
    	  _print(_safe('  readonly="readonly"   data-datefmt="'+this.model.get(FormOptions.t.mappings.DATEFMT)+'" '));
    	  
	      if(this.isSub){ // 子表
	    	    _print(_safe('  data-field_type=\''));
	    	    _print(this.model.get(FormOptions.t.mappings.FIELD_TYPE));
	    	    _print(_safe('\'\n    	data-column=\''));
	    	    _print(this.model.getColumn());
	    	    _print(_safe('\'\n      data-row=\''));
	    	    _print(this.model.getRow());
	    	    _print(_safe('\'\n       data-rv-input=\'model.value.'));
	    	    _print(this.model.getColumn());
	    	    _print(_safe('.'));
	    	    _print(this.model.getRow());
	    	    _print(_safe('\'\n    '));
	        }else{
	        	_print(_safe(' data-rv-input=\'model.value\' '));
	        }
    			  
	      _print(_safe('\n  class="fr-form-control date-control" '));
	      
    	  _print(_safe(' /></div>\n\n'));
    	} else if(this.isRead()){// 只读
    		_print(_safe(JST["views/text"](this)));
    	}
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 日期范围控件(不使用)
window.JST["fields/dateRange"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this,  _print= function(value) {
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
       	if(this.canInput()){// 编辑权限
    	  _print(_safe('<div class=\"row\"><div class="col-md-5     pl-5"><div class="input-icon"  datepicker'));	  
    	  
    	  _print(_safe(' ><i class="fa fa-calendar"></i><input type="text"\n       id="'));

    	  _print(this.getDomId());

    	  _print(_safe('"\n readonly="readonly"  '));
    	  
	      _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
    	  
	      if(this.isSub){ // 子表
	    	    _print(_safe('  data-field_type=\''));
	    	    _print(this.model.get(FormOptions.t.mappings.FIELD_TYPE));
	    	    _print(_safe('\'\n '));
	    	    _print(_safe('   							data-column=\''));
	    	    _print(this.model.getColumn());
	    	    _print(_safe('\'\n                        data-row=\''));
	    	    _print(this.model.getRow());
	    	    _print(_safe('\'\n                        data-rv-input=\'model.value.'));
	    	    _print(this.model.getColumn());
	    	    _print(_safe('.'));
	    	    _print(this.model.getRow());
	    	    _print(_safe('\'\n    '));
	        }else{
	        	_print(_safe(' data-rv-input=\'model.value\' '));
	        }
    			  
	      _print(_safe('"\n  class="fr-form-control date-control" '));
	      
    	  _print(_safe(' /></div>\n\n</div><div  class=\'col-md-1 \' style="width:50px;"> <div class=\'form-control-static\'>至</div></div><div class=\'col-md-5    pl-5\'><div class=\'input-icon\'>' +
	    			"<i class='fa fa-calendar'></i>" +
	    			'<input type="text" class="fr-form-control date-control"  readonly="readonly">' +
	    		' </div> </div> </div>'));
    	} else if(this.isRead()){// 只读
    		_print(_safe(JST["views/text"](this)));
    	}
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};


// 数据字典
window.JST["fields/dictionary"] = function(__obj) {
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
	if(this.canInput()){// 编辑权限
	      _print(_safe('<input type="text"\n    data-toggle="dictionary"   id="'));
	    
	      _print(this.getDomId());
    	  _print(_safe('"\n '));
	      _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
	      
	      _print(_safe('\n    readonly="readonly"  class="fr-form-control  dictionary size_'));
	    
	      _print(this.model.getSize());
	    	    
	      _print(_safe('"\n '));
	      
	      if(this.isSub){ // 子表
	  	    _print(_safe(' data-column=\''));
	  	    _print(this.model.getColumn());
	  	    _print(_safe('\'\n    data-row=\''));
	  	    _print(this.model.getRow());
	  	    _print(_safe('\'\n     data-rv-input=\'model.showvalue.'));
	  	    _print(this.model.getColumn());
	  	    _print(_safe('.'));
	  	    _print(this.model.getRow());
	  	    _print(_safe('\'\n    '));
	      }else{
	    	_print(_safe(' data-rv-input=\'model.showvalue\' '));
	      }
	      
	      _print(_safe('/>\n'));
	} else if(this.isRead() ){// 只读
	      _print(_safe(' <p class="form-control-static" >'+this.model.toText()+'</p>'));
	      
	}

}).call(this);

return __out.join('');
}).call((function() {
var obj = {
escape: function(value) {
  return ('' + value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
},
safe: _safe
}, key;
for (key in __obj) obj[key] = __obj[key];
return obj;
})());
};


// 附件
window.JST["fields/attachment"] = function(__obj) {
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
   var file, exts, _i, _len, _ref,isHidden;
   isHidden = this.isRead()?true:false;
   _ref = this.model.getFiles();
   _print(_safe('<div class=\'fr-attachment\'   '));
   if(this.isSub){ 
		    _print(_safe('  data-column=\''));
	  	    _print(this.model.getColumn());
	  	    _print(_safe('\'\n  data-row=\''));
	  	    _print(this.model.getRow() +'\'');
   }
   _print(_safe('>\n  <div class=\'fr-files\'>\n  '));
   
   for (_i = 0, _len = _ref.length; _i < _len; _i++) {
 	  file = _ref[_i];
 	  var ext = file.fileName? file.fileName.substring(file.fileName.lastIndexOf(".")+1,file.fileName.length):'',
 			isImage = $.inArray(ext,FormOptions.t.FILE_EXT.images) != -1,
 		   href =  isImage?__ctx+'/components/upload/preview.htm?downloadId='+file.id:__ctx+'/platform/file/attachment/office.htm?downloadId='+file.id,
 		   src =isImage? __ctx+'/components/upload/preview.htm?downloadId='+file.id:($.inArray(ext,FormOptions.t.FILE_EXT.not_images)!=-1?__ctx+'/styles/commons/images/file/'+ext+'.png':__ctx+'/styles/commons/images/file/attachment.png')
 		   clz =  isImage?"image-popup":'iframe-popup';
       _print(_safe('\n    <div class=\'fr-file\'>\n  <div class="preview-area pull-left">'+
       		'<div class="preview"><a class="'+clz+'"   href="'+href+'"><image data-id="'+file.id+'"   src="'+src+'"/></div></a></div>'+
       		'<div class="status pull-left" >'+
         		'<a href="'+__ctx+'/components/upload/download.htm?downloadId='+file.id+'"  target="_blank"  >'+
       		'<span class="file-name" title="'+file.fileName+'">'+file.fileName+'</span></a></div>'));
     if(!isHidden){
         _print(_safe('<div class="actions file-actions pull-right " style="display: none;">'));
         _print(_safe('<a class="rechoose-link" data-toggle="file-rechoose" data-role="rechoose"  href="javascript:void(0)" >重新选择</a> |' ));
         _print(_safe('<a  class="delete-link"    data-toggle="file-remove"  data-role="cancel"   href="javascript:void(0)" >删除</a>'));
         _print(_safe('</div>'));
     }
     
     _print(_safe('\n</div>'));
   }
 
   _print(_safe('\n</div>\n\n'));
 
   if (this.model.canAddFile() && this.isEdit() ){// 编辑权限和能上传
 	  _print( _safe("<div data-toggle='file-add' class='file-select-trigger'> "+
					    	 "<label>"+
					    	 " 		<div class='plus'>+</div> "+
					    	 "		<div class='select-text'>"+	(this.model.getPlaceholder()|| " 请选择上传文件")+"</div>"+
					    	 "</label>"+
 	  				"</div>"));
   }
 
   _print(_safe('</div>\n'));
 
 }).call(this);
 
 return __out.join('');
}).call((function() {
 var obj = {
   escape: function(value) {
     return ('' + value)
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;');
   },
   safe: _safe
 }, key;
 for (key in __obj) obj[key] = __obj[key];
 return obj;
})());
};

// 自动编号
window.JST["fields/autoNumber"] = function(__obj) {
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
        if(this.canInput()){// 编辑权限
    	  _print(_safe('<div class="input-icon"><i class="fa fa-list-ol"></i><input type="text"\n       id="'));

    	  _print(this.getDomId());

    	  _print(_safe('"\n  readonly="readonly"       data-rv-input=\'model.value\'\n   data-rv-placeholder=\'model.placeholder\'\n     class="fr-form-control" '));

    	  _print(_safe(' /></div>\n\n'));
    	  
          _print(_safe('\n  <div class=\'fr-control-warn\' data-rv-html =\'model.warn\'>\n    '));
          _print(_safe('\n  </div>\n'));

	   	} else if(this.isRead()){// 只读
    		_print(_safe(JST["views/text"](this)));
		}
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 自定义对话框
window.JST["fields/customDialog"] = function(__obj) {
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
        if(this.canInput()){// 编辑权限
	    	  _print(_safe('<div class="input-group" data-toggle="customdialog">'));
	    	  
	    	   if(this.isSub){ // 子表
    		   		_print(_safe('<input type="text"\n  data-control="customdialog" id="'));
        		
    		   		_print(this.getDomId());
    		   		
    				_print(_safe('"\n'));
    				
    			     _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
    			      
  	
    		   		_print(_safe('\n  readonly="readonly"         class="fr-form-control " '));
	  	    	  
					_print(_safe(' 			data-column=\''));
					_print(this.model.getColumn());
					_print(_safe('\'\n               data-row=\''));
					_print(this.model.getRow());
					_print(_safe('\'\n  ' ));
					
					_print(_safe(' data-rv-input=\'model.showvalue.'));
					_print(this.model.getColumn());
					_print(_safe('.'));
					_print(this.model.getRow());
					_print(_safe('\'\n   /> '));
		        }else{
		       	  _print(_safe('<input type="text"\n       id="'));
		  	      _print(this.getDomId());
  				_print(_safe('"\n'));
				
			     _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
		  	      _print(_safe('\n  readonly="readonly"       data-rv-input=\'model.showvalue\'\n       class="fr-form-control " />'));
		        }
	    	  var icon = this.model.get(FormOptions.t.mappings.ICON)?this.model.get(FormOptions.t.mappings.ICON):'fa fa-search-plus';
	    	   // 图标
	     	  _print(_safe('<span class="input-group-addon" ><i class="'+icon+'"></i></span></div>\n\n'));
	    	  
       	} else if(this.isRead()){// 只读
    		_print(_safe(JST["views/toText"](this)));
		}
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 关联数据
window.JST["fields/linkdata"] = function(__obj) {
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
        if(this.canInput()){// 编辑权限
	    	  
	    	   if(this.isSub){ // 子表
    		   		_print(_safe('<input type="text"\n  id="'));
        		
    		   		_print(this.getDomId());
    		   		
    				_print(_safe('"\n'));
    				
    			     _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
    			      
  	
    		   		_print(_safe('\n  readonly="readonly"         class="fr-form-control " '));
	  	    	  
					_print(_safe(' 			data-column=\''));
					_print(this.model.getColumn());
					_print(_safe('\'\n               data-row=\''));
					_print(this.model.getRow());
					_print(_safe('\'\n  ' ));
					
					_print(_safe(' data-rv-input=\'model.value.'));
					_print(this.model.getColumn());
					_print(_safe('.'));
					_print(this.model.getRow());
					_print(_safe('\'\n   /> '));
		        }else{
		        	
		       	  _print(_safe('<select     id="'));
		  	      _print(this.getDomId());
  				_print(_safe('"\n'));
		  	      _print(_safe('\n     data-rv-input=\'model.value\'\n       class="fr-form-control " />'));
		        }
	    	  
       	} else if(this.isRead()){// 只读
       	    _print(_safe(' <p class="form-control-static" >'+this.model.toText()+'</p>'));
		}
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};



// 选择器
window.JST["fields/selector"] = function(__obj) {
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
      var selector, exts, _i, _len, _ref,type;
      	type = this.getAttr(FormOptions.t.mappings.SELECTOR_TYPE);
        if(this.isSub){ 
        	var model;
        	if(this.model.form_renderer.form_renderer)
        		model = this.model.form_renderer.form_renderer.response_models[this.model.get("code")];
        	_ref = this.model.getSelector(model);
        }else{
        	_ref = this.model.getSelector();
        }
      
      _print(_safe('<div class=\'fr-selector\' data-toggle=\'selector\'  '));
      if(this.isSub){ 
	    _print(_safe('  data-column=\''));
	    _print(this.model.getColumn());
	    _print(_safe('\'\n   data-row=\''));
	    _print(this.model.getRow() +'\'');
      }
      _print(_safe(' >\n  '));
      _print(_safe('<ul class="selector-list '+( (_ref.length==0 && !this.isEdit())?'not-data':'')+' " >'));

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    	  selector = _ref[_i];
    	  if($.isEmpty(selector.name) || $.isEmpty(selector.id))  continue;
	      _print(_safe( '<li class="selector-item"><i class="fa fa-'+type+'"></i><span>'+selector.name+'</span>'));
	    	if(this.isEdit()){
	            _print(_safe('<a class="btn btn-ms fr-selector-remove"  data-toggle="selector-remove" title="移除" href="javascript:void(0);"><i class="fa fa-remove"></i></a>'));
	    	}
          _print(_safe('</li>'));
      }
      
      if(_ref.length == 0 && this.isEdit() ){
    	    _print(_safe('<label><div class="plus">+</div><div class="selector-empty">'+this.getPlaceholder()+'</div></label>'));
      }
      _print(_safe('</ul>'));
   
      _print(_safe('\n</div>\n\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 地址
window.JST["fields/address"] = function(__obj) {
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
        if(this.canInput()){// 编辑权限
	    	  _print(_safe('<div style="position: relative;"><input class="fr-form-control" '));
	    	  
	 	     _print(_safe(' placeholder="'+this.model.getPlaceholder()+'"  '));
	 	     
	 	    _print(_safe(' readonly="readonly" type="text" data-toggle="address"></div>'));
        	  
              // 街道
              if(this.model.get(FormOptions.t.mappings.IS_STREET)){
        	      _print(_safe('<div style="position: relative;"><textarea type="text"\n       id="'));
        		    
        	      _print(this.getDomId());
        	      
        	      _print(_safe('"  '));
        	      
     	 	     _print(_safe(' placeholder="详细地址"  '));
        	    
        	      _print(_safe('\n       class="fr-form-control  fr-control-textarea mt-5 size_'));
        	    
        	      _print(this.model.getSize() );
         	      _print(_safe('"\n     '));
         	      if(this.isRead()){
			            _print(_safe(' disabled=true'));
			        }
        	      _print(_safe('  data-rv-input=\'model.value.street\' ></textarea></div> '));
              }
        }else{
        	   _print(_safe(' <div class="form-control-static">'+this.model.toText()+'</div>'));
        }
    	
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 签名
window.JST["fields/signature"] = function(__obj) {
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
    		_print(_safe(' <div  class="fr-signature-outer" >  '));
    		if(!this.isRead()){// 只读
    			_print(_safe('<div class="fr-signature-header"><div class="fr-signature-fieldtext">'+this.model.getPlaceholder()+'</div>'+
    					'<div class="fr-signature-clear"><span><a href="javascript:void(0);" data-toggle="signature-clear">清除</a></span></div>'+
    					'</div> '));
    		}
    		_print(_safe(' <div  class="fr-signature-div"   id="'+this.getDomId()+'"></div></div> '));
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 子表(表内编辑模式、弹窗模式)
window.JST["fields/table"] = function(__obj) {
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
      var column, i, j, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3,mode,width="45px";
      // 模式
      mode = this.model.getMode();
      
      width= (mode=='dialog'?"75px":width);
      
      _ref = this.model.getColumns();// 字段
      
      _print(_safe('<div class="table-responsive"> \n   <table class=\'fr-table table table-striped table-bordered table-hover text-nowrap m-b-0\'>\n  <thead>\n   '));
      _print(_safe(' <tr>\n '));
      _print(_safe('\n <th class=\'fr_table_col_checkbox\'  width="45px"><input role="checkbox" class="checkAll"  type="checkbox"></th>\n    '));
      
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        column = _ref[_i];
        if(this.model.columnIsHide(column))// 隐藏字段或者隐藏权限
        	continue;
        _print(_safe('\n        <th >'));
        _print(column.translated_label || column.label);
	  	  if (column["field_options"]["units"]) {
			    _print(_safe('\n  <span class=\'fr-units\'>('));
			    _print(column["field_options"]["units"]);
			    _print(_safe(') </span>\n'));
		  }
        _print(_safe('</th>\n      '));
      }
      // 管理列
      if (this.canManage()) { 
    	  _print(_safe('\n\n      <th class=\'fr_table_col_remove\'  width="'+width+'">管理</th>\n    '));
      }
      _print(_safe( '</tr>\n</thead>\n\n      '));
      
      // 表格
      _print(_safe(' <tbody>\n    '));
      
   if(this.model.numRows > 0){
      for (i = _j = 0, _ref1 = this.model.numRows - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        _print(_safe('\n  <tr data-row-index="'+i+'" >\n'));
        
        _print(_safe('\n\n  <td class=\'fr_table_row_checkbox\'  width="45px"><input role="checkbox" class="cbox " type="checkbox"/></td>\n    '));
        
        _ref2 = this.model.getColumns();
        for (j = _k = 0, _len1 = _ref2.length; _k < _len1; j = ++_k) {
          column = _ref2[j];
          column.row = i;
          column.column= j;
        // 隐藏字段或者隐藏权限
          if(this.model.columnIsHide(column)){
        	 this.getResponseFieldView(column,FormOptions.t.PERMISSIONS.HIDE);
             continue;
          }
          // 只读或者对话框模式
         if(this.model.columnIsRead(column) ||  mode =='dialog'){
              _print(_safe('\n   <td class=\'fr-table-read\' >\n  '));
              _print( _safe(this.getResponseFieldView(column,FormOptions.t.PERMISSIONS.READ)) );
              _print(_safe('	\n    </td>\n         '));	  
          }else   if(mode =='inner'){          // 表内编辑模式
              _print(_safe('\n     <td>\n   '));
              _print(_safe(this.getResponseFieldView(column,this.model.getColumnPermission(column))));
              _print(_safe('\n          </td>\n        '));
          }
        }
         // 管理列
        if (this.canManage()) {
        _print(_safe(' <td class=\'fr-table-col-remove\'  width="'+width+'">\n       '));
       		_.each(this.response_manage_buttons,function(btn,i){
    			_print(_safe('<a class="btn  btn-xs btn-outline btn-row  js-action-button hidden-print"  data-index="'+i+'" title="'+(btn.label?btn.label:FormRenderer.t.buttons[btn.type])+'" > <i class=" fa-lg  '+btn.icon +' fa-'+btn.style+'"></i></a>'));
    		});
 
	        _print(_safe('</td>\n      '));
        }
        _print(_safe('</tr>\n    '));
      }
    }
      _print(_safe('\n  </tbody>\n\n  '));
    
      _print(_safe('\n</table>\n\n</div>\n\n  '));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 子表（表单块模式）
window.JST["fields/tableBlock"] = function(__obj) {
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
        var column, i, j, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3,mode;
    	   if(this.model.numRows <= 0)
    		   return;
	      for (i = _j = 0, _ref1 = this.model.numRows - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
	    	    _ref2 = this.model.getColumns();
			    _print(_safe(JST["table/header"](this,i)));
			
	           _print(_safe("<div  class=\"fr-table-block\"><fieldset>" ));
	            for (j = _k = 0, _len1 = _ref2.length; _k < _len1; j = ++_k) {
		              column = _ref2[j];
		              column.row = i;
		              column.column= j;
		              _print(_safe(this.getResponseFieldView(column,this.model.getColumnPermission(column))));
	            }
	            _print(_safe("</fieldset></div>"));
	      }
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};
// =========展示页面===============
// 文本展示
window.JST["views/text"] = function(__obj) {
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
	   		
    	  	if(this.isSub){ // 子表
    			_print(_safe(' <div class="form-control-static" data-rv-text=\'model.value.'));
    	  	    _print(this.model.getColumn());
    		    _print(_safe('.'));
    		    _print(this.model.getRow());
    		    _print(_safe('\'  '));
    		    _print(_safe('></div>')); 
    	  	}else{
    	  		
    	  		_print(_safe(' <div class="form-control-static" data-rv-text=\'model.value\'></div>'));
    	  	}
	    	 
	    }).call(this);
	    
	    return __out.join('');
	  }).call((function() {
	    var obj = {
	      escape: function(value) {
	        return ('' + value)
	          .replace(/&/g, '&amp;')
	          .replace(/</g, '&lt;')
	          .replace(/>/g, '&gt;')
	          .replace(/"/g, '&quot;');
	      },
	      safe: _safe
	    }, key;
	    for (key in __obj) obj[key] = __obj[key];
	    return obj;
	  })());
	};
	
	// 文本展示
	window.JST["views/html"] = function(__obj) {
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
		   		
	    	  	if(this.isSub){ // 子表
	    			_print(_safe(' <div class="form-control-static" data-rv-html=\'model.value.'));
	    	  	    _print(this.model.getColumn());
	    		    _print(_safe('.'));
	    		    _print(this.model.getRow());
	    		    _print(_safe('\'  '));
	    		    _print(_safe('></div>')); 
	    	  	}else{
	    	  		
	    	  		_print(_safe(' <div class="form-control-static" data-rv-html=\'model.value\'></div>'));
	    	  	}
		    	 
		    }).call(this);
		    
		    return __out.join('');
		  }).call((function() {
		    var obj = {
		      escape: function(value) {
		        return ('' + value)
		          .replace(/&/g, '&amp;')
		          .replace(/</g, '&lt;')
		          .replace(/>/g, '&gt;')
		          .replace(/"/g, '&quot;');
		      },
		      safe: _safe
		    }, key;
		    for (key in __obj) obj[key] = __obj[key];
		    return obj;
		  })());
		};
// 文本展示
window.JST["views/showvalue"] = function(__obj) {
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
	   		
    	  	if(this.isSub){ // 子表
    			_print(_safe(' <div class="form-control-static" data-rv-text=\'model.showvalue.'));
    	  	    _print(this.model.getColumn());
    		    _print(_safe('.'));
    		    _print(this.model.getRow());
    		    _print(_safe('\'  '));
    		    _print(_safe('></div>')); 
    	  	}else{
    	  		_print(_safe(' <div class="form-control-static" data-rv-text=\'model.showvalue\'></div>'));
    	  	}
	    	 
	    }).call(this);
	    
	    return __out.join('');
	  }).call((function() {
	    var obj = {
	      escape: function(value) {
	        return ('' + value)
	          .replace(/&/g, '&amp;')
	          .replace(/</g, '&lt;')
	          .replace(/>/g, '&gt;')
	          .replace(/"/g, '&quot;');
	      },
	      safe: _safe
	    }, key;
	    for (key in __obj) obj[key] = __obj[key];
	    return obj;
	  })());
	};	
	
	window.JST["views/toText"] = function(__obj) {
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
			   		
			 	    _print(_safe(' <p class="form-control-static" >'+this.model.toText()+'</p>'));
			    	 
			    }).call(this);
			    
			    return __out.join('');
			  }).call((function() {
			    var obj = {
			      escape: function(value) {
			        return ('' + value)
			          .replace(/&/g, '&amp;')
			          .replace(/</g, '&lt;')
			          .replace(/>/g, '&gt;')
			          .replace(/"/g, '&quot;');
			      },
			      safe: _safe
			    }, key;
			    for (key in __obj) obj[key] = __obj[key];
			    return obj;
			  })());
			};	
 

	
// =========主要页面===============

window.JST["main"] = function(__obj) {
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
      _print(_safe('<div class=\'fr-loading\'>\n  '));
    
      _print(FormRenderer.t.loading_form);
    
      _print(_safe('\n</div>\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 表单标题
window.JST["partials/form_header"] = function(__obj) {
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
    	// 表单标题
        if(!this.model.get(FormOptions.t.propertys.HIDE_NAME) && $.isNotEmpty(this.model.get(FormOptions.t.propertys.NAME)) ){
	      _print(_safe('<div class="fr-form-header-title">\n<span> '));
	      _print(_safe(FormRenderer.formatHTML(this.model.get(FormOptions.t.propertys.NAME))));
	      _print(_safe('</span>\n</div>\n'));
        }
        
     // 表单描述
      if(!this.model.get(FormOptions.t.propertys.HIDE_DESC)){
	      _print(_safe('<div class="fr-form-header-description">\n  '));
	      _print(_safe(this.model.get(FormOptions.t.propertys.DESC)));
	      _print(_safe('\n</div>\n'));
      }
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};


// 描述
window.JST["partials/desc"] = function(__obj) {
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
      if (this.model.get(FormOptions.t.mappings.DESC)) {
        _print(_safe('\n  <div class=\'fr-help-block\'>\n    '));
        _print(_safe(this.model.get(FormOptions.t.mappings.DESC)));
        _print(_safe('\n  </div>\n'));
      }
      _print(_safe('\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};


// 字段的标题
window.JST["partials/label"] = function(__obj) {
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
      _print(_safe('<label  class=\'fr-control-label\''));
      
      _print(_safe('>\n  '));
      
      _print(this.model.get(FormOptions.t.mappings.LABEL));
      
	  if (this.model.get(FormOptions.t.mappings.UNITS)) {
		    _print(_safe('\n  <span class=\'fr-units\'>(\n    '));
		    _print(this.model.get(FormOptions.t.mappings.UNITS));
		    _print(_safe('\n ) </span>\n'));
	  }
      
      _print(_safe(JST["partials/required"](this)));
    
      _print(_safe('\n  '));
    
      _print(_safe(JST["partials/labels"](this)));
    
      _print(_safe('\n'+(FormRenderer.variables.colon?':':'')+'</label>\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 显示的文字
window.JST["partials/labels"] = function(__obj) {
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
      if (this.showLabels) {
        _print(_safe('\n  '));
        if (this.model.get('blind')) {
          _print(_safe('\n    <span class=\'label\'>'));
          _print(FormRenderer.t.blind);
          _print(_safe('</span>\n  '));
        }
        _print(_safe('\n  '));
        if (this.model.get('admin_only')) {
          _print(_safe('\n    <span class=\'label\'>'));
          _print(FormRenderer.t.hidden);
          _print(_safe('</span>\n  '));
        }
        _print(_safe('\n  '));
        if (this.model.isConditional()) {
          _print(_safe('\n    <span class=\'label\'>'));
          _print(FormRenderer.t.hidden_until_rules_met);
          _print(_safe('</span>\n  '));
        }
        _print(_safe('\n'));
      }
    
      _print(_safe('\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 必填
window.JST["partials/required"] = function(__obj) {
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
	  _print(_safe('<span class=\'fr-required '+(this.model.get(FormOptions.t.mappings.REQUIRED)?'':'hidden')+' \' title=\'required\' >&nbsp;*</span>'));
	  _print(_safe('\n'));
  }).call(this);
  
  return __out.join('');
}).call((function() {
  var obj = {
    escape: function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },
    safe: _safe
  }, key;
  for (key in __obj) obj[key] = __obj[key];
  return obj;
})());
};


// 子表 表头
window.JST["table/header"] = function(__obj,row) {
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
	  // 标题
	    _print(_safe(' <div class="fr-table-header">'));
	    _print(_safe('\n<div class="fr-table-header-label">'+this.model.get(FormOptions.t.mappings.LABEL)+($.isNotEmpty(row)?('('+(row+1)+')'):'')+'</div>'));
	 // 按钮组
	    _print(_safe('\n <div class="fr-table-tools hidden-print "   data-row-index="'+(row?row:'')+'">'));
	    
	    if(this.canToolbar()){
    		_.each(this.response_toolbar_buttons,function(btn,i){
    			if(btn.type == 'edit' || (row == 0 && btn.type == 'remove'))
					return true;
    			_print(_safe('<a class="btn '+btn.style+' '+btn.icon +'  js-action-button"  data-index="'+i+'" >'+(btn.label?btn.label:FormRenderer.t.buttons[btn.type])+'</a>'));
    		});
	    }
	   _print(_safe('</div></div>\n    '));
	   // end标题
  
  }).call(this);
  
  return __out.join('');
}).call((function() {
  var obj = {
    escape: function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },
    safe: _safe
  }, key;
  for (key in __obj) obj[key] = __obj[key];
  return obj;
})());
};
// 控件字段
window.JST["partials/response_field"] = function(__obj) {
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
	  if(this.isHide())
		  return  this.setHide(); 
	  if(this.field_type == 'table' ){// 子表
		 if(this.model.getMode() == 'block'){// 块模式
			// 内容
		    _print(_safe('\n  <div class=\'fr-table-content\'>\n    '));
		    _print(_safe(JST["fields/" + this.field_type+"Block"](this)));
		    _print(_safe('\n</div>\n'));  
  		}else{
  			// 标题
  		    _print(_safe(JST["table/header"](this)));
		   // 内容
		    _print(_safe('\n  <div class=\'fr-table-content\'>\n    '));
		    _print(_safe(JST["fields/" + this.field_type](this)));
		    _print(_safe('\n</div>\n'));  
  		}
	
	  }else{
		  	if(this.hasLabel()){
				if(this.isSub){
					_print(_safe('<div data-el=\''));
				    _print(this.model.getCode());
				    _print(_safe('.'));
				    _print(this.model.getColumn());
				    _print(_safe('.'));
				    _print(this.model.getRow());
				    _print(_safe('\'\n '));
				   if(this.field_type != 'radio' && this.field_type != 'checkbox'){
				    	_print(_safe(' style="width:'+this.model.getWidth()+'"'));
				   }
				   // 对齐方式
				   var _align =   this.model.get(FormOptions.t.mappings.ALIGN)?this.model.get(FormOptions.t.mappings.ALIGN):((this.field_type == 'number')?'right':'left'),
						 _alignClass = 'text-'+_align;
				   _print(_safe(' class="'+_alignClass+'"  > '));
				}
				_print(_safe(JST["fields/" + this.field_type](this)));
				
				if(this.isSub){
					_print(_safe('</div>'));
				}
			  }else{
			    _print(_safe('\n <div class="fr-form-group"> '));
			    _print(_safe(JST["partials/label"](this)));
			    _print(_safe('\n  <div class=\'fr-form-block\'>\n    '));
				if(this.isSub){
					_print(_safe('<div  data-el=\''));
				    _print(this.model.getCode());
				    _print(_safe('.'));
				    _print(this.model.getColumn());
				    _print(_safe('.'));
				    _print(this.model.getRow());
				    _print(_safe('\'\n '));
				    _print(_safe(' > '));
				}
			    _print(_safe(JST["fields/" + this.field_type](this)));
				
				if(this.isSub){
					_print(_safe('</div>'));
				}
			    _print(_safe(JST["partials/desc"](this)));
			    _print(_safe('\n'));
			    _print(_safe('\n  </div></div>\n'));  
			}
	  }
	  
  
  }).call(this);
  
  return __out.join('');
}).call((function() {
  var obj = {
    escape: function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },
    safe: _safe
  }, key;
  for (key in __obj) obj[key] = __obj[key];
  return obj;
})());
};

// //////////////////验证框架///////////////////////////////////////////
// 字数长度统计
window.JST["partials/length_counter"] = function(__obj) {
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
      _print(_safe('<span class=\'fr_length_counter\' data-rv-text=\'model.currentLength\'></span>\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 长度验证
window.JST["partials/length_validations"] = function(__obj) {
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
      var max, min, units;
    
      min = this.model.get('field_options.minlength');
    
      _print(_safe('\n'));
    
      max = this.model.get('field_options.maxlength');
    
      _print(_safe('\n'));
    
      units = this.model.getLengthValidationUnits();
    
      _print(_safe('\n\n'));
    
      if (this.model.hasLengthValidations()) {
        _print(_safe('\n  <div class=\'fr_min_max\'>\n    <span class=\'fr_min_max_guide\'>\n      '));
        if (min && max) {
          _print(_safe('\n        '));
          if (min === max) {
            _print(_safe('\n          '));
            _print(FormRenderer.t.enter_exactly.replace(':num', min));
            _print(_safe(' '));
            _print(FormRenderer.t[units]);
            _print(_safe('.\n        '));
          } else {
            _print(_safe('\n          '));
            _print(FormRenderer.t.enter_between.replace(':min', min).replace(':max', max));
            _print(_safe(' '));
            _print(FormRenderer.t[units]);
            _print(_safe('.\n        '));
          }
          _print(_safe('\n      '));
        } else if (min) {
          _print(_safe('\n        '));
          _print(FormRenderer.t.enter_at_least.replace(':min', min));
          _print(_safe(' '));
          _print(FormRenderer.t[units]);
          _print(_safe('.\n      '));
        } else if (max) {
          _print(_safe('\n        '));
          _print(FormRenderer.t.enter_up_to.replace(':max', max));
          _print(_safe(' '));
          _print(FormRenderer.t[units]);
          _print(_safe('.\n      '));
        }
        _print(_safe('\n    </span>\n\n    '));
        _print(_safe(JST["partials/length_counter"](this)));
        _print(_safe('\n  </div>\n'));
      }
    
      _print(_safe('\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};
// 最大、最小值验证
window.JST["partials/min_max_validations"] = function(__obj) {
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
      var max, min;
    
      if (this.model.hasMinMaxValidations()) {
        _print(_safe('\n  '));
        min = this.model.get('field_options.min');
        _print(_safe('\n  '));
        max = this.model.get('field_options.max');
        _print(_safe('\n\n  <div class=\'fr_min_max\'>\n    '));
        if (min && max) {
          _print(_safe('\n      '));
          _print(FormRenderer.t.enter_between.replace(':min', min).replace(':max', max));
          _print(_safe('.\n    '));
        } else if (min) {
          _print(_safe('\n      '));
          _print(FormRenderer.t.enter_at_least.replace(':min', min));
          _print(_safe('.\n    '));
        } else if (max) {
          _print(_safe('\n      '));
          _print(FormRenderer.t.enter_up_to.replace(':max', max));
          _print(_safe('.\n    '));
        }
        _print(_safe('\n  </div>\n'));
      }
    
      _print(_safe('\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// ////////////////////////////不需要输入字段/////////////////////////////////
window.JST["partials/non_input_response_field"] = function(__obj) {
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
    	 
  	  if(this.isHide()){
  		  return  this.setHide() ;
  	  }else{
  		this.setShow() ;
  	  }
  	  
      _print(_safe(JST["fields/" + this.field_type](this)));
    
      _print(_safe('\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 流程图
window.JST["fields/flow_diagram"] = function(__obj) {
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
	    	var url = this.getUrl();
	    	if($.isEmpty(url))
	    		return ;
		  _print(_safe('<label  class="fr-desc-label"'));
	      _print(_safe('>\n  '));
	      _print(this.model.get(FormOptions.t.mappings.LABEL));
	      _print(_safe('\n  '));
	      _print(_safe('\n</label>\n'));
	      
		  _print(_safe('<hr class="fr-hr  solid"></hr>'));
	      
	      _print(_safe('\n<iframe id="'+this.getDomId()+'" src="'+__ctx+url+'" width="100%" scrolling="no"  frameborder="no" frameborder="0">\n'));
	
	    	
	   }).call(this);
	    
	    return __out.join('');
	  }).call((function() {
	    var obj = {
	      escape: function(value) {
	        return ('' + value)
	          .replace(/&/g, '&amp;')
	          .replace(/</g, '&lt;')
	          .replace(/>/g, '&gt;')
	          .replace(/"/g, '&quot;');
	      },
	      safe: _safe
	    }, key;
	    for (key in __obj) obj[key] = __obj[key];
	    return obj;
	  })());
	};
	
// 审批历史
window.JST["fields/approval_history"] = function(__obj) {
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
	      	var url = this.getUrl();
	    	if($.isEmpty(url))
	    		return ;
	    	
	      _print(_safe('<label  class="fr-desc-label"'));
	      _print(_safe('>\n  '));
	      _print(this.model.get(FormOptions.t.mappings.LABEL));
	      _print(_safe('\n  '));
	      _print(_safe('\n</label>\n'));
	      
	      _print(_safe('<hr class="fr-hr  solid"></hr>'));
	      _print(_safe('\n<iframe id="'+this.getDomId()+'" src="'+__ctx+url+'" width="100%" scrolling="no"  frameborder="no" frameborder="0">\n'));

	    }).call(this);
	    
	    return __out.join('');
	  }).call((function() {
	    var obj = {
	      escape: function(value) {
	        return ('' + value)
	          .replace(/&/g, '&amp;')
	          .replace(/</g, '&lt;')
	          .replace(/>/g, '&gt;')
	          .replace(/"/g, '&quot;');
	      },
	      safe: _safe
	    }, key;
	    for (key in __obj) obj[key] = __obj[key];
	    return obj;
	  })());
	};

// 描述
window.JST["fields/desc"] = function(__obj) {
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
	    	
	      _print(_safe('<label  class="fr-desc-label"'));
	      
	      _print(_safe('>\n  '));
	      _print(this.model.get(FormOptions.t.mappings.LABEL));
	      _print(_safe('\n  '));
	    
	      _print(_safe(JST["partials/labels"](this)));
	    
	      _print(_safe('\n</label>\n'));
	      
	      
	      _print(_safe('<hr  class="fr-hr '+(this.model.get(FormOptions.t.mappings.SPLIT_LINE)?'':'hidden') +' '  +(this.model.get(FormOptions.t.mappings.LINE_STYLE)) +'"/>  '));
	      
	      _print(_safe('\n\n<div class=\'fr-text size-'));
	    
	      _print(this.model.getSize());
	    
	      _print(_safe('\'>\n  '));
	    
	      _print(_safe(FormRenderer.formatHTML(this.model.get(FormOptions.t.mappings.DESC))));
	    
	      _print(_safe('\n</div>\n'));
	    
	    }).call(this);
	    
	    return __out.join('');
	  }).call((function() {
	    var obj = {
	      escape: function(value) {
	        return ('' + value)
	          .replace(/&/g, '&amp;')
	          .replace(/</g, '&lt;')
	          .replace(/>/g, '&gt;')
	          .replace(/"/g, '&quot;');
	      },
	      safe: _safe
	    }, key;
	    for (key in __obj) obj[key] = __obj[key];
	    return obj;
	  })());
	};
	
// 文本
window.JST["fields/label"] = function(__obj) {
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
		_print(_safe(JST["views/html"](this)));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};	
	

// 书签
window.JST["plugins/bookmark_draft"] = function(__obj) {
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
  _print(_safe('<div class=\'fr_bookmark\'>\n  <a href=\'#\' class=\'js-fr-bookmark\'>'));

  _print(FormRenderer.t.finish_later);

  _print(_safe('</a>\n</div>\n'));

}).call(this);

return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};
// 标签页
	window.JST["fields/tab_break"] = function(__obj) {
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
	    _print(_safe('<div class=\'fr_tab_break_inner\'>\n  Tab break\n</div>\n'));
	  
	  }).call(this);
	  
	  return __out.join('');
	}).call((function() {
	  var obj = {
	    escape: function(value) {
	      return ('' + value)
	        .replace(/&/g, '&amp;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/"/g, '&quot;');
	    },
	    safe: _safe
	  }, key;
	  for (key in __obj) obj[key] = __obj[key];
	  return obj;
	})());
	};

if (!window.JST) {
	  window.JST = {};
	}
window.JST["partials/pagination"] = function(__obj) {
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
        var i, idx, _i, _len, _ref,activePage;
        if ( (_ref =this.form_renderer.visiblePages()).length <= 1) {
        	return ;
        }
        _print(_safe('\n  <ul class=\' pages\'>\n    '));
        activePage = this.form_renderer.state.get('activePage');
        
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        		i = _ref[idx];
	          var model =  this.form_renderer.getPageModel(i);
	          var state =  (i === activePage)?'active':( (i<activePage)?'complete':'');

          		_print(_safe('\n      <li class=\''));
	          if (!this.form_renderer.isPageValid(i) && (state =='active' || state =='complete')) {
	            _print(_safe('has_errors '));
	          }
	          
	          _print(_safe( state));
	          
	          _print(_safe('\'     '));
          
	          if(state == 'complete' ){
	              _print(_safe('  data-activate-page="'));
	              _print(i);
	              _print(_safe('"'));
	          }
          
          	_print(_safe('  >\n   '));
          
	        _print(_safe('\n          <div class="page-number" >'));
	        _print(idx + 1);
	        _print(_safe('</div>\n        '));
   
     
	        _print(_safe('<div class="page-desc"><span class="page-title"> '+model.get(FormOptions.t.mappings.LABEL)+'</span><p class="page-help-block">'+(model.get(FormOptions.t.mappings.DESC)||'')+'</p></div>'));
	        _print(_safe('\n      </li>\n    '));
        }
        _print(_safe('\n  </ul>\n'));
    
      _print(_safe('\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};
		
// 标签页
window.JST["partials/tabsContainer"] = function(__obj) {
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
        var i, idx, _i, _len,_ref,activeTab;
        if ((_ref=this.page_renderer.visibleTabs()).length < 1) {
        	return;
        }
        activeTab =  this.page_renderer.state.get('activeTab');
        _print(_safe('\n  <ul class=\'nav nav-pills nav-tabs\'>\n    '));
        
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          i = _ref[idx];
          var model =  this.page_renderer.getTabModel(i);
          _print(_safe('\n      <li class=\''));
          if (i === activeTab) {
             _print(_safe('active'));
          }

          _print(_safe('\'>\n        '));
   
        _print(_safe('\n     <a data-activate-tab="'));
        _print(i);
        _print(_safe('" href=\'javascript:void(0)\'>\n            '));
        _print(model.get(FormOptions.t.mappings.LABEL));
            if (!this.page_renderer.isTabValid(i)) {
        _print(_safe('\n <i class="fa fa-exclamation-circle has-errors" data-tip data-text="标签页下有不规范的值！"></i>\n     '));
                 }
        _print(_safe('\n </a >\n     '));

          _print(_safe('\n      </li>\n    '));
        }
        _print(_safe('\n  </ul>\n'));
    
      _print(_safe('\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

// 折叠卡
window.JST["fields/fold_card"] = function(__obj) {
	var _safe = function(value) {
	  if (typeof value === 'undefined' && value == null)
	    value = '';
	  var result = new String(value);
	  result.ecoSafe = true;
	  return result;
	};
	
	return (function() {
	  var __out = [], 
	  	__self = this, 
	  	_print = function(value) {
		    if (typeof value !== 'undefined' && value != null)
		      __out.push(value.ecoSafe ? value : __self.escape(value));
		  }, 
		_capture = function(callback) {
		    var out = __out, result;
		    __out = [];
		    callback.call(this);
		    result = __out.join('');
		    __out = out;
		    return _safe(result);
		  };
		  
	  (function() {
		  var f_id = _.uniqueId('fold_card_');
		  this.model.set('f_id', f_id);
		  
		  _print(_safe('<div class="panel panel-fold-card" data-toggle="collapse" '));
		  _print(_safe(' data-f_id="'+f_id+'" '));
		  _print(_safe(' data-end="' + this.model.get('name') + '">\n'));
		  
		  if (!this.form_renderer.isFoldCardValid(f_id)) {
			  _print(_safe('<i class="fa fa-exclamation-circle has-errors" data-tip data-text="折叠卡中有不规范的值！"></i>'));
		  }
		  
		  _print(_safe('<div class="panel-heading"><h4 class="panel-title">'+this.model.get('label')+'</h4></div>'));
		  _print(_safe('</div>\n'));
	  }).call(this);
	  
	  return __out.join('');
	}).call((function() {
	  var obj = {
	    escape: function(value) {
	      return ('' + value)
	        .replace(/&/g, '&amp;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/"/g, '&quot;');
	    },
	    safe: _safe
	  }, key;
	  for (key in __obj) obj[key] = __obj[key];
	  return obj;
	})());
};

// 分节符
window.JST["fields/section_break"] = function(__obj) {
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
      var formattedDescription;
    
      _print(_safe(JST["partials/labels"](this)));
    
      _print(_safe('\n\n'));
    
      formattedDescription = FormRenderer.formatHTML(this.model.get('field_options.description'));
    
      _print(_safe('\n<'));
    
      _print(this.model.sizeToHeaderTag());
    
      _print(_safe('>'));
    
      _print(this.model.get('label'));
    
      _print(_safe('</'));
    
      _print(this.model.sizeToHeaderTag());
    
      _print(_safe('>\n'));
    
      if (formattedDescription) {
        _print(_safe('\n  <div class=\'fr_text size_'));
        _print(this.model.getSize());
        _print(_safe('\'>\n    '));
        _print(_safe(formattedDescription));
        _print(_safe('\n  </div>\n'));
      }
    
      _print(_safe('\n\n<hr />\n'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};


if (!window.JST) {
	  window.JST = {};
	}
	window.JST["plugins/toolbar"] = function(__obj) {
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
	    	 var _i, _len, _buttons,pageModel,pageButtons,
	    	 		isFr =true;
	    	 if(!this.form_renderer.getActivePageModel){
	    		 isFr =false;
	    	 }
	    	 	
	    	 _print(_safe('<div class="nav navbar-toolbar navbar-left">'));
		      if( !isFr ||   (this.form_renderer.isLastPage() && this.form_renderer.options.enablePages ) ||   !this.form_renderer.options.enablePages) {
		    	  this.response_buttons.each((function(_this) {
				        return function(rf) {
				        	_print(_safe('<a data-id="'+rf.cid+'" class="btn '+rf.getStyle()+' '+rf.getIcon()+'" href="javascript:void(0)" ><span>'+rf.getLabel()+'</span></a> '));
				        };
			      })(this));
		      }else{
		    	  //处理不进行分页的控制
		    	  this.response_buttons.each((function(_this) {
				        return function(rf) {
				  	    	if(	rf.getEnablePage()){
				  	     		_print(_safe('<a data-id="'+rf.cid+'" class="btn '+rf.getStyle()+' '+rf.getIcon()+'" href="javascript:void(0)" ><span>'+rf.getLabel()+'</span></a> '));
				  	    	}
				    };
			      })(this));
		      }
		      _print(_safe('</div>'));
		      
		      //分页的
		      if( isFr && this.form_renderer.options.enablePages){
			    	 pageModel =  this.form_renderer.getActivePageModel();
		          _print(_safe('<div class="nav navbar-toolbar  navbar-right">'));
		          
		    	  _print(_safe('<a data-fr-previous-page  class="btn  btn-primary btn-outline  fa fa-chevron-circle-left " '+ ( this.form_renderer.isFirstPage()?'disabled="disabled"':'')+'  href="javascript:void(0)" ><span>'+(pageModel.get(FormOptions.t.mappings.PREV_PAGE)||'')+'</span></a> '));
		 
		    	  _print(_safe('<a data-fr-next-page  class="btn  btn-primary btn-outline  fa fa-chevron-circle-right"  '+  ( this.form_renderer.isLastPage()?'disabled="disabled"':'') +' href="javascript:void(0)" ><span>'+(pageModel.get(FormOptions.t.mappings.NEXT_PAGE)||'')+'</span></a> '));
		
		          _print(_safe('</div>'));
		      }
		      
	    
	    }).call(this);
	    
	    return __out.join('');
	  }).call((function() {
	    var obj = {
	      escape: function(value) {
	        return ('' + value)
	          .replace(/&/g, '&amp;')
	          .replace(/</g, '&lt;')
	          .replace(/>/g, '&gt;')
	          .replace(/"/g, '&quot;');
	      },
	      safe: _safe
	    }, key;
	    for (key in __obj) obj[key] = __obj[key];
	    return obj;
	  })());
	};

})(window);