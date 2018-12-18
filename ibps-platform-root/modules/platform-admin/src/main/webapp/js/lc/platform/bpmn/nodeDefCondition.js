/**
 * 流程节点人员设置 nodeDefCondition
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var nodeDefCondition;
var userRule = frameElement.dialog.params;
var nodeType = 'USERTASK',defId,nodeId,formVars;
$(function() {
	if(userRule && userRule.nodeType){
		nodeType = userRule.nodeType;
	}
	defId = userRule.defId;
	nodeId = userRule.nodeId;
	formVars = userRule.formVars;
	nodeDefCondition  = new NodeDefCondition();
	nodeDefCondition.init();
});



(function() {
	//定义常量
	var 	_consts = {
			GRID : "#defConditionGrid",// 列表对象
			PAGER : '#defConditionPager'
	};
	/**
	 * 流程定义 对象
	 * @returns {BpmDefinition}
	 */
	NodeDefCondition = function() {
		//定义属性
		var rowData=[];
	};

	/**
	 * 方法
	 */
	NodeDefCondition.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//
				this._initGridList();

		},
		/**
		 * 初始表单
		 */
		_initGridList : function() {
			var me = this , defId = $("#defId").val();
			me._initTRData();
			$(document).on("change","select[name='pluginType']",function(){
				me._chageType(this);
			});
			$(document).on("click","button[name='descBut']",function(){
				me._selectUser(this);
			});
		},
		
		/**
		 * 初始化参数
		 */
		_initTRData :function(){
			var me = this;
			var conditionJson = [];
			if(userRule && userRule.condition){
				if(userRule.condition!="[]"&&userRule.condition.length >0)
				   conditionJson = userRule.condition;
			}
			$("#ruleDiv").linkdiv({data:conditionJson,updateContent:updateContent,rule2json:rule2json});
			
			// 如果脚本规则和人员配置都为空则返回
			if($.isEmpty(userRule.calcs)) {
				return ;
			}
			
			var pluginTypeJson = me._getPlugin();
			
		    var calcsList =[]  , calcsAry=[];
		     $.cloneObject(userRule.calcs,calcsList);
		    // 拼凑数据格式为[{pluginType:'',extract:'',logicCal:'',description:'',descVal:'json字符串'},{}]
		    for(var index=0 ; index <calcsList.length; index++){
		    	var calcsTemp = calcsList[index] , calcs={};
			    calcs.pluginType = calcsTemp.pluginType;
			    delete calcsTemp.pluginType;
			    calcs.extract = calcsTemp.extract;
			    delete calcsTemp.extract;
			    calcs.logicCal = calcsTemp.logicCal;
			    delete calcsTemp.logicCal;
			    calcs.description = calcsTemp.description;
			    delete calcsTemp.description;
			    calcs.descVal=JSON2.stringify(calcsTemp);
			    calcsAry.push(calcs);
		    }
		    
			var json={
					calcs : calcsAry,
					pluginType : pluginTypeJson
				};
			
			var html = me._renderHml(json);
			$("#nodeDefConTable").find("tbody").html($(html));
			me._chageType($("select[name='pluginType']"),true);
		},
		
		_chageType:function(conf,init){
			var _me=$(conf);
			var descText=_me.parents("tr").find("textarea[name='descText']");
			var descBut=_me.parents("tr").find("[name='descBut']");
			if(_me.val() == 'approver'){
				descText.val("当前流程实例所有的审批人");
				descBut.hide();
			}else{
				if(!init){
					descText.val("");
					descBut.show();
				}
			}
		},
		
		_getPlugin : function(){
			var result=[];
			$("input[name='pluginTypeVal']").each(function(){
				var _me= $(this);
				var type = _me.val();
				var title = _me.attr("title");
				value={
					type:type,
					title:title
				}
				result.push(value);
			});
			return result;
		},
		
		/**
		 * 渲染
		 * @param json
		 */
		_renderHml : function(json){
			if(!json)return;
			var data = {list :json};
			var html = template('nodeDefTem', data);
			return html;
		},
		
		/**
		 * 添加一行TR
		 * @param index
		 */
		_addUserParam : function(){
			/*var html =$("table#tableTemp").clone(true).find("tr").attr("id","userSetting").html();
			$("#nodeDefConTable").append("<tr>"+html+"</tr>");*/
			var me = this;
			var pluginTypeJson = me._getPlugin();
			var calcs=[{
				id:'',
				pluginType:'',
				description:'',
				extract:extract,
				logicCal:'',
			}];
			var json={
					calcs:calcs,
				pluginType:pluginTypeJson
			};
			var html = me._renderHml(json);
			$("#nodeDefConTable").find("tbody").append(html);
		},
		
