/**
 * 表单构建工具
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-10-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
  var BuilderView, EditFieldView, Formbuilder, FormbuilderCollection, FormbuilderModel,ViewFieldView,FormHeaderView,FormPropertyView,SubTableColumn={}, _ref, _ref1, _ref2, _ref3, _ref4,_ref5,_ref6,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    $query =[],
    
    Select2Util = {
    		init : function($el,options){
    			if($el.length <= 0)
    				return;

    			var _this = this,
    				$val = '',
    				url = options.url,
    				multiple = options.multiple? options.multiple:false,
    				clear = $.isNotEmpty(options.clear)? options.clear:false,
    				split = $.isNotEmpty(options.split)?',':options.split;
    						
    			var params = {
    					placeholder:'请选择',
    					theme: "bootstrap",
    					language: "zh-CN",
    					multiple: multiple,
    					allowClear: clear,
    					separator: split	,
    					formatSelection :options.formatSelection ,
    					formatResult :options.formatResult,
    					escapeMarkup : function (markup) {
    						return markup;
    					},
    					createSearchChoice :options.createSearchChoice,
    				    initSelection:options.initSelection,
    				    templateSelection:options.templateSelection,
    					templateResult:options.templateResult,
    					ajax : {
    	    				    url: url,
    	    				    dataType: 'json',
    	    				    delay: 250,
    	    				    data: function (_params) {
    	    				    	var params = options.params||{};
    	    				    	params["queryName"] = _params.term;
    	    				    	return params;
    	    				    }
    	    					,processResults: function (results) {
    	    						if(options.loadData)
    	    							options.loadData(results.data);
    	    						return {
    	    				          results: results.data
    	    				        };
    	    				     },
    	    				     cache: true
    	    				}
    				};
    			
    			$el.select2(params);
    		}
    };
    
    
    // ====================字段模型==================
  FormbuilderModel = (function(_super) {
    __extends(FormbuilderModel, _super);

    function FormbuilderModel() {
      _ref = FormbuilderModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FormbuilderModel.prototype.sync = function() {};

    FormbuilderModel.prototype.indexInDOM = function() {
      var $wrapper,_this = this;
      $wrapper = $(".fb-field-wrapper").filter((function(_, el) {
        return $(el).data('cid') === _this.cid;
      }));
      return $(".fb-field-wrapper").index($wrapper);
    };

    FormbuilderModel.prototype.is_input = function() {
      return Formbuilder.inputFields[this.get(FormOptions.t.mappings.FIELD_TYPE)] != null;
    };
    

    FormbuilderModel.prototype.is_valid = function() {
        return _.isEmpty( this.get(FormOptions.t.mappings.FIELD_TYPE));
      };
    
      FormbuilderModel.prototype. isPageBreak= function() {
          return "page_break" === this.get(FormOptions.t.mappings.FIELD_TYPE);
      };
 
     
    return FormbuilderModel;

  })(Backbone.DeepModel);
  
  // ====================字段集合==================
  FormbuilderCollection = (function(_super) {
    __extends(FormbuilderCollection, _super);

    function FormbuilderCollection() {
      _ref1 = FormbuilderCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    FormbuilderCollection.prototype.initialize = function() {
      return this.on('add', this.copyCidToModel);
    };

    FormbuilderCollection.prototype.model = FormbuilderModel;

    FormbuilderCollection.prototype.comparator = function(model) {
      return model.indexInDOM();
    };

    FormbuilderCollection.prototype.copyCidToModel = function(model) {
    	if($.isEmpty(model.name) && !model.is_input() )//只针对只读控件
    		model.attributes.name = $.uniqueId();
         
      return model.attributes.cid = model.cid;
    };
    
    FormbuilderCollection.prototype.is_not_input = function(model) {
        return Formbuilder.nonInputFields[model.attributes[FormOptions.t.mappings.FIELD_TYPE]] != null;
      };

      FormbuilderCollection.prototype.pageBreakList =function(){
    	  return this.filter(function(m) {
              return m.isPageBreak()
          });
      }
      
    return FormbuilderCollection;

  })(Backbone.Collection);
  
  // ====================表单header属性==================
 FormHeaderView = (function(_super) {
	    __extends(FormHeaderView, _super);
	    function FormHeaderView() {
	        _ref2 = FormHeaderView.__super__.constructor.apply(this, arguments);
	        return _ref2;
	      }
	    FormHeaderView.prototype.className = "form-header";
	    
	    FormHeaderView.prototype.events = {
	    	      'click': 'focusEditView'
	   };
	    
	    FormHeaderView.prototype.initialize = function(options) {
	        this.parentView = options.parentView;
	        this.listenTo(this.model, "change", this.render);
	        return  this;
	      };
	      
	    FormHeaderView.prototype.render = function() {
	    	var html = Formbuilder.templates["view/form-header"]({
	            rf: this.model
	          });
	          
	        this.$el.html(html);
	        return this;
	      };
	      
		FormHeaderView.prototype.focusEditView = function() {
			this.parentView.$responseFormHeader.addClass('editing');
			this.parentView.$responseFields.find(".fb-field-wrapper").removeClass('editing');
		   return  this.parentView.activeTab("form_property");
		};
	    return FormHeaderView;
  })(Backbone.View);
 // ====================表单属性==================
 FormPropertyView = (function(_super) {
	    __extends(FormPropertyView, _super);

	    function FormPropertyView() {
	      _ref3 = FormPropertyView.__super__.constructor.apply(this, arguments);
	      return _ref3;
	    }
	    
	    FormPropertyView.prototype.className = "edit-form-property";

	    FormPropertyView.prototype.events = {
	    	'blur [data-toggle="dropdownTree"]': 'dropdownTree', // 设置分类
	    	'click .js-form-verify': 'formVerify',// 表单提交校验（包含新增和编辑）
		    'click .js-remove-verify': 'removeVerify', // 移除表单提交校验
		    'click .js-form-rules':'setFormRules',
		    'click .js-form-script':'setFormScript'
	    };
		
	    FormPropertyView.prototype.initialize = function(options) {
	      this.parentView = options.parentView;
	      this.model.bind('change', this.parentView.handleFormUpdate, this.parentView);
	      return  this;
	    };

	    FormPropertyView.prototype.render = function() {
	        var html =Formbuilder.templates["edit/form-property"]({
		          rf: this.model
		      });
	        
		      this.$el.html(html);
		      
		      rivets.bind(this.$el, {
		        model: this.model
		      });
		      
		      QtipUtils.qtip(this.$el);
		      return this;
	    };

	    // 选择分类树
	    FormPropertyView.prototype.dropdownTree =function(e){
	      var   $el = $(e.currentTarget),id=$el.data("id");
	      this.model.set("typeName",$el.val());
	      this.model.set("typeId",$(id).val());
	    };
	
	    // 表单提交校验 编辑、新增
	    FormPropertyView.prototype.formVerify = function(e){
				var _this =this,
			       $el = $(e.currentTarget),
			       url = __ctx+'/platform/form/formDef/verify.htm',
			       key =FormOptions.t.propertys.VERIFYS,
			       verifys = this.model.get(key)||[],
			       keywords = _.allKeys(FormulaUtil),
			       params ={},
			       formula ='',
			       msg ='',
			       i = -1;
			if($el.hasClass("js-edit-verify")){
				var item = '.verify';
		    	   i = this.$el.find(item).index($el.closest(item));
		    	   formula = verifys[i].formula;
		    	   msg = verifys[i].msg;
		     }		
					
			params = {
		    			bo: Formbuilder.boDef,
		    			label:'公式',
		    			value:formula||'',
		    			msg:msg||'',
		    			keywords:keywords
		    	}; 
			
			DialogUtil.dialog({
				title:"表单提交校验",
				params:params,
				area: ['780px', '600px'],
				content:url,
				btn:[{
		        	label: '确定',
		        	iconCls:'btn btn-primary fa fa-ok',
		            action: function(dialog,index) {
		          	  var  data = DialogUtil.getChildFrameWindow(index).getVerifyData();
		          	  if(_.isEmpty(data.formula)){
		          		  DialogUtil.msg("请设置校验公式");
		          		  return;
		          	  }
		          	  if(_.isEmpty(data.msg)){
		          		  DialogUtil.msg("请设置校验错误提示");
		          		  return;
		          	  }
		    	      if (i > -1) {
		    	    	  verifys.splice(i ,1, data);
		  		      } else {
		  		    	verifys.push(data);
		  		      }
		    	      _this.model.set(key,verifys);
		    	      _this.model.trigger("change:" + key);
		    	      _this.forceRender();
		              DialogUtil.close(index);
		            }
		        },  {
		        	label: '取消',
		        	iconCls:'btn btn-danger fa fa-cancel',
		            action: function(dialog,index) {
		            	DialogUtil.close(index);
		            }
		        }]
			});
	    };
	    
	    /**
		 * 删除验证
		 */
	    FormPropertyView.prototype.removeVerify = function(e){
	       	e.preventDefault(); e.stopPropagation();
	        var $el, index, options,key,clz;
	        	clz = ".js-remove-verify";
	        	key = FormOptions.t.propertys.VERIFYS;
	        	
	        index = this.$el.find(clz).index($el);
	        options = this.model.get(key);
	        options.splice(index, 1);
	        this.model.set(key, options);
	        this.model.trigger("change:" + key);
	        return this.forceRender();
	    };
	    
	    FormPropertyView.prototype.setFormRules = function(){
	    	var _this =this,
    		models = this.parentView.collection.models,
    		key =FormOptions.t.propertys.RULES,
    		fields = [];
    	
			_.filter(models,function(m){
					fields.push(m.attributes);
			});
			if(fields.length == 0){
				DialogUtil.msg("请设置字段");
				return;
			}
		
	  DialogUtil.dialog({
    		title:'表单规则设置',
    		area: ['850px', '600px'],
    		params: {
    			data:this.model.get(key),
    			fields:fields
    		},
    		content:__ctx+'/platform/form/formDef/rules.htm',
    		btn:[{
            	label: '确定',
            	iconCls:'btn btn-primary fa fa-ok',
                action: function(dialog,index) {
              	  var   data= DialogUtil.getChildFrameWindow(index).formDefRules.getData();
              	  if(!data) return;
        	     _this.model.set(key,data);
              	  DialogUtil.close(index);
                }
            }, {
            	label: '清空',
            	iconCls:'btn btn-success fa fa-clean',
                action: function(dialog,index) {
	           	     _this.model.set(key,null);
	             	  DialogUtil.msg("清空成功！");
	              	  DialogUtil.close(index);
                }
            },  {
            	label: '取消',
            	iconCls:'btn btn-danger fa fa-cancel',
                action: function(dialog,index) {
                	DialogUtil.close(index);
                }
            }]
    	});
	    };
	    
	    FormPropertyView.prototype.setFormScript   = function(){
	    	var _this =this,
		    	key =FormOptions.t.propertys.SCRIPT;
			
			  DialogUtil.dialog({
		    		title:'表单脚本设置',
		    		area: ['90%', '90%'],
		    		params: {
		    			data:this.model.get(key),
		    			bo: Formbuilder.boDef,
		    		},
		    		content:__ctx+'/platform/form/formDef/script.htm',
		    		callback:function(data){
		    			   _this.model.set(key,data);
		    		},
		    		btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		              	  var   data= DialogUtil.getChildFrameWindow(index).formDefScript.getData();
		              	  if(!data){
		              		DialogUtil.msg("请设置表单脚本");
		              		 return;
		              	  }
		        	     _this.model.set(key,data);
		              	  DialogUtil.close(index);
		                }
		            }, {
		            	label: '清空',
		            	iconCls:'btn btn-success fa fa-clean',
		                action: function(dialog,index) {
			           	     _this.model.set(key,null);
			           	  DialogUtil.msg("清空单脚本成功");
			           	  DialogUtil.getChildFrameWindow(index).formDefScript.cleanData();
		                }
		            },  {
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
		    	});
	    };
	    
	    
	    FormPropertyView.prototype.forceRender = function() {
	        return this.model.trigger('change');
	    };
	    
	    return FormPropertyView;
 })(Backbone.View);
 
 // ====================TODO 子表字段的处理==================
 SubTableColumn ={
		 changeColumn: function(_this,columns,column,index){
			 	column.on("change", function() {
			     	// 替换字段
			     	columns =_.clone(columns.slice(0));
			     	columns.splice(index, 1,column.toJSON());
			      	// 清空，重新渲染
			 		_this.model.set(FormOptions.t.mappings.COLUMNS, []);  
			 		_this.render();
			 		_this.model.set(FormOptions.t.mappings.COLUMNS,columns);  
			     });
			 },
			handerColumn:function(_this,e,self){
				   var $el, index,column, columns,item=".column", key = FormOptions.t.mappings.COLUMNS;
				   	$el = $(e.currentTarget);
				   	if(!self)
				   		$el = $el.closest(item);
				   	// 增加样式
				   	$el.addClass('editing').siblings(item).removeClass('editing');
				   	
				   index = _this.$el.find(item).index($el);
				   columns = _this.model.get(key) || [];
				   var clm = columns[index];
				   clm.is_sub= true;
				   clm.sub_name= _this.model.get( FormOptions.t.mappings.NAME);
				   
				   column = new FormbuilderModel(columns[index]);
				   
				   _this.parentView.subTable = _this.model;
				  _this.parentView.createAndShowEditView(column,true);
			    
				  SubTableColumn.changeColumn(_this,columns,column,index);
				  _this.model.trigger("change:" + key);
			 }
 };
  // ====================表单设计区域【中间字段处理】==================
  ViewFieldView = (function(_super) {
    __extends(ViewFieldView, _super);

    function ViewFieldView() {
      _ref4 = ViewFieldView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    ViewFieldView.prototype.className = "fb-field-wrapper";

    ViewFieldView.prototype.events = {
      'click': 'focusEditView',// 选择字段
      'click .js-duplicate': 'duplicate',// 复制字段
      'click .js-clear': 'clear',// 删除字段
      'click .column': 'focusColumn',// 选择子表字段
    };

    ViewFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      this.listenTo(this.model, "change", this.render);
      return this.listenTo(this.model, "destroy", this.remove);
    };

    ViewFieldView.prototype.render = function() {
    	var cid = this.model.cid;
    	//兼容之前版本
    	if(!this.model.is_input() && $.isEmpty(this.model.get(FormOptions.t.mappings.NAME))){
    		this.model.set(FormOptions.t.mappings.NAME,$.uniqueId());
    	}
	      this.$el.addClass('response-field-' + this.model.get(FormOptions.t.mappings.FIELD_TYPE))
	      		.removeClass("has-error")
	      		.attr("cid",cid )
	      		.data('cid', cid)
	      		.html(Formbuilder.templates["view/base" + (!this.model.is_input() ? '_non_input' : '')]({
	        rf: this.model
	      }));
	      //重新渲染编辑器
	    this. reRenderEditor();
	    
	   return this;
    };
    ViewFieldView.prototype.reRenderEditor = function(){
	    if(this.model.get(FormOptions.t.mappings.FIELD_TYPE) !='editor'){
	    	return;
	    }
	    
	   if(this.editor ||  this._initEditorCid){
		   if(this.editor){
			   this.editor.destroy(); 
			   this.initUeditor();
		   }
	   }else{
		    this._initEditorCid = this.model.cid
			 setTimeout((function(_this) {
	            return function() {
	            	_this.initUeditor();
					return _this;
	      		};
	          })(this), 0);  
	   }
    }
    
    ViewFieldView.prototype.initUeditor = function(){
     	var _this = this, cid =this.model.cid;
        var editor = this.editor =  new UE.ui.Editor(this.getEditorConfig());
        editor.render(cid);
        editor.addListener('click',function(editor){
 				_this.focusEditView();
 		});
    }
    
    //获取editor的配置
    ViewFieldView.prototype.getEditorConfig = function(){
    	var config  = window.UEDITOR_CONFIG;
     	if(this.model.get(FormOptions.t.mappings.MAXLENGTH))
     		config.maximumWords = this.model.get(FormOptions.t.mappings.MAXLENGTH);
     	var placeholder =  this.model.get(FormOptions.t.mappings.PLACEHOLDER)||""
	      if($.isNotEmpty(placeholder))
	     	 placeholder = '<span style=" color: rgb(191, 191, 191);">'+placeholder+'</span>';
     	config.initialContent= placeholder;
     	
     	var toolbars = this.model.get(FormOptions.t.mappings.TOOLBARS);
     	if(toolbars && toolbars.length >0){
     		config.toolbars.splice(0,window.UEDITOR_CONFIG.toolbars.length);
     		config.toolbars.push(toolbars);
     	}
     	config.readonly = true;
     	return config;
    }
    
    // 选中
    ViewFieldView.prototype.focusEditView = function() {
      return this.parentView.createAndShowEditView(this.model,true);
    };

    // 删除字段
    ViewFieldView.prototype.clear = function(e) {
	      var cb, x,
	        _this = this;
	      e.preventDefault();
	      e.stopPropagation();
	      cb = function() {
	        _this.parentView.handleFormUpdate();
	        return _this.model.destroy();
	      };
	      x = Formbuilder.options.CLEAR_FIELD_CONFIRM;
	      switch (typeof x) {
	        case 'string':
	          if (confirm(x)) {
	            return cb();
	          }
	          break;
	        case 'function':
	          return x(cb);
	        default:
	          return cb();
	      }
    };
    
    // 复制
    ViewFieldView.prototype.duplicate = function() {
	      var  attrs = _.clone(this.model.attributes);
	      delete attrs['cid'];
	      attrs[FormOptions.t.mappings.LABEL] += ' 复制';
	      return this.parentView.createField(attrs, {
	        position: this.model.indexInDOM() + 1
	      },true);
    };
    
    ViewFieldView.prototype.focusColumn=function(e){
		e.preventDefault(); e.stopPropagation();
		SubTableColumn.handerColumn(this,e);
    };

    return ViewFieldView;

  })(Backbone.View);
  
  // ====================TODO 编辑字段==================
  EditFieldView = (function(_super) {
    __extends(EditFieldView, _super);

    function EditFieldView() {
      _ref5 = EditFieldView.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    EditFieldView.prototype.className = "edit-response-field";

    EditFieldView.prototype.events = {
      'blur [data-toggle="dropdownTree"]': 'setDropdownName', // 点击字段名称
      
      'click .js-add-option': 'addOption',
      'click .js-remove-option': 'removeOption',
      'click .js-default-updated': 'defaultUpdated',// 默认选中的
      'input .option-label-input': 'forceRender',
      'click .js-add-other-option': 'addOption',
      'click .js-clean-bind-other-id': 'cleanBindOtherId',// 清空其他选择绑定字段
   
      
      'click .column': 'focusColumn',// 选择子表字段
      'click .js-add-column': 'addOption',// 添加字段
      'click .js-remove-column': 'removeOption',// 删除字段
      'click .js-add-button': 'addOption',  // 添加按钮
      'click .js-remove-button': 'removeOption',  // 删除按钮
      'click .js-setting-button': 'settingOption',// 设置按钮
      
      'change .js-change-mode': 'changeMode',//改变模式
      'click .js-back-table':'backTable',
      
      'click .js-predefined-choices':'predefinedChoices',
      'click .js-batch-edit-choices':'batchEditChoices',
      'click .js-toolbar-settings' :'toolbarSettings',
      'click .js-menubar-settings' :'menubarSettings',
      'change .js-change-date-type':'changeDateType',// 校验-改变日期类型
      
      // 自定义对话框
      'change .js-custom-dialog-type' :'changeCustomDialogType',
      'change .js-custom-dialog' :'changeCustomDialog',
      'click .js-bind-custom-dialog-btn' :'bindCustomDialog',
      'click .js-setting-custom-dialog-btn' :'settingCustomDialog',
      
      
      'change .js-datefmt-type':'changeDatefmt',
      'change .js-default-value-type':'changeDefaultValue',
      'click .js-default-value-btn':'setDefaultValue',
      'change .js-media-type':'changeMedia',
      'change .js-office-type':'changeOffice',
      'change .js-data-format':'changeDataFormat',
      
      //选择器
/*      'change .js-change-store':'changeStore',*/
      'click .js-clean-bind-id':'cleanBindId',
      
     //关联数据
      'click .js-setting-link-config-btn':'settingLinkConfig',//关联配置
      'click .js-setting-link-condition-btn':'settingLinkCondition',//关联条件
      'click .js-setting-link-linkage-btn':'settingLinkSetting',//关联联动
      'click .js-setting-link-attr-btn':'settingLinkSetting',//关联属性
      

      'click .js-clean-default-val':'cleanDefaultVal',      //清除默认值
      
      'click [data-role="change_field_type"]':'changeFieldType',// 改变字段类型
   
    	// 地址
      'change .js-select-top':'changeTop',
      'change .js-select-level':'changeLevel',
      'click .js-clean-city-top-val':'cleanCityTopVal',
      'click .js-clean-city-default-val':'cleanCityDefaultVal',
      
      // appLayout
      'click .js-appLayout-remove':'cleanBindId',
      'click .js-appLayout-select':'cleanBindId'
    };
 

    
    EditFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      this.listenTo(this.model, "change", this.changeModel);
      return this.listenTo(this.model, "destroy", this.remove);
    };
    
    EditFieldView.prototype. changeModel = function() {
        if(this.model.get(FormOptions.t.mappings.FIELD_TYPE) =='page_break'){
        	this.parentView._updatePageBreakNumbers();
        }
    }

    /**
	 * 渲染编辑字段
	 * 
	 * @returns {EditFieldView}
	 */
    EditFieldView.prototype.render = function() {
    	if(this.model.is_valid())
    		return this;
    	
      this.$el.html(Formbuilder.templates["edit/base" + (!this.model.is_input() ? '_non_input' : '')]({
          rf: this.model,
          table:this.model.get(FormOptions.t.mappings.IS_SUB)? this.parentView.subTable:null
      }));
      rivets.bind(this.$el, {
        model: this.model
      });
      
      // 初始化字段排序
      this.initSortable(this, ".choices", ".option",FormOptions.t.mappings.OPTIONS);
      this.initSortable(this, ".columns", ".column",FormOptions.t.mappings.COLUMNS);
      this.initSortable(this, ".buttons", ".button",FormOptions.t.mappings.BUTTONS);
      
      if(this.model.get(FormOptions.t.mappings.FIELD_TYPE) =='address'){
    	  this.initTopCityPicker();
    	  this.initDefaultCityPicker();
      }
      if(this.model.get(FormOptions.t.mappings.FIELD_TYPE) =='customDialog'){
    	  this.initCustomDialogIcon();
    	  this.initCustomDialogSelect();
      }
      
      if( this.model.get(FormOptions.t.mappings.FIELD_TYPE) =="autoNumber" ){
	    	  this.initAutoNumberSelect();
      }
      
      if(this.model.get(FormOptions.t.mappings.FIELD_TYPE) =='linkdata'){
    	  this.initLinkdataSelect();
      }
      QtipUtils.qtip(this.$el);
      return this;
    };
    
    
    //关联缓存
    EditFieldView.LINKDATA_CACHE ={};
    /**
     * 设置缓存
     * 
     */
    EditFieldView.prototype.setLinkdataCache = function(key,data){
    	if(!EditFieldView.LINKDATA_CACHE[key]  && $.isNotEmpty(data)){
    		EditFieldView.LINKDATA_CACHE[key] = data;
    	}else{
	    	$.ajax({
				  type: "GET",
				  url:  __ctx+ "/platform/data/dataTemplate/getSelectorDataByKey.htm",
				  data:{
		      	    	key:key
				  },
				  dataType: "json",
				  async: false,
				  success: function(results){
					  if(results.result && $.isNotEmpty(results.data)){
						  EditFieldView.LINKDATA_CACHE[key] = results.data;
					  }
				
				  }
	    	});
    	}
    };
    
    
    EditFieldView.prototype.initAutoNumberSelect = function(){
    	var url = __ctx+ "/platform/system/identity/getSelectorData.htm";
 
    	var _this = this;
    	
    	Select2Util.init(this.$el.find(".js-select-auto-number"),{
    		url:url,
			formatSelection : function (	item ) {return (item != undefined && item.name != undefined)?item.name:""; },  /*选择结果中的显示*/
    		formatResult : function (item) {/*【搜索】列表中的显示*/
				return (item != undefined && item.name != undefined)?item.name:"";  
    		},
    		createSearchChoice : function(term, data) {
				/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
		        return {alias: term, name: term};
		    },
    		initSelection:function (element, callback) {
		    	   callback({
		    		   alias:_this.model.get(FormOptions.t.mappings.IDENTITY),
		    		   name:_this.model.get(FormOptions.t.mappings.IDENTITY_NAME)
		    	   });
    		},
    		templateSelection:function(item){
    	    	if($.isEmpty(item.alias))
		    		return "请选择流水号";
		    	_this.model.set(FormOptions.t.mappings.IDENTITY,item.alias);
		    	_this.model.set(FormOptions.t.mappings.IDENTITY_NAME,item.name);
		    	return item.name;
    		},
    		templateResult: function (data) {
			    if (!data || !data.alias) { 
			    	return '';
			    }
			    return data.name;
			}
    	});
    }
    
    EditFieldView.prototype.initCustomDialogSelect = function(){
    	var url ="",
    		_key = 'alias',
    		_this = this,
    		type = this.model.get(FormOptions.t.mappings.DIALOG_TYPE);
    	if(type == "custom"){
    		url = __ctx+ "/platform/form/customDialog/getSelectorData.htm";
    	}else{
    		_key = 'key';
    		url = __ctx+ "/platform/data/dataTemplate/getSelectorData.htm?type=dialog";
    	}
    	var $el = this.$el.find(".js-custom-dialog");
    	$el.select2();
    	$el.select2('destroy');
    	Select2Util.init($el,{
    		url:url,
			formatSelection : function (item) {return item[_key];},  /*选择结果中的显示*/
    		formatResult : function (item) {/*【搜索】列表中的显示*/
				return (item != undefined && item.name != undefined)?item.name:"";  
    		},
    		createSearchChoice : function(term, data) {	/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
       			var d ={
 			  		   name:term
       			};
       			d[_key] = term;
		        return d;
		    },
    		initSelection:function (element, callback) {
    			var d ={
    			  		   name:_this.model.get(FormOptions.t.mappings.DIALOG_NAME)
    			};
    			d[_key] = _this.model.get(FormOptions.t.mappings.DIALOG);
		    	callback(d);
    		},
    		templateSelection:function(item){
    	    	if($.isEmpty(item[_key]))
		    		return "请选择自定义对话框";
		    	_this.model.set(FormOptions.t.mappings.DIALOG,item[_key]);
		    	_this.model.set(FormOptions.t.mappings.DIALOG_NAME,item.name);
		    	return item.name;
    		},
    		templateResult: function (data) {
			    if (!data || !data[_key]) { 
			    	return '';
			    }
			    return data.name;
			},
			loadData:function(){}
    	});
    }
    
    
    /**
     * 初始化对话框图标
     */
    EditFieldView.prototype.initCustomDialogIcon = function(){
    	var $el = $('.icp-dd',this.$el),_this =this;
    	$el.iconpicker({});
    	$el.on('iconpickerSelected', function(e) {
	    	var val =e.iconpickerValue;
             if(val.match(/^fa-/)){
            	 val = 'fa '+val;
             }else{
            	 val = 'glyphicon '+val;
             }
             _this.model.set(FormOptions.t.mappings.ICON,val);
             
	    });
    };
    
    //========================关联数据============================
    /**
     * 关联数据
     */
    EditFieldView.prototype.initLinkdataSelect  = function(){
    	var url ="",
			_key = 'key',
			_this = this;
    	
			url = __ctx+ "/platform/data/dataTemplate/getSelectorData.htm?type=valueSource";
			
		var $el = this.$el.find(".js-linkdata");
		$el.select2();
		$el.select2('destroy');
		Select2Util.init($el,{
			url:url,
			params:{
				cascade:true,
			},
			formatSelection : function (item) {return item[_key];},  /*选择结果中的显示*/
			formatResult : function (item) {/*【搜索】列表中的显示*/
				return (item != undefined && item.name != undefined)?item.name:"";  
			},
			createSearchChoice : function(term, data) {	/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
	   			var d ={
				  		   name:term
	   			};
	   			d[_key] = term;
		        return d;
		    },
			initSelection:function (element, callback) {
				var d ={
				  		   name:_this.model.get(FormOptions.t.mappings.LINKDATA_NAME)
				};
				d[_key] = _this.model.get(FormOptions.t.mappings.LINKDATA);
		    	callback(d);
			},
			templateSelection:function(item){
		    	if($.isEmpty(item[_key]))
		    		return "请选择关联数据";
		    	_this.model.set(FormOptions.t.mappings.LINKDATA,item[_key]);
		    	_this.model.set(FormOptions.t.mappings.LINKDATA_NAME,item.name);
		    	return item.name;
			},
			templateResult: function (data) {
			    if (!data || !data[_key]) { 
			    	return '';
			    }
			    return data.name;
			},
			loadData:function(data){
				if($.isEmpty(data))
					return;
				_.each(data,function(d){
				    _this.setLinkdataCache(d[_key],d);
				});
			}
		});
	};
	
    /**
     * 关联数据---关联配置
     */
    EditFieldView.prototype.settingLinkConfig  = function(e){
    	var $el = $(e.currentTarget),
	   		_this = this,
	   		key=  this.model.get(FormOptions.t.mappings.LINKDATA);
    	

    	
	   if(_.isEmpty(key)){
       	   DialogUtil.msg("请选择关联数据！");
       	   return;
       }
 
       var data =  this.model.get(FormOptions.t.mappings.LINK_CONFIG)||{},
	   		params = {};

     var linkdata, resultColumns =[];
     if($.isEmpty(linkdata =EditFieldView.LINKDATA_CACHE[key])){
    	 this.setLinkdataCache(key);
    	 linkdata =EditFieldView.LINKDATA_CACHE[key];
     }
    	 
     if($.isNotEmpty(linkdata))
    	 resultColumns = JSON.parse(linkdata.resultColumns) ;

      params = {
    		 resultColumns:resultColumns,
   			  data:data
   	       };
      
      var url =__ctx+'/platform/form/formDef/linkdataConfig.htm';

	   DialogUtil.dialog({
	   		title:'关联配置',
	   		params:params,
	   		area: ['550px', '500px'],
	   		content:url,
	   		btn:[{
	           	label: '确定',
	           	iconCls:'btn btn-primary fa fa-ok',
	               action: function(dialog,index) {
	             	  var  data = DialogUtil.getChildFrameWindow(index).getData();
	             	  if(!data)
	             		 return;
	             	  
	         	  	_this.model.set(FormOptions.t.mappings.LINK_CONFIG,data);
	              	_this.forceRender();
	              	DialogUtil.close(index);
	               }
	           },{
	           	label: '清空',
	           	iconCls:'btn btn-success fa fa-clean',
	               action: function(dialog,index) {
		             	_this.model.set(FormOptions.t.mappings.LINK_CONFIG,{});
		              	_this.forceRender();
		              	DialogUtil.close(index);
	               }
	           },  {
	           	label: '取消',
	           	iconCls:'btn btn-danger fa fa-cancel',
	               action: function(dialog,index) {
	               	DialogUtil.close(index);
	               }
	           }]
	   	});
    };
    
    /**
     * 关联数据---关联条件
     */
    EditFieldView.prototype.settingLinkCondition  = function(e){
    	var _this = this,
				$el = $(e.currentTarget),
				linkData=  this.model.get(FormOptions.t.mappings.LINKDATA),
				_key =  FormOptions.t.mappings.LINK_CONDITION,
				title,
				fields =[],
				linkdataCache,
				filterConditions =[],
				params ={};
		
		   if($.isEmpty(linkData)){
		   	   DialogUtil.msg("请选择关联数据！");
		   	   return;
		   }
		   
			 if($.isEmpty(linkdataCache =EditFieldView.LINKDATA_CACHE[linkData])){
				 this.setLinkdataCache(linkData);
				 linkdataCache =EditFieldView.LINKDATA_CACHE[linkData];
			 }
			 if($.isEmpty(linkdataCache)){
		   	   DialogUtil.msg("未获取关联数据的相关数据！");
		   	   return;
			 }

			 filterConditions =  $.isNotEmpty(linkdataCache.filterConditions)?JSON.parse(linkdataCache.filterConditions):'' ;


			 if($.isEmpty(filterConditions)){
				 DialogUtil.msg("关联数据未设置过滤条件");
				 return;
			 }
			 
		
		var models = this.model.collection.models;
		 _.filter(models,function(m){
				if(m.is_input() && m.cid != _this.model.cid && m.get("field_type") != 'table'){
					fields.push(m.attributes);
				}
			});
		  var url =__ctx+'/platform/form/formDef/linkdataCondition.htm';
		   DialogUtil.dialog({
		   		title:'设置动态条件',
		   		params:{
					  fields : fields,
					  filterConditions:filterConditions,
					  data:this.model.get(_key)||{}
				},
		   		area: ['550px', '500px'],
		   		content:url,
		   		btn:[{
		           	label: '确定',
		           	iconCls:'btn btn-primary fa fa-ok',
		               action: function(dialog,index) {
		             	  var  data = DialogUtil.getChildFrameWindow(index).getData();
		             	  if($.isEmpty(data)){
		             		 DialogUtil.alert("请绑定属性");
		             		 return;
		             	  }
		         	  	_this.model.set(_key,data);
		              	_this.forceRender();
		              	DialogUtil.close(index);
		               }
		           },{
		           	label: '清空',
		           	iconCls:'btn btn-success fa fa-clean',
		               action: function(dialog,index) {
			             	_this.model.set(_key,{});
			              	_this.forceRender();
			              	DialogUtil.close(index);
		               }
		           },  {
		           	label: '取消',
		           	iconCls:'btn btn-danger fa fa-cancel',
		               action: function(dialog,index) {
		               	DialogUtil.close(index);
		               }
		           }]
		   	});
			 
    };
    
 
    /**
     * 关联数据---关联设置（包含关联属性，关联联动）
     */
    EditFieldView.prototype.settingLinkSetting  = function(e){
    	var _this = this,
    		$el = $(e.currentTarget),
    		linkData=  this.model.get(FormOptions.t.mappings.LINKDATA),
    		_key,
    		title,
   			fields =[],
   			linkdataCache,
   			resultColumns =[],
   			params ={};
	
    	if(this.model.get(FormOptions.t.mappings.MULTIPLE) == 'Y'){
		  	   DialogUtil.msg("多选不能设置联动配置！");
		  	   return;
		}
	
	   if($.isEmpty(linkData)){
	   	   DialogUtil.msg("请选择关联数据！");
	   	   return;
	   }
	   
		 if($.isEmpty(linkdataCache =EditFieldView.LINKDATA_CACHE[linkData])){
			 this.setLinkdataCache(linkData);
			 linkdataCache =EditFieldView.LINKDATA_CACHE[linkData];
		 }
		 if($.isEmpty(linkdataCache)){
	   	   DialogUtil.msg("未获取关联数据的相关数据！");
	   	   return;
		 }

		 resultColumns =  $.isNotEmpty(linkdataCache.resultColumns)?JSON.parse(linkdataCache.resultColumns):'' ;
		 
		 if($.isEmpty(resultColumns)){
			 DialogUtil.msg("关联数据未设置返回字段");
			 return;
		 }
		var models = this.model.collection.models;
		   
		   if($el.hasClass("js-setting-link-linkage-btn")){ //关联联动
			   title ='设置关联联动数据';
			   _key  = FormOptions.t.mappings.LINK_LINKAGE;
			   
			 _.filter(models,function(m){
					if(m.is_input() && m.cid != _this.model.cid){
						fields.push(m.attributes);
					}
				});
		   } else if($el.hasClass("js-setting-link-attr-btn")){
			   title ='设置关联数据属性';
			   _key  = FormOptions.t.mappings.LINK_ATTR;
			     _.filter(models,function(m){
					if(m.get(FormOptions.t.mappings.FIELD_TYPE) == 'label')
						fields.push(m.attributes);
				});
			     
				 if($.isEmpty(fields)){
				   	   DialogUtil.msg("表单未设置字段类型为【文本】的字段！");
				   	   return;
				 }
		 }
	
	  
	  var url =__ctx+'/platform/form/formDef/linkdataAttr.htm';
	   DialogUtil.dialog({
	   		title:title,
	   		params:{
				  fields : fields,
				  resultColumns:resultColumns,
				  data:this.model.get(_key)||{}
			},
	   		area: ['550px', '500px'],
	   		content:url,
	   		btn:[{
	           	label: '确定',
	           	iconCls:'btn btn-primary fa fa-ok',
	               action: function(dialog,index) {
	             	  var  data = DialogUtil.getChildFrameWindow(index).getData();
	             	  if($.isEmpty(data)){
	             		 DialogUtil.alert("请绑定属性");
	             		 return;
	             	  }
	         	  	_this.model.set(_key,data);
	              	_this.forceRender();
	              	DialogUtil.close(index);
	               }
	           },{
	           	label: '清空',
	           	iconCls:'btn btn-success fa fa-clean',
	               action: function(dialog,index) {
		             	_this.model.set(_key,{});
		              	_this.forceRender();
		              	DialogUtil.close(index);
	               }
	           },  {
	           	label: '取消',
	           	iconCls:'btn btn-danger fa fa-cancel',
	               action: function(dialog,index) {
	               	DialogUtil.close(index);
	               }
	           }]
	   	});
    };
    
    //========================地址============================
    /**
	 * 选择最大区域
	 */
    EditFieldView.prototype.changeTop = function(e){
    	var $el = $(e.currentTarget);
    	this.initTopCityPicker();
    	this.initDefaultCityPicker();
    };
    /**
	 * 选择最小区域
	 */
    EditFieldView.prototype.changeLevel = function(e){
 	   var $el = $(e.currentTarget);
	   this.initTopCityPicker();
	   this.initDefaultCityPicker();
    };
  
    /**
     * 获取展示的值
     */
    function getTextValue(data,value){
    	var rtn ='';
    	if($.isEmpty(value) || $.isEmpty(data))
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
    };
    
    function getTopval(top,topval){
    	if($.isEmpty(topval))
    		return '0';
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
    }
    
    function getShowTopval(top,topval){
    	var rtnVal= '0';
    	if($.isEmpty(topval))
    		return rtnVal;
    	if(top == 'province'){
    		 rtnVal = topval['country'] ;
    	}else if(top == 'city'){
			rtnVal =  topval["province"];
		}else if(top == 'district'){
			rtnVal = topval["city"];
		}
    	return rtnVal;
    }
    
    function getAddressData (v,type,params){
    	if($.isEmpty(v))
    		return "";
		var top = params.top,
			level = params.level,
			topval =	getShowTopval(params.top,params.topval);
    	if(type === 'country' && v.country ){
    		topval  =  (top == 'country') ?topval:0;
    		if($.isEmpty(topval))
    			return "";
    		return getTextValue(WorldDistricts[topval],v.country);
    	} else if(type === 'province' && v.province){
    		var topval1   = $.isNotEmpty(v.country)?v.country:null;
    		if($.isEmpty(topval1) && top == 'province')
    			topval1 = topval;
    		if($.isEmpty(topval1) )
    			return "";
    		return getTextValue(WorldDistricts[topval1],v.province);
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
    };
    
    /**
	 * 初始化最大区域
	 */
    EditFieldView.prototype.initTopCityPicker = function(){
    	var _this = this,
    		$el = this.$el.find(".js-city-top-val"),
    		name ="field_options.topval",
    		v = this.model.get(name),
    		topval = '0',
    		top = this.model.get("field_options.top"),
			level =this.model.get("field_options.level");

			if( top=='province'){
				level =  'country'
			}else if( top=='city'){
				level =  'province'
			}else if( top=='district'){
				level =  'city'	
			}else{
				level ='';
			}
    			
			var params ={
				 top :'country',
				 level :level,
	    		 topval : topval
			};
			$el.val("").citypicker('destroy').off("cp:updated");
			if(level == ''){
				$el.val("不需要选择");
				_this.model.set(name,null);
				return level;
			}
			
			$el.citypicker({
        		top:'country',
        		level:level,
        		topval:topval,
        		placeholder:'请选择最大区域值',
        		country:getAddressData(v,'country',params),
        		province:getAddressData(v,'province',params),
        		city:getAddressData(v,'city',params),
        		district:getAddressData(v,'district',params)
        	}).on("cp:updated",function(el){
           		var cp = $el.data('citypicker'),
           			countryVal= cp.getCode('country'),
           			provinceVal = cp.getCode('province'),
           			cityVal = cp.getCode('city'),
           			districtVal =cp.getCode('district'),
           			val ={
               			country:countryVal, 
               			province:provinceVal,
               			city:cityVal, 
               			district:districtVal
           			};
           			_this.model.set(name,val);
    			if( top=='province'  && $.isEmpty(provinceVal)){
    				_this.initDefaultCityPicker();
    			}else if( top=='city' && $.isEmpty(cityVal)){
    				_this.initDefaultCityPicker();
    			}else if( top=='district' && $.isEmpty(cityVal)){
    				_this.initDefaultCityPicker();
    			}
           		
            });
    };
    /**
	 * 初始化默认值
	 */
    EditFieldView.prototype.initDefaultCityPicker = function(){
	 	var _this = this,
			$el = this.$el.find(".js-city-default-value"),
			name ="field_options.default_value",
			v = this.model.get(name),
			top = this.model.get("field_options.top"),
			level = this.model.get("field_options.level"),
			topval =  this.model.get("field_options.topval");	
		$el.val("").citypicker('destroy').off("cp:updated");
		if(top != 'country' && $.isEmpty(topval)){
			$el.val("请先选择最大区域");
			return;
		}

		var params ={
				 top :top,
				 level :level,
	    		 topval : topval
		};
		$el.citypicker('destroy').off("cp:updated");
		
		$el.citypicker({
    		top:top?top:'country',
    		level:level?level:'district',
    		topval:getTopval(top,topval),
    		placeholder:'请选择',
    		country:getAddressData(v,'country',params),
    		province:getAddressData(v,'province',params),
    		city:getAddressData(v,'city',params),
    		district:getAddressData(v,'district',params)
    	}).on("cp:updated",function(el){
    			var cp = $el.data('citypicker'), val ={
						country:cp.getCode('country'),
						province:cp.getCode('province'),
						city:cp.getCode('city'), 
						district:cp.getCode('district') 
    				};
    			
    			_this.model.set(name,val);
        	});
    };
    /**
     * 清空top
     * @param e
     */
    EditFieldView.prototype.cleanCityTopVal = function(e){
        var $el = $(e.currentTarget),name=$el.data("name");
    	this.model.set(name,null);
    	 this.initTopCityPicker(null);
     	this.model.set(FormOptions.t.mappings.DEFAULT_VALUE,null);
   	    this.initDefaultCityPicker();
    };
    
    /**
     * 清空默认值
     * @param e
     */
    EditFieldView.prototype.cleanCityDefaultVal = function(e){
        var $el = $(e.currentTarget),name=$el.data("name");
    	this.model.set(name,null);
    	 this.initDefaultCityPicker();
    };
      

    /**
	 * 改变日期类型
	 */
    EditFieldView.prototype.changeDateType= function(e){
        var $el = $(e.currentTarget),name=$el.data("name");
        var val = $el.val();
        if(val == 'specific'){
        	$(".js-"+name).show();
         	$(".js-"+name+"-interval").hide();
        }else if(val == 'today'){
        	$(".js-"+name).hide();
        	$(".js-"+name+"-interval").hide();
        }else if(val == 'before'){
        	$(".js-"+name).show();
        	$(".js-"+name+"-interval").show();
        }else if(val == 'after'){
        	$(".js-"+name).show();
        	$(".js-"+name+"-interval").show();
        }else{
        	$(".js-"+name).hide();
        	$(".js-"+name+"-interval").hide();
        }
    };
    
    /**
	 * 更换控件类型
	 */
    EditFieldView.prototype.changeFieldType = function(e){
        var $el = $(e.currentTarget),fieldType=$el.data("fieldtype"),
        	origFieldType =  this.model.get(FormOptions.t.mappings.FIELD_TYPE),
        	origFieldOptions = {},
        	defaultFieldOptions ={};
        		
        $.cloneObject(this.model.get(FormOptions.t.mappings.FIELD_OPTIONS),origFieldOptions);
        	
        defaultFieldOptions = this.getDefaultFieldOptions(Formbuilder.helpers.defaultFieldAttrs(fieldType));
        
        this.model.set(FormOptions.t.mappings.FIELD_TYPE,fieldType);

        // 清空之前的配置 还原默认配置
        this.model.set(FormOptions.t.mappings.FIELD_OPTIONS,{});
        this.model.set(FormOptions.t.mappings.FIELD_OPTIONS,defaultFieldOptions);

        // 有共性的字段替换 (主要是单选、多选、下拉 相互替换),不进行清空
        if((origFieldType == 'radio'  ||  origFieldType == 'checkbox' ||  origFieldType =='select' ) && 
        		(fieldType == 'radio'  ||  fieldType == 'checkbox' ||  fieldType =='select' ) ){
            this.model.set(FormOptions.t.mappings.OPTIONS,origFieldOptions.options);
        }
        
        
        this.forceRender();
        // 重新渲染
        this.parentView.createAndShowEditView(this.model,true,true);
    };
    
    /**
	 * 更换控件类型-----获取默认值选项
	 */
    EditFieldView.prototype.getDefaultFieldOptions= function(attr){
    	if(!attr)
    		return {};
    	var field =new Backbone.DeepModel(attr),
    		fieldType = field.get(FormOptions.t.mappings.FIELD_TYPE);
    	if(fieldType == 'hidden'){
    		return field.get(FormOptions.t.mappings.FIELD_OPTIONS);
    	}
    	
    	field.set(FormOptions.t.mappings.DEFAULT_VALUE_TYPE,this.model.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE));
    	field.set(FormOptions.t.mappings.REQUIRED,this.model.get(FormOptions.t.mappings.REQUIRED));
    	if(fieldType == 'autoNumber'){
        	field.set(FormOptions.t.mappings.REQUIRED,false);
    	}
    	
    	if($.isNotEmpty(this.model.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY))){
	    	field.set(FormOptions.t.mappings.GRIDS_TO_OCCUPY,this.model.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY));
    	}
    	
    	return field.get(FormOptions.t.mappings.FIELD_OPTIONS);
    };
    
    /**
	 * 清除绑定id
	 */
    EditFieldView.prototype.cleanBindId =function(){
	      this.model.set(FormOptions.t.mappings.BIND_NAME,null);
	      this.model.set(FormOptions.t.mappings.BIND_ID,null);
    };
    
    /**
	 * 清除默认值
	 */
    EditFieldView.prototype.cleanDefaultVal =function(){
		  this.model.set(FormOptions.t.mappings.DEFAULT_VALUE,null);
		  this.model.set(FormOptions.t.mappings.DEFAULT_VALUE_NAME,null);
    };
    
    /**
	 * 设置下拉bo、数据字典、分类等 赋值
	 */
    EditFieldView.prototype.setDropdownName = function(e){
	      var $el = $(e.currentTarget),_this = this,
	      	val =$el.val(),
	      	keyVal = $el.siblings($el.data("key")).val();
	      
	      if($el.data("bind_name")){ // 字段类型 (字段绑定对象)
		      this.model.set(FormOptions.t.mappings.SHOW_NAME,val);
		      this.model.set(FormOptions.t.mappings.NAME,keyVal);
		      // 标题也修改
		      if(!this.parentView.formProperty.get(FormOptions.t.propertys.OUT_OF_NAME)){
			      this.model.set(FormOptions.t.mappings.LABEL,val);
		      }
	      }else if($el.data("bind_dic")){  // 数据字典
	    	  var typekeyVal = $el.siblings($el.data("typekey")).val();
	    	  
    		  this.model.set(FormOptions.t.mappings.DICTIONARY,typekeyVal);
    		  this.model.set(FormOptions.t.mappings.DICTIONARY_NAME,val);
    		  this.model.set(FormOptions.t.mappings.DEFAULT_VALUE,null);
    		  this.model.set(FormOptions.t.mappings.DEFAULT_VALUE_NAME,null);
    		  var dicDefaultName = this.$el.find("#dicDefaultName");
    		  dicDefaultName.data("dic",typekeyVal).val("").removeAttr("treeid");
    		  
	      }else if($el.data("bind_default_value")){  // 数据字典默认值
	    	  this.model.set(FormOptions.t.mappings.DEFAULT_VALUE,keyVal);
	    	  this.model.set(FormOptions.t.mappings.DEFAULT_VALUE_NAME,val);
	      } else if($el.data("bind_id")){// 选择器绑定ID
		      this.model.set(FormOptions.t.mappings.BIND_NAME,val);
		      this.model.set(FormOptions.t.mappings.BIND_ID,keyVal);
	      }else if($el.data("bind_other_name")){// 绑定选项其它
	    	  this.model.set(FormOptions.t.mappings.OPTION_OTHER_NAME,val);
		      this.model.set(FormOptions.t.mappings.OPTION_OTHER_ID,keyVal);
	      }else if($el.data("bind_fold_card")){// 绑定折叠卡
		      this.model.set(FormOptions.t.mappings.SHOW_NAME,val);
		      this.model.set(FormOptions.t.mappings.NAME,keyVal);
	      }else{// 绑定其它
	    	  // 什么也不做
	      }
    };

    /**
	 * 删除字段
	 * 
	 * @returns
	 */
    EditFieldView.prototype.remove = function() {
      this.parentView.editView = void 0;
      this.parentView.activeTab("form_property");
      return EditFieldView.__super__.remove.apply(this, arguments);
    };

    /**
	 * 添加或者编辑选项
	 * 
	 * @param e
	 * @returns
	 */
    EditFieldView.prototype.addOption = function(e) {
	   var $el, i, newOption, options,item,key,type;
       $el = $(e.currentTarget);
       if($el.hasClass("js-add-option")){
          	item ='.option';
           	key =FormOptions.t.mappings.OPTIONS;
            newOption = {
                    label: "选项",
                    checked: false
                  };
       } else if($el.hasClass("js-add-other-option")){
          	item ='.option';
           	key =FormOptions.t.mappings.OPTIONS;
        	newOption =  {
      	          label: "其他",
      	          checked: false,
      	          include_other_option:true
      	        };
        	this.$el.find("#optionOtherIdDiv").removeClass("hidden");
       }else  if($el.hasClass("js-add-column")){// 字段
    		item ='.column';
           	key = FormOptions.t.mappings.COLUMNS;
        	newOption = Formbuilder.helpers.defaultFieldAttrs($el.data('field_type'));
    	   
       }else if($el.hasClass("js-add-button")){
	   		item ='.button';
	       	key = FormOptions.t.mappings.BUTTONS;
	       	type =	$el.data('button_type');
	       	
	       	newOption=	 FormOptions.t.BUTTONS[type];
	       	newOption.type = type;
	       	newOption.label = Formbuilder.lang.buttons[type];
	       	
	    	options = this.model.get(key) || [];
		   var isExist   = _.find(options,function(n){
			   return n.type ==  type;
		     });
		   
		   if(isExist && type !=  'custom'){
				DialogUtil.msg("该按钮已经添加!");
    			return;
		   }
       }else{
    	   return;
       }
       
       i = this.$el.find(item).index($el.closest(item));
       options = this.model.get(key) || [];
      
      if (i > -1) {
        options.splice(i + 1, 0, newOption);
      } else {
        options.push(newOption);
      }
      this.model.set(key, options);
      this.model.trigger("change:" + key);
      return this.forceRender();
    };
    
    /**
	 * 删除选项
	 * 
	 * @param e
	 * @returns
	 */
    EditFieldView.prototype.removeOption = function(e) {
       	e.preventDefault(); e.stopPropagation();
      var $el, index, options,key,clz;
      	$el = $(e.currentTarget);
      if($el.hasClass("js-remove-option")){
    	  clz = ".js-remove-option";
    	  key =FormOptions.t.mappings.OPTIONS;
      }else if($el.hasClass("js-remove-column")){
    	  clz = ".js-remove-column";
    	  key =FormOptions.t.mappings.COLUMNS;
      } else if($el.hasClass("js-remove-button")){
    	  clz = ".js-remove-button";
    	  key =FormOptions.t.mappings.BUTTONS;
      } else{
    	  return;
      }
      
      index = this.$el.find(clz).index($el);
      options = this.model.get(key);
      options.splice(index, 1);
      this.model.set(key, options);
      this.model.trigger("change:" + key);
      return this.forceRender();
    };
    
    EditFieldView.prototype.settingOption= function(e) {
    	var $el, i, options, option, clz, key,url, _this = this, title = '',operationType,bo,extBo;
		$el = $(e.currentTarget);
		 if ($el.hasClass("js-setting-button")) {// 对话框按钮
			clz = ".js-setting-button";
			title = "操作按钮";
			key = FormOptions.t.mappings.BUTTONS;
			operationType = "edit";
			

        	bo  = this.getBo(this.model.get("name"));//子表bo
        	
			extBo =  this.getBo();//主表bo
			
			url = __ctx	+ '/platform/form/formDef/button.htm';

		} 

		i = this.$el.find(clz).index($el.closest(clz));
		options = this.model.get(key) || [];
		option = options.slice(i, i + 1).shift();

		//	title += "【"+FormButtons.t.buttons[option.type].label+"】";
		
		DialogUtil.dialog({
			title : title,
			area : [ '60%', '80%' ],
			params : {
				data : option,
				buttonTypeKey:'type',
				settingRights:false,
				operationType:operationType,
				bo:bo,
				extBo:extBo
			},
			content : url,
			btn : [{
						label : '确定',
						iconCls : 'btn btn-primary fa fa-ok',
						action : function(dialog, index) {
							var data = DialogUtil
									.getChildFrameWindow(index).getData();
							options.splice(i, 1, data);
							_this.model.set(key, options);
							_this.model.trigger("change:" + key);
							_this.forceRender();
							DialogUtil.close(index);
						}
					}, {
						label : '取消',
						iconCls : 'btn btn-danger fa fa-cancel',
						action : function(dialog, index) {
							DialogUtil.close(index);
						}
					} ]
		});
    };
    

    /**
	 * 清除绑定选项其他id
	 */
    EditFieldView.prototype.cleanBindOtherId =function(){
	      this.model.set(FormOptions.t.mappings.OPTION_OTHER_ID,null);
	      this.model.set(FormOptions.t.mappings.OPTION_OTHER_NAME,null);
    };
    
    /**
	 * 默认选中的
	 * 
	 * @param e
	 * @returns
	 */
    EditFieldView.prototype.defaultUpdated = function(e) {
    		var i,
    			options	=[],
    			$el = $(e.currentTarget),
    			item ='.js-default-updated',
    			key =FormOptions.t.mappings.OPTIONS,
    			checkboxs = this.$el.find(item),
    			isChecked = $el.prop('checked'),
    			isCheckBox =true;
    		
      i = checkboxs.index($el.closest(item));
	 options = this.model.get(key) || [];
      if (this.model.get(FormOptions.t.mappings.FIELD_TYPE) !== 'checkbox') {
    	  checkboxs.not($el).attr('checked', false).trigger('change');
    	  isCheckBox =false;
      }
      _.each(options,function(option,j){
    	  if(i== j)
    		  option.checked = isChecked;
    	  else
    		  option.checked = isCheckBox? option.checked:false;
      });
      this.model.set(key, options);
      return this.forceRender();
    };

    
    /**
	 * 初始化选项排序
	 * 
	 * @param e
	 * @param t
	 * @param item
	 * @returns {EditFieldView}
	 */
    EditFieldView.prototype.initSortable = function(e,t, item,key) {
        var _this = this,index;
         var sortableChoices = e.$(t).sortable({
            items: "> " +item,
            handle: "[data-role='sort_choice']",
            forcePlaceholderSize: true,
            scroll: true,
            placeholder: "sortable-placeholder",
            distance: 1,
            axis: "y",
            start:function(event, ui){
                // 移动前的位置
                index= _this.$el.find(item).index($(ui.item).closest(item));
            },
            update: function(ev, ui) {
            	_this.updateSortingIndex(index,ui,item,key);
            }
        });
         return this;
    };
    
    /**
	 * 更新排序位置
	 */
    EditFieldView.prototype.updateSortingIndex = function(index,ui,item,key) {
    	// 移动后的位置
        var i =this.$el.find(item).index( $(ui.item).closest(item)),
	        // 值
	        options = this.model.get(key) || [];
        
        var moveOption = options[index];
	   // 删除 移动的位置
		options.splice(index,1); 
        // 插入 移动的位置
	    options.splice(i , 0, moveOption);
	    this.model.set(key, options);
	    this.model.trigger("change:" + key);
	    this.forceRender();
	    this.render(); // 重新渲染
    };
    
    /**
	 * 处理子表
	 */
    EditFieldView.prototype.focusColumn = function(e){
    	e.preventDefault(); e.stopPropagation();
    	SubTableColumn.handerColumn(this,e,"edit");
    };
    
    /**
	 * 设置model的值
	 */
    EditFieldView.prototype.setModelValue = function(key,value){
      	this.model.set(key,[]);
      	this.model.trigger("change:" + key);
      	this.model.set(key,value);
      	this.model.trigger("change:" + key);
      	this.forceRender();
    }
    /**
	 * 预设的 选项模版
	 * 
	 * @param e
	 */
    EditFieldView.prototype.predefinedChoices = function(e){
    	var _this= this,key =FormOptions.t.mappings.OPTIONS;
    	
    	DialogUtil.dialog({
    		title:'选项模版',
    		area: ['600px', '350px'],
    		content:__ctx+'/platform/form/formDef/predefinedChoices.htm',
    		btn:[{
            	label: '确定',
            	iconCls:'btn btn-primary fa fa-ok',
                action: function(dialog,index) {
              	  var  data = DialogUtil.getChildFrameWindow(index).getData();

              	  	_this.setModelValue(key,JSON.parse(JSON.stringify(data)));

               		DialogUtil.close(index);
                }
            },  {
            	label: '清空',
            	iconCls:'btn btn-success fa fa-clean',
                action: function(dialog,index) {
                	DialogUtil.getChildFrameWindow(index).cleanData();
                }
            },  {
            	label: '取消',
            	iconCls:'btn btn-danger fa fa-cancel',
                action: function(dialog,index) {
                	DialogUtil.close(index);
                }
            }]
    	});
    	
    };
    
    /**
	 * 批量修改选项
	 * 
	 * @param e
	 */
    EditFieldView.prototype.batchEditChoices = function(e){
    	var _this= this,key =FormOptions.t.mappings.OPTIONS,options = this.model.get(key) || [];
    	DialogUtil.dialog({
    		title:'批量修改选项',
    		params:options,
    		area: ['400px', '350px'],
    		content:__ctx+'/platform/form/formDef/batchEditChoices.htm',
    		btn:[{
            	label: '确定',
            	iconCls:'btn btn-primary fa fa-ok',
                action: function(dialog,index) {
              	  var  data = DialogUtil.getChildFrameWindow(index).getData();
                  _this.setModelValue(key,JSON.parse(JSON.stringify(data)));
               	  DialogUtil.close(index);
                }
            }, {
            	label: '清空',
            	iconCls:'btn btn-success fa fa-clean',
                action: function(dialog,index) {
                	DialogUtil.getChildFrameWindow(index).cleanData();
                }
            },{
            	label: '取消',
            	iconCls:'btn btn-danger fa fa-cancel',
                action: function(dialog,index) {
                	DialogUtil.close(index);
                }
            }]
    	});
    };
    
    /**
	 * 富文本框工具栏设置
	 */
    EditFieldView.prototype.toolbarSettings = function(e){
    	var _this =this,key =FormOptions.t.mappings.TOOLBARS,options = this.model.get(key) || [];
    	options =_.map(options,function(o){ return (o == '|')?'separate':o });
    	DialogUtil.dialog({
    		title:'工具栏设置',
    		params:options,
    		area: ['750px', '600px'],
    		content:__ctx+'/platform/form/formDef/toolbarSettings.htm',
    		btn:[{
            	label: '确定',
            	iconCls:'btn btn-primary fa fa-ok',
                action: function(dialog,index) {
              	  var  data = DialogUtil.getChildFrameWindow(index).getData();
              	  var toolbars =[];
              	  	_.each(data,function(d){
              	  		$.merge(toolbars,_.map(d,function(o){ return (o == 'separate')?'|':o }));
              	  	});
              	  	_this.model.set(key,[]);
                  	_this.forceRender();
              	  	_this.model.set(key,toolbars);
	              	_this.forceRender();
	              	_this.render(); // 重新渲染
	              	DialogUtil.close(index);
                }
            },{
            	label: '清空',
            	iconCls:'btn btn-success fa fa-clean',
                action: function(dialog,index) {
                	DialogUtil.getChildFrameWindow(index).cleanData();
                }
            },  {
            	label: '取消',
            	iconCls:'btn btn-danger fa fa-cancel',
                action: function(dialog,index) {
                	DialogUtil.close(index);
                }
            }]
    	});
    };
    
    /**
	 * office菜单栏设置
	 */
    EditFieldView.prototype.menubarSettings = function(e){
    	var _this =this,
	    	key =FormOptions.t.mappings.MENUBARS,
	    	options = this.model.get(key) || [],
	    	office_type_key = FormOptions.t.mappings.OFFICE_TYPE,
	    	office_type = this.model.get(office_type_key) || 'doc';
    	
    	DialogUtil.dialog({
    		title:'菜单栏设置',
    		params:{office_type : office_type, options : options},
    		area: ['750px', '600px'],
    		content:__ctx+'/platform/form/formDef/menubarSettings.htm',
    		btn:[{
            	label: '确定',
            	iconCls:'btn btn-primary fa fa-ok',
                action: function(dialog,index) {
              	  var data = DialogUtil.getChildFrameWindow(index).getData();
              	  _this.model.set(key, data);
	              _this.forceRender();
	              _this.render(); // 重新渲染
	              DialogUtil.close(index);
                }
            },{
            	label: '清空',
            	iconCls:'btn btn-success fa fa-clean',
                action: function(dialog,index) {
                	DialogUtil.getChildFrameWindow(index).cleanData();
                }
            },  {
            	label: '取消',
            	iconCls:'btn btn-danger fa fa-cancel',
                action: function(dialog,index) {
                	DialogUtil.close(index);
                }
            }]
    	});
    };
    
    /**
	 * 绑定自定义对话框
	 */
    EditFieldView.prototype.bindCustomDialog =function(e){
       var $el = $(e.currentTarget),
       		_this = this,
       		selectDialog=  this.model.get(FormOptions.t.mappings.DIALOG),
       		params ;
    	   if(_.isEmpty(selectDialog)){
           	   DialogUtil.msg("请选择自定义对话框！");
           	   return;
           }
     
           
           var subName  =this.model.get("sub_name")?this.model.get("sub_name"):null,
              	bind =  this.model.get(FormOptions.t.mappings.BIND)||[],
           		bindParams =  this.model.get(FormOptions.t.mappings.PARAMS)||[];
          var vaule = {
        		  results:bind,
        		  params:bindParams
          };
          

	      
	      var url ="",bo=[];
	      if( this.model.get(FormOptions.t.mappings.DIALOG_TYPE) == 'custom'){
	    	  url = __ctx+'/platform/form/formDef/customDialog.htm?alias='+selectDialog;
	    	  bo= this.getBo(subName);
	      }else{
	    	  url =   __ctx+'/platform/form/formDef/customDialog2.htm?key='+selectDialog;
	    	  if($.isNotEmpty (subName)){
	    		  bo= this.getBo(subName, this.model.get("name"));
	    	  }
	    	  extBo =  this.getBo()
	      }
	      
	      params = {
	    		  	extBo:extBo,
	   				bo: bo,
	   				value:vaule
	   	       };
   
       DialogUtil.dialog({
	   		title:'设置对话框属性',
	   		params:params,
	   		area: ['550px', '500px'],
	   		content:url,
	   		btn:[{
	           	label: '确定',
	           	iconCls:'btn btn-primary fa fa-ok',
	               action: function(dialog,index) {
	             	  var  data = DialogUtil.getChildFrameWindow(index).getData();
	             	  if(!data)
	             		 return;
	             	  
	         	  	_this.model.set(FormOptions.t.mappings.BIND,data.results);
	        	  	_this.model.set(FormOptions.t.mappings.PARAMS,data.params);
	              	_this.forceRender();
	              	_this.render(); // 重新渲染
	              	DialogUtil.close(index);
	               }
	           },{
	           	label: '清空',
	           	iconCls:'btn btn-success fa fa-clean',
	               action: function(dialog,index) {
		             	_this.model.set(FormOptions.t.mappings.BIND,[]);
		        	  	_this.model.set(FormOptions.t.mappings.PARAMS,[]);
		              	_this.forceRender();
		              	_this.render(); // 重新渲染
		              	DialogUtil.close(index);
	               }
	           },  {
	           	label: '取消',
	           	iconCls:'btn btn-danger fa fa-cancel',
	               action: function(dialog,index) {
	               	DialogUtil.close(index);
	               }
	           }]
	   	});
    };
    
    EditFieldView.prototype.getBo = function(subTableName,curName){
	     var boJson = Formbuilder.boDef;
	     var bo =[];
	     $.each(boJson, function(i, n) {
				if (n.type == 'table')
					return true;
				if ($.isNotEmpty(subTableName) && n.attrType == 'field')
					return true;
				if($.isEmpty(subTableName) && n.attrType == 'subField')
					return true;
				if($.isNotEmpty(subTableName)  && n.tableName != subTableName )
					return true;
				if($.isNotEmpty(curName) && n.key == curName)//排除自己
					return true;
				bo.push(n);
			});
	     return bo;
    };
    /**
	 * 设置URL对话框
	 */
    EditFieldView.prototype.settingCustomDialog=function(e){
    var _this =this,
    	subName  = this.model.get("sub_name")?this.model.get("sub_name"):null,
       	bind =  this.model.get(FormOptions.t.mappings.BIND)||[],
       	
       	params = {
    			bo:this.getBo(subName,this.model.get("name")),
   				value:bind
   	       };
    	
    	  DialogUtil.dialog({
  	   		title:'设置自定义对话框',
  	   		params:params,
  	   		area: ['550px', '500px'],
  	   		content:__ctx+'/platform/form/formDef/urlDialog.htm',
  	   		btn:[{
  	           	label: '确定',
  	           	iconCls:'btn btn-primary fa fa-ok',
  	               action: function(dialog,index) {
  	             	  var  data = DialogUtil.getChildFrameWindow(index).getData();
  	             	  if(!data)
  	             		 return;
  	         	  	_this.model.set(FormOptions.t.mappings.BIND,data);
  	         	  	
  	              	_this.forceRender();
  	              	_this.render(); // 重新渲染
  	              	DialogUtil.close(index);
  	               }
  	           },{
  	           	label: '清空',
  	           	iconCls:'btn btn-success fa fa-clean',
  	               action: function(dialog,index) {
  		             	_this.model.set(FormOptions.t.mappings.BIND,[]);
  		              	_this.forceRender();
  		              	_this.render(); // 重新渲染
  		              	DialogUtil.close(index);
  	               }
  	           },  {
  	           	label: '取消',
  	           	iconCls:'btn btn-danger fa fa-cancel',
  	               action: function(dialog,index) {
  	               	DialogUtil.close(index);
  	               }
  	           }]
  	   	});
    	
    };
    
    /**
	 * 下拉选择自定义对话框
	 */
    EditFieldView.prototype.changeCustomDialog =function(e){
   	  	this.model.set(FormOptions.t.mappings.BIND,[]);
   	  	this.model.set(FormOptions.t.mappings.PARAMS,[]);
     	this.forceRender();
    	//this.render(); // 重新渲染 这个影响滚动条 不知道啥原因
     	$('.js-custom-dialog-bind-text').html("(未绑定)");
    };
    
    /**
	 * 改变自定义对话框类型
	 */
    EditFieldView.prototype.changeCustomDialogType =function(e){
   	  	this.model.set(FormOptions.t.mappings.DIALOG,null);
   	  	this.model.set(FormOptions.t.mappings.BIND,[]);
   	  	this.model.set(FormOptions.t.mappings.PARAMS,[]);
     	this.forceRender();
    	this.render(); // 重新渲染
    };
 
    
    /**
	 * 默认值
	 */
    EditFieldView.prototype.changeDefaultValue = function(e){
        var $el = $(e.currentTarget),val =$el.val(),key =FormOptions.t.mappings.DEFAULT_VALUE,
        	defValue=$el.siblings(".js-default-value"),
    		btn =$el.siblings(".js-default-value-btn"),
    		fieldType = this.model.get(FormOptions.t.mappings.FIELD_TYPE);
        if(val =='fixed'){
        	if(fieldType == 'radio' || fieldType == 'checkbox' ||  fieldType == 'select' ||   fieldType == 'dictionary'   ||  fieldType == 'attachment'  ){
             	defValue.val('').hide();
            	btn.hide();
        	}else if(fieldType == 'selector'){
             	var text = Formbuilder.lang.default_value_type[val];
             	defValue.val('').hide();
            	btn.show();
            	btn.text(text);
        	}else{
        		defValue.val('').show();
            	btn.hide();
        	}
        }else if(val =='today'){
        	defValue.hide();
        	btn.hide();
        }else{// formula dynamic
         	var text = Formbuilder.lang.default_value_type[val];
         	defValue.val('').hide();
        	btn.show();
        	btn.text(text);
        }
    	this.model.set(key,"");
    };
    
    /**
	 * 设置默认值
	 */
    EditFieldView.prototype.setDefaultValue = function(e){
        var $el = $(e.currentTarget),type =this.model.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE),
        	_this = this,
        	key = FormOptions.t.mappings.DEFAULT_VALUE,
        	value = this.model.get(key) || [],
        	title = Formbuilder.lang.default_value_type[type],
        	params ={},
        	url =__ctx+'/platform/form/formDef/formula.htm';
        if(type == 'fixed'){ // 固定值
        	url = __ctx+'/platform/form/formDef/fixedSelector.htm';
        	params ={
        			selector_type:this.model.get(FormOptions.t.mappings.SELECTOR_TYPE),
        			is_single:this.model.get(FormOptions.t.mappings.IS_SINGLE),
        			data:value
        	};
        }else if(type == 'dynamic'){ // 动态脚本
        	url = __ctx+'/platform/form/formDef/dynamic.htm';
        	params = {
        			bo: Formbuilder.boDef,
        			label:this.model.get('label'),
        			value:value||''
        	};
        }else if(type == 'linkage' ){  // 联动设置
        	url = __ctx+'/platform/form/formDef/linkage.htm';
        	var  subName  =this.model.get("sub_name")?this.model.get("sub_name"):null;
        	params = {
        			bo:this.getBo(subName),
        			query:$query,
        			label:this.model.get('label')||'未命名',
        			value:value||'',
        	};
        }else if(type == 'formula' ){ // 公式计算
        	url = __ctx+'/platform/form/formDef/formula.htm';
        	
        	var keywords = _.allKeys(FormulaUtil);
        	params = {
        			bo: Formbuilder.boDef,
        			label:this.model.get('label'),
        			value:value||'',
        			keywords:keywords
        	};
        }

    	DialogUtil.dialog({
    		title:title,
    		params:params,
    		area: ['780px', '600px'],
    		content:url,
    		btn:[{
            	label: '确定',
            	iconCls:'btn btn-primary fa fa-ok',
                action: function(dialog,index) {
              	  var  data = DialogUtil.getChildFrameWindow(index).getData();
              	  if(_.isEmpty(data)){
              		  return;
              	  }
              	  _this.model.set(key,data);
	              DialogUtil.close(index);
                }
            },  {
            	label: '取消',
            	iconCls:'btn btn-danger fa fa-cancel',
                action: function(dialog,index) {
                	DialogUtil.close(index);
                }
            }]
    	});
    };
    
    /**
	 * 设置当前选择器的默认值
	 */
    EditFieldView.prototype.settingDefaultValue = function(){
    	var type =this.model.get(FormOptions.t.mappings.SELECTOR_TYPE),
    		isSingle =  this.model.get(FormOptions.t.mappings.IS_SINGLE);
    	
    	var url = __ctx+'/platform/form/formDef/selectorDefaultValue.htm';
    	DialogUtil.dialog({
    		title:"设置默认值",
    		params:{
    			type:type,
    			isSingle:isSingle
    		},
    		area: ['780px', '600px'],
    		content:url,
    		btn:[{
            	label: '确定',
            	iconCls:'btn btn-primary fa fa-ok',
                action: function(dialog,index) {
              	  var  data = DialogUtil.getChildFrameWindow(index).getData();
              	  if(_.isEmpty(data)){
              		  DialogUtil.msg("请设置默认值");
              		  return;
              	  }
              	  _this.model.set(key,data);
	              DialogUtil.close(index);
                }
            },  {
            	label: '取消',
            	iconCls:'btn btn-danger fa fa-cancel',
                action: function(dialog,index) {
                	DialogUtil.close(index);
                }
            }]
    	});
    };
    
    /**
	 * 日期格式改变
	 */
    EditFieldView.prototype.changeDatefmt = function(e){
        var $el = $(e.currentTarget),val =$el.val();
        if(FormOptions.t.DATE_FORMATS[val]){
        	$el.siblings(".js-datefmt").addClass("hidden");
    	  	this.model.set( FormOptions.t.mappings.DATEFMT,FormOptions.t.DATE_FORMATS[val]);
        }else{// 自定义的
        	$el.siblings(".js-datefmt").removeClass("hidden");
         	this.model.set( FormOptions.t.mappings.DATEFMT,"");
        }
    };
    /**
	 * 附件类型
	 */
    EditFieldView.prototype.changeMedia = function(e){
        var $el = $(e.currentTarget),val =$el.val();
     	this.model.set(  FormOptions.t.mappings.MEDIA,"");
        if(_.isEmpty(val)){
        	return;
        } 
        if(FormOptions.t.FILE_TYPES[val]){
        	$el.siblings(".js-media").addClass("hidden");
        }else{// 自定义的
        	$el.siblings(".js-media").removeClass("hidden");
        }
    };
    
    /**
	 * office类型
	 */
    EditFieldView.prototype.changeOffice = function(e){
        var $el = $(e.currentTarget),val =$el.val();
        var menubars = [];
        if(_.isEmpty(val)){
        	menubars = Formbuilder.options.DEFAULT_MENUBARS['doc'];
        }else{
        	menubars = Formbuilder.options.DEFAULT_MENUBARS[val];
        }
     	// 重置菜单栏
        this.model.set(FormOptions.t.mappings.MENUBARS, null); 
     	this.forceRender();
        this.model.set(FormOptions.t.mappings.MENUBARS, menubars); 
       	this.forceRender();
      	this.render(); // 重新渲染
    };
    
    /**
	 * 校验的数据的格式
	 */
    EditFieldView.prototype.changeDataFormat = function(e){
        var $el = $(e.currentTarget),val =$el.val();
     	this.model.set(FormOptions.t.mappings.DATA_FORMAT_VALUE,"");
      	this.model.set(FormOptions.t.mappings.DATA_FORMAT_MSG,"");
     	
        if(_.isEmpty(val) || FormOptions.t.DATA_FORMAT[val]){
        	$el.siblings(".js-data-format-value").addClass("hidden");
        }else{// 自定义的
        	$el.siblings(".js-data-format-value").removeClass("hidden");
        }
    };
    
    /**
	 * appLayout选择字段
	 */
    EditFieldView.prototype.appLayoutSelect = function(e) {
	    DialogUtil.dialog({
	    	content:__ctx+'/platform/form/formDef/preview.htm',
	    	params:data,
	    	area: ['100%', '100%'],
			maxmin:false,
			title:false
	    });
    };
    
    /**
	 * appLayout清除选项
	 */
    EditFieldView.prototype.appLayoutRemove = function(e) {
	    var data = this.getData(false);
	    $.debug(data);
	    DialogUtil.dialog({
	    	content:__ctx+'/platform/form/formDef/preview.htm',
	    	params:data,
	    	area: ['100%', '100%'],
			maxmin:false,
			title:false
	    });
    };

    /**
     * 返回子表
     */
    EditFieldView.prototype. backTable= function() {
    	this.parentView.$el.find("[cid='"+this.parentView.subTable.cid+"']").click();
    };
    
    /**
     * 选择子表模式
     */
    EditFieldView.prototype.changeMode= function() {
    	var key = FormOptions.t.mappings.COLUMNS,
    		columns = this.model.get(key) || [];
    	 _.each(columns,function(column){
    		 column["field_options"]["hide"] = null;
    	 })
          this.model.set(key, columns);
          this.model.trigger("change:" + key);
           this.forceRender();
           return  	this.render(); // 重新渲染
    }

    EditFieldView.prototype.forceRender = function() {
      return this.model.trigger('change');
    };
    
    return EditFieldView;
  })(Backbone.View);
  
  // ====================TODO 编辑视图==================
  BuilderView = (function(_super) {
    __extends(BuilderView, _super);

    function BuilderView() {
      _ref6 = BuilderView.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    BuilderView.prototype.SUBVIEWS = [];

    BuilderView.prototype.events = {
      'click .js-save-form': 'saveForm', // 保存表单
      'click .js-save-form-template': 'saveFormTemplate', // 保存表单模版
      'click .js-close':'closeDialog',
      'click .js-preview-from': 'previewForm', // 预览表单
      'click .fb-tabs a': 'showTab', // 显示tab
      'click .fb-add-field-types a': 'addField' // 点击字段->添加字段
    };

    BuilderView.prototype.getFormDef = function(data){
    	if(!data)
    		return  {name:"新建表单"};
    	var d = _.clone(data);
    	if(d.fields)	
    		delete d.fields;
		return d;
    		
    };
    
    BuilderView.prototype.initialize = function(options) {
      var selector,d = {} ;
      		selector = options.selector;
      this.formBuilder = options.formBuilder;
      		d = options.data;
      this.options = options;
      // 字段
      this.fields = d?d.fields:[];
      this.formDef =  this.getFormDef(d);
      if (selector != null) {
        this.setElement($(selector));
      }
      // 初始化表单属性
      this.initFormProperty();
      // 初始化字段集合
     this.initFormCollection();
     
      return this.bindSaveEvent();
    };
    
    BuilderView.prototype.initDynamicData =function(field_type){

    	
    	//自定义查询
    	if($query&&$query.length == 0 ){
    	    $.get(  __ctx+ "/platform/form/customQuery/getAll.htm",function(data){
    	    	if($.isNotEmpty(data))
    	    		$query = data.rows ;
    	    });	
    	}
    };
    
    
    
    // 初始化字段集合
    BuilderView.prototype.initFormCollection =function(){
        this.collection = new FormbuilderCollection;
        this.collection.bind('add', this.addOne, this);
        this.collection.bind('reset', this.reset, this);
        this.collection.bind('change', this.handleFormUpdate, this);
        this.collection.bind('destroy add reset', this.hideShowNoResponseFields, this);
        this.collection.bind('destroy', this.ensureEditViewScrolled, this);
        
        this.render();
        this.collection.reset(this.fields);
    };
    
    BuilderView.prototype.initFormProperty =function(){
        var view, $responseFormHeaderWrapper;
        this.formProperty  = new Backbone.DeepModel(this.formDef);
        // 初始化属性编辑页面
        view = new FormHeaderView({
          model: this.formProperty,
          parentView: this
        });
        $responseFormHeaderWrapper = this.$el.find('.form-header-wrapper');
        $responseFormHeaderWrapper.append(view.render().el);
        
        this.$responseFormHeader = $responseFormHeaderWrapper.find('.form-header');
        // 初始化属性编辑页面
        this.editFormView = new FormPropertyView({
        	model:this.formProperty,
            parentView:this
     	});
       var $newEditEl = this.editFormView.render().$el;
       this.$el.find(".edit-form-property").html($newEditEl);
    };
    
    
    /**
	 * 绑定保存事件
	 * 
	 * @returns
	 */
    BuilderView.prototype.bindSaveEvent = function() {
      var _this = this;
      this.formSaved = true;
      this.formPreview = false;
/*
 * 自动保存 this.saveFormButton = this.$el.find(".js-save-form");
 * this.saveFormButton.attr('disabled',
 * true).text(Formbuilder.lang.dict.ALL_CHANGES_SAVED); if
 * (!!FormOptions.t.AUTOSAVE) { setInterval(function() { return
 * _this.saveForm.call(_this); }, 5000); }
 */
      return $(window).bind('beforeunload', function(event) {
    	  if (!_this.formSaved  && !_this.formPreview) {
          	event = event || window.event;
              var returnValue =  Formbuilder.lang.dict.UNSAVED_CHANGES;
              if(event)
              	event.returnValue = returnValue;
               return returnValue;
    	  }
      });
    };

    BuilderView.prototype.reset = function() {
      this.$responseFields.html('');
      return this.addAll();
    };

    BuilderView.prototype.render = function() {
      var subview, _i, _len, _ref5;
      // 添加字段html模版
      this.addFieldHtml();
      this.$responseFields = this.$el.find('.fb-response-fields');

      // 是否显示还是隐藏 字段
      this.hideShowNoResponseFields();
      _ref5 = this.SUBVIEWS;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        subview = _ref5[_i];
        new subview({
          parentView: this
        }).render();
      }
      return this;
    };
    
    /**
	 * 添加字段html
	 */
    BuilderView.prototype.addFieldHtml =function(){
    	  this.$el.find(".add-field-wrapper") .html(Formbuilder.templates['partials/add_field']());
    	  QtipUtils.qtip(this.$el);
    };

    /**
	 * 激活tab
	 * 
	 * @param id
	 */
    BuilderView.prototype.activeTab = function(id){
        this.$el.find(".fb-tabs a[href=\"#"+id+"\"]").click();
    };

    /**
	 * 显示Tab
	 */
    BuilderView.prototype.showTab = function(e) {
      var $el, first_model, target;
      $el = $(e.currentTarget);
      target = $el.attr('href');
      if (target === '#edit_field' && !this.editView && (first_model = this.collection.models[0])) {
        return this.createAndShowEditView(first_model,true);
      }
    };
    
    BuilderView.prototype._updatePageBreakNumbers = function() {
        var pageBreakList;
        pageBreakList= this.collection.pageBreakList(),
        this.$(".response-field-page_break .total-page-number").html(pageBreakList.length);
        
        _.each(pageBreakList, function(page, i) {
            var $el;
             $el = this.$(".response-field-page_break:eq(" + i + ")");
             $el.find(".current-page .page-number").html(i + 1);
            return $el;
        });
         
         return pageBreakList;
    },

    BuilderView.prototype.addOne = function(rf, _, options) {
        var $replacePosition, view,$elView,fieldType;
        fieldType = rf.get(FormOptions.t.mappings.FIELD_TYPE);
        
        this.initDynamicData(fieldType);

	      view = new ViewFieldView({
	        model: rf,
	        parentView: this
	      });
	      
	      this._updatePageBreakNumbers();
      
      if (options.$replaceEl != null) {// 替换
    	  $elView = options.$replaceEl.replaceWith(view.render().el);
      } else if ((options.position == null) || options.position === -1) {// 添加之后
    	  $elView =  this.$responseFields.append(view.render().el);
      } else if (options.position === 0) {// 添加之前
    	  $elView = this.$responseFields.prepend(view.render().el);
      } else if (($replacePosition = this.$responseFields.find(".fb-field-wrapper").eq(options.position))[0]) {
    	  $elView = $replacePosition.before(view.render().el);
      } else {
    	  $elView = this.$responseFields.append(view.render().el);
      }
      return $elView;
    };

    /**
	 * 设置字段排序
	 * 
	 * @returns
	 */
    BuilderView.prototype.setSortable = function() {
      var _this = this;
      if (this.$responseFields.hasClass('ui-sortable')) {
        this.$responseFields.sortable('destroy');
      }
      this.$responseFields.sortable({
    	items:'>.fb-field-wrapper',
        forcePlaceholderSize: true,
        cancel: ">.actions-wrapper",
        placeholder: "field-sorting-placeholder",
        distance: 5,
        tolerance: "pointer",
        start:function(e,ui){
            ui.placeholder.height( ui.item.is(".field-dragging") ? 88 :ui.helper.outerHeight() - 2);
            return true;
        },
        stop: function(e, ui) {
          var el = ui.item;
          if (el.data('field-type')) {
        	  _this.createField(el.data('field-type'),{
        		   $replaceEl:el
        	  },true);
          }
          return true;
        },
        update: function(e, ui) {
          if (!ui.item.data('field-type')) {
            return _this.ensureEditViewScrolled();
          }
        },
        over: function(e) {

            _this._updatePageBreakNumbers();
        	return _this.$responseFields.removeClass("fb-no-response-fields");
        },
        out: function(e) {

            _this._updatePageBreakNumbers();
           return _this.hideShowNoResponseFields();
        }
      }).disableSelection();
      return this.setDraggable();
    };

    BuilderView.prototype.setDraggable = function() {
      var $addFieldButtons,
      		_this = this;
      		$addFieldButtons = this.$el.find("[data-field-type]");
      return $addFieldButtons.draggable({
        connectToSortable: this.$responseFields,
        appendTo: ".fb-response-fields",
        zIndex: 100,
        helper: function(e) {
        	var  $helper=  $(e.target);
        	if($helper.is("[data-field-type]") || ($helper = $helper.closest("[data-field-type]"))){
        		$helper = $("<div class='field-dragging'>").html($helper.clone());
        		$helper.css({
        	          width: _this.$responseFields.width(),
          	          height: '80px'
          	        });
        	}
            return $helper;
        }
      });
    };

    BuilderView.prototype.addAll = function() {
      this.collection.each(this.addOne, this);
      return this.setSortable();
    };

    BuilderView.prototype.hideShowNoResponseFields = function()  {
        this._updatePageBreakNumbers();
	  	if( this.collection.length == 0)
	        return this.$responseFields.addClass("fb-no-response-fields");
	    else
	    	 return this.$responseFields.removeClass("fb-no-response-fields");
    };

    /**
	 * 添加字段
	 * 
	 * @param e
	 * @returns
	 */
    BuilderView.prototype.addField = function(e) {
      var field_type = $(e.currentTarget).data('field-type'),
      		position =this.editView?this.editView.model.indexInDOM()+1:null;
      		
      return this.createField(field_type,{
          position: position
      },true);
    };

    /**
	 * 创建字段
	 */
    BuilderView.prototype.createField = function(fieldType, options,isActiveTab) { 
    	var  attrs= {},rf;
    	if(_.isString(fieldType) ){
        	this.initDynamicData(fieldType);
        	attrs = Formbuilder.helpers.defaultFieldAttrs(fieldType,this); 
    	}else{
       	 	attrs =fieldType;
    	}

	    rf = this.collection.create(attrs, options);
	    this.createAndShowEditView(rf,isActiveTab);

	   return this.handleFormUpdate();
    };

    /**
	 * 创建并显示编辑字段
	 * 
	 * @param model
	 * @param isActiveTab
	 *            是否激活tab
	 * @param changeType
	 *            改变控件
	 * @returns {BuilderView}
	 */
    BuilderView.prototype.createAndShowEditView = function(model,isActiveTab,changeType) {
      var $newEditEl, $responseFieldEl;
      $responseFieldEl = this.$el.find(".fb-field-wrapper").filter(function() {
        return $(this).data('cid') === model.cid;
      });
    
      $responseFieldEl.addClass('editing').siblings('.fb-field-wrapper').removeClass('editing');
      this.$responseFormHeader.removeClass('editing');
      


      if (this.editView ) {
        if (this.editView.model.cid === model.cid && !changeType) {
          this.$el.find(".fb-tabs a[href=\"#edit_field\"]").click();
          return;
        }
        this.editView.remove();
      }
      this.editView = new EditFieldView({
        model: model,
        parentView: this
      });
      $newEditEl = this.editView.render().$el;
      this.$el.find(".fb-edit-field-wrapper").html($newEditEl);
      if(isActiveTab)
    	  this.$el.find(".fb-tabs a[href=\"#edit_field\"]").click();
      return this;
    };

    BuilderView.prototype.ensureEditViewScrolled = function() {
      if (!this.editView) {
        return;
      }
      return this.scrollLeftWrapper($(".fb-field-wrapper.editing"));
    };
    
    
    /**
	 * 滚动至当前
	 */
    BuilderView.prototype.scrollLeftWrapper = function($responseFieldEl) {
// var _this = this;
// this.unlockLeftWrapper();
// if (!$responseFieldEl[0]) {
// return;
// }
// return $.scrollWindowTo((this.$el.offset().top +
// $responseFieldEl.offset().top) - this.$responseFields.offset().top, 200,
// function() {
// return _this.lockLeftWrapper();
// });
    };

    BuilderView.prototype.lockLeftWrapper = function() {
// return this.$fbLeft.data('locked', true);
    };

    BuilderView.prototype.unlockLeftWrapper = function() {
     // return this.$fbLeft.data('locked', false);
    };

    BuilderView.prototype.handleFormUpdate = function() {
	  if (this.updatingBatch) {
	    return;
	  }
	  this.formSaved = false;
 // return this.saveFormButton.removeAttr('disabled').html("<i class='fa
	// fa-save'></i>&nbsp;&nbsp;"+Formbuilder.lang.dict.SAVE_FORM);
    };

    /**
	 * 保存 表单
	 */
    BuilderView.prototype.saveForm = function(e) {
      var payload;   
      payload =  this.getData(true);
      if (Formbuilder.options.HTTP_ENDPOINT) {
        this.doAjaxSave(e,payload);
      }
      return this.formBuilder.trigger('save', payload);
    };
    
    /**
	 * 保存 表单模版
	 */
    BuilderView.prototype.saveFormTemplate = function(e) {
        var payload;   
        payload =  this.getData(true);
        if (Formbuilder.options.HTTP_ENDPOINT) {
          this.doAjaxSave(e,payload);
        }
        return this.formBuilder.trigger('save', payload);
      };
    
    BuilderView.prototype.getData = function(isString){
        this.collection.sort();
        var formProperty = this.formProperty.toJSON();
        var data = $.extend(formProperty, {
        	fields:this.collection.toJSON()
        });

        if(isString)
        	return JSON.stringify(data);
        else
        	return data;
    };
    
    BuilderView.prototype.setBoField  = function(bo){
    		// 当前选中的bo
    	if(!this.editView)
    		return ;
    	if(bo.attrType == "table"){
    		return
    	}
    	var model = this.editView.model;
    	if(!model)
    		return;
    	// TODO 为进行字段类型的验证，比如日期类型的字段不能放在数字类型
    	var isAllowBind =false;
    	if(bo.attrType == "field"  && model.get("field_type") != 'table' && !model.get("is_sub") ){// 主表字段
    		isAllowBind =true;
    	}else if(bo.attrType == "subTable" && model.get("field_type") == 'table'){// 子表
    		isAllowBind =true;
       	}else if(bo.attrType == "subField" && model.get("is_sub") && bo.tableName == model.get("sub_name")){// 子表字段
       		isAllowBind =true;
       	}
    	if(isAllowBind){
    		this.bindField(model,bo);
    	}
    };
    
    
    BuilderView.prototype.bindField  = function(model,bo){
		model.set("name",  bo.key); 
		model.set("showName",  bo.name); 
		model.set("label",  bo.name); 
    };
    /**
	 * 检查字段是否有效
	 */
    BuilderView.prototype.checkField  = function(){
 	   var k, v, _ref,_ref1,validator,_i,_j,_len,_len1;
    	 _ref =   this.collection;
    	if(_ref.length <= 0){
    		DialogUtil.msg("请从右侧拖拽或点击添加字段");
    		return true;
    	}
    	var formProperty = this.formProperty.toJSON();
     	if(_.isEmpty(formProperty)){
    		DialogUtil.msg("请设置表单相关属性");
    		this.activeTab("form_property");
    	
    	}
     	if(_.isEmpty(formProperty.name)){
    		DialogUtil.msg("请设置表单标题");
    		this.activeTab("form_property");
    		return true;
     	}
     	if(_.isEmpty(formProperty.key)){
    		DialogUtil.msg("请设置表单Key");
    		this.activeTab("form_property");
    		return true;
     	}


        for (_i = 0, _len = _ref.models.length; _i < _len; _i++) {
        	var  model = _ref.models[_i],
        	field = Formbuilder.fields[model.get(FormOptions.t.mappings.FIELD_TYPE)];
        	if(!model.is_input())
        		continue
     		// 采用默认检查,检查必填验证, 检查重复绑定字段问题
        	var validators =[Formbuilder.Validators.RequiredValidator,Formbuilder.Validators.DuplicateValidator];
        	if(field.validators)
        		validators =_.union(validators,field.validators);
        	
	        for (_j = 0, _len1 = validators.length; _j < _len1; _j++) {
		          validator = validators[_j];
		          if(validator){
			         var  errorKey = validator.validate(model,field[validator.validKey]),msg;
			         if(errorKey){
			        	 if ($.type(errorKey)  === "string") {
			        		msg = Formbuilder.lang.errors[errorKey];
			        	 } else if ($.isPlainObject(errorKey)) {// 如果是对象
			        		 msg = Formbuilder.lang.errors[errorKey.key],
			     		 	 args = errorKey.args;
			     			if (!$.isArray(args)) // 不是数组类型的
			     				args = [args]
			     			$.each(args,function(d, e) {
			     				msg = msg.replace(RegExp("\\{" + d + "\\}", "g"), e);
			     			});
			        	 }
			        	 if($.isNotEmpty(msg)){
			        	   	 DialogUtil.msg(msg);
				        	 this.$el.find("[cid='"+model.cid+"']").addClass("has-error");
				        	 return true;
			        	 }
			        
			         }
		          }
	          }	
         }
	  // TODO 检查个类型需要验证必填的格式
/*        var div =  $("#form-builder");
        div.scrollTop = div.scrollHeight;  */

     return false;
    };

    /**
	 * 保存数据
	 * 
	 * @param payload
	 * @returns
	 */
    BuilderView.prototype.doAjaxSave = function(e,payload) {
		  var b =  this.checkField(); 
		  if(b) return ;

      var _this = this;
      var loading = DialogUtil.load("保存中...");
      return $.ajax({
        url:  Formbuilder.isTemplate?Formbuilder.options.HTTP_FORM_TEMPLATE:Formbuilder.options.HTTP_ENDPOINT,
        type: Formbuilder.options.HTTP_METHOD,
        data: {
        	data:payload
        },
        success: function(data) {
        	DialogUtil.close(loading);
        	var result= JSON.parse(data);
        	if(result.result == 1){
        		 _this.formSaved = true;
        		DialogUtil.confirm(result.message + ',是否继续操作', function(rtn) {
					_this.options.callback(rtn);
        			if (rtn){
        				if( Formbuilder.isTemplate)
        					window.location.href=__ctx+"/platform/form/formTemplate/edit.htm?id="+result.id;	
        				else
        				window.location.href=__ctx+"/platform/form/formDef/design.htm?id="+result.id;
        			}
				});
        	}else{
        		DialogUtil.error(result.message,result.cause);
        	}
        },
		error : function(){
			DialogUtil.close(loading);
		}
      });
    };
    
    /**
	 * 预览表单
	 */
    BuilderView.prototype.previewForm = function(e) {
	    var data = this.getData(false),
	    	_this = this;
	    this.formPreview = true;
	   $.console().info(data);
	    DialogUtil.dialog({
	    	content:__ctx+'/platform/form/formDef/preview.htm',
	    	params:data,
	    	callback:function(){
	    		_this.formPreview = false;	
	    	},
	    	cancel: function(){ 
	    		_this.formPreview = false;	
	    	},
	    	area: ['100%', '100%'],
			maxmin:false,
			title:false
	    });
    };
    BuilderView.prototype.closeDialog= function(e) {
    	if(!this.formSaved){
    		var _this = this;
    		DialogUtil.confirm(  Formbuilder.lang.dict.UNSAVED_CHANGES, function(rtn) {
    			if(rtn){
    				_this.formSaved = true;
    				DialogUtil.close(frameElement.dialog.index);
    			}
    		});
    	}else{
    	 	DialogUtil.close(frameElement.dialog.index);
    	}
   
    };

    return BuilderView;

  })(Backbone.View);

  Formbuilder = (function() {
    Formbuilder.helpers = {
      defaultFieldAttrs: function(field_type,$this) {
        var attrs, _base;
        attrs = {};
        attrs[FormOptions.t.mappings.LABEL] = Formbuilder.lang.field_type[field_type];
        attrs[FormOptions.t.mappings.FIELD_TYPE] = field_type;
     
        if(!Formbuilder.nonInputFields[field_type]){
	        attrs[FormOptions.t.mappings.FIELD_OPTIONS]= {};
	        attrs[FormOptions.t.mappings.REQUIRED] = false;
	        attrs[FormOptions.t.mappings.DEFAULT_VALUE_TYPE] = 'fixed';
	        attrs[FormOptions.t.mappings.PLACEHOLDER] = '请输入';
	        if($this && $this.formProperty){
	        	if( $this.formProperty.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY)){
	        	    attrs[FormOptions.t.mappings.GRIDS_TO_OCCUPY] =$this.formProperty.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY);
	        	}
	        }
        }
        
        return (typeof (_base = Formbuilder.fields[field_type]).defaultAttributes === "function" ? _base.defaultAttributes(attrs) : void 0) || attrs;
      },
      simple_format: function(x) {
    	 // 把\n 替换成br
        return x != null ? x.replace(/\n/g, '<br />') : void 0;
      }
    };

    Formbuilder.fields = {};

    // 字段分组
    Formbuilder.groupFields = {} ;
    
    Formbuilder.inputFields = {};

    Formbuilder.nonInputFields = {};
    
    // 子表字段类型
    Formbuilder.SUBTABLE_FIELD_TYPE= FormOptions.t.SUBTABLE_FIELD_TYPE;
 
    // 子表字段
    Formbuilder.subTableFields = {};
    
    Formbuilder.isTemplate = false;
    
    Formbuilder.Validators = {};
    //bo的值
    Formbuilder.boDef ={};

    Formbuilder.registerField = function(name, opts) {
      var x, _i, _len, _ref5;
      _ref5 = ['view', 'edit'];
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        x = _ref5[_i];
        opts[x] = _.template(opts[x]);
      }
      opts.field_type = name;
      Formbuilder.fields[name] = opts;
      if (!opts.group || opts.group ===   Formbuilder.options.group.DEFAULT_KEY)// 默认分组
    	  opts.group = Formbuilder.options.group.DEFAULT_KEY;
   
      if(!Formbuilder.groupFields[opts.group])
    	  Formbuilder.groupFields[opts.group] = [];
      Formbuilder.groupFields[opts.group].push(opts);
      
      // 注册是否是子表字段
      if(  _.contains(Formbuilder.SUBTABLE_FIELD_TYPE, name))
    	   Formbuilder.subTableFields[name] = opts;

      if ( opts.type === 'non_input') {
        return Formbuilder.nonInputFields[name] = opts;
      } else {
        return Formbuilder.inputFields[name] = opts;
      }
     
    };

    function Formbuilder(opts) {
      var args;
      if (opts == null) {
        opts = {};
      }
      Formbuilder.isTemplate= opts.isTemplate?true:false;
      
      _.extend(this, Backbone.Events);
      args = _.extend(opts, {
        formBuilder: this
      });
      
      this.mainView = new BuilderView(args);
    }

    return Formbuilder;

  })();

  window.Formbuilder = Formbuilder;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Formbuilder;
  } else {
    window.Formbuilder = Formbuilder;
  }
  


}).call(this);


