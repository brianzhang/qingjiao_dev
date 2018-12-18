/**
 * 流程任务撤销
 * author:simon cai
 */
var bpmRevoke,loading,dialog = frameElement.dialog,param=dialog.params;
$(function() {
	bpmRevoke = new BpmTaskRevoke();
	bpmRevoke.init();
});
(function() {
	BpmTaskRevoke = function(){
		
	};
	BpmTaskRevoke.prototype = {
			
		init:function(){
			var me = this;
			
			$("#taskId").val(param.taskId);
			this.initSave();
			
			$(".fa-commonStatment").on("click", function() {
				new StatmentDialog({
					callback : function(content){
						$(".doRevoke").text(content);
					},
					action : 'doRevoke'
				}).show();
			});
		},
		
		initSave : function() {

			var _this = this, frm = $('#agreeForm').form()
	
			$("a.fa-save").click(function(){
				var $el=$(this);
				$el.button('loading');
				if (!frm.valid()) {
					return;
				}
				
				loading = DialogUtil.load("加载中...");
				frm.ajaxForm({
					success : function(responseText) {
						$el.button('reset');
						_this.showResponse(responseText);
					}
				});
				frm.submit();
			});
		},
		showResponse : function(responseText) {
			DialogUtil.close(loading);
			var resultMessage = new com.lc.form.ResultMessage(responseText);
			if (resultMessage.isSuccess()) {
				DialogUtil.alert(resultMessage.getMessage(), function() {
					if (dialog && dialog.callback) {
						dialog.callback();
					} else {
						DialogUtil.closeAll();
					}
				});
			} else {
				DialogUtil.error(resultMessage.getMessage(), resultMessage
						.getCause());
			}
		}
		
	}
})();