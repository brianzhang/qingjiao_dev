/**
 * 流程中心
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017-09-28 10:29:56
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	bpmTask  = new BpmTask();
	bpmTask.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TYPE_TREE:"#typeTree",
			PAGER : "#taskPager",// 列表分页
			HANDLED_GRID : "#handledGrid"//已办任务 列表
	};
	/**
	 * 流程中心 对象
	 * @returns {BpmTask}
	 */
	BpmTask = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmTask.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			//布局
			this._initLayout();
	
			if ($(this.consts.TYPE_TREE).length > 0)//分类树
				this._initTypeTree();
			if ($(this.consts.HANDLED_GRID).length > 0)//已办任务列表
				this._initHandledGridList();
		},
		/**
		 * 我审批过的事务
		 */
		_initHandledGridList:function(){
			$(this.consts.HANDLED_GRID).GridList({
				url :  __ctx+'/platform/office/bpmReceivedTask/handledJson.htm',
				pager :this.consts.PAGER,
				multiselect:false,
				colNames: ['审批意见ID','请求标题', '流程实例ID','任务名称', '处理动作', '创建时间', '处理时间', '管理'],
		        colModel: [{
		                 	   name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 },  {
		                 	   name:'subject',
		                	   index: 'subject_',
		                	   width : 150,
			               	   formatter:function(val, opts, rowData) {
		                			 return '<a href="javascript:bpmTask.instance(\''+rowData.procInstId+'\',\''+val+'\')">'+val+'</a>';
		                		}
		                	 }, {
		                 	   name:'procInstId',
		                	   index: 'PROC_INST_ID_',
		                	   hidden:true
		                	 }, {
			                 	   name:'taskName',
			                	   index: 'TASK_NAME_'
			                },{
			                 	   name:'status',
			                	   index: 'STATUS_',
			                   	   width : 80,
			                	   formatter:'dataFormat',
			                	   formatoptions:{
			                		   value:[{name:'agree',value:'同意',css:'green'},
			                		          {name:'oppose',value:'反对',css:'red'},
			                		          {name:'reject',value:'驳回',css:'red'},
			                		          {name:'rejectToStart',value:'驳回发起人',css:'red'},
			                		          {name:'abandon',value:'弃权',css:'red'}
			                		    ]
			                	   }
			                }, {
		                 	   name:'createTime',
		                	   index: 'CREATE_TIME_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 }, {
			                 	   name:'completeTime',
			                	   index: 'COMPLETE_TIME_',
			                	   width : 80,
			                  	   formatter: 'timestamp',
			                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 }, {
									name : '__manage',
									label:'管理',
									width : 20,
									sortable:false,
									classes:"rowOps",
									formatter : 'manage',
									formatoptions :[
									  {
										label:"撤回",
										hidden:true,
										classes:'btn btn-primary fa fa-reply',
										action:'javascript:bpmTask.revoke("{procInstId}", "{taskId}", "{taskKey}");'
									  }
									]
		                	 }
			              ]
					});
		},
		/**
		 * 初始化布局
		 */
		_initLayout:function(){
			var layout =   $('body').layout({ applyDefaultStyles: true,
					onopen :function(){
						GridList.resizeGridSize();
					},
					onclose:function(){
						GridList.resizeGridSize();
					},
					onresize:function(){
						GridList.resizeGridSize();
					}
				});  
			layout.addPinBtn(".pinBtn", "west" );
		},
		_initTypeTree:function(){
			//加载分类树
		  	var typeTree =  new TypeTree( $(this.consts.TYPE_TREE),{
			  	categoryKey: 'FLOW_TYPE',
				onClick:function(event, treeId, treeNode){
					var typeId =treeNode.id;
					if(treeNode.isRoot == 1)
						typeId = "";
					$("#typeId").val(typeId);
					$("a.btn.fa-search").click();
				}
			}); 
		},
		/**
		 * 查看流程实例
		 * @param id
		 */
		instance:function(id){
			DialogUtil.openFullWindow({
				title:'查看流程',
				content:__ctx+'/platform/bpmn/instance/bpmInst/detail.htm?id='+id + '&isReturn=0'
			});
		},
		/**
		 * 撤销流程
		 * @param id
		 */
		revoke:function(procInstId, taskId, taskKey){
			var me = this,__url = __ctx+'/platform/office/bpmReceivedTask/revoke.htm';
			
			DialogUtil.confirm("是否撤回任务？", function(rt){
				if(rt){
					$.ajax({
						type: 'POST',
						url: __url,
						data: {procInstId:procInstId, taskId:taskId, taskKey:taskKey},
						success: function(responseText) {
							DialogUtil.closeAll();
							var msg = new com.lc.form.ResultMessage(responseText);
							if (msg.isSuccess()) {
								$(me.consts.HANDLED_GRID).trigger("reloadGrid"); // 重新载入
								DialogUtil.msg(msg.getMessage());
							} else {
								DialogUtil.error(msg.getMessage());
							}
						},
						error: function(){DialogUtil.closeAll();}
					});
				}
			});
		}
	
	};
})();