(function() {
	Formbuilder.options = {
		BUTTON_CLASS: 'fb-button',
	    HTTP_ENDPOINT: __ctx+'/platform/form/formDef/save.htm',
	    HTTP_FORM_TEMPLATE: __ctx+'/platform/form/formTemplate/save.htm',
	    HTTP_METHOD: 'POST',
	    AUTOSAVE: true,
	    CLEAR_FIELD_CONFIRM: false,
	    group:{
	    	DEFAULT_KEY:"common"
	    },
	    // 富文本 默认的工具栏
	    DEFAULT_TOOLBARS : [ 'source','bold', 'italic', 'underline', 'fontborder', 'strikethrough',   'pasteplain', '|', 'forecolor', 'backcolor',  'selectall', 'cleardoc',
  	                                  'fontfamily', 'fontsize'],
        // TODO office 默认的菜单
  	    DEFAULT_MENUBARS : {'doc':[{alias:'file', css : 'fa-file', text:'文件', parentAlias : '-1'}],'xls':[{alias:'file', css : 'fa-file', text:'文件', parentAlias : '-1'}],'ppt':[{alias:'file', css : 'fa-file', text:'文件', parentAlias : '-1'}]}
	};
}).call(this);    



/** *******************************国际化*********************************************** */
(function() {
	Formbuilder.lang ={
			group:{
				  common:'通用字段',
				  advanced:'增强字段',
				  process:'流程字段',
				  non_input:"其它字段"
			},
			 field_type: {
			   	 hidden:'隐藏域',
				 text:"单行文本",
		    	 textarea:'多行文本',
		    	 editor:'富文本框',
		    	 number: '数字',
		    	 radio:'单项选择',
		    	 checkbox:'多项选择',
		     	 select:'下拉框',
		     	 dictionary:'数据字典',
		     	 datePicker:'日期控件',
		     	 autoNumber:'自动编号',
		     	 attachment:'上传附件',
		     	 selector :'选择器',
		     	 customDialog:"自定义对话框",
		     	 address:'地址',
		     	 signature:'签名',
		     	 office:'office控件',
		     	 linkdata:'关联数据',
		     	 linkattribute:'关联属性',
		    	 table :'子表单',
		    	 tab_break:'选项卡',
		    	 page_break:'分页',
		    	 desc:'描述',
		    	 label:'文本',
		    	 fold_card:'折叠卡',
		    	 approval_opinion:'审批意见',
		    	 flow_diagram:'流程图',
		    	 approval_history:'审批历史'
		      },
		      groupTip:{
				  common:'基础字段提供最基本的表单功能。',
				  advanced:'增强字段可以扩展增强表单字段。',
				  process:'流程字段可以让表单获取更多关于流程信息。',
				  non_input:"其它字段一般都是不可以输入的字段。"
		      },
		      selector_type:{
		    	  user:'用户',
		    	  org:'组织',
		    	  position:'岗位',
		    	  role:'角色'
		      },
		      dict: {
		    	untitled:'未命名',
		        ALL_CHANGES_SAVED: '已经保存',
		        SAVE_FORM: '保存表单',
		        UNSAVED_CHANGES: '您的表单有些修改尚未保存,是否确定离开？'
		      },
		      buttons:{
		    	  "add":"添加",
		    	  "remove":"删除",
		    	  "edit":"编辑",
		    	  "import":"导入",
		    	  "export":"导出",
		    	  "custom":"自定义"
		      },
		      file_types:{
	    		  "images":"图片类",
	    		  "docs":"文档类",
	    		  "videos":"视频类",
	    		  "audios": "音频类",
	    		  "compress": "压缩包"
		      },
		      office_types:{
	    		  "doc":"文档类",
	    		  "xls":"表格类",
	    		  "ppt":"文稿类"
		      },
		      date_formats:{
		    	  "date":"日期",
		    	  "datetime":"日期时间",
		    	  "time":"时间",
		    	  'custom':'自定义'
		      },
		      default_value_type:{
		    	  fixed:'固定值',
		    	  dynamic:'动态脚本',
		    	  linkage:'数据联动',
		    	  formula:'公式编辑'
		      },
		      data_format:{
		            'phone':'手机号',
		            'telephone':'电话号码',
		            'zip':'邮件编码',
		            'idcard':'身份证',
		            'email':'邮箱'
		      },
		      errors:{
		    	  label:'字段标题必填',
		    	  name:'字段未绑定对象',
		    	  none_column:'子表单【{0}】未设置字段',
		    	  sub_label:'子表单【{0}】有字段标题必填',
		    	  sub_name:'子表单【{0}】有字段未绑定对象',
		    	  duplicate_name:'字段【{0},{1}】重复绑定对象',
		    	  sub_duplicate_name:'子表单【{0}】的字段【{1},{2}】重复绑定对象',
		    	  'field_options.dictionary':'请绑定数据字典',
		    	  'field_options.options':'请至少添加一个选项',
		    	  'field_options.identity':'请选择流水号',
		    	  'field_options.dialog':'请选择自定义对话框',
		    	  'field_options.bind':'请设置绑定url'
		    		  
		      }
	};
}).call(this);


