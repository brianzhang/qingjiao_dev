/**
 * 内部消息
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-26 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var innerMessage  = new InnerMessage();
	innerMessage.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : '#innerMessageForm'// 表单form
	};
	/**
	 * 内部消息 对象
	 * @returns {InnerMessage}
	 */
	InnerMessage = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	InnerMessage.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me._initEditor();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-send', function() {
				var $el = $(this);
				$el.button('loading'); 
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
                    	me._showResponse(responseText);
                    },
                    error: function(){
                    	$el.button('reset'); 
                    }
				});
				if (frm.valid()){
					if($.isEmpty($('#receiverId').val()) && $.isEmpty($('#groupId').val())){
						DialogUtil.msg("至少选择一种发件人或发件组织!");
						return;
					}
						
					$('#content').val(me.content.getContent());
					form.submit();
				}else{
					$el.button('reset'); 
				}
			});
		},
		_initEditor:function(){
			var me = this;
	   	   me.content = UE.getEditor('editor');
	   	   me.content.addListener("ready",function(editor){
	   		  	me.content.setContent($('#content').val());
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
							window.location.href = __ctx+'/platform/msg/innerMessage/receive.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


