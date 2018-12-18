var dlg = frameElement.dialog,load = null;
var bpmTaskToEndProcess;
$(function() {
	bpmTaskToEndProcess = new BpmTaskToEndProcess();
	bpmTaskToEndProcess.init();
});
(function() {
	BpmTaskToEndProcess = function(){
		
	};
	
	BpmTaskToEndProcess.prototype = {
		init:function(){
			this.initEvent();
		},
		initEvent:function(){
			var frm = $('#agreeForm').form(),me = this;
			$("a.fa-save").click(function(){
				if(frm.valid()){
					DialogUtil.confirm(
						'是否终止流程？',
						function(r) {
							if(r){
								load = DialogUtil.load("加载中...");
								frm.ajaxForm({success:me.showResponse});
								frm.submit();
							}
						}
					);
				}
			});
			$(".fa-commonStatment").on("click",function(){
				new StatmentDialog({
					callback:me.rewrite,
					action:'manualend'
				}).show();
			});
		},
		showResponse:function(responseText) {
			DialogUtil.close(load);
			var resultMessage=new com.lc.form.ResultMessage(responseText);
			if(resultMessage.isSuccess()){
				DialogUtil.alert(resultMessage.getMessage(),function(){
					if(dlg.callback){
						dlg.callback();
					}else{
						DialogUtil.closeAll();
					}
				});
			} else {
				DialogUtil.error(resultMessage.getMessage(), resultMessage.getCause());
			}
		},
		rewrite:function(content){
			$('textarea[name="endReason"]').text(content);
		}
			
	};
}());
