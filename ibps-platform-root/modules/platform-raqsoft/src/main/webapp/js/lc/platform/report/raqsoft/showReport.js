$(function() {
	showReport = new ShowReport();
	showReport.init();
});

(function() {
	// 定义常量
	var _consts = {};
	/**
	 * 报表预览 对象
	 * 
	 * @returns {ReportDef}
	 */
	ShowReport = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	ShowReport.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.updateFormAction();
			this._initPageBar();
			//this.myResize();
		},
		/**
		 * 更新报表标签默认翻页地址，reportName+_turnPageForm
		 */
		updateFormAction:function(){
			var action = $("form[name=report1_turnPageForm]").attr("action");
			if(action)
				$("form[name=report1_turnPageForm]").attr("action",
						__ctx+"/platform/report/raqsoft/showReport.htm?"+action.split("?")[1])
//			$("#runqian_submit").remove();
		},
		_initPageBar: function(){
			//设置分页显示值
			$('#t_page_span', window.parent.document).text(report1_getTotalPage());
			$('#c_page_span', window.parent.document).text(report1_getCurrPage());
		},
		myResize:function() {
			var tab1 = document.getElementById( "report1");
			tab1.style.width="100%";
		}

	}
})();