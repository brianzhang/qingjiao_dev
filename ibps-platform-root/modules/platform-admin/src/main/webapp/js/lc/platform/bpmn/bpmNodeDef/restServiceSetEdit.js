
var restServiceSet;
var data = frameElement.dialog.params;
$(function() {
	restServiceSet  = new RestServiceSet();
	restServiceSet.init();
});

(function() {
	//定义常量
	var _consts = {
		
	};
	/**
	 * 
	 * @returns {CusersDialog}
	 */
	RestServiceSet = function() {
		FORM:"#restServiceSetForm"
	};

	/**
	 * 方法
	 */
	RestServiceSet.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)//
				this.params = {};
				this._init();
		},
		/**
		 * 初始表单
		 */
		_init : function() {

			var bpmPluginDefJson = $("#bpmPluginDefJson").val();
			if(bpmPluginDefJson){
				bpmPluginDefJson = eval('(' + bpmPluginDefJson + ')');
				for(var ix=0;ix<bpmPluginDefJson.input.length;ix++){
					bpmPluginDefJson.input[ix].value = bpmPluginDefJson.input[ix].value.replace(/7B/g, "{").replace(/7D/g, "}").replace(/27/g, "'");
				}
				bpmPluginDefJson.paramsSize = bpmPluginDefJson.input.length*2; 
				this.serviceSet = bpmPluginDefJson;
			}
			 
			this.initParams();
			
		},
		
		initParams : function(){
			var defId = $("#defId").val();
			var nodeId = $("#nodeId").val();
			var pams={'defId':defId,'nodeId':nodeId, includeBpmConstants:true};
			
			var me = this;
			me.params = [];
			me.boAttr = [];
			$.post(__ctx+"/platform/bpmn/bpmNodeDef/flowVarJson.htm",pams,function(result){
				$.each(result,function(i,value){
					if(value.fromType =='bpmConstants'){
						value.desc = value.description;
						me.params.push(value);
					}else if(value.fromType =='var'){
						value.desc = value.name;
						value.name = value.varKey;
						me.params.push(value);  
					}else if(value.fromType =='boAttr'){
						// 表单变量以   code.colum 的形式
						value.desc = value.description;  
						value.name = value.code +"."+value.name;
						me.boAttr.push(value);
					}
				});
			});
			var html = template("serviceSetTemplate", {serviceSet:this.serviceSet, params:this.params, boAttr:this.boAttr});
			$(".panel-form").append(html);
		},
		
		//保存数据
		saveforFlow : function(pluginType,defId,nodeId){    

			this.serviceSet.pluginType = pluginType;
			this.serviceSet.serviceType = "rest";
			var serviceStr = JSON.stringify(this.serviceSet);
			
			var param = {defId:defId,nodeId:nodeId,jsonStr:serviceStr};
			var url = __ctx + "/platform/bpmn/bpmNodeDef/autoTaskPluginSave.htm";
			
			$.post(url,param,function(data){
				var resultMessage=new com.lc.form.ResultMessage(data);
	        	if(resultMessage.isSuccess()){
	        		DialogUtil.alert("webService配置成功!","提示信息");
	        	}else{
	        		DialogUtil.error(resultMessage.getMessage(),resultMessage.getCause()); 
	        	}
			}); 
		},
		
		parse : function(){

			$("div.serviceSet").remove();
			var serurl = $("#url").val(),
				me = this;
			if(serurl==null||serurl==""){
				DialogUtil.warn("请输入服务地址","提示信息");
				return;
			}
			
			var url = __ctx+"/platform/bpmn/bpmNodeDef/getRestApi.htm";
			
			$.post(url,{target:serurl},function(rs){
				if(rs.success){
					me.serviceSet = rs.serviceSet;
					var html = template("serviceSetTemplate", {serviceSet:me.serviceSet, params:me.params, boAttr:me.boAttr});
					$(".panel-form").append(html);
				}else{
					DialogUtil.error(rs.msg);
				}
			});
		},
		
		bindingType:function(val,obj){
			var pm = $(obj).closest(".form-horizontal");
			pm.find("div.bindingType").hide();
			if(val==1){
				pm.find("div.fixedVal").show();
			}
			if(val==2){
				pm.find("div.paramVal").show();
			}
			if(val==3){
				pm.find("div.scriptVal").show();
			}
			if(val==4){
				pm.find("div.formVal").show();
			}
		}
		
	};
})();


function getData(){
	var serviceSet = restServiceSet.serviceSet;
	for(var ix=0;ix<serviceSet.input.length;ix++){
		if(serviceSet.input[ix].value!=null){
			serviceSet.input[ix].value = serviceSet.input[ix].value.replace(/{/g, "7B").replace(/}/g, "7D").replace(/'/g, "27");
		}
	}
	serviceSet.pluginType = "webService";
	serviceSet.serviceType = "rest";
	return serviceSet;
}