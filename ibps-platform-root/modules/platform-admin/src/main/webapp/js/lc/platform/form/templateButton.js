/**
 * 数据模版按钮
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2017-06-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function(window) {
	var $, _str;
	$ = jQuery;
	_str = _.str;

	(function() {
		var TemplateButton;
		window.TemplateButton = TemplateButton = function(options) {
			this.response_buttons= new Backbone.Collection;
			this.initButtons(options);
		};

		TemplateButton.prototype = {
			initButtons : function(options) {
				var buttons = options.buttons,
					isEdit  = options.isEdit,
					action = isEdit ? 'edit' : 'detail',
					params = options.params;
				
				for (var i = 0; i < buttons.length; i++) {
					var rf =  buttons[i];
					if (!FormButtons.t.hasButton(
							rf[TemplateButton.key.BUTTON_TYPE],action, rf.position))
						continue;
					var button =  new TemplateButton.Models["ResponseButton"+ (_str.capitalize(rf[TemplateButton.key.BUTTON_TYPE]))](rf,params);
					if (button.get("hidden"))
						continue;
					this.response_buttons.push(button);
				}
			}
		};
		TemplateButton.BUTTON_TYPES = [ "close", "save", "startFlow", "print","custom" ];
		TemplateButton.Models = {};
		TemplateButton.key = {
			BUTTON_TYPE : 'button_type',
			LABEL : 'label'
		};

	}).call(this);

	// TODO 按钮渲染model
	(function() {
		var i, _i, _len, _ref;
		TemplateButton.Models.ResponseButton = FormRenderer.Models.ResponseButton.extend({
			getParentWin:function(){
				return  this.getOptions("parentWin")||null;
			},
			getFormKey:function(){
			  return  this.getOptions("formKey");
			},
			getFlowKey:function(){
			  return  this.getOptions("flowKey");
			},
		  getBoCode:function(){
			  return  this.getOptions("boCode");
		  },
		  getPk:function(){
			  return  this.getOptions("pk")||"";
		  },
		  getPrintId:function(){
			  return  this.getOptions("printId")||null;
		  },
		  getVersion:function(){
			  return  this.getOptions("version");
		  }
		});

		// 关闭
		TemplateButton.Models.ResponseButtonClose = TemplateButton.Models.ResponseButton.extend({
			style : "btn-default",
			icon : "fa fa-close",
			enablePage : true,
			action : function() {
				DialogUtil.closeDialog();
			}
		});

		// 保存
		TemplateButton.Models.ResponseButtonSave = TemplateButton.Models.ResponseButton.extend({
			icon : "fa fa-save",
			action : function() {
				var _this = this;
				// 验证表单是否正确
				if (this.getForm() && !this.getForm().validate()) {
					DialogUtil.toastr(this.getForm().getErrorMsg());
					return true;
				}
				var loading = DialogUtil.load("处理中...");
				// office提交
				OfficePlugin.submit();
				
				var paramData = {
					formKey : this.getFormKey(),
					pk : this.getPk(),
					code : this.getBoCode(),
					version : this.getVersion(),
					data : this.getFormDataStr()
		        };
				   $.console().info("form data template save form data param: "+ JSON2.stringify(paramData));
				
				 $.ajax({
				        url: __ctx+ "/platform/form/formDataTemplate/saveFormData.htm",
				        type: 'post',
				        data:paramData,
				        dataType:'json',
				        success: function(data) {
				        	DialogUtil.close(loading);
				        	if (data.result == 1) {
								DialogUtil.confirm(data.message+ ',是否继续操作',function(rtn) {
										if (_this.getParentWin())
											_this.getParentWin().callback(true);
										var afterSubmitResult = _this._afterSubmit();
										if (typeof (afterSubmitResult) != "undefined"&& !afterSubmitResult)
											return;

										if (rtn)
											window.location.reload(true);
										else
											DialogUtil.closeDialog();
									});
							} else {
								DialogUtil.error(data.message,data.cause);
							}
				        },
						error : function(){
							DialogUtil.close(loading);
						}
				 });
			}
		});

		// 启动流程
		TemplateButton.Models.ResponseButtonStartFlow = TemplateButton.Models.ResponseButton.extend({
			icon : "fa fa-send",
			action : function() {
			   var flowKey = this.getFlowKey();
				if ($.isEmpty(flowKey)) {
					DialogUtil.toastr("未绑定流程！");
					return false;
				}
				// 验证表单是否正确
				if (this.getForm() && !this.getForm().validate()) {
					DialogUtil.toastr(this.getForm().getErrorMsg());
					return true;
				}
				var loading = DialogUtil.load("处理中...");
				// office提交
				OfficePlugin.submit();

				var jsonData = {
					formKey : this.getFormKey(),
					flowKey : flowKey,
					pk : this.getPk(),
					code : this.getBoCode(),
					version : this.getVersion(),
					data : this.getFormDataStr()
				};

				var _this = this;
				 $.ajax({
				        url: __ctx+ "/platform/form/formDataTemplate/startFlowFromEdit.htm",
				        type: 'post',
				        data:jsonData,
				        dataType:'json',
				        success: function(data) {
				        	DialogUtil.close(loading);
				        	if (data.result == 1) {
				        		DialogUtil.confirm(data.message+ ',是否继续操作',function(rtn) {
									if(_this.getParentWin())
									 _this.getParentWin().callback(true);
									var afterSubmitResult = _this._afterSubmit();
									if (typeof (afterSubmitResult) != "undefined"
											&& !afterSubmitResult)
										return;
									if (rtn)
										window.location.reload(true);
									else
										DialogUtil.closeDialog();
								});
							} else {
								DialogUtil.error(data.message,data.cause);
							}
				        },
						error : function(){
							DialogUtil.close(loading);
						}
				 });
			}
		});

		// 打印
		TemplateButton.Models.ResponseButtonPrint = TemplateButton.Models.ResponseButton.extend({
			icon : "fa fa-print",
			action : function() {
				var printId = this.getPrintId();
				if ($.isEmpty(printId)) {
					window.print();
				} else {
					var url = __ctx+ "/platform/form/formPrintTemplate/print.htm";
					DialogUtil.dialog({
						content : url,
						params : {
							formData : this.getFormDataStr(),
							id : printId,
							pk : this.getPk()
						},
						area : [ '100%', '100%' ],
						maxmin : false,
						title : false
					});
				}
			}
		});

		// 自定义按钮
		TemplateButton.Models.ResponseButtonCustom = TemplateButton.Models.ResponseButton.extend({
				icon : "fa fa-cog"
			});

		_ref = _.without(TemplateButton.BUTTON_TYPES, "close", "save", "print",
				"startFlow", "custom");
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			TemplateButton.Models["ResponseButton" + (_str.capitalize(i))] = TemplateButton.Models.ResponseButton.extend({
						button_type : i
					});
		}

	}).call(this);

})(window);
