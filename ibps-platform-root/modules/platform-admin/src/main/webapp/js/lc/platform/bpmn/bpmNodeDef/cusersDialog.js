/**
 * 人员插件-用户
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var cusersDialog;
var data = frameElement.dialog.params;
$(function() {
	cusersDialog  = new CusersDialog();
	cusersDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TABLEID : "#CusersTable"// 列表对象
	};
	
	/**
	 * 
	 * @returns {CusersDialog}
	 */
	CusersDialog = function() {
		this.defId=data.defId;
		this.nodeId=data.nodeId;
	};

	/**
	 * 方法
	 */
	CusersDialog.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.TABLEID).length > 0)//
				this._init();
		},
		/**
		 * 初始表单
		 */
		_init : function() {
			var me = this;
			if(data.initData){
				var jsonData = JSON2.parse(data.initData);
				var source = jsonData.source;
				$('input:radio[value='+source+']').attr("checked","checked");
				if(source == 'spec'){
					$("input#fullName").val(jsonData.fullName);
					$("input#account").val(jsonData.account);
				}else if(source == 'node'){
					$("input#nodeId1").val(jsonData.nodeId);
					$("input#nodeName1").val(jsonData.nodeName);
				}else if(source == 'var'){
					var varData = jsonData['executorVar'];
					var flowVarText = varData['name'];
					$("#cusersVarSpan").text(flowVarText);
					$("#cusersFlowVar").val(JSON2.stringify(varData));
				}
			}
			this._showMenu();
			$('input[name=source]').on("change",function(){
				me._changeRadio();
			});
		},
		/**
		 * 改变人员来源
		 */
		_changeRadio:function(){
			$('#account').val('');
			$('#fullName').val('');
			$('#nodeId1').val('');
			$('#nodeName1').val('');
			$('#cusersFlowVar').val('');
			$('#cusersVarSpan').text('');
		},
		_getUsers : function(obj){
			var trObj =$(obj).parents("tr");
			var users = [];
			var accountVal = trObj.find("#account").val();
			if(accountVal){
				accountVal = accountVal.split(',');
				var fullnames = trObj.find("#fullName").val().split(',');
				for(var i = 0; i<accountVal.length;  i++){
					users[i] = {account:accountVal[i],fullname:fullnames[i]};
				}
			}
			
			var callback=function(data){
				var accounts = [];
				var names=[];
				$.each(data, function(i, content) {
					var account=this['account'];
					var fullname=this['fullname'];
					accounts.push(account);
					names.push(fullname);
				});
				trObj.find("#account").val(accounts);
				trObj.find("#fullName").val(names);
			}
			new PersonDialog({isSingle:false,isObj:true,params:users,callback : callback}).show();
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
		},
		
		/**
		 * 显示树菜单
		 */
		_showMenu : function(){
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
  		 			data.executorType = "user";
  		 			data.valType = "userId";
	 	  		 	
					$("#cusersVarSpan").text(text);
					$("#cusersFlowVar").val(JSON2.stringify(data));
  		 			
	 	  		 	varTree.hideMenu();
	 	  		 	
 	  		 	}})
 	  		 	.makeCombTree(id)
 	  		 	.initZtree();
			})

		}
	};
})();

/**
 * 获取数据
 */
 function getData(){
	 var retultData={};
	 var source = $('input[name="source"]:checked').val();
	 var sourceText = $('input[name="source"]:checked').prev().html();
	 retultData["source"]=source;
	 if(!source){
		  DialogUtil.toastr("请选择来源！");
  		  return;
	 }
	 if(source == 'spec'){
			var fullName=$("input#fullName").val();
			var account=$("input#account").val();
			retultData["account"]=account;
			retultData["fullName"]=fullName;
			sourceText = sourceText+"["+fullName+"]";
			if(!account || '' == account){
				  DialogUtil.toastr("请指定人员！");
		  		  return;
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
			var varData = $("#cusersFlowVar").val();
			if(!varData || '' == varData){DialogUtil.toastr("请选择人员变量"); return;}
			 retultData["executorVar"]=JSON2.parse(varData);
			sourceText = sourceText+"["+$("span#cusersVarSpan").text()+"]";  
		}
	 retultData["description"]=sourceText;
	 return retultData;
 }

