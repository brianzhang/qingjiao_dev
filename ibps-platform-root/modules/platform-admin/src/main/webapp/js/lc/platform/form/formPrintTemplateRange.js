/**
 * 表单打印模版范围
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-04-25 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formPrintTemplateRange = new FormPrintTemplateRange();
	formPrintTemplateRange.init();
});

(function() {

	// 定义常量
	var _consts = {};
	/**
	 * 表单打印模版范围 对象
	 * 
	 * @returns {FormPrintTemplateRange}
	 */
	FormPrintTemplateRange = function() {

	};

	/**
	 * 方法
	 */
	FormPrintTemplateRange.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			$('#range').select2();
		},
		save:function(){
			var url = __ctx+'/platform/form/formPrintTemplate/saveRange.htm';
			var range = $("#range").val();
			$.post(url,{templateId:$("#templateId").val(),range:($.isNotEmpty(range)?range.join(","):"")},function(responseText){	
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					var ind = DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
							function(rtn) {
							if(rtn)		DialogUtil.closeDialog();
							});
				} else {
					DialogUtil.error(msg.getMessage());
				}
			});
		}
	};
})();