/**   调用不同类型的选择框  begin*/   
		
		/**
		 * 选择按钮的触发动作，选择人员
		 * @param conf
		 */
		_selectUser:function(conf){
			var me=this, _me=$(conf);
			var pluginType=_me.parents("tr").find("select[name='pluginType'] option:checked").val();
			eval("me._"+pluginType+"Dialog(_me)");
		},
		
		/**
		 * cusers 选择框
		 */ 
		_cusersDialog:function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/cusersDialog.htm';
			var title="用户选择";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
				defId:defId,
				nodeId:nodeId,
				initData:descVal,
				formVars:formVars
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});
		},
		
		_userRelDialog:function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/userRelDialog.htm';
			var title="用户关系";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,	
					initData:descVal
				};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});
		},
		
		/**
		 * 组弹出框
		 * @param conf
		 */
		_groupDialog:function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/groupDialog.htm';
			var title="用户组选择";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal,
					formVars:formVars
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});
		},
		
		/**
		 * 组织弹出框
		 * @param conf
		 */
		_orgDialog:function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/userGroupDialog.htm';
			var title="组织选择";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal,
					formVars:formVars
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});
		},
		
		/**
		 * 角色
		 * @param conf
		 */
		_roleDialog:function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/roleDialog.htm';
			var title="角色选择";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});
		},
		
		/**
		 * 岗位
		 * @param conf
		 */
		_posDialog:function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/posDialog.htm';
			var title="岗位选择";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});
		},
		
		/**
		 * 组织负责人
		 * @param conf
		 */
		_orgManagerDialog:function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/orgManagerDialog.htm';
			var title="组织负责人选择";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal,
					formVars:formVars
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			};
			me._openDialog({url:url,param:param,title:title,callback:callback});
		},
		
		/**
		 * 上下级弹出框
		 * @param conf
		 */
		_userGradeDialog : function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/userGradeDialog.htm';
			var title="用户上下级配置";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});	
		},
		
		/**
		 * 用户组弹出框
		 * @param conf
		 */
		_groupGradeDialog : function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/groupGradeDialog.htm';
			var title="用户组等级选择";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});	
		},
		
		/**
		 * 用户属性弹出框
		 * @param conf
		 */
		_userPropDialog : function(conf,groupType){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/org/attribute/userParamDialog.htm';
			var title="用户属性选择";
			if(groupType){
				url = url+'?dimKey='+groupType;
				title="用户组属性选择";
			}
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});	
		},
		
		/**
		 * 用户组属性弹出框
		 * @param conf
		 */
		_groupPropDialog : function(conf){
			var me = this, thisObj=$(conf), divObj =  thisObj.closest("div");
			var groupType = divObj.find("input[name='groupType']").val();
			if($.isEmpty(groupType)){
				var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/groupTypeDialog.htm';
				var title="选择类型";
				var param={};
				var callback=function(data){
					divObj.append("<input type='hidden' name='groupType' value='"+data.groupType+"'>");
					divObj.append("<input type='hidden' name='groupName' value='"+data.groupName+"'>");
					me._userPropDialog(conf,data.groupType);
				 };
				 me._openDialog({url:url,param:param,area:['35%', '30%'],title:title,callback:callback});	
			}else{
				me._userPropDialog(conf,groupType);
			}
			
		},
		
		/**
		 * 组与组插件功能
		 */
		_groupRelGroupDialog : function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/groupRelGroupDialog.htm';
			var title="组与组关系选择";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val(data.description);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,title:title,callback:callback});	
		},
		
		
		/**
		 * 人员脚本
		 * @param conf
		 */
		_hrScriptDialog:function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var descVal= trObj.find("[name='descVal']").text();
			var param={};
			if(descVal){
				param=eval('('+descVal+')');
			}
			
			var params = {params:param,defId:defId,nodeId:nodeId,formVars:formVars,callback:function(data){
				 trObj.find("[name='descText']").val(data.conDesc);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			}};
			
			new ScriptDialog(params).show();
		},
		
		/**
		 * 相同节点执行人
		 * @param conf
		 */
		_sameNodeDialog:function(conf){
			var me = this, thisObj=$(conf), trObj =  thisObj.parents("tr");
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/sameNodeDialog.htm?defId='+defId+'&nodeId='+nodeId;
			var title="相同节点执行人";
			var descVal= trObj.find("[name='descVal']").text();
			var param={
					defId:defId,
					nodeId:nodeId,
					initData:descVal
			};
			var callback=function(data){
				 trObj.find("[name='descText']").val('节点：'+data.nodeName);
				 trObj.find("[name='descVal']").text(JSON2.stringify(data));
			 };
			 me._openDialog({url:url,param:param,area:['35%', '30%'],title:title,callback:callback});
		},
		
		_openDialog:function(conf){
			if(!conf){
				return;
			}
			DialogUtil.dialog({
				   content: conf.url,
				   params: conf.param,
				   title:conf.title,
				   area:conf.area?conf.area:['60%', '85%'] ,
				   btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						   var  data = DialogUtil.getChildFrameWindow(index).getData();
						   if(data){
							  if(conf.callback){
								  conf.callback.call(this,data); 
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
		
/**   调用不同类型的选择框  end*/   
		
/**   规则设置操作函数 start */
		/**
		 * 添加规则或者脚本
		 */
		_addDiv : function(ruleType){
			var params = {
				ruleType:ruleType,
				formVars:formVars
			};

			if(ruleType ==1){
				new RuleConditionDialog({params:params,defId:defId,nodeId:nodeId,callback:function(data){
					$("#ruleDiv").linkdiv("addDiv",data); 
				}}).show();
			}else{
				new ScriptDialog({params:params,defId:defId,nodeId:nodeId,callback:function(data){
					$("#ruleDiv").linkdiv("addDiv",data); 
				}}).show();
			}
		},
		/**
		 * 组合规则
		 */
		_assembleDiv : function(){
			$("#ruleDiv").linkdiv("assembleDiv");	
		},
		/**
		 * 拆分规则
		 */
		_splitDiv : function(){
			$("#ruleDiv").linkdiv("splitDiv");
		},
		/**
		 * 删除规则
		 */
		_removeDiv : function(){
			$("#ruleDiv").linkdiv("removeDiv");	
		},
/**   规则设置操作函数 end */
		
		
		
		
		/**
		 * 删除选择行
		 */
		_deleteSelect : function(){
				$("input:checkbox[name='key']:checked").each(function(){
					var _me=$(this);
						_me.parents("tr").remove();
				});
		},
		
		/**
		 * 预览
		 */
		_previewCondition : function(){
			var me=this ;
			var nodeJsonArray = me._getUserRuleData();
			if(!nodeJsonArray) return;
			//console.info(nodeJsonArray);
			var url = __ctx +'/platform/bpmn/bpmUserCondition/preview.htm';
			DialogUtil.dialog({
				   content: url,
				   params: nodeJsonArray,
				   title:'人员预览',
				   area:['60%', '85%']
			});
		},
		
		/**流程节点页面调用获取json的方法*/
		_getUserRuleData:function(){
			//条件
			var me=this , conditionJson = $("#ruleDiv").linkdiv("getData");
			if(!userRule){userRule={}};
			userRule.condition = JSON.stringify(conditionJson);
			// 用户条件列表
			var rows = me._getUserSettingData();
			userRule.calcs = rows;
			if(rows.length < 1){
				DialogUtil.toastr("请添加人员配置项。");
				return false;
			}
			 // 拼装描述
			var description = "";
			for(var i =0; i< rows.length;i++){
				// 如果 配置条件为空 则return
				if(!rows[i]["description"]){
					DialogUtil.toastr("人员配置无效");
					return false;
				}
				var pluginType = $($("[name='pluginType']")[0]).find("option[value="+rows[i]["pluginType"]+"]").text();
				var condition = $($("[name='compType']")[0]).find("option[value="+rows[i]["logicCal"]+"]").text();
				 description = description+"【"+pluginType+"】"+rows[i]["description"]+"（"+condition+"） ;　";
			}
			userRule.description = description;
			if(!userRule.groupNo) userRule.groupNo = -1;
			
			return userRule;
		},
		
		/**
		 * 获取人员设置框中每一行的数据
		 * @returns {Array}
		 */
		_getUserSettingData : function(){
			var rowDataAry=[];
			$("tr[name='userSetting']").each(function(){
				var thisObj=$(this);
				var rowData={};
				rowData.pluginType =thisObj.find("[name='pluginType']").val();
				rowData.extract =thisObj.find("[name='extractUser']").val();  
				rowData.logicCal = thisObj.find("[name='compType']").val()
				rowData.description = thisObj.find("[name='descText']").val();
				var groupType = thisObj.find("[name='groupType']").val();
				if(groupType){
					rowData.groupType = groupType;
					rowData.groupName = thisObj.find("[name='groupName']").val();
				}
				var descVal = thisObj.find("[name='descVal']").text();
				var calcVal={};
				if(descVal){
					calcVal = eval('('+thisObj.find("[name='descVal']").text()+')');
				}
				rowData.source = calcVal.source;
				 var extendData = $.extend({}, rowData,calcVal);
				rowDataAry.push(extendData);
			})
			return rowDataAry;
		}
		
	};
})();

function getData(){
	var data = nodeDefCondition._getUserRuleData();
	return data;
}