// ==================表单验证==============
(function() {
		// 必填验证
		Formbuilder.Validators.RequiredValidator = {
				validate: function(model,validKey) {
					var defValidKey = Formbuilder.isTemplate?["label"]:["label","name"];
					if(!validKey){
						validKey = defValidKey;
					}else{
						validKey = _.union(defValidKey,validKey);
					}
						
				     for (var _i = 0, _len = validKey.length; _i < _len; _i++) {
				    	 var val = model.get(validKey[_i]);
				    	 if($.isEmpty(val)){
				    		 return validKey[_i];
				    	 }
				     }
				     return ;
				},
			validKey:'required',
		};
		//条件必填验证
		Formbuilder.Validators.requiredConditionsValidator = {
				validate: function(model,validKey) {
					if(!validKey)
						return;
				   for (var _i = 0, _len = validKey.length; _i < _len; _i++) {
					    var valid =validKey[_i],
					    	fieldVal = model.get(valid["field"])
					    	conditions =   valid["condition"](fieldVal);//需要必填的字段
					   if($.isEmpty(conditions))
						   return;
					     for (var _j = 0, _len1 = conditions.length; _j < _len1; _j++) {
					    	 var val = model.get(conditions[_j]);
					    	 if($.isEmpty(val)){
					    		 return conditions[_j];
					    	 }
					     }
				     }
				},
				validKey:'conditionsRequired',
		};
		// 子表字段验证
		Formbuilder.Validators.ColumnValidator = {
			validate: function(model,validKey) {
				if(!validKey)
						validKey =  Formbuilder.isTemplate?["label"]:["label","name"];
				var columns =	model.get(FormOptions.t.mappings.COLUMNS);
				if(!columns || columns.length== 0)
					 return  {
						 	key: 'none_column',
						 	args:model.get(FormOptions.t.mappings.LABEL)
						};
						
			     for (var _i = 0, _len = validKey.length; _i < _len; _i++) {
			    	 var key = validKey[_i];
			    	 for (var _j = 0, _len1 = columns.length; _j < _len1; _j++) {
			    		 var val = columns[_j][key];
				    	 if(_.isEmpty(val)){
				    		 return {
								 	key:  "sub_"+key,
								 	args:model.get(FormOptions.t.mappings.LABEL)
								};
				    	 }
			    	}
			     }
			     return ;
			},
			validKey:'cloumnValid',
		};
		
		// 子表字段重复验证
		Formbuilder.Validators.ColumnDuplicateValidator = {
			validate: function(model,validKey) {
				if(  Formbuilder.isTemplate)
					return;
				if(!validKey)
					validKey = ["name"];
				var columns =	model.get(FormOptions.t.mappings.COLUMNS);
				if(!columns || columns.length== 0)
					return;
				
			     for (var _i = 0, _len = validKey.length; _i < _len; _i++) {
			    	 var key = validKey[_i];
			    	 for (var _j = 0, _len1 = columns.length; _j < _len1; _j++) {
			    		 var val = columns[_j][key]
				    	var f = _.find(columns,function(m,k){
				    		return   k !=_j &&m[key] == val;
				    	 });
				    	 if(f){
				     		 return {
								 	key:  "sub_duplicate_"+key,
								 	args:[model.get(FormOptions.t.mappings.LABEL),columns[_j]['label'],f['label']]
								};
				    	 }
			    	}
			     }
			     return ;
			},
			validKey:'columnDuplicateValidator',
		};
		
		
		// 重复字段验证
		Formbuilder.Validators.DuplicateValidator = {
			validate: function(model,validKey) {
				if(  Formbuilder.isTemplate)
					return;
				if(!validKey)
					validKey = ["name"];
				var models= model.collection.models;
				if(models.length ==0)
					return;
			     for (var _i = 0, _len = validKey.length; _i < _len; _i++) {
			    	 var key = validKey[_i], val = model.get(key);
			    	var f = _.find(models,function(m){
			    		return  m.is_input() && m.cid !=model.cid &&m.get(key) == val;
			    	 })
			    	 if(f){
			    		 return {
							 	key:  "duplicate_"+key,
							 	args:[model.get('label'),f.get('label')]
							};
			    	 }
			     }
			     return ;
			},
			validKey:'duplicateValid',
		};
		
		
}).call(this);

