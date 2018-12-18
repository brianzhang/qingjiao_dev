/**
 * 用户组等级弹出框
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var groupGradeDialog;
var data = frameElement.dialog.params;
$(function() {
	groupGradeDialog  = new GroupGradeDialog();
	groupGradeDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : "#groupGradeForm",// 表单对象
	};
	/**
	 * 
	 * @returns {GroupGradeDialog}
	 */
	GroupGradeDialog = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	GroupGradeDialog.prototype = {
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
			var me= this;
			$(document).on("click","input[name='source']",function(){
				me._changeSource();
			});
			
			$(document).on("change","select#groupType",function(){
				var dimKey = $(this).val();
				me._changeGroupType(dimKey,"");
			});
			
			$(document).on("click","input#supportRelation",function(){
				var checked=$(this).is(":checked");
				me._changeRelation(checked);
			});
			
			$(document).on("click","a#varBut",function(){
				me._handFlowVar();
			});
			
			$(document).on("click","button[name='groupBut']",function(){
				me._choiceUser();
			});
			
			if(data.initData){
				var jsonData = JSON2.parse(data.initData);
				me._initData(jsonData);
			}
			me._changeSource();
		},
		
		/**
		 * 初始化数据
		 */
		_initData : function(jsonData){
			var me = this;
			var jsonData = JSON2.parse(data.initData);
			 var source = jsonData.source;
			 $('input:radio[value='+source+']').attr("checked","checked");
			 $("#groupType").val( jsonData["groupType"]);
			 
			 if(source == 'spec'){
			 	 $('input[name="groupKey"]').val(jsonData["groupKey"]);
			 	 $('textarea[name="groupName"]').text(jsonData["groupName"]);
			}else if(source == 'var'){
				var varData = jsonData["var"];
				$("#flowVar").val(varData);
				var varDataJson = eval('('+varData+')');
				var varSpanText = varDataJson.source+"["+varDataJson.executorType+":"+varDataJson.name+"]";
				$("span#varSpan").text(varSpanText);  
			}
			 if(jsonData["supportRelation"]){
				 $("#supportRelation").attr("checked","checked");
				 $('input[name="findStrategy"][value="'+jsonData["findStrategy"]+'"]').attr("checked","checked");
			 }else{
				 $("#supportRelation").removeAttr("checked","");
			 }
			 me._changeRelation(jsonData["supportRelation"]);
			 me._changeGroupType(jsonData["groupType"],{relationType:jsonData["relationType"],grade: jsonData["grade"]});
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
		 * 修改组类型
		 * @param dimKey
		 */
		_changeGroupType : function(dimKey,relationJson){
			if(!dimKey){
				DialogUtil.toastr("请选择组类型！");
		  		return;
			}
			var param ={dimKey:dimKey};
			$.post(__ctx+'/platform/bpmn/bpmNodeDef/getRelationTypeByDimKey.htm',param,function(data){
				var relationType =  $("#relationType");
				relationType.empty();
				console.info(data);
				//relationType.append($("<option>").val('slave').text('从属'));
				$.each(data, function(i,item){
					relationType.append($("<option>").val(item.key).text(item.name));
				});
			});
			
			$.post(__ctx+'/platform/bpmn/bpmNodeDef/getGradeByDimKey.htm',param,function(data){
				var grade =  $("#grade");
				grade.empty();
				console.info(data);
				$.each(data, function(i,item){
					grade.append($("<option>").val(item.key).text(item.name));
				});
				if(!$.isEmpty(relationJson)){
					$("#grade").val(relationJson.grade);
					$("#relationType").val(relationJson.relationType);
				}
			});
		},
		
		/**
		 * 改变指定组显示行
		 */
		_changeRelation:function(checked){
			if(checked){
				$("tr[name='supportRelationTr']").show();
			}else{
				$("tr[name='supportRelationTr']").hide();
			}
		},
		
		/**
		 * 选择组数据
		 * @param conf
		 */
		_choiceUser:function(){
			var dimKey = $("#groupType").val();
			if(!dimKey) { 
				DialogUtil.toastr("请选择组类型"); 
				return; 
			}
			var params ={userJson:""};
			new GroupSelectDialog({params:params,type:'5',dimKey:dimKey,callback:function(groupIds,groupNames,groups){
				var groupKeys = [];
				$(groups).each(function(i){
					groupKeys.push(this['key']);
				});
				 $("#groupKey").val(groupKeys); 
				 $("#groupName").val(groupNames);
			}}).show();
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
	 var sourceText = $('label[for="source_'+source+'"]').text();
	 retultData["source"]=source;
	 if(!source){
		  DialogUtil.toastr("请选择来源！");
  		  return;
	 }
	 
	 var groupType =$("#groupType").val();
	 retultData["groupType"]=groupType;
	 retultData["grade"] =$('select[name="grade"]').val();
	 retultData["gradeName"] =$('select[name="grade"]').children('option:selected').text();
	 retultData["supportRelation"] = $("#supportRelation")[0].checked;
	 
	 if(!groupType) {
		 DialogUtil.toastr("请选择组类型"); 
		 return false;
		 }
	if(!retultData["grade"]) {
		 DialogUtil.toastr("请选择等级分类"); 
		return false;
	}
	 
	 if(source == 'spec'){
		 	retultData["groupKey"] = $('input[name="groupKey"]').val();
		 	retultData["groupName"] = $('textarea[name="groupName"]').val();
		 	if(!retultData["groupKey"]){
				DialogUtil.toastr("请指定组！");
				return;
			}
		 	sourceText = sourceText+"["+retultData["groupName"]+"]";
		}else if(source == 'var'){
			var varData = $("#flowVar").val();
			if(!varData){
				DialogUtil.toastr("请选择人员变量！");
				return;
			}
			 retultData["var"]= varData;
			sourceText = sourceText+$("span#varSpan").text();  
		}
	 sourceText=sourceText+",等级分类:"+retultData["gradeName"];
	 if(retultData["supportRelation"]){
		 	retultData["relationType"] =$('select[name="relationType"]').val();
		 	retultData["relationTypeName"] =$('select[name="relationType"]').children('option:selected').text();
		 	retultData["findStrategy"]=$('input[name="findStrategy"]:checked').val();
			sourceText=sourceText+",指定关系:"+retultData["relationTypeName"];
			sourceText =sourceText+",查找类型 "+ retultData["findStrategy"];
		}
	 retultData["description"]=sourceText;
	 return retultData;
 }

