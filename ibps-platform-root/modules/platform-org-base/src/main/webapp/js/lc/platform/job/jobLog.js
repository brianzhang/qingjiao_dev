/**
 * ibps_JOB_LOG【定时器运行日志】
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-01 10:27:24
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var jobLog  = new JobLog();
	jobLog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#jobLogGrid",// 列表对象
			PAGER : "#jobLogPager"// 列表分页
	};
	/**
	 * ibps_JOB_LOG【定时器运行日志】 对象
	 * @returns {JobLog}
	 */
	JobLog = function() {
		//定义属性
		this.jobName = $("#jobName").val();
		this.trigName = $("#trigName").val();
		this.group = $("#group").val();
	};

	/**
	 * 方法
	 */
	JobLog.prototype = {
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
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/job/jobLog/listJson.htm?jobName='+me.jobName+'&trigName='+me.trigName+'&group='+me.group,
						pager :this.consts.PAGER,
						colNames: ['主键','任务名','触发器名称','任务分组','开始时间','状态','运行时长','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'jobName',
				                	   index: 'JOB_NAME_'
				                	 					                	 	}, {
				                 	   name:'trigName',
				                	   index: 'TRIG_NAME_'
				                	 					                	 	}, {
				                 	   name:'group',
				                	   index: 'GROUP_'
				                	 					                	 	}, {
				                 	   name:'startTime',
				                	   index: 'START_TIME_',
				                	   formatter: 'timestamp',
				                	   formatoptions:'yyyy-MM-dd HH:mm:ss'
				                	 	
				                	 	}, {
				                 	   name:'state',
				                	   index: 'STATE_',
			                		   formatter:'select', 
						               formatoptions:{value:{ '0':'失败','1':'成功'}}
				                	 					                	 	}, {
				                 	   name:'runTime',
				                	   index: 'RUN_TIME_',
				                	   width: 65
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/job/jobLog/get.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/job/jobLog/remove.htm?id={id}'
									}]
								} ]
	
					});
		},
	};
})();