/** *****************************TODO 注册字段************************************* */
/**
 * 注册字段 说明：
 * <p>
 * alias【必需】： 注册字段别名，唯一的区别字段类型。
 * </p>
 * <p>
 * order 【必需】：组内序号，根据分组进行排序。
 * </p>
 * <p>
 * group【可选】 : 分组 ，如果不填默认是common
 * </p>
 * <p>
 * view 【必需】： 预览字段 html，就是【表单编辑区域】的展示的模版。
 * </p>
 * <p>
 * edit【必需】： 编辑字段 html ，就是表单【编辑字段】配置的模版
 * </p>
 * <p>
 * addButton【必需】：添加字段按钮，就是【添加字段配】置的模版
 * </p>
 * <p>
 * defaultAttributes 【必需】： 默认值 null，返回是function， 是初始的默认值
 * </p>
 * 
 */

/**
 * 单行文本
 */
(function() {
  var  alias = 'text';
  Formbuilder.registerField(alias, {
    order: 1,// 组内序号
    view: "<input type='text'  name='<%= rf.get(FormOptions.t.mappings.NAME) %>'  placeholder='<%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %>' readonly='readonly'/>",
    edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +
    		" <%= Formbuilder.templates['edit/field_validations']({rf:rf,required:true,minlength:true,maxlength:true,dataformat:true}) %>\n" +
    		" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
    		" <%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>\n"+
    		" <%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true,}) %>",
    addButton: "<span class='symbol'><span class='fa fa-font'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
    defaultAttributes: function(attrs) {// 默认值
      return attrs;
    }
  });

}).call(this);

/**
 * 多行文本
 */
(function() {
	  var  alias = 'textarea';
	  Formbuilder.registerField(alias, {
	    order: 2,// 组内序号
	    view: "<textarea    placeholder='<%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %>'  readonly='readonly' ></textarea>",
	    edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +	
	    		" <%= Formbuilder.templates['edit/field_validations']({required:true,minlength:true,maxlength:true}) %>\n" +
	    		" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
				"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,height:true,width:true,align:'left',mobile:true}) %>\n"+
				"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
		addButton: "<span class='symbol'><span class='fa fa-list'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	      return attrs;
	    }
	  });
}).call(this);



/**
 * 数字
 */
(function() {
	  var  alias = 'number';
	  Formbuilder.registerField(alias, {
	    order: 3,// 组内序号
	    view: " <div class='input-icon'>" +
					"<i class='fa fa-number'></i>" +
					"<input type='text' class='form-control'   name='<%= rf.get(FormOptions.t.mappings.NAME) %>'   placeholder='<%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %>'  readonly='readonly'>" +
				" </div>",
		edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,units:true,placeholder:true,desc:true}) %>\n" +	
				" <%= Formbuilder.templates['edit/field_validations']({required:true,min:true,max:true,decimal:true,integer:true}) %>\n" +
				" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
				"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>\n"+
				"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-number'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	      return attrs;
	    }
	  });
}).call(this);



/**
 * 单项选择
 */
(function() {
  var  alias = 'radio';
  Formbuilder.registerField(alias, {
    order: 4,
    view:  "<div class='choices'><% for (i in (rf.get(FormOptions.t.mappings.OPTIONS) || [])) { %>\n " +
		    "	<label class='<% if ( rf.get(FormOptions.t.mappings.ARRANGEMENT) ==\"vertical\") {%> <% } else { %> radio-inline<% } %>'>\n  "+
		    "	<input type='radio'  <%= rf.get(FormOptions.t.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n    " +
			"  		<%= rf.get(FormOptions.t.mappings.OPTIONS)[i].label %>\n " +
			"   </label>\n" +
			"	<% if ( rf.get(FormOptions.t.mappings.OPTIONS)[i].include_other_option) { %>\n  " +
			"   <input class=\"other-choice-input\" type='text'  readonly />\n " +
			" 		<% } %>\n" +
			"<% } %>\n\n" +
			"</div>",
    edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,desc:true}) %>\n" +	
    		"<%= Formbuilder.templates['edit/options']({rf:rf, includeOther: true}) %>\n" +
    		"<%= Formbuilder.templates['edit/field_validations']({required:true}) %>\n" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
    		"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,arrangement:true,occupy:true,width:true,align:'left',mobile:true}) %>\n"+
    		"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
    addButton: "<span class='symbol'><span class='fa fa-circle-o'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
    defaultAttributes: function(attrs) {// 默认值
      	 attrs[FormOptions.t.mappings.DATASOURCE]  = 'fixed';
    	 attrs[FormOptions.t.mappings.OPTIONS]  = [
                                       {
                                    	   val:'1',
                                         label: "选项一",
                                         checked: false
                                       }, {
                                    	   val:'2',
                                         label: "选项二",
                                         checked: false
                                       }
                                     ];
      return attrs;
    },
    required:[FormOptions.t.mappings.OPTIONS],
    validators: [Formbuilder.Validators.RequiredValidator]
  });

}).call(this);


/**
 * 多项选择
 */
(function() {
  var  alias = 'checkbox';
  Formbuilder.registerField(alias, {
    order: 5,
    view:  "<div class='choices'><% for (i in (rf.get(FormOptions.t.mappings.OPTIONS) || [])) { %>\n " +
    		"	<label class='<% if ( rf.get(FormOptions.t.mappings.ARRANGEMENT) ==\"vertical\") {%> <% } else { %> checkbox-inline<% } %>'>\n  "+
		    "		<input type='checkbox'  <%= rf.get(FormOptions.t.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n    " +
			"  		<%= rf.get(FormOptions.t.mappings.OPTIONS)[i].label %>\n " +
			"   </label>\n" +
			"	<% if ( rf.get(FormOptions.t.mappings.OPTIONS)[i].include_other_option) { %>\n  " +
			"   <input class=\"other-choice-input\" type='text'  readonly />\n " +
			" 		<% } %>\n" +
			"<% } %>\n\n" +
			"</div>",
    edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,desc:true}) %>\n" +	
    		"<%= Formbuilder.templates['edit/options']({rf:rf, includeOther: true}) %>\n" +
			"<%= Formbuilder.templates['edit/field_validations']({required:true,minmum:true,maxmum:true}) %>\n" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
			"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,arrangement:true,occupy:true,width:true,align:'left',mobile:true}) %>\n"+
    		"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
    addButton: "<span class='symbol'><span class='fa fa-check-square'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
    defaultAttributes: function(attrs) {// 默认值
    	 attrs[FormOptions.t.mappings.DATASOURCE]  = 'fixed';
    	 attrs[FormOptions.t.mappings.OPTIONS]  = [
                                         {
                                        	 val:'1',
                                             label: "选项一",
                                             checked: false
                                           }, {
                                        	 val:'2',
                                             label: "选项二",
                                             checked: false
                                           }
                                     ];
      return attrs;
    },
    required:[FormOptions.t.mappings.OPTIONS],
    validators: [Formbuilder.Validators.RequiredValidator]
  });

}).call(this);

/**
 * 下拉框
 */
(function() {
  var  alias = 'select';
  Formbuilder.registerField(alias, {
    order: 6,
    view: "<select  readonly='readonly' >\n  <% if (rf.get(FormOptions.t.mappings.INCLUDE_BLANK)) { %>\n " +
    		"   <option value=''>"+
    		"<% if ( rf.get(FormOptions.t.mappings.INCLUDE_BLANK_VALUE) ) {%> <%= rf.get(FormOptions.t.mappings.INCLUDE_BLANK_VALUE) %><% } else { %> 请选择<% } %>"+
    		"</option>\n  <% } %>\n\n  <% for (i in (rf.get(FormOptions.t.mappings.OPTIONS) || [])) { %>\n" +
    		"    <option <% if ( rf.get(FormOptions.t.mappings.OPTIONS)[i].checked) { %>selected<% } %>>\n  " +
    		"    <%= rf.get(FormOptions.t.mappings.OPTIONS)[i].label %>\n    </option>\n  <% } %>\n" +
    		"</select>",
    edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,desc:true}) %>\n" +	
    		"<%= Formbuilder.templates['edit/options']({ rf:rf,includeBlank:true}) %>\n" +
    		" <%= Formbuilder.templates['edit/field_validations']({required:true}) %>\n" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
    		"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>\n"+
    		"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
    addButton: "<span class='symbol'><span class='fa fa-caret-square-o-down'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
    defaultAttributes: function(attrs) {// 默认值
    	attrs[FormOptions.t.mappings.DATASOURCE]  = 'fixed';
        attrs[FormOptions.t.mappings.OPTIONS] = [
                                           {
	                                          	 val:'1',
	                                             label: "选项一",
	                                             checked: false
                                             }, {
                                            	val:'2',
                                               label: "选项二",
                                               checked: false
                                             }
                                     ];
        attrs[FormOptions.t.mappings.INCLUDE_BLANK] = true;
      return attrs;
    },
    required:[FormOptions.t.mappings.OPTIONS],
    validators: [Formbuilder.Validators.RequiredValidator]
  });

}).call(this);




/**
 * 日期控件
 */
(function() {
	  var  alias = 'datePicker';
	  Formbuilder.registerField(alias, {
	    order: 7,// 组内序号
	    view: " <div class='input-icon'>" +
	    			"<i class='fa fa-calendar'></i>" +
	    			"<input type='text' class='form-control' name='<%= rf.get(FormOptions.t.mappings.NAME) %>'   placeholder='<%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %>'  readonly='readonly'>" +
	    		" </div>",
	    edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,datefmt:true,placeholder:true,desc:true}) %>\n" +	
	    		" <%= Formbuilder.templates['edit/field_validations']({rf:rf,required:true,startdate:true,enddate:true}) %>\n" +
				" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
	    		"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>"+
				"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-calendar'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	    	 attrs[FormOptions.t.mappings.PLACEHOLDER]  = '请选择';
	        attrs[FormOptions.t.mappings.DATEFMT_TYPE] =  'date';
	       attrs[FormOptions.t.mappings.DATEFMT] =  'yyyy-MM-dd';
	      return attrs;
	    }
	  });
}).call(this);

/**
 * 日期区间
 *//*
	 * (function() { var alias = 'dateRange'; Formbuilder.registerField(alias, {
	 * order: 10,// 组内序号 view: "<div class=\"row\"><div class='col-md-5'><div
	 * class='input-icon'>" + "<i class='fa fa-calendar'></i>" + "<input
	 * type='text' class='form-control' name='<%=
	 * rf.get(FormOptions.t.mappings.NAME) %>' readonly='readonly'>" + " </div>
	 * </div><div class='col-md-1'> <div class='form-control-static'>至</div></div>"+ "<div
	 * class='col-md-5'><div class='input-icon'>" + "<i class='fa
	 * fa-calendar'></i>" + "<input type='text' class='form-control' name='<%=
	 * rf.get(FormOptions.t.mappings.NAME) %>' readonly='readonly'>" + " </div>
	 * </div> </div>", edit: " <%=
	 * Formbuilder.templates['edit/common']({rf:rf,defval:true,datefmt:true})
	 * %>\n" + " <%=
	 * Formbuilder.templates['edit/field_validations']({required:true,startdate:true,enddate:true})
	 * %>\n" + "<%=
	 * Formbuilder.templates['edit/layout_settings']({rf:rf,occupy:true,width:true})
	 * %>", addButton: "<span class='symbol'><span class='fa fa-calendar'></span> "+
	 * Formbuilder.lang.field_type[alias]+"</span>", defaultAttributes:
	 * function(attrs) {// 默认值 attrs[FormOptions.t.mappings.DATEFMT] =
	 * 'yyyy-MM-dd'; return attrs; } }); }).call(this);
	 */


/**
 * 隐藏域
 * 
 */
(function() {
	  var  alias = 'hidden';
	  Formbuilder.registerField(alias, {
	    order: 8,// 组内序号
	    view:  "<input type='text'  name='<%= rf.get(FormOptions.t.mappings.NAME) %>'  readonly='readonly'/>",
	    edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,pk:true}) %>\n" ,
	    addButton: "<span class='symbol'><span class='fa fa-eye-slash'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	      return attrs;
	  }
	  });
}).call(this);


/**
 * 子表
 */
(function() {
	  var  alias = 'table';
	  Formbuilder.registerField(alias, {
	    order: 9,// 组内序号
	    view: "<%= Formbuilder.templates['view/table']({rf:rf}) %>",
	    edit: " <%= Formbuilder.templates['edit/common']({rf:rf}) %>\n" +	
	    		" <%= Formbuilder.templates['edit/columns']() %>" +
				"<%= Formbuilder.templates['edit/buttons']({rf:rf}) %>" +
// "<%= Formbuilder.templates['edit/subAppLayouts']({rf:rf}) %>" +
	    		"<%= Formbuilder.templates['edit/field_validations']({required:true}) %>" +
	    		"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,mode:true,mobile:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-table'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	    	attrs[FormOptions.t.mappings.MODE]='inner';
	    	var btnType = ["add",'remove'], 
	    		button;
	        attrs[FormOptions.t.mappings.BUTTONS]=[];
	    	_.each(btnType,function(b,i){
	  	       button = FormOptions.t.BUTTONS[b];
	  	       button.type = b;
	  	       button.label =  Formbuilder.lang.buttons[b];
	  	       attrs[FormOptions.t.mappings.BUTTONS].push(button);
	    	});
	      return attrs;
	    },
	  validators:[Formbuilder.Validators.ColumnValidator,Formbuilder.Validators.ColumnDuplicateValidator]
	  });
}).call(this);

