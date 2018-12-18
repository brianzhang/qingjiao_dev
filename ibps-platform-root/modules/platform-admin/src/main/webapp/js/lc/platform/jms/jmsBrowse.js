/**
 * jms消息监控
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-04 10:27:24
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var jmsBrowse;
$(function() {
	jmsBrowse  = new JmsBrowse();
	jmsBrowse.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#jmsBrowseGrid",// 列表对象
			PAGER : "#jmsBrowsePager",// 列表分页
			FORM : '#jmsBrowseForm'// 表单form
	};
	/**
	 * jms消息队列监控  对象
	 * @returns {JmsBrowse}
	 */
	JmsBrowse = function() {
		//定义属性
		this.name = $("#name").val();
		
	};

	/**
	 * 方法
	 */
	JmsBrowse.prototype = {
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
						url :  __ctx+'/platform/jms/jmsQueues/browseJson.htm?name='+this.name,
						pager :this.consts.PAGER,
						colNames: ['消息ID','相关性 ID','持久化','优先级','重复发送','时间','管理'],
				        colModel: [{
				                 	   name:'JMSMessageID',
				                 	   sortable:false,
				                	   key:true
				                	 	}, {
				                 	   name:'JMSCorrelationID',
				                 	   sortable:false
				                	 					                	 	}, {
				                 	   name:'JMSDeliveryMode',
				                 	   sortable:false
				                	 					                	 	}, {
				                 	   name:'JMSPriority',
				                 	   sortable:false
				                	 					                	 	}, {
				                 	   name:'JMSRedelivered',
				                 	   sortable:false
				                	 	}, {
				                 	   name:'JMSTimestamp',
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
										action: __ctx+'/platform/jms/jmsQueues/message.htm?queuerName='+this.name+'&msgId={JMSMessageID}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/jms/jmsQueues/remove.htm?queuerName='+this.name+'&msgId={JMSMessageID}'
									}]
								} ]
	
					});
		},
	};
})();


