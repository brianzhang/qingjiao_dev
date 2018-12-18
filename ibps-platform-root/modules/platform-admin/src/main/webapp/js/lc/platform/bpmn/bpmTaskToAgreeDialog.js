var dialog = frameElement.dialog;
var dlgLoad;
var bpmTaskToAgreeDialog;
$(function() {
	bpmTaskToAgreeDialog = new BpmTaskToAgreeDialog();
	bpmTaskToAgreeDialog.init();
});
(function() {
	BpmTaskToAgreeDialog = function(){
		
	};
	
	BpmTaskToAgreeDialog.prototype = {
		init:function(){
			this.initSave();
			this.initEvent();
		},
		initSave:function(){
		 var _this = this, frm = $('#agreeForm').form();
			$("a.fa-save").click(function() {
				var $el = $(this);
				$el.button("loading");
				frm.ajaxForm({
					success : function(responseText){
						$el.button("reset");
						_this.showResponse(responseText);
					}
				});
				dlgLoad = DialogUtil.load("加载中...");
				frm.submit();
			});
		},
		showResponse : function (responseText) {
			DialogUtil.close(dlgLoad);
			var resultMessage = new com.lc.form.ResultMessage(responseText);
			if (resultMessage.isSuccess()) {
				DialogUtil.alert(resultMessage.getMessage(),function(){
					if(dialog && dialog.callback){
						dialog.callback();
					}else{
						DialogUtil.closeAll();
					}
				});
			} else {
				DialogUtil.error(resultMessage.getMessage(), resultMessage.getCause());
			}
		},
		rewrite:function(content){
			$("#opinion").text(content);
		},
		initEvent:function(){
			var me = this;
			$(".fa-commonStatment").on("click",function(){
				new StatmentDialog({
					callback:me.rewrite,
					action:actionName
				}).show();
			});
		}
	};
})();