/**
 * 富文本
 */
(function() {
	  var  alias = 'editor';
	  Formbuilder.registerField(alias, {
	    order: 10,// 组内序号
	    group:'advanced',
	    view: "<%= Formbuilder.templates['view/editor']({rf:rf}) %>",
	    edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +	
	    		" <%= Formbuilder.templates['edit/field_validations']({required:true,minlength:true,maxlength:true}) %>\n" +
				" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
				"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,height:true,occupy:true,width:true,align:'left',mobile:true}) %>\n"+
				"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>"+
				"<%= Formbuilder.templates['edit/toolbar_settings']({rf:rf}) %>",
		addButton: "<span class='symbol'><span class='fa fa-paragraph'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	    	attrs[FormOptions.t.mappings.TOOLBARS]=Formbuilder.options.DEFAULT_TOOLBARS;
	      return attrs;
	    }
	  });
}).call(this);


/**
 * 数据字典
 */
(function() {
  var  alias = 'dictionary';
  Formbuilder.registerField(alias, {
    order: 11,
    group:'advanced',
    view: "<select>\n  <% if (rf.get(FormOptions.t.mappings.PLACEHOLDER)) { %>\n " +
    		"   <option value=''><%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %></option>\n  <% } %>\n\n"+
    		"</select>",
    edit: "<%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +	
    		"<%= Formbuilder.templates['edit/field_settings']({rf:rf,dictionary:true}) %>\n" +
    		"<%= Formbuilder.templates['edit/field_validations']({required:true}) %>\n" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
    		"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>\n"+
    		"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
    addButton: "<span class='symbol'><span class='fa fa-book'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
    defaultAttributes: function(attrs) {// 默认值
   	 	attrs[FormOptions.t.mappings.PLACEHOLDER]  = '请选择';
   	 	attrs[FormOptions.t.mappings.MULTIPLE]  = 'N';
    	attrs[FormOptions.t.mappings.SELECT_MODE] = 'leaf';
    	attrs[FormOptions.t.mappings.DISPLAY_MODE] = 'path';
    	attrs[FormOptions.t.mappings.SPLIT] = '/';
      return attrs;
    },
    required:[FormOptions.t.mappings.DICTIONARY],
    validators: [Formbuilder.Validators.RequiredValidator]
  });

}).call(this);

/**
 * 自动编号
 */
(function() {
	  var  alias = 'autoNumber';
	  Formbuilder.registerField(alias, {
	    order: 12,// 组内序号
	    group:'advanced',
	    view: " <div class='input-icon'>" +
				"<i class='fa fa-list-ol'></i>" +
				"<input type='text' class='form-control'   name='<%= rf.get(FormOptions.t.mappings.NAME) %>'  placeholder='<%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %>' readonly='readonly'>" +
				" </div>",
		edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +	
				" <%= Formbuilder.templates['edit/field_settings']({rf:rf,identity:true}) %>" +
				" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
				"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>"+
				"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-list-ol'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	     	attrs[FormOptions.t.mappings.PLACEHOLDER]  = '';
	     	attrs[FormOptions.t.mappings.REQUIRED]=  false;
	    	attrs[FormOptions.t.mappings.INIT]=  true;
	      return attrs;
	    },
	    required:[FormOptions.t.mappings.IDENTITY],
	    validators: [Formbuilder.Validators.RequiredValidator]
	  });
}).call(this);

/**
 * 上传附件
 */
(function() {
	  var  alias = 'attachment';
	  Formbuilder.registerField(alias, {
	    order: 13,// 组内序号
	    group:'advanced',
	    view: "<div class='attachment-field'><div>"+
	    	 "<div class='attachment-select-trigger'> "+
	    	 	" <label> "+
	    	 		" <div class='plus'>+</div> "+
	    	 			"<div class='select-text'> "+
	    	 			"<% if ( rf.get(FormOptions.t.mappings.PLACEHOLDER) ) {%> <%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %><% } else { %> 请选择上传文件<% } %>"+
	    	 			"</div> "+
	    	 		"</label> "+
	    	 	" </div> "+
	    	 "</div></div>",
		edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +	
			" <%= Formbuilder.templates['edit/attachment']({rf:rf}) %>" +
			" <%= Formbuilder.templates['edit/field_validations']({required:true}) %>" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
			"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>"+
			"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-paperclip'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	    	 attrs[FormOptions.t.mappings.PLACEHOLDER]  = '请选择文件';
	    	attrs[FormOptions.t.mappings.MAX_FILE_QUANTITY]= '-1';
	      return attrs;
	    }
	  });
}).call(this);

/**
 * 选择器
 */
(function() {
	  var  alias = 'selector';
	  Formbuilder.registerField(alias, {
	    order: 14,// 组内序号
	    group:'advanced',
	    view: "<div class='selector-list'>"+
		   	 "<label><div class='plus'>+</div><div class='selector-empty'> "+
				"<% if ( rf.get(FormOptions.t.mappings.PLACEHOLDER) ) {%> <%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %><% } else { %> 请选择<%=(Formbuilder.lang.selector_type[rf.get(FormOptions.t.mappings.SELECTOR_TYPE)])%><% } %>"+
		  	 "</div></label></div>",
	    edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +	
			" <%= Formbuilder.templates['edit/selector']({rf:rf}) %>\n" +
	    	" <%= Formbuilder.templates['edit/field_validations']({required:true}) %>" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
	    	"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>"+
			"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-search'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	    	attrs[FormOptions.t.mappings.PLACEHOLDER]  = null;
	    	attrs[FormOptions.t.mappings.SELECTOR_TYPE]= 'user';
	    	attrs[FormOptions.t.mappings.STORE]= 'json';
	    	attrs[FormOptions.t.mappings.IS_SINGLE]=  true;
	      return attrs;
	    }
	  });
}).call(this);
/**
 * 自定义对话框
 */
(function() {
	  var  alias = 'customDialog';
	  Formbuilder.registerField(alias, {
	    order: 15,// 组内序号
	    group:'advanced',
	    view: " <div class='input-group'>" +
			"<input type='text' class='form-control'   name='<%= rf.get(FormOptions.t.mappings.NAME) %>' placeholder='<%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %>'   readonly='readonly'>" +
			"<span class='input-group-addon'><i class='<% if (rf.get(FormOptions.t.mappings.ICON)) { %> <%= rf.get(FormOptions.t.mappings.ICON) %><% }else{ %>fa fa-search-plus<% } %>'></i></span>" +
			" </div>",
	    edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +	
	    	" <%= Formbuilder.templates['edit/field_settings']({rf:rf,dialog:true}) %>" +
	    	" <%= Formbuilder.templates['edit/field_validations']({required:true}) %>" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
	    	"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>"+
			"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-search-plus'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	    	 attrs[FormOptions.t.mappings.PLACEHOLDER]  = '请选择';
	    	attrs[FormOptions.t.mappings.DIALOG_TYPE] = 'dialog';
	   		 attrs[FormOptions.t.mappings.IS_SINGLE]  = 'N';
	      	attrs[FormOptions.t.mappings.STORE]= 'id';
	     	attrs[FormOptions.t.mappings.STORE_MODE]= 'current';
	    	attrs[	FormOptions.t.mappings.ICON] = 'fa fa-search-plus';
	    
	      return attrs;
	    },
	    conditionsRequired:[{
	    	field:FormOptions.t.mappings.DIALOG_TYPE,
        	condition:function(val){
        		if(val == 'url' )
        			return [FormOptions.t.mappings.BIND];
        		else
        			return [FormOptions.t.mappings.DIALOG];
        	}
	    }
     ],
	    validators: [Formbuilder.Validators.requiredConditionsValidator]
	  });
}).call(this);



/**
 * 关联数据  
 */
(function() {
	  var  alias = 'linkdata';
	  Formbuilder.registerField(alias, {
	    order: 16,// 组内序号
	    group:'advanced',
	    view: "<select>\n  <% if (rf.get(FormOptions.t.mappings.PLACEHOLDER)) { %>\n " +
				"   <option value=''><%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %></option>\n  <% } %>\n\n"+
				"</select>",
	    edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +	
	    	" <%= Formbuilder.templates['edit/linkdata_settings']({rf:rf}) %>" +
	    	" <%= Formbuilder.templates['edit/field_validations']({required:true}) %>" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
	    	"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>"+
			"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-gg'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	   	 	 attrs[FormOptions.t.mappings.PLACEHOLDER]  = '请选择';
	   		 attrs[FormOptions.t.mappings.MULTIPLE]  = 'N';
	      return attrs;
	    }
	  });
}).call(this);




/**
 * 地址
 */
(function() {
	  var  alias = 'address';
	  Formbuilder.registerField(alias, {
	    order: 18,// 组内序号
	    group:'advanced',
	    view: "<div class='field-content'>" +
			"<select class='form-control' readonly='readonly'  ><option selected>"+
 			"<% if ( rf.get(FormOptions.t.mappings.PLACEHOLDER) ) {%> <%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %><% } else { %> 请选择<% } %>"+
			"</option></select>" +
			" </div><% if (rf.get(FormOptions.t.mappings.IS_STREET)) { %>\n " +
			"<div class='mt-5'><textarea  readonly='readonly'></textarea></div>\n  <% } %>\n\n",
	    edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,placeholder:true,desc:true}) %>\n" +	
	    	" <%= Formbuilder.templates['edit/address']({rf:rf}) %>" +
	    	" <%= Formbuilder.templates['edit/field_validations']({required:true}) %>" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
	    	"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>"+
			"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-building'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	   	 	 attrs[FormOptions.t.mappings.PLACEHOLDER]  = '请选择';
	    	 attrs[FormOptions.t.mappings.DEFAULT_VALUE_TYPE] = 'fixed';
	    	 attrs[FormOptions.t.mappings.TOP] = "country";
	    	 attrs[FormOptions.t.mappings.LEVEL] = "district";
	     	 attrs[FormOptions.t.mappings.IS_STREET] = true;
	      return attrs;
	    }
	  });
}).call(this);

/**
 * 签名
 */
(function() {
	  var  alias = 'signature';
	  Formbuilder.registerField(alias, {
	    order: 19,// 组内序号
	    group:'advanced',
	    view:  " <div class=\"fr-signature-outer\"><div class=\"fr-signature-header\"><div class=\"fr-signature-fieldtext\">" +
				"<% if ( rf.get(FormOptions.t.mappings.PLACEHOLDER) ) {%> <%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %><% } else { %> 在这里输入您的签名<% } %>"+
	    		"</div> " +
	    		" <div class=\"fr-signature-clear\"><span><a href=\"javascript:void(0);\" data-toggle=\"signature-clear\">清除</a></span></div></div> " +
	    		" <div  class=\"fr-signature-div\"  ></div></div> " ,
	    edit:  " <%= Formbuilder.templates['edit/common']({rf:rf,placeholder:true,desc:true}) %>\n" +	
	    	" <%= Formbuilder.templates['edit/field_validations']({required:true}) %>" +
			" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
	    	"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,height:true,occupy:true,width:true,align:'left',mobile:true}) %>",
	    addButton: "<span class='symbol'><span class='fa fa-pencil-square-o'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	    	 attrs[FormOptions.t.mappings.PLACEHOLDER]  = '请在这里输入你的签名';
	      return attrs;
	    }
	  });
}).call(this);

/**
 * office控件
 */
(function() {
	var  alias = 'office';
	  Formbuilder.registerField(alias, {
	    order: 20,// 组内序号
	    group:'advanced',
	    view: "<image src='"+__ctx+"/styles/commons/images/form/office.png' height='80px' width='200px'>",
	    edit:  "<%= Formbuilder.templates['edit/common']({rf:rf,defval:true,placeholder:true,desc:true}) %>\n" +	
	    		"<%= Formbuilder.templates['edit/office']({required:true}) %>\n" +
	    		"<%= Formbuilder.templates['edit/field_validations']({required:true}) %>\n" +
				" <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
				"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,height:true,occupy:true,mobile:true}) %>\n"+
				"<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>"+
				"<%= Formbuilder.templates['edit/menubar_settings']({rf:rf}) %>",
		addButton: "<span class='symbol'><span class='fa fa-file-word-o'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	    defaultAttributes: function(attrs) {// 默认值
	    	attrs[FormOptions.t.mappings.MENUBARS]=Formbuilder.options.DEFAULT_MENUBARS['doc'];
	      return attrs;
	    }
	  });
}).call(this);





 // 审批意见
// (function() {
// var alias = 'approval_opinion';
// Formbuilder.registerField(alias, {
// order: 1,// 组内序号
// group:'process',
// view: "<%=Formbuilder.templates['view/desc']({rf:rf})%>",
// edit: " <%=Formbuilder.templates['edit/desc']({rf:rf}) %>\n",
// addButton: "<span class='symbol'><span class='fa
// fa-id-card-o'></span>"+Formbuilder.lang.field_type[alias]+"</span>",
// defaultAttributes: function(attrs) { // 默认值
// return attrs; }
// });
// }).call(this);

// 流程图
(function() {
	var alias = 'flow_diagram';
	Formbuilder.registerField(alias, {
		order: 2,// 组内序号
	    type:'non_input',
		group:'process',
	    view: "  <%= Formbuilder.templates['view/base_non_input_label']({rf:rf}) %>"+
	    		"<image src='"+__ctx+"/styles/commons/images/form/flow_diagram.png' height='90px' width='400px'>",
		edit: " <%=Formbuilder.templates['edit/process']({rf:rf}) %>\n",
		addButton: "<span class='symbol'><span class='fa fa-file-image-o'></span> "+Formbuilder.lang.field_type[alias]+"</span>", 
		defaultAttributes: function(attrs) {	 // 默认值
			return attrs; 
		}
	}); 
}).call(this);

// 审批历史
(function() {
	var alias = 'approval_history';
	Formbuilder.registerField(alias, {
		order: 3,// 组内序号
	    type:'non_input',
		group:'process',
		view: "  <%= Formbuilder.templates['view/base_non_input_label']({rf:rf}) %>"+
		"<image src='"+__ctx+"/styles/commons/images/form/approval_history.png' height='400px' width='100%'>",
		edit: " <%=Formbuilder.templates['edit/process']({rf:rf}) %>\n",
		addButton: "<span class='symbol'><span class='fa fa-list-alt'></span> "+Formbuilder.lang.field_type[alias]+"</span>", 
		defaultAttributes: function(attrs) {	 // 默认值
			return attrs; 
		}
	}); 
}).call(this);


// 描述
(function() {
	  var  alias = 'desc';
	  Formbuilder.registerField(alias, {
	    order: 1,// 组内序号
	    type:'non_input',
	    group:'non_input',
	    view: "  <%= Formbuilder.templates['view/base_non_input_label']({rf:rf,lable:true}) %>"+
	    		"<%= Formbuilder.templates['view/desc']({rf:rf}) %>",
	    edit: " <%= Formbuilder.templates['edit/desc']({rf:rf}) %>\n",
	    addButton: "<span class='symbol'><span class='fa fa-exclamation-circle'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	 	defaultAttributes: function(attrs) {// 默认值
	 		attrs[FormOptions.t.mappings.SPLIT_LINE] =true;
			attrs[FormOptions.t.mappings.LINE_STYLE] ='dashed';
	 		
	      return attrs;
	    }
	  });
}).call(this);


//标签页
(function() {
	  var  alias = 'tab_break';
	  Formbuilder.registerField(alias, {
	    order: 2,// 组内序号
	    type:'non_input',
	    group:'non_input',
	    view: "<%= Formbuilder.templates['view/base_non_input_label']({rf:rf,lable:true}) %>",
	    edit: " <%= Formbuilder.templates['edit/tab_break']({rf:rf}) %>\n",
	    addButton: "<span class='symbol'><span class='fa fa-trello'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	 	defaultAttributes: function(attrs) {// 默认值
	 		
	      return attrs;
	    }
	  });
}).call(this);

//文本
(function() {
	  var  alias = 'label';
	  Formbuilder.registerField(alias, {
	    order: 3,// 组内序号
	    type:'non_input',
	    group:'non_input',
	    view: "  <%= Formbuilder.templates['view/base_non_input_label']({rf:rf,lable:true}) %>"+
	    		"<%= Formbuilder.templates['view/non_input_field_label']({rf:rf}) %>",
	    edit: " <%= Formbuilder.templates['edit/non_input_field_label']({rf:rf,placeholder:true,desc:true}) %>\n"+
				"<%= Formbuilder.templates['edit/layout_settings']({rf:rf,occupy:true,width:true,align:'left',mobile:true}) %>\n",
	    addButton: "<span class='symbol'><span class='fa fa-bars'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	 	defaultAttributes: function(attrs) {// 默认值
			attrs[FormOptions.t.mappings.DEFAULT_VALUE_TYPE] ='fixed';
	      return attrs;
	    }
	  });
}).call(this);

//表单向导
(function() {
	  var  alias = 'page_break';
	  Formbuilder.registerField(alias, {
	    order: 4,// 组内序号
	    type:'non_input',
	    group:'non_input',
	    view: "<%= Formbuilder.templates['view/base_non_input_label']({rf:rf}) %>"+
	    	"<%= Formbuilder.templates['view/page_break']({rf:rf}) %>",
	    edit: " <%= Formbuilder.templates['edit/page_break']({rf:rf}) %>\n"+
	    		" <%= Formbuilder.templates['edit/page_setting']({rf:rf}) %>\n",
	    addButton: "<span class='symbol'><span class='fa fa-ellipsis-h'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	 	defaultAttributes: function(attrs) {// 默认值
			attrs[FormOptions.t.mappings.PREV_PAGE] ='上一页';
			attrs[FormOptions.t.mappings.NEXT_PAGE] ='下一页';
	      return attrs;
	    }
	  });
}).call(this);


//折叠卡
(function() {
	  var  alias = 'fold_card';
	  Formbuilder.registerField(alias, {
	    order: 5,// 组内序号
	    type:'non_input',
	    group:'non_input',
	    view: "<%= Formbuilder.templates['view/base_non_input_label']({rf:rf,lable:true}) %>",
	    edit: " <%= Formbuilder.templates['edit/fold_card']({rf:rf}) %>\n",
	    addButton: "<span class='symbol'><span class='fa fa-window-maximize'></span> "+  Formbuilder.lang.field_type[alias]+"</span>",
	 	defaultAttributes: function(attrs) {// 默认值
	 		attrs[FormOptions.t.mappings.FOLD_CARD_OPEN]=  true;
		    return attrs;
	    }
	  });
}).call(this);

/** ***************************TODO 模版***************************** */
this["Formbuilder"] = this["Formbuilder"] || {};
this["Formbuilder"]["templates"] = this["Formbuilder"]["templates"] || {};

// ----------------------------------------------编辑模版---------------------------------------------------------
/**
 * 编辑-基础模版
 */
this["Formbuilder"]["templates"]["edit/base"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	// 个性化设置
	__p +=((__t = ( Formbuilder.fields[rf.get(FormOptions.t.mappings.FIELD_TYPE)].edit({rf: rf,table:table}) )) == null ? '' : __t) +
			'\n';
	}
	return __p
};

/**
 * 编辑-不用编辑属性的模版
 */
this["Formbuilder"]["templates"]["edit/base_non_input"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		if(rf.get(FormOptions.t.mappings.FIELD_TYPE)){
			__p += ((__t = ( Formbuilder.fields[rf.get(FormOptions.t.mappings.FIELD_TYPE)].edit({rf: rf}) )) == null ? '' : __t) ;
		}

		__p +='\n';
	}
	return __p
};



/**
 * 通用模版
 */
this["Formbuilder"]["templates"]["edit/common"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape,__type='text',ishide=true,__isSub=false,defValueLabel='';
	with (obj) {
	__type=rf.get(FormOptions.t.mappings.FIELD_TYPE);
	__isSub = rf.get(FormOptions.t.mappings.IS_SUB);
	__p +=  '<div class="setting-panel panel">'+
    		'<div class="panel-heading" ><span  data-toggle="collapse" data-target="#editCommon">'+  Formbuilder.lang.field_type[__type]+'</span>';
	
    	  	if(__type != 'table'){
    	  		__p +='<div class="dropdown pull-right">';
    	  				if(__isSub){
    	  		__p +=	   '<a href="javascript:void(0)" title="返回子表"  class="js-back-table" >'+
				              '<i class=" fa fa-back"></i>&nbsp;&nbsp;&nbsp;&nbsp;'+
				            '</a>';
    	  				}
    	  		__p +=    '<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" data-target="#" aria-expanded="false" title="更换控件" >'+
				              '<i class=" fa fa-sliders"></i>&nbsp;&nbsp;&nbsp;&nbsp;'+
				            '</a>';
    	  		__p +=   '<ul class="dropdown-menu">';
			            _.each(_.sortBy(Formbuilder.inputFields, 'order'), function(g,i){ ;
			            	if( g.field_type == __type )
			            		return true;
				         	if(g.field_type == 'table'){
				         		__p += '<li class="divider"></li>';
				          		return true;
				         	}
				            if(__isSub && !_.contains(Formbuilder.SUBTABLE_FIELD_TYPE,g.field_type))// 子表
				         			return true;
			            	__p += '<li>'+
					                '<a  data-role="change_field_type" data-fieldtype="'+g.field_type+'" href="javascript:void(0)" >'+
					                  g.addButton+
					    			'</a></li>';
			            }); 

			     __p +=    '</ul></div>'
    	  	}
    	__p +=   '</div>'+
    		'</div>\n';
    
    __p += '<div class="panel-body collapse in" id="editCommon">'+
        	'<div class="panel-body-content">';
        
        __p +='<div class="form-group">'+
		        		'<label>标题<i class="fa fa-help" data-tip data-title="关于字段标题" data-text="此属性用于告诉填写者应该在该字段中输入什么样的内容。通常是一两个简短的词语，也可以是一个问题。" ></i></label>'+
		        		'<input type="text" id="label" data-rv-input="model.' +
		        			((__t = ( FormOptions.t.mappings.LABEL )) == null ? '' : __t) + '"/>'+
		        	'</div>\n';    
        
        if( !Formbuilder.isTemplate){
		__p += '<div class="form-group">'+
				'<label >对象名称<i class="fa fa-help" data-tip data-title="关于对象名称" data-text="此属性用于绑定业务对象属性,用于提交数据绑定对象名称。" ></i></label>'+
				'<div style="position: relative;"><input type="hidden" id="name" data-rv-value="model.'+
				((__t = ( FormOptions.t.mappings.NAME )) == null ? '' : __t) +
				'"  />'+
				'<input type="text" class="form-control dropdownTree" data-rv-value="model.'+
						((__t = ( FormOptions.t.mappings.SHOW_NAME )) == null ? '' : __t) +
				'"  readonly  data-toggle="dropdownTree" data-opt="isPk"    data-key="#name"   data-data="#boDefJson" data-bind_name="name"  data-field_type="' + __type+
				'" data-is_sub="' + ((__t = ( rf.get(FormOptions.t.mappings.IS_SUB) )) == null ? '' : __t) +'" data-sub_name="' +rf.get(FormOptions.t.mappings.SUB_NAME) +'"'+
				'"  />'+
				'</div></div>';
        }
        
		
    	if (typeof datefmt !== 'undefined'){ ;
    			__p += '<div class="form-group">'+
    		    			'<label for="field_datefmt">日期格式<i class="fa fa-help" data-tip data-title="关于日期格式"'+
    			'data-text="此属性用于指定该字段填写的日期格式，有默认格式，也可以自定义格式，格式参考：'+
    				 '</br> 格式代码     |     说明					|	返回值例子</br>'+
    				'   yyyy	四位数字的年份	如：2014 或 2000</br>'+
    				'	yy	    两位数字的年份	如：14 或 98</br>'+
    				'	MM	月份，有前导零			01到12</br>'+
    				'	M		月份，没有前导零			1到12</br>'+
    				'	dd	天数，有前导零	01到31</br>'+
    				'	d	    天数,没有前导零	1到31</br>'+
    				'	HH	小时,24小时制，有前导零	00到23</br>'+
    				'	H	    小时,24小时制，无前导零	0到23</br>'+
    				'	mm	分钟,有前导零	00到59</br>'+
    				'	m 	分钟,没有前导零	0到59</br>'+
    				'	ss	   秒,有前导零	01到59</br>'+
    				'	s	   秒,没有前导零	1到59"></i></label>'+
    			    			'<select class="js-datefmt-type" data-rv-value="model.' +
    		    				((__t = ( FormOptions.t.mappings.DATEFMT_TYPE )) == null ? '' : __t) + '" >';
    			
    		    		_.each(Formbuilder.lang.date_formats,function(g,i){
    		    			__p +='<option value="'+i+'">'+Formbuilder.lang.date_formats[i]+'</option>';
    		    		});		
    	    		
    	    __p +='</select>';
    	    __p +=	'<input type="text"   class="js-datefmt  mt-5 ';
			
						if(rf.get(FormOptions.t.mappings.DATEFMT_TYPE) != 'custom')
							__p += 'hidden';
						
						__p += '" placeholder="自定义日期格式"  data-rv-input="model.' +
	    				((__t = ( FormOptions.t.mappings.DATEFMT)) == null ? '' : __t) + '" />'+
						
		    		'</div>\n';
	
    	};
        
		if (typeof defval !== 'undefined'){ ;
				var bothHide = false;
		__p += '<div class="form-group">'+
					'<label>默认值<i class="fa fa-help" data-tip data-title="关于默认值" data-text="设置后，此值将作为默认值显示在该字段的初始化值。如果不需要设置默认值，请将此处留空。<br/>默认值类型支持固定值、动态脚本、数据联动、公式计算等。" ></i></label>'+
					'<select class="js-default-value-type" data-rv-value="model.' +
    				((__t = ( FormOptions.t.mappings.DEFAULT_VALUE_TYPE )) == null ? '' : __t) + '" >';
    				if(__type == 'datePicker'){
						__p +='<option value="today">填写当天</option>';
    				}
					_.each(FormOptions.t.DEFAULT_VALUE_TYPE,function(g,i){
							__p +='<option value="'+g+'">'+Formbuilder.lang.default_value_type[g]+'</option>';
					});
    	__p += '</select>';
    	
				if((_.isEmpty(rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE))  ||  (rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE) == 'fixed') && __type != 'selector'))
					 ishide= false;
				
				if((_.isEmpty(rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE))) || 
						((rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE) == 'today') && __type == 'datePicker')|| 
						((rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE) == 'fixed') && (__type == 'radio' || __type == 'checkbox'   || __type == 'select'  ||  __type == 'dictionary'   ||  __type == 'attachment' )))	
					bothHide = true;
				
				__p +='<textarea class="js-default-value mt-5" type="text" style="'+(bothHide?('display:none;'): (ishide?'display:none;':''))+'"    data-rv-input="model.' +
							((__t = ( FormOptions.t.mappings.DEFAULT_VALUE )) == null ? '' : __t) + '" ></textarea>';
			__p += '<a class="btn btn-sm btn-block btn-info js-default-value-btn mt-5"  style="'+ (bothHide?('display:none;'):(ishide?'':'display:none;') )+'" >'+
			 Formbuilder.lang.default_value_type[rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE)]+'</a>';
				
				__p += '</div>\n';
		};
	//单位
	if (typeof units !== 'undefined'){ ;
    __p +='<div class="form-group">'+
			'<label>单位<i class="fa fa-help" data-tip data-title="关于单位" data-text="此属性用于指定对该字段单位描述，比如货币：元，百分比：%等。" ></i></label>'+
			'<input type="text" id="label" data-rv-input="model.' +
				((__t = ( FormOptions.t.mappings.UNITS )) == null ? '' : __t) + '"/>'+
		'</div>\n';    
	};
	if (typeof showMode !== 'undefined'){ ;
    __p +='<div class="form-group">'+
		    '<label>显示模式<i class="fa fa-help" data-tip data-title="关于显示模式" data-text="此属性用于指定对该字段显示模式，只是在只读或列表时候显示影响。" ></i></label>'+
		    '<select data-rv-value="model.' +
				((__t = ( FormOptions.t.mappings.SHOW_MODE )) == null ? '' : __t) + '" >'+
				'<option value="normal">正常</option>'+
				'<option value="thousands">显示千分位分割</option>'+
		    '</select>'+
			'</div>\n';    
	};
	
	//提示文字
	if (typeof placeholder !== 'undefined'){ ;
		__p += 	'<div class="form-group">'+
				'<label for="field_placeholder">提示文字<i class="fa fa-help" data-tip data-title="关于提示文字" data-text="此属性用于指定对该字段进行文字提示，在文本内部进行提示，一般是“请输入”、”请选择”等，不超过200个字符。" ></i></label>'+
				'<input  type="text"  data-rv-input=\'model.' +
					((__t = ( FormOptions.t.mappings.PLACEHOLDER )) == null ? '' : __t) + '\' />'+
			'</div>\n';
			
	};
	//描述
	if (typeof desc !== 'undefined'){ ;
		__p += 	'<div class="form-group">'+
				'<label for="field_description">描述信息<i class="fa fa-help" data-tip data-title="关于字段描述信息" data-text="此属性用于指定对该字段进行一些附加说明，一般用来指导填写者输入。" ></i></label>'+
				'<textarea data-rv-input=\'model.' +
					((__t = ( FormOptions.t.mappings.DESC )) == null ? '' : __t) + '\' ></textarea>'+
			'</div>\n';
    		
	};
	//是否主键
	if (typeof pk !== 'undefined'){ 
 		__p +=  '<div class="form-group">'+
		'<div class="checkbox">'+
			'<label><input type="checkbox" data-rv-checked="model.'+
			((__t = ( FormOptions.t.mappings.IS_PK )) == null ? '' : __t) +
			'" />是否主键</label>'+
		'</div>'+
	'</div>';
			
	};
	

	__p += '</div>'+
'</div>';
	}
	return __p
};




/**
 * 编辑属性-流程
 */
