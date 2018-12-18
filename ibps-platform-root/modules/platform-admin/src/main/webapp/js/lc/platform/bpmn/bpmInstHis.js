/**
 * 流程实例历史
 * 
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-19 15:39:04
 * </pre>
 */
$(function() {
	bpmInstHis = new BpmInstHis();
	bpmInstHis.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#bpmInstHisGrid",// 列表对象
		PAGER : "#bpmInstHisPager"// 列表分页
	};
	/**
	 * 流程实例历史 对象
	 * 
	 * @returns {BpmInstHis}
	 */
	BpmInstHis = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	BpmInstHis.prototype = {
		consts:_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)// 列表
				this._initGridList();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx + '/platform/bpmn/instance/bpmInstHis/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ 'ID', '实例标题', '流程名称', '创建时间','结束时间', '持续时间', '审批结果','状态','管理' ],
								colModel : [
										{
											name : 'id',
											hidden : true,
											key : true
										},
										{
											name : 'subject',
											index : 'SUBJECT_',
											width : 200,
											formatter : function(val, opts,
													rowData) {
												return '<a href="javascript:bpmInstHis._get(\''
														+ rowData.id
														+ '\')">'
														+ val + '</a>';
											}

										},
										{
											name : 'procDefName',
											index : 'PROC_DEF_NAME_',
											width : 100
											
										},
										
										{
											name : 'createTime',
											index : 'CREATE_TIME_',
											formatter : 'timestamp',
											formatoptions : 'yyyy-MM-dd HH:mm:ss'
										},
										{
											name : 'endTime',
											index : 'END_TIME_',
											formatter : 'timestamp',
											formatoptions : 'yyyy-MM-dd HH:mm:ss'
										},
										{
											name : 'duration',
											index : 'DURATION_',
											width : 80,
											formatter:function(val){
					                		   if($.isEmpty(val))
					                			   return "";
					                		   var d = moment.duration(val) ;
						                	var seconds = d. seconds(),
						                		minutes =d. minutes(),
							                	hours =d. hours(),
							                	days=d. days(),dd='';
							                	if(days>0)
							                		dd +=days+"天";
						                    	if(hours>0)
							                		dd +=hours+"时";
						                      	if(minutes>0)
							                		dd +=minutes+"分";
						                    	if(seconds>0)
							                		dd +=seconds+"秒";
						                		   return dd;
						                	   }
										},
										{
											name : 'resultType',
											index : 'RESULT_TYPE_',
											formatter : 'dataFormat',
											width : 80,
											hidden:true,
											formatoptions : {
													value : [{
														name:'pending',
														value:'待审批',
														css:'purple'
													},{
														name:'agree',
														value:'审批通过',
														css:'green'
													},{
														name:'oppose',
														value:'审批不通过',
														css:'red'
													},{
														name:'complete',
														value:'完成',
														css:'red'
													},
													{
														name:'manual_end',
														value:'人工终止',
														css:'red'
													}]
												}

										} , {
											name : 'status',
											index : 'STATUS_',
											width : 80,
											formatter : 'dataFormat',
											formatoptions : {
												value : [ {
													name : 'draft',
													value : '草稿',
													css : 'red'
												}, {
													name : 'running',
													value : '运行中',
													css : 'green'
												}, {
													name : 'pending',
													value : '挂起',
													css : 'red'
												}, {
													name : 'end',
													value : '结束',
													css : 'red'
												}, {
													name : 'manualend',
													value : '人工结束',
													css : 'red'
												} ]
											}
										},
										{
											name : '__manage',
											width : 30,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [ {
												label : '明细',
												classes : 'btn btn-primary fa fa-detail',
												action : __ctx + '/platform/bpmn/instance/bpmInstHis/detail.htm?id={id}'
											} ]
										} ]

							});
		},
		
		/**
		 * 获取流程实例详细信息
		 */
		_get:function(id){
			window.location.href = __ctx+'/platform/bpmn/instance/bpmInstHis/detail.htm?id='+id;
		},
	};
})();
