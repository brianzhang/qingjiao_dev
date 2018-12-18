(function(window){var $,_str;
	$ = jQuery;
	_str = _.str;

	(function() {
		  var FormDataTemplateButton;
		  window.FormDataTemplateButton = FormDataTemplateButton = Backbone.View.extend({
			  defaults: {
			      target: '[data-template-button]'
			    },
			    constructor: function(options) {
				      var p, _i, _len, _ref;
				      this.options = $.extend({}, this.defaults, options);
				      this.setElement($(this.options.target));
				      
				      this.$el.addClass('buttons');
				      //构建主页面
				   //   this.$el.html(JSBT['main'](this));
				      this.trigger('viewRendered', this);
				      
				      this.serverHeaders = {
				  	        'X-FR-Version': FormDataTemplateButton.VERSION,
				  	        'X-FR-URL': document.URL
				  	      };
				      //加载按钮
				      this.loadButtonServer((function(_this){
				    	   return function() {
						          //初始化按钮Model
						          _this.initResponseButtons();
						          //初始化按钮视图
						          _this.initVeiwButtons();
						          _this.trigger('ready');
						          return typeof (_base = _this.options).onReady === "function" ? _base.onReady() : void 0;
				    	   }
				      })(this));
			    },
			    /**
			     * 加载按钮server
			     */
			    loadButtonServer: function(cb) {
				      if ((this.options.buttons != null) ) { //&& (this.options.response.responses != null)
				        return cb();
				      }
			    },
			    loadParams: function() {
				      return {
				        v: 0,
				        response_id: this.options.response.id,
				        responder_language: this.options.responderLanguage
				      };
			    },
			    initResponseButtons:function(){
			    	 var model, rf, _i, _len, _ref, fieldType,position,isEdit,hasButton=false;
				      this.response_buttons = new Backbone.Collection;
				      _ref = this.options.buttons;
				      isEdit = this.options.isEdit;
				      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					       rf = _ref[_i];
							rf = _.extend(FormDataTemplateButton.DEFAULT_BUTTON[rf.button_type],rf);
							
							position = FormDataTemplateButton.DEFAULT_BUTTON[rf.button_type] ? FormDataTemplateButton.DEFAULT_BUTTON[rf.button_type].position: 'all';
							if (rf.position && position == 'all') { // 设置的位置
								position = rf.position;
							}
							hasButton=false;
							if (position == 'all' || ( position == 'edit' && isEdit )  || (position == 'detail' && !isEdit)){
								 hasButton = true;
							}
							if(!hasButton)
								continue;
					       model = new FormDataTemplateButton.Models["ResponseButton" + (_str.capitalize(rf[FormDataTemplateButton.key.button_type]))](rf,this.options);
					       this.response_buttons.add(model);
				
				      }
			    },
			    initVeiwButtons:function(){
			    	var view;
			        this.response_buttons.each((function(_this) {
				        return function(rf) {
				                view = new FormDataTemplateButton.Views["ResponseButton" + (_str.capitalize(rf[FormDataTemplateButton.key.button_type]))]({
						              model: rf
						            });
					            _this.$el.append(view.render().el);
				        };
				      })(this));
			        this.$el.parent().addClass("panel-toolbar hidden-print");
			    }
			    
		  });
		  
		  FormDataTemplateButton.DEFAULT_BUTTON =FormButtons.t.buttons;
		  FormDataTemplateButton.BUTTON_TYPES = ["close","save","print"];
		  FormDataTemplateButton.key ={
				  button_type :"button_type",
				  label:"label"
		  }
		  FormDataTemplateButton.Views = {};

		  FormDataTemplateButton.Models = {};
	}).call(this);
	
	

	(function() {
		FormDataTemplateButton.VERSION = '1.0.0';
	}).call(this);

	(function() {
	  var i, _i, _len, _ref;
	  FormDataTemplateButton.Models.ResponseButton = Backbone.DeepModel.extend({
		    initialize: function(_attrs, options) {
		    	this.options = options;
		    	this[FormDataTemplateButton.key.button_type] = _attrs[FormDataTemplateButton.key.button_type];
		    },
		    getLabel :function(){
		    	return this.get(FormDataTemplateButton.key.label) || FormDataTemplateButton.t.button_type[ this[FormDataTemplateButton.key.button_type]];
		    },
			getStyle : function() {
				return this.get("style") ? this.get("style") : 'btn-primary';
			},
			getIcon : function() {
				return this.get("icon") ? this.get("icon") : 'fa fa-bars';
			},
		    style:"btn-primary",
		    icon:"fa fa-check-square"
	  });
	  //关闭
	  FormDataTemplateButton.Models.ResponseButtonClose = FormDataTemplateButton.Models.ResponseButton.extend({
		   style:"btn-default",
		   icon:"fa fa-close"
	  });
	  //保存
	  FormDataTemplateButton.Models.ResponseButtonSave = FormDataTemplateButton.Models.ResponseButton.extend({
		   icon:"fa fa-save"
	  });
	  
	  //打印
	  FormDataTemplateButton.Models.ResponseButtonPrint = FormDataTemplateButton.Models.ResponseButton.extend({
		   icon:"fa fa-print"
	  });
	  
	  
	  _ref = _.without(FormDataTemplateButton.BUTTON_TYPES,"close","save","print");
	  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		  i = _ref[_i];
		FormDataTemplateButton.Models["ResponseButton" + (_str.capitalize(i))] = FormDataTemplateButton.Models.ResponseButton.extend({
		    button_type: i
		  });
	  }
	
	}).call(this);
	
	//TODO 字段渲染
	(function() {
		  var i, _i, _j, _len, _len1, _ref, _ref1;

		  FormDataTemplateButton.Views.ResponseButton = Backbone.View.extend({
			   events: {
				  	  'click .btn': '_onClick'
			   },
			   initialize: function(options) {
				      this.model = options.model;
				      this.button_type =   this.model.button_type;
			   },
			   tagName: 'span',
			   render: function() {
			      this.$el.html(JSBT['partials/response_button'](this));
			      return this;
			  },
			  _onClick:function(){
				  //前置事件
			       var beforSubmitResult = $.JForm._beforeSubmit(this.getForm(), this.button_type, this.getFormData());
	                if (typeof (beforSubmitResult) != "undefined" && !beforSubmitResult) {
	                    return;
	                }
				  
				  if(this.onClick){
					  var r = this.onClick();
					  if(r)
						  return this;
				  }
				  
			  },
			  //提交后的事件
			  _afterSubmit:function(){
			      $.JForm._afterSubmit(this.getForm(), this.button_type, this.getFormData());
			  },
			  getOptions:function(key){
				  return this.model.options[key];
			  },
			  getFormKey:function(){
				  return this.getOptions("formKey");
			  },
			  getForm:function(){
				  return this.getOptions("fr");
			  },
			  getFormData:function(){
				  if( this.getForm())
					  return this.getForm().getValue();
				  return null;
			  },
			  //表单字符串
			  getFormDataStr:function(){
				  if($.isEmpty(this.getFormData))
					  return null;
				 return JSON.stringify(this.getFormData());
			  },
			  getParentWin:function(){
				  return  this.getOptions("parentWin")||null;
			  },
			  getFormKey:function(){
				  return  this.getOptions("formKey");
			  },
			  getCode:function(){
				  return  this.getOptions("code");
			  },
			  getPk:function(){
				  return  this.getOptions("pk")||"";
			  },
			  getPrintId:function(){
				  return  this.getOptions("printId")||null;
			  }
		});
	  //关闭
	  FormDataTemplateButton.Views.ResponseButtonClose = FormDataTemplateButton.Views.ResponseButton.extend({
		   onClick:function(){
			   DialogUtil.closeDialog();
		   }
		   
	  });
	  //保存数据
	  FormDataTemplateButton.Views.ResponseButtonSave = FormDataTemplateButton.Views.ResponseButton.extend({
		   onClick:function(){
			   //验证表单是否正确
				if(this.getForm()  && !this.getForm().validate()){
					DialogUtil.toastr(this.getForm().getErrorMsg());
					return true;
				}
				var index=	DialogUtil.load("处理中...");
				
				// office提交
		        OfficePlugin.submit();
				
				var jsonData = {
						formKey:this.getFormKey(),
						pk:this.getPk(),
						code:this.getCode(),
						data:JSON.stringify(this.getFormData())
				};
		
				var _this = this;
				$.post(__ctx + "/platform/form/formDataTemplate/saveFormData.htm",jsonData,function(data){
					DialogUtil.close(index);
					if (data.result == 1) {
						DialogUtil.confirm(data.message + ',是否继续操作',function(rtn) {
								if(_this.getParentWin())
									_this.getParentWin().callback(true);
								_this._afterSubmit();
								if(rtn)
									window.location.reload(true);
								else
									DialogUtil.closeDialog();
								});
					} else {
						DialogUtil.error(data.message,data.cause);
					}
				},"json");
		   }
	  });
	  
	  //打印
	  FormDataTemplateButton.Views.ResponseButtonPrint = FormDataTemplateButton.Views.ResponseButton.extend({
		   onClick:function(){
			   var id = this.getPrintId();
			   if($.isEmpty(id)){
					  window.print();
			   }else{
					var url =  __ctx+"/platform/form/formPrintTemplate/print.htm";
				    DialogUtil.dialog({
				    	content:url,
				      	params:{
				    		formData:this.getFormDataStr(),
				    		id:id,
				    		pk:this.getPk()
				    	},
				    	area: ['100%', '100%'],
						maxmin:false,
						title:false
				    });
			   }
		   }
	  });
		  
	  _ref = _.without(FormDataTemplateButton.BUTTON_TYPES,"close","save","print");
	  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    i = _ref[_i];
	    FormDataTemplateButton.Views["ResponseButton" + (_str.capitalize(i))] = FormDataTemplateButton.Views.ResponseButton.extend({
	        button_type: i
	      });
	  }
		  
	}).call(this);
	
	BpmnButtonZH_CN = {
			"loading":"加载中",
				
			"button_type":{
				"close":"关闭",
				"save":"保存",
				"print":"打印"
			}
	};
	if (typeof FormDataTemplateButton !== 'undefined') FormDataTemplateButton.t = BpmnButtonZH_CN;
	
	
	
		  window.JSBT = {};
	}

		
	window.JSBT["partials/response_button"] = function(__obj) {
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
		      _print(_safe('<a class="btn '+this.model.getStyle()+' '+this.model.getIcon()+'" href="javascript:void(0)" >'+this.model.getLabel()+'</a> '));
		    
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







