// TODO 模版渲染
	(function() {
		DataTemplateRenderer.actions = {
			variables:{},
			'remove' : function(id, cid) {
				 var variable  = this.variables[cid];
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit('remove',variable,{
						id:id
				 });
				 if(!beforSubmitResult)
					 return ;
		
				var params = {
					formKey : variable.formKey,
					id : id
				};
				DataTemplateRenderer.removeRecord(this.getTemplateView(variable), params);
			},
			// 编辑
			'edit' : function(id, cid) {
				// 前置事件
				var variable  = this.variables[cid];
				 var beforSubmitResult =  this._beforeSubmit('edit',variable,{
						id:id
				 });
				 if(!beforSubmitResult)
					 return ;
				var params = {
					formKey : variable.formKey,
					templateKey:variable.templateKey,
					flowKey:variable.flowKey,
					pk : id,
					isEdit : true,
					edit_buttons :variable.edit_buttons,
					printId : variable.printId
				};
				DataTemplateRenderer.editDialog(this.getTemplateView(variable), params);
			},
			'detail' : function(id, cid) {
				var variable  = this.variables[cid];
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit('detail',variable,{
						id:id
				 });
				 if(!beforSubmitResult)
					 return ;
				var params = {
					formKey : variable.formKey,
					templateKey:variable.templateKey,
					flowKey:variable.flowKey,
					pk : id,
					isEdit : false,
					edit_buttons :  variable.edit_buttons,
					printId : variable.printId
				};
				DataTemplateRenderer.editDialog(this.getTemplateView(variable), params);
			},
			'print':function(id,cid){
				var variable  = this.variables[cid];
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit('print',variable,{
						id:id
				 });
				 if(!beforSubmitResult)
					 return ;
				 DataTemplateRenderer.printDialog({
					formKey :  variable.formKey,
					pk:id,
					id:variable.printId
				 });
				
			},
			'startFlow' : function(id, cid) {
				var variable  = this.variables[cid];
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit('startFlow',variable,{
						id:id
				 });
				 if(!beforSubmitResult)
					 return ;
				 
				var params = {
					formKey : variable.formKey,
					templateKey:variable.templateKey,
					flowKey:variable.flowKey,
					pk : id,
				};
				DataTemplateRenderer.startFlow(this.getTemplateView(variable).$view, params);
			},
			'defStartFlow' : function(id, cid, i) {
				var me = this,
					variable = me.variables[cid],
					button = variable.buttons[i];
				// 前置事件
				 var beforSubmitResult =  me._beforeSubmit('defStartFlow',variable,{
						id:id
				 });
				 if(!beforSubmitResult)
					 return ;
				 
				DialogUtil.confirm('确认启动流程吗？',
							function(rtn) {
								if (!rtn)
									return;
								var params = {
										formKey : variable.formKey,
										templateKey:variable.templateKey,
										flowKey:button.deflow,
										pk : id,
									};
								DataTemplateRenderer.startFlow(me.getTemplateView(variable), params);
							});
				 
			},
			'custom' : function(id, cid,i) {
				var variable  = this.variables[cid],
					button = variable.buttons[i];
	
				// 前置事件
				 var beforSubmitResult =  this._beforeSubmit(button["code"],variable,{
						id:id
				 });
				 if(!beforSubmitResult)
					 return ;
			},
			_beforeSubmit:function(actionCode,variable,params){
				params =$.extend({}, variable,params);
				params.position = 'manage';
				// 前置事件
				 var beforSubmitResult = $.JTemplate._beforeSubmit(this,actionCode,params);
				 
			     if (typeof (beforSubmitResult) != "undefined" && !beforSubmitResult) {
		               return false;
			     }
			     return true;
			},
			getTemplateView:function(variables){
				return  variables["templateView"];
			}
		}

	}).call(this);

