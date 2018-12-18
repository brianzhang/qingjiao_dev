/**
 * 数据构建工具
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

	var BuilderView, EditTemplateView, Templatebuilder, TemplatebuilderCollection, TemplatebuilderModel, TemplatePropertyView, ViewTemplateView, QueryConditionView, EditQueryConditionView, _ref, _ref1, _ref2, _ref3, _ref4, __hasProp = {}.hasOwnProperty, __extends = function(
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
	TemplatebuilderModel = (function(_super) {
		__extends(TemplatebuilderModel, _super);

		function TemplatebuilderModel() {
			_ref = TemplatebuilderModel.__super__.constructor.apply(this,
					arguments);
			return _ref;
		}

		TemplatebuilderModel.prototype.sync = function() {
		};

		TemplatebuilderModel.prototype.indexInDOM = function() {
			var $wrapper, _this = this;
			$wrapper = $(".tb-template-wrapper").filter((function(_, el) {
				return $(el).data('cid') === _this.cid;
			}));
			return $(".tb-template-wrapper").index($wrapper);
		};

		TemplatebuilderModel.prototype.is_input = function() {
			return Templatebuilder.inputTemplates[this
					.get(FormOptions.t.mappings.TEMPLATE_TYPE)] != null;
		};

		TemplatebuilderModel.prototype.is_valid = function() {
			return _.isEmpty(this.get(Templatebuilder.options.TEMPLATE_TYPE));
		};

		return TemplatebuilderModel;

	})(Backbone.DeepModel);
	// ====================模版集合==================
	TemplatebuilderCollection = (function(_super) {
		__extends(TemplatebuilderCollection, _super);

		function TemplatebuilderCollection() {
			_ref1 = TemplatebuilderCollection.__super__.constructor.apply(this,
					arguments);
			return _ref1;
		}

		TemplatebuilderCollection.prototype.initialize = function() {
			return this.on('add', this.copyCidToModel);
		};

		TemplatebuilderCollection.prototype.model = TemplatebuilderModel;

		TemplatebuilderCollection.prototype.comparator = function(model) {
			return model.indexInDOM();
		};

		TemplatebuilderCollection.prototype.copyCidToModel = function(model) {
			return model.attributes.cid = model.cid;
		};

		return TemplatebuilderCollection;

	})(Backbone.Collection);

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
			'click .js-select-form' : 'selectForm',// 选择表单
			'click .js-remove-form' : 'removeForm',// 删除表单
			'click .js-rights-form' : 'rightsForm',// 表单权限

			'click .js-select-flow' : 'selectFlow',// 选择流程
			'click .js-remove-flow' : 'removeFlow',// 删除流程
				
			'click .js-select-print-template':'selectPrintTemplate',//选择打印模版
			'click .js-remove-print-template':'removePrintTemplate',//删除打印模版
			
			'click .js-template-script':'settingTemplateScript'//设置表单脚本
		};

		TemplatePropertyView.prototype.initialize = function(options) {
			this.parentView = options.parentView;
			this.model.bind('change', this.parentView.handleFormUpdate,
					this.parentView);
			return this;
		};

		TemplatePropertyView.prototype.render = function() {
			var html = Templatebuilder.templates["edit/template-property"]({
				rf : this.model
			});

			this.$el.html(html);
			rivets.bind(this.$el, {
				model : this.model
			});

			// CommonUtil.qtip(this.$el);
			return this;
		};

		// 选择分类树
		TemplatePropertyView.prototype.dropdownTree = function(e) {
			var $el = $(e.currentTarget), id = $el.data("id");
			this.model.set(Templatebuilder.options.TYPE_NAME, $el.val());
			this.model.set(Templatebuilder.options.TYPE_ID, $(id).val());
		};
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

					_this.model.set(Templatebuilder.options.FORM_KEY, formKey);
					_this.model.set(Templatebuilder.options.FORM_NAME, formName);
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

			_this.model.set(Templatebuilder.options.FORM_KEY, null);
			_this.model.set(Templatebuilder.options.FORM_NAME, null);
			this.forceRender();
		};
		
		  /**
	     * 表单权限
	     */
		TemplatePropertyView.prototype.rightsForm =function(e) { 
	    	e.preventDefault(); e.stopPropagation();
	    	var id = this.model.get("id");
	    	if($.isEmpty(id)){
	    		DialogUtil.alert("请先保存业务数据模版");
	    		return;
	    	}
	    	new FormRightsDialog({
				formKey:this.model.get(Templatebuilder.options.FORM_KEY),
				rightsScope:'biz',
				flowKey:id
			}).show();
	    };

		/**
		 * 选择流程
		 */
		TemplatePropertyView.prototype.selectFlow = function(e) {
			var _this = this, model = this.model, $el = $(e.currentTarget),
				key = Templatebuilder.options.attrs.FLOW_KEY,
				name =Templatebuilder.options.attrs.FLOW_NAME;
			
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

			this.model.set(Templatebuilder.options.attrs.FLOW_KEY, null);
			this.model.set(Templatebuilder.options.attrs.FLOW_NAME, null);
			this.forceRender();
		};
		
		/**
		 * 选择打印模版
		 */
		TemplatePropertyView.prototype.selectPrintTemplate = function(e) {
			var _this = this, model = this.model, $el = $(e.currentTarget);
			var formKey = model.get(Templatebuilder.options.FORM_KEY);
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
					_this.model.set(Templatebuilder.options.attrs.PRINT_ID, id);
					_this.model.set(Templatebuilder.options.attrs.PRINT_NAME, name);
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

			this.model.set(Templatebuilder.options.attrs.PRINT_ID, null);
			this.model.set(Templatebuilder.options.attrs.PRINT_NAME, null);
			this.forceRender();
		};
		/**
		 * 设置模版脚本
		 * @param e
		 */
		TemplatePropertyView.prototype.settingTemplateScript = function(e){
			var _this =this,
	    	key =Templatebuilder.options.attrs.SCRIPT;
		
		  DialogUtil.dialog({
	    		title:'模版脚本设置',
	    		area: ['90%', '90%'],
	    		params: {
	    			data:this.model.get(key)
	    		},
	    		content:__ctx+'/platform/form/formDataTemplate/script.htm',
	    		btn:[{
	            	label: '确定',
	            	iconCls:'btn btn-primary fa fa-ok',
	                action: function(dialog,index) {
	              	  var   data= DialogUtil.getChildFrameWindow(index).formDataTemplateScript.getData();
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
		};
	
		TemplatePropertyView.prototype.forceRender = function() {
			return this.model.trigger('change');
		};
	
		return TemplatePropertyView;
	})(Backbone.View);

	// ====================查询条件==================
	QueryConditionView = (function(_super) {
		__extends(QueryConditionView, _super);
		function QueryConditionView() {
			_ref2 = QueryConditionView.__super__.constructor.apply(this,
					arguments);
			return _ref2;
		}
		QueryConditionView.prototype.className = "query-condition";
		QueryConditionView.prototype.events = {
			'click' : 'focusEditView'
		};

		QueryConditionView.prototype.initialize = function(options) {
			this.parentView = options.parentView;
			this.listenTo(this.model, "change", this.render);
			return this;
		};
		QueryConditionView.prototype.render = function() {
			var html = Templatebuilder.templates["view/query-condition"]({
				rf : this.model
			});

			this.$el.html(html);

			return this;
		};
		QueryConditionView.prototype.focusEditView = function() {
			this.parentView.$responseQueryCondition.addClass('editing');
			this.parentView.$responseTemplates.find(".tb-template-wrapper")
					.removeClass('editing');

			return this.parentView.activeTab("query_condition");
		};
		return QueryConditionView;
	})(Backbone.View);

	EditQueryConditionView = (function(_super) {
		__extends(EditQueryConditionView, _super);

		function EditQueryConditionView() {
			_ref3 = EditQueryConditionView.__super__.constructor.apply(this,
					arguments);
			return _ref3;
		}

		EditQueryConditionView.prototype.className = "edit-query-condition";

		EditQueryConditionView.prototype.events = {
			'click .js-add-query-condition' : 'addColumn',
			'click .js-remove-query-condition' : 'removeColumn',
			'click .js-setting-query-condition' : 'settingColumn',
			'click .js-setting-query-rights' : 'settingRights'
		};

		EditQueryConditionView.prototype.initialize = function(options) {
			this.parentView = options.parentView;
			this.model.bind('change', this.parentView.handleFormUpdate,
					this.parentView);
			return this;
		};

		EditQueryConditionView.prototype.render = function() {
			var html = Templatebuilder.templates["edit/query-condition"]({
				rf : this.model
			});

			this.$el.html(html);
			rivets.bind(this.$el, {
				model : this.model
			});

			this.initSortable(this, ".query-conditions", ".query-condition",
					Templatebuilder.options.QUERY_CONDITION);
			return this;
		};

		// 增加查询字段
		EditQueryConditionView.prototype.addColumn = function(e) {
			var $el, i, newOption, options, item, key, name;
			$el = $(e.currentTarget);
			item = '.query-condition';
			key = Templatebuilder.options.QUERY_CONDITION;
			name = $el.data('name');
			newOption = Templatebuilder.helpers.defaultQueryAttrs(name);

			i = this.$el.find(item).index($el.closest(item));
			options = this.model.get(key) || [];

			var isExist = _.find(options, function(n) {
				return n.name == name;
			});
			if (isExist) {
				DialogUtil.msg("该字段已经添加!");
				return;
			}

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
		 * 删除字段
		 * 
		 * @param e
		 * @returns
		 */
		EditQueryConditionView.prototype.removeColumn = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var $el, index, options, key, clz;
			$el = $(e.currentTarget);

			clz = ".js-remove-query-condition";
			key = Templatebuilder.options.QUERY_CONDITION;

			index = this.$el.find(clz).index($el);
			options = this.model.get(key);
			options.splice(index, 1);
			this.model.set(key, options);
			this.model.trigger("change:" + key);
			return this.forceRender();
		};

		EditQueryConditionView.prototype.settingColumn = function(e) {
			var $el, i, options, item, key,field, _this = this;
			$el = $(e.currentTarget);
			item = '.query-condition';
			key = Templatebuilder.options.QUERY_CONDITION;

			i = this.$el.find(item).index($el.closest(item));
			options = this.model.get(key) || [];
			option = options.slice(i, i + 1).shift();
			field = Templatebuilder.response_fields[option.name];
			DialogUtil
					.dialog({
						title : '查询字段',
						area : [ '500px', '350px' ],
						params : {
							data:option,
							field:field
						},
						content : __ctx+ '/platform/form/formDataTemplate/queryCondition.htm',
						btn : [
								{
									label : '确定',
									iconCls : 'btn btn-primary fa fa-ok',
									action : function(dialog, index) {
										var data = DialogUtil
												.getChildFrameWindow(index).formDataTemplateQueryCondition
												.getData();
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

		EditQueryConditionView.prototype.settingData = function(rights) {
			var key = Templatebuilder.options.QUERY_CONDITION, options = this.model
					.get(key)
					|| [];

			options = _.map(options, function(option) {
				option.rights = rights;
				return option;
			});
			this.model.set(key, options);
			this.model.trigger("change:" + key);
			this.forceRender();
			DialogUtil.msg("设置权限成功！");
		}
		EditQueryConditionView.prototype.settingRights = function(e) {
			var _this = this, key = Templatebuilder.options.QUERY_CONDITION, options = this.model
					.get(key)
					|| [];
			var $el = $(e.currentTarget), type = $el.data("type");
			if (type == 'none') {
				var rights = [ {
					type : "none"
				} ];
				this.settingData(rights);
			} else if (type == 'all') {
				var rights = [ {
					type : "all"
				} ];
				this.settingData(rights);
			} else {
				new RightsDefDialog({
					title : '查询条件权限',
					key : 'formRights',
					callback : function(rights) {
						_this.settingData(rights);

					}
				}).show();
			}
		};

		/**
		 * 初始化选项排序
		 * 
		 * @param e
		 * @param t
		 * @param item
		 */
		EditQueryConditionView.prototype.initSortable = function(e, t, item,
				key) {
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
		EditQueryConditionView.prototype.updateSortingIndex = function(index,
				ui, item, key) {
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

		EditQueryConditionView.prototype.forceRender = function() {
			return this.model.trigger('change');
		};

		return EditQueryConditionView;
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
			this.$el
					.addClass(
							'response-template-'
									+ this.model
											.get(Templatebuilder.options.TEMPLATE_TYPE))
					.data('cid', this.model.cid).html(
							Templatebuilder.templates["view/base"]({
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
			x = Templatebuilder.options.CLEAR_Template_CONFIRM;
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
			// 显示字段
			'click .js-add-display-column' : 'addColumn',
			'click .js-remove-display-column' : 'removeColumn',
			'click .js-setting-display-column' : 'settingColumn',

			// 功能按钮
			'click .js-add-function-button' : 'addColumn',
			'click .js-remove-function-button' : 'removeColumn',
			'click .js-setting-function-button' : 'settingColumn',

			// 过滤条件
			'click .js-add-filter-condition' : 'addCondition',
			'click .js-remove-filter-condition' : 'removeColumn',
			'click .js-setting-filter-condition' : 'settingCondition',

			// 排序字段
			'click .js-add-sort-column' : 'addColumn',
			'click .js-remove-sort-column' : 'removeColumn',
			'click .js-setting-sort-column' : 'settingColumn',
			// 编辑操作按钮
			'click .js-add-edit-button' : 'addColumn',
			'click .js-remove-edit-button' : 'removeColumn',
			'click .js-setting-edit-button' : 'settingColumn',

			'click .js-setting-rights' : 'settingRights',
			'click .js-export-column':'settingExportColumn'//设置数据导出
		};

		EditTemplateView.prototype.initialize = function(options) {
			this.parentView = options.parentView;
			var _this = this;

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

			this.$el.html(Templatebuilder.templates["edit/base"]({
				rf : this.model
			}));
			rivets.bind(this.$el, {
				model : this.model
			});

			this.initSortable(this, ".display-columns", ".display-column",
					Templatebuilder.options.DISPLAY_COLUMNS);
			this.initSortable(this, ".filter-conditions", ".filter-condition",
					Templatebuilder.options.DISPLAY_COLUMNS);
			this.initSortable(this, ".function-buttons", ".function-button",
					Templatebuilder.options.FUNCTION_BUTTONS);
			this.initSortable(this, ".edit-buttons", ".edit-button",
					Templatebuilder.options.EDIT_BUTTONS);
			return this;
		};

		/**
		 * 设置导出字段
		 * @param e
		 */
		EditTemplateView.prototype.settingExportColumn = function(e){
			var _this =this,
	    	key =Templatebuilder.options.EXPORT_COLUMNS;
		
			  DialogUtil.dialog({
		    		title:'数据导出设置',
		    		area: ['60%', '90%'],
		    		params: {
		    			def_data : {fields : Templatebuilder.origin_fields},
		    			data : this.model.get(key) || {}
		    		},
		    		content:__ctx+'/platform/form/formDataTemplate/dataExport.htm',
		    		btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		              	  var data = DialogUtil.getChildFrameWindow(index).formDataTemplateDataExport.getData();
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
			};
		
		/**
		 * 增加字段
		 */
		EditTemplateView.prototype.addColumn = function(e) {
			/*
			 * e.preventDefault(); e.stopPropagation();
			 */
			var $el, i, newOption, options, item, key, name, type;
			$el = $(e.currentTarget);

			if ($el.hasClass("js-add-display-column")) {// 显示字段
				item = '.display-column';
				key = Templatebuilder.options.DISPLAY_COLUMNS;
				name = $el.data('name');
				newOption = Templatebuilder.helpers.defaultColumnAttrs(name);

				options = this.model.get(key) || [];
				var isExist = _.find(options, function(n) {
					return n.name == name;
				});
				if (isExist) {
					DialogUtil.msg("该字段已经添加!");
					return;
				}
			} else if ($el.hasClass("js-add-function-button")) {// 功能按钮
				item = '.function-button';
				key = Templatebuilder.options.FUNCTION_BUTTONS;
				type = $el.data('button_type');
				newOption = Templatebuilder.helpers.defaultButtonAttrs(type);

				options = this.model.get(key) || [];
				var isExist = _.find(options, function(n) {
					return n.button_type == type;
				});
				if (isExist && type !=  'custom') {
					DialogUtil.msg("该按钮已经添加!");
					return;
				}
			} else if ($el.hasClass("js-add-sort-column")) {// 排序字段
				item = '.sort-column';
				key = Templatebuilder.options.SORT_COLUMNS;
				name = $el.data('name');
				newOption = Templatebuilder.helpers.defaultSortColumnAttrs(name);

				options = this.model.get(key) || [];
				var isExist = _.find(options, function(n) {
					return n.name == name;
				});
				if (isExist) {
					DialogUtil.msg("该字段已经添加!");
					return;
				}
			} else if ($el.hasClass("js-add-edit-button")) {// 功能按钮
				item = '.edit-button';
				key = Templatebuilder.options.EDIT_BUTTONS;
				type = $el.data('button_type');
				newOption = Templatebuilder.helpers
						.defaultEditButtonAttrs(type);

				options = this.model.get(key) || [];
				var isExist = _.find(options, function(n) {
					return n.button_type == type;
				});
				if (isExist && type !=  'custom') {
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
		EditTemplateView.prototype.removeColumn = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var $el, index, options, key, clz;
			$el = $(e.currentTarget);

			if ($el.hasClass("js-remove-display-column")) {// 显示字段
				clz = ".js-remove-display-column";
				key = Templatebuilder.options.DISPLAY_COLUMNS;
			} else if ($el.hasClass("js-remove-filter-condition")) {// 过滤条件
				clz = ".js-remove-filter-condition";
				key = Templatebuilder.options.FILTER_CONDITIONS;
			} else if ($el.hasClass("js-remove-sort-column")) {// 排序字段
				clz = ".js-remove-sort-column";
				key = Templatebuilder.options.SORT_COLUMNS;
			} else if ($el.hasClass("js-remove-function-button")) {// 功能按钮
				clz = ".js-remove-function-button";
				key = Templatebuilder.options.FUNCTION_BUTTONS;
			} else if ($el.hasClass("js-remove-edit-button")) {// 功能按钮
				clz = ".js-remove-edit-button";
				key = Templatebuilder.options.EDIT_BUTTONS;
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
			if ($el.hasClass("js-setting-display-column")) {// 显示字段
				title = "显示字段";
				clz = ".js-setting-display-column";
				key = Templatebuilder.options.DISPLAY_COLUMNS;
				url = __ctx
						+ '/platform/form/formDataTemplate/displayColumn.htm';
				operationType = "display";
			} else if ($el.hasClass("js-setting-filter-condition")) {// 过滤条件
				clz = ".js-setting-filter-condition";
				key = Templatebuilder.options.FILTER_CONDITIONS;
				operationType = "filter";
			}  else if ($el.hasClass("js-setting-sort-column-asc") || $el.hasClass("js-setting-sort-column-desc")) {//排序字段
				clz = $el.hasClass("js-setting-sort-column-asc")? ".js-setting-sort-column-asc":".js-setting-sort-column-desc";
				key = Templatebuilder.options.SORT_COLUMNS;
				operationType = "sort";
			} else if ($el.hasClass("js-setting-function-button")) {// 功能按钮
				
				title = "功能按钮";
				clz = ".js-setting-function-button";
				key = Templatebuilder.options.FUNCTION_BUTTONS;
				url = __ctx
						+ '/platform/form/formDataTemplate/funtionButton.htm';
				operationType = "function";
			} else if ($el.hasClass("js-setting-edit-button")) {// 编辑操作按钮
				title = "编辑操作按钮";
				clz = ".js-setting-edit-button";
				key = Templatebuilder.options.EDIT_BUTTONS;
				url = __ctx + '/platform/form/formDataTemplate/editButton.htm';
				operationType = "edit";
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
			}else if( operationType == "display"){
				field = Templatebuilder.response_fields[option.name];
			}else if (operationType ==  "function" ||  operationType ==  "edit"){
				title += "【"+FormButtons.t.buttons[option.button_type].label+"】";
			}
			
			DialogUtil.dialog({
				title : title,
				area : [ '600px', '450px' ],
				params : {
					data : option,
					field : field,
					operationType:operationType
				},
				content : url,
				btn : [
						{
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
		EditTemplateView.prototype.settingData = function(key, rights) {
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

		EditTemplateView.prototype.settingRights = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var _this = this, key, $el = $(e.currentTarget), rightsType = $el
					.data("rights"), type = $el.data("type");
			if (rightsType == "display") {// 显示字段
				title = "显示字段";
				key = Templatebuilder.options.DISPLAY_COLUMNS;
			} else if (rightsType == "filter") {// 过滤条件
				title = "过滤字段";
				key = Templatebuilder.options.FILTER_CONDITIONS;
			} else if (rightsType == "button") {// 功能按钮
				title = "功能按钮";
				key = Templatebuilder.options.FUNCTION_BUTTONS;
			} else if (rightsType == "edit") {// 功能按钮
				title = "编辑页操作按钮";
				key = Templatebuilder.options.EDIT_BUTTONS;
			}

			if (type == 'none') {
				var rights = [ {
					type : "none"
				} ];
				this.settingData(key, rights);
			} else if (type == 'all') {
				var rights = [ {
					type : "all"
				} ];
				this.settingData(key, rights);
			} else {
				new RightsDefDialog({
					title : title,
					key : 'formRights',
					callback : function(rights) {
						_this.settingData(key, rights);
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
						area : [ '850px', '600px' ],
						params : {
							data : data,
							fields : Templatebuilder.fields
						},
						content : __ctx
								+ '/platform/form/formDataTemplate/filterCondition.htm',
						btn : [
								{
									label : '确定',
									iconCls : 'btn btn-primary fa fa-ok',
									action : function(dialog, index) {
										var data = DialogUtil
												.getChildFrameWindow(index).formDataTemplateFilterCondition
												.getData();
										if (!data)
											return;
										var key = Templatebuilder.options.FILTER_CONDITIONS, options = _this.model
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
								} ]
					});

		}

		EditTemplateView.prototype.addCondition = function(e) {
			this.editFilterCondition();
		}

		EditTemplateView.prototype.settingCondition = function(e) {
			var $el, i, options, item, key, _this = this;
			$el = $(e.currentTarget);
			item = '.filter-condition';
			key = Templatebuilder.options.FILTER_CONDITIONS;

			i = this.$el.find(item).index($el.closest(item));
			options = this.model.get(key) || [];
			this.editFilterCondition(options.slice(i, i + 1).shift(), i);
		}

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
			'click .tb-tabs a' : 'showTab', // 显示tab
			'click a[data-template-type]' : 'addTemplate' // 点击模版

		};
		function getTemplateDef(data) {
			if (!data)
				return {
					name : "新建数据模版"
				};
			var d = _.clone(data);
			if (d.templates)
				delete d.templates;
			if (d.query_condition)
				delete d.query_condition;

			return d;

		}
		;

		BuilderView.prototype.initialize = function(options) {
			var selector, d = {};
			selector = options.selector;
			this.templatebuilder = options.templatebuilder;
			d = options.data;
			this.options = options;

			this.templateDef = getTemplateDef(d);
			// 模版集合
			this.templates = d ? d.templates : [];

			// 查询条件
			this.query_condition = d ? d.query_condition : {};

			if (selector != null) {
				this.setElement($(selector));
			}
			// 初始化模版查询条件
			this.initQueryCondition();
			// 初始化模版集合
			this.initTemplateCollection();
			// 初始化模版属性
			this.initTemplateProperty();
			this.initOperation();
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

		BuilderView.prototype.initTemplateProperty = function() {
			this.templateProperty = new Backbone.DeepModel(this.templateDef);

			// 初始化属性编辑页面
			this.editTemplateView = new TemplatePropertyView({
				model : this.templateProperty,
				parentView : this
			});
			var $newEditEl = this.editTemplateView.render().$el;
			this.$el.find(".edit-template-property").html($newEditEl);
		};

		// 初始化模版集合
		BuilderView.prototype.initTemplateCollection = function() {
			this.collection = new TemplatebuilderCollection;
			this.collection.bind('add', this.addOne, this);
			this.collection.bind('reset', this.reset, this);
			this.collection.bind('change', this.handleFormUpdate, this);
			this.collection.bind('destroy add reset',
					this.hideShowNoResponseTemplates, this);
			this.collection.bind('destroy', this.ensureEditViewScrolled, this);

			this.render();
			this.collection.reset(this.templates);
		};

		// 查询条件
		BuilderView.prototype.initQueryCondition = function() {
			var view, $responseQueryConditionWrapper;
			this.queryConditionModel = new Backbone.DeepModel({
				query_condition : this.query_condition
			});
			// 初始化查询条件页面
			view = new QueryConditionView({
				model : this.queryConditionModel,
				parentView : this
			});
			$responseQueryConditionWrapper = this.$el
					.find('.query-condition-wrapper');
			$responseQueryConditionWrapper.append(view.render().el);

			this.$responseQueryCondition = $responseQueryConditionWrapper
					.find('.query-condition');
			// 初始化查询条件页面
			this.editQueryConditionView = new EditQueryConditionView({
				model : this.queryConditionModel,
				parentView : this
			});
			var $newEditEl = this.editQueryConditionView.render().$el;
			this.$el.find(".edit-query-condition-wrapper").html($newEditEl);
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
					return Templatebuilder.lang.dict.UNSAVED_CHANGES;
				}
			});
		};

		BuilderView.prototype.reset = function() {
			this.$responseTemplates.html('');
			return this.addAll();
		};

		BuilderView.prototype.render = function() {
			var subview, _i, _len, _ref5;
			// 添加数据模版html
			this.addTemplateHtml();

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

		// TODO
		/**
		 * 添加模版html
		 */
		BuilderView.prototype.addTemplateHtml = function() {
			this.$el.find(".data-template-wrapper").html(
					Templatebuilder.templates['partials/data_template']());
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
			} else if (options.position === 0) {
				return this.$responseTemplates.prepend(view.render().el);
			} else if (($replacePosition = this.$responseTemplates.find(
					".tb-template-wrapper").eq(options.position))[0]) {
				return $replacePosition.before(view.render().el);
			} else {
				return this.$responseTemplates.append(view.render().el);
			}
		};

		/**
		 * 设置字段排序
		 * 
		 * @returns
		 */
		BuilderView.prototype.setSortable = function() {
			var _this = this;
			if (this.$responseTemplates.hasClass('ui-sortable')) {
				this.$responseTemplates.sortable('destroy');
			}
			this.$responseTemplates.sortable(
					{
						items : '>.tb-template-wrapper',
						forcePlaceholderSize : true,
						cancel : ">.actions-wrapper",
						placeholder : "template-sorting-placeholder",
						distance : 5,
						tolerance : "pointer",
						start : function(e, ui) {
							ui.placeholder.height(ui.item
									.is(".template-dragging") ? 88 : ui.helper
									.outerHeight() - 2);
							return true;
						},
						stop : function(e, ui) {
							var el = ui.item;
							if (el.data('template-type')) {
								_this.createTemplate(el.data('template-type'),
										{
											$replaceEl : el
										});
							}
							return true;
						},
						update : function(e, ui) {
							if (!ui.item.data('template-type')) {
								return _this.ensureEditViewScrolled();
							}
						},
						over : function(e) {
							return _this.$responseTemplates
									.removeClass("tb-no-response-templates");
						},
						out : function(e) {
							return _this.hideShowNoResponseTemplates();
						}
					}).disableSelection();
			return this.setDraggable();
		};

		BuilderView.prototype.setDraggable = function() {
			var $addTemplateButtons, _this = this;
			$addTemplateButtons = this.$el.find("[data-template-type]");
			return $addTemplateButtons.draggable({
				connectToSortable : this.$responseTemplates,
				appendTo : ".tb-response-templates",
				zIndex : 100,
				helper : function(e) {
					var $helper = $(e.target);
					if ($helper.is("[data-template-type]")
							|| ($helper = $helper
									.closest("[data-template-type]"))) {
						$helper = $("<div class='template-dragging'>").html(
								$helper.clone());
						$helper.css({
							width : _this.$responseTemplates.width(),
							height : '80px'
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

		BuilderView.prototype.hideShowNoResponseTemplates = function() {
			if (this.collection.length == 0)
				return this.$responseTemplates
						.addClass("tb-no-response-templates");
			else
				return this.$responseTemplates
						.removeClass("tb-no-response-templates");
		};

		/**
		 * 添加模版
		 * 
		 * @param e
		 * @returns
		 */
		BuilderView.prototype.addTemplate = function(e) {
			var template_type = $(e.currentTarget).data('template-type'), position = this.editView ? this.editView.model
					.indexInDOM() + 1
					: null;
			return this.createTemplate(template_type, {
				position : position
			}, false);
		};

		/**
		 * 创建字段
		 */
		BuilderView.prototype.createTemplate = function(templateType, options,
				isActiveTab) {
			var attrs = {}, rf;
			if (_.isString(templateType)) {
				attrs = Templatebuilder.helpers.defaultTemplateAttrs(
						templateType, this);
			} else {
				attrs = templateType;
			}
			rf = this.collection.create(attrs, options);
			this.createAndShowEditView(rf, isActiveTab);
			return this.handleFormUpdate();
		};

		/**
		 * 创建并显示编辑字段
		 * 
		 * @param model
		 * @param isActiveTab
		 * @returns {BuilderView}
		 */
		BuilderView.prototype.createAndShowEditView = function(model,
				isActiveTab) {
			var $newEditEl, $responseTemplateEl;
			$responseTemplateEl = this.$el.find(".tb-template-wrapper").filter(
					function() {
						return $(this).data('cid') === model.cid;
					});

			$responseTemplateEl.addClass('editing').siblings(
					'.tb-template-wrapper').removeClass('editing');
			// 移除查询条件
			this.$responseQueryCondition.removeClass('editing');

			if (this.editView) {
				if (this.editView.model.cid === model.cid) {
					this.$el.find(".tb-tabs a[href=\"#edit_template\"]")
							.click();
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
			if (Templatebuilder.options.HTTP_ENDPOINT) {
				this.doAjaxSave(payload);
			}
			return this.templatebuilder.trigger('save', payload);
		};

		BuilderView.prototype.getData = function(isString) {
			this.collection.sort();
			var templateProperty = this.templateProperty.toJSON();

			var queryColumns = this.queryConditionModel.toJSON();
			var templates = this.collection.toJSON();

			var data = $.extend(templateProperty, queryColumns, {
				templates : templates
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
			var b = this.checkTemplate();
			if (b)
				return;
			var _this = this, formKey = this.options.formKey;
			var loading = DialogUtil.load("保存中...");
			return $.ajax({
						url : Templatebuilder.options.HTTP_ENDPOINT,
						type : Templatebuilder.options.HTTP_METHOD,
						data : {
							data : payload
						},
						success : function(data) {
							DialogUtil.close(loading);
							var result = JSON.parse(data);
							if (result.result == 1) {
								_this.formSaved = true;
								DialogUtil
										.confirm(
												result.message + ',是否继续操作',
												function(rtn) {
													if (_this.options.callback)
														_this.options
																.callback(rtn);
													if (rtn)
														window.location.href = __ctx
																+ "/platform/form/formDataTemplate/design.htm?id="
																+ result.id;
													else
														DialogUtil
																.closeDialog();

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

		BuilderView.prototype.checkTemplate = function() {
			var k, v, _ref;
			_ref = this.collection.toJSON();
			if (_ref.length <= 0) {
				DialogUtil.msg("请从左侧拖拽或点击添加模版");
				return true;
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

			DialogUtil
					.dialog({
						content : __ctx
								+ '/platform/form/formDataTemplate/preview.htm',
						params : {
							data : data,
							formData : JSON.parse($("#formData").val()),
							pk : $("#pk").val()
						},
						area : [ '100%', '100%' ],
						maxmin : false,
						title : false
					});
		};

		return BuilderView;

	})(Backbone.View);

	/** *******************************数据模版*********************************************** */
	Templatebuilder = (function() {
		Templatebuilder.helpers = {
			defaultTemplateAttrs : function(template_type, $this) {
				var attrs, _base;
				attrs = {};
				attrs[Templatebuilder.options.LABEL] = Templatebuilder.lang.template_type[template_type];
				attrs[Templatebuilder.options.TEMPLATE_TYPE] = template_type;

				return (typeof (_base = Templatebuilder.dataTempates[template_type]).defaultAttributes === "function" ? _base
						.defaultAttributes(attrs)
						: void 0)
						|| attrs;
			},
			defaultColumnAttrs : function(name) {
				var field = Templatebuilder.response_fields[name];

				var column = {
					label : field.label,
					name : field.name,
					field_options : {}
				};
				return column;
			},
			/**
			 * 排序字段
			 */
			defaultSortColumnAttrs : function(name) {
				var field = Templatebuilder.response_fields[name];

				var column = {
					label : field.label,
					name : field.field_name,
					direction : 'desc'
				};
				return column;
			},
			/**
			 * 查询字段
			 */
			defaultQueryAttrs : function(name) {

				var field = Templatebuilder.response_fields[name];
				
				var column = {
					label : field.label,
					field_options :  {},
					name : field.name,
					default_value_type : 'fixed',
					default_value : ''
				};
				return column;
			},
			defaultButtonAttrs : function(type) {
				var button = {
					label : Templatebuilder.lang.buttons[type],
					button_type : type
				};
				return button;
			},
			defaultEditButtonAttrs : function(type) {
				var button = {
					label : Templatebuilder.lang.editbuttons[type],
					button_type : type
				};
				return button;
			},
			simple_format : function(x) {
				// 把\n 替换成br
				return x != null ? x.replace(/\n/g, '<br />') : void 0;
			}
		};

		Templatebuilder.dataTempates = {};

		Templatebuilder.fields = [];

		Templatebuilder.response_fields = {};
		
		Templatebuilder.origin_fields = [];

		Templatebuilder.registerDataTempate = function(name, opts) {
			var x, _i, _len, _ref5;
			_ref5 = [ 'view', 'edit' ];
			for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
				x = _ref5[_i];
				opts[x] = _.template(opts[x]);
			}
			opts.template_type = name;

			Templatebuilder.dataTempates[name] = opts;

			// if ( opts.type === 'non_input') {
			// return Templatebuilder.nonInputTemplates[name] = opts;
			// } else {
			// return Templatebuilder.inputTemplates[name] = opts;
			// }

		};

		function Templatebuilder(opts) {
			var args;
			if (opts == null) {
				opts = {};
			}
			Templatebuilder.fields = _.filter(
							opts.fields,
							function(field) {
								return (field.field_type == 'table' || field.field_type == 'desc'
									|| field.field_type == 'tab_break' || field.field_type == 'label') ? false
										: true;
							});

			_.each(opts.fields, function(field) {
				Templatebuilder.response_fields[field.name] = field;
			});
			
			Templatebuilder.origin_fields = opts.fields;

			_.extend(this, Backbone.Events);
			args = _.extend(opts, {
				templatebuilder : this
			});
			this.mainView = new BuilderView(args);
		}

		return Templatebuilder;

	})();

	window.Templatebuilder = Templatebuilder;

	if (typeof module !== "undefined" && module !== null) {
		module.exports = Templatebuilder;
	} else {
		window.Templatebuilder = Templatebuilder;
	}

}).call(this);

(function() {
	Templatebuilder.options = {
		BUTTON_CLASS : 'tb-button',
		HTTP_ENDPOINT : __ctx + '/platform/form/formDataTemplate/save.htm',
		HTTP_METHOD : 'POST',
		NAME : 'name',
		LABEL : 'label',
		TEMPLATE_TYPE : 'template_type',
		QUERY_CONDITION : 'query_condition',
		DISPLAY_COLUMNS : 'display_columns',
		FILTER_CONDITIONS : 'filter_conditions',
		SORT_COLUMNS : 'sort_columns',
		EXPORT_COLUMNS : 'export_columns',
		FUNCTION_BUTTONS : 'function_buttons',
		EDIT_BUTTONS : 'edit_buttons',
		INIT_QUERY : 'init_query',
		DEFAULT_FILTER : 'default_filter',
		NEED_PAGE : 'need_page',
		TYPE_ID:"typeId",
		TYPE_NAME:"typeName",
		FORM_KEY:'formKey',
		FORM_NAME:'formName',
		//树形的数据
		ID_NAME: 'display_columns.id_name',
		ID_COMMENT: 'display_columns.id_comment',
		
		TEXT_NAME: 'display_columns.text_name',
		TEXT_COMMENT: 'display_columns.text_comment',
		
		PID_NAME: 'display_columns.pid_name',
		PID_COMMENT: 'display_columns.pid_comment',
		
		TOP_VALUE: 'display_columns.top_value',
		TOP_DISPLAY_VALUE: 'display_columns.top_display_value',
		IS_SCRIPT: 'display_columns.is_script',
		
		attrs:{
			FLOW_KEY:"attrs.flow_key",
			FLOW_NAME:"attrs.flow_name",
			PRINT_ID:"attrs.print_id",
			PRINT_NAME:"attrs.print_name",
			SCRIPT:"attrs.script"
		}
	};
}).call(this);

/** *******************************国际化*********************************************** */
(function() {
	Templatebuilder.lang = {
		dict : {
			untitled : '未命名',
			ALL_CHANGES_SAVED : '已经保存',
			SAVE_FORM : '保存表单',
			UNSAVED_CHANGES : '您的表单有些修改尚未保存,是否确定离开？'
		},
		template_type : {
			datatable : '数据列表',
			treeForm:'左树右表单'
		},
		editbuttons : {
			'close' : '关闭',
			'save' : '保存',
			'startFlow' : '启动流程',
			'print' : '打印',
			'custom':'[自定义]'
		},
		buttons : {
			'search' : '搜索',
			'resetSearch' : '重置',
			'moreSearch':'更多',
			'add' : '添加',
			'remove' : '删除',
			"edit" : '编辑',
			'detail' : '明细',
			'print' : '打印',
			'batchModify' : '批量修改',
			'import' : '导入',
			'export' : '导出',
			'startFlow' : '启动流程',
			'custom':'[自定义]'
		}
	};
}).call(this);

/** *****************************TODO 注册模版************************************* */
/**
 * 注册模版 </br> alias 注册字段别名 order 组内序号 group : 分组 如果不填默认是common view : 预览字段 html
 * edit : 编辑字段 html addButton ：添加字段按钮 defaultAttributes ： 默认值 function
 * 
 */

/**
 * 数据表格
 */
(function() {
	var alias = 'datatable';
	Templatebuilder
			.registerDataTempate(
					alias,
					{
						order : 1,// 组内序号
						view : "<%= Templatebuilder.templates['view/datatable']({rf:rf}) %>",
						edit : "<%= Templatebuilder.templates['edit/common']({rf:rf,initQuery:true,defaultFilter:true,needPage:true}) %>\n"
							
								+ "<%= Templatebuilder.templates['edit/display-field']({rf:rf}) %>\n"
								+ "<%= Templatebuilder.templates['edit/filter-condition']({rf:rf}) %>\n"
								+ "<%= Templatebuilder.templates['edit/sort-field']({rf:rf}) %>\n"
								+ "<%= Templatebuilder.templates['edit/function-button']({rf:rf}) %>\n"
								+ "<%= Templatebuilder.templates['edit/edit-button']({rf:rf}) %>\n"
								+ "<%= Templatebuilder.templates['edit/extend-setting']({rf:rf}) %>\n",
						addTemplate : "<span class='symbol'><span class='fa fa-table'></span> "
								+ Templatebuilder.lang.template_type[alias]
								+ "</span>",
						defaultAttributes : function(attrs) {// 默认值
							attrs[Templatebuilder.options.INIT_QUERY] = 'Y';
							attrs[Templatebuilder.options.DEFAULT_FILTER] = 'Y';
							attrs[Templatebuilder.options.NEED_PAGE] = 'Y';
							attrs[Templatebuilder.options.FUNCTION_BUTTONS] = [
									{
										button_type : "add",
										label : "添加"
									}, {
										button_type : "edit",
										label : "编辑"
									}, {
										button_type : "remove",
										label : "删除"
									}, {
										button_type : "detail",
										label : "明细"
									} ];

							attrs[Templatebuilder.options.EDIT_BUTTONS] = [ {
								button_type : "close",
								label : "关闭"
							}, {
								button_type : "save",
								label : "保存"
							} ];
							return attrs;
						}
					});

}).call(this);


/**
 * 左树右表单
 */
(function() {
	var alias = 'treeForm';
	Templatebuilder
			.registerDataTempate(
					alias,
					{
						order : 1,// 组内序号
						view : "<%= Templatebuilder.templates['view/treeForm']({rf:rf}) %>",
						edit : "<%= Templatebuilder.templates['edit/common']({rf:rf}) %>\n"
								+"<%= Templatebuilder.templates['edit/tree-display-field']({rf:rf}) %>\n"
								+ "<%= Templatebuilder.templates['edit/edit-button']({rf:rf}) %>\n",
						addTemplate : "<span class='symbol'><span class='fa fa-tree'></span> "
								+ Templatebuilder.lang.template_type[alias]
								+ "</span>",
						defaultAttributes : function(attrs) {// 默认值
							attrs[Templatebuilder.options.INIT_QUERY] = 'Y';
							attrs[Templatebuilder.options.DEFAULT_FILTER] = 'Y';
							attrs[Templatebuilder.options.NEED_PAGE] = 'Y';
							
							attrs[Templatebuilder.options.FUNCTION_BUTTONS] = [
									{
										button_type : "add",
										label : "添加"
									}, {
										button_type : "edit",
										label : "编辑"
									}, {
										button_type : "remove",
										label : "删除"
									} ];

							attrs[Templatebuilder.options.EDIT_BUTTONS] = [{
								button_type : "save",
								label : "保存"
							} ];
							return attrs;
						}
					});

}).call(this);


/** ***************************TODO 模版***************************** */
this["Templatebuilder"] = this["Templatebuilder"] || {};
this["Templatebuilder"]["templates"] = this["Templatebuilder"]["templates"]
		|| {};

// TODO=================================数据模版====================
/**
 * 添加数据模版
 */
this["Templatebuilder"]["templates"]["partials/data_template"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		_
				.each(
						_.sortBy(Templatebuilder.dataTempates, 'order'),
						function(g, i) {
							;
							__p += '\n        <a data-template-type="'
									+ ((__t = (g.template_type)) == null ? ''
											: __t)
									+ '" class="btn  btn-info btn-narrow '
									+ ((__t = (Templatebuilder.options.BUTTON_CLASS)) == null ? ''
											: __t)
									+ '">\n          '
									+ ((__t = (g.addTemplate)) == null ? ''
											: __t) + '\n        </a>\n      ';
						});

	}
	return __p;
};

// ----------------------------------------------编辑模版---------------------------------------------------------
/**
 * 编辑-基础模版
 */
this["Templatebuilder"]["templates"]["edit/base"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		// 个性化设置
		__p += ((__t = (Templatebuilder.dataTempates[rf
				.get(Templatebuilder.options.TEMPLATE_TYPE)].edit({
			rf : rf
		}))) == null ? '' : __t)
				+ '\n';
	}
	return __p
};



/**
 * 模版属性
 */
this["Templatebuilder"]["templates"]["edit/common"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join, __type = 'datatable';
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__type = rf.get("template_type");
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading row"  data-toggle="collapse" data-target="#templateProperty">'
				+ '<div class="pull-left" >'
				+ Templatebuilder.lang.template_type[__type]
				+ '</div>'
				+ '</div>\n'
				+ '<div class="panel-body collapse in" id="templateProperty" >\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="form-group">' + '<label >模版名称:</label>'
				+ '<input type="text"  data-rv-input="model.'
				+ ((__t = (Templatebuilder.options.LABEL)) == null ? '' : __t)
				+ '"  />' + '</div>';
		
		if (typeof initQuery !== 'undefined') {;
			__p += '<div class="form-group">'
					+ '<label>初始化是否查询：</label>'
					+ '<select data-rv-value="model.'
					+ ((__t = (Templatebuilder.options.INIT_QUERY)) == null ? ''
							: __t) + '" >' + '<option value="Y">是</option>'
					+ ' <option value="N">否</option>' + '</select>' + '</div>';
		}
		if (typeof defaultFilter !== 'undefined') {;
			__p += '<div class="form-group">'
					+ '<label>默认过滤：</label>'
					+ '<select data-rv-value="model.'
					+ ((__t = (Templatebuilder.options.DEFAULT_FILTER)) == null ? ''
							: __t) + '" >' + '<option value="Y">是</option>'
					+ ' <option value="N">否</option>' + '</select>' + '</div>';
		}
		if (typeof needPage !== 'undefined') {;
			__p += '<div class="form-group">'
					+ '<label>是否需要分页：</label>'
					+ '<select data-rv-value="model.'
					+ ((__t = (Templatebuilder.options.NEED_PAGE)) == null ? ''
							: __t) + '" >' + '<option value="Y">是</option>'
					+ ' <option value="N">否</option>' + '</select>' + '</div>';
		}

		/*
		 * __p +='<div class="form-group">'+ '<label>分页大小：</label>'+ '<select
		 * data-rv-value="model.'+ ((__t = ( Templatebuilder.options.PAGE_SIZE)) ==
		 * null ? '' : __t) + '" >'+ '<option value="10">10</option>'+ '
		 * <option value="20">20</option>'+ ' <option value="50">50</option>'+ '
		 * <option value="100">100</option>'+ '</select>'+ '</div>';
		 */

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};
/**
 * 显示字段---树形
 */
this["Templatebuilder"]["templates"]["edit/tree-display-field"] = function(
		obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'
				+ '		<div class="panel-heading row"  data-toggle="collapse" >'
				+ '		<div class="pull-left" >树形-显示字段</div></div>';

		__p += '<div class="panel-body collapse in"  id="displayColumns">\n'
				+ '	<div class="panel-body-content">';

		__p += '<div class="form-group">'
				+ '<label >ID字段:</label>'
				+ '<select data-rv-value="model.'
				+ ((__t = (Templatebuilder.options.ID_NAME)) == null ? ''
						: __t)
				+ '" >';
				_.each(Templatebuilder.fields,function(g, i) {;
					__p += 	 '<option value="'
						+ g.field_name + '">' + g.label + '</option>'
						});
		__p += '</select></div>';

		__p += '<div class="form-group">'
				+ '<label >父ID字段:</label>'
				+ '<select data-rv-value="model.'
				+ ((__t = (Templatebuilder.options.PID_NAME)) == null ? ''
						: __t)
				+ '" >';
				_.each(Templatebuilder.fields,function(g, i) {;
					__p += 	 '<option value="'
						+ g.field_name + '">' + g.label + '</option>'
						});
		__p += '</select></div>';
			

		__p += '<div class="form-group">'
				+ '<label >显示字段:</label>'
				+ '<select data-rv-value="model.'
				+ ((__t = (Templatebuilder.options.TEXT_NAME)) == null ? ''
						: __t)
				+ '" >';
				_.each(Templatebuilder.fields,function(g, i) {;
					__p += 	 '<option value="'
						+ g.field_name + '">' + g.label + '</option>'
						});
		__p += '</select></div>';
		
		__p += '<div class="form-group">'
				+ '<label >顶级父类ID值:</label>'
				+ '<textarea data-rv-input=\'model.'
				+ ((__t = (Templatebuilder.options.TOP_VALUE)) == null ? ''
						: __t) + '\' ></textarea>' + '</div>';

		__p += '<div class="form-group">'
				+ '<label >顶级父类显示值:</label>'
				+ '<textarea data-rv-input=\'model.'
				+ ((__t = (Templatebuilder.options.TOP_DISPLAY_VALUE)) == null ? ''
						: __t) + '\' ></textarea>' + '</div>';

		__p += '<div class="form-group">'
				+ '<div class="checkbox">'
				+ '<label><input type="checkbox" data-rv-checked="model.'
				+ ((__t = (Templatebuilder.options.IS_SCRIPT)) == null ? ''
						: __t) + '" />父类值来源是否groovy脚本</label>' + '</div>'
				+ '</div>';

		__p += ' 		</div>' + ' 	</div>' + ' </div>';
	}
	return __p
};
/**
 * 显示字段
 */
this["Templatebuilder"]["templates"]["edit/display-field"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading row"  data-toggle="collapse" >'
				+ '<div class="pull-left" >显示字段</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle add-column fa fa-add"  data-toggle="dropdown"  title="添加字段"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >';
		_
				.each(
						Templatebuilder.fields,
						function(g, i) {
							;
							__p += '<li><a href="javascript:void(0);"   class="js-add-display-column" data-name="'
									+ g.name + '" >' + g.label + '</a></li>';
						});
		__p += '</ul></div>';

		__p += '<div  class="pull-right divider-line ">'
				+ '<div class="dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle fa fa-shield js-rights"  data-toggle="dropdown" title="权限设置"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights"  data-rights="display"  data-type="none" >无</a></li>'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights"  data-rights="display"  data-type="all" >所有人</a></li>'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights"  data-rights="display"  data-type="custom" >自定义</a></li>'
				+ '</ul>' + '</div>' + '</div></div></div>\n';

		__p += '<div class="panel-body collapse in"  id="displayColumns">\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="display-columns columns"><div class="display-column column"  data-rv-each-column=\'model.'
				+ ((__t = (Templatebuilder.options.DISPLAY_COLUMNS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="column:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-display-column fa fa-cog"></i>'
				+ '<i data-role="remove_choice" class="js-remove-display-column fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-display-column  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};

/**
 * 过滤条件
 */
this["Templatebuilder"]["templates"]["edit/filter-condition"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading row">'
				+ '<div class="pull-left" >过滤条件</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left">'
				+ '<a href="javascript:void(0)" class="btn-action fa fa-add js-add-filter-condition"  title="添加条件"></a>';
		__p += '</div>\n';

		__p += '<div  class="pull-right divider-line ">'
				+ '<div class="dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle fa fa-shield js-rights"  data-toggle="dropdown" title="权限设置"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights" data-rights="filter" data-type="none" >无</a></li>'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights" data-rights="filter" data-type="all" >所有人</a></li>'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights" data-rights="filter" data-type="custom" >自定义</a></li>'
				+ '</ul>' + '</div>' + '</div></div></div>\n';

		__p += '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="filter-conditions columns"><div class="filter-condition column"  data-rv-each-condition=\'model.'
				+ ((__t = (Templatebuilder.options.FILTER_CONDITIONS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="condition:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-filter-condition fa fa-cog"></i>'
				+ '<i data-role="remove_choice" class="js-remove-filter-condition fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-filter-condition  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};

/**
 * 排序字段
 */
this["Templatebuilder"]["templates"]["edit/sort-field"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading row"  data-toggle="collapse" >'
				+ '<div class="pull-left" >排序字段</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle add-column fa fa-add"  data-toggle="dropdown"  title="添加字段"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >';
		_
				.each(
						Templatebuilder.fields,
						function(g, i) {
							;
							__p += '<li><a href="javascript:void(0);"   class="js-add-sort-column" data-name="'
									+ g.name + '" >' + g.label + '</a></li>';
						});
		__p += '</ul></div>';

		__p += '</div></div>\n';

		__p += '<div class="panel-body collapse in"  id="displayColumns">\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="sort-columns columns"><div class="sort-column column"  data-rv-each-column=\'model.'
				+ ((__t = (Templatebuilder.options.SORT_COLUMNS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" ><span  data-rv-text="column:label"></span>\n  '
				+ '  <span data-rv-show="column:direction | eq asc" style="color: #8a6d3b;">升序</span> '
				+ '<span   data-rv-show="column:direction | eq desc" style="color: #8a6d3b;">降序</span></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-sort-column js-setting-sort-column-asc fa  fa-arrow-circle-down" title="设置降序" data-rv-show="column:direction | eq asc"></i>'
				+' <i data-role="setting_choice" class="js-setting-sort-column  js-setting-sort-column-desc fa  fa-arrow-circle-up" title="设置升序"  data-rv-show="column:direction | eq desc"></i>'
				+ '<i data-role="remove_choice" class="js-remove-sort-column fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-sort-column  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};

/**
 * 排序字段
 */
this["Templatebuilder"]["templates"]["edit/extend-setting"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'+
		'<div class="panel-heading">扩展属性</div>\n'+
			'<div class="panel-body collapse in" >\n'+
				'<div class="panel-body-content">';

			// ==============导出字段=====
			__p += '<div class="form-group">'+
				'<label>导出字段:</label>'+
				'<a class="btn btn-sm btn-info btn-block  js-export-column mt-5"  >设置导出字段</a>'+
			'</div>\n';
			
			
			__p += 		'</div>'+
			' </div>'+
			' </div>';
	}
	return __p
};

/**
 * 功能按钮
 */
this["Templatebuilder"]["templates"]["edit/function-button"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading row">'
				+ '<div class="pull-left" >功能按钮</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle fa fa-add add-button"  data-toggle="dropdown"  title="添加按钮"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >';
		_
				.each(
						Templatebuilder.lang.buttons,
						function(g, i) {
							;
							__p += '<li><a href="javascript:void(0);"   class="js-add-function-button"  data-button_type="'
									+ i
									+ '">'
									+ Templatebuilder.lang.buttons[i]
									+ '</a></li>';
						});
		__p += '</ul></div>';

		__p += '<div  class="pull-right divider-line ">'
				+ '<div class="dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle fa fa-shield js-rights"  data-toggle="dropdown" title="权限设置"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights"  data-rights="button" data-type="none" >无</a></li>'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights"  data-rights="button" data-type="all" >所有人</a></li>'
				+ '<li><a href="javascript:void(0);"   class=" js-setting-rights" data-rights="button" data-type="custom" >自定义</a></li>'
				+ '</ul>' + '</div>' + '</div></div></div>\n';

		__p += '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="function-buttons columns"><div class="function-button column"  data-rv-each-button=\'model.'
				+ ((__t = (Templatebuilder.options.FUNCTION_BUTTONS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="button:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-function-button fa fa-cog"></i>'
				+ '<i data-role="remove_choice" class="js-remove-function-button fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-function-button  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';

	}
	return __p
};

/**
 * 编辑按钮
 */
this["Templatebuilder"]["templates"]["edit/edit-button"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading row">'
				+ '<div class="pull-left" >编辑页操作按钮</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle fa fa-add add-button"  data-toggle="dropdown"  title="添加按钮"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >';
		_
				.each(
						Templatebuilder.lang.editbuttons,
						function(g, i) {
							;
							__p += '<li><a href="javascript:void(0);"   class="js-add-edit-button"  data-button_type="'
									+ i
									+ '">'
									+ Templatebuilder.lang.editbuttons[i]
									+ '</a></li>';
						});
		__p += '</ul></div>';

		__p += '<div  class="pull-right divider-line ">'
				+ '<div class="dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle fa fa-shield js-rights"  data-toggle="dropdown" title="权限设置"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights"  data-rights="edit" data-type="none" >无</a></li>'
				+ '<li><a href="javascript:void(0);"   class="js-setting-rights"  data-rights="edit" data-type="all" >所有人</a></li>'
				+ '<li><a href="javascript:void(0);"   class=" js-setting-rights" data-rights="edit" data-type="custom" >自定义</a></li>'
				+ '</ul>' + '</div>' + '</div></div></div>\n';

		__p += '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="edit-buttons columns"><div class="edit-button column"  data-rv-each-button=\'model.'
				+ ((__t = (Templatebuilder.options.EDIT_BUTTONS)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="button:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-edit-button fa fa-cog"></i>'
				+ '<i data-role="remove_choice" class="js-remove-edit-button fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-edit-button  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';

	}
	return __p
};

// TODO=================================预览视图====================

/**
 * 所有控件基础
 */
this["Templatebuilder"]["templates"]["view/base"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {

		// 模版 文本
		__p += ((__t = (Templatebuilder.templates['view/label']({
			rf : rf
		}))) == null ? '' : __t) + '\n\n  ';
		// 模版内容
		__p += '<div class="template-content">'
				+ ((__t = (Templatebuilder.dataTempates[rf
						.get(Templatebuilder.options.TEMPLATE_TYPE)].view({
					rf : rf
				}))) == null ? '' : __t) + '</div>\n\n';

		// 删除
		__p += ((__t = (Templatebuilder.templates['view/remove']({
			rf : rf
		}))) == null ? '' : __t) + '\n';

	}
	return __p
};

/**
 * 预览界面- label
 */
this["Templatebuilder"]["templates"]["view/label"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="template-head">\n '
				+ '<div class="template-head-label">'
				+ ((__t = (Templatebuilder.helpers.simple_format(rf
						.get(Templatebuilder.options.LABEL)))) == null ? ''
						: __t) + ' </div>\n  ';

		__p += '<div class="template-tools"  >\n' +

		'</div>\n';

		__p += '</div>\n';
	}
	return __p
};
/**
 * 删除
 */
this["Templatebuilder"]["templates"]["view/remove"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {

		__p += '<div class=\'actions-wrapper\'>\n  <a class="js-clear '
				+ ((__t = (Templatebuilder.options.BUTTON_CLASS)) == null ? ''
						: __t)
				+ '" data-role="delete_template"  title="删除"><i class=\'fa fa-delete\'></i></a>\n</div>'

	}
	return __p
};

this["Templatebuilder"]["templates"]["view/datatable"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		var columns = rf.get(Templatebuilder.options.DISPLAY_COLUMNS);
		__p += '<div class="data-table">';

		if (columns && columns.length > 0) {
			;
			width = 200 * columns.length >= 1000 ? 200 * columns.length : 1000;
			__p += '<ul  class="column-list" style="width: ' + width + 'px;">';
			_.each(columns, function(g, i) {
				;
				if (_.isEmpty(g) || g.length == 0)
					return true;
				column = new Backbone.DeepModel(g);
				__p += '<li  style="opacity: 1;"  class="column" >'
						+ '<label class="label-name">' + g.label + '</label>'
						+ '<div class="column-content">&nbsp;' +

						'</div>' + '</li>';
			});
			__p += ' </ul>';
		} else {
			;
			__p += '<div  class="no-column">' + '<span >您尚未创建任何字段。</span>'
					+ '<br><span >请添加字段</span>' + '</div>';

		}
		;
		__p += '</div>\n';
	}
	return __p
};

this["Templatebuilder"]["templates"]["view/treeForm"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="data-table">';
		__p += '左树右表单';
		__p += '</div>\n';
	}
	return __p
};


// 表单属性区域
this["Templatebuilder"]["templates"]["edit/template-property"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading">模版属性</div>\n'
				+ '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';
		__p += '<div class="form-group">'
				+ '<label >模版标题<span class="required">*</span></label>'
				+ '<input type="text" id="templateName"   data-rv-input="model.'
				+ ((__t = (FormOptions.t.propertys.NAME)) == null ? '' : __t)
				+ '"  />' + '</div>';

		__p += '<div class="form-group">'
				+ '<label >模版分类</label>'
				+ '<div style="position: relative;"><input type="hidden" id="typeId" data-rv-value="model.'
				+ ((__t = (FormOptions.t.propertys.TYPE_ID)) == null ? '' : __t)
				+ '"  />'
				+ '<input type="text" class="form-control dropdownTree" data-rv-value="model.'
				+ ((__t = (FormOptions.t.propertys.TYPE_NAME)) == null ? ''
						: __t)
				+ '"  readonly  id="typeName" name="typeName" data-toggle="dropdownTree"  data-type="FORM_TYPE" data-id="#typeId"'
				+ '"  />' + '</div></div>';
		

		__p += '<div class="form-group">'
				+ '<label >数据来源<span class="required">*</span></label>'
				+ '<select data-rv-value="model.dataSource">'
				+ '<option value="singleTable">单表</option>'
				+ '<option value="moreTable">多表</option>' + '</select>'
				+ '</div>';
		__p += '<div class="form-group">'
				+ '<label >表单<span class="required">*</span></label>'
				+ '<div class="select-list "  >'
				+ '<div data-rv-show="model.formKey">'
				+ '<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.formName" class="select-name"></span></div>'
				+ '<div class="actions select-actions pull-right" style="display: none;">'
				+ '<a class="rechoose-link   js-select-form"  data-role="rechoose"   href="javascript:void(0)" >重选</a> |'
				+ '<a class="delete-link  js-remove-form" data-role="remove"  href="javascript:void(0)" >删除</a>| '
				+ '<a class="rights-link   js-rights-form"  data-role="rights"   href="javascript:void(0)" >权限</a>'
				+ '</div>'
				+ '</div>'
				+ '<label class="js-select-form"   data-rv-hide="model.formKey"><div class="plus">+</div>'
				+ '<div class="select-empty"> 请选择表单</div>' + '</label>'
				+ '</div>' + '</div>';

		__p += '<div class="form-group">'
				+ '<label >绑定流程</label>'
				+ '<div class="select-list "  >'
				+ '<div data-rv-show="model.attrs.flow_name">'
				+ '<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.attrs.flow_name" class="select-name"></span></div>'
				+ '<div class="actions select-actions pull-right" style="display: none;">'
				+ '<a class="rechoose-link   js-select-flow"  data-role="rechoose"   href="javascript:void(0)" >重选</a> |'
				+ '<a class="delete-link  js-remove-flow" data-role="remove"  href="javascript:void(0)" >删除</a> '
				+ '</div>'
				+ '</div>'
				+ '<label class="js-select-flow" data-rv-hide="model.attrs.flow_key"><div class="plus">+</div>'
				+ '<div class="select-empty">请选择流程</div>' + '</label>'
				+ '</div>' + '</div>';
		
		
		__p += '<div class="form-group">'
			+ '<label >打印模版<span class="required">*</span></label>'
			+ '<div class="select-list "  >'
			+ '<div data-rv-show="model.attrs.print_name">'
			+ '<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.attrs.print_name" class="select-name"></span></div>'
			+ '<div class="actions select-actions pull-right" style="display: none;">'
			+ '<a class="rechoose-link   js-select-print-template"  data-role="rechoose"   href="javascript:void(0)" >重新选择</a> |'
			+ '<a class="delete-link  js-remove-print-template" data-role="remove"  href="javascript:void(0)" >删除</a> '
			+ '</div>'
			+ '</div>'
			+ '<label class="js-select-print-template" data-rv-hide="model.attrs.print_id"><div class="plus">+</div>'
			+ '<div class="select-empty">请选择打印模版</div>' + '</label>'
			+ '</div>' + '</div>';

		/*
		 * __p += '<div class="form-group">'+ '<label>表单权限</label>'+ '<select
		 * data-rv-value="model.dataSource">'+ '<option value="singleTable">单表</option>'+ '<option
		 * value="moreTable">多表</option>'+ '</select>'+ '</div>';
		 */

		__p += ' </div>' + ' </div>' + ' </div>';
		
	    // ==============模版脚本=====
		   __p += '<div class="setting-panel panel">\n'+
	   					'<div class="panel-heading">模版脚本</div>\n'+
	   						'<div class="panel-body collapse in" >\n'+
	   							'<div class="panel-body-content">';
	   						__p += '<a class="btn btn-sm  btn-block  btn-info js-template-script mt-5" >设置模版脚本</a>';
			  __p += 	'</div>'+
					' </div>'+
				' </div>';
	}
	return __p
};

// TODO=================================查询条件视图====================

// 查询条件页面
this["Templatebuilder"]["templates"]["view/query-condition"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="query-title" data-toggle="collapse" data-target="#query-condition"><i class="fa fa-filter"></i>设置查询条件</div>';

		__p += '<div id="query-condition" class="collapse "></div>'
	}
	return __p
};

// 查询条件编辑设置
this["Templatebuilder"]["templates"]["edit/query-condition"] = function(obj) {

	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() {
		__p += __j.call(arguments, '')
	}
	with (obj) {
		__p += '<div class="setting-panel panel">\n'
				+ '<div class="panel-heading row">'
				+ '<div class="pull-left" >查询条件字段</div>'
				+ '<div class="pull-right">'
				+ '<div class="pull-left  dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle add-column fa fa-add  "  data-toggle="dropdown"  title="添加字段"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >';
		_
				.each(
						Templatebuilder.fields,
						function(g, i) {
							;
							__p += '<li><a href="javascript:void(0);"   class="js-add-query-condition" data-name="'
									+ g.name + '" >' + g.label + '</a></li>';
						});

		__p += '</ul></div>';

		__p += '<div  class="pull-right divider-line ">'
				+ '<div class="dropdown">'
				+ '<a href="javascript:void(0)" class="btn-action dropdown-toggle fa fa-shield js-setting-rights "  data-toggle="dropdown" title="权限设置"></a>'
				+ '<ul class="dropdown-menu dropdown-menu-right  float-right" role="menu" >'
				+ '<li><a href="javascript:void(0);"   class="js-setting-query-rights" data-type="none" >无</a></li>'
				+ '<li><a href="javascript:void(0);"   class="js-setting-query-rights" data-type="all" >所有人</a></li>'
				+ '<li><a href="javascript:void(0);"   class="js-setting-query-rights" data-type="custom" >自定义</a></li>'
				+ '</ul>' + '</div>' + '</div></div></div>\n';
		__p += '<div class="panel-body collapse in" >\n'
				+ '<div class="panel-body-content">';

		__p += '<div class="query-conditions columns"><div class="query-condition column"  data-rv-each-condition=\'model.'
				+ ((__t = (Templatebuilder.options.QUERY_CONDITION)) == null ? ''
						: __t)
				+ '\'>\n'
				+ '  <div class="label-wrap" data-rv-text="condition:label" ></div>\n  '
				+ '<div class="actions">'
				+ '<i data-role="setting_choice" class="js-setting-query-condition fa fa-cog"></i>'
				+ '<i data-role="remove_choice" class="js-remove-query-condition fa fa-minus-circle"></i>'
				+ '<i data-role="sort_choice" class=" js-sort-query-condition  fa fa-bars ui-sortable-handle "></i>'
				+ '</div>' + '</div>';

		__p += ' </div>' + ' </div>' + ' </div>';
	}
	return __p
};
