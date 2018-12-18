/**
 * 人员设置-》组与组关系弹出框
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var groupRelGroup;
var data = frameElement.dialog.params;
$(function() {
	groupRelGroup  = new GroupRelGroupDialog();
	groupRelGroup.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : "#groupRelGroupForm",// 表单对象
	};
	/**
	 * 
	 * @returns {GroupRelGroupDialog}
	 */
	GroupRelGroupDialog = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	GroupRelGroupDialog.prototype = {
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
			
			$(document).on("click","input[name='source']",function(){
				me._changeSource();
			});
			
			$(document).on("change","select#groupType",function(){
				var dimKey = $(this).val();
				me._changeGroupType(dimKey,"");
			});
			
			$(document).on("click","a#varBut",function(){
				me._handFlowVar();
			});
			
			$(document).on("click","button[name='groupBut']",function(){
				me._choiceUser();
			});
			
			//处理带过来的初始化参数
			if(data.initData){
				var jsonData = JSON2.parse(data.initData);
				me._initData(jsonData);
			}
			me._changeSource();
		},
		
		/**
		 * 初始化参数
		 * @param jsonData
		 */
		_initData : function(jsonData){
			var me=this;
			var source=jsonData.source;
			$('input:radio[value='+source+']').attr("checked","checked");
			$("#groupType").val(jsonData['groupType']);
			
			 if(source == 'spec'){
  				$('input[name="groupKey"]').val(jsonData["groupKey"]);
  				$('textarea[name="groupName"]').val(jsonData["groupName"]);
  			}else if(source == 'var'){
  				var flowVar = JSON2.parse(jsonData['var']);
				var flowVarText = flowVar.source+"["+flowVar.executorType+":"+flowVar.name+"]";
				$("#varSpan").text(flowVarText); 
				$("#flowVar").val(jsonData['var']);
  			}
			
			//$('select[name="relationKey"]').val(jsonData["relationKey"]);
			$('select[name="relationParty"]').val(jsonData["relationParty"]);
			if(jsonData){
				me._changeGroupType(jsonData["groupType"],jsonData["relationKey"]);
			}
		
		},
		
		/**
		 * 修改值来源显示行
		 * @param source
		 */
		_changeSource : function(){
			var source =$("input[name='source']:checked").val();
			$("tr#varTr").hide();
			$("tr#groupTr").hide();
			if('var'==source){
				$("tr#varTr").show();
			}else if('spec'==source){
				$("tr#groupTr").show();
			}
		},
		
		
		
		/**
		 * 流程变量弹出框
		 */
		_handFlowVar:function(){
			var params ={defId:data.defId,nodeId:data.nodeId,type:"both"};
			new FlowVarDialog({params:params,callback:function(varData){
				var flowVarText = varData.source+"["+varData.executorType+":"+varData.name+"]";
				$("#varSpan").text(flowVarText);
				$("#flowVar").val(JSON.stringify(varData));
			}}).show();
		},
		
		/**
		 * 改变组来源
		 */
		_changeRadio:function(){
			var source = $('input[name=source]:checked').val();
			$("#var").hide();
			$("#spec").hide();
			var selectOne = $("#"+source);
			if(selectOne){
				selectOne.show();
			}
		},
		
		/**
		 * 改变指定组时的函数
		 */
		_changeRelation:function(){
			var checked=$("#supportRelation").is(":checked");
			if(checked){
				$("#supportRelationDiv").show();
			}else{
				$("#supportRelationDiv").hide();
			}
		},
		
		/**
		 * 修改组类型
		 * @param dimKey
		 */
		_changeGroupType : function(dimKey,initKey){
			if(!dimKey){
				DialogUtil.toastr("请选择组类型！");
		  		return;
			}
			var param ={dimKey:dimKey};
			var relationKey =  $("#relationKey_");
			$.post(__ctx+'/platform/bpmn/bpmNodeDef/getGroupRelationTypeByDimKey.htm',param,function(data){
				relationKey.empty();
				console.info(data);
				relationKey.append($("<option>").val("").text("请选择"));
				relationKey.append($("<option>").val("group").text("组关系"));
				relationKey.append($("<option>").val("role").text("角色关系"));
				$.each(data, function(i,item){
					relationKey.append($("<option>").val(item.key).text(item.name));
				});
				if(!$.isEmpty(initKey)){
					relationKey.val(initKey);
				}
			});
		},
		
		
		/**
		 * 选择组数据
		 * @param conf
		 */
		_choiceUser:function(conf){
			var dimKey = $("#groupType").val();
			if(!dimKey) { 
				DialogUtil.toastr("请选择组类型"); 
				return; 
			}
			var params ={userJson:""};
			/*new GroupDialog({params:params,type:'5',dimkey:dimKey,isObj:true,callback:function(groupData){
				var groupKeys = [];
				var groupNames = [];
				console.info(groupData);
				$(groupData).each(function(i){
					groupKeys.push(this['key']);
					groupNames.push(this['name']);
				});
				 $("input[name='groupKey']").val(groupKeys); 
				 $("textarea[name='groupName']").text(groupNames);
			}}).show();*/
			
			new PartyDialog({params:params,isObj:true,callback:function(groupData){
				var groupKeys = [];
				var groupNames = [];
				console.info(groupData);
				$(groupData).each(function(i){
					groupKeys.push(this['entitykey']);
					groupNames.push(this['entityname']);
				});
				 $("input[name='groupKey']").val(groupKeys); 
				 $("textarea[name='groupName']").text(groupNames);
			}}).show();
		}
	};
})();

/**
 * 获取数据
 * 
 */
 function getData(){
	 
	 var retultData={};
	 var groupType =$("#groupType").val();
	 if(!groupType) {
		 DialogUtil.toastr("请选择组类型"); 
		 return ;
	 }
	 retultData["groupType"]=groupType;
	 retultData["groupTypeName"]=$("#groupType").find("option[value='"+groupType+"']").text();
	 
	 var source = $('input[name=source]:checked').val();
	 if(!source) {
		 DialogUtil.toastr("请选择来源"); 
		 return ;
	 }
	 var sourceText=$("label[for='source_"+source+"']").text();
	 retultData["source"]=source;
	 
	if(source == 'spec'){
		retultData["groupKey"] = $('input[name="groupKey"]').val();
		retultData["groupName"] = $('textarea[name="groupName"]').val();
		sourceText = sourceText+"["+retultData["groupName"]+"]";
	}else if(source == 'var'){
		var flowVar =$("#flowVar").val();
		if(!flowVar) { DialogUtil.toastr("请选择变量"); return false;}
		retultData["var"] = flowVar;
		flowVarText = $("#varSpan").text();
		sourceText = sourceText+flowVarText;
	}
	
	retultData["relationKey"] =$('select[name="relationKey"]').val();
	retultData["relationTypeName"] =$('select[name="relationKey"]').children('option:selected').text();
	sourceText=sourceText+",关系类型:"+retultData["relationTypeName"];
	
	retultData["relationParty"] = $('select[name="relationParty"]').val();
	sourceText=sourceText+",关系方:"+$('select[name="relationParty"]').children('option:selected').text();
	
	 retultData["description"]=sourceText;
	 return retultData;
 }

