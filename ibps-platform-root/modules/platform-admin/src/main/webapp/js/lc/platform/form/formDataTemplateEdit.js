
var loading=	DialogUtil.load("加载中...");
$(function(){
	var formData = {},//表单展示数据
		boData = {},//bo数据
		permission =[],//表单权限
		parentWin = frameElement.dialog,
		params = parentWin.params||{},
		pk =params.pk,//主键ID
		formKey = params.formKey,
		flowKey = params.flowKey,
		templateKey = params.templateKey||"",
		rightsScope =  params.rightsScope||"biz",
		isEdit =params.isEdit?true:false,
		buttons = params.edit_buttons? params.edit_buttons:[],//展示的按钮组
		printId = params.printId,
		url = __ctx+ "/platform/form/formDataTemplate/getFormData.htm";
	$.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {
        	formKey:formKey,
        	pk:pk,
        	templateKey:templateKey,
        	rightsScope:rightsScope
        },
        success: function(result){
        	if(loading)
        		DialogUtil.close(loading);
        	if(!result.result){
        		  DialogUtil.alert(result.msg,function(){
        			  DialogUtil.closeDialog();
        		  });
        		  return ;
        	}
        	
        	//加载表单
        	formData = result.form?JSON.parse(result.form):null;
        	if(_.isEmpty(formData)){
        		  DialogUtil.alert("未绑定表单!");
        		  return ;
        	}
        	//bo数据
        	formData.response = {
        			responses: result.boData?JSON.parse(result.boData):null,
        			permissions:  result.permissions?JSON.parse(result.permissions):null
      	      };
        	formData.bindFlow = $.isNotEmpty(flowKey)?true:false;
        	formData.flowKey = flowKey;
            formData.pk =  pk;
            
  
          
            var btn = 	new TemplateButton({
            	buttons:buttons,
    			isEdit:isEdit,
        		params:{
            		boCode:formData.code,
            		version:result.version,
            		pk:pk,
            		formKey:formKey,
            		flowKey:flowKey,
            		printId:printId,
    	   			parentWin:parentWin
            	}
            });
            
        	var fr = new FormRenderer($.extend(
        			formData,{
        				isRead:!isEdit,
        				onReady: function(){
        					//DialogUtil.close(loading);
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
        	
        },
        error:function(){
        	 DialogUtil.close(loading);
        }
        });
});