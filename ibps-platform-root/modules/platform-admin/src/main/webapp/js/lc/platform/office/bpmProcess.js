/**
 * 流程中心
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-01-25 15:29:56
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	bpmProcess  = new BpmProcess();
	bpmProcess.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TYPE_TREE:"#typeTree",
			PAGER : "#processPager",// 列表分页
			NEW_PROCESS_GRID : "#newProcessGrid",//新建流程 列表
			MY_REQUEST_GRID : "#myRequestGrid",//我的请求 列表
			MY_COMPLETED_GRID : "#myCompletedGrid",//我的办结 列表
			MY_DRDFT_GRID : "#myDrdftGrid",//我的草稿 列表
			MY_REVOKE_GRID:"#myRevokeGrid",// 我的可撤销事宜
			
			PENDING_GRID : "#pendingGrid",//待办事宜 列表
			HANDLED_GRID : "#handledGrid",//已办事宜 列表
			COMPLETED_GRID : "#completedGrid",//办结事宜 列表
			DELEGATE_GRID : "#delegateGrid",//转办代理事宜 列表
			CCFORWARD_GRID : "#ccForwardGrid"//抄送转发事宜 列表
	};
	/**
	 * 流程中心 对象
	 * @returns {bpmProcess}
	 */
	BpmProcess = function() {
		//定义属性
		
	};

	/**
	 * 方法
	 */
	BpmProcess.prototype = {
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
			if ($(this.consts.NEW_PROCESS_GRID).length > 0)//新建流程列表
				this._initNewrocessGridList();
			if ($(this.consts.MY_REQUEST_GRID).length > 0)//我的请求列表
				this._initMyRequestGridList();
			if ($(this.consts.MY_COMPLETED_GRID).length > 0)//我的办结列表
				this._initMyCompletedGridList();
			if ($(this.consts.MY_DRDFT_GRID).length > 0)//我的草稿列表
				this._initMyDrdftGridList();
			if ($(this.consts.PENDING_GRID).length > 0)//待办事宜列表
				this._initPendingGridList();
			if ($(this.consts.HANDLED_GRID).length > 0)//已办事宜列表
				this._initHandledGridList();
			if ($(this.consts.COMPLETED_GRID).length > 0)//办结事宜列表
				this._initCompletedGridList();
			if ($(this.consts.DELEGATE_GRID).length > 0)//转办代理事宜列表
				this._initDelegateGridList();
			if ($(this.consts.CCFORWARD_GRID).length > 0)//抄送转发事宜列表
				this._initCcForwardGridList();
			if ($(this.consts.MY_REVOKE_GRID).length > 0)//我的草稿列表
				this._initMyRevokeGridList();
		},
		/**
		 * 新建流程
		 */
		_initNewrocessGridList:function(){
			$(this.consts.NEW_PROCESS_GRID).GridList({
				url :  __ctx+'/platform/office/bpmInitiatedProcess/newProcessJson.htm',
				pager :this.consts.PAGER,
				multiselect:false,
				colNames: ['流程定义ID','流程名称','创建时间','所属分类','版本号'],
		        colModel: [{
		                 	   name:'defId',
		                	   index: 'def_id_',
		                	 	hidden:true,
		                	 	key:true
		                	 }, {
		                 	   name:'name',
		                	   index: 'name_',
		                	   width : "500",
			               	   formatter:function(val, opts, rowData) {
		                			 return '<a href="javascript:bpmProcess.startFlow(\''+val+'\',\''+rowData.defId+'\')">'+val+'</a>';
		                	   }
		                	 },  {
		                		   name:'createTime',
			                	   index: 'create_time_',
			                	   formatter : 'timestamp',
			                	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 },  {
		                 	   name:'typeName',
		                	   index: 'type_id_'
		                	 },{
		                 	   name:'version',
		                	   index: 'version_',
		                	 } ]
					});
		},
		_initMyRequestGridList:function(){
			$(this.consts.MY_REQUEST_GRID).GridList({
				url :  __ctx+'/platform/office/bpmInitiatedProcess/myRequestJson.htm',
				pager :this.consts.PAGER,
				multiselect:false,
				colNames: ['流程实例ID','请求标题','流程名称','创建时间','状态','管理'],
		        colModel: [{
		                 	   name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 }, {
		                 	   name:'subject',
		                	   index: 'subject_',
		                	   width : 150,
			               	   formatter:function(val, opts, rowData) {
		                			 return '<a href="javascript:bpmProcess.instance(\''+rowData.id+'\',\''+val+'\')">'+val+'</a>';
		                		}
		                	 },  {
		                 	   name:'procDefName',
		                	   index: 'proc_def_name_'
		                	 }, {
		                 	   name:'createTime',
		                	   index: 'create_time_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 } ,{
			                 	   name:'status',
			                	   index: 'status_',
			                   	   width : 80,
			                	   formatter:'dataFormat',
			                	   formatoptions:{
			                		   value:[
		                	                  {name:'draft',value:'草稿',css:'red'},
		                	                  {name:'running',value:'运行中',css:'green'},
		                	                  {name:'end',value:'结束',css:'red'},
		                	                  {name:'manualend',value:'人工结束',css:'red'},
				  	                	     {name:'revokeToStart',value:'撤销到发起人',css:'red'},
				  	                	     {name:'rejectToStart',value:'驳回到发起人',css:'red'},
				  	                	     {name:'reject',value:'驳回',css:'red'},
				  	                	     {name:'revoke',value:'撤销',css:'red'}]
			                	   } }, {
										name : '__manage',
										label:'管理',
										width : 20,
										sortable:false,
										classes:"rowOps",
										formatter : 'manage',
										formatoptions :[
										  {
											label:"撤销",
											classes:'btn btn-primary fa fa-reply-all',
											action:'javascript:bpmProcess.revoke("{id}") '
										  }
										]}
			                	   ]
					});
		},
		/**
		 * 我的已办事宜
		 */
		_initMyCompletedGridList:function(){
			$(this.consts.MY_COMPLETED_GRID).GridList({
				url :  __ctx+'/platform/office/bpmInitiatedProcess/myCompletedJson.htm',
				pager :this.consts.PAGER,
				multiselect:false,
				colNames: ['流程实例ID','请求标题','流程名称','创建时间','状态'],
		        colModel: [{
		                 	   name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 }, {
		                 	   name:'subject',
		                	   index: 'subject_',
		                	   width : 150,
			               	   formatter:function(val, opts, rowData) {
		                			 return '<a href="javascript:bpmProcess.instanceEnd(\''+rowData.id+'\',\''+val+'\')">'+val+'</a>';
		                		}
		                	 },  {
		                 	   name:'procDefName',
		                	   index: 'proc_def_name_'
		                	 }, {
		                 	   name:'createTime',
		                	   index: 'create_time_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 } ,{
			                 	   name:'status',
			                	   index: 'status_',
			                   	   width : 80,
			                	   formatter:'dataFormat',
			                	   formatoptions:{
			                		   value:[
											{name:'end',value:'结束',css:'red'},
											{name:'manualend',value:'人工结束',css:'green'}]
			                	   } }
			                	   ]
					});
		},
		/**
		 * 我的草稿
		 */
		_initMyDrdftGridList:function(){
			$(this.consts.MY_DRDFT_GRID).GridList({
				url :  __ctx+'/platform/office/bpmInitiatedProcess/myDraftJson.htm',
				pager :this.consts.PAGER,
				multiselect:true,
				colNames: ['流程实例ID','流程定义ID','请求标题','流程名称','创建时间'],
		        colModel: [{
		                 	   name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 },{
		                 	   name:'procDefId',
		                	 	hidden:true
		                	 }, {
		                 	   name:'subject',
		                	   index: 'subject_',
		                	   width : 150,
			               	   formatter:function(val, opts, rowData) {
			               		 return '<a href="javascript:bpmProcess.startFlow(\''+val+'\',\''+rowData.procDefId+'\',\''+rowData.id+'\')">'+val+'</a>';
		                		}
		                	 },  {
		                 	   name:'procDefName',
		                	   index: 'proc_def_name_'
		                	 }, {
		                 	   name:'createTime',
		                	   index: 'create_time_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 } 
		                	 ]
					});
		},
		/**
		 * 待办事宜
		 */
		_initPendingGridList:function(){
			var receiveGrid = $(this.consts.PENDING_GRID);
			$(this.consts.PENDING_GRID).GridList({
				url :  __ctx+'/platform/office/bpmReceivedProcess/pendingJson.htm',
				pager :this.consts.PAGER,
				multiselect:true,
				colNames: ['流程实例ID','请求标题','流程名称','创建时间','所属人','待办类型','管理'],
		        colModel: [{
		                 	   name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 }, {
		                 	   name:'subject',
		                	   index: 'subject_',
		                	   width : 150,
			               	   formatter:function(val, opts, rowData) {
			               		   var prfix=''; 
			               		   if(rowData.remindTimes==1){
			               			prfix='<span class="badge badge-success">催办1次</span>';
			               		    }else if(rowData.remindTimes==2){
			               		    	prfix='<span class="badge badge-warning">催办2次</span>';
			               		    }else if(rowData.remindTimes>2){
			               		    	prfix='<span class="badge badge-danger">催办'+rowData.remindTimes+'次</span>';
			               		    }
			               		   	var rt = prfix+'<a href="javascript:bpmProcess.toSart(\''+rowData.id+'\',\''+val+'\')">'+val+'</a>';
		                			return rt;
			               	   }
		                	 },  {
		                 	   name:'procDefName',
		                	   index: 'proc_def_name_'
		                	 }, {
		                 	   name:'createTime',
		                	   index: 'create_time_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 },{
			                 	   name:'ownerName',
			                	   index: 'OWNER_NAME_',
			                	   width : 80
			                	 },{
			                 	   name:'status',
			                	   index: 'status_',
			                	   sortable:false,
			                   	   width : 80,
			                	   formatter:'dataFormat',
			                	   formatoptions:{
			                		   value:[
			                		          {name:'NORMAL',value:'待办',css:'green'},
			                		          {name:'AGENT',value:'代理',css:'blue'},
			                		          {name:'DELIVERTO',value:'转办',css:'red'}]
			                	    }},
			                	    {
										name : '__manage',
										width : 30,
										sortable:false,
										classes:'rowOps',
										formatter : 'manage',
										formatoptions :[{
											label:'转办',
											classes:'btn btn-primary fa fa-mail-forward',
											action:'javascript:bpmProcess.shift("{id}");',
											hidden: function (opts, rowData) {
			                                    return rowData.allowShfit =='N' || rowData.status!='NORMAL';
			                                }
										}]
									}
			                	 ]
					});
			this.initEvent(receiveGrid);
		},
		
		/**
		 * 我审批过的事务
		 */
		_initHandledGridList:function(){
			$(this.consts.HANDLED_GRID).GridList({
				url :  __ctx+'/platform/office/bpmReceivedProcess/handledJson.htm',
				pager :this.consts.PAGER,
				multiselect:false,
				colNames: ['流程实例ID','请求标题','流程名称','创建时间','状态'],
		        colModel: [{
		                 	   name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 },  {
		                 	   name:'subject',
		                	   index: 'subject_',
		                	   width : 150,
			               	   formatter:function(val, opts, rowData) {
		                			 return '<a href="javascript:bpmProcess.instance(\''+rowData.id+'\',\''+val+'\')">'+val+'</a>';
		                		}
		                	 },  {
		                 	   name:'procDefName',
		                	   index: 'proc_def_name_'
		                	 }, {
		                 	   name:'createTime',
		                	   index: 'create_time_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 } ,{
			                 	   name:'status',
			                	   index: 'status_',
			                   	   width : 80,
			                	   formatter:'dataFormat',
			                	   formatoptions:{
			                		   value:[{name:'draft',value:'草稿',css:'red'},
			                		          {name:'running',value:'运行中',css:'green'},
			                		          {name:'end',value:'结束',css:'red'},
			                		          {name:'manualend',value:'人工结束',css:'red'}]
			                	   } }
			                	   ]
					});
		},
		_initCompletedGridList:function(){
			$(this.consts.COMPLETED_GRID).GridList({
				url :  __ctx+'/platform/office/bpmReceivedProcess/handledJson.htm?end=1',
				pager :this.consts.PAGER,
				multiselect:false,
				colNames: ['流程实例ID','请求标题','流程名称','创建时间','状态'],
		        colModel: [{
		                 	   name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 }, {
		                 	   name:'subject',
		                	   index: 'subject_',
		                	   width : 150,
			               	   formatter:function(val, opts, rowData) {
		                			 return '<a href="javascript:bpmProcess.instanceEnd(\''+rowData.id+'\',\''+val+'\')">'+val+'</a>';
		                		}
		                	 },  {
		                 	   name:'procDefName',
		                	   index: 'proc_def_name_'
		                	 }, {
		                 	   name:'createTime',
		                	   index: 'create_time_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 } ,{
			                 	   name:'status',
			                	   index: 'status_',
			                   	   width : 80,
			                	   formatter:'dataFormat',
			                	   formatoptions:{
			                		   value:[{name:'draft',value:'草稿',css:'red'},
			                		          {name:'running',value:'运行中',css:'green'},
			                		          {name:'end',value:'结束',css:'red'},
			                		          {name:'manualend',value:'人工结束',css:'red'}]
			                	   } }
			                	   ]
					});
		},
		_initDelegateGridList:function(){
			$(this.consts.DELEGATE_GRID).GridList({
				url :  __ctx+'/platform/office/bpmReceivedProcess/delegateJson.htm',
				pager :this.consts.PAGER,
				multiselect:false,
				colNames: ['流程实例ID','请求标题','任务名称','创建时间','状态'],
		        colModel: [{
		                 	    name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 }, {
		                 	   name:'taskSubject',
		                	   index: 'task_subject_',
		                	   width : 150   ,
			               	   formatter:function(val, opts, rowData) {
		                			 return '<a href="javascript:bpmProcess.instance(\''+rowData.id+'\',\''+val+'\')">'+val+'</a>';
		                		}
		                	 },  {
			                 	   name:'taskName',
			                	   index: 'task_name_'
			                	 } , {
		                 	   name:'createTime',
		                	   index: 'create_time_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 } ,{
			                 	   name:'status',
			                	   index: 'status_',
			                   	   width : 80,
			                   	   formatter:'dataFormat',
			                	   formatoptions:{
			                		   value:[{name:'draft',value:'草稿',css:'red'},
			                		          {name:'running',value:'运行中',css:'green'},
			                		          {name:'end',value:'结束',css:'red'},
			                		          {name:'manualend',value:'人工结束',css:'red'}]
			                	   } }
			                	   ]
					});
		},
		_initCcForwardGridList:function(){
			$(this.consts.CCFORWARD_GRID).GridList({
				url :  __ctx+'/platform/office/bpmReceivedProcess/ccForwardJson.htm',
				pager :this.consts.PAGER,
				multiselect:false,
				colNames: ['流程实例ID','请求标题','抄送转发人','创建时间','类型'],
		        colModel: [{
		                 	    name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 }, {
		                 	   name:'subject',
		                	   index: 'subject_',
		                	   width : 150   ,
			               	   formatter:function(val, opts, rowData) {
		                			 return '<a href="javascript:bpmProcess.instance(\''+rowData.id+'\',\''+val+'\')">'+val+'</a>';
		                		}
		                	 },  {
			                 	   name:'startor',
			                	   index: 'startor_'
			                	 } , {
		                 	   name:'createTime',
		                	   index: 'create_time_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 } ,{
			                 	   name:'type',
			                	   index: 'type_',
			                   	   width : 80,
			                   	   formatter:'dataFormat',
			                	   formatoptions:{
			                		   value:
			                		          [{'name':'copyto','value':'抄送','css':'green'},
			                		           {'name':'trans','value':'转发','css':'red'}]
			                	   } }
			                	   ]
					});
		},
		/**
		 * 我的可撤销事宜
		 */
		_initMyRevokeGridList:function(){
			$(this.consts.MY_REVOKE_GRID).GridList({
				url :  __ctx+'/platform/office/bpmReceivedProcess/revokeJson.htm',
				pager :this.consts.PAGER,
				multiselect:false,
				colNames: ['流程实例ID','请求标题','流程名称','我审批的节点','审批时间','当前审批节点','taskId','管理'],
		        colModel: [{
		                 	   name:'id',
		                	 	hidden:true,
		                	 	key:true
		                	 }, {
		                 	   name:'subject',
		                	   index: 'subject_',
		                	   width:200,
			               	   formatter:function(val, opts, rowData) {
			               		return '<a href="javascript:bpmProcess.instance(\''+rowData.id+'\',\''+val+'\')">'+val+'</a>';
			               	   }
		                	 },{
		                 	   name:'procDefName',
		                	   index: 'proc_def_name_'
		                	 },{
		                 	   name:'myNode',
		                	   index: 'myNode'
			                 },{
		                 	   name:'taskEndTime',
		                	   index: 'task_end_time_',
		                	   width : 80,
		                  	   formatter: 'timestamp',
		                  	   formatoptions:'yyyy-MM-dd HH:mm:ss'
		                	 },{
		                 	   name:'curNode',
		                	   index: 'curNode'
					         },{
			                 	 name:'taskId',
			                	 hidden:true
		                	 },{
									name : '__manage',
									width : 40,
									sortable : false,
									classes : 'rowOps',
									formatter : 'manage',
									formatoptions : [
										{
											label:'撤销',
											classes:'btn btn-primary fa fa-send',
											action:'javascript:bpmProcess._revoke("{taskId}")'
										}]
		                	 }]
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
		 * 启动流程
		 * @param defId
		 */
		startFlow:function (title,defId,proInstId){
			if(!proInstId)
				proInstId = '';
			DialogUtil.openFullWindow({
				title:'启动流程',
				content:__ctx+'/platform/bpmn/instance/bpmInst/toStart.htm?defId='+defId+'&proInstId='+proInstId,
				callback:function(){
					if(window && window.location && window.location != null) window.location.reload();
				}
			});
		},
		toSart:function(id){
			DialogUtil.openFullWindow({
				title:'执行任务',
				content:__ctx+'/platform/bpmn/bpmTask/toStart.htm?id='+id,
				callback:function(){
					if(window && window.location && window.location != null) window.location.reload();
				}
			});
		},
		shift:function(id){
			DialogUtil.openFullWindow({
				title:'任务转办',
				content:__ctx+'/platform/bpmn/bpmTaskChange/flowEdit.htm?taskId='+id,
				callback:function(){
					if(window && window.location && window.location != null) window.location.reload();
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
		 * 流程结束的实例
		 * @param id
		 */
		instanceEnd : function(id){
			DialogUtil.openFullWindow({
				title:'查看流程',
				content:__ctx+'/platform/bpmn/instance/bpmInst/detail.htm?id='+id+'&isEnd='+1+ '&isReturn=0'
			});
		},
		/**
		 * 撤销流程
		 * @param id
		 */
		_revoke:function(id){
			DialogUtil.dialog({
				title:'撤销任务',
			    area: ['50%', '60%'],
				content:__ctx+'/platform/office/bpmReceivedProcess/doRevoke.htm',
				params:{taskId:id},
				callback:function(){
					if(window && window.location && window.location != null) window.location.reload();
					DialogUtil.closeAll();
				}
			});
		},
		initEvent: function(receiveGrid){
			//批量终止流程
			$(document).on("click", ".btn-danger.fa-ioxhost", function(){
				var ids = receiveGrid.jqGrid('getGridParam', 'selarrrow');
				if (ids == null || ids.length == 0) {
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				
				DialogUtil.dialog({
					title:'批量终止流程',
				    area: ['50%', '60%'],
					content:__ctx+'/platform/bpmn/bpmTask/toEndProcess.htm?taskId='+ids,
					callback:function(){
						DialogUtil.closeAll();
						if(window && window.location && window.location != null) window.location.reload();
					}
				});
			});
			
			//批量审批同意
			$(document).on("click", ".fa-agree", function(){
				var ids = receiveGrid.jqGrid('getGridParam', 'selarrrow');
				if (ids == null || ids.length == 0) {
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				
				DialogUtil.dialog({
					title:'批量同意审批',
				    area: ['50%', '60%'],
					content:__ctx+'/platform/bpmn/bpmTask/toAgreeDialog.htm?actionName=agree&taskId='+ids,
					callback:function(){
						DialogUtil.closeAll();
						if(window && window.location && window.location != null) window.location.reload();
					}
				});
			});
			
			//批量挂起流程
			$(document).on("click", ".btn-primary.fa-suspend", function(){
				var ids = receiveGrid.jqGrid('getGridParam', 'selarrrow');
				if (ids == null || ids.length == 0) {
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				
				DialogUtil.confirm('确认批量挂起流程任务吗？',function(rtn){
					if(!rtn)
						return;
					$.post(__ctx+'/platform/bpmn/bpmTask/batchSuspendProcess.htm?taskIds='+ids, function(responseText){
						var rtn = eval('(' + responseText + ')');
					    DialogUtil.toastr(rtn.message);
					});
				});
			});
			
			//批量恢复流程
			$(document).on("click", ".btn-primary.fa-recover", function(){
				var ids = receiveGrid.jqGrid('getGridParam', 'selarrrow');
				if (ids == null || ids.length == 0) {
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				
				DialogUtil.confirm('确认批量恢复流程任务吗？',function(rtn){
					if(!rtn)
						return;
					$.post(__ctx+'/platform/bpmn/bpmTask/batchRecoverProcess.htm?taskIds='+ids, function(responseText){
						var rtn = eval('(' + responseText + ')');
					    DialogUtil.toastr(rtn.message);
					});
				});
			});
			
			
		}
	
	};
})();