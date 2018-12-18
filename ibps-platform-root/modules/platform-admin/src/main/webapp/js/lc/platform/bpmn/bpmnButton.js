/**
 * 流程按钮
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
		var BpmnButton;
		window.BpmnButton = BpmnButton = function(options) {
			this.response_buttons= new Backbone.Collection;
			this.initButtons(options);
		};

		BpmnButton.prototype = {
			initButtons : function(options) {
				var buttons = options.buttons,
					isEdit  = options.isEdit,
					params = options.params;
				
				for (var i = 0; i < buttons.length; i++) {
					var rf =  buttons[i];
					rf.alias = rf[BpmnButton.key.BUTTON_TYPE];
					rf.label = rf[BpmnButton.key.LABEL];
					if(rf[BpmnButton.key.button_type] == 'lock' 
		        		&& lockUser != '') //锁定
		        		continue;
		        	if(rf[BpmnButton.key.button_type] == 'unlock' 
		        		&& (lockUser == '' || lockUser != __currentUserId)) //解锁
		        		continue;
		        	if(rf[BpmnButton.key.button_type] == 'forceUnlock' 
		        		&& (__isSuper == false || __isSuper == 'false' || lockUser == '')) //强制解锁
		        		continue;
		        
		        	if(rf[BpmnButton.key.button_type] == 'suspendProcess' && '2' == suspendState) //挂起
		        		continue;
		        	if(rf[BpmnButton.key.button_type] == 'recoverProcess' && '1' == suspendState) //恢复
		        		continue;
		        	
		        	if(rf[BpmnButton.key.button_type] == 'startCommu'  || //屏蔽-沟通
		        			rf[BpmnButton.key.button_type] == 'commu' || //屏蔽-沟通
		        			rf[BpmnButton.key.button_type] == 'startTrans' ||//屏蔽-流转
		        			rf[BpmnButton.key.button_type] == 'agreeTrans' || //屏蔽-同意流转
		        			rf[BpmnButton.key.button_type] == 'opposeTrans') //屏蔽-反对流转
		        		return true;
					var button =  new BpmnButton.Models["ResponseButton"+ (_str.capitalize(rf[BpmnButton.key.BUTTON_TYPE]))](rf,params);
					//初始化按钮事件
					
					this.response_buttons.push(button);
				}
			}
		};
		
		BpmnButton.Models = {};
		BpmnButton.BUTTON_TYPES = ["close","startFlow","lock","unlock","forceUnlock","agree","oppose","abandon","saveDraft","reject","endProcess","delegate","addSign","startCommu","commu","startTrans","flowImage","approvalHistory","opposeTrans","agreeTrans","suspendProcess","recoverProcess","print","rejectToStart",'revoke',"custom"];
		BpmnButton.key ={
				BUTTON_TYPE :"alias",
			  LABEL:"name"
		  }
		//TODO 国际化
		BpmnButtonZH_CN = {
				"loading":"加载中",
					
				"button_type":{
					"close":"关闭"
				}
		};
		if (typeof BpmnButton !== 'undefined') BpmnButton.t = BpmnButtonZH_CN;

		BpmnButton.VERSION = '2.0.0';
	}).call(this);

	// TODO 按钮渲染model
	(function() {
		var i, _i, _len, _ref;
		BpmnButton.Models.ResponseButton = FormRenderer.Models.ResponseButton.extend({
			 getProInstId:function(){
				  return this.getOptions("proInstId");
			  },
			  getDefId:function(){
				  return this.getOptions("defId");
			  },
			  //版本号
			  getVersion:function(){
				  return this.getOptions("version");
			  },
			  getFormKey:function(){
				  return this.getOptions("formKey");
			  },
			  getTaskId:function(){
				return this.getOptions("taskId");
			  },
			  getLockUser:function(){
				  return this.getOptions("lockUser");
			  },
			  isDraft:function(){
				return  !_.isEmpty(this.getProInstId());
			  },
			  isCreateInstance : function(){
				  return  _.isEmpty(this.getTaskId());	
			  },
			  isHideOpinion:function(){
				  return this.getOptions("isHideOpinion")||false;
			  },
			  isHidePath:function(){
				  return this.getOptions("isHidePath")||false;
			  },
			  isCommonJumpType:function(){
				  return this.getOptions("isCommonJumpType")||false;
			  },
			  isEnd:function(){
				  return this.getOptions("isEnd")||false;
			  },
			  isHide:function(){
				  return (this.isCommonJumpType() && (this.isCommonJumpType() == true || this.isCommonJumpType() == 'true')
				  			&& this.isHideOpinion() && (this.isHideOpinion() == true || this.isHideOpinion() == 'true')
				  			&& this.isHidePath() && (this.isHidePath() == true || this.isHidePath() == 'true'))
				  		|| (this.isEnd() && (this.isEnd() == true || this.isEnd() == 'true')
				  			&& this.isHideOpinion() && (this.isHideOpinion() == true || this.isHideOpinion() == 'true')		
				  		);
			  },
			  getParentWin:function(){
				  return  this.getOptions("parentWin")||null;
			  },
			  getAlias : function() {
				var  alias = this.get(BpmnButton.key.BUTTON_TYPE)
				return alias == 'custom' ? (this.get("code") ||
						(alias + this.get("$index"))): alias;
			  }
		});

		 //关闭
		  BpmnButton.Models.ResponseButtonClose = BpmnButton.Models.ResponseButton.extend({
			  label:BpmnButton.t.button_type["close"],
			  style:"btn-default",
			  icon:"fa fa-close",
			  enablePage : true,
			  action:function(){
				   DialogUtil.close(frameElement.dialog.index);
			   }
		  });
		  //启动流程
		  BpmnButton.Models.ResponseButtonStartFlow = BpmnButton.Models.ResponseButton.extend({
			   icon:"fa fa-send",
			   action:function(){
				   var _this = this,
				   		el=this.$el,
				   		parentWin =this.getParentWin();
				   //验证表单是否正确
					if(this.getForm()  && !this.getForm().validate()){
						DialogUtil.toastr(this.getForm().getErrorMsg());
						return true;
					}
					var loading =	DialogUtil.load("处理中...");
					// office提交
			        OfficePlugin.submit();
					var jsonData = {
							defId:this.getDefId(),
							nodeUsers:$("#userAssign").val(),
							version:this.getVersion(),
							data:this.getFormDataStr()
						};
					
					//通过草稿启动流程时，传入草稿的对应的实例ID
					if(this.isDraft()){
						jsonData.proInstId = this.getProInstId();
					}
					
					console.log("bpmn start param: " + JSON2.stringify(jsonData));
					$.post(__ctx + "/platform/bpmn/instance/bpmInst/start.htm",jsonData,function(data){
						DialogUtil.close(loading);
						var afterSubmitResult = _this._afterSubmit();
						if (typeof (afterSubmitResult) != "undefined"&& !afterSubmitResult)
							return;
						var resultMessage=new com.lc.form.ResultMessage(data);
						if(resultMessage.isSuccess()) {
			                DialogUtil.alert(resultMessage.getMessage(), function() {
			                	if(parentWin && parentWin.callback)
			                		parentWin.callback();
			                	if(parentWin && parentWin.index )
			                		DialogUtil.close(parentWin.index);
			                	else
			                		DialogUtil.closeAll();
			                });
			            }else {
			            	DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause()); 
			            }
					});
			   }
		  });
		  
		//保存草稿
		  BpmnButton.Models.ResponseButtonSaveDraft= BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-clipboard",
			  action:function(){
				  var _this= this;
					if(!this.isCreateInstance()){
						return true;
					}
					var loading =	DialogUtil.load("保存中....");
						
					// office提交
			        OfficePlugin.submit();
						
					var jsonData = {
							defId:this.getDefId(),
							version:this.getVersion(),
							data:this.getFormDataStr()
				    };

					if(this.isDraft())	//更新草稿时，传入草稿的对应的实例ID
						jsonData.proInstId = this.getProInstId();
					$.post(__ctx + "/platform/bpmn/instance/bpmInst/saveDraft.htm",jsonData,function(data){
						DialogUtil.close(loading);
						var afterSubmitResult = _this._afterSubmit();
						if (typeof (afterSubmitResult) != "undefined"&& !afterSubmitResult)
							return;
						var resultMessage = new com.lc.form.ResultMessage(data);
						if(resultMessage.isSuccess()) {
			                DialogUtil.alert(resultMessage.getMessage(), function() {
			    				DialogUtil.closeAll();
			                });
			            }else {
			            	DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause()); 
			            }
					});
			  }
		  });
		  
		  //锁定
		  BpmnButton.Models.ResponseButtonLock = BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-lock",
			  action:function(){
					var actionName = "lock",
						taskId = this.getTaskId(),
						parentWin =this.getParentWin(),
						el=this.$el;
					el.button('loading');
					$.post(__ctx + "/platform/bpmn/bpmTask/lock.htm",{taskId:taskId},function(data){
						el.button('reset');
						var resultMessage=new com.lc.form.ResultMessage(data);
						if(resultMessage.isSuccess()) {
							DialogUtil.alert(resultMessage.getMessage(), function() {
								window.location.href = __ctx+'/platform/bpmn/bpmTask/toStart.htm?id='+taskId;
							});
						}else {
							DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause());
						}
					});
			  }
		  });
		  
		  //解锁
		  BpmnButton.Models.ResponseButtonUnlock = BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-unlock-alt",
			  action:function(){
				var actionName = "unlock",
					taskId = this.getTaskId(),
					parentWin =this.getParentWin(),
					el=this.$el;
				
					el.button('loading');
				$.post(__ctx + "/platform/bpmn/bpmTask/unlock.htm",{taskId:taskId},function(data){
					el.button('reset');
					var resultMessage=new com.lc.form.ResultMessage(data);
					if(resultMessage.isSuccess()) {
						DialogUtil.alert(resultMessage.getMessage(), function() {
							window.location.href = __ctx+'/platform/bpmn/bpmTask/toStart.htm?id='+taskId;
						});
					}else {
						DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause()); 
					}
				});
			  }
		  });
		  
		  //强制解锁
		  BpmnButton.Models.ResponseButtonForceUnlock = BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-unlock",
			  action:function(){
					var actionName = "forceUnlock",
						taskId = this.getTaskId(),
						parentWin =this.getParentWin(),
						el=this.$el;
					el.button('loading');
					$.post(__ctx + "/platform/bpmn/bpmTask/unlock.htm",{taskId:taskId},function(data){
						el.button('reset');
						var resultMessage=new com.lc.form.ResultMessage(data);
						if(resultMessage.isSuccess()) {
							DialogUtil.alert(resultMessage.getMessage(), function() {
								window.location.href = __ctx+'/platform/bpmn/bpmTask/toStart.htm?id='+taskId;
							});
						}else {
							DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause()); 
						}
					});
			  }
		  });
		  
		  /**
		   * 流程任务操作
		   */
		  BpmnButton.Models.ResponseButtonTaskOperate = BpmnButton.Models.ResponseButton.extend({
			  getTaskParams:function(actionName){
					var   hasFormOpinion = $("#formOpinion").length > 0,
							isHide = this.isHide();
							opinion ="同意";
					if(actionName == 'agree'){
						opinion ="同意";
					}else if(actionName == 'oppose'){
						opinion = "反对";
					} else if(actionName == 'abandon'){
						opinion = "弃权";
					}else if(actionName == 'opposeTrans'){  
						opinion = "流转反对";
						isHide =  this.isHideOpinion();
					}
					
				    var params ={
				    		opinion:opinion,
				    		actionName:actionName,
				    		hasFormOpinion : hasFormOpinion,
				    		taskId:this.getTaskId(),
				    		version:this.getVersion(),
				    		data: isHide?this.getFormDataStr():this.getFormData()
				    };
				    return params;
			  }
		  });
		  
		  //同意
		  BpmnButton.Models.ResponseButtonAgree = BpmnButton.Models.ResponseButtonTaskOperate.extend({
			  icon:"fa fa-check-square-o",
			  action:function(){
					var actionName = "agree",
						taskId = this.getTaskId(),
						parentWin =this.getParentWin();
					   //验证表单是否正确
					if(this.getForm()  && !this.getForm().validate()){
						DialogUtil.toastr(this.getForm().getErrorMsg());
						return true;
					}
					// office提交
			        OfficePlugin.submit();
			        //获取参数
					var params = this.getTaskParams(actionName);
			        
					if(this.isHide()){
						var loading =	DialogUtil.load("处理中...");
						console.log("bpmn agree param: " + JSON2.stringify(params));
						$.post(__ctx + "/platform/bpmn/bpmTask/complete.htm",params,function(data){
							DialogUtil.close(loading);
							var resultMessage=new com.lc.form.ResultMessage(data);
							if(resultMessage.isSuccess()) {
				                DialogUtil.alert(resultMessage.getMessage(), function() {
				                	if(parentWin && parentWin.callback)
				                		parentWin.callback();
				                	DialogUtil.closeAll();
				                });
				            }else {
				            	DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause()); 
				            }
						});
					}else{
						DialogUtil.dialog({
							area: ['600px', '500px'],
							title:params.opinion,
							content:__ctx + '/platform/bpmn/bpmTask/toAgree.htm?actionName='+actionName+'&taskId='+this.getTaskId(),
							params:params,
							callback:function(){
		    			       	if(parentWin && parentWin.callback)
			                		parentWin.callback();
		    			       	DialogUtil.closeAll();
		    				}
						});
					}
			  }
		  });
		  //反对
		  BpmnButton.Models.ResponseButtonOppose = BpmnButton.Models.ResponseButtonTaskOperate.extend({
			  icon:"fa fa-close",
			  action:function(){
					var actionName = "oppose",
						taskId = this.getTaskId(),
						parentWin =this.getParentWin(),
						el = this.$el;
					   //验证表单是否正确
					if(this.getForm()  && !this.getForm().validate()){
						DialogUtil.toastr(this.getForm().getErrorMsg());
						return true;
					}
					var loading =	DialogUtil.load("处理中...");
					// office提交
			        OfficePlugin.submit();
			        //获取参数
					var params = this.getTaskParams(actionName);
					
					if(this.isHide()){
						console.log("bpmn agree param: " + JSON2.stringify(params));
						$.post(__ctx + "/platform/bpmn/bpmTask/complete.htm",params,function(data){
							DialogUtil.close(loading);
							var resultMessage=new com.lc.form.ResultMessage(data);
							if(resultMessage.isSuccess()) {
				                DialogUtil.alert(resultMessage.getMessage(), function() {
				                	if(parentWin && parentWin.callback)
				                		parentWin.callback();
				                	DialogUtil.closeAll();
				                });
				            }else {
				            	DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause()); 
				            }
						});
					}else{
		    			DialogUtil.dialog({
		    				title:params.opinion,
		    				area: ['50%', '50%'],
		    				content:__ctx + '/platform/bpmn/bpmTask/toAgree.htm?actionName='+actionName+'&taskId='+taskId,
		    				params:params,
		    				callback:function(){
		    					DialogUtil.close(loading);
		    			       	if(parentWin && parentWin.callback)
			                		parentWin.callback();
			                	DialogUtil.closeAll();
		    				}
		    			});
					}
			  }
		  });
		  //弃权
		  BpmnButton.Models.ResponseButtonAbandon = BpmnButton.Models.ResponseButtonTaskOperate.extend({
			  icon:"fa fa-hand-o-up",
			  action:function(){
					var actionName = "abandon",
						taskId = this.getTaskId(),
						parentWin =this.getParentWin;
					   //验证表单是否正确
					if(this.getForm()  && !this.getForm().validate()){
						DialogUtil.toastr(this.getForm().getErrorMsg());
						return true;
					}
					var loading =	DialogUtil.load("处理中...");
					// office提交
			        OfficePlugin.submit();
			        //获取参数
					var params = this.getTaskParams(actionName);
			        
					if(this.isHide()){
						$.post(__ctx + "/platform/bpmn/bpmTask/complete",params,function(data){
							DialogUtil.close(loading);
							var resultMessage=new com.lc.form.ResultMessage(data);
							if(resultMessage.isSuccess()) {
				                DialogUtil.alert(resultMessage.getMessage(), function() {
				                   	if(parentWin && parentWin.callback)
				                		parentWin.callback();
				                	DialogUtil.closeAll();
				                });
				            }else {
				            	DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause()); 
				            }
						});
					}else{
		    			DialogUtil.dialog({
		    				 area: ['50%', '50%'],
		    				title:params.opinion,
		    				content:__ctx + '/platform/bpmn/bpmTask/toAgree.htm?actionName='+actionName+'&taskId='+taskId,
		    				params:params,
		    				callback:function(){
		    					DialogUtil.close(loading);
		    				}
		    			});
					}
			  }
		  });
		  
		  //驳回
		  BpmnButton.Models.ResponseButtonReject= BpmnButton.Models.ResponseButton.extend({
			   style:"btn-danger",
			   icon:"fa fa-lastfm",
			  action:function(){
				  var parentWin =this.getParentWin(),
				  		el = this.$el,
				  		params;
				  	
				  params = {
						version:this.getVersion(),
						bpmFormId : this.getFormKey(),
						data : this.getFormData()
					};
				 
					DialogUtil.dialog({
						content: __ctx + '/platform/bpmn/bpmTask/toReject.htm?taskId='+this.getTaskId(),
						title:'驳回',
						area: ['50%', '70%'],
						params:params,
						callback:function(){
			              	if(parentWin && parentWin.callback)
		                		parentWin.callback();
					    	DialogUtil.closeAll();
						}
					});
			  }
		  });
		  //驳回发起人 
		  BpmnButton.Models.ResponseButtonRejectToStart = BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-send",
			  action:function(){
				  var parentWin =this.getParentWin();
					DialogUtil.dialog({
						content: __ctx + '/platform/bpmn/bpmTask/toRejectToStart.htm?taskId='+this.getTaskId(),
						title:'驳回发起人',
						area: ['50%', '70%'],
						callback:function(){
			              	if(parentWin && parentWin.callback)
		                		parentWin.callback();
					    	DialogUtil.closeAll();
						}
					});
			  }
		  });
		  
		  //驳回上一步
		  BpmnButton.Models.ResponseButtonRejectToPrevious = BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-backward",
			  action:function(){
				  var parentWin =this.getParentWin();
				  DialogUtil.dialog({
					  content: __ctx + '/platform/bpmn/bpmTask/toRejectToPrevious.htm?taskId='+this.getTaskId(),
					  title:'驳回上一步',
					  area: ['50%', '70%'],
					  callback:function(){
						  if(parentWin && parentWin.callback)
							  parentWin.callback();
						  DialogUtil.closeAll();
					  }
				  });
			  }
		  });
		  
		  //终止流程
		  BpmnButton.Models.ResponseButtonEndProcess= BpmnButton.Models.ResponseButton.extend({
			   style:"btn-danger",
			   icon:"fa fa-ioxhost",
			  action:function(){
				  var parentWin =this.getParentWin();
	  			DialogUtil.dialog({
					area: ['50%', '50%'],
					content:__ctx + '/platform/bpmn/bpmTask/toEndProcess.htm?taskId='+this.getTaskId(),
					title:'终止流程',
					callback:function(){
		              	if(parentWin && parentWin.callback)
	                		parentWin.callback();
		               	DialogUtil.closeAll();
					}
				});
			  }
		  });
		  //转办
		  BpmnButton.Models.ResponseButtonDelegate= BpmnButton.Models.ResponseButton.extend({
			  style:'btn-info',
			   icon:"fa fa-share",
			  action:function(){
				  	var parentWin = this.getParentWin();
				  	//转办
					DialogUtil.openFullWindow({
						content:__ctx+'/platform/bpmn/bpmTaskChange/flowEdit.htm?taskId=' + this.getTaskId(),
						title:'任务转办',
						params:this.getFormData(),
						callback:function(){
					      	if(parentWin && parentWin.callback)
					    		parentWin.callback();
					       	DialogUtil.closeAll();
					       	if(window && window.location && window.location != null) window.location.reload();
						}
					});
			  }
		  });
		  //补签
		  BpmnButton.Models.ResponseButtonAddSign= BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-group",
			  action:function(){
				  var parentWin =this.getParentWin();
				DialogUtil.dialog({
					area: ['40%', '40%'],
					title:'补签',
					content:__ctx + '/platform/bpmn/bpmTask/toAddSignTask.htm?taskId=' + this.getTaskId(),
					params:this.getFormData(),
					callback:function(index){
		              	if(parentWin && parentWin.callback)
	                		parentWin.callback();
		               	DialogUtil.close(index);
					}
				});
			  }
		  });
		  //开始沟通
		  BpmnButton.Models.ResponseButtonStartCommu= BpmnButton.Models.ResponseButton.extend({
			  style:'btn-info',
			  icon:"fa fa-comment-o",
			  action:function(){
				  var parentWin =this.getParentWin();
	  			DialogUtil.dialog({
					title:'发起沟通',
					content:__ctx + '/platform/bpmn/bpmTask/toCommu.htm?taskId=' + this.getTaskId(),
				    area: ['70%', '70%'],
				    params:this.getFormData(),
					callback:function(){
		              	if(parentWin && parentWin.callback)
	                		parentWin.callback();
		               	DialogUtil.closeAll();
					}
				});
			  }
		  });
		  //开始流转
		  BpmnButton.Models.ResponseButtonStartTrans= BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-ioxhost",
			  action:function(){
				  var parentWin =this.getParentWin();
	  			DialogUtil.dialog({
					title:'流程任务流转',
					area: ['70%', '70%'],
					content:__ctx + '/platform/bpmn/bpmTask/toTrans.htm?taskId=' + this.getTaskId(),
				    params:this.getFormData(),
					callback:function(){
		              	if(parentWin && parentWin.callback)
	                		parentWin.callback();
		               	DialogUtil.closeAll();
					}
				});
			  }
		  });
		  //沟通
		  BpmnButton.Models.ResponseButtonCommu= BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-comment-o",
			  action:function(){
				  var parentWin =this.getParentWin();
	  			DialogUtil.dialog({
					title:'沟通反馈',
				    area: ['70%', '70%'],
				    content:__ctx + '/platform/bpmn/bpmTask/toFeedBack.htm?taskId=' + this.getTaskId(),
				    params:this.getFormData(),
					callback:function(){
		              	if(parentWin && parentWin.callback)
	                		parentWin.callback();
		               	DialogUtil.closeAll();
					}
				});
			  }
		  });
		  //流程图
		  BpmnButton.Models.ResponseButtonFlowImage= BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-image",
			  enablePage : true,
			  action:function(){
				  var url = "",
				  		title = this.getLabel();
					if(this.isCreateInstance()){	//启动流程
						url =__ctx+ '/platform/bpmn/image/gen.htm?defId='+this.getDefId();
					}else{		//完成任务
						url = __ctx+ '/platform/bpmn/bpmTask/flowImage.htm?taskId=' + this.getTaskId();
					}
					DialogUtil.dialog({content:url,title:title});
			  }
		  });
		  //审批历史
		  BpmnButton.Models.ResponseButtonApprovalHistory = BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-bars",
			  enablePage : true,
			  action:function(){
					if(this.isCreateInstance()){        //启动流程
					    DialogUtil.alert("流程未启动,不能查看审批历史");
					}else{		//完成任务
		    			DialogUtil.dialog({
		    				title:'审批历史',
		    				content:__ctx + '/platform/bpmn/instance/bpmInst/flowHistory.htm?taskId=' + this.getTaskId()
		    			});
					}
			  }
		  });
		  //反对流转
		  BpmnButton.Models.ResponseButtonOpposeTrans= BpmnButton.Models.ResponseButtonTaskOperate.extend({
			  style:'btn-info', 
			  icon:"fa fa-ioxhost",
			  action:function(){
					var actionName = "opposeTrans",
						taskId = this.getTaskId(),
						parentWin =this.getParentWin();
			        //获取参数
					var params = this.getTaskParams(actionName);
					if(this.isHideOpinion()){
						var loading =	DialogUtil.load("处理中...");
						$.post(__ctx + "/platform/bpmn/bpmTask/complete.htm",params,function(data){
							DialogUtil.close(loading);
							var resultMessage=new com.lc.form.ResultMessage(data);
							if(resultMessage.isSuccess()) {
				                DialogUtil.success(resultMessage.getMessage(), function() {
				                	if(parentWin && parentWin.callback)
				                		parentWin.callback();
				                	DialogUtil.closeAll();
				                });
				            }else {
				            	DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause()); 
				            }
						});
					}else{
	
						DialogUtil.dialog({
							title:params.opinion,
							content:__ctx + '/platform/bpmn/bpmTask/toAgree.htm?actionName='+actionName+'&taskId='+taskId,
							params:params,
							callback:function(){
								
							}
						});
					}
			  }
		  });
		  
		  //同意流转
		  BpmnButton.Models.ResponseButtonAgreeTrans= BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-ioxhost",
			  action:function(){
			  }
		  });
		  
		  //挂起
		  BpmnButton.Models.ResponseButtonSuspendProcess= BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-ioxhost",
			  action:function(){
				  var actionName = "suspendProcess",
					taskId = this.getTaskId(),
					parentWin =this.getParentWin();
				var loading =	DialogUtil.load("处理中...");
				$.post(__ctx + "/platform/bpmn/bpmTask/suspendProcess.htm",{taskId:taskId},function(data){
					DialogUtil.close(loading);
					var resultMessage=new com.lc.form.ResultMessage(data);
					if(resultMessage.isSuccess()) {
						DialogUtil.alert(resultMessage.getMessage(), function() {
							DialogUtil.closeAll();
						});
					}else {
						DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause());
					}
				});
			  }
		  });
		  
		  //恢复
		  BpmnButton.Models.ResponseButtonRecoverProcess= BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-ioxhost",
			  action:function(){
				  var actionName = "recoverProcess",
					taskId = this.getTaskId(),
					parentWin =this.getParentWin();
					var loading =	DialogUtil.load("处理中...");
				$.post(__ctx + "/platform/bpmn/bpmTask/recoverProcess.htm",{taskId:taskId},function(data){
					DialogUtil.close(loading);
					var resultMessage=new com.lc.form.ResultMessage(data);
					if(resultMessage.isSuccess()) {
						DialogUtil.alert(resultMessage.getMessage(), function() {
							window.location.href = __ctx+'/platform/bpmn/bpmTask/toStart.htm?id='+taskId;
						});
					}else {
						DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause());
					}
				});
			  }
		  });
		  
		  //打印
		  BpmnButton.Models.ResponseButtonPrint= BpmnButton.Models.ResponseButton.extend({
			  icon:"fa fa-print",
			  enablePage : true,
			  action:function(){
					var printTemplateId =   this.getOptions("printTemplateId");
					if($.isEmpty(printTemplateId)){
						  window.print();
					}else{
						var formData =	this.getFormDataStr(),
							 url =  __ctx+"/platform/form/formPrintTemplate/print.htm";
					    DialogUtil.dialog({
					    	params:{
					    		formData:formData,
					    		id:printTemplateId,
					    		bpmDefId:this.getDefId(),
					    		pk:""
					    	},
					    	content:url,
					    	area: ['100%', '100%'],
							maxmin:false,
							title:false
					    });
					}
				
			  }
		  });
		  
		  
		  _ref = _.without(BpmnButton.BUTTON_TYPES,"close","startFlow","lock","unlock","forceUnlock","agree","oppose","abandon","saveDraft","reject","endProcess","delegate","addSign","startCommu","commu","startTrans","flowImage","approvalHistory","opposeTrans","agreeTrans","suspendProcess","recoverProcess","print","rejectToStart");
		  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		    i = _ref[_i];
		    BpmnButton.Models["ResponseButton" + (_str.capitalize(i))] = BpmnButton.Models.ResponseButton.extend({
		        button_type: i
		      });
		  }

	}).call(this);
	
	(function() {
		window.BpmnFormButton = BpmnFormButton = Backbone.View.extend({
			  defaults: {
			      target: '[data-bpmn-button]'
			    },
			    constructor: function(options) {
				      var p, _i, _len, _ref;
				      this.options = $.extend({}, this.defaults, options);
				      this.setElement($(this.options.target));
				      this.trigger('viewRendered', this);
				      
				      //加载按钮
				      this.loadButtonServer((function(_this){
				    	   return function() {
				    		   var   _ref = _this.options.buttons;
				    		   if(_ref.length >0){
						          //初始化按钮视图
						          _this.initToolbar();
				    		   }else{
				    			   $(".panel-toolbar").hide();
				    		   }
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
			    initToolbar:function(){
			    	var btn = 	new BpmnButton({
	                 	buttons:this.options.buttons,
						params:this.options
	                 });
			        var toolbar = new FormRenderer.Plugins.Toolbar.View({
			            form_renderer: this.options.fr,
			            response_buttons:btn.response_buttons
			         });
			        
			         this.$el.parent().before(toolbar.render().el);
			    }
		  });
	}).call(this);

	
	

	

})(window);
