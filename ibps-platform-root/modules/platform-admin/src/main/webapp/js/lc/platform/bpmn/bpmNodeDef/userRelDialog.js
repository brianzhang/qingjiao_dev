/**
 * 用户关系选择弹出框js
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var userRelDialog;
var data = frameElement.dialog.params;
$(function() {
	userRelDialog  = new UserRelDialog();
	userRelDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : "#userRelForm",// 列表对象
	};
	/**
	 * 
	 * @returns {CusersDialog}
	 */
	UserRelDialog = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	UserRelDialog.prototype = {
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
			
			if(data.initData){
				//var jsonData = JSON2.parse(data.initData);
				var jsonData = eval('(' + data.initData + ')');
				me._initData(jsonData);
			}
			
			$(document).on("click","input[name='source']",function(){
				var sourceVal=$(this).val();
				me._isShowVar(sourceVal);
			});
			
			$(document).on("click","a#flowVarBut",function(){
				me._handFlowVar();
			});
			$(document).on("change","select#relationKey_",function(){
				me._changeUserRelation();
			});
		},
		
		/**
		 * 根据jsonData初始化数据界面
		 * @param jsonData
		 */
		_initData:function(jsonData){
			var me = this;
			var source = jsonData.source;
			$('input[name="source"][value="'+source+'"]').attr("checked","checked");
			$('select[name="relationKey"]').val(jsonData.relationKey);
			 me._changeUserRelation();
			 $('select[name="relationParty"]').val(jsonData.relationParty);
			 if(source == 'var'){
			 	me._isShowVar(source);
			 	var varDataJson =jsonData["var"];
			 	if(typeof varDataJson == 'string'){
			 		varDataJson =eval('('+varDataJson+')');
  				}
				$("#flowVar").val(JSON2.stringify(varDataJson));
//				var varDataJson = eval('('+varData+')');
				$("span#varSpan").text(varDataJson.source+"["+varDataJson.executorType+":"+varDataJson.name+"]");  
			 }
		},
		
		/**
		 * 是否显示人员变量选择行
		 * @param val
		 */
		_isShowVar:function(val){
			$("#varTr").hide();
			if(val=='var'){
				$("#varTr").show();
			}
		},
		
		/**
		 * 改变关系类型
		 */
		_changeUserRelation:function(){
			var option=$("#relationKey_").children('option:selected');
			var relName="对方",curName="当前方";
			if(option.val()){
				var relName =option.attr("relName");
				var curName =option.attr("curName");
			}
			$("#relationParty_").find("option[value='cur']").text(relName);
			$("#relationParty_").find("option[value='rel']").text(curName);
		},
		
		/**
		 * 人员变量
		 * @param json
		 */
		_handFlowVar : function(){
			var initData = $("#flowVar").val();
			if(initData){
				initData = JSON2.parse(initData);
			}
			var params ={defId:data.defId,nodeId:data.nodeId,type:"user",initData:initData};
			new FlowVarDialog({params:params,callback:function(varData){
				var flowVarText = varData.source+"["+varData.executorType+":"+varData.name+"]";
				$("#varSpan").text(flowVarText);
				$("#flowVar").val(JSON.stringify(varData));
			}}).show();
		},
	};
})();

/**
 * 获取数据
 */
 function getData(){
	 var retultData={};
	 var source = $('input[name="source"]:checked').val();
	 var sourceText = $('label[for="'+source+'"]').text();
	 retultData["source"]=source;
	 if(!source){
		  DialogUtil.toastr("请选择来源！");
  		  return;
	 }
	 retultData["relationKey"] =$('select[name="relationKey"]').val();
	 retultData["relationName"] =$('select[name="relationKey"]').children('option:selected').text();
	 retultData["relationParty"] =$('select[name="relationParty"]').val();
	 retultData["relationPartyName"] =$('select[name="relationParty"]').children('option:selected').text();
	 if(source == 'var'){
			var varData = $("#flowVar").val();
			if(!varData){DialogUtil.toastr("请选择人源"); return;}
			 retultData["var"]= varData;
			sourceText = sourceText+$("span#varSpan").text();  
	 }
	 sourceText=sourceText+",关系为:"+retultData["relationName"];
	 sourceText=sourceText+",关系方:"+ retultData["relationPartyName"];
	 retultData["description"]=sourceText;
	 return retultData;
 }