this["Formbuilder"]["templates"]["edit/process"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__type=rf.get(FormOptions.t.mappings.FIELD_TYPE);
	__p +=  '<div class="setting-panel panel">'+
    		'<div class="panel-heading">'+  Formbuilder.lang.field_type[__type]+	'</div>\n';
    
    __p += '<div class="panel-body">'+
        			'<div class="panel-body-content">';
    __p +='<div class="form-group">'+
				'<label>标题</label>'+
					'<input type="text" id="label" data-rv-input="model.' +
						((__t = ( FormOptions.t.mappings.LABEL )) == null ? '' : __t) + '"/>'+
				'</div></div></div>\n';    
			

	}
	return __p
};

/**
 * 编辑属性-描述
 */
this["Formbuilder"]["templates"]["edit/desc"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__type=rf.get(FormOptions.t.mappings.FIELD_TYPE);
	__p +=  '<div class="setting-panel panel">'+
    		'<div class="panel-heading">'+  Formbuilder.lang.field_type[__type]+	'</div>\n';
    
    __p += '<div class="panel-body">'+
        	'<div class="panel-body-content">';
    __p +='<div class="form-group">'+
		'<label>标题</label>'+
		'<input type="text" id="label" data-rv-input="model.' +
			((__t = ( FormOptions.t.mappings.LABEL )) == null ? '' : __t) + '"/>'+
	'</div>\n';    
			
		__p += 	'<div class="form-group">'+
				'<label for="field_description">描述信息</label>'+
				'<textarea data-rv-input=\'model.' +
					((__t = ( FormOptions.t.mappings.DESC )) == null ? '' : __t) + '\' ></textarea>'+
			'</div>\n';
		
 		__p +=  '<div class="form-group">'+
			'<div class="checkbox">'+
				'<label><input type="checkbox" data-rv-checked="model.'+
				((__t = ( FormOptions.t.mappings.SPLIT_LINE )) == null ? '' : __t) +
				'" />显示分割线</label>'+
			'</div>'+
		'</div>';
 		
		__p += '<div class="form-group">'+
					'<label>分割线样式</label>'+
						'<select data-rv-value="model.' +
							((__t = ( FormOptions.t.mappings.LINE_STYLE )) == null ? '' : __t) + '" >'+
							'<option value="dashed">虚线</option>'+
							'<option value="solid">实线</option>';
	__p += '</select>'+	
		'</div>\n';
    		
		__p +='</div>'+
          '</div>'+
	  '</div>';

	}
	return __p
};

/**
 * 编辑-属性-文本（label）
 */
this["Formbuilder"]["templates"]["edit/non_input_field_label"] = function(obj){
	obj || (obj = {});
	var __t, __p = '', __e = _.escape,__type,ishide=true;
	with (obj) {
		__type=rf.get(FormOptions.t.mappings.FIELD_TYPE);
		__p +=  '<div class="setting-panel panel">'+
	    		'<div class="panel-heading">'+  Formbuilder.lang.field_type[__type]+	'</div>\n';
	    
	    __p += '<div class="panel-body">'+
	        	'<div class="panel-body-content">';
			    __p +='<div class="form-group">'+
					'<label>标题</label>'+
					'<input type="text" id="label" data-rv-input="model.' +
						((__t = ( FormOptions.t.mappings.LABEL )) == null ? '' : __t) + '"/>'+
				'</div>\n';    
		    
		var bothHide = false;
		__p += '<div class="form-group">'+
					'<label>默认值<i class="fa fa-help" data-tip data-title="关于默认值" data-text="设置后，此值将作为默认值显示在该字段的初始化值。如果不需要设置默认值，请将此处留空。<br/>默认值类型支持固定值、动态脚本、数据联动、公式计算等。" ></i></label>'+
					'<select class="js-default-value-type" data-rv-value="model.' +
    				((__t = ( FormOptions.t.mappings.DEFAULT_VALUE_TYPE )) == null ? '' : __t) + '" >';
					_.each(FormOptions.t.DEFAULT_VALUE_TYPE,function(g,i){
								if(g == 'linkage')
									return true;
							__p +='<option value="'+g+'">'+Formbuilder.lang.default_value_type[g]+'</option>';
					});
    	__p += '</select>';
    	
		if(_.isEmpty(rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE)) || (rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE) == 'fixed')  )
			 ishide= false;
		
		
		__p +='<textarea class="js-default-value mt-5" type="text" style="'+(ishide?'display:none;':'')+'"    data-rv-input="model.' +
					((__t = ( FormOptions.t.mappings.DEFAULT_VALUE )) == null ? '' : __t) + '" ></textarea>';
	__p += '<a class="btn btn-sm btn-block btn-info js-default-value-btn mt-5"  style="'+(ishide?'':'display:none;') +'" >'+
	 Formbuilder.lang.default_value_type[rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE)]+'</a>';
		
		__p += '</div>\n';    
		
		//提示文字
		if (typeof placeholder !== 'undefined'){ ;
			__p += 	'<div class="form-group">'+
					'<label for="field_placeholder">提示文字<i class="fa fa-help" data-tip data-title="关于提示文字" data-text="此属性用于指定对该字段进行文字提示，在文本内部进行提示，一般是“请输入”、”请选择”等，不超过200个字符。" ></i></label>'+
					'<input  type="text"  data-rv-input=\'model.' +
						((__t = ( FormOptions.t.mappings.PLACEHOLDER )) == null ? '' : __t) + '\' />'+
				'</div>\n';
				
		};
		//描述
		if (typeof desc !== 'undefined'){ ;
			__p += 	'<div class="form-group">'+
					'<label for="field_description">描述信息<i class="fa fa-help" data-tip data-title="关于字段描述信息" data-text="此属性用于指定对该字段进行一些附加说明，一般用来指导填写者输入。" ></i></label>'+
					'<textarea data-rv-input=\'model.' +
						((__t = ( FormOptions.t.mappings.DESC )) == null ? '' : __t) + '\' ></textarea>'+
				'</div>\n';
	    		
		};
		
		__p +='</div>'+
        '</div>'+
	  '</div>';   
	}
	return __p
};


/**
 * 编辑属性-tab
 */
this["Formbuilder"]["templates"]["edit/tab_break"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__type=rf.get(FormOptions.t.mappings.FIELD_TYPE);
	__p +=  '<div class="setting-panel panel">'+
    		'<div class="panel-heading">'+  Formbuilder.lang.field_type[__type]+	'</div>\n';
    
    __p += '<div class="panel-body">'+
        	'<div class="panel-body-content">';
		    __p +='<div class="form-group">'+
				'<label>标题</label>'+
				'<input type="text" id="label" data-rv-input="model.' +
					((__t = ( FormOptions.t.mappings.LABEL )) == null ? '' : __t) + '"/>'+
			'</div>\n';    
			
    		
		__p +='</div>'+
          '</div>'+
	  '</div>';

	}
	return __p
};

/**
 * 编辑属性-表单向导
 */
this["Formbuilder"]["templates"]["edit/page_break"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__type=rf.get(FormOptions.t.mappings.FIELD_TYPE);
	__p +=  '<div class="setting-panel panel">'+
    		'<div class="panel-heading">'+  Formbuilder.lang.field_type[__type]+	'</div>\n';
    
    __p += '<div class="panel-body">'+
        	'<div class="panel-body-content">';
		    __p +='<div class="form-group">'+
				'<label>标题</label>'+
				'<input type="text" id="label" data-rv-input="model.' +
					((__t = ( FormOptions.t.mappings.LABEL )) == null ? '' : __t) + '"/>'+
			'</div>\n';    
			__p += 	'<div class="form-group">'+
			'<label for="field_description">描述信息<i class="fa fa-help" data-tip data-title="关于字段描述信息" data-text="此属性用于指定对该字段进行一些附加说明，一般用来指导填写者输入。" ></i></label>'+
			'<textarea data-rv-input=\'model.' +
				((__t = ( FormOptions.t.mappings.DESC )) == null ? '' : __t) + '\' ></textarea>'+
		'</div>\n';
		__p +='</div>'+
          '</div>'+
	  '</div>';

	}
	return __p
};

/**
 * 编辑属性-翻页设置
 */
this["Formbuilder"]["templates"]["edit/page_setting"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__type=rf.get(FormOptions.t.mappings.FIELD_TYPE);
	__p +=  '<div class="setting-panel panel">'+
    		'<div class="panel-heading">翻页设置</div>\n';
    
    __p += '<div class="panel-body">'+
        	'<div class="panel-body-content">';
		    __p +='<div class="form-group">'+
				'<label>上一页按钮文字</label>'+
				'<input type="text"  data-rv-input="model.' +
					((__t = ( FormOptions.t.mappings.PREV_PAGE )) == null ? '' : __t) + '"/>'+
			'</div>\n';    
		    __p +='<div class="form-group">'+
			'<label>下一页按钮文字</label>'+
			'<input type="text" data-rv-input="model.' +
				((__t = ( FormOptions.t.mappings.NEXT_PAGE )) == null ? '' : __t) + '"/>'+
		'</div>\n';    
    		
		__p +='</div>'+
          '</div>'+
	  '</div>';

	}
	return __p
};



/**
 * 编辑属性-折叠卡
 */
this["Formbuilder"]["templates"]["edit/fold_card"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__type=rf.get(FormOptions.t.mappings.FIELD_TYPE);
	__p +=  '<div class="setting-panel panel">'+
    		'<div class="panel-heading">'+  Formbuilder.lang.field_type[__type]+	'</div>\n';
    
    __p += '<div class="panel-body">'+
        	'<div class="panel-body-content">';
    
		    __p +='<div class="form-group">'+
				'<label>标题</label>'+
				'<input type="text" id="label" data-rv-input="model.' +
					((__t = ( FormOptions.t.mappings.LABEL )) == null ? '' : __t) + '"/>'+
			'</div>\n';
		    
		    __p += '<div class="form-group">'+
				'<label >结束对象<i class="fa fa-help" data-tip data-title="关于结束字段" data-text="此属性用于绑定业务对象属性,用于包含字段进行折叠。" ></i></label>'+
				'<div style="position: relative;"><input type="hidden" id="name" data-rv-value="model.'+
				((__t = ( FormOptions.t.mappings.NAME )) == null ? '' : __t) +
				'"  />'+
				'<input type="text" class="form-control dropdownTree" data-rv-value="model.'+
						((__t = ( FormOptions.t.mappings.SHOW_NAME )) == null ? '' : __t) +
				'"  readonly  data-toggle="dropdownTree" data-key="#name" data-data="#boDefJson" data-bind_fold_card="name" data-field_type="' + __type+ '" />'+
			'</div>'+
			'</div>';
		    
		    __p +='<div class="form-group">'+
			    '<label>默认展开</label>'+
			    '<select data-rv-value="model.' +
					((__t = ( FormOptions.t.mappings.FOLD_CARD_OPEN )) == null ? '' : __t) + '" >'+
					'<option value="true">是</option>'+
					'<option value="false">否</option>'+
			    '</select>'+
		    '</div>\n';
    		
		__p +='</div>'+
          '</div>'+
          '</div>'+
	  '</div>';
	}
	return __p
};

/**
 * 地址设置
 */
this["Formbuilder"]["templates"]["edit/address"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join,_i,_len;
function print() { __p += __j.call(arguments, '') }
with (obj) {
	__p +=  '<div class="setting-panel panel">'+
					'<div class="panel-heading">地址设置</div>\n'+
					'<div class="panel-body collapse in"><div class="panel-body-content">';
	__p += '<div class="form-group">'+
					'<label>最大区域</label>'+
					'<select data-rv-value="model.' +
						((__t = ( FormOptions.t.mappings.TOP )) == null ? '' : __t) + '"  class="js-select-top">'+
						'<option value="country">国家</option>'+
						'<option value="province">省/自治区/直辖市</option>'+
						'<option value="city">市</option>'+
						'<option value="district">区/县</option>';
	__p += '</select>'+	
				'</div>\n';
	
	__p += '<div class="form-group">'+
			'<label>最小区域</label>'+
				'<select data-rv-value="model.' +
					((__t = ( FormOptions.t.mappings.LEVEL )) == null ? '' : __t) + '"  class="js-select-level" >'+
					'<option value="country">国家</option>'+
					'<option value="province">省/自治区/直辖市</option>'+
					'<option value="city">市</option>'+
					'<option value="district">区/县</option>';
		__p += '</select>'+	
		'</div>\n';

__p += '<div class="form-group">'+
				'<label>最大区域值&nbsp;&nbsp;<a  href="javascript:void(0)" data-name="'+FormOptions.t.mappings.TOPVAL +'" class="js-clean-city-top-val">清空</a></label>'+	
				'<div style="position: relative;">'+
					'<input class="form-control js-city-top-val" readonly type="text"  data-toggle="city-picker"  '+
					' data-name="' +
					((__t = ( FormOptions.t.mappings.TOPVAL )) == null ? '' : __t) + '">'+
				'</div>'+
			'</div>\n';

__p += '<div class="form-group">'+
		'<label>默认值&nbsp;&nbsp;<a  href="javascript:void(0)" data-name="'+FormOptions.t.mappings.DEFAULT_VALUE +'" class="js-clean-city-default-val">清空</a></label>'+	
		'<div style="position: relative;">'+
			'<input class="form-control  js-city-default-value" readonly type="text" data-toggle="city-picker" '+  ' data-name="' +
			((__t = ( FormOptions.t.mappings.DEFAULT_VALUE )) == null ? '' : __t) + '">'+
		'</div>'+
		'</div>\n';

	__p +=  '<div class="form-group">'+
		'<div class="checkbox">'+
			'<label><input type="checkbox"  data-rv-checked="model.'+
			((__t = ( FormOptions.t.mappings.IS_STREET )) == null ? '' : __t) +
			'" />	<input type="text" data-rv-input="model.' +
				((__t = ( FormOptions.t.mappings.STREET )) == null ? '' : __t) + '" placeholder="详细地址默认值" style="width: 260px;"  /></label>'+
		'</div>'+
	'</div>';
	__p += '</div>'+
	'</div> '+
 '</div> ';
}
return __p
};
/**
 * 附件设置
 */
this["Formbuilder"]["templates"]["edit/attachment"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join,_i,_len;
function print() { __p += __j.call(arguments, '') }
with (obj) {
	__p +=  '<div class="setting-panel panel">'+
					'<div class="panel-heading">附件设置</div>\n'+
					'<div class="panel-body collapse in"><div class="panel-body-content">';
	__p += '<div class="form-group">'+
					'<label>最大上传文件数量<i class="fa fa-help" data-tip data-title="关于最大上传文件数量" data-text="此属性用于限制填写者最大上传文件数量。" ></i></label>'+
					'<select data-rv-value="model.' +
						((__t = ( FormOptions.t.mappings.MAX_FILE_QUANTITY )) == null ? '' : __t) + '" >'+
						'<option value="-1">不限制</option>';
			          for (_i = 1, _len = 10; _i < _len; _i++) {;
			    __p += '<option value="'+_i+'">'+_i+'</option>';
			          };
	__p += '</select>'+	
				'</div>\n';

	__p += '<div class="form-group">'+
					'<label>单个文件大小(M)<i class="fa fa-help" data-tip data-title="关于单个文件大小" data-text="此属性用于限制填写者单个文件大小，单位为M。可根据需要收集的文件类型做选择，例如1张照片大约3MB，1首3分钟mp3音频大约5MB。" ></i></label>'+
					'<input type="text" data-rv-input="model.' +
					((__t = ( FormOptions.t.mappings.MAX_FILE_SIZE )) == null ? '' : __t) + '" />'+
				'</div>\n';


	__p += '<div class="form-group">'+
			'<label>文件上传类型<i class="fa fa-help" data-tip data-title="关于文件类型" data-text="此属性用于限制填写者文件上传类型.'+
			'<br/>文档类：txt、pdf、doc、docx、xls、xlsx、ppt、pptx、wps、htm、html、rtf、hlp。'+
			'<br/>图片类：jpg、jpeg、png、gif、bmp、psd、tif。'+
			'<br/>视频类：mkv、mp4、avi、swf、wmv、rmvb、mov、mpg。'+
			'<br/>音频类：mp3、flac、ape、wma、wav、aac、m4a、au、ram、mmf、aif。'+
			'<br/>压缩包：rar、zip、7z、gz、arj、z。'+
			'<br/>如以上格式限制不满足需求，建议选择[自定义]文件上传类型。<br/>[自定义]的文件扩展名，多个请用逗号隔开，如: txt, pdf, mp3等。'+
			'" ></i></label>'+
				'<select  class="js-media-type" data-rv-value="model.' +
				((__t = ( FormOptions.t.mappings.MEDIA_TYPE )) == null ? '' : __t) + '" >'+
				'<option value="">不限制</option>';
				_.each(FormOptions.t.FILE_TYPES,function(g,i){
					__p +='<option value="'+i+'">'+Formbuilder.lang.file_types[i]+'</option>';
				});
		        __p += '<option value="custom">自定义</option>'+
			'</select>';
			
			
		__p +='<textarea  type="text"  class="js-media mt-5 ';
			if(rf.get(FormOptions.t.mappings.MEDIA_TYPE) != 'custom')
				__p += 'hidden';
			
			__p += '"  data-rv-input="model.' +
			((__t = ( FormOptions.t.mappings.MEDIA)) == null ? '' : __t) + '" ></textarea>'+
			
		'</div>\n';
	__p += '</div>'+
	'</div> '+
 '</div> ';
}
return __p
};

/**
 * office设置
 */
this["Formbuilder"]["templates"]["edit/office"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,_i,_len;
	function print() { __p += __j.call(arguments, '')}
	with (obj) {
		__p +=  '<div class="setting-panel panel">'+
						'<div class="panel-heading">office设置</div>\n'+
						'<div class="panel-body collapse in"><div class="panel-body-content">';
	
		__p += '<div class="form-group">'+
				'<label>文件类型<i class="fa fa-help" data-tip data-title="关于文件类型" data-text="此属性用于限制填写者office文件类型.'+
				'<br/>文档类：doc、docx。'+
				'<br/>表格类：xls、xlsx。'+
				'<br/>文稿类：ppt、pptx。'+
				'" ></i></label>'+
					'<select  class="js-office-type" data-rv-value="model.' +
					((__t = (FormOptions.t.mappings.OFFICE_TYPE)) == null ? '' : __t) + '" >';
					_.each(FormOptions.t.OFFICE_TYPES,function(g,i){
						__p +='<option value="'+i+'">'+Formbuilder.lang.office_types[i]+'</option>';
					});
		__p += '</select>';
				
		__p += '</div>'+
			'</div> '+
			'</div> ';
	}
	return __p
};

/**
 * 选择器选项
 */
this["Formbuilder"]["templates"]["edit/selector"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
	__p +=  '<div class="setting-panel panel">'+
					'<div class="panel-heading">选择器选项</div>\n'+
						'<div class="panel-body collapse in"><div class="panel-body-content">';
	__p += '<div class="form-group">'+
	'<label >选择器类型<i class="fa fa-help" data-tip data-title="关于选择器类型" data-text="此属性用于选择器类型。目前支持用户、组织、岗位、角色选择器。" ></i></label>'+
		'<select data-rv-value="model.' +
			((__t = ( FormOptions.t.mappings.SELECTOR_TYPE )) == null ? '' : __t) + '" >';

			 _.each(Formbuilder.lang.selector_type, function(g,i){ ;
				__p +='<option value="'+i+'">'+g+'</option>';
			 });
	__p +='</select>'+'</div>\n';
	
	__p += '<div class="form-group">'+
			'<label>是否单选<i class="fa fa-help" data-tip data-title="关于是否单选" data-text="此属性用于选择器只能选择一个还是多个值。" ></i></label>'+
    			'<select data-rv-value="model.' +
				((__t = ( FormOptions.t.mappings.IS_SINGLE )) == null ? '' : __t) + '" >'+
				'<option value="true">是</option>'+
				'<option value="false">否</option>'+
			'</select>'+
		'</div>\n';
	
/*	__p += '<div class="form-group">'+
			'<label>可选范围<i class="fa fa-help" data-tip data-title="关于是否单选" data-text="此属性用于选择器只能选择一个还是多个值。" ></i></label>'+
				'<select data-rv-value="model.' +
				((__t = ( FormOptions.t.mappings.RANGE )) == null ? '' : __t) + '" >'+
				'<option value="all">所有</option>'+
				'<option value="ascribe">当前归属组的所有下级</option>'+
				'<option value="org">由组织决定</option>'+
			'</select>'+
		'</div>\n';*/
	
	__p += '<div class="form-group">'+
			'<label>存储格式<i class="fa fa-help" data-tip data-title="关于存储形式" data-text="此属性用于选择器存储数据格式.</br>JSON：数据存储json格式,如[{id:\'xxxx\',name:\'张三\'}]；</br>仅存ID：数据存储只存储id，但展示是name；</br>绑定ID：存储2个值，一个id和name。" ></i></label>'+
				'<select class="js-change-store" data-rv-value="model.' +
				((__t = ( FormOptions.t.mappings.STORE )) == null ? '' : __t) + '" >'+
				'<option value="json">JSON</option>'+
				'<option value="id">仅存ID</option>'+
				'<option value="bind">绑定ID</option>'+
			'</select>'+
		'</div>\n';
	
	__p += '<div class="form-group">'+
				'<label>绑定ID <i class="fa fa-help" data-tip data-title="关于绑定ID" data-text="只有设置存储为绑定ID，这个设置才有效，选择的字段必需在这个这字段之前，选择绑定ID，存储数据时候会存储2个值，一个id和name。" ></i><a  href="javascript:void(0)" class="js-clean-bind-id">清空</a></label>'+
				'<div style="position: relative;"><input type="hidden" id="bindId" data-rv-value="model.'+
				((__t = ( FormOptions.t.mappings.BIND_ID )) == null ? '' : __t) +
				'"  />'+
				'<input type="text" class="form-control dropdownTree" data-rv-value="model.'+
						((__t = ( FormOptions.t.mappings.BIND_NAME )) == null ? '' : __t) +
				'"  readonly  data-toggle="dropdownTree"    data-key="#bindId"   data-data="#boDefJson" data-isscroll="true"   data-field_type="selector"  data-bind_id="selector' + 
				'" data-is_sub="' + ((__t = ( rf.get(FormOptions.t.mappings.IS_SUB) )) == null ? '' : __t) +'" data-sub_name="' +rf.get(FormOptions.t.mappings.SUB_NAME) +'"'+
				'"  />'+
			'</div></div>\n';
	
	__p += '</div>'+
	'</div> '+
	
 '</div> ';
}
return __p
};



this["Formbuilder"]["templates"]["edit/linkdata_settings"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
		__p +=  '<div class="setting-panel panel">'+
		'<div class="panel-heading">参数设置</div>\n'+
			'<div class="panel-body collapse in"><div class="panel-body-content">';
		
		__p += '<div class="form-group">'+
				'<label>关联数据</label>'+
					'<select class="js-linkdata" data-rv-value="model.' +
							((__t = ( FormOptions.t.mappings.LINKDATA )) == null ? '' : __t) + '" >';
			__p +='</select>';
		__p +='</div>\n';	
		
		__p += '<div class="form-group">'+
			'<label>是否多选<i class="fa fa-help" data-tip data-title="关于是否多选" data-text="此属性用于只能选择一个还是多个值。" ></i></label>'+
				'<select class="js-linkdata-multiple" data-rv-value="model.' +
				((__t = ( FormOptions.t.mappings.MULTIPLE )) == null ? '' : __t) + '" >'+
				'<option value="N">否</option>'+
				'<option value="Y">是</option>'+
			'</select>'+
		'</div>\n';
			
		__p += '<div class="form-group"><label>设置关联配置<i class="fa fa-help" data-tip data-title="关于设置关联配置" data-text="需要配置唯一标识和展示值，唯一标识是该字段存储数据库的唯一标识（不一定是id或者主键，可以是编号等唯一标识），展示值是作为展示的字段" ></i></label>';
		__p += '<a class="btn btn-sm  btn-block  btn-info js-setting-link-config-btn mt-5"   >设置关联配置</a>';
		__p +='</div>\n';	
		
		__p += '<div class="form-group"><label>关联字段动态参数</label>';
		__p += '<a class="btn btn-sm  btn-block  btn-info js-setting-link-condition-btn mt-5"  >设置关联字段动态参数</a>';
		__p +='</div>\n';	
		
		__p += '<div class="form-group"><label>设置联动数据<i class="fa fa-help" data-tip data-title="关于联动数据" data-text="配置联动数据控件引用其他表单的某字段，该值改变且会跟随关联表单对应的字段值进行变化。改变的字段会存储当前的值，不会实时变化。注意返回的字段类型要匹配。" ></i></label>';
		__p += '<a class="btn btn-sm  btn-block  btn-info js-setting-link-linkage-btn mt-5"  >设置联动数据</a>';
		__p +='</div>\n';	

		
		__p += '<div class="form-group"><label>关联属性<i class="fa fa-help" data-tip data-title="关于关联属性" data-text="配置关联属性控件引用其他表单的某字段，且会跟随关联表单对应的字段值实时变化。设置字段的字段类型必须是【文本】" ></i></label>';
		__p += '<a class="btn btn-sm  btn-block  btn-info js-setting-link-attr-btn mt-5" >设置关联属性</a>';
		__p +='</div>\n';	


		__p += '</div>'+
		'</div> '+
	 '</div> ';
	}
	return __p
};
/**
 * 参数设置
 */
this["Formbuilder"]["templates"]["edit/field_settings"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
	__p +=  '<div class="setting-panel panel">'+
					'<div class="panel-heading">参数设置</div>\n'+
						'<div class="panel-body collapse in"><div class="panel-body-content">';

		if (typeof identity !== 'undefined'){ ;
			__p += '<div class="form-group">'+
					'<label>流水号</label>'+
					'<select class ="js-select-auto-number" data-rv-value="model.' +
						((__t = ( FormOptions.t.mappings.IDENTITY )) == null ? '' : __t) + '" >';
			__p +='</select>'+'</div>\n';
			
			__p += '<div class="form-group">'+
						'<label>初始化是否生成编号</label>'+
						'<select data-rv-value="model.' +
							((__t = ( FormOptions.t.mappings.INIT )) == null ? '' : __t) + '" >';
							__p +='<option value="true">是</option>';
							__p +='<option value="false">否</option>';
			__p +='</select>'+'</div>\n';
		}
		if (typeof dialog !== 'undefined'){ ;
		__p += '<div class="form-group">'+
					'<label>是否单选<i class="fa fa-help" data-tip data-title="关于是否单选" data-text="此属性用于对话框只能选择一个还是多个值。" ></i></label>'+
							'<select data-rv-value="model.' +
							((__t = ( FormOptions.t.mappings.IS_SINGLE )) == null ? '' : __t) + '" >'+
							'<option value="Y">单选</option>'+
							'<option value="N">多选</option>'+
						'</select>'+
					'</div>\n';
		
		__p += '<div class="form-group">';
		
		__p +=	'<label>对话框类型</label>'+
					'<select class="js-custom-dialog-type" data-rv-value="model.' +
						((__t = ( FormOptions.t.mappings.DIALOG_TYPE )) == null ? '' : __t) + '" >';
						__p +='<option value="dialog">自定义对话框（新）</option>';
						__p +='<option value="custom">自定义对话框</option>';
						__p +='<option value="url">URL对话框</option>';
		__p +='</select>';
		__p +='</div>\n';	
			
			if(rf.get(FormOptions.t.mappings.DIALOG_TYPE) && rf.get(FormOptions.t.mappings.DIALOG_TYPE) == 'url' ){
				__p += '<a class="btn btn-sm  btn-block  btn-info js-setting-custom-dialog-btn mt-5"   >设置自定义对话框</a>';
			}else{
				__p += '<div class="form-group">'+
							'<label>自定义对话框</label>'+
							'<select class="js-custom-dialog" data-rv-value="model.' +
									((__t = ( FormOptions.t.mappings.DIALOG )) == null ? '' : __t) + '" >';
				__p +='</select>';
			
				var text='<span class="js-custom-dialog-bind-text">'+((rf.get(FormOptions.t.mappings.BIND) && rf.get(FormOptions.t.mappings.BIND).length >0 )?'(已绑定)':('(未绑定)'))+'</span>';
				__p += '<a class="btn btn-sm  btn-block  btn-info js-bind-custom-dialog-btn mt-5"   >绑定字段'+text+'</a>';
				__p += '</div>\n';
			}

			
			__p += '<div class="form-group">'+
					'<label>存储格式<i class="fa fa-help" data-tip data-title="关于存储形式" data-text="此属性用于存储数据的格式.</br>JSON：数据存储json格式,如[{id_:\'xxxx\',name_:\'张三\'}]；</br>仅存唯一主键：数据存储只存储id，但展示是name；" ></i></label>'+
						'<select class="js-change-store" data-rv-value="model.' +
						((__t = ( FormOptions.t.mappings.STORE )) == null ? '' : __t) + '" >'+
						'<option value="json">JSON</option>'+
						'<option value="id">仅存ID</option>'+
					'</select>'+
				'</div>\n';
			
			
			__p += '<div class="form-group">'+
						'<label>图标</label>';
						
			__p +=  '<div style="position: relative;"><button data-selected="graduation-cap"  style="width:50px;height:28px;" type="button" class="icp icp-dd btn btn-default dropdown-toggle iconpicker-component" data-toggle="dropdown">'+
				            '<i class="	fa fa-search-plus fa-fw"   data-rv-class="model.' +
							((__t = ( FormOptions.t.mappings.ICON )) == null ? '' : __t) +'"></i>'+
				            '<span class="caret"></span>'+
				       '</button>'+
				       '<div class="dropdown-menu"></div>';
			__p +='</div></div>\n';	
		}

		if (typeof dictionary !== 'undefined'){ ;
			__p += '<div class="form-group">'+
					'<label>数据字典</label>'+
					'<div style="position: relative;"><input type="hidden" id="dicId" data-rv-value="model.'+
					((__t = ( FormOptions.t.mappings.DICTIONARY )) == null ? '' : __t) +
					'"  />'+
					'<input type="text" class="form-control dropdownTree" data-rv-value="model.'+
							((__t = ( FormOptions.t.mappings.DICTIONARY_NAME )) == null ? '' : __t) +
					'"  readonly  id="dicName" name="dicName" data-toggle="dropdownTree"  data-type="DIC_TYPE" data-bind_dic="true" data-typekey="#dicId"'  +
					'  /></div>'+'</div>\n';
/*			__p += '<div class="form-group">'+
			'<label>是否多选<i class="fa fa-help" data-tip data-title="关于是否多选" data-text="此属性用于只能选择一个还是多个值。" ></i></label>'+
				'<select data-rv-value="model.' +
				((__t = ( FormOptions.t.mappings.MULTIPLE )) == null ? '' : __t) + '" >'+
				'<option value="N">否</option>'+
				'<option value="Y">是</option>'+
			'</select>'+
		'</div>\n';*/
			
			__p += '<div class="form-group">'+
			'<label>默认值&nbsp;&nbsp;<a  href="javascript:void(0)" class="js-clean-default-val">清空</a></label>'+
			'<div style="position: relative;"><input type="hidden" id="dicDefaultId" data-rv-value="model.'+
			((__t = ( FormOptions.t.mappings.DEFAULT_VALUE )) == null ? '' : __t) +
			'"  />'+
			'<input type="text" class="form-control dropdownTree" data-rv-value="model.'+
					((__t = ( FormOptions.t.mappings.DEFAULT_VALUE_NAME )) == null ? '' : __t) +
			'"  readonly  id="dicDefaultName" name="dicDefaultName" data-toggle="dropdownTree"  data-dic="'+	(rf.get(FormOptions.t.mappings.DICTIONARY)?rf.get(FormOptions.t.mappings.DICTIONARY):'' )+'" data-bind_default_value="true" data-key="#dicDefaultId"'  +
			'  />'+'</div></div>\n';
			
			__p += '<div class="form-group">';
			__p +=	'<label>选值模式</label>'+
						'<select data-rv-value="model.' +
							((__t = ( FormOptions.t.mappings.SELECT_MODE )) == null ? '' : __t) + '" >';
							__p +='<option value="leaf">叶节点</option>';
							__p +='<option value="any">任意节点</option>';
			__p +='</select>';
			__p +='</div>\n';	
			
			__p += '<div class="form-group">';
			__p +=	'<label>显示模式</label>'+
						'<select data-rv-value="model.' +
							((__t = ( FormOptions.t.mappings.DISPLAY_MODE )) == null ? '' : __t) + '" >';
							__p +='<option value="path">路径</option>';
							__p +='<option value="name">节点名</option>';
			__p +='</select>';
			__p +='</div>\n';	
			
			__p +='<div class="form-group">'+
				'<label>分隔符</label>'+
				'<input type="text" data-rv-input="model.' +
					((__t = ( FormOptions.t.mappings.SPLIT )) == null ? '' : __t) + '"/>'+
				'</div>\n';
		}
		
	__p += '</div>'+
	'</div> '+
 '</div> ';
}
return __p
};


