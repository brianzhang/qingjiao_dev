/**
 * 数据模版构建工具
 * 
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-10-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {

	var BuilderView, EditTemplateView, DataTemplatebuilder, DataTemplatebuilderCollection, DataTemplatebuilderModel,TemplateHeaderView, TemplatePropertyView, ViewTemplateView,DialogPropertyView, _ref, _ref1, _ref2, _ref3, _ref4, __hasProp = {}.hasOwnProperty, __extends = function(
			child, parent) {
		for ( var key in parent) {
			if (__hasProp.call(parent, key))
				child[key] = parent[key];
		}
		function ctor() {
			this.constructor = child;
		}
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
		child.__super__ = parent.prototype;
		return child;
	};
	// ====================模版模型==================
	DataTemplatebuilderModel = (function(_super) {
		__extends(DataTemplatebuilderModel, _super);

		function DataTemplatebuilderModel() {
			_ref = DataTemplatebuilderModel.__super__.constructor.apply(this,
					arguments);
			return _ref;
		}

		DataTemplatebuilderModel.prototype.sync = function() {
		};

		DataTemplatebuilderModel.prototype.indexInDOM = function() {
			var $wrapper, _this = this;
			$wrapper = $(".tb-template-wrapper").filter((function(_, el) {
				return $(el).data('cid') === _this.cid;
			}));
			return $(".tb-template-wrapper").index($wrapper);
		};

		DataTemplatebuilderModel.prototype.is_input = function() {
			return DataTemplatebuilder.inputTemplates[this
					.get(DataTemplatebuilder.options.TEMPLATE_TYPE)] != null;
		};

		DataTemplatebuilderModel.prototype.is_valid = function() {
			return _.isEmpty(this.get(DataTemplatebuilder.options.TEMPLATE_TYPE));
		};

		return DataTemplatebuilderModel;

	})(Backbone.DeepModel);
	// ====================模版集合==================
	DataTemplatebuilderCollection = (function(_super) {
		__extends(DataTemplatebuilderCollection, _super);

		function DataTemplatebuilderCollection() {
			_ref1 = DataTemplatebuilderCollection.__super__.constructor.apply(this,
					arguments);
			return _ref1;
		}

		DataTemplatebuilderCollection.prototype.initialize = function() {
			return this.on('add', this.copyCidToModel);
		};

		DataTemplatebuilderCollection.prototype.model = DataTemplatebuilderModel;

		DataTemplatebuilderCollection.prototype.comparator = function(model) {
			return model.indexInDOM();
		};

		DataTemplatebuilderCollection.prototype.copyCidToModel = function(model) {
			return model.attributes.cid = model.cid;
		};

		return DataTemplatebuilderCollection;

	})(Backbone.Collection);
	// ====================表单header属性==================
	TemplateHeaderView = (function(_super) {
	    __extends(TemplateHeaderView, _super);
	    function TemplateHeaderView() {
	        _ref2 = TemplateHeaderView.__super__.constructor.apply(this, arguments);
	        return _ref2;
	      }
	    TemplateHeaderView.prototype.className = "template-header";
	    
	    TemplateHeaderView.prototype.events = {
	    	      'click': 'focusEditView'
	   };
	    
	    TemplateHeaderView.prototype.initialize = function(options) {
	        this.parentView = options.parentView;
	        this.listenTo(this.model, "change", this.render);
	        return  this;
	      };
	      
	    TemplateHeaderView.prototype.render = function() {
	    	var html = DataTemplatebuilder.templates["view/template-header"]({
	            rf: this.model
	          });
	          
	        this.$el.html(html);
	        return this;
	      };
	      
		TemplateHeaderView.prototype.focusEditView = function() {
			this.parentView.$responseTemplateHeader.addClass('editing');
			this.parentView.$responseTemplates.find(".tb-template-wrapper").removeClass('editing');
		   return  this.parentView.activeTab("template_property");
		};
	    return TemplateHeaderView;
  })(Backbone.View);
	
	
	// ====================模版属性视图==================
	TemplatePropertyView = (function(_super) {
		__extends(TemplatePropertyView, _super);

		function TemplatePropertyView() {
			_ref3 = TemplatePropertyView.__super__.constructor.apply(this,
					arguments);
			return _ref3;
		}

		TemplatePropertyView.prototype.className = "edit-template-property";

		TemplatePropertyView.prototype.events = {
			'blur [data-toggle="dropdownTree"]' : 'dropdownTree',// 设置分类
			'click .js-select-dataset' : 'selectDataset',// 选择数据集
			'click .js-remove-dataset' : 'removeDataset',// 删除数据集

			'change .js-change-type' : 'changeType',// 改变类型
			'change .js-change-showtype' : 'changeShowType',// 改变展示类型
			'change .js-change-composetype' : 'changeComposeType',// 改变组合类型
			
			'click .js-select-form' : 'selectForm',// 选择表单
			'click .js-remove-form' : 'removeForm',// 删除表单
			'click .js-rights-form' : 'rightsForm',// 表单权限

			'click .js-select-flow' : 'selectFlow',// 选择流程
			'click .js-remove-flow' : 'removeFlow',// 删除流程
				
			'click .js-select-print-template':'selectPrintTemplate',//选择打印模版
			'click .js-remove-print-template':'removePrintTemplate',//删除打印模版
			
			'click .js-template-script':'settingTemplateScript'//设置模版脚本
		};

		TemplatePropertyView.prototype.initialize = function(options) {
			this.parentView = options.parentView;
			this.model.bind('change', this.parentView.handleFormUpdate,
					this.parentView);
			return this;
		};

		TemplatePropertyView.prototype.render = function() {
			var html = DataTemplatebuilder.templates["property/base"]({
				rf : this.model
			});

			this.$el.html(html);
			rivets.bind(this.$el, {
				model : this.model
			});

			// CommonUtil.qtip(this.$el);
			return this;
		};
		
		
		TemplatePropertyView.prototype.changeType = function(e) {
			var $el = $(e.currentTarget), val = $el.val(),last = $el.data("last");
			var showType = 	this.model.get("showType");
			var composeType = 	this.model.get("composeType");
			if(val == 'valueSource'){
				$("#showtypeGroup").addClass("hidden");
				$("#composetypeGroup").addClass("hidden");
			}else{
				$("#showtypeGroup").removeClass("hidden");
				if(last == 'valueSource' ){
					$(".js-change-showtype").val("list");
					this.model.set("showType","list");
				}
		
			}
			 $el.data("last",val);
			//不同类型的变化
			this.changeTemplateType({
				type:	 last,
				showType:	 showType,
				composeType:	  composeType
			 });
		}
		
		TemplatePropertyView.prototype.changeShowType = function(e) {
			var $el = $(e.currentTarget), val = $el.val(),last = $el.data("last");
			var type = 	this.model.get("type");
			var composeType = 	this.model.get("composeType");
			if(val == 'compose'){
				$("#composetypeGroup").removeClass("hidden");
				var composetype = 	$(".js-change-composetype").val();
				if($.isEmpty(composetype)){
					$(".js-change-composetype").val("treeList");
					this.model.set("composeType","treeList");
				}
				//设置为空
				$("#datasetGroup").addClass("hidden");
				$("#uniqueGroup").addClass("hidden");
				
			}else{
				$("#composetypeGroup").addClass("hidden");
				$("#datasetGroup").removeClass("hidden");
				$("#uniqueGroup").removeClass("hidden");
			}
			 $el.data("last",val);
			this.changeTemplateType({
				type:	 type,
				showType:	 last,
				composeType:	  composeType
			 });
		}
		
		TemplatePropertyView.prototype.changeComposeType = function(e) {
			var $el = $(e.currentTarget), val = $el.val(),last = $el.data("last");
			 $el.data("last",val);
				var type = 	this.model.get("type");
				var showType = 	this.model.get("showType");
			this.changeTemplateType({
				type:	 type,
				showType:	 showType,
				composeType:	  last
			 });
		}
		
		
		/**
		 * 改变模版类型
		 */
		TemplatePropertyView.prototype.changeTemplateType = function(origData) {
			var type = $(".js-change-type").val(),
				showType = $(".js-change-showtype").val(),
				composeType = $(".js-change-composetype").val()||"treeList";

			
			var data = {
					type:type,
					showType: showType,
					composeType: composeType
			};
			
			
			//是否显示对话框设置
			this.parentView.initDialogPropertyView(type);
			
			if( $.isNotEmpty(origData.type)  &&   origData.type != type){//改变类型
				if(type  ==  'valueSource'){
					if(showType == 'compose'  ){//组合类型修改成 其它类型
						//删除一个模版
						if(	this.parentView.collection.models.length >=2)
							this.parentView.collection.models[1].destroy();
						 this.parentView.editView.changeTemplateType(type);
					}else{
						this.parentView.editView.changeTemplateType(type);
					}
				}else {
					if(  origData.showType != showType ){
						if(origData.showType == 'compose'   ){//组合类型修改成 其它类型
							//删除一个模版
							if(	this.parentView.collection.models.length  >=2)
								this.parentView.collection.models[1].destroy();
							 this.parentView.editView.changeTemplateType(showType);
						}else{
							if(showType == 'compose'   ){
									this.changeTemplateComposeType();
							}else{
								this.parentView.editView.changeTemplateType(showType);
							}
						}
					}
				}
				
			}else if(origData.showType != showType && $.isNotEmpty(origData.showType)){			//改变显示类型
				if(origData.showType == 'compose'  ){//组合类型 修改成 其它类型
					//删除一个模版
					if(	this.parentView.collection.models.length >=2)
						this.parentView.collection.models[1].destroy();
					 this.parentView.editView.changeTemplateType(showType);
				}else{
					//修改成组合
					if(showType == 'compose' ){
						this.changeTemplateComposeType();
					}else{
						this.parentView.editView.changeTemplateType(showType);
					}
				}
			}else if( $.isNotEmpty(origData.composeType) && origData.composeType != composeType ){
					var model0= 	this.parentView.collection.models[0];
					var model1= 	this.parentView.collection.models[1];
					var m0,m1;
					if(composeType ==  'treeList'){
						if(model0.get("template_type") == 'composeTree'){
							m0 =model0.attributes;
							m1 =model1.attributes;
						}else if(model0.get("template_type") == 'composeList'){
							m0 =model1.attributes;
							m1 =model0.attributes;
						}
					}else if(composeType ==  'listTree'){
						if(model0.get("template_type") == 'composeTree'){
							m0 =model1.attributes;
							m1 =model0.attributes;
						}else if(model0.get("template_type") == 'composeList'){
							m0 =model0.attributes;
							m1 =model1.attributes;
						}
					}
					
					this.parentView.collection.remove();
					this.parentView.collection.reset();
					var position = this.parentView.editView ? this.parentView.editView.model.indexInDOM() + 1: null;
					
					this.parentView.createTemplate(m0,{
						position :  position
					});
					position = this.parentView.editView ? this.parentView.editView.model.indexInDOM() + 1: null;
					this.parentView.createTemplate(m1,{
						position :  position
					});
				
				}
			
		};
		
		TemplatePropertyView.prototype.changeTemplateComposeType =  function(){
			this.parentView.editView.changeTemplateType("composeTree");
			var position = this.parentView.editView ? this.parentView.editView.model.indexInDOM() + 1: null;
			
			this.parentView.createTemplate("composeList",{
				position :  position
			});
			
		}
		
		// 选择分类树
		TemplatePropertyView.prototype.dropdownTree = function(e) {
			var $el = $(e.currentTarget), id = $el.data("id");
			this.model.set(DataTemplatebuilder.options.TYPE_NAME, $el.val());
			this.model.set(DataTemplatebuilder.options.TYPE_ID, $(id).val());
		};
		/**
		 * 选择数据集
		 */
		TemplatePropertyView.prototype.selectDataset = function(e) {
			var _this = this, model = this.model, t, form, d;

			var $el = $(e.currentTarget);
			new DatasetDialog({
				pkKey : 'key',
				params : {
					data : d
				},
				callback : function(data, index) {
					var key = null, name = null;
					if (data.length > 0) {
						key = data[0].key, name = data[0].name;
					}

					_this.model.set(DataTemplatebuilder.options.DATASET_KEY, key);
					_this.model.set(DataTemplatebuilder.options.DATASET_NAME, name);
					_this.forceRender();
					DialogUtil.close(index);
				}
			}).show();

		};

		/**
		 * 删除数据集
		 */
		TemplatePropertyView.prototype.removeDataset = function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.model.set(DataTemplatebuilder.options.DATASET_KEY, null);
			this.model.set(DataTemplatebuilder.options.DATASET_NAME, null);
			this.forceRender();
		};

		/**
		 * 设置模版脚本
		 * @param e
		 */
		TemplatePropertyView.prototype.settingTemplateScript = function(e){
			var _this =this,
	    	key =DataTemplatebuilder.options.attrs.SCRIPT;
		
		  DialogUtil.dialog({
	    		title:'模版脚本设置',
	    		area: ['90%', '90%'],
	    		params: {
	    			data:this.model.get(key)
	    		},
	    		callback:function(data){
	    		     _this.model.set(key,data);
	    		},
	    		content:__ctx+'/platform/data/dataTemplate/script.htm',
	    		btn:[{
	            	label: '确定',
	            	iconCls:'btn btn-primary fa fa-ok',
	                action: function(dialog,index) {
	              	  var   data= DialogUtil.getChildFrameWindow(index).dataTemplateScript.getData();
	              	  if(!data) return;
	        	     _this.model.set(key,data);
	              	  DialogUtil.close(index);
	                }
	            }, {
	            	label: '清空',
	            	iconCls:'btn btn-success fa fa-clean',
	                action: function(dialog,index) {
		           	     _this.model.set(key,null);
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
		}
		
		
		/**
		 * 选择表单
		 */
		TemplatePropertyView.prototype.selectForm = function(e) {
			var _this = this, model = this.model, t, form, d;

			var $el = $(e.currentTarget);
			new FormDefDialog({
				pkKey : 'key',
				params : {
					data : d
				},
				callback : function(data, index) {
					var formKey = null, formName = null;
					if (data.length > 0) {
						formKey = data[0].key, formName = data[0].name;
					}

					_this.model.set(DataTemplatebuilder.options.attrs.FORM_KEY, formKey);
					_this.model.set(DataTemplatebuilder.options.attrs.FORM_NAME, formName);
					_this.forceRender();
					DialogUtil.close(index);
				}
			}).show();
		};

		/**
		 * 删除表单
		 */
		TemplatePropertyView.prototype.removeForm = function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.model.set(DataTemplatebuilder.options.attrs.FORM_KEY, null);
			this.model.set(DataTemplatebuilder.options.attrs.FORM_NAME, null);
			this.forceRender();
		};
		
		  /**
	     * 表单权限
	     */
		TemplatePropertyView.prototype.rightsForm =function(e) { 
	    	e.preventDefault(); e.stopPropagation();
	    	var key = this.model.get("key");
	    	if($.isEmpty(key)){
	    		DialogUtil.alert("请设置key");
	    		return;
	    	}
	      	var id = this.model.get("id");
	    	if($.isEmpty(id)){
	    		DialogUtil.alert("请保存数据模版");
	    		return;
	    	}
	    	new FormRightsDialog({
				formKey:this.model.get(DataTemplatebuilder.options.attrs.FORM_KEY),
				rightsScope:'data',
				flowKey:key
			}).show();
	    };

		/**
		 * 选择流程
		 */
		TemplatePropertyView.prototype.selectFlow = function(e) {
			var _this = this, model = this.model, $el = $(e.currentTarget),
				key = DataTemplatebuilder.options.attrs.FLOW_KEY,
				name =DataTemplatebuilder.options.attrs.FLOW_NAME;
			
			new BpmDefinitionDialog({
				params : {
					data : {
						defKey : model.get(key),
						name : model.get(name)
					}
				},
				isSingle : true,
				callback : function(data, index) {
					if (data.length <= 0) {
						return;
					}
					_this.model.set(key, data[0].defKey);
					_this.model.set(name, data[0].name);
					_this.forceRender();
					_this.render();
					DialogUtil.close(index);
				}
			}).show();
		};

		/**
		 * 删除流程
		 */
		TemplatePropertyView.prototype.removeFlow = function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.model.set(DataTemplatebuilder.options.attrs.FLOW_KEY, null);
			this.model.set(DataTemplatebuilder.options.attrs.FLOW_NAME, null);
			this.forceRender();
		};
		
		/**
		 * 选择打印模版
		 */
		TemplatePropertyView.prototype.selectPrintTemplate = function(e) {
			var _this = this, model = this.model, $el = $(e.currentTarget);
			var formKey = model.get(DataTemplatebuilder.options.attrs.FORM_KEY);
			if($.isEmpty(formKey)){
				DialogUtil.msg("请选择表单");
				return;
			}
			
			
			new FormPrintTemplateDialog({
				isSingle:true,
				formKey:formKey,
				callback : function(data,index) {
					var id="",name="";
					if($.isNotEmpty(data)){
						var d =data[0];
						id= d.id;
						name =d.name;
					}
					_this.model.set(DataTemplatebuilder.options.attrs.PRINT_ID, id);
					_this.model.set(DataTemplatebuilder.options.attrs.PRINT_NAME, name);
					_this.forceRender();
					_this.render();
					
					DialogUtil.close(index);	
				}
			}).show();
		};

		/**
		 * 删除打印模版
		 */
		TemplatePropertyView.prototype.removePrintTemplate = function(e) {
			e.preventDefault();
			e.stopPropagation();

			this.model.set(DataTemplatebuilder.options.attrs.PRINT_ID, null);
			this.model.set(DataTemplatebuilder.options.attrs.PRINT_NAME, null);
			this.forceRender();
		};
		
		
		
		TemplatePropertyView.prototype.forceRender = function() {
			return this.model.trigger('change');
		};

		return TemplatePropertyView;
	})(Backbone.View);

	
	// ====================模版属性视图==================
	DialogPropertyView = (function(_super) {
		__extends(DialogPropertyView, _super);

		function DialogPropertyView() {
			_ref3 = DialogPropertyView.__super__.constructor.apply(this,
					arguments);
			return _ref3;
		}

		DialogPropertyView.prototype.className = "edit-dialog-property";

		DialogPropertyView.prototype.events = {
				// 功能按钮
				'click .js-add-function-button' : 'addColumn',
				'click .js-remove-function-button' : 'removeColumn',
				'click .js-setting-function-button' : 'settingColumn',

				//统一设置权限
				'click .js-setting-rights' : 'settingRights',
				//设置模版脚本
				'click .js-template-script':'settingTemplateScript'
		};

		DialogPropertyView.prototype.initialize = function(options) {
			this.parentView = options.parentView;
			this.model.bind('change', this.parentView.handleFormUpdate,
					this.parentView);
			return this;
		};

		DialogPropertyView.prototype.render = function() {
			var html = DataTemplatebuilder.templates["dialog/base"]({
				rf : this.model
			});

			this.$el.html(html);
			rivets.bind(this.$el, {
				model : this.model
			});
			
			this.initSortable(this, ".dialog-function-buttons", ".dialog-function-button",
					DataTemplatebuilder.options.DIALOG_BUTTONS);

			// CommonUtil.qtip(this.$el);
			return this;
		};
		
		
		
		/**
		 * 增加字段
		 */
		DialogPropertyView.prototype.addColumn = function(e) {
			var $el, i, newOption, options, item, key, name;
				$el = $(e.currentTarget);
			
			 if ($el.hasClass("js-add-function-button")) {// 功能按钮
				var buttonType = $el.data('button_type');
				type = $el.data('type');
				item = '.'+type+'-function-button';
				
				if(type == 'dialog'){
					key = DataTemplatebuilder.options.DIALOG_BUTTONS;
				}
				newOption = DataTemplatebuilder.helpers.defaultButtonAttrs(buttonType,type);

				options = this.model.get(key) || [];
				var isExist = _.find(options, function(n) {
					return n.button_type == buttonType;
				});
				if (isExist && buttonType !=  'custom') {
					DialogUtil.msg("该按钮已经添加!");
					return;
				}
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
			 this.forceRender();
		};

		/**
		 * 删除字段
		 * 
		 * @param e
		 * @returns
		 */
		DialogPropertyView.prototype.removeColumn = function(e) {
			e.preventDefault();	e.stopPropagation();
			var $el, index, options, key, clz;
			$el = $(e.currentTarget);
			 if ($el.hasClass("js-remove-function-button")) {// 功能按钮
				var type = $el.data('type');
				clz = ".js-remove-function-button[data-type='"+type+"']";
				if(type=='list' || type == 'tree'){
					key = DataTemplatebuilder.options.FUNCTION_BUTTONS;
				}else if(type == 'dialog'){
					key = DataTemplatebuilder.options.DIALOG_BUTTONS;
				}else if(type == 'edit'){
					key = DataTemplatebuilder.options.EDIT_BUTTONS;
				}
			}

			index = this.$el.find(clz).index($el);
			options = this.model.get(key);
			options.splice(index, 1);
			this.model.set(key, options);
			this.model.trigger("change:" + key);
			return this.forceRender();
		};

		DialogPropertyView.prototype.settingColumn = function(e) {
			var $el, i, options, option, clz, key,url, _this = this, title = '', field,operationType;
			$el = $(e.currentTarget);
			 if ($el.hasClass("js-setting-function-button")) {// 对话框按钮
				var type = $el.data('type');
				clz = ".js-setting-function-button[data-type='"+type+"']";
				 if(type == 'dialog'){
					title = "功能按钮";
					key = DataTemplatebuilder.options.DIALOG_BUTTONS;
					operationType = "dialog";
				}
				url = __ctx	+ '/platform/data/dataTemplate/button.htm';

			} 

			i = this.$el.find(clz).index($el.closest(clz));
			options = this.model.get(key) || [];
			option = options.slice(i, i + 1).shift();
			if (operationType ==  "dialog"){
				title += "【"+FormButtons.t.buttons[option.button_type].label+"】";
			}
			
			DialogUtil.dialog({
				title : title,
				area : [ '60%', '80%' ],
				params : {
					data : option,
					field : field,
					operationType:operationType
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
		 *  设置权限数据
		 */
		DialogPropertyView.prototype.settingRightsData = function(key, rights) {
			var options = this.model.get(key) || [];

			options = _.map(options, function(option) {
				option.rights = rights;
				return option;
			});
			
			this.model.set(key, options);
			this.model.trigger("change:" + key);
			this.forceRender();
			DialogUtil.msg("设置权限成功！");
		}

		/**
		 * 设置权限
		 */
		DialogPropertyView.prototype.settingRights = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var _this = this, key, $el = $(e.currentTarget), rightsType = $el
					.data("rights"), type = $el.data("type");
			
			 if (rightsType == "dialog_buttons") {// 功能
				title = "对话框-功能按钮";
				key = DataTemplatebuilder.options.DIALOG_BUTTONS;
			}

			if (type == 'none') {
				var rights = [ {
					type : "none"
				} ];
				this.settingRightsData(key, rights);
			} else if (type == 'all') {
				var rights = [ {
					type : "all"
				} ];
				this.settingRightsData(key, rights);
			} else {
				new RightsDefDialog({
					title : title,
					key : 'formRights',
					callback : function(rights) {
						_this.settingRightsData(key, rights);
					}
				}).show();
			}

		};

		DialogPropertyView.prototype.forceRender = function() {
			return this.model.trigger('change');
		};

		/**
		 * 初始化选项排序
		 * 
		 * @param e
		 * @param t
		 * @param item
		 * @returns {EditFieldView}
		 */
		DialogPropertyView.prototype.initSortable = function(e, t, item, key) {
			var _this = this, index;
			this.sortableChoices = e.$(t).sortable(
					{
						items : "> " + item,
						handle : "[data-role='sort_choice']",
						forcePlaceholderSize : true,
						scroll : true,
						placeholder : "sortable-placeholder",
						distance : 1,
						axis : "y",
						start : function(event, ui) {
							// 移动前的位置
							index = _this.$el.find(item).index(
									$(ui.item).closest(item));
						},
						update : function(ev, ui) {
							_this.updateSortingIndex(index, ui, item, key);
						}
					});
			return this;
		};

		DialogPropertyView.prototype.updateSortingIndex = function(index, ui,
				item, key) {
			// 移动后的位置
			var i = this.$el.find(item).index($(ui.item).closest(item)),
			// 值
			options = this.model.get(key) || [];

			var moveOption = options[index];
			// 删除 移动的位置
			options.splice(index, 1);
			// 插入 移动的位置
			options.splice(i, 0, moveOption);
			this.model.set(key, options);
			this.model.trigger("change:" + key);
			this.forceRender();
			this.render(); // 重新渲染
		};
		
		
		/**
		 * 设置对话框模版脚本
		 * @param e
		 */
		DialogPropertyView.prototype.settingTemplateScript = function(e){
			var _this =this,
	    	key =DataTemplatebuilder.options.attrs.SCRIPT;
		
		  DialogUtil.dialog({
	    		title:'对话框模版脚本设置',
	    		area: ['90%', '90%'],
	    		params: {
	    			data:this.model.get(key),
	    			type:'dialog'
	    		},
	    		content:__ctx+'/platform/data/dataTemplate/script.htm',
	     		callback:function(data){
	    		     _this.model.set(key,data);
	    		},
	    		btn:[{
	            	label: '确定',
	            	iconCls:'btn btn-primary fa fa-ok',
	                action: function(dialog,index) {
	              	  var   data= DialogUtil.getChildFrameWindow(index).dataTemplateScript.getData();
	              	  if(!data) return;
	        	     _this.model.set(key,data);
	              	  DialogUtil.close(index);
	                }
	            }, {
	            	label: '清空',
	            	iconCls:'btn btn-success fa fa-clean',
	                action: function(dialog,index) {
		           	     _this.model.set(key,null);
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
		}

		return DialogPropertyView;
	})(Backbone.View);
	

	// ====================TODO 查看字段【中间字段处理】==================
	ViewTemplateView = (function(_super) {
		__extends(ViewTemplateView, _super);

		function ViewTemplateView() {
			_ref2 = ViewTemplateView.__super__.constructor.apply(this,
					arguments);
			return _ref2;
		}

		ViewTemplateView.prototype.className = "tb-template-wrapper";

		ViewTemplateView.prototype.events = {
			'click' : 'focusEditView',
			'click .js-clear' : 'clear'
		};

		ViewTemplateView.prototype.initialize = function(options) {
			this.parentView = options.parentView;
			this.listenTo(this.model, "change", this.render);
			return this.listenTo(this.model, "destroy", this.remove);
		};

		ViewTemplateView.prototype.render = function() {
			this.$el.addClass('response-template-'
									+ this.model.get(DataTemplatebuilder.options.TEMPLATE_TYPE))
					.data('cid', this.model.cid).attr("cid", this.model.cid).html(
							DataTemplatebuilder.templates["view/base"]({
								rf : this.model
							}));
			return this;
		};
		
		// 选中
		ViewTemplateView.prototype.focusEditView = function() {
			return this.parentView.createAndShowEditView(this.model, true);
		};

		// 清空，删除
		ViewTemplateView.prototype.clear = function(e) {
			var cb, x, _this = this;
			e.preventDefault();
			e.stopPropagation();
			cb = function() {
				_this.parentView.handleFormUpdate();
				return _this.model.destroy();
			};
			x = DataTemplatebuilder.options.CLEAR_Template_CONFIRM;
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

		return ViewTemplateView;

	})(Backbone.View);
	// ====================TODO 编辑模版==================
	EditTemplateView = (function(_super) {
		__extends(EditTemplateView, _super);

		function EditTemplateView() {
			_ref3 = EditTemplateView.__super__.constructor.apply(this,
					arguments);
			return _ref3;
		}

		EditTemplateView.prototype.className = "edit-response-template";

		EditTemplateView.prototype.events = {
			'change .js-change-page':'changePage',//修改是否分页
			
			'click .js-select-template' :  'selectTemplate',// 选择模版
			'click .js-remove-template'  : 'removeTemplate',// 删除模版
			'click .js-template-setting'  : 'settingTemplate',// 设置模版
			
				
			'blur [data-toggle="dropdownTree"]': 'setDropdownName', // 点击字段名称
			// 查询字段
			'click .js-add-query-column' : 'addColumn',
			'click .js-remove-query-column' : 'removeColumn',
			'click .js-setting-query-column' : 'settingColumn',
			// 显示字段
			'click .js-add-display-column' : 'addColumn',
			'click .js-remove-display-column' : 'removeColumn',
			'click .js-setting-display-column' : 'settingColumn',
			
			// 返回字段
			'click .js-add-result-column' : 'addColumn',
			'click .js-remove-result-column' : 'removeColumn',
			'click .js-setting-result-column' : 'settingColumn',
		
			// 过滤条件
			'click .js-add-filter-condition' : 'addCondition',
			'click .js-remove-filter-condition' : 'removeColumn',
			'click .js-setting-filter-condition' : 'settingCondition',

			// 排序字段
			'click .js-add-sort-column' : 'addColumn',
			'click .js-remove-sort-column' : 'removeColumn',
			'click .js-setting-sort-column' : 'settingColumn',
			
			// 功能按钮
			'click .js-add-function-button' : 'addColumn',
			'click .js-remove-function-button' : 'removeColumn',
			'click .js-setting-function-button' : 'settingColumn',
			
			//设置数据标题
			'click .js-settring-datatitle' : 'settringDataTitle',
			//设置导出字段
			'click .js-export-column' : 'settingExportColumn',
			
			//统一快捷设置权限
			'click .js-setting-rights' : 'settingRights'

		};

		EditTemplateView.prototype.initialize = function(options) {
			this.parentView = options.parentView;
			return this.listenTo(this.model, "destroy", this.remove);
		};

		/**
		 * 渲染编辑字段
		 * 
		 * @returns {EditTemplateView}
		 */
		EditTemplateView.prototype.render = function() {
			if (this.model.is_valid())
				return this;

			this.$el.html(DataTemplatebuilder.templates["edit/base"]({
				rf : this.model
			}));
			rivets.bind(this.$el, {
				model : this.model
			});
			

			this._initSortableEvent();
			
			this._initRefField();
			
			return this;
		};
		
		/**
		 * 初始化排序字段
		 */
		EditTemplateView.prototype._initSortableEvent = function(){
			this.initSortable(this, ".query-columns", ".query-column",
					DataTemplatebuilder.options.QUERY_COLUMNS);
			this.initSortable(this, ".display-columns", ".display-column",
					DataTemplatebuilder.options.DISPLAY_COLUMNS);
			this.initSortable(this, ".filter-conditions", ".filter-condition",
					DataTemplatebuilder.options.FILTER_CONDITIONS);
			this.initSortable(this, ".sort-columns", ".sort-column",
					DataTemplatebuilder.options.SORT_COLUMNS);
			this.initSortable(this, ".result-columns", ".result-column",
					DataTemplatebuilder.options.RESULT_COLUMNS);
			
			this.initSortable(this, ".list-function-buttons", ".list-function-button",
					DataTemplatebuilder.options.FUNCTION_BUTTONS);
			this.initSortable(this, ".tree-function-buttons", ".tree-function-button",
					DataTemplatebuilder.options.FUNCTION_BUTTONS);
			this.initSortable(this, ".edit-function-buttons", ".edit-function-button",
					DataTemplatebuilder.options.EDIT_BUTTONS);
		};
		/**
		 * 初始化组合的关联字段
		 */
		EditTemplateView.prototype._initRefField = function(){
			var $el = this.$el.find(".js-select-ref-field");
			if($el.length <= 0)
				return;

			var _this = this,
				options = $el.data(),
				$val = '',
				url = __ctx +"/platform/data/dataset/getColumnList.htm",
				multiple = false,
				clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false),
				split = $.isEmpty(options.split)?',':options.split;
			

			var params = {
					placeholder:'请选择'
					,theme: "bootstrap"
					,language: "zh-CN"
					,multiple: multiple
					,allowClear: clear
					,separator: split
					,formatSelection : function (item) {
						return (item != undefined && item.results != undefined)?item.comment:"";}  /*选择结果中的显示*/
					,formatResult : function (item) {
						return (item != undefined && item.comment != undefined)?item.comment:"";}  /*搜索列表中的显示*/
					,escapeMarkup : function (markup) {return markup;}
					,createSearchChoice : function(term, data) {
						/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
				        return {id: term, text: term};
				    },
				    initSelection:function (element, callback) {
				    	   callback({
				    		   id:_this.model.get(DataTemplatebuilder.options.attrs.REF_FIELD),
				    		   comment:_this.model.get(DataTemplatebuilder.options.attrs.REF_FIELD_NAME),
				    	   });
				    },
				    templateSelection:function(item){
				    	if($.isEmpty(item.id))
				    		return "请选择";
				    	_this.model.set(DataTemplatebuilder.options.attrs.REF_FIELD,item.id);
				    	_this.model.set(DataTemplatebuilder.options.attrs.REF_FIELD_NAME,item.comment);
				    	return item.comment;
				    },
					templateResult: function (data) {
					    if (data == undefined || data.id == undefined || data.id === '') { 
					    	return '';
					    }
					    return data.comment;
					}
				};
			
				params.ajax = {
				    url: url,
				    dataType: 'json',
				    delay: 250,
				    data: function (_params) {
				    	var datasetKey = _this.model.get(DataTemplatebuilder.options.attrs.DATASET_KEY),
				    		templateKey = _this.model.get(DataTemplatebuilder.options.attrs.BIND_TEMPLATE_KEY);
				    		
				    	return {
				    		    queryName:_params.term,
				    			datasetKey:datasetKey||"",
				    			templateKey:templateKey||""
				    		};
				    }
					,processResults: function (results) {
						return {
				          results: results.data
				        };
				     },
				     cache: true
				};
			
			$el.select2(params);
			
		};
		
		/**
		 *修改是否分页
		 */
		EditTemplateView.prototype.changePage =  function(e){
			   var $el = $(e.currentTarget),val =$el.val();
			   if(val == 'Y'){
				   $("#pageSize").removeClass("hidden");
			   }else{
				   $("#pageSize").addClass("hidden");
			   }
		};
		
		  /**
		 * 设置下拉字典值
		 */
		EditTemplateView.prototype.setDropdownName = function(e){
		      var $el = $(e.currentTarget),_this = this,
		      	val =$el.val(),
		      	keyVal = $el.siblings($el.data("value_id")).val();
		      
		      
		      if($el.data("bind_display")){ // 字段类型 (字段绑定对象)
		    	  var display  =$el.data("bind_display");
		    	  if("id" == display){
				      this.model.set(DataTemplatebuilder.options.ID_NAME,keyVal); 
				      this.model.set(DataTemplatebuilder.options.ID_COMMENT,val);
		    	  }
		    	  else if("pid" == display){
				      this.model.set(DataTemplatebuilder.options.PID_NAME,keyVal); 
				      this.model.set(DataTemplatebuilder.options.PID_COMMENT,val);
		    	  }
		    	  else if("text" == display){
				      this.model.set(DataTemplatebuilder.options.TEXT_NAME,keyVal); 
				      this.model.set(DataTemplatebuilder.options.TEXT_COMMENT,val);
		    	  }
		      }
	    };

		/**
		 * 增加字段
		 */
		EditTemplateView.prototype.addColumn = function(e) {
			var $el, i, newOption, options, item, key, name;
			$el = $(e.currentTarget);
			
			if ($el.hasClass("js-add-query-column")) {// 查询字段
				item = '.query-column';
				key = DataTemplatebuilder.options.QUERY_COLUMNS;
				name = $el.data('name');
				newOption = DataTemplatebuilder.helpers.defaultQueryColumnAttrs(name);

				options = this.model.get(key) || [];
				var isExist = _.find(options, function(n) {
					return n.name == name;
				});
				if (isExist) {
					DialogUtil.msg("该字段已经添加!");
					return;
				}
			}	else if ($el.hasClass("js-add-display-column")) {// 显示字段
				item = '.display-column';
				key = DataTemplatebuilder.options.DISPLAY_COLUMNS;
				name = $el.data('name');
				newOption = DataTemplatebuilder.helpers.defaultColumnAttrs(name);

				options = this.model.get(key) || [];
				var isExist = _.find(options, function(n) {
					return n.name == name;
				});
				if (isExist) {
					DialogUtil.msg("该字段已经添加!");
					return;
				}
			} else if ($el.hasClass("js-add-result-column")) {// 返回结果字段
				item = '.result-column';
				key = DataTemplatebuilder.options.RESULT_COLUMNS;
				name = $el.data('name');
				newOption = DataTemplatebuilder.helpers.defaultColumnAttrs(name);

				options = this.model.get(key) || [];
				var isExist = _.find(options, function(n) {
					return n.name == name;
				});
				if (isExist) {
					DialogUtil.msg("该字段已经添加!");
					return;
				}
			} 
			else if ($el.hasClass("js-add-sort-column")) {// 排序字段
				item = '.sort-column';
				key = DataTemplatebuilder.options.SORT_COLUMNS;
				name = $el.data('name');
				newOption = DataTemplatebuilder.helpers.defaultSortColumnAttrs(name);

				options = this.model.get(key) || [];
				if (options.length >=2 ) {
					DialogUtil.msg("超过2个排序字段，请删减字段后再添加！");
					return;
				}
				
				var isExist = _.find(options, function(n) {
					return n.name == name;
				});
				if (isExist) {
					DialogUtil.msg("该字段已经添加!");
					return;
				}
			} 
			else if ($el.hasClass("js-add-function-button")) {// 功能按钮
				var buttonType = $el.data('button_type');
				
					type = $el.data('type');
					item = '.'+type+'-function-button';
				
				if(type=='list' || type == 'tree'){
					key = DataTemplatebuilder.options.FUNCTION_BUTTONS;
				}else if(type == 'contextmenu'){
					key = DataTemplatebuilder.options.CONTEXTMENU_BUTTONS;
				}else if(type == 'edit'){
					key = DataTemplatebuilder.options.EDIT_BUTTONS;
				}
				newOption = DataTemplatebuilder.helpers.defaultButtonAttrs(buttonType,type);

				options = this.model.get(key) || [];
				if(!newOption.canReAdd){
					var isExist = _.find(options, function(n) {
						return n.button_type == buttonType;
					});
					if (isExist && buttonType !=  'custom') {
						DialogUtil.msg("该按钮已经添加!");
						return;
					}
				}
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
			 this.forceRender();
		};

		/**
		 * 删除字段
		 * 
		 * @param e
		 * @returns
		 */
		EditTemplateView.prototype.removeColumn = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var $el, index, options, key, clz;
			$el = $(e.currentTarget);
			if ($el.hasClass("js-remove-query-column")) {//  查询字段
				clz = ".js-remove-query-column";
				key = DataTemplatebuilder.options.QUERY_COLUMNS;
			}else if ($el.hasClass("js-remove-display-column")) {// 显示字段
				clz = ".js-remove-display-column";
				key = DataTemplatebuilder.options.DISPLAY_COLUMNS;
			} else if ($el.hasClass("js-remove-result-column")) {// 返回字段
				clz = ".js-remove-result-column";
				key = DataTemplatebuilder.options.RESULT_COLUMNS;
			}else if ($el.hasClass("js-remove-filter-condition")) {// 过滤条件
				clz = ".js-remove-filter-condition";
				key = DataTemplatebuilder.options.FILTER_CONDITIONS;
			} else if ($el.hasClass("js-remove-sort-column")) {// 排序字段
				clz = ".js-remove-sort-column";
				key = DataTemplatebuilder.options.SORT_COLUMNS;
			} else if ($el.hasClass("js-remove-function-button")) {// 功能按钮
				var type = $el.data('type');
				clz = ".js-remove-function-button[data-type='"+type+"']";
				if(type=='list' || type == 'tree'){
					key = DataTemplatebuilder.options.FUNCTION_BUTTONS;
				}else if(type == 'contextmenu'){
					key = DataTemplatebuilder.options.CONTEXTMENU_BUTTONS;
				}else if(type == 'edit'){
					key = DataTemplatebuilder.options.EDIT_BUTTONS;
				}
			}

			index = this.$el.find(clz).index($el);
			options = this.model.get(key);
			options.splice(index, 1);
			this.model.set(key, options);
			this.model.trigger("change:" + key);
			return this.forceRender();
		};

		EditTemplateView.prototype.settingColumn = function(e) {
			var $el, i, options, option, clz, key,url, _this = this, title = '', field,operationType;
			$el = $(e.currentTarget);
			if ($el.hasClass("js-setting-query-column")) {// 查询字段
				title = "查询字段";
				clz = ".js-setting-query-column";
				key = DataTemplatebuilder.options.QUERY_COLUMNS;
				url = __ctx+ '/platform/data/dataTemplate/queryColumn.htm';
				operationType = "query";
			} else if ($el.hasClass("js-setting-display-column")) {// 显示字段
				title = "显示字段";
				clz = ".js-setting-display-column";
				key = DataTemplatebuilder.options.DISPLAY_COLUMNS;
				url = __ctx	+ '/platform/data/dataTemplate/displayColumn.htm';
				operationType = "display";
			} else if ($el.hasClass("js-setting-result-column")) {// 返回字段
				title = "返回字段";
				clz = ".js-setting-result-column";
				key = DataTemplatebuilder.options.RESULT_COLUMNS;
				url = __ctx	+ '/platform/data/dataTemplate/resultColumn.htm';
				operationType = "result";
			} else if ($el.hasClass("js-setting-filter-condition")) {// 过滤条件
				clz = ".js-setting-filter-condition";
				key = DataTemplatebuilder.options.FILTER_CONDITIONS;
				operationType = "filter";
			}  else if ($el.hasClass("js-setting-sort-column-asc") || $el.hasClass("js-setting-sort-column-desc")) {//排序字段
				clz = $el.hasClass("js-setting-sort-column-asc")? ".js-setting-sort-column-asc":".js-setting-sort-column-desc";
				key = DataTemplatebuilder.options.SORT_COLUMNS;
				operationType = "sort";
			} else if ($el.hasClass("js-setting-function-button")) {// 对话框按钮
				var type = $el.data('type');
				clz = ".js-setting-function-button[data-type='"+type+"']";
				
				if(type=='list' || type == 'tree'){
					title = "功能按钮";
					key = DataTemplatebuilder.options.FUNCTION_BUTTONS;
					operationType = "function";
				} else if(type == 'contextmenu'){
					key = DataTemplatebuilder.options.CONTEXTMENU_BUTTONS;
					operationType = "contextmenu";
				}else if(type == 'edit'){
					title = "编辑页按钮";
					key = DataTemplatebuilder.options.EDIT_BUTTONS;
					operationType = "edit";
				}
				url = __ctx	+ '/platform/data/dataTemplate/button.htm';

			} 

			i = this.$el.find(clz).index($el.closest(clz));
			options = this.model.get(key) || [];
			option = options.slice(i, i + 1).shift();
			if (operationType == "sort") {
				var direction =(option.direction == "desc"? "asc":"desc");
				option.direction =	direction;
				options.splice(i, 1, option);
				_this.model.set(key, options);
				_this.model.trigger("change:" + key);
				_this.forceRender();
				return;
			}else if( operationType == "display" ||  operationType ==  "query"  ||  operationType ==  "result"){
				field = DataTemplatebuilder.response_fields[option.name];
			}else if (operationType ==  "function" ||  operationType ==  "edit"){
				title += "【"+FormButtons.t.buttons[option.button_type].label+"】";
			}
			
			DialogUtil.dialog({
				title : title,
				area : [ '60%', '80%' ],
				params : {
					data : option,
					field : field,
					operationType:operationType
				},
				content : url,
				btn : [{
							label : '确定',
							iconCls : 'btn btn-primary fa fa-ok',
							action : function(dialog, index) {
								var data = DialogUtil.getChildFrameWindow(index).getData();
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
		 *  设置权限数据
		 */
		EditTemplateView.prototype.settingRightsData = function(key, rights) {
			var options = this.model.get(key) || [];

			options = _.map(options, function(option) {
				option.rights = rights;
				return option;
			});
			
			this.model.set(key, options);
			this.model.trigger("change:" + key);
			this.forceRender();
			DialogUtil.msg("设置权限成功！");
		}

		/**
		 * 设置权限
		 */
		EditTemplateView.prototype.settingRights = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var _this = this, key, $el = $(e.currentTarget), rightsType = $el
					.data("rights"), type = $el.data("type");
			
			  if (rightsType == "query") {//  查询条件
					title = "查询条件";
					key = DataTemplatebuilder.options.QUERY_COLUMNS;
			}else if (rightsType == "display") {// 显示字段
				title = "显示字段";
				key = DataTemplatebuilder.options.DISPLAY_COLUMNS;
			} else if (rightsType == "filter") {// 过滤条件
				title = "过滤条件";
				key = DataTemplatebuilder.options.FILTER_CONDITIONS;
			}else if (rightsType == "result") {// 返回结果字段
				title = "返回结果字段";
				key = DataTemplatebuilder.options.RESULT_COLUMNS;
			}else if (rightsType == "function_buttons") {// 功能按钮
				title = "功能按钮";
				key = DataTemplatebuilder.options.FUNCTION_BUTTONS;
			} else if (rightsType == "edit_buttons") {// 功能按钮
				title = "编辑页-操作按钮";
				key = DataTemplatebuilder.options.EDIT_BUTTONS;
			}

			if (type == 'none') {
				var rights = [ {
					type : "none"
				} ];
				this.settingRightsData(key, rights);
			} else if (type == 'all') {
				var rights = [ {
					type : "all"
				} ];
				this.settingRightsData(key, rights);
			} else {
				new RightsDefDialog({
					title : title,
					key : 'formRights',
					callback : function(rights) {
						_this.settingRightsData(key, rights);
					}
				}).show();
			}

		};

		EditTemplateView.prototype.forceRender = function() {
			return this.model.trigger('change');
		};

		/**
		 * 初始化选项排序
		 * 
		 * @param e
		 * @param t
		 * @param item
		 * @returns {EditFieldView}
		 */
		EditTemplateView.prototype.initSortable = function(e, t, item, key) {
			var _this = this, index;
			this.sortableChoices = e.$(t).sortable(
					{
						items : "> " + item,
						handle : "[data-role='sort_choice']",
						forcePlaceholderSize : true,
						scroll : true,
						placeholder : "sortable-placeholder",
						distance : 1,
						axis : "y",
						start : function(event, ui) {
							// 移动前的位置
							index = _this.$el.find(item).index(
									$(ui.item).closest(item));
						},
						update : function(ev, ui) {
							_this.updateSortingIndex(index, ui, item, key);
						}
					});
			return this;
		};

		EditTemplateView.prototype.updateSortingIndex = function(index, ui,
				item, key) {
			// 移动后的位置
			var i = this.$el.find(item).index($(ui.item).closest(item)),
			// 值
			options = this.model.get(key) || [],
			//移动的值
			moveOption = options[index];
			
			// 删除 移动的位置
			options.splice(index, 1);
			// 插入 移动的位置
			options.splice(i, 0, moveOption);
			this.model.set(key, options);
			this.model.trigger("change:" + key);
			this.forceRender();
			this.render(); // 重新渲染
		};

		
		/**
		 * 过滤条件
		 */
		EditTemplateView.prototype.editFilterCondition = function(data, idx) {
			var isAdd = false, _this = this;
			if (!data) {
				var rights = [ {
					type : "all"
				} ];
				data = {
					label : '过滤条件',
					type : 'condition',
					rights : rights
				};
				isAdd = true;
			}
			
			DialogUtil
				.dialog({
					title : '过滤条件字段',
					area : [ '1050px', '600px' ],
					params : {
						data : data,
						fields : DataTemplatebuilder.fields
					},
					content : __ctx
							+ '/platform/data/dataTemplate/filterCondition.htm',
					btn : [
						{
							label : '确定',
							iconCls : 'btn btn-primary fa fa-ok',
							action : function(dialog, index) {
								var data = DialogUtil
										.getChildFrameWindow(index).dataTemplateFilterCondition
										.getData();
								if (!data)
									return;
								var key = DataTemplatebuilder.options.FILTER_CONDITIONS, options = _this.model
										.get(key)
										|| [];

								if (isAdd) {
									options.push(data);
								} else {
									options.splice(idx, 1, data);
								}

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
						} 
					]
				});
		}

		/**
		 * 增加条件
		 */
		EditTemplateView.prototype.addCondition = function(e) {
			this.editFilterCondition();
		}

		/**
		 * 设置条件
		 */
		EditTemplateView.prototype.settingCondition = function(e) {
			var $el, i, options, item, key, _this = this;
			$el = $(e.currentTarget);
			item = '.filter-condition';
			key = DataTemplatebuilder.options.FILTER_CONDITIONS;

			i = this.$el.find(item).index($el.closest(item));
			options = this.model.get(key) || [];
			this.editFilterCondition(options.slice(i, i + 1).shift(), i);
		};
		
		EditTemplateView.prototype.settringDataTitle= function(e){
			var _this = this,
			key = DataTemplatebuilder.options.attrs.DATA_TITLE, 
			data = 	this.model.get(key);
		
		DialogUtil.dialog({
				title : '设置数据标题',
				area : [ '50%', '50%' ],
				params : {
					data : data,
					fields : DataTemplatebuilder.fields
				},
				content : __ctx+ '/platform/data/dataTemplate/dataTitle.htm',
				btn : [
					{
						label : '确定',
						iconCls : 'btn btn-primary fa fa-ok',
						action : function(dialog, index) {
							var data = DialogUtil.getChildFrameWindow(index).dataTemplateDataTitle
									.getData();
							if($.isEmpty(data))
								return;
							_this.model.set(key, data);
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
					} 
				]
			});
		};
		/**
		 * 设置导出字段
		 */
		EditTemplateView.prototype.settingExportColumn = function(){
				var _this = this,
					key = DataTemplatebuilder.options.EXPORT_COLUMNS, 
					data = 	this.model.get(key);
				
				DialogUtil.dialog({
						title : '导出字段',
						area : [ '1050px', '600px' ],
						params : {
							data : data,
							fields : DataTemplatebuilder.fields
						},
						content : __ctx+ '/platform/data/dataTemplate/exportColumn.htm',
						btn : [
							{
								label : '确定',
								iconCls : 'btn btn-primary fa fa-ok',
								action : function(dialog, index) {
									var data = DialogUtil.getChildFrameWindow(index).dataTemplateExportColumn
											.getData();
									if($.isEmpty(data))
										return;
									_this.model.set(key, data);
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
							} 
						]
					});
		}
		
		/**
		 * 改变模版类型
		 * TODO  未完成
		 */
		EditTemplateView.prototype.changeTemplateType = function(templateType) {
			
			  var origTemplateType =  this.model.get(DataTemplatebuilder.options.TEMPLATE_TYPE),
	        		defaultTemplateAttrs = DataTemplatebuilder.helpers.defaultTemplateAttrs(templateType);
			  this.model.set(DataTemplatebuilder.options.ATTRS_KEY,null);
		     this.model.set(DataTemplatebuilder.options.TEMPLATE_TYPE,templateType);
			  //属性还原默认
			  this.model.set(DataTemplatebuilder.options.ATTRS_KEY,defaultTemplateAttrs["attrs"]);
			  
			  if(templateType == 'valueSource'){
				  //查询
				  this.model.set(DataTemplatebuilder.options.QUERY_COLUMNS,null);
				  //显示
				  this.model.set(DataTemplatebuilder.options.DISPLAY_COLUMNS,null);
				  //功能按钮清除
				  this.model.set(DataTemplatebuilder.options.BUTTONS,null);
			  }
			  else if((origTemplateType == 'list'  &&  templateType == 'tree')   || (templateType == 'list'  && origTemplateType == 'tree')){ //list<==>tree
				  //查询
				  this.model.set(DataTemplatebuilder.options.QUERY_COLUMNS,null);
				  //显示
				  this.model.set(DataTemplatebuilder.options.DISPLAY_COLUMNS,null);
				  var buttons = defaultTemplateAttrs["buttons"]||{};
				  //功能按钮 还原默认
				  this.model.set(DataTemplatebuilder.options.FUNCTION_BUTTONS,buttons["function_buttons"]||null);
				  //编辑页按钮 还原默认
				  this.model.set(DataTemplatebuilder.options.EDIT_BUTTONS,buttons["edit_buttons"]||null);
			  } else if((origTemplateType == 'composeTree'  &&  templateType == 'composeList')  ) { 
				  //查询
				  this.model.set(DataTemplatebuilder.options.QUERY_COLUMNS,null);
				  //显示
				  this.model.set(DataTemplatebuilder.options.DISPLAY_COLUMNS,null);
				  //过滤
				  this.model.set(DataTemplatebuilder.options.FILTER_CONDITIONS,null);
				  //排序
				  this.model.set(DataTemplatebuilder.options.SORT_COLUMNS,null);
			  }
			  
	        this.forceRender();
	        // 重新渲染
	        this.parentView.createAndShowEditView(this.model,false,true);
		}
		
		
		EditTemplateView.prototype.settingTemplate = function(e) {
			var templateKey =this.model.get(DataTemplatebuilder.options.attrs.BIND_TEMPLATE_KEY);
			var url =  __ctx+ "/platform/data/dataTemplate/design.htm?key="+templateKey;
			DialogUtil.dialog({
				params:{},
				callback:function(rtn){
				},
				maxmin:false,
				title:false,
				area : [ '95%', '99%' ],
				content :url
				});
		}
		
		/**
		 * 选择数据模版
		 */
		EditTemplateView.prototype.selectTemplate = function(e) {
			var _this = this, model = this.model, t, form, d,type;
		
			var $el = $(e.currentTarget);
			type = $el.data("type");
			new DataTemplateDialog({
				pkKey : 'key',
				params : {
					type:type,
					data : d
				},
				callback : function(data, index) {
					var key = null, name = null;
					if (data.length > 0) {
						key = data[0].key, name = data[0].name;
					}
					_this.setTemlateData(key,name);
					
					_this.forceRender();
					DialogUtil.close(index);
				}
			}).show();

		};
		/**
		 * 设置模版数据
		 */
		EditTemplateView.prototype.setTemlateData = function(key,name){
				this.model.set(DataTemplatebuilder.options.attrs.BIND_TEMPLATE_KEY, key?key:null);
				this.model.set(DataTemplatebuilder.options.attrs.BIND_TEMPLATE_NAME, name?name:null);
		}

		/**
		 * 删除数据模版
		 * 
		 */
		EditTemplateView.prototype.removeTemplate = function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.setTemlateData();
			this.forceRender();
		};
		
		
		return EditTemplateView;

	})(Backbone.View);

	// ====================TODO 编辑视图==================
	BuilderView = (function(_super) {
		__extends(BuilderView, _super);

		function BuilderView() {
			_ref4 = BuilderView.__super__.constructor.apply(this, arguments);
			return _ref4;
		}

		BuilderView.prototype.SUBVIEWS = [];

		BuilderView.prototype.events = {
			'click .js-save-template' : 'saveTemplate', // 保存模版
			'click .js-preview-template' : 'previewTemplate', // 预览模版
		     'click .js-close':'closeDialog',
			'click .tb-tabs a' : 'showTab', // 显示tab
			'click a[data-template-type]' : 'addTemplate' // 添加模版
		};
		
		BuilderView.prototype.getTemplateDef = function(data) {
			if (!data)
				return {
					name : "新建数据模版"
				};
			var d = _.clone(data);
			return d;
		};
		
		BuilderView.prototype.getTemplateType = function(d){
			var type = d.type,
				showType  = d.showType,
				composeType = d.composeType || 'treeList',
				templateType = "list";
			
			if(type == 'valueSource'){
				return  type;
			}else{
				if(showType == 'compose')
					return composeType;
				else
					return showType;
			}
		}

		BuilderView.prototype.initialize = function(options) {
			var selector, d = {};
			
			selector = options.selector;
			
			this.dataTemplatebuilder = options.dataTemplatebuilder;
			
			d = options.data;
			this.options = options;
			
			if(!d.unique)
				d.unique = DataTemplatebuilder.pk_field;

			this.templateDef = this.getTemplateDef(d);
			
			// 模版集合
			this.templates = d.templates? d.templates: DataTemplatebuilder.helpers.defaultTemplateAttrs(this.getTemplateType(d),d) ;

			if (selector != null) {
				this.setElement($(selector));
			}

			// 初始化模版集合
			this.initTemplateCollection();
			//初始化对话框属性
			this.initDialogProperty(d,this.templateDef["dialogs"]);
			//初始化对话框view
			this.initDialogPropertyView(d.type);
			
			// 初始化模版属性
			this.initTemplateProperty();
			//初始化操作按钮
			this.initOperation();
			
			//初始化默认选择模版
			this.activeTab("edit_template");
			
			return this.bindSaveEvent();
		};

		BuilderView.prototype.initOperation = function(e) {
			$(document).on("mouseenter", ".select-list", function() {
				return $(this).find(".select-actions").show();
			});
			$(document).on("mouseleave", ".select-list", function() {
				return $(this).find(".select-actions").hide();
			});
		};

		/**
		 *  初始化属性编辑页面
		 */
		BuilderView.prototype.initTemplateProperty = function() {
	        var view, $responseTemplateHeaderWrapper;
			this.templateProperty = new Backbone.DeepModel(this.templateDef);
			
	        // 初始化属性编辑页面
	        view = new TemplateHeaderView({
	          model: this.templateProperty,
	          parentView: this
	        });
	        $responseTemplateHeaderWrapper = this.$el.find('.template-header-wrapper');
	        $responseTemplateHeaderWrapper.append(view.render().el);
	        
	        this.$responseTemplateHeader = $responseTemplateHeaderWrapper.find('.template-header');

			// 初始化属性编辑页面
			this.editTemplateView = new TemplatePropertyView({
				model : this.templateProperty,
				parentView : this
			});
			var $newEditEl = this.editTemplateView.render().$el;
			this.$el.find(".edit-template-property").html($newEditEl);
		};
		
		

		/**
		 * 初始化对话框属性
		 */
		BuilderView.prototype.initDialogProperty= function(options,dialogs) {
			var dialog = $.isNotEmpty(dialogs)?dialogs:DataTemplatebuilder.helpers.defaultDialogAttrs(this.getTemplateType(options));
			
			this.dialogPropertyModel = new Backbone.DeepModel(dialog);
			
			// 初始化属性编辑页面
			this.dialogPropertyView = new DialogPropertyView({
				model : this.dialogPropertyModel,
				parentView : this
			});
			var $newEditEl = this.dialogPropertyView.render().$el;
			this.$el.find(".edit-dialog-property").html($newEditEl);
		};
		/**
		 * 初始化对话框视图
		 */
		BuilderView.prototype.initDialogPropertyView= function(type) {
			if(type == 'dialog')
				$("#dialogPropertyLi").show();
			else
				$("#dialogPropertyLi").hide();
		};
		

		// 初始化模版集合
		BuilderView.prototype.initTemplateCollection = function() {
			this.collection = new DataTemplatebuilderCollection;
			this.collection.bind('add', this.addOne, this);
			this.collection.bind('reset', this.reset, this);
			this.collection.bind('change', this.handleFormUpdate, this);
			this.collection.bind('destroy add reset',
					this.hideShowNoResponseTemplates, this);
			this.collection.bind('destroy', this.ensureEditViewScrolled, this);

			this.render();
			this.collection.reset(this.templates);
		};

	
		/**
		 * 绑定保存事件
		 * 
		 * @returns
		 */
		BuilderView.prototype.bindSaveEvent = function() {
			var _this = this;
			this.formSaved = true;
			return $(window).bind('beforeunload', function() {
				if (_this.formSaved) {
					return void 0;
				} else {
					return DataTemplatebuilder.lang.dict.UNSAVED_CHANGES;
				}
			});
		};

		BuilderView.prototype.reset = function() {
			this.$responseTemplates.html('');
			return this.addAll();
		};

		BuilderView.prototype.render = function() {
			var subview, _i, _len, _ref5;

			this.$responseTemplates = this.$el.find('.tb-response-templates');
			this.hideShowNoResponseTemplates();
			_ref5 = this.SUBVIEWS;
			for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
				subview = _ref5[_i];
				new subview({
					parentView : this
				}).render();
			}
			return this;
		};


		/**
		 * 激活tab
		 * 
		 * @param id
		 */
		BuilderView.prototype.activeTab = function(id) {
			this.$el.find(".tb-tabs a[href=\"#" + id + "\"]").click();
		};

		/**
		 * 显示Tab
		 */
		BuilderView.prototype.showTab = function(e) {
			var $el, first_model, target;
			$el = $(e.currentTarget);
			target = $el.attr('href');
			// 修复切换Tab，下拉菜单不消失bug
			$(".tree-box").remove();
			if (target === '#edit_template' && !this.editView
					&& (first_model = this.collection.models[0])) {
				return this.createAndShowEditView(first_model, true);
			}

		};

		BuilderView.prototype.addOne = function(responseTemplate, _, options) {
			var $replacePosition, view;
			view = new ViewTemplateView({
				model : responseTemplate,
				parentView : this
			});

			if (options.$replaceEl != null) {// 替换
				return options.$replaceEl.replaceWith(view.render().el);
			} else if ((options.position == null) || options.position === -1) {// 添加
				return this.$responseTemplates.append(view.render().el);
			} else if (options.position === 0) {//上移
				return this.$responseTemplates.prepend(view.render().el);
			} else if (($replacePosition = this.$responseTemplates.find(
					".tb-template-wrapper").eq(options.position))[0]) {
				return $replacePosition.before(view.render().el);
			} else {
				return this.$responseTemplates.append(view.render().el);
			}
		};

	
		BuilderView.prototype.addAll = function() {
			return	this.collection.each(this.addOne, this);
		};

		BuilderView.prototype.hideShowNoResponseTemplates = function() {
			if (this.collection.length == 0)
				return this.$responseTemplates
						.addClass("tb-no-response-templates");
			else
				return this.$responseTemplates
						.removeClass("tb-no-response-templates");
		};

		/**
		 * 创建一个模版
		 */
		BuilderView.prototype.createTemplate = function(templateType, options) {
			var attrs = {}, rf;
			if (_.isString(templateType)) {
				attrs = DataTemplatebuilder.helpers.defaultTemplateAttrs(templateType);
			} else {
				attrs = templateType;
			}
			rf = this.collection.create(attrs, options);
			this.createAndShowEditView(rf, false);
			return this.handleFormUpdate();
		};
		/**
		 * 创建并显示编辑字段
		 * 
		 * @param model
		 * @param isActiveTab
		 * @returns {BuilderView}
		 */
		BuilderView.prototype.createAndShowEditView = function(model,isActiveTab,changeType) {
			var $newEditEl, $responseTemplateEl;
			$responseTemplateEl = this.$el.find(".tb-template-wrapper").filter(
					function() {
						return $(this).data('cid') === model.cid;
					});

			$responseTemplateEl.addClass('editing').siblings(
					'.tb-template-wrapper').removeClass('editing');
			
		      this.$responseTemplateHeader.removeClass('editing');

			if (this.editView) {
				if (this.editView.model.cid === model.cid  && !changeType) {
					if(isActiveTab)
						this.$el.find(".tb-tabs a[href=\"#edit_template\"]").click();
					return;
				}
				this.editView.remove();
			}
			this.editView = new EditTemplateView({
				model : model,
				parentView : this
			});
			$newEditEl = this.editView.render().$el;
			this.$el.find(".edit-template-wrapper").html($newEditEl);
			if(isActiveTab)
				this.$el.find(".tb-tabs a[href=\"#edit_template\"]").click();
			return this;
		};

		BuilderView.prototype.ensureEditViewScrolled = function() {
			if (!this.editView) {
				return;
			}
			return this;
		};

		BuilderView.prototype.handleFormUpdate = function() {
			if (this.updatingBatch) {
				return;
			}
			this.formSaved = false;
		};

		BuilderView.prototype.saveTemplate = function(e) {
			var payload;
			payload = this.getData(true);
			if (DataTemplatebuilder.options.HTTP_ENDPOINT) {
				this.doAjaxSave(payload);
			}
			return this.dataTemplatebuilder.trigger('save', payload);
		};

		BuilderView.prototype.getData = function(isString) {
			this.collection.sort();
			var templateProperty = this.templateProperty.toJSON(),
				dialogs =templateProperty.type=='dialog'?( this.dialogPropertyModel?this.dialogPropertyModel.toJSON():''):'',
				templates = this.collection.toJSON(),
				datasets = $("#datasetJson").val();
			

			var data = $.extend(templateProperty, {
				templates : templates,
				dialogs:dialogs,
				datasets : $.isEmpty(datasets)?"": JSON.parse(datasets)
			});

			if (isString)
				return JSON.stringify(data);
			else
				return data;
		};
		
		/**
		 * 保存数据
		 * 
		 * @param payload
		 * @returns
		 */
		BuilderView.prototype.doAjaxSave = function(payload) {
			var b = this.checkForm(payload);
			if (b)
				return;
			var _this = this;
		    var loading = DialogUtil.load("保存中...");
			return $.ajax({
						url : DataTemplatebuilder.options.HTTP_ENDPOINT,
						type : DataTemplatebuilder.options.HTTP_METHOD,
						data : {
							data : payload
						},
						success : function(data) {
						  	DialogUtil.close(loading);
							var result = JSON.parse(data);
							if (result.result == 1) {
								_this.formSaved = true;
								DialogUtil.confirm(result.message + ',是否继续操作',function(rtn) {
												if (_this.options.callback)
													_this.options.callback(rtn);
												if (rtn)
													window.location.href = __ctx+ "/platform/data/dataTemplate/design.htm?id="
															+ result.id;
												else
													DialogUtil.closeDialog();

											});
							} else {
								DialogUtil.error(result.message, result.cause);
							}
						},
						error : function(){
							DialogUtil.close(loading);
						}
					});
		};

		BuilderView.prototype.checkForm = function(payload) {
			var k, v, _ref;
			_ref = this.collection.toJSON();
			if (_ref.length <= 0) {
				DialogUtil.msg("请选择正确的模版");
				return true;
			}
			var templateProperty = this.templateProperty.toJSON();
	     	if(_.isEmpty(templateProperty)){
	    		DialogUtil.msg("请设置模版的相关属性");
	    		this.activeTab("template_property");
	    	
	    	}
	     	if(_.isEmpty(templateProperty.name)){
	    		DialogUtil.msg("请设置模版标题");
	    		this.activeTab("template_property");
	    		return true;
	     	}
	     	if(_.isEmpty(templateProperty.key)){
	    		DialogUtil.msg("请设置模版Key");
	    		this.activeTab("template_property");
	    		return true;
	     	}
			//TODO 不是组合字段设置数据集
	     	
	     	if(templateProperty.showType != 'compose'){
	     	   	if(_.isEmpty(templateProperty.datasetKey)){
	     	   		DialogUtil.msg("请设置数据集");
		    		this.activeTab("template_property");
		    		return true;
		     	}
	     	}
	     	
	     	
			return false;
		};
		


		/**
		 * 预览模版
		 */
		BuilderView.prototype.previewTemplate = function(e) {
			var data = this.getData(false);
			if (!data) {
				DialogUtil.msg("请添加模版");
				return;
			}
			if (console) {
				console.info(data);
			}
			var  type =  data.type,
				 params = {
					data:data,
					fields:DataTemplatebuilder.fields
				},
				options = {
					title:'【预览】'+data.name,
					isClose:true,
					callback:function(data){
						if(data){
							DataTemplateUtil.previewData(data);
						}else{
							DialogUtil.alert("返回数据为空");
						}
				
					}
				};
			DataTemplateUtil.previewDialog(params,options); 
		};
		
	    BuilderView.prototype.closeDialog= function(e) {
	    	if(!this.formSaved){
	    		var _this = this;
	    		DialogUtil.confirm(  DataTemplatebuilder.lang.dict.UNSAVED_CHANGES, function(rtn) {
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

	/** *******************************数据模版*********************************************** */
	DataTemplatebuilder = (function() {
		DataTemplatebuilder.helpers = {
			defaultTemplateAttrs : function(template_type,data) {
				var attrs, _base;
				if(data &&  data.showType == 'compose'){
					attrs = [] ;
					var composeType = data.composeType;
					if(composeType == 'treeList'){
						attrs.push(this.defaultTemplateAttrs("composeTree"));
						attrs.push(this.defaultTemplateAttrs("composeList"));
					}else if(composeType == 'listTree'){
						attrs.push(this.defaultTemplateAttrs("composeList"));
						attrs.push(this.defaultTemplateAttrs("composeTree"));
					}
					return attrs;
				}else{
					attrs = {};
					attrs[DataTemplatebuilder.options.TEMPLATE_TYPE] = template_type;
					return (typeof (_base = DataTemplatebuilder.dataTempates[template_type]).defaultAttributes === "function" ? _base.defaultAttributes(attrs): void 0)|| attrs;
				}
			},
			defaultDialogAttrs:function(template_type){
				var attrs = {},defAttrs = {},defButtons = {};
				
				defAttrs[DataTemplatebuilder.options.defattrs.MULTI] ='Y'; 
				defAttrs[DataTemplatebuilder.options.defattrs.WIDTH] = '80';
				defAttrs[DataTemplatebuilder.options.defattrs.HEIGHT] = '80';
				
				attrs[DataTemplatebuilder.options.ATTRS_KEY]  = defAttrs;
				
				defButtons["dialog_buttons"]  = [{
							button_type : "ok",
							label : "确定"
						},{
							button_type : "clean",
							label : "清空"
						}, {
							button_type : "cancel",
							label : "取消"
						}];
				
				attrs[DataTemplatebuilder.options.BUTTONS]  = defButtons;
				return (typeof (_base = DataTemplatebuilder.dataTempates[template_type]).defaultDialogAttrs === "function" ? _base.defaultDialogAttrs(attrs): void 0)|| attrs;
			},
			/**
			 * 查询字段
			 */
			defaultQueryColumnAttrs : function(name) {

				var field = DataTemplatebuilder.response_fields[name];
				
				var column = {
					label : field.label,
					name : field.name
				};
				return column;
			},
			defaultColumnAttrs : function(name) {
				var field = DataTemplatebuilder.response_fields[name];

				var column = {
					label : field.label,
					name : field.name
				};
				return column;
			},
			/**
			 * 排序字段
			 */
			defaultSortColumnAttrs : function(name) {
				var field = DataTemplatebuilder.response_fields[name];

				var column = {
					label : field.label,
					name : field.name,
					direction : 'desc'
				};
				return column;
			},
		
			defaultButtonAttrs : function(type,buttonType) {
				var label = '';
				if(buttonType =='dialog')
					label = DataTemplatebuilder.lang.DIALOG_BUTTONS[type];
				else if(buttonType =='list')
					label = DataTemplatebuilder.lang.LIST_FUNCTION_BUTTONS[type];
				else if(buttonType =='tree')
					label = DataTemplatebuilder.lang.TREE_FUNCTION_BUTTONS[type];
				else if(buttonType =='contextmenu')
					label = DataTemplatebuilder.lang.TREE_CONTEXTMENU_BUTTONS[type];
				else if (buttonType =='edit')
					label = DataTemplatebuilder.lang.EDIT_BUTTONS[type];
				
				var canReAdd = FormButtons.t.buttons[type].canReAdd;
				var button = {
					label : label,
					button_type : type,
					canReAdd:typeof(canReAdd)!="undefined"?canReAdd:false
				};
				return button;
			},
			simple_format : function(x) {
				// 把\n 替换成br
				return x != null ? x.replace(/\n/g, '<br />') : void 0;
			}
		};

		//数据模版
		DataTemplatebuilder.dataTempates = {};

		
		DataTemplatebuilder.pk_field = '';

		DataTemplatebuilder.registerDataTempate = function(type, opts) {
			var x, _i, _len, _ref5;
			_ref5 = [ 'view', 'edit' ];
			for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
				x = _ref5[_i];
				opts[x] = _.template(opts[x]);
			}
			opts.template_type = type;

			DataTemplatebuilder.dataTempates[type] = opts;

		};

		function DataTemplatebuilder(opts) {
			var args;
			if (opts == null) {
				opts = {};
			}
			
			_.extend(this, Backbone.Events);
			args = _.extend(opts, {
				dataTemplatebuilder : this
			});
			this.mainView = new BuilderView(args);
		}

		return DataTemplatebuilder;

	})();

	window.DataDataTemplatebuilder = DataTemplatebuilder;

	if (typeof module !== "undefined" && module !== null) {
		module.exports = DataTemplatebuilder;
	} else {
		window.DataTemplatebuilder = DataTemplatebuilder;
	}

}).call(this);