(function() {
		//添加、编辑
		DataTemplateRenderer.editDialog = function($view, params) {
			if(!params){
				DialogUtil.msg("传入参数有误！");
				return;
			}
			if($.isEmpty(params.formKey)){
				DialogUtil.msg("未绑定表单！");
				return;
			}
	
			params.rightsScope ='data';
			DialogUtil.dialog({
				content : __ctx + '/platform/form/formDataTemplate/edit.htm',
				params : params,
				area : [ '100%', '100%' ],
				maxmin : false,
				title : false,
				callback : function(rtn) {
					if ($view) {
						// 重新加载
						$view.reloadView();
					}
				}
			});
		};
		//删除
		DataTemplateRenderer.removeRecord = function($view, params) {
			if(!params){
				DialogUtil.msg("传入参数有误！");
				return;
			}
			
			DialogUtil.confirm('确认删除吗？',function(rtn) {
						if (!rtn)
							return;
						// url 要设置
						$.post(__ctx+ '/platform/form/formDataTemplate/removeFormData.htm',
										params,function(data) {
											if (data.result == 1) {
												DialogUtil.toastr(data.message,true);
												$view.reloadView();
											} else {
												DialogUtil.toastr('删除失败！'+ data.message,true);
											}
										}, "json");
					});
		};
		//打印
		DataTemplateRenderer.printDialog = function(params) {
				if(!params){
					DialogUtil.msg("传入参数有误！");
					return;
				}
				if($.isEmpty(params.formKey)){
					DialogUtil.msg("未绑定表单！");
					return;
				}
				if($.isEmpty(params.id)){
					DialogUtil.msg("未设置打印模版！");
					return;
				}
				var url =  __ctx+"/platform/form/formPrintTemplate/print.htm";
			    DialogUtil.dialog({
			    	content:url,
			      	params:params,
			    	area: ['100%', '100%'],
					maxmin:false,
					title:false
			    });
		};
		DataTemplateRenderer.startFlow= function($view, params) {
			if(!params){
				DialogUtil.msg("传入参数有误！");
				return;
			}
			if ($.isEmpty(params.flowKey)) {
				DialogUtil.msg("请绑定流程！");
				return;
			}
			
			if ($.isEmpty(params.formKey)) {
				DialogUtil.msg("请绑定表单！");
				return;
			}
			

			
			var loading = DialogUtil.load();
        	var url = __ctx+'/platform/form/formDataTemplate/startFlowFromList.htm';
            $.post(url, {'id': params.pk, 'defKey': params.flowKey, "formKey":params.formKey}, function (responseText) {
            	DialogUtil.close(loading);
            	var msg = new com.lc.form.ResultMessage(responseText);
    			if (msg.isSuccess()) {
    				DialogUtil.msg(msg.getMessage());
    				
    				if ( $view) {
						$view.jqGrid('setGridParam', {
							postData : {}, // 发送数据
							page : 1
						}).trigger("reloadGrid"); // 重新载入
					}
    			} else {
    				DialogUtil.error(msg.getMessage(),msg.getCause());
    			}
            });
			
			
/*
			DialogUtil.dialog({
						title : '启动流程',
						content : __ctx+ '/platform/bpmn/instance/bpmInst/toStart.htm?defKey='+ flowKey,
						area : [ '100%', '100%' ],
						callback : function(rtn) {
							if ($view) {
								// 重新加载
								$view.jqGrid('setGridParam', {
									postData : {}, // 发送数据
									page : 1
								}).trigger("reloadGrid"); // 重新载入
							}
						}
					});*/
		};
		
		DataTemplateRenderer.openPage=function(conf){			 //js新建的方法
			var showType = conf.showType|| 'dialog' // 判断自定义按钮页面的弹出方式
				
			if(showType == 'newpage' ){// 新建窗口方式
				window.open("/ibps/platform/form/formDataTemplate/edit.htm?key="+conf.key+"&pk="+conf.pk+"&type=form"); 
			}else if(showType == 'tab' ){// 新标签页方式
				DialogUtil.getParent().mainPlugin.addTab({     //调用标签页弹出方法
				id : conf.tabId|| $.uniqueId(),
				title : conf.tabTitle||'未命名',
				url :'/platform/form/formDataTemplate/edit.htm?key='+conf.key+'&pk='+conf.pk+'&type=form',
				//icon : 'xx '
			});
			}else{ //该方式为弹窗方式
				$.ajax({                                                  
		            url: __ctx+"/platform/data/dataTemplate/getByKey.htm",  //数据模板
		            type: "get",											//提交类型
		            dataType:'json',										//数据类型
		            data: { 
		            	key:conf.key									  //传递的数据模板key
		            },
		            success: function(results) {						//
		            	if(!results.result){
		            		DialogUtil.error("设置不正确:");
		            		return;
		            	}
		            	var data=  JSON.parse(results.data);          //转化成json格式
		             	if(!data.attrs){
		             		DialogUtil.error("未获得正确的数据属性");
		             		return;
		             	}
						var params = {							  //构建params
								formKey : data.attrs.form_key,    //构建表单key
							//	templateKey:variable.templateKey,
								flowKey:data.attrs.flow_key,	 //构建流程key
								pk :conf.pk,                     //传进来的pk
								isEdit : conf.isEdit||false,					 //是否编辑
								edit_buttons : data.templates[0].buttons.edit_buttons,	//TODO 顶部的按钮
								printId : data.attrs.printId							//打印id
							};
		            	
		            	DialogUtil.dialog({													//构建弹窗
		    				content : __ctx + '/platform/form/formDataTemplate/edit.htm',   //目标明细页面
		    				params : params,											    //上面构建好的params
		    				area : [ '50%', '50%' ],										//可调整弹窗大小
		    				maxmin : false,
		    				title : false
		    			});
		              }
		            });	
			}
					
		}
	}).call(this);

