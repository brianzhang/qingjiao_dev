/**
 * 人员设置-》人员岗位弹出框
 * <pre>
 * 作者：simon cai
 * 邮箱：48847557@qq.com
 * 日期：2017-2-9 10:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var posDialog;
var data = frameElement.dialog.params;
$(function() {
	posDialog  = new PosDialog();
	posDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : "#posForm"// 表单对象
	};
	/**
	 * 
	 * @returns {PosDialog}
	 */
	PosDialog = function() {
		//定义属性
		this.defId=data.defId;
		this.nodeId=data.nodeId;
	};

	/**
	 * 方法
	 */
	PosDialog.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)//
				this._init();
		},
		/**
		 * 初始表单
		 */
		_init : function() {
			var me=this;
			//处理带过来的初始化参数
			if(data.initData){
				var jsonData = JSON2.parse(data.initData);
				var source = jsonData.source;
				$('input:radio[value='+source+']').attr("checked","checked");
				 
				if(source == 'spec'){
	  				$('input[name="posKey"]').val(jsonData["posKey"]);
	  				$('textarea[name="posName"]').val(jsonData["posName"]);
	  			}else if(source == 'node'){
					$("input#nodeId1").val(jsonData.nodeId);
					$("input#nodeName1").val(jsonData.nodeName);
				}
			}
			$('input[name=source]').on("change",function(){
				me._changeRadio();
			});
		},
		
		/**
		 * 改变组来源
		 */
		_changeRadio:function(){
			$('input[name=posKey]').val('');
			$('textarea[name=posName]').val('');
			$('#nodeId1').val('');
			$('#nodeName1').val('');
		},
		
		/**
		 * 选择组数据
		 * @param conf
		 */
		_choiceUser:function(conf){
			var params =[],
			keyStr = $("input[name='posKey']").val(),
			nameStr =  $("textarea[name='posName']").val();
			if(!$.isEmpty(keyStr)){
				var keyAry = keyStr.split(',');
				var nameAry = nameStr.split(',');
				for(var i =0; i<keyAry.length;i++){
					var paramObj = {key:keyAry[i],name:nameAry[i]};
					params.push(paramObj);
				}
			}
			
			new PartyPositionDialog({
				params:params,
				isObj:true,
				callback:function(data){
					var keys = [];
					var names = [];
					for(var i = 0,len = data.length; i < len; i ++){
						keys.push(data[i].key);
						names.push(data[i].name);
					}
					$("input[name='posKey']").val(keys); 
					$("textarea[name='posName']").val(names);
				}
			}).show();
		},
		
		_getNode : function(obj){
			var trObj =$(obj).parents("tr");
			var node = {};
			var nodeIdVal = trObj.find("#nodeId1").val();
			if(nodeIdVal){
				node.nodeId = nodeIdVal;
				node.nodeName = trObj.find("#nodeName1").val();
			}
			
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/sameNodeDialog.htm?defId='+this.defId+'&nodeId='+this.nodeId;
			var title="相同节点执行人";
			var callback=function(data){
				 trObj.find("#nodeName1").val(data.nodeName);
				 trObj.find("#nodeId1").val(data.nodeId);
			 };
			 
			 DialogUtil.dialog({
				   content: url,
				   params: node,
				   title:title,
				   area:['35%', '30%'] ,
				   btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						   var  data = DialogUtil.getChildFrameWindow(index).getData();
						   if(data){
							  if(callback){
								  callback.call(this,data); 
							  }
							  DialogUtil.close(index);
							}
					   }
				   },
				   {
					   label:'取消',
					   iconCls : 'btn btn-danger fa fa-cancel',
					   action:function(dialog,index){
						   DialogUtil.close(index);
					   }
				   }
				]
			});
		}
		
	};
})();

/**
 * 获取数据
 * 
 */
 function getData(){
	 var retultData={};
	 
	 var source = $('input[name=source]:checked').val();
	 if(!source) {
		 DialogUtil.toastr("请选择来源"); 
		 return ;
	 }
	 var sourceText=$('input[name="source"]:checked').prev().html();
	 retultData["source"]=source;
	 
	if(source == 'spec'){
		retultData["posKey"] = $('input[name="posKey"]').val();
		retultData["posName"] = $('textarea[name="posName"]').val();
		sourceText = sourceText+"["+retultData["posName"]+"]";
		if(!retultData["posKey"] || '' == retultData["posKey"]){
			 DialogUtil.toastr("请指定岗位"); 
			 return false;
		}
	}else if(source == 'node'){
		var nodeName=$("input#nodeName1").val();
		var nodeId=$("input#nodeId1").val();
		retultData["nodeId"]=nodeId;
		retultData["nodeName"]=nodeName;
		sourceText = sourceText+"["+nodeName+"]";
		if(!nodeId || '' == nodeId){
			  DialogUtil.toastr("请指定节点！");
	  		  return;
		 }
	}
	
	 retultData["description"]=sourceText;
	 return retultData;
 }

