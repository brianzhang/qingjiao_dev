/**
 * 接收人已读
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-16 15:43:56
 * </pre>
 */
$(function() {
	var innerMessageRead = new InnerMessageRead();
	innerMessageRead.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#innerMessageReadGrid",// 列表对象
		PAGER : "#innerMessageReadPager"// 列表分页
	};
	/**
	 * 接收人已读 对象
	 * 
	 * @returns {innerMessageRead}
	 */
	InnerMessageRead = function() {
		// 定义属性
		//获取对应的消息Id
		this.msgId = $('#msgId').val();
	};

	/**
	 * 方法
	 */
	InnerMessageRead.prototype = {
		consts : _consts,
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
			var me = this,
				__url = __ctx + '/platform/msg/innerMessageRead/listJson.htm?Q^MSG_ID_^S='+this.msgId,
				__url = encodeURI(__url);
			
			$(this.consts.GRID).GridList({
				url : __url,
				multiselect : false,
				pager : this.consts.PAGER,
				colNames : [ '消息ID', '已读人员', '读取时间' ],
				colModel : [ {
					name : 'msgId',
					index : 'msg_id_',
					hidden : true
				}, {
					name : 'receiver',
					index : 'receiver_'
				}, {
					name : 'receiverTime',
					index : 'receiver_time_',
					formatter : 'timestamp',
					formatoptions : 'yyyy-MM-dd HH:mm:ss'

				} ]
			});
		}

	};
})();
