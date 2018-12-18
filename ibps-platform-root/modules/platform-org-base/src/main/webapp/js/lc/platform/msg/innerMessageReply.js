/**
 * 消息回复
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-16 15:43:43
 *</pre>
 */
$(function() {
	var innerMessageReply = new InnerMessageReply();
	innerMessageReply.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#innerMessageReplyGrid",// 列表对象
		PAGER : "#innerMessageReplyPager"// 列表分页
	};
	/**
	 * 消息回复 对象
	 * @returns {innerMessageReply}
	 */
	InnerMessageReply = function() {
		//定义属性
		//获取对应的消息Id
		this.msgId = $('#msgId').val();
	};

	/**
	 * 方法
	 */
	InnerMessageReply.prototype = {
		consts : _consts,
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
			var me = this,
				__url = __ctx + '/platform/msg/innerMessageReply/listJson.htm?Q^MSG_ID_^S='+this.msgId,
				__url = encodeURI(__url);;
			$(this.consts.GRID).GridList(
				{
					url : __url,
					multiselect: false,
					pager : this.consts.PAGER,
					colNames : [ '消息ID', '内容', '回复人','回复时间'],
					colModel : [
							{
								name : 'msgId',
								index : 'msg_id_',
								hidden:true
							},
							
							{
								name : 'content',
								index : 'content_',
								width:300
							},
							
							{
								name : 'reply',
								index : 'reply_'
							},
							{
								name : 'replyTime',
								index : 'reply_time_',
								formatter : 'timestamp',
								formatoptions:'yyyy-MM-dd HH:mm:ss'
							}]
			});
		}
	};
})();
