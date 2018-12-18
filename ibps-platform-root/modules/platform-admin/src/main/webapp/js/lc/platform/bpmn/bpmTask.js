/**
 * 流程任务
 * 
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-06 09:26:18
 * </pre>
 */
$(function() {
	bpmTask = new BpmTask();
	bpmTask.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#bpmTaskGrid",// 列表对象
		PAGER : "#bpmTaskPager"// 列表分页
	};
	/**
	 * 流程任务 对象
	 * 
	 * @returns {BpmTask}
	 */
	BpmTask = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	BpmTask.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){// 列表
				this._initGridList();
				this._initBtns();
			}
			this.initEvent($(this.consts.GRID));
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID)
				.GridList(
					{
						url : __ctx
								+ '/platform/bpmn/bpmTask/listJson.htm',
						pager : this.consts.PAGER,
						colNames : [ 'ID', '请求标题', '任务名称', '候选人', '任务类型', '任务创建时间', '管理'],
						colModel : [
								{
									name : 'id',
									hidden : true,
									key : true
								},
								{
									name : 'subject',
									index : 'subject_',
									formatter : function(val, opts,
											rowData) {
										return '<a href="javascript:bpmTask.doNext(\''
												+ rowData.id
												+ '\',\''
												+ val
												+ '\')">'
												+ val
												+ '</a>';
									},
									width : 100
								},
								{
									name : 'name',
									index : 'name_',
									width : 60
								},
								{
									name : 'ownerName',
									index : 'owner_id_',
									width : 40
								},
								{
									name : 'status',
									index : 'status_',
									width : 30,
									formatter : 'dataFormat',
									formatoptions : {
										value : [ {
											name : 'NORMAL',
											value : '普通',
											css : 'red'
										}, {
											name : 'AGENT',
											value : '代理',
											css : 'green'
										}, {
											name : 'DELIVERTO',
											value : '转交',
											css : 'red'
										}]
									}
								},
								{
									name : 'createTime',
									index : 'create_time_',
									formatter : "timestamp",
									formatoptions : "yyyy-MM-dd HH:mm:ss",
									width : 40
								},
								{
									name : '__manage',
									width : 20,
									sortable : false,
									classes : 'rowOps',
									formatter : 'manage',
									formatoptions : [
										{
											label:'指定执行人',
											classes:'btn btn-primary fa fa-cog',
											action:'javascript:bpmTask.assignee("{id}")',
											hidden:function(opts, rowData){
												return rowData.status!="NORMAL";
											}
									}]
								}]
					});
		},
		
		/**
		 * 执行下一步
		 * @param id
		 * @param subject
		 */
		doNext:function(id,subject){
			subject= this.delHtmlTag(subject);
			DialogUtil.dialog({
				title:'任务办理--'+subject,
				content:__ctx+'/platform/bpmn/bpmTask/doNext.htm?id='+id,
			    area: ['100%', '100%'],
			    callback:function(){
			    	DialogUtil.closeAll();
			    	$(".fa-search").click();
			    }
			});
		},
		
		_initBtns:function(){
			var me = this;
			
			$('#cog').on("click", function(){
				var ids= $(me.consts.GRID).jqGrid('getGridParam', 'selarrrow');
				if(ids.length == 0){
					DialogUtil.msg("请选择流程任务!");
					return;
				}
				
				var msg = "";
				for(var i = 0, len = ids.length; i < len; i ++){
					var rowData = $(me.consts.GRID).jqGrid('getRowData', ids[i]);
					if("普通" != rowData.status){
						var subject= me.delHtmlTag(rowData.subject);
						msg += "【" + subject + "】";
					}
				}
				
				if(msg.length > 0){
					DialogUtil.warn(msg + "，非普通类型任务不能指定执行人!");
					return;
				}
				
				me.assignee(ids.join(","));
			});

		},
		
		/**
		 * 指定任务执行人
		 */
		assignee:function(taskId){
			var me = this;
			
			new PersonDialog({
				isSingle:false, //是否单选
				callback : function(userIds, fullNames) {
					me.doAssignee(taskId, userIds.join(","));
				}
			}).show();
		},
		
		doAssignee:function(taskIds, userIds){
			var __url = __ctx+'/platform/bpmn/bpmTask/assignee.htm';
			$.ajax({
				type: 'POST',
				url: __url,
				data: {taskId:taskIds,userId:userIds},
				success: function(responseText) {
					DialogUtil.closeAll();
					var msg = new com.lc.form.ResultMessage(responseText);
					if (msg.isSuccess()) {
						$(".fa-search").click();
						DialogUtil.msg(msg.getMessage());
					} else {
						DialogUtil.error(msg.getMessage());
					}
				},
				error: function(){DialogUtil.closeAll();}
			});
		},

		/**
		 * 去掉html标签
		 * @param str
		 * @returns
		 */
		delHtmlTag :function (str){
			  return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
		},
		
		/**
		 * 查看用户类型
		 * @param id
		 * @param type
		 */
		showInfo :function (id,type){
			if(type == "user"){
				UserInfoDialog(id).show();
			}else{
				alert("类型："+type+"   ID:"+id);
			}
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
			
			//批量审批同意流程
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
			
			//批量挂起流程实例
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
			
			//批量恢复流程实例
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