/**
 * 选项（单选、多选、下拉）
 */
this["Formbuilder"]["templates"]["edit/options"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function isIncludeOtherValue(rf){
	var  include_other_option =  _.find(rf.get(FormOptions.t.mappings.OPTIONS),function(opt){
		return opt.include_other_option?opt.include_other_option:false;
	});
	return include_other_option?true:false;
}

function print() { __p += __j.call(arguments, '') }
with (obj) {
	__p +=  '<div class="setting-panel panel">'+
				'<div class="panel-heading">选项</div>\n'+
					'<div class="panel-body collapse in"><div class="panel-body-content">';
/*
 * __p +='<div id="field_choices" class="datasource_choices">'+ '<label
 * class="radio-inline"><input type="radio" name="datasource" value="fixed"
 * data-rv-checked="model.field_options.datasource">固定选项</label>'+ '<label
 * class="radio-inline"><input type="radio" name="datasource" value="dynamic"
 * data-rv-checked="model.field_options.datasource">动态选项 </label>'+ ' </div>'
 */
				
	if (typeof includeBlank !== 'undefined'){ ;
			__p +='<div><label class="actions-left">'+
				'<input type="checkbox" data-rv-checked="model.field_options.include_blank_option"> &nbsp;&nbsp;<span>包含空白（自定义选择）</span>'+
				'<br/>&nbsp;&nbsp;&nbsp;&nbsp;空白默认文案<input type="text" data-rv-input="model.field_options.include_blank_value"  style="width: 150px;"  />'+
				'</label></div>';
	};
	
	
	__p +='<div class="fixed_field_choices"  >'+
    	'<div class="choices">\n';
		__p +=	'<div class="option"  data-rv-each-option=\'model.' +
    			((__t = ( FormOptions.t.mappings.OPTIONS )) == null ? '' : __t) +'\'>\n'+
    			' <div class="actions-left"><input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked"  data-tip  data-text="设为默认"/></div>\n '+
    		'  <div class="input-wrap">'+
    			'<input type="text" data-rv-input="option:val" class=\'option-label-input\'  placeholder="选项key" />'+
    			'<input type="text" data-rv-input="option:label" class=\'option-label-input\' placeholder="展示值" />'+
    		'</div>\n  '+
    	  '<div class="actions">'+
		        '<i data-role="add_choice" class=" js-add-option fa fa-plus-circle" data-tip ></i>'+
		        '<i data-role="remove_choice" class="js-remove-option fa fa-minus-circle" ></i>'+
		        '<i data-role="sort_choice" class=" js-sort-option fa fa-bars ui-sortable-handle " ></i>'+
	      '</div>'+
    	'</div>'+
      	'</div>'+
    '<div class="more-actions">';
		__p += '<a data-role="add_option" class="js-add-option" tabindex="-1" href="javascript:void(0)">添加选项</a>';
		if (typeof includeOther !== 'undefined'){ ;
		__p += '<a data-role="add_choice" class="js-add-other-option" tabindex="-1" href="javascript:void(0)">添加其他</a>';
		};
		__p +='<a data-role="load_predefined_choices" class="js-predefined-choices" tabindex="-1" href="javascript:void(0)">选项模板</a>'+
          '<a data-role="batch_edit_choices"  class="js-batch-edit-choices" tabindex="-1" href="javascript:void(0)">批量编辑</a>'+
   ' </div>'+

  '</div>';
			
	if (typeof includeOther !== 'undefined'){ ;
	 	var isIncludeOther = isIncludeOtherValue(rf) ;
		__p += '<br/><div class="form-group '+(isIncludeOther?'':'hidden')+' "  id="optionOtherIdDiv">'+
		'<label >绑定其它选项字段&nbsp;&nbsp;<a  href="javascript:void(0)" class="js-clean-bind-other-id">清空</a></label>'+
		'<div style="position: relative;"><input type="hidden" id="optionOtherId" data-rv-value="model.'+
		((__t = ( FormOptions.t.mappings.OPTION_OTHER_ID )) == null ? '' : __t) +
		'"  />'+
		'<input type="text" class="form-control dropdownTree" data-rv-value="model.'+
				((__t = ( FormOptions.t.mappings.OPTION_OTHER_NAME )) == null ? '' : __t) +
		'"  readonly  data-toggle="dropdownTree" data-opt="isPk"    data-key="#optionOtherId"   data-data="#boDefJson" data-bind_other_name="name"  data-field_type="options"'+ 
		' data-is_sub="' + ((__t = ( rf.get(FormOptions.t.mappings.IS_SUB) )) == null ? '' : __t) +'" data-sub_name="' +((__t = ( rf.get(FormOptions.t.mappings.SUB_NAME) )) == null ? '' : __t) +'"'+
		'"  />'+
		'</div></div>';
	 };
		__p += '</div>'+
		'</div> '+
	 '</div> ';
}
return __p
};


/**
 * 校验 <br>
 * required 必填 min 最小值 max 最多值 minlength 最少x个字符 maxlength 最多x个字符 minmum 最少选项
 * maxmum 最多选项
 * 
 */
this["Formbuilder"]["templates"]["edit/field_validations"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +=  '<div class="setting-panel panel">'+
						'<div class="panel-heading">校验</div>\n';
		__p += '<div class="panel-body collapse in" id="field_validations"><div class="panel-body-content">';
     if (typeof required !== 'undefined'){ ;
 		__p +=  '<div class="form-group">'+
 						'<div class="checkbox">'+
 							'<label><input type="checkbox" multiple="true" data-rv-checked="model.'+
 							((__t = ( FormOptions.t.mappings.REQUIRED )) == null ? '' : __t) +
 							'" />必须填<i class="fa fa-help" data-tip data-title="关于必填校验" data-text="勾选后，该字段将将不允许为空，在字段名称后会有红色的星号标出。<br/>如果填写者在提交表单时必填字段没有输入，系统将会给出相关错误提示，表单将无法提交。该属性常用于需要强制填写者必须输入的字段。" ></i></label>'+
 						'</div>'+
 					'</div>';
     };
     if (typeof integer !== 'undefined'){ ;
		__p +=  '<div class="form-group">'+
						'<div class="checkbox">'+
							'<label><input type="checkbox" multiple="true" data-rv-checked="model.'+
							((__t = ( FormOptions.t.mappings.INTEGER )) == null ? '' : __t) +
							'" />只能输入整数<i class="fa fa-help" data-tip data-title="关于整数校验" data-text="勾选后，系统会限制填写者填写此字段为整数值。<br/>注意:这个小数位是冲突的，如果俩个都勾选，以小数位为准。" ></i></label>'+
						'</div>'+
					'</div>';
  };
     if (typeof decimal !== 'undefined'){ ;
		__p +=  '<div class="form-group">'+
						'<div class="checkbox">'+
							'<label><input type="checkbox" multiple="true" data-rv-checked="model.'+
							((__t = ( FormOptions.t.mappings.IS_DECIMAL )) == null ? '' : __t) +
							'" />小数&nbsp;&nbsp;</label>'+
							'<input type="number" data-rv-input="model.'+
							((__t = ( FormOptions.t.mappings.DECIMAL )) == null ? '' : __t) +
							'" style="width: 50px" />位<i class="fa fa-help" data-tip data-title="关于小数位" data-text="输入小数位，系统会限制填写者填写此字段的小数位数。eg：2位小数，则只能输入2位小数。" ></i>'+
						'</div>'+
					'</div>';
  };
     
     if (typeof min !== 'undefined'){ ;
		__p +=  '<div class="form-group">'+
						'<div class="checkbox">'+
							'<label><input type="checkbox"  data-rv-checked="model.'+
						((__t = ( FormOptions.t.mappings.IS_MIN )) == null ? '' : __t) +'" />最小值<i class="fa fa-help" data-tip data-title="关于最小值" data-text="系统会限制填写者填写此字段的最小值。" ></i></label>'+
							'<input type="number" data-rv-input="model.'+
							((__t = ( FormOptions.t.mappings.MIN )) == null ? '' : __t) +
							'" style="width: 50px" />'+
							'</div>'+
		 				'</div>';
	  };
	  if (typeof max !== 'undefined'){ ;
				__p +=  '<div class="form-group">'+
								'<div class="checkbox">'+
									'<label><input type="checkbox"  data-rv-checked="model.'+
									((__t = ( FormOptions.t.mappings.IS_MAX )) == null ? '' : __t) +'" />最大值<i class="fa fa-help" data-tip data-title="关于最大值" data-text="系统会限制填写者填写此字段的最大值。" ></i></label>'+
									'<input type="number" data-rv-input="model.'+
									((__t = ( FormOptions.t.mappings.MAX )) == null ? '' : __t) +
									'" style="width: 50px" />'+
								'</div>'+
				 			'</div>';
		 };
     
     if (typeof minlength !== 'undefined'){ ;
		__p +=  '<div class="form-group">'+
						'<div class="checkbox">'+
							'<label><input type="checkbox"  data-rv-checked="model.'+
							((__t = ( FormOptions.t.mappings.IS_MINLENGTH )) == null ? '' : __t) +'" />最少填<i class="fa fa-help" data-tip data-title="关于最少填写字符" data-text="系统会限制填写者填写此字段的最少字符。" ></i></label>'+
							'<input type="number" data-rv-input="model.'+
							((__t = ( FormOptions.t.mappings.MINLENGTH )) == null ? '' : __t) +
							'" style="width: 50px" />个字符'+
							'</div>'+
		 				'</div>';
     };
     if (typeof maxlength !== 'undefined'){ ;
			__p +=  '<div class="form-group">'+
							'<div class="checkbox">'+
								'<label><input type="checkbox"  data-rv-checked="model.'+
								((__t = ( FormOptions.t.mappings.IS_MAXLENGTH )) == null ? '' : __t) +'" />最多填<i class="fa fa-help" data-tip data-title="关于最多填写字符" data-text="系统会限制填写者填写此字段的最多字符。" ></i></label>'+
								'<input type="number" data-rv-input="model.'+
								((__t = ( FormOptions.t.mappings.MAXLENGTH )) == null ? '' : __t) +
								'" style="width: 50px" />个字符'+
							'</div>'+
			 			'</div>';
	 };
	 
     if (typeof minmum !== 'undefined'){ ;
			__p +=  '<div class="form-group">'+
							'<div class="checkbox">'+
								'<label><input type="checkbox"  data-rv-checked="model.'+
								((__t = ( FormOptions.t.mappings.MINMUM )) == null ? '' : __t) +'" />最少选<i class="fa fa-help" data-tip data-title="关于最少选项" data-text="系统会限制填写者勾选此字段的最少选择项。" ></i></label>'+
								'<input type="number" data-rv-input="model.'+
								((__t = ( FormOptions.t.mappings.MINMUM )) == null ? '' : __t) +
								'" style="width: 50px" />项'+
								'</div>'+
			 				'</div>';
	  };
	  if (typeof maxmum !== 'undefined'){ ;
		__p +=  '<div class="form-group">'+
					'<div class="checkbox">'+
						'<label><input type="checkbox"  data-rv-checked="model.'+
						((__t = ( FormOptions.t.mappings.IS_MAXMUM )) == null ? '' : __t) +'" />最多选<i class="fa fa-help" data-tip data-title="关于最少选项" data-text="系统会限制填写者勾选此字段的最多选择项。" ></i></label>'+
						'<input type="number" data-rv-input="model.'+
						((__t = ( FormOptions.t.mappings.MAXMUM )) == null ? '' : __t) +
						'" style="width: 50px" />项'+
						'</div>'+
					'</div>';
		 };
		// start_date
		  if (typeof startdate !== 'undefined'){ ;
		  	var ishide1 = $.isEmpty( rf.get( FormOptions.t.mappings.START_DATE_TYPE)) || rf.get( FormOptions.t.mappings.START_DATE_TYPE)=="specific" ||  rf.get( FormOptions.t.mappings.START_DATE_TYPE)=="today";
			__p +=  '<div class="form-group">'+
						'<div class="checkbox">'+
							'<label><input type="checkbox"  data-rv-checked="model.'+
							((__t = ( FormOptions.t.mappings.IS_START_DATE )) == null ? '' : __t) +'" />起始日期<i class="fa fa-help" data-tip data-title="关于起始日期"'+
						     'data-text="系统会限制填写者填写此字段的当天起始日期范围（包含该日期）。<br/>该功能不做有效性验证，请自行保证：特定日期，填写跟日期格式一致的日期；其他类型填写数字" ></i></label>'+
							'<select data-rv-value="model.'+
							((__t = ( FormOptions.t.mappings.START_DATE_TYPE )) == null ? '' : __t) +
							'" style="width: 100px;" class="js-change-date-type" data-name="start-date">'+
								'<option value=""></option>'+
								'<option value="specific">特定日期</option>'+
								'<option value="today">填写当天</option>'+
								'<option value="before">当天日期前</option>'+
								'<option value="after">当天日期后</option>'+
							'</select>'+
							'<input type="text"   class="js-start-date " data-rv-input="model.'+
							((__t = ( FormOptions.t.mappings.START_DATE )) == null ? '' : __t) +
							'" style="width: 80px" />'+
							'<select data-rv-value="model.'+
							((__t = ( FormOptions.t.mappings.START_DATE_INTERVAL )) == null ? '' : __t) +
							'" style="width: 50px;'+ (ishide1?'display:none;':'')+'" class="js-start-date-interval" >'+
								'<option value=""></option>'+
								'<option value="y">年</option>'+
								'<option value="m">月</option>'+
								'<option value="d">日</option>'+
								'<option value="h">时</option>'+
								'<option value="mi">分</option>'+
								'<option value="s">秒</option>'+
							'</select>'+
							'</div>'+
						'</div>';
			 }; 
		// end_date
			  if (typeof enddate !== 'undefined'){ ;
			  	var ishide1 = $.isEmpty( rf.get( FormOptions.t.mappings.END_DATE_TYPE)) || rf.get( FormOptions.t.mappings.END_DATE_TYPE)=="specific" ||  rf.get( FormOptions.t.mappings.END_DATE_TYPE)=="today";

				__p +=  '<div class="form-group">'+
							'<div class="checkbox">'+
								'<label><input type="checkbox"  data-rv-checked="model.'+
								((__t = ( FormOptions.t.mappings.IS_END_DATE )) == null ? '' : __t) +'" />结束日期<i class="fa fa-help" data-tip data-title="关于结束日期" data-text="系统会限制填写者填写此字段的截至日期范围（包含该日期）。<br/>该功能不做有效性验证，请自行保证：特定日期，填写跟日期格式一致的日期，其他类型填写数字" ></i></label>'+
								'<select data-rv-value="model.'+
								((__t = ( FormOptions.t.mappings.END_DATE_TYPE )) == null ? '' : __t) +
								'" style="width: 100px;" class="js-change-date-type"  data-name="end-date">'+
									'<option value=""></option>'+
									'<option value="specific">特定日期</option>'+
									'<option value="today">填写当天</option>'+
									'<option value="before">当天日期前</option>'+
									'<option value="after">当天日期后</option>'+
								'</select>'+
								'<input type="text" class="js-end-date" data-rv-input="model.'+
								((__t = ( FormOptions.t.mappings.END_DATE )) == null ? '' : __t) +
								'" style="width: 80px" />'+
								'<select data-rv-value="model.'+
								((__t = ( FormOptions.t.mappings.END_DATE_INTERVAL )) == null ? '' : __t) +
								'" style="width: 50px;'+ (ishide1?'display:none;':'')+'" class="js-end-date-interval" >'+
									'<option value=""></option>'+
									'<option value="y">年</option>'+
									'<option value="m">月</option>'+
									'<option value="d">日</option>'+
									'<option value="h">时</option>'+
									'<option value="mi">分</option>'+
									'<option value="s">秒</option>'+
								'</select>'+
								'</div>'+
							'</div>';
				 }; 
				 
				// 自定义 格式
					  if (typeof dataformat !== 'undefined'){ ;
						__p +=  '<div class="form-group">'+
						'<label>格&nbsp;&nbsp;式<i class="fa fa-help" data-tip data-title="关于格式" data-text="系统会限制填写者填写此字段的指定的格式，也可以自定义正则表达式。" ></i>：</label>'+
						'<select  class="js-data-format"  style="width:150px;" data-rv-value="model.' +
							((__t = ( FormOptions.t.mappings.DATA_FORMAT )) == null ? '' : __t) + '" >';
							__p +='<option value="">--请选择--</option>';
							
							_.each(FormOptions.t.DATA_FORMAT,function(g,i){
								__p +='<option value="'+i+'">'+Formbuilder.lang.data_format[i]+'</option>';
							});
					        __p += '<option value="custom">自定义</option>';
				__p +='</select>\n';
				var isHide = '';
				if(rf.get(FormOptions.t.mappings.DATA_FORMAT) != 'custom')
					isHide = 'hidden';
				__p += '<textarea placeholder="正则表达式"  class="js-data-format-value mt-5 '+isHide;
				__p += '"  data-rv-input="model.' +
						((__t = ( FormOptions.t.mappings.DATA_FORMAT_VALUE)) == null ? '' : __t) + '" ></textarea>';
				__p +='<input  type="text"  placeholder="提示消息"   class="js-data-format-value mt-5 '+isHide;
						__p += '"  data-rv-input="model.' +
								((__t = ( FormOptions.t.mappings.DATA_FORMAT_MSG)) == null ? '' : __t) + '" />'+
					'</div>';
				
						 }; 
	__p += '</div>'+
			'</div> '+
		 '</div> ';
	}
	return __p
};
/**
 * 权限 <br>
*
 * 
 */
this["Formbuilder"]["templates"]["edit/field_rights"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +=  '<div class="setting-panel panel">'+
						'<div class="panel-heading">字段权限</div>\n';
		__p += '<div class="panel-body collapse in" id="field_rights"><div class="panel-body-content">';
		     if (typeof hide !== 'undefined'){ ;
		 		__p +=  '<div class="form-group">'+
		 						'<div class="checkbox">'+
		 							'<label><input type="checkbox" data-rv-checked="model.'+
		 							((__t = ( FormOptions.t.mappings.HIDE_RIGHTS )) == null ? '' : __t) +
		 							'" />隐藏<i class="fa fa-help" data-tip data-title="关于隐藏" data-text="勾选后，该字段将隐藏，但如果动态赋值，可以对该字段进行赋值。" ></i></label>'+
		 						'</div>'+
		 					'</div>';
		     };
		     
		     if (typeof read !== 'undefined'){ ;
		 		__p +=  '<div class="form-group">'+
		 						'<div class="checkbox">'+
		 							'<label><input type="checkbox" data-rv-checked="model.'+
		 							((__t = ( FormOptions.t.mappings.READ_RIGHTS )) == null ? '' : __t) +
		 							'" />只读<i class="fa fa-help" data-tip data-title="关于只读" data-text="勾选后该字段将只读，如果不勾选则该字段默认是可写的。" ></i></label>'+
		 						'</div>'+
		 					'</div>';
		     };
		__p += '</div>'+
		'</div> '+
	 '</div> ';
	}
	return __p
};
/**
 * 子表字段设置
 */
this["Formbuilder"]["templates"]["edit/columns"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +=  '<div class="setting-panel panel">\n'+
						'<div class="panel-heading row">\n'+
						'<div class="pull-left" >子表字段</div>'+
						'<div class="pull-right">'+
							'<div class="dropdown"><a href="javascript:void(0)" class="btn btn-xsm btn-add dropdown-toggle  add-column"  data-toggle="dropdown"  ><i class="fa fa-add"></i>添加字段</a>'+
							'<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >';
								 _.each(Formbuilder.subTableFields, function(g,i){ ;
								 	if(i == 'hidden')
								 		__p +=  '<li role="separator" class="divider"></li>';
							 		__p += '<li><a href="javascript:void(0);"   class="js-add-column"  data-field_type="'+g.field_type+'">'+g.addButton+'</a></li>';
								 });

		__p +='</ul></div>'+	// pull-right
				'</div></div>\n'+
					'<div class="panel-body collapse in" >\n'+
						'<div class="panel-body-content">';
		__p +=	'<div class="columns">'+
						'<div class="column"  data-rv-each-column=\'model.' +
								((__t = ( FormOptions.t.mappings.COLUMNS )) == null ? '' : __t) +'\'>\n'+
							'  <div class="label-wrap" data-rv-text="column:label" ></div>\n  '+
							'<div class="actions">'+
							        '<i data-role="remove_choice" class="js-remove-column fa fa-minus-circle"></i>'+
							        '<i data-role="sort_choice" class=" js-sort-column  fa fa-bars ui-sortable-handle "></i>'+
							  '</div>'+
							  '</div>'+
						'</div>';
	     __p += ' </div>'+
  		' </div>'+
     ' </div>';
		
	}
	return __p
};

/**
 * 按钮
 */
this["Formbuilder"]["templates"]["edit/buttons"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		 	var mode = rf.get(FormOptions.t.mappings.MODE);
			__p +=  '<div class="setting-panel panel">\n'+
							'<div class="panel-heading row">\n'+
							'<div class="pull-left" >操作按钮</div>'+
							'<div class="pull-right">'+
								'<div class="dropdown"><a href="javascript:void(0)" class="btn btn-xsm btn-add dropdown-toggle  add-button"  data-toggle="dropdown"  ><i class="fa fa-add"></i>添加按钮</a>'+
								'<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >';
									 _.each(FormOptions.t.BUTTONS, function(g,i){ ;
									 		 if(mode != 'dialog' && i == 'edit' )
									 			 return false;
								 		__p += '<li><a href="javascript:void(0);"   class="js-add-button"  data-button_type="'+i+'">'+Formbuilder.lang.buttons[i]+'</a></li>';
									 });

			__p +='</ul></div>'+	
								'</div></div>\n'+
						'<div class="panel-body collapse in" >\n'+
							'<div class="panel-body-content">';
			__p +=	'<div class="buttons">'+
							'<div class="button"  data-rv-each-button=\'model.' +
								((__t = ( FormOptions.t.mappings.BUTTONS )) == null ? '' : __t) +'\'>\n'+
								  '<div class="label-wrap" data-rv-text="button:label" ></div>\n  '+
								  '<div class="actions">'+
							
								  		'<i data-role="setting_choice" class="js-setting-button fa fa-cog"></i>'+
							
								        '<i data-role="remove_choice" class="js-remove-button fa fa-minus-circle"></i>'+
								        '<i data-role="sort_choice" class=" js-sort-button  fa fa-bars ui-sortable-handle "></i>'+
								  '</div>'+
								  '</div>'+
							  '</div>';
			    
		     __p += ' </div>'+
	  		' </div>'+
	     ' </div>';
	}
	return __p
};

/**
 * 按钮
 */
this["Formbuilder"]["templates"]["edit/subAppLayouts"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
			__p +=  '<div class="setting-panel panel">\n'+
						'<div class="panel-heading row">\n'+
						'<div class="pull-left" >app子表布局</div>'+
						'<div class="pull-right">'+
						'<div><a href="javascript:void(0)" class="btn btn-xsm btn-add  add-button"  data-toggle=""  ><i class="fa fa-add"></i>预览</a>'+	
						'</div></div></div>\n'+
						'<div class="panel-body collapse in" >\n'+
							'<div class="panel-body-content">';
			__p +=	'<div class="buttons">'+
							'<div class="button"  data-rv-each-button=\'model.' +
								((__t = ( FormOptions.t.mappings.APP_LAYOUT )) == null ? '' : __t) +'\'>\n'+
								  '<div class="label-wrap" data-rv-text="button:label" ></div>\n  '+
								  '<div class="actions">'+
								        '<i data-role="remove_choice" class="fa fa-minus-circle js-appLayout-remove"></i>'+
								        '<i data-role="sort_choice" class="fa fa-add js-appLayout-select"></i>'+
								  '</div>'+
								  '</div>'+
							  '</div>';
			    
		     __p += ' </div>'+
	  		' </div>'+
	     ' </div>';
	}
	return __p
};

/**
 * 富文本工具类
 */
this["Formbuilder"]["templates"]["edit/toolbar_settings"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape	,toolbars ;
	with (obj) {
		__p +=  '<div class="setting-panel panel">\n'+
						'<div class="panel-heading">工具类选项</div>\n'+
					'<div class="panel-body collapse in" >\n'+
						'<div class="panel-body-content">';
		
		__p += '<div class="form-group"><a class="btn btn-sm  btn-block  btn-info js-toolbar-settings" >工具栏设置</a></div>';
			__p += '<table class="table table-bordered">\n';
		toolbars = rf.get( FormOptions.t.mappings.TOOLBARS);
			 _.each( toolbars, function(g,i){
			 	g = (g=='|'?'separate':g);
	
			 	if(i%5 == 0)__p +=' <tr>';
			 		__p +='  <td><i class="edui-icon '+g+'" title="'+UE.I18N['zh-cn'].labelMap[g]+'"></i></td>\n  ';
				
			 	if( i > 0 && (i+1)%5==0) __p +=' </tr>';
			 });
			 
		__p += '</table>' + '</div>' + '</div>';
		
	    __p += ' </div>'+ ' </div>'+ ' </div>';
	}
	return __p
};

/**
 * office控件菜单栏
 */
this["Formbuilder"]["templates"]["edit/menubar_settings"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, menubars;
	with (obj) {
		__p +=  '<div class="setting-panel panel">\n'+
						'<div class="panel-heading">菜单栏选项</div>\n'+
					'<div class="panel-body collapse in" >\n'+
						'<div class="panel-body-content">';
		
		__p += '<div class="form-group"><a class="btn btn-sm  btn-block  btn-info js-menubar-settings" >菜单栏设置</a></div>';
		
		/*
		 * __p += '<table class="table table-bordered">\n'; menubars =
		 * rf.get(FormOptions.t.mappings.MENUBARS); _.each(menubars,
		 * function(g,i){ if(i%3 == 0)__p +=' <tr>'; __p +=' <td>'+ g.text +'</td>\n ';
		 * 
		 * if( i > 0 && (i+1)%3==0) __p +=' </tr>'; }); __p += '</table>';
		 */
		
		__p += '</div>';
		__p += '</div>';
		
	     __p += ' </div>';
	     __p += ' </div>';
	     __p += ' </div>';
	}
	return __p
};

/**
 * 单位设置
 */
this["Formbuilder"]["templates"]["edit/units"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +=  '<div class="setting-panel panel">\n'+
						'<div class="panel-heading">单位设置</div>\n'+
					'<div class="panel-body collapse in" >\n'+
						'<div class="panel-body-content">';
		
		    __p +='<div class="form-group">'+
			'<label>单位值</label>'+
			'<input type="text" id="label" data-rv-input="model.' +
				((__t = ( FormOptions.t.mappings.UNITS )) == null ? '' : __t) + '"/>'+
		'</div>\n';    
			
/*
 * __p +='<div class="form-group">'+ '<label class="control-label">单位值位置：</label>'+ '<select
 * data-rv-value="model.'+ ((__t = ( FormOptions.t.mappings.UNITS_POSITION )) ==
 * null ? '' : __t) + '" style="width: 100px">'+ '<option value="right">在字段右边</option>'+ '<option
 * value="left">在字段左边</option>'+ '<option value="title">在标题中</option>'+ '</select>'+ '
 * </div>';
 */

		    __p += ' </div>'+
     		' </div>'+
        ' </div>';
		
	}
	return __p
};

/**
 * 布局设置 arrangement：排列方式 occupy 宽度占比
 */
