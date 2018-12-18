/**
 * 流程代理条件
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-30 17:29:15
 *</pre>
 */
var formVars,defId,nodeId = '';
$(function() {
	bpmAgentCondition  = new BpmAgentCondition();
	bpmAgentCondition.init();
	
	formUrl = bpmAgentCondition.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmAgentConditionGrid",// 列表对象
			PAGER : "#bpmAgentConditionPager",// 列表分页
			FORM : '#bpmAgentConditionForm'// 表单form
	};
	/**
	 * 流程代理条件 对象
	 * @returns {BpmAgentCondition}
	 */
	BpmAgentCondition = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmAgentCondition.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
//				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/bpmn/bpmAgentCondition/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','代理ID','代理人ID','条件名称','条件描述','条件内容','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'agentId',
				                	   index: 'agent_id_'

				                	 					                	 	}, {
				                 	   name:'agenterId',
				                	   index: 'agenter_id_'

				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'

				                	 					                	 	}, {
				                 	   name:'desc',
				                	   index: 'desc_'

				                	 					                	 	}, {
				                 	   name:'condition',
				                	   index: 'condition_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/bpmn/bpmAgentCondition/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/bpmn/bpmAgentCondition/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/bpmAgentCondition/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form,function(){
				$("textarea[name='m:bpmAgentCondition:condition']").val(JSON2.stringify(me._getRuleData()));
			});
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				formUrl.submit(me._showResponse);
			});
		},
		/**
		 * 添加规则或者脚本
		 */
		_addDiv : function(ruleType){
			var params = {
				ruleType:ruleType,
				formVars:this.formVars
			};

			if(ruleType ==1){
				new RuleConditionDialog({params:params,defId:this.defId,nodeId:'',callback:function(data){
					$("#ruleDiv").linkdiv("addDiv",data); 
				}}).show();
			}else{
				new ScriptDialog({params:params,defId:this.defId,nodeId:'',callback:function(data){
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
		/**
		 * 初始化数据
		 */
		_initTRData :function(){
			var me = this;
			var conditionJson = [];
			var conditionVal = $("textarea[name='m:bpmAgentCondition:condition']").val();
			if(!$.isEmpty(conditionVal)){
				conditionJson = JSON.parse(conditionVal);
			}
			
			$("#ruleDiv").linkdiv({
				data:conditionJson
				,updateContent:updateContent
				,rule2json:rule2json
				}
			);
		},
		/**
		 * 获取条件数据
		 */
		_getRuleData:function(){
			return $("#ruleDiv").linkdiv("getData");
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
					&& !$.isEmpty(frameElement.dialog) 
					&& !$.isEmpty(frameElement.dialog.params)){
				var params = frameElement.dialog.params;
				if(!$.isEmpty(params.data)){
					var data = params.data;
					this.formUrl.setData("[name^='m:']", data);
				}
				selectorControl.initData();
				
				this.defId = params.defId;
				defId = params.defId;
				this.formVars = this._initFormVars(this.defId);
			}
			this._initTRData();
			this.formUrl.validate();
		},
		_initFormVars : function(defId){
			var me = this, url = __ctx+'/platform/bpmn/bpmDefine/buildFormVars.htm';
			$.post(url, {defId: defId}, function (data) {
				data = JSON.parse(data);
				if($.isEmpty(data)){return;}
				
				var bocode = '';
				for(var i = 0,len = data.length; i < len; i ++){
					if(data[i].attrType == 'table'){
						bocode = data[i].key;
						data.splice(i,1);
						break;
					}
				}
				
				if($.isEmpty(bocode)){
					me.formVars = data;
				}else{
					url = __ctx+"/platform/bo/boDef/getBoTree.htm";
					$.post(url,{code:bocode},function(result){
						$.merge(result, data);
						me.formVars = result;
						formVars = result;
					});
				}
            });
	    	
	    },
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/bpmn/bpmAgentCondition/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


