var dialog = frameElement.dialog,loading = null;
var bpmTaskToReject;
$(function() {
	bpmTaskToReject = new BpmTaskToReject();
	bpmTaskToReject.init();
});
(function() {
	BpmTaskToReject = function(){
		
	};
	
	BpmTaskToReject.prototype = {
		init:function(){
			this.initRejectMode();
			this.initBackHandMode();
			this.initSave();
			this.initEvent();
		},
		// 初始化驳回模式
		initRejectMode : function() {
			var _this = this;
			$("[name='rejectMode']").click(function() {
				$("#destination").val("");
				var me = $(this), val = me.val();

				if (me.attr("showDestination")) {
					$(".nodeChoice").show();
				} else {
					$(".nodeChoice").hide();
				}

				// 退回方式
				var backMode = $("input[name='backHandMode']:checked").val();
				_this.showNodeChoice(val, backMode);
			});
		},
		showNodeChoice : function(rejectMode, backHandMode) {
			$("#destination").val("");
			if (rejectMode == "reject") {
				$(".nodeChoice").hide();
			} else {
				if (backHandMode == "normal") {
					// 按流程图走
					$("#nodeChoice1").show();
					$("#nodeChoice2").hide();
				} else {
					$("#nodeChoice1").hide();
					$("#nodeChoice2").show();
				}
			}
		},
		initBackHandMode : function() {
			var _this = this;
			$("[name='backHandMode']").click(function() {
				var backMode = $(this).val();
				// 退回方式
				var rejectMode = $("input[name='rejectMode']:checked").val();
				_this.showNodeChoice(rejectMode, backMode);
			});
		},
		initSave : function() {
			var _this = this, frm = $('#agreeForm').form(), json = dialog.params.data;

			$("a.fa-save").click(
					
					function() {
						
						if (!frm.valid()) {
							return;
						}
						
						var $el = $(this);
						$el.button("loading");
						
						var rejectMode = $("input[name='rejectMode']:checked")
								.size() <= 0 ? null : $(
								"input[name='rejectMode']:checked").val();
						var backMode = $("input[name='backHandMode']:checked")
								.val();
						if (rejectMode == null) {
							DialogUtil.msg("请选择驳回方式！");
							return false;
						}
						if (rejectMode == "rejectDest") {
							$("#destination").val(
									backMode == "direct" ? $("#userNodeSelect")
											.val() : $("#goMapUserNodeSelect")
											.val())
						}
						if (rejectMode == "rejectDest"
								&& $("#destination").val() == "") {
							DialogUtil.msg("请选择驳回到的节点！");
							return false;
						}
						
						frm.addHidden('data', JSON2.stringify(json));
						frm.addHidden('bpmFormId', dialog.params.bpmFormId);
						
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
			$("textarea[name='opinion']").text(content);
		}
	};
})();