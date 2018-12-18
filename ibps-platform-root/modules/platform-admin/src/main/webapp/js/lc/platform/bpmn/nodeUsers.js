/**
 * 流程节点人员设置
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var dataJson;
var nodeUsers;
$(function() {
	nodeUsers  = new NodeUsers();
	nodeUsers.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TABLEID : "#nodeUsersTable",// 列表对象
	};
	/**
	 * 流程定义 对象
	 * @returns {BpmDefinition}
	 */
	NodeUsers = function() {
		//定义属性
		this.parentFlowKey = $("#parentFlowKey").val();
		this.defId = $("#defId").val();
	};

	/**
	 * 方法
	 */
	NodeUsers.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.TABLEID).length > 0)//
				this._initNodeUser();

		},
		/**
		 * 初始表单
		 */
		_initNodeUser : function() {
			var me = this;
			if(me.defId){
				me._getNodeUserData();
			}
			$(document).on("click","a.fa-add",function(){
				var _me = $(this);
				var _nodeId = _me.siblings("[name='nodeId']").val();
				var _type = _me.siblings("[name='type']").val();
				me._initAdd(_nodeId,_type);
			});
			$(document).on("click","#saveNode",function(){
				var _me = $(this);
				var _nodeId = _me.siblings("[name='nodeId']").val();
				var _type = _me.siblings("[name='type']").val();
				me._saveNodeJson(_nodeId,_type);
			});
			$(document).on("click","#saveAllNode",function(){
				me._saveAllNodeJson();
			});
		},
		
		/**
		 * 获取流程节点数据
		 * @param defId
		 */
		_getNodeUserData : function(){
			var me = this;
			if(!me.defId) {
				return;
			}
			var url=__ctx+'/platform/bpmn/bpmNodeDef/getNodesJson.htm';
			var param={
					defId : me.defId,
					parentFlowKey:me.parentFlowKey
			}
			$.post(url,param,function(data){
				if(data){
					dataJson = JSON2.parse(data);
					$("[name='nodeId']").each(function(){
						var _me =$(this);
						var val=_me.val();
						var _type = _me.siblings("[name='type']").val();
						var html = me._renderHml({
							dataJson:dataJson[val],
							nodeId:val,
							nodeType:_type
							});
						var tbodyObj = $("[tempId='"+val+"']").find("tbody");
						if(tbodyObj){
							tbodyObj.append(html);
						}
					})
				}
			})
		},
		
		/**
		 * 渲染
		 * @param json
		 */
		_renderHml : function(json){
			if(!json)return;
			var data = {list :json};
			var html = template('nodeUserTem', data);
			return html;
		},
		
		/**
		 * 初始化添加操作
		 */
		_initAdd : function(nodeId,type,i){
			if(!nodeId || !type) {
				return ;
			}
			if(!dataJson){
				dataJson={}
				};
			var param = {
					nodeType : nodeId
			}
			if(i != undefined){
				param = dataJson[nodeId][i];
				param.nodeType = nodeId;
			}
			var me = this ;
			var url=__ctx+'/platform/bpmn/bpmNodeDef/conditionEdit.htm?defId='+me.defId+"&nodeId="+nodeId+"&nodeType"+type;
			
			DialogUtil.dialog({
				   content: url,
				   params:param,
				   title:"节点人员条件",
				   area: ['60%', '85%'],
				   btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						   var  data = DialogUtil.getChildFrameWindow(index).getData();
						   if(data){
							   if(data.groupNo==-1){
								   data.groupNo = dataJson[nodeId].length+1;
							   }
							   if($.isEmpty(dataJson[nodeId])){
								   dataJson[nodeId]=[]
								   dataJson[nodeId].push(data);
							   }else{
								   if( i != undefined){
									   dataJson[nodeId][i] = data;
								   }else{
									   dataJson[nodeId].push(data);
								   }
							   }
							 
								var html = me._renderHml({
									dataJson:dataJson[nodeId],
									nodeId:nodeId,
									nodeType:type
									});
								var tBodyObj = $("[tempId='"+nodeId+"']").find("tbody");
								if(tBodyObj){
									tBodyObj.html(html);
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
			})
		},
		
		/**
		 * 保存全局节点数据
		 */
		_saveAllNodeJson : function(){
			if(!dataJson) {
				return ;
			}
			console.log(dataJson);
			var me = this, isRepeat=false;
			for(var nodeId in dataJson){
				isRepeat = me._checkRepeat(nodeId);
				if(isRepeat){
					break ;
				}
			}
			if(isRepeat){
				return ;
				}
			var nodesJson = JSON.stringify(dataJson);
			var url=__ctx+'/platform/bpmn/bpmNodeDef/saveAllUserCondition.htm';
			var params={
					defId : me.defId,
					nodesJson : nodesJson,
					parentFlowKey : me.parentFlowKey
			};
//			console.log(params);
			$.post(url,params,function(responseText){
				 var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.msg(resultMessage.getMessage(), function(rtn) {
						//	window.location.reload(true);
						});
				    }else{
				    	DialogUtil.error(resultMessage.getMessage());
				    } 
			});
		},
		
		/**
		 * 保存单个节点数据
		 * @param nodeId
		 * @param nodeType
		 */
		_saveNodeJson : function(nodeId,nodeType){
			if(!nodeId || !dataJson) {
				return ;
			}
			var me =this;
			if(me._checkRepeat(nodeId)){
				return;
			}
			var nodeJson = JSON2.stringify(dataJson[nodeId]);
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeUserConditionSave.htm';
			var params={
					nodeId : nodeId,
					defId : me.defId,
					nodeJson : nodeJson,
					parentFlowKey : me.parentFlowKey
					}; 
			
			$.post(url,params,function(responseText){
				var resultMessage = new com.lc.form.ResultMessage(responseText);
			    if (resultMessage.isSuccess()) {
			    	DialogUtil.toastr(nodeId+"节点人员条件配置成功!",true);
			    } else{
			    	DialogUtil.error(nodeId+"节点人员条件配置失败!");
			    }
			});
		},
		
		/**
		 * 根据nodeId，检查批次号是否重复
		 * @param nodeId
		 */
		_checkRepeat:function(nodeId){
			if(!nodeId || !dataJson) {
				return true;
			}
			var groupNo="" , isRepeat = false ;
			var nodeAry = dataJson[nodeId];
			for(var index=0; index<nodeAry.length; index++){
				var nodeJson = nodeAry[index];
				var No = '{'+nodeJson.groupNo+'}';
				if(groupNo.indexOf(No) != -1){
					DialogUtil.toastr(nodeId +" 节点 配置批次号 不能重复");
					isRepeat = true;
					return isRepeat;
				} 
				groupNo = groupNo + No;
			}
			return isRepeat;
		},
		
		_changeNo : function(conf,nodeId,index){
			if(!dataJson) {
				return true;
			}
			var value = $(conf).val();
			dataJson[nodeId][index].groupNo=value;
		},
		
		_delNodeAttr : function(nodeId,nodeType,index){
			if(!dataJson) {
				return true;
			}
			var me = this;
			dataJson[nodeId].splice(index,1);
			var html = me._renderHml({
				dataJson : dataJson[nodeId],
				nodeId : nodeId,
				nodeType : nodeType
				});
			var tBodyObj = $("[tempId='"+nodeId+"']").find("tbody");
			if(tBodyObj){
				tBodyObj.html(html);
			}
		}
		
	};
})();


