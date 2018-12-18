/**
 * 
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var scriptRule;
var data = frameElement.dialog.params;
$(function() {
	scriptRule = new CommonScriptRuleDialog();
	scriptRule.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TREE : "#varTree",// 对象
			TABLE :"#scriptRuletable"
	};
	
	CommonScriptRuleDialog = function(){
		//定义属性
		this.defId=data.defId;
		this.nodeId=data.nodeId;
		this.formVars=data.formVars;
		this._editor = null;
	}
	
	CommonScriptRuleDialog.prototype={
			consts:	_consts,
			/**
			 * 初始化
			 */
			init : function() {
				if (this.hasInit) // 是否已初始化
					return false;
				this.hasInit = true;
				if ($(this.consts.TREE).length > 0)//
					this._initTREE();
			},
			
			_initTREE : function(){
				var me = this;
				$(".btn-xs").each(function(){
					var id = $(this).attr("id");
					console.log(me.formVars);
		 	  		var varTree = new BpmFormVar('varTree'+id, me.formVars)
	 	  		 	.setCallback({onClick:function(event, treeId, node){
		 	  			var text="";
		 	  		 	if(node.attrType == 'field'){
		  		 			text = node.tableName+'.'+node.key+'';
		  		 		}else if (node.attrType == 'var'){
		  		 			text =node.name;
		  		 		}else if(node.attrType == 'bpmConstants'){
		  		 			text =node.key;
		  		 		}else return ;
		 	  		 	
						me._editor.setValue(text);
		 	  		 	varTree.hideMenu();
		 	  		 	
	 	  		 	}})
	 	  		 	.makeCombTree(id)
	 	  		 	.initZtree();
				})
				
				if(data.params.script)
					$("#script").val(data.params.script);
				if(data.params.conDesc)
					$("#conDesc").val(data.params.conDesc);
				//初始化代码显示框
				me._initCodeMirror();
			},
			
			/**
			 * 初始化代码显示框
			 */
			_initCodeMirror:function(){
				var me=this;
				var height = $("#script").height();
				me._editor = CodeMirror.fromTextArea(document.getElementById("script"), {
					mode: "groovy",
					tabMode: "indent",
					lineNumbers: true
				 });
				
				me._editor.setSize("100%",height);
			},
			
			/**
			 * 常用脚本
			 */
			_selectScript : function(){
				var me = this,
					  url = __ctx+'/platform/script/commonScript/selectorDialog.htm';
				DialogUtil.dialog({
					title : '常用脚本选择框',
					content : url,
				    area : ['60%', '80%'],
				    btn: [{
						   label:'确定',
						   iconCls : 'btn btn-primary fa fa-ok',
						   action:function(dialog,index){
							  var dataList = DialogUtil.getChildFrameWindow(index).getData();
							  var data='';
							  for(var i=0; i<dataList.length;i++){
								  data += dataList[i].script+'   ';
							  }
							  me._editor.setValue(data);
							  DialogUtil.close(index);
						   }
					   },
					   {
						   label:'取消',
						   iconCls : 'btn btn-danger fa fa-cancel',
						   action:function(dialog,index){
							    DialogUtil.close(index);
						   }
					   }]
				});
			
			},
			
			/**
			 * 条件脚本
			 */
			_selectConditionScript : function(){
				var me = this,
				  url = __ctx+'/platform/script/conditionScript/setting.htm';
			DialogUtil.dialog({
				title : '条件脚本选择框',
				content : url,
			    area : ['60%', '80%'],
			    btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						  var dataList = DialogUtil.getChildFrameWindow(index).getData();
						  var data='';
						  for(var i=0; i<dataList.length;i++){
							  data += dataList[i].script+'   ';
						  }
						  me._editor.setValue(data);
						  DialogUtil.close(index);
					   }
				   },
				   {
					   label:'取消',
					   iconCls : 'btn btn-danger fa fa-cancel',
					   action:function(dialog,index){
						    DialogUtil.close(index);
					   }
				   }]
			});
		
			},
		};
})();

function getData(){
	
	var returnData={
			ruleType:data.params.ruleType
	}
	returnData.script = scriptRule._editor.getValue();
	returnData.conDesc = $("#conDesc").val();
	if(!returnData.script) {
		DialogUtil.toastr("请填写脚本！");
		return ;  
	}
	if(!returnData.conDesc) returnData.conDesc = "脚本";
	return returnData;
}
	
