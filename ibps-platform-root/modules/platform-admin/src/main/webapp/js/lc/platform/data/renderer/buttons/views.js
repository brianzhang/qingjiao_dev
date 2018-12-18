// TODO 按钮渲染
(function() {
	var i, _i, _j, _len, _len1, _ref, _ref1;
		var $, _str;
		$ = jQuery;
		_str = _.str;

	DataTemplateRenderer.Views.ResponseButton = Backbone.View
			.extend({
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
					
					//前置事件
					r = this._beforSubmitResult(this.getActionCode());
					if (r)
						return this;

					if (this.onClick) {
						var r = this.onClick(e);
						if (r)
							return this;
					}
				},
				getActionCode:function (){
					return (this.model.button_type == 'custom' ? (this.model.get("code")|| (this.model.button_type+this.model.get("$index"))) : this.model.button_type);
				},
				//前置事件
				_beforSubmitResult:function(actionCode){
					var params ={};
					params.position = 'toolbar';
					params.templateView =  this.model.template_view;
					// 前置事件
					var beforSubmitResult =  $.JTemplate._beforeSubmit(this,actionCode,params);
					if (typeof (beforSubmitResult) != "undefined"
						&& !beforSubmitResult) {
						return true;
					}
					return false;
				},
				getDomId : function() {
					return this.cid;
				},
				getGridCheckedId : function(grid) {
					return grid.jqGrid('getGridParam', 'selarrrow');
				},
				getGridKeyName : function(grid) {
					return grid.jqGrid('getGridParam', 'keyName');
				},
				getOptionsAttrs:function(key){
					return this.model.options?this.model.options[key]:null;
				},
				getTemplateKey: function(){
					return  this.getOptionsAttrs("template_key")||"";
				},
				getFormKey: function(){
					return  this.getOptionsAttrs("form_key")||"";
				},
				getPrintId:function(){
					return this.getOptionsAttrs("print_id")||"";
				},
				getFlowKey:function(){
					return this.getOptionsAttrs("flow_key")||"";
				},
				getEditButtons:function(){
					return this.getTemplateModel().get("buttons.edit_buttons");
				},
				getTemplateModel:function(){
					return this.model.template_model;
				},
				getTemplateView:function(){
					return this.model.template_view;
				},
				getView:function(){
					return this.getTemplateView().$view;
				}
			});

	DataTemplateRenderer.Views.ResponseButtonSearch = DataTemplateRenderer.Views.ResponseButton
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
				searchData : function(data) {
					var templateModel = this.getTemplateModel();
					if (templateModel.template_type == 'list') {
						this.getView().jqGrid('setGridParam', {
							postData : data, // 发送数据
							page : 1
						}).trigger("reloadGrid"); // 重新载入
					}
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
	DataTemplateRenderer.Views.ResponseButtonResetSearch= DataTemplateRenderer.Views.ResponseButtonSearch.extend({
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
	DataTemplateRenderer.Views.ResponseButtonMoreSearch= DataTemplateRenderer.Views.ResponseButtonSearch.extend({
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
	    		content:__ctx+'/platform/data/dataTemplate/moreSearch.htm',
	    		btn:[{
	            	label: '搜索',
	            	iconCls:'btn btn-primary fa fa-search',
	                action: function(dialog,index) {
	                	var data = DialogUtil.getChildFrameWindow(index).dataTemplateMoreSearch.getData();
                 			if(!data) return;
                 		_this.searchData(data);
	              	  	DialogUtil.close(index);
	                }
	            },{
	            	label: '清空',
	            	iconCls:'btn btn-success fa fa-clean',
	                action: function(dialog,index) {
	                	DialogUtil.getChildFrameWindow(index).dataTemplateMoreSearch.clean();

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
	DataTemplateRenderer.Views.ResponseButtonAdd = DataTemplateRenderer.Views.ResponseButton
			.extend({
				onClick : function() {
					var params =  {
							formKey : this.getFormKey(),
							templateKey:this.getTemplateKey(),
							flowKey :this.getFlowKey(),
							isEdit : true,
							edit_buttons : this.getEditButtons(),
							printId : this.getPrintId()
						};
				
					DataTemplateRenderer.editDialog(this.getTemplateView(),params);
				}
			});

	// 编辑
	DataTemplateRenderer.Views.ResponseButtonEdit = DataTemplateRenderer.Views.ResponseButton
			.extend({
				onClick : function() {
					var ids = this.getGridCheckedId(this.getView());
					if (ids == null || ids.length == 0) {
						DialogUtil.toastr('请选择记录!');
						return false;
					}
					if (ids.length > 1) {
						DialogUtil.toastr('已经选择了多项,请选择一项进行操作!');
						return false;
					}
					
					var params = {
						formKey :this.getFormKey(),
						templateKey:this.getTemplateKey(),
						flowKey :this.getFlowKey(),
						pk : ids[0],
						isEdit : true,
						edit_buttons : this.getEditButtons(),
						printId : this.getPrintId()
					};
					DataTemplateRenderer.editDialog(this.getTemplateView(),params);
				}
			});
	// 明细
	DataTemplateRenderer.Views.ResponseButtonDetail = DataTemplateRenderer.Views.ResponseButton
			.extend({
				onClick : function() {
							var ids = this.getGridCheckedId(this.getView());
							if (ids == null || ids.length == 0) {
								DialogUtil.toastr('请选择记录!');
								return false;
							}
							if (ids.length > 1) {
								DialogUtil.toastr('已经选择了多项,请选择一项进行操作!');
								return false;
							}
							var params = {
								formKey :this.getFormKey(),
								templateKey:this.getTemplateKey(),
								flowKey :this.getFlowKey(),
								pk : ids[0],
								edit_buttons : this.getEditButtons(),
								printId : this.getPrintId()
							};
							DataTemplateRenderer.editDialog(this.getTemplateView(),params);
				}
			});

	// 删除
	DataTemplateRenderer.Views.ResponseButtonRemove = DataTemplateRenderer.Views.ResponseButton
			.extend({
				onClick : function() {
					var ids = this.getGridCheckedId(this.getView());
					if (ids == null || ids.length < 1) {
						DialogUtil.toastr('请选择记录!');
						return false;
					}
					var params = {
						formKey : this.getFormKey(),
						id : ids.join(',')
					};
					DataTemplateRenderer.removeRecord(this.getTemplateView(),params);
				}
			});
	// 打印
	DataTemplateRenderer.Views.ResponseButtonPrint = DataTemplateRenderer.Views.ResponseButton
			.extend({
				onClick : function() {
					var ids = this.getGridCheckedId(this.getView());
					if (ids == null || ids.length == 0) {
						DialogUtil.toastr('请选择记录!');
						return false;
					}
					if (ids.length > 1) {
						DialogUtil.toastr('已经选择了多项,请选择一项进行操作!');
						return false;
					}
					var params = {
						formKey :this.getFormKey(),
						pk : ids[0],
						id : this.getPrintId()
					};
					DataTemplateRenderer.printDialog(params);
				}
			});
	// 导入
	DataTemplateRenderer.Views.ResponseButtonImport = DataTemplateRenderer.Views.ResponseButton
			.extend({
				onClick : function() {
					var fields = this.model.response_fields, formKey = this.getFormKey();
					var $view =  this.getView();
					DialogUtil.dialog({
								content : __ctx
										+ '/platform/form/formDataTemplate/import.htm',
								params : {
									formKey : formKey,
									fields : fields
								},
								area : [ '60%', '80%' ],
								title : "导入数据",
								callback : function(rtn) {
									if (rtn && $view) {
										$view.jqGrid('setGridParam', {
											postData : {}, // 发送数据
											page : 1
										}).trigger("reloadGrid"); // 重新载入
										
									}
								}
							});
				}
			});

	// 导出
	DataTemplateRenderer.Views.ResponseButtonExport = DataTemplateRenderer.Views.ResponseButton
			.extend({
				events : _.extend({},DataTemplateRenderer.Views.ResponseButton.prototype.events,
								{
									'click [data-action]' : 'doAction'
								}),
				className : 'btn-group dropdown',
				onClick : function() {
					return false;
				},
				doAction : function(e) {
					var _this =this,
						$el = $(e.currentTarget),
						action = $el.data("action"), 
						params = {}, ids,
						curView = this.getView(),
						templateModel = this.getTemplateModel();
					//前置脚本
					var r = this._beforSubmitResult(action);
					if (r)
						return this;

					if (action == 'exportSelected') { //导出选择的记录
						ids = this.getGridCheckedId(curView);
						if (ids == null || ids.length == 0) {
							DialogUtil.toastr('请选择记录!');
							return false;
						}
						params.ids = ids.join(",");
					} else {
						var gridParam = curView.jqGrid('getGridParam');
						params.page = gridParam.page;
						params.rows = gridParam.rowNum;
					}

					params.response_data = JSON.stringify(templateModel.response_data);
					params.action = action;
					var exportColumns = templateModel.get("export_columns")||{};
					var isSelectField  = exportColumns?(exportColumns["select_field"] ==  'Y'?true:false):false;
					if(isSelectField){
						this.selectFieldDialog(params,exportColumns);
					}else{
						this.doExport(params);
					}
				},
				selectFieldDialog: function(params,d){
					var exportData ={
							export_type:d.export_type||'page'
					};
					var _this =this;
					DialogUtil.dialog({
			    		title:'导出字段勾选',
			    		area: ['20%', '90%'],
			    		params: {
			    			data : $.extend(true, [], d.fields)
			    		},
			    		content:__ctx+'/platform/data/dataTemplate/selectField.htm',
			    		btn:[{
			            	label: '确定',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  	var data = DialogUtil.getChildFrameWindow(index).dataTemplateSelectField.getData();
			              	
			              	  	if(!data) return;
			              	  	exportData["fields"] = data;
								params.export_columns =  JSON.stringify(exportData);
								
								_this.doExport(params);
								
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
				},
				doExport:function(params){
					var form = $('#exportForm');
					form.empty();
					for ( var key in params) {
						var input =  $('<textarea  name="'+key+'" rows="0" cols="0" style="display: none;">'+ params[key] + '</textarea>');
						form.append(input);
					}
		
					form.submit();
				}
			});

	// 批量修改
	DataTemplateRenderer.Views.ResponseButtonBatchModify = DataTemplateRenderer.Views.ResponseButton
			.extend({
				onClick : function() {
					var response_fields = this.model.response_fields;
					var $view  = this.getView();
					var ids = this.getGridCheckedId($view);
					if (ids == null || ids.length < 1) {
						DialogUtil.toastr('请选择记录!');
						return false;
					}
					var fields = this.getDisplayField(
							response_fields, this.getTemplateModel().get("display_columns")), 
					params = {
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
										if ($view) {
											// 重新加载
											$view.jqGrid('setGridParam',{
																postData : {}, // 发送数据
																page : 1
															}).trigger("reloadGrid"); // 重新载入
										}
									},
									btn : [{
												label : '保存',
												iconCls : 'btn btn-primary fa fa-ok',
												action : function(dialog,index) {
													DialogUtil.getChildFrameWindow(index).saveData();
												}
											},{
												label : '取消',
												iconCls : 'btn btn-danger fa fa-cancel',
												action : function(dialog,index) {
													DialogUtil
															.close(index);
												}
											} ]
								});
				},
				getDisplayField : function(response_fields, display_columns) {
					var rtn = [];
					_.each(display_columns, function(column) {
						if (response_fields[column.name])
							rtn.push(response_fields[column.name].attributes);
					});
					return rtn;
				}
			});

	// 启动流程
	DataTemplateRenderer.Views.ResponseButtonStartFlow = DataTemplateRenderer.Views.ResponseButton
			.extend({
				onClick : function() {
					var $view = this.getView();
					
					var ids = this.getGridCheckedId($view);
					if (ids == null || ids.length < 1) {
						DialogUtil.toastr('请选择记录!');
						return false;
					}
					var params ={
						formKey :this.getFormKey(),
						flowKey:	this.getFlowKey(),
						pk:ids.join(",")
					};
					
					DataTemplateRenderer.startFlow($view,params);	
	            	
				}
			});
	// 选择启动流程
	DataTemplateRenderer.Views.ResponseButtonDefStartFlow = DataTemplateRenderer.Views.ResponseButton
			.extend({
				onClick : function() {
					var me = this;
					var $view = me.getView();
					
					var ids = me.getGridCheckedId($view);
					if (ids == null || ids.length < 1) {
						DialogUtil.toastr('请选择记录!');
						return false;
					}
					
					DialogUtil.confirm('确认启动流程吗？',
							function(rtn) {
						if (!rtn)
							return;
						var params ={
								formKey:me.getFormKey(),
								flowKey:me.model.attributes.deflow,
								pk:ids.join(",")
							};
							
						DataTemplateRenderer.defStartFlow($view,params);
					});
	            	
				}
			});
	//刷新
	DataTemplateRenderer.Views.ResponseButtonRefresh = DataTemplateRenderer.Views.ResponseButton
	.extend({
		onClick : function() {
			this.getTemplateView().reloadView();
		}
	});
	
	DataTemplateRenderer.Views.ResponseButtonExpand = DataTemplateRenderer.Views.ResponseButton
	.extend({
		onClick : function() {
			this.getTemplateView().expandView();
		}
	});
	
	DataTemplateRenderer.Views.ResponseButtonCompress = DataTemplateRenderer.Views.ResponseButton
	.extend({
		onClick : function() {
			this.getTemplateView().compressView();
		}
	});


	_ref = _.without(DataTemplateRenderer.BUTTON_TYPES, "search","resetSearch","moreSearch", "add","edit", 'detail', 'remove', 'print', 'batchModify', 'import','export', 'startFlow', 'defStartFlow','refresh','expand','compress');
	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		i = _ref[_i];
		DataTemplateRenderer.Views["ResponseButton" + (_str.capitalize(i))] = DataTemplateRenderer.Views.ResponseButton
				.extend({
					button_type : i
				});
	}
}).call(this);