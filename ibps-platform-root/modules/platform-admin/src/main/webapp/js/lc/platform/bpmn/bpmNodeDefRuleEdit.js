/**
 * 流程表单定义- 表单
 * 
 * <pre>
 * 作者：caixy
 * 邮箱：3286168767@qq.com
 * 日期：2016-1-5 15:49:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	bpmNodeDefRuleEdit  = new BpmNodeDefRuleEdit();
	bpmNodeDefRuleEdit.init();
});

(function() {
	//定义常量
	var 	_consts = {
		FORM : '#ruleFrom'// 表单form
	};
	/**
	 * 流程定义 对象
	 * @returns {BpmNodeDefRuleEdit}
	 */
	BpmNodeDefRuleEdit = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmNodeDefRuleEdit.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			
			this._initForm()
		},
		_initForm : function() {
			var form = $(this.consts.FORM);
			
			this.frm = form.form();
		
			this._initData();
			// 触发表单验证
			this.frm.valid();
		},
		_initData:function(){
			var params = frameElement.dialog.params,
				nodes = params.nodes, 
				data = params.data,
				targetNode = $("#targetNode"),
				options="";
			for(var i=0;i<nodes.length;i++){
				var node = nodes[i];
				options += "<option value='"+node.id+"'>"+node.name+"</option>";
			}
			targetNode.append(options);
			
			this.initFormVar(params.formVars);
			if($.isEmpty(data))
				return;
			targetNode.val(data.targetNode);
			$("#ruleName").val(data.ruleName);
			
			setTimeout(function(){
					InitMirror.editor[0].setCode(data.condition);
			},500);
		},
		initFormVar:function (formVars){
			$(".js-form-var").each(function(idx){
	 	  		var id = $(this).attr("id");
	 	  	   var   varTree = new BpmFormVar('varTree'+id,formVars)
	 	  		 	.setCallback({onClick:function(event, treeId, node){
	 	  			var data ="";
	 	  		 	if(node.attrType == 'field'){
	  		 			if(node.type == 'string')
	  		 		  	    data = node.tableName+'.getString("'+node.key+'")';
	  		 			else if(node.type == 'number')
	  		 		  		data = node.tableName+'.getInt("'+node.key+'")';
	  		 			else if(node.type == 'date')
	  		 				data = node.tableName+'.getDate("'+node.key+'")';
	  		 			else data = node.tableName+'.get("'+node.key+'")';
	  		 		}else if (node.attrType == 'var'){
	  		 			data =node.name;
	  		 		}else if(node.attrType == 'bpmConstants'){
	  		 			data =node.key;
	  		 		}else return ;
	 	  		 		varTree.hideMenu();
	 	  		 		InitMirror.editor[0].insertCode(data);
	 	  		 	}})
	 	  		 	.makeCombTree(id)
	 	  		 	.initZtree();
			});
		},
		
		selectConditionScript:function(){
			/*new ConditionScript({
				callback:function(data){
					InitMirror.editor[0].insertCode(data);
				}
			}).show();*/
			
			var url = __ctx+'/platform/script/conditionScript/setting.htm';
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
					  InitMirror.editor[0].insertCode(data);
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
		
		selectScript:function(){
			new ScriptSelDialog({
				callback:function(data){
					InitMirror.editor[0].insertCode(data);
				}
			}).show();
		},
		getData:function(){
			if(!this.frm.valid())
				return;
			return {
				ruleName:$("#ruleName").val(),
				targetNode:$("#targetNode").val(),
				condition:InitMirror.editor[0].getCode()
			};
		}
		
	};
	
})();

function getData(){
	return bpmNodeDefRuleEdit.getData();
}
	