this["Formbuilder"]["templates"]["edit/layout_settings"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +=  '<div class="setting-panel panel">\n'+
						'<div class="panel-heading">布局设置</div>\n'+
					'<div class="panel-body collapse in" >\n'+
						'<div class="panel-body-content">';
		// 排列方式
		if (typeof arrangement !== 'undefined'){ ;
			__p +='<div class="form-group">'+
							'<label class="control-label">排列方式<i class="fa fa-help" data-tip data-title="关于排列方式" data-text="你可以设置该字段的选项，是横向排序还是纵向排序。横向排序可以更节省表单空间，使排版更为紧凑；纵向排序更适合选项字数较多的场景。。" ></i>：</label>'+
							'<select data-rv-value="model.'+
							((__t = ( FormOptions.t.mappings.ARRANGEMENT )) == null ? '' : __t) +
							'" style="width: 100px">'+
								'<option value="horizontal">横向</option>'+
								'<option value="vertical">纵向</option>'+
							'</select>'+
						' </div>';
		  };
		  
	if (typeof mode !== 'undefined'){ ;
			__p +='<div class="form-group">'+
					 '<div>'+
						'<label>子表编辑模式：</label>'+
						'<select class="js-change-mode"  data-rv-value="model.'+
						((__t = ( FormOptions.t.mappings.MODE )) == null ? '' : __t) +
						'" style="width: 100px">'+
							' <option value="inner">表内编辑</option>'+
							'<option value="block">块模式</option>'+
							'<option value="dialog">弹窗模式</option>'+
						'</select>'+
					  '</div>'+
					'</div>';
			
/*			__p +='<div class="form-group">'+
			 '<div>'+
				'<label>关系类型：</label>'+
				'<select class="js-change-mode"  data-rv-value="model.'+
				((__t = ( FormOptions.t.mappings.RELATION )) == null ? '' : __t) +
				'" style="width: 100px">'+
					' <option value="one2one">一对一</option>'+
					'<option value="one2many">一对多</option>'+
				'</select>'+
			  '</div>'+
			'</div>';*/
		}
		  
		// 宽度占比
		if ((typeof occupy !== 'undefined' && !rf.get(FormOptions.t.mappings.IS_SUB) ) || (typeof occupy !== 'undefined' && rf.get(FormOptions.t.mappings.IS_SUB) && $.isNotEmpty(table) && table.get(FormOptions.t.mappings.MODE) != 'inner')){ ;
			__p +='<div class="form-group">'+
					 /*'<div class="checkbox">'+*/
						/*'<label><input type="checkbox"  data-rv-checked="model.is_grids_to_occupy">宽度占用整行的<i class="fa fa-help" data-tip data-title="关于占用整行的宽度" data-text="你可以定义该字段在填写页面占用的页面宽度为多少。" ></i>：</label>'+*/
					 '<div class="">'+
						'<label>宽度占用整行的<i class="fa fa-help" data-tip data-title="关于占用整行的宽度" data-text="你可以定义该字段在填写页面占用的页面宽度为多少。" ></i>：</label>'+
						'<select data-rv-value="model.'+
						((__t = ( FormOptions.t.mappings.GRIDS_TO_OCCUPY )) == null ? '' : __t) +
						'" style="width: 73px">'+
							'<option value=""></option>'+
							' <option value="1">1/4</option>'+
							'<option value="2">2/4</option>'+
							'<option value="3">3/4</option>'+
						'</select>'+
					  '</div>'+
					'</div>';
		}
		
		if (typeof height !== 'undefined'){ ;
			var _type=  rf.get(FormOptions.t.mappings.FIELD_TYPE);
			var defHeight  =150;
			if(_type == 'office')
				defHeight  = 500;
			__p +=  '<div class="form-group">'+
				'<label>高度<i class="fa fa-help" data-tip data-title="关于高度" data-text="系统会根据设置的高度,进行设置，默认高度是'+defHeight+'px。" ></i>：</label>'+
				'<input type="number" data-rv-input="model.'+
				((__t = ( FormOptions.t.mappings.HEIGHT )) == null ? '' : __t) +
				'" style="width: 150px" />'+
			'</div>';
		}
		
		if (typeof width !== 'undefined'  && rf.get(FormOptions.t.mappings.IS_SUB) && $.isNotEmpty(table) && table.get(FormOptions.t.mappings.MODE) == 'inner'){ ;
		__p +=  '<div class="form-group">'+
				'<label>宽度<i class="fa fa-help" data-tip data-title="关于宽度" data-text="系统会根据设置的宽度,进行设置，默认宽度是150px。" ></i>：</label>'+
				'<input type="number" data-rv-input="model.'+
				((__t = ( FormOptions.t.mappings.WIDTH )) == null ? '' : __t) +
				'" style="width: 80px" />'+
			'</div>';
		}

		
		if (typeof  align !== 'undefined'  && rf.get(FormOptions.t.mappings.IS_SUB) ){ ;
		__p +=  '<div class="form-group">'+
				'<label>对齐方式<i class="fa fa-help" data-tip data-title="关于对齐方式" data-text="系统会根据设置的对齐方式进行设置，默认对齐方式是居左，数字类型的居右。" ></i>：</label>'+
				'<select data-rv-value="model.'+
				((__t = ( FormOptions.t.mappings.ALIGN )) == null ? '' : __t) +
				'" style="width: 73px">'+
					' <option value="left">居左</option>'+
					'<option value="center">局中</option>'+
					'<option value="right">居右</option>'+
					'<option value="justify">两端对齐</option>'+
				'</select>'+
			'</div>';
		}
		
		if (typeof mobile !== 'undefined'){ ;
		__p +='<div class="form-group">'+
						'<div class="checkbox">'+
							'<label><input type="checkbox" data-rv-checkednull="model.'+
							((__t = ( FormOptions.t.mappings.MOBILE )) == null ? '' : __t) +
							'" />移动端显示 <i class="fa fa-help" data-tip data-title="关于移动端显示" data-text="勾选后，移动端显示" ></i></label>'+
						'</div>'+
					' </div>';
	  };
		
		
     __p += ' </div>'+
     		' </div>'+
        ' </div>';
		
	}
	return __p
};

/**
 * 其他设置 hide：字段隐藏
 */
this["Formbuilder"]["templates"]["edit/other_settings"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		if(! rf.get(FormOptions.t.mappings.IS_SUB) || (rf.get(FormOptions.t.mappings.IS_SUB)  && $.isNotEmpty(table) && table.get(FormOptions.t.mappings.MODE) != 'dialog')){
			return;
		}
		__p +=  '<div class="setting-panel panel">\n'+
						'<div class="panel-heading">其他设置</div>\n'+
					'<div class="panel-body collapse in" >\n'+
						'<div class="panel-body-content">';
		// 排列方式
		if (typeof hide !== 'undefined'  && rf.get(FormOptions.t.mappings.IS_SUB) && $.isNotEmpty(table) && table.get(FormOptions.t.mappings.MODE) == 'dialog'){ ;
 			__p +=  '<div class="form-group">'+
					'<div class="checkbox">'+
						'<label><input type="checkbox" data-rv-checked="model.'+
						((__t = ( FormOptions.t.mappings.HIDE )) == null ? '' : __t) +
						'" />字段隐藏</label>'+
					'</div>'+
				'</div>';
		  };

		
     __p += ' </div>'+
     		' </div>'+
        ' </div>';
		
	}
	return __p
	};


/**
 * 添加字段模版
 */
this["Formbuilder"]["templates"]["partials/add_field"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join, allKeys =_.allKeys(Formbuilder.groupFields);
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
		 _.each(_.sortBy(Formbuilder.groupFields, 'order'), function(g,i){ ;
		 	__p += '  <div class="panel"><div class="panel-heading grey-cararra">'+Formbuilder.lang.group[allKeys[i]]+'<i class="fa fa-help" data-tip data-title="关于'+Formbuilder.lang.group[allKeys[i]]+'" data-text="'+Formbuilder.lang.groupTip[allKeys[i]]+'" ></i>'+'</h4>\n </div> ';
			__p += ' 	<div class="panel-body">\n      ';
		 
			 _.each(_.sortBy(g, 'order'), function(f){ ;
				__p += '\n        <a data-field-type="' +
				((__t = ( f.field_type )) == null ? '' : __t) +
				'" class="btn  btn-field btn-narrow ' +
				((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
				'">\n          ' +
				((__t = ( f.addButton )) == null ? '' : __t) +
				'\n        </a>\n      ';
			 }); 
				__p += '\n    </div>\n  </div>\n';
		 });
		
	}
	return __p	;
};

/**
 * 编辑字段
 */
this["Formbuilder"]["templates"]["partials/edit_field"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__p += '<div class=\'fb-tab-pane\' id=\'editField\'>\n  <div class=\'fb-edit-field-wrapper\'></div>\n</div>\n';
	}
	return __p
};


// TODO=================================预览视图====================


/**
 * 所有控件基础
 */
this["Formbuilder"]["templates"]["view/base"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__p += '  <div class=\'icons\'>';
		if(rf.get( FormOptions.t.mappings.HIDE) ){;
			__p += ' <i class="fa fa-lock" data-role="hide_indicator" title="隐藏"></i>';
		};
		if(rf.get( FormOptions.t.mappings.FIELD_TYPE) == 'hidden'){;
			__p += ' <i class="fa  fa-eye-slash" data-role="hidden_indicator" title="隐藏域"></i>';
		};
		if(rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY)&& !_.isEmpty(rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY)) ){;
			__p += ' <i class="icon-grid-'+rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY) +'" title="占比"></i>';
		};
	__p += '</div>\n  ' ;
	// 字段 文本
	__p += ((__t = ( Formbuilder.templates['view/label']({rf: rf}) )) == null ? '' : __t) +	'\n\n  ';
	// 字段内容
	__p +='<div class="field-content">'+
			((__t = ( Formbuilder.fields[rf.get(FormOptions.t.mappings.FIELD_TYPE)].view({rf: rf}) )) == null ? '' : __t) +
			'</div>\n\n';
	// 提示
	__p += ((__t = ( Formbuilder.templates['view/description']({rf: rf}) )) == null ? '' : __t) +
			'\n  ';
	// 复制和删除
	__p +=	((__t = ( Formbuilder.templates['view/duplicate_remove']({rf: rf}) )) == null ? '' : __t) +
			'\n';
	
	}
	return __p
};

this["Formbuilder"]["templates"]["edit/base_header"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__p += '<div class=\'fb-field-label\'>\n  <span data-rv-text="model.' +
	((__t = ( FormOptions.t.mappings.LABEL )) == null ? '' : __t) +
	'"></span>\n  <code class=\'field-type\' data-rv-text=\'model.' +
	((__t = ( FormOptions.t.mappings.FIELD_TYPE )) == null ? '' : __t) +
	'\'></code>\n  <span class=\'fa fa-arrow-right pull-right\'></span>\n</div>';

	}
	return __p
	};

/**
 * 不需要输入的控件
 */
this["Formbuilder"]["templates"]["view/base_non_input"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +=((__t = ( Formbuilder.fields[rf.get(FormOptions.t.mappings.FIELD_TYPE)].view({rf: rf}) )) == null ? '' : __t) ;
		// 复制和删除
		__p +=	((__t = ( Formbuilder.templates['view/duplicate_remove']({rf: rf}) )) == null ? '' : __t) +
				'\n';
		
	}
	return __p
};

/**
 * 描述提示页面
 */
this["Formbuilder"]["templates"]["view/base_non_input_label"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		
		__p += '  <div class=\'icons\' style="top: 8px;">';
		if(rf.get( FormOptions.t.mappings.FIELD_TYPE) == 'tab_break'){;
			__p += ' <i class="fa fa-trello" data-role="tab_break" title="选项卡"></i>';
		};
		if(rf.get( FormOptions.t.mappings.FIELD_TYPE) == 'page_break'){;
			__p += ' <i class="fa fa-ellipsis-h" data-role="page_break" title="向导"></i>';
		};
		if(rf.get( FormOptions.t.mappings.HIDE) ){;
			__p += ' <i class="fa fa-lock" data-role="hide_indicator" title="隐藏"></i>';
		};
		if(rf.get( FormOptions.t.mappings.FIELD_TYPE) == 'hidden'){;
			__p += ' <i class="fa  fa-eye-slash" data-role="hidden_indicator" title="隐藏域"></i>';
		};
		if(rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY)&& !_.isEmpty(rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY)) ){;
			__p += ' <i class="icon-grid-'+rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY) +'" title="占比"></i>';
		};
		__p += '</div>\n  ' ;
		
		if (typeof lable !== 'undefined'){ ;
			__p += '<label class="field-label">\n  <span>' +
						((__t = ( Formbuilder.helpers.simple_format(rf.get(FormOptions.t.mappings.LABEL)) )) == null ? '' : __t) +
						' </span>\n  ';
			__p += '\n</label>\n';
		}
	
	}
	return __p
};


/**
 * 视图--分页
 */
this["Formbuilder"]["templates"]["view/page_break"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p += '<div class="pages-container">'+
				 		'<div class="pages-separator"></div>'+
				 			'<div class="current-page">'+
				 				'<div class="page-numbers">第<span class="page-number" ></span>页&nbsp;(共<span class="total-page-number"></span>页)</div>'+
				 		
				        	'</div>'+
				    		'<div class="field-label">'+((__t = ( Formbuilder.helpers.simple_format(rf.get(FormOptions.t.mappings.LABEL)) )) == null ? '' : __t) +'</div>'+
				    		// 描述
				    			((__t = ( Formbuilder.templates['view/description']({rf: rf}) )) == null ? '' : __t) +
				       '</div>';
	}
	return __p
};

/**
 * 描述字段--提示页面
 */
this["Formbuilder"]["templates"]["view/desc"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p += '\n<hr class="'+ ((__t = ( rf.get(FormOptions.t.mappings.SPLIT_LINE) )) == null ? 'hidden' : (__t?'':'hidden'))  + ((__t = ( rf.get(FormOptions.t.mappings.LINE_STYLE) )) == null ? ' ' : (__t=='solid'?' solid':' ')) +'">\n';
	__p += '<span class=\'help-block\'>\n  ' +
	((__t = ( Formbuilder.helpers.simple_format(rf.get(FormOptions.t.mappings.DESC)) )) == null ? '' : __t) +
	'\n</span>\n';
	
	}
	return __p
};

/**
 * 文本字段--提示页面
 */
this["Formbuilder"]["templates"]["view/non_input_field_label"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +='<div class="field-content"><span style=" color: rgb(191, 191, 191);">用于展示文本或者公式计算的值,且数据不会保存</span></div>\n\n';
		__p += '<span class=\'help-block\'>\n  ' +
				((__t = ( Formbuilder.helpers.simple_format(rf.get(FormOptions.t.mappings.DESC)) )) == null ? '' : __t) +
				'\n</span>\n';
	}
	return __p
};


/**
 * 描述提示页面
 */
this["Formbuilder"]["templates"]["view/description"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__p += '<span class=\'help-block\'>\n  ' +
	((__t = ( Formbuilder.helpers.simple_format(rf.get(FormOptions.t.mappings.DESC)) )) == null ? '' : __t) +
	'\n</span>\n';
	
	}
	return __p
};



/**
 * 复制和删除
 */
this["Formbuilder"]["templates"]["view/duplicate_remove"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		
	__p += '<div class=\'actions-wrapper\'>\n  <a class="js-duplicate '  +
	((__t = (Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
	'"  data-role="duplicate_field"   data-toggle="tooltip" data-placement="bottom" title="复制"><i class=\'fa fa-clone\'></i></a>\n  <a class="js-clear ' +
	((__t = (Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
	'" data-role="delete_field"  data-toggle="tooltip" data-placement="bottom"  title="删除"><i class=\'fa fa-delete\'></i></a>\n</div>';
	
	}
	return __p
};

/**
 * 预览界面- label
 */
this["Formbuilder"]["templates"]["view/label"] = function(obj) {
		obj || (obj = {});
		var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
		function print() { __p += __j.call(arguments, '') }
		with (obj) {
			
			// 如果子表
			if(rf.get(FormOptions.t.mappings.FIELD_TYPE) == "table"){
				__p += '<div class="table-head">\n '+
				
				'<div class="table-head-label">' +
				((__t = ( Formbuilder.helpers.simple_format(rf.get(FormOptions.t.mappings.LABEL)) )) == null ? '' : __t) ;
				
				 if (rf.get(FormOptions.t.mappings.REQUIRED)) { ;
				 	__p += '\n    <abbr class=\'required\'>*</abbr>\n  ';
				 } ;
				 __p +=' </div>\n  ';
	
				 // 子表按钮
				 if (rf.get(FormOptions.t.mappings.BUTTONS)) { ;
					__p +='<div class="table-tools"  >\n';
				 	_.each(rf.get(FormOptions.t.mappings.BUTTONS),function(b){
						__p += '<a class="btn '+b.style+' '+b.icon+' ">'+b.label+ '</a>';
				 	});
					__p +='</div>';
				 } ;
				__p += '\n</div>\n';
			}else{
				
				__p += '<label class="field-label">\n  <span>' +
				((__t = ( Formbuilder.helpers.simple_format(rf.get(FormOptions.t.mappings.LABEL)) )) == null ? '' : __t) +
				
				' </span>\n  ';
				
				if (rf.get(FormOptions.t.mappings.UNITS)) { ;
				 	__p += '\n  ('+rf.get(FormOptions.t.mappings.UNITS)+')\n  ';
				 } ;
				 if (rf.get(FormOptions.t.mappings.REQUIRED)) { ;
				 	__p += '\n    <abbr class=\'required\'>*</abbr>\n  ';
				 } ;
				__p += '\n</label>\n';
				
			}
		
		}
		return __p
};


this["Formbuilder"]["templates"]["view/editor"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,_i,_len,columns,column,width;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
		__p +=' <div  type="text/plain" class="editor" width="100%"    id="'+rf.cid+'"></div> ';
	}
	return __p
};
/**
 * 子表的展示数据
 */

this["Formbuilder"]["templates"]["view/table"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,_i,_len,columns,column,width;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
		var columns = rf.get( FormOptions.t.mappings.COLUMNS);
		__p  +='<div class="sub-table">';
		if(columns && columns.length >0 ){;
			width = 200*columns.length >=1000? 200*columns.length :1000;
		__p  +='<ul  class="column-list" style="width: '+width+'px;"  data-cid="'+rf.cid+'">';
				_.each(columns, function(g,i){ ;
				if(_.isEmpty(g) ||  g.length == 0)
					return true;
					 column = new Backbone.DeepModel(g);
					var isHide =  column.get(FormOptions.t.mappings.HIDE)?'<i class="fa   fa-low-vision green mt-top-5" data-role="hidden_indicator" title="字段隐藏" ></i>':'';
					var hidden = g[FormOptions.t.mappings.FIELD_TYPE] == 'hidden'?'<i class="fa   fa-eye-slash red mt-top-5" data-role="hidden_indicator" title="隐藏域" ></i>':'';
					__p +='<li  style="opacity: 1;"  class="column" >'+
							'<label class="label-name">'+hidden+isHide+'<span>'+g.label+(g["field_options"]["units"]?'('+g["field_options"]["units"]+')':'')  +'</span></label>'+
							'<div class="column-content">'+
							((__t = ( Formbuilder.fields[g[FormOptions.t.mappings.FIELD_TYPE]].view({rf: column}) )) == null ? '' : __t) +
	
								'</div>'+
					'</li>';
				});
		__p  +=' </ul>';
		}else{;
		 __p += '<div  class="no-column">' +
			'<span >您尚未创建任何字段。</span>'+
			'<br><span >请添加字段</span>'+
		'</div>';
		
		};
		__p  +=	' </div>';
	}
	return __p
};


// 表单头部页面
this["Formbuilder"]["templates"]["view/form-header"] = function(obj) {
	
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
		 if (	rf.get(FormOptions.t.propertys.NAME)) { ;
		 __p += '<div class="form-title">'+	rf.get(FormOptions.t.propertys.NAME) +'</div>';
		 } else {;
		 __p += '<div class="form-title">未命名表单</div>';
		 };
		 
		 if (	rf.get(FormOptions.t.propertys.DESC)) { ;
			__p += '<div class="form-description clearfix">'+	rf.get(FormOptions.t.propertys.DESC);
			__p +=	'</div>';
		 };
	}
	return __p
};

// 表单属性区域
this["Formbuilder"]["templates"]["edit/form-property"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join,id;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
		id = rf.get("id");
		
		__p +=  '<div class="setting-panel panel">\n'+
						'<div class="panel-heading">表单属性</div>\n'+
			'<div class="panel-body collapse in" >\n'+
				'<div class="panel-body-content">';
		__p += '<div class="form-group">'+
						'<label >表单标题<span class="required">*</span></label>'+
						'<input type="text" id="formName"   data-rv-input="model.'+
						((__t = ( FormOptions.t.propertys.NAME )) == null ? '' : __t) +
						'"  />'+
					'</div>';
		
		__p += '<div class="form-group">'+
						'<label >表单key<span class="required">*</span></label>'+
						'<input type="text"  id="formKey" data-rv-input="model.'+
						((__t = ( FormOptions.t.propertys.KEY )) == null ? '' : __t) +
						'"  '+($.isEmpty(id)?'':'disabled="disabled"')+' />'+
					'</div>';
		__p += '<div class="form-group">'+
				'<label >表单分类</label>'+
		
				'<div style="position: relative;">'+
				'<input type="hidden" id="typeId" data-rv-value="model.'+
				((__t = ( FormOptions.t.propertys.TYPE_ID )) == null ? '' : __t) +
				'"  />'+
				'<input type="text" class="form-control dropdownTree" data-rv-value="model.'+
						((__t = ( FormOptions.t.propertys.TYPE_NAME )) == null ? '' : __t) +
				'"  readonly  id="typeName" name="typeName" data-toggle="dropdownTree"  data-type="FORM_TYPE" data-id="#typeId"'  +
				'"  />'+
				'</div></div>';
		
		__p += '<div class="form-group"><label >表单描述</label>'+
						'<textarea    data-rv-input="model.'+
						((__t = ( FormOptions.t.propertys.DESC )) == null ? '' : __t) +
						'"></textarea>'+	
					'</div>';
		
	     __p += ' </div>'+
  				 ' </div>'+
  				' </div>';
		
	     // ==============表单提交校验=====
		__p += '<div class="setting-panel panel">\n'+
		   					'<div class="panel-heading">表单提交校验<i class="fa fa-help" data-tip data-title="关于表单提交校验" data-text="表单提交时候对一系列条件进行有效性校验。" ></i></div>\n'+
		   						'<div class="panel-body collapse in" >\n'+
		   							'<div class="panel-body-content">';
		__p +=	'<div class="verifys"><div class="verify"  data-rv-each-verify=\'model.' +
							((__t = ( FormOptions.t.propertys.VERIFYS )) == null ? '' : __t) +'\'>\n'+
								'  <div class="label-wrap" data-rv-text="verify:show" ></div>\n  '+
							  '<div class="actions">'+
							        '<i data-role="remove_choice" class="js-remove-verify fa fa-minus-circle"></i>'+
							        '<i data-role="edit_choice" class="js-form-verify js-edit-verify fa fa-edit"></i>'+
							  '</div>'+
					'</div>';
		__p += '<a class="btn btn-sm  btn-block  btn-info js-form-verify mt-5"  >添加校验条件</a>';
			
		__p += 			'</div>'+
						' </div>'+
					' </div>';
	     
	     // ==============表单提交校验=====
		__p += '<div class="setting-panel panel">\n'+
		   					'<div class="panel-heading">表单规则<i class="fa fa-help" data-tip data-title="关于表单规则" data-text="您可以为某个字段(文本框、单项选择、下拉框等)设定一些规则：在填写者填写或选择某选项后，触发显示（隐藏、必填、非必填、置空等）位于该字段之后的其他字段。" ></i></div>\n'+
		   						'<div class="panel-body collapse in" >\n'+
		   							'<div class="panel-body-content">';
		__p += '<a class="btn btn-sm  btn-block  btn-info js-form-rules mt-5"  >设置表单规则</a>';
			
		__p += 			'</div>'+
						' </div>'+
					' </div>';
		
	     
	     // ==============表单脚本=====
	   __p += '<div class="setting-panel panel">\n'+
	   					'<div class="panel-heading">表单脚本</div>\n'+
	   						'<div class="panel-body collapse in" >\n'+
	   							'<div class="panel-body-content">';
	  __p += '<a class="btn btn-sm  btn-block  btn-info js-form-script mt-5"  >设置表单脚本</a>';
	  
__p += 		'</div>'+
			' </div>'+
		' </div>';

// ==============提交设置=====
__p += '<div class="setting-panel panel">\n'+
   					'<div class="panel-heading">提交设置<i class="fa fa-help" data-tip data-title="关于按钮设置 data-text="" ></i></div>\n'+
   						'<div class="panel-body collapse in" >\n'+
   							'<div class="panel-body-content">';

				__p += '<div class="form-group">'+
							'<label>开启后端验证</label>'+
							'<select data-rv-value="model.' +
								((__t = ( FormOptions.t.propertys.VALIDATED  )) == null ? '' : __t) + '"  >'+
								'<option value="">开启</option>'+
								'<option value="N">不开启</option>'+
								'</select></div>';
				
				__p += '<div class="form-group">'+
				'<label>开启提交冲突提示</label>'+
				'<select data-rv-value="model.' +
					((__t = ( FormOptions.t.propertys.CONFLICT  )) == null ? '' : __t) + '"  >'+
					'<option value="">不开启</option>'+
					'<option value="Y">开启</option>'+
					'</select></div>';
	
__p += 			'</div>'+
				' </div>'+
			' </div>';

/*// ==============按钮设置=====
__p += '<div class="setting-panel panel">\n'+
   					'<div class="panel-heading">按钮设置<i class="fa fa-help" data-tip data-title="关于按钮设置 data-text="" ></i></div>\n'+
   						'<div class="panel-body collapse in" >\n'+
   							'<div class="panel-body-content">';

				__p += '<div class="form-group">'+
							'<label>按钮位置</label>'+
							'<select data-rv-value="model.' +
								((__t = ( FormOptions.t.propertys.TOOLBAR  )) == null ? '' : __t) + '"  >'+
								'<option value="">顶部</option>'+
								'<option value="bottom">底部</option>'+
								'</select></div>';
	
__p += 			'</div>'+
				' </div>'+
			' </div>';*/

//==============表单向导样式设置=====
__p += '<div class="setting-panel panel">\n'+
   					'<div class="panel-heading">分页设置<i class="fa fa-help" data-tip data-title="关于分页设置 data-text="" ></i></div>\n'+
   						'<div class="panel-body collapse in" >\n'+
   							'<div class="panel-body-content">';

				__p += '<div class="form-group">'+
							'<label>分页样式设置</label>'+
							'<select data-rv-value="model.' +
								((__t = ( FormOptions.t.propertys.PAGE_STYLE  )) == null ? '' : __t) + '"  >'+
								'<option value="">链式数字效果</option>'+
								'<option value="tab-number">标签页数字效果</option>'+
/*								'<option value="tab-icon">标签页图标效果</option>'+
								'<option value="chain-icon">链式图标效果</option>'+*/
								'<option value="none">无</option>'+
								'</select></div>';
/*				
				__p += '<div class="form-group">'+
				'<label>分页按钮位置</label>'+
				'<select data-rv-value="model.' +
					((__t = ( FormOptions.t.propertys.PAGE_BUTTON_POSITION )) == null ? '' : __t) + '"  >'+
					'<option value="">居左</option>'+
					'<option value="right">居右</option>'+
					'</select></div>';*/

	
__p += 			'</div>'+
				' </div>'+
			' </div>';
	   

__p += '<div class="setting-panel panel">\n'+
				'<div class="panel-heading">其他设置</div>\n'+
					'<div class="panel-body collapse in" >\n'+
						'<div class="panel-body-content">';

	__p +=  '<div class="form-group">'+
		'<div class="checkbox">'+
			'<label><input type="checkbox"  data-rv-checked="model.'+
			((__t = ( FormOptions.t.propertys.HIDE_NAME )) == null ? '' : __t) +
			'" /> 隐藏标题</label>'+
		'</div>'+
	'</div>';
	
		__p +=  '<div class="form-group">'+
			'<div class="checkbox">'+
				'<label><input type="checkbox" data-rv-checked="model.'+
				((__t = ( FormOptions.t.propertys.HIDE_DESC )) == null ? '' : __t) +
				'" />隐藏描述</label>'+
			'</div>'+
		'</div>';
		__p +=  '<div class="form-group">'+
		'<div class="checkbox">'+
			'<label><input type="checkbox" data-rv-checkednull="model.'+
			((__t = ( FormOptions.t.propertys.COLON )) == null ? '' : __t) +
			'" />文本字段间有冒号</label>'+
		'</div>'+
	'</div>';
		
		__p +=  '<div class="form-group">'+
		'<div class="checkbox">'+
			'<label>文本只读显示样式</label>'+
			'<select data-rv-value="model.'+((__t = ( FormOptions.t.propertys.READ_STYLE )) == null ? '' : __t) +
				'" style="width: 100px">'+
					'<option value="text">文本展示</option>'+
					'<option value="original">原样展示</option>'+
			'</select>'
		'</div>'+
	'</div>';
	
	__p += 		' </div> </div>'+
				' </div>'+
			' </div>';
	   
	__p += '<div class="setting-panel panel">\n'+
			'<div class="panel-heading">默认设置【不影响表单展示】</div>\n'+
				'<div class="panel-body collapse in" >\n'+
					'<div class="panel-body-content">';
	
	
	__p +='<div class="form-group">'+
				'<div class="checkbox">'+
					'<label><input type="checkbox" data-rv-checked="model.'+
					((__t = ( FormOptions.t.propertys.OUT_OF_NAME )) == null ? '' : __t) +
					'" />字段绑定不带出字段名<i class="fa fa-help" data-tip data-title="关于字段绑定不带出字段名" data-text="如果选择，绑定字段时候就不会联动修改表单字段的标题，否则不选择则会联动修改表单字段的标题。不影响表单展示。" ></i></label>'+
					'</div>'+
				'</div>';
	
	__p +='<div class="form-group">'+
					'<div class="checkbox">'+
						'<label>默认宽度占用整行的<i class="fa fa-help" data-tip data-title="关于默认宽度占用整行" data-text="如果选择默认宽度占用整行,新增的字段则会按照这个设置该字段宽度占用整行。" ></i>：</label>'+
						'<select data-rv-value="model.'+((__t = ( FormOptions.t.propertys.GRIDS_TO_OCCUPY )) == null ? '' : __t) +
							'" style="width: 73px">'+
								'<option value=""></option>'+
								'<option value="1">1/4</option>'+
								'<option value="2">2/4</option>'+
								'<option value="3">3/4</option>'+
						'</select>'+
				'</div>'+
				'</div>';
	
	__p += 		' </div>'+
				' </div>'+
			' </div>';
	
		
	     // ==============表单标题样式=====
	     
// __p += '<div class="setting-panel panel">\n'+
// '<div class="panel-heading">表单标题</div>\n'+
// '<div class="panel-body collapse in" >\n'+
// '<div class="panel-body-content">';
// __p += ' </div>'+
// ' </div>'+
// ' </div>';
	}
	return __p
};
