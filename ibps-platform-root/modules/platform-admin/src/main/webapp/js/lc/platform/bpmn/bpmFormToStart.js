/**
 * 流程启动和审批页面
 */
var loading=	DialogUtil.load("加载中...");
$(function(){
	var formData = {},//表单展示数据
		formModel ={},
		boData = {},//bo数据
		permissions =[],//表单权限
		buttons=[],//展示的按钮组
		parentWin = frameElement?frameElement.dialog:null,
		
		defId = $("#defId").val(),//流程定义
		proInstId=$("#proInstId").val(),//草稿启动的流程实例id
		taskId = $("#taskId").val(),//任务ID
		lockUser = $("#lockUser").val(),//锁定用户ID
		suspendState = $("#suspendState").val(),//锁定用户ID
		instanceId = $("#instanceId").val(),//实例ID
		
		url = $.isEmpty(taskId)?__ctx+ "/platform/bpmn/instance/bpmInst/getFormData.htm": __ctx+"/platform/bpmn/bpmTask/getFormData.htm";
	//实例
	if(!$.isEmpty(instanceId))
		url =__ctx+ '/platform/bpmn/instance/bpmInst/instFormInfo.htm?instId='+instanceId;
	
	var getFormDataParam = {
        	defId:defId,
        	proInstId:proInstId,
        	taskId:taskId
        };
	console.log("bpmn toStart param: " + JSON2.stringify(getFormDataParam));
	
	$.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: getFormDataParam,
        success: function(result){
        	if(!result.result)
        		  return closeDialog(result.msg) ; 
        	//判断表单
        	if(!(formModel = result.formModel))
        		  return closeDialog("未设置表单") ; 
        	var fr = null, button = result.buttons?result.buttons:null;
        	if( button){
              	buttons.push({"alias":"close"});     	//加入默认关闭
              	$.merge(buttons,button);
        	}
        	var height = frameElement? $(window.frameElement).height():$(window).height();
        	//在线表单
        	if(formModel.type == 'INNER'){
        	  	//加载表单
            	formData = formModel.formData?JSON.parse(formModel.formData):null;
               	if(!formData)
          		  return closeDialog("未设置在线表单") ; 
            	//bo数据
            	boData =  result.isStart?null:(result.boData?JSON.parse(result.boData):null);
            	permissions = result.permissions?JSON.parse(result.permissions):null;
            	
            	//bo数据
            	formData.response = {
            			responses: boData,
            			//这个字段考虑中
            			//default_values:result.defaults?JSON.parse(result.defaults):null,
            			permissions:  permissions
          	      };
            	
            	//加入流程相关信息
            	formData.bindFlow = true;
        	 	formData.taskId = taskId;
                formData.instanceId = $.isNotEmpty(proInstId)?proInstId: instanceId;
                formData.defId =  defId;
                 
                 //按钮参数
                 var buttonParams = 	$.extend({
	    	   			defId:defId,
	    	   			proInstId:proInstId,
	    	   			taskId:taskId,
	    	   			lockUser:lockUser,
	    	   			suspendState:suspendState,
	    	   			printTemplateId:formModel.templateId,
	    	   			parentWin:parentWin,
	    	   			version:result.version
	            	},
	            	result.attributes
				);
				var btn = 	new BpmnButton({
                 	buttons:buttons,
					params:buttonParams
                 });
            	
            	fr= new FormRenderer($.extend(
            			formData,{
            				isRead:!$.isEmpty(instanceId)?true:false,
    						onReady: function(){
    				   			DialogUtil.close(loading);
    				   			$(document).ready((function(_this) {
    						          return function() {
    						        	  if(_this.subviews.toolbar)
    											_this.subviews.toolbar.$el.stickUp();
    						          };
    					        })(this));
    						},
    						toolbar:{
    							response_buttons:btn.response_buttons
            				}
            		    }
            		  ));
        	} else if(formModel.type == 'FRAME'){
        			var guid= "frameDetail"+$.uniqueId(),
        				btn,
        				target,
        				iframeUrl = __ctx+formModel.formValue;
        			$("[data-formrenderer]").append('<iframe id="'+guid+'" src="'+iframeUrl+'" scrolling="no"  frameborder="no"  width="100%" height="'+height+'"></iframe>');
        			target = $('#'+ guid);
        			target.load(function() { 
        				$(this).height($(this).contents().height()+20); 
        				DialogUtil.close(loading);
        				if(!btn){
            				fr = target[0].contentWindow.formUrl;
            				if($.isEmpty(fr)){
            					DialogUtil.alert("内嵌表单未定义formUrl");
            					return;
            				}
            					
            				//加载按钮
            				btn =new BpmnFormButton(
        						$.extend({
    	                	   			defId:defId,
    	                	   			proInstId:proInstId,
    	                	   			taskId:taskId,
    	                	   			lockUser:lockUser,
    	                	   			suspendState:suspendState,
    	                	   			buttons:buttons,
    	                	   			parentWin:parentWin,
    	                	   			version:result.version,
    	                	   			fr:fr,
    	                	   			target:target,
    	                		   		onReady:function(){
    	                		   			if($('.panel-toolbar').length >0)
                	    		   				$('.panel-toolbar').stickUp();
    	                		   		}
    	                        	},
                					result.attributes
                				));
        				}
        			}) ;
        	} else if(formModel.type == 'URL_LOAD'){
        		var iframeUrl = formModel.formValue.startWith('http')?formModel.formValue:__ctx + formModel.formValue,
        			guid= "frameDetail"+$.uniqueId();
    			$("[data-formrenderer]").append('<iframe id="'+guid+'" src="'+iframeUrl+'" scrolling="no"  frameborder="no"  width="100%" height="'+height+'"></iframe>');
    			$("#"+guid).load(function() {
    					$('#'+ guid)[0].contentWindow.bpmnData={
    						defId:defId,
            	   			proInstId:proInstId,
            	   			taskId:taskId
            	   		};
	    				DialogUtil.close(loading);
    				});
        	}
        },
        error:function(){
        	 DialogUtil.close(loading);
        }
        });
	
	function closeDialog(msg){
		  DialogUtil.close(loading);
		  if($.isEmpty(msg))
			  msg ="";
		  DialogUtil.alert(msg,function(){
			  DialogUtil.closeDialog();
		  });
	};

});

