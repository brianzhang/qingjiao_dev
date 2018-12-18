/**
 * jms消息队列监控
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-04 10:27:24
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var jmsQueues;
$(function() {
	jmsQueues  = new JmsQueues();
	jmsQueues.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#jmsQueuesGrid",// 列表对象
			PAGER : "#jmsQueuesPager",// 列表分页
			FORM : '#jmsQueuesForm'// 表单form
	};
	/**
	 * jms消息队列监控  对象
	 * @returns {JmsQueues}
	 */
	JmsQueues = function() {
		//定义属性
		
	};

	/**
	 * 方法
	 */
	JmsQueues.prototype = {
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
						url :  __ctx+'/platform/jms/jmsQueues/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['名称','待处理的消息数','消费者数量','入队消息','出队消息','管理'],
				        colModel: [{
				                 	   name:'name',
				                 	   sortable:false,
				                	   key:true
				                	 	}, {
				                 	   name:'queueSize',
				                 	   sortable:false
				                	 					                	 	}, {
				                 	   name:'consumerCount',
				                 	   sortable:false
				                	 					                	 	}, {
				                 	   name:'enqueueCount',
				                 	   sortable:false
				                	 					                	 	}, {
				                 	   name:'dequeueCount',
				                 	   sortable:false
				                	 	},  {
									name : '__manage',
									width : 40,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'详情',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/jms/jmsQueues/browse.htm?name={name}'
									},{
										label:'清空',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/jms/jmsQueues/remove.htm?name={name}'
									},{
										label:'发送测试信息',
										classes:'btn btn-primary fa ',
										action:'javascript: jmsQueues._sendTestMsg("{name}")'
									}]
								} ]
	
					});
		},
		_sendTestMsg : function(name){
			var url = __ctx+'/platform/jms/jmsQueues/sendTestMsg.htm';
			url=url.getNewUrl();
			$.post(url,{name:name},function(responseText){
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					DialogUtil.toastr(msg.getMessage());
					window.location.reload(true);
				}else{
					DialogUtil.error(msg.getMessage());
				}
			})
		}
	};
})();


