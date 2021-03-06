var dialog = frameElement.dialog, loading = null;
var bpmTaskToRejectToPrevious;
$(function() {
	bpmTaskToRejectToPrevious = new BpmTaskToRejectToPrevious();
	bpmTaskToRejectToPrevious.init();
});
(function() {
	BpmTaskToRejectToPrevious = function() {

	};

	BpmTaskToRejectToPrevious.prototype = {

		init : function() {
			this.initSave();
			this.initEvent();
		},
		initSave : function() {
			var _this = this, frm = $('#agreeForm').form();

			$("a.fa-save").click(function() {
				if (!frm.valid()) {
					return;
				}
				var $el = $(this);
				$el.button("loading");
				loading = DialogUtil.load("加载中...");
				frm.ajaxForm({
					success : function(responseText) {
						$el.button("reset");
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
		},
		initEvent : function() {
			var me = this;
			$(".fa-commonStatment").on("click", function() {
				new StatmentDialog({
					callback : me.rewrite,
					action : 'reject'
				}).show();
			});
		},
		rewrite:function(content){
			$(".rejectToPrevious").text(content);
		}

	};
})();