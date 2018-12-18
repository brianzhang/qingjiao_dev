/**
 * 人员设置-》人员组织弹出框
 * <pre>
 * 作者：simon cai
 * 邮箱：48847557@qq.com
 * 日期：2017-2-9 10:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var userGroupDialog;
var data = frameElement.dialog.params;
$(function() {
	userGroupDialog  = new UserGroupDialog();
	userGroupDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : "#userGroupForm",// 表单对象
	};
	/**
	 * 
	 * @returns {UserGroupDialog}
	 */
	UserGroupDialog = function() {
		//定义属性
		this.defId=data.defId;
		this.nodeId=data.nodeId;
	};

	/**
	 * 方法
	 */
	UserGroupDialog.prototype = {
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
	  				$('input[name="orgKey"]').val(jsonData["orgKey"]);
	  				$('textarea[name="orgName"]').val(jsonData["orgName"]);
	  			}else if(source == 'node'){
					$("input#nodeId1").val(jsonData.nodeId);
					$("input#nodeName1").val(jsonData.nodeName);
				}else if(source == 'var'){
					var varData = jsonData['executorVar'];
					var flowVarText = varData['name'];
					$("#varSpan").text(flowVarText);
					$("#flowVar").val(JSON2.stringify(varData))
	  			}
				 
				if( jsonData["containsSub"]!=false){
					 $('#containsSub').attr("checked",true);
				}
			}
			me._handFlowVar();
			$('input[name=source]').on("change",function(){
				me._changeRadio();
			});
		},
		
		/**
		 * 流程变量弹出框
		 */
		_handFlowVar:function(){
			$(".btn-xs").each(function(){
				var id = $(this).attr("id");
	 	  		var varTree = new BpmFormVar('varTree'+id,data.formVars)
 	  		 	.setCallback({onClick:function(event, treeId, node){
	 	  			var text="",data={};
	 	  		 	if(node.attrType == 'field'){
	  		 			text = node.tableName+'.'+node.key+'';
	  		 			data.source = "boVar";
	  		 		}else if (node.attrType == 'var'){
	  		 			text =node.name;
	  		 			data.source = "flowVar";
	  		 		}else if(node.attrType == 'bpmConstants'){
	  		 			text =node.key;
	  		 			data.source = "consVar";
	  		 		}else return ;
	 	  		 	
  		 			data.name = text;
  		 			data.executorType = "org";
  		 			data.valType = "orgId";
	 	  		 	
					$("#varSpan").text(text);
					$("#flowVar").val(JSON2.stringify(data));
  		 			
	 	  		 	varTree.hideMenu();
	 	  		 	
 	  		 	}})
 	  		 	.makeCombTree(id)
 	  		 	.initZtree();
			})
			
		},
		
		/**
		 * 改变组来源
		 */
		_changeRadio:function(){
			$('input[name=orgKey]').val('');
			$('textarea[name=orgName]').val('');
			$('#flowVar').val('');
			$('#varSpan').text('');
			$('#nodeId1').val('');
			$('#nodeName1').val('');
		},
		
		/**
		 * 选择组数据
		 * @param conf
		 */
		_choiceUser:function(conf){
			var params =[],
			keyStr = $("input[name='orgKey']").val(),
			nameStr =  $("textarea[name='orgName']").val();
			if(!$.isEmpty(keyStr)){
				var keyAry = keyStr.split(',');
				var nameAry = nameStr.split(',');
				for(var i =0; i<keyAry.length;i++){
					var paramObj = {key:keyAry[i],name:nameAry[i]};
					params.push(paramObj);
				}
			}
			
			new PartyDialog({params:params,isObj:true,callback:function(groupData){
				var groupKeys = [];
				var groupNames = [];
				$(groupData).each(function(i){
					groupKeys.push(this['entitykey']);
					groupNames.push(this['entityname']);
				});
				 $("input[name='orgKey']").val(groupKeys); 
				 $("textarea[name='orgName']").val(groupNames);
			}}).show();
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
		retultData["orgKey"] = $('input[name="orgKey"]').val();
		retultData["orgName"] = $('textarea[name="orgName"]').val();
		sourceText = sourceText+"["+retultData["orgName"]+"]";
		if(!retultData["orgKey"] || '' == retultData["orgKey"]){
			 DialogUtil.toastr("请指定组织"); 
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
	}else if(source == 'var'){
		var flowVar =$("#flowVar").val();
		if(!flowVar || '' == flowVar) { DialogUtil.toastr("请选择变量"); return false;}
		retultData["executorVar"] = flowVar;
		flowVarText = $("#varSpan").text();
		sourceText = sourceText+"["+flowVarText+"]";
	}
	
	var containsSub = $("#containsSub").is(":checked");
	retultData["containsSub"] = containsSub;
	if(containsSub){
		 sourceText=sourceText+",包含其子组!";
	}
	 retultData["description"]=sourceText;
	 return retultData;
 }

