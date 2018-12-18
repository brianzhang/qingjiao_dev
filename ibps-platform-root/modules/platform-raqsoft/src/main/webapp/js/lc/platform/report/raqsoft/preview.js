$(function() {
	preview = new Preview();
	preview.init();
});

(function() {
	// 定义常量
	var _consts = {};
	
	/**
	 * 报表预览 对象
	 * 
	 * @returns {ReportDef}
	 */
	Preview = function() {
		this.form = $(this.consts.GRID);
		// 定义属性
	};

	/**
	 * 方法
	 */
	Preview.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			this._initFrameHeight();
			this._initBts();
			this._initSearchForm();
			this._initToolBar();
		},
		_initFrameHeight : function() {
			var ofs = $(".report_wrapper").offset().top;
			var newFrameHeight = $(window).height() - ofs - 85;
			$("#raqsoftFrame").height(newFrameHeight);
		},
		_initBts : function() {
			var me = this;
			// 收缩、展开
			$(document).on("click", ".toolbar-box .tools .collapse, .toolbar-box .tools .expand",
					function() {
						var self = $(this), el = self.parents(".toolbar-box").children(".toolbar-body");
						if (self.hasClass("collapse")) {
							$.cookie("isCollapse", true);
							self.attr("title", "展开");
							self.removeClass("collapse").addClass("expand");
							var i = self.children(".fa-angle-double-up");
							i.removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
							self.parents('.toolbar-box').addClass("toolbar-border-bottom");
							el.slideUp(200, function() {
								// 重置报表的尺寸
								me._initFrameHeight();
							});
						} else {
							$.cookie("isCollapse", false);
							self.attr("title", "收缩");
							self.removeClass("expand").addClass("collapse");
							var i = self.children(".fa-angle-double-down");
							i.removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
							self.parents('.toolbar-box').removeClass("toolbar-border-bottom");
							el.slideDown(200, function() {
								// 重置报表的尺寸
								me._initFrameHeight();
							});
						}
			});
			//搜索按钮
			$(".fa-search").off("click");
			$(".fa-search").on("click", function(){
				$("#raqsoftFrame").attr("src", $(".search-form").attr("action")+"?"+$(".search-form").serialize());
			});
			
			//翻页
			me.subIFrame = document.getElementById("raqsoftFrame");
			$(".laypage_first").on("click", function() {
				try {
					me.subIFrame.contentWindow.report1_toPage(1);
				} catch (e) {

				}
			});
			$(".laypage_prev").on("click", function() {
				try {
					me.subIFrame.contentWindow.report1_toPage(me.subIFrame.contentWindow.report1_getCurrPage() - 1);
				} catch (e) {
					console.log(e);
				}
			});
			$(".laypage_next").on("click", function() {
				try {
					me.subIFrame.contentWindow.report1_toPage(me.subIFrame.contentWindow.report1_getCurrPage() + 1);
				} catch (e) {
					console.log(e);
				}
			});
			$(".laypage_last").on("click", function() {
				try {
					me.subIFrame.contentWindow.report1_toPage(me.subIFrame.contentWindow.report1_getTotalPage());
				} catch (e) {
					console.log(e);
				}
			});
			//打印
			$(document).on("click", ".fa-print", function() {
				try {
					me.subIFrame.contentWindow.report1_print();
				} catch (e) {
					console.log(e);
				}
			});
			//导出pdf
			$(document).on("click", ".fa-file-pdf-o", function() {
				try {
					me.subIFrame.contentWindow.report1_saveAsPdf();
				} catch (e) {
					console.log(e);
				}
			});
			//导出excel
			$(document).on("click", ".fa-file-excel-o", function() {
				try {
					me.subIFrame.contentWindow.report1_saveAsExcel();
				} catch (e) {
					console.log(e);
				}
			});
			//导出word
			$(document).on("click", ".fa-file-word-o", function() {
				try {
					me.subIFrame.contentWindow.report1_saveAsWord();
				} catch (e) {
					console.log(e);
				}
			});

			if(from!="list"){
				$(".fa-back").remove();
			}
			
		},
		_initSearchForm: function(){
			var data = {},templateId = "s:reportParams:formTemplate",div=$(".search-form>.p-xxs");
			data.idx = Math.ceil(Math.random()*10000000+1);
			for (var i = 0, temp, item; item = reportParams[i++];) {
				if(item.controlOptions&&item.controlOptions!=''){
					item.controlOptions = JSON.parse(item.controlOptions);
				}
				
			}
			data.reportParams = reportParams;
			data.param = $("#param").val();
			var html = template(templateId, data);
			$(div).append(html);
		},
		_initToolBar: function(){
			var data = {},printTemplateId = "s:showReport:print",
				head = $(".toolbar-top"), foot = $(".toolbar-bottom");
			data.printButton = $.isGranted("print_report");
			data.output2Word = $.isGranted("output2Word_report");
			data.output2Excel = $.isGranted("output2Excel_report");
			data.output2PDF = $.isGranted("output2PDF_report");
			if(printPosition=="top"){
				head.append(template(printTemplateId, data));
			}else{
				foot.append(template(printTemplateId, data));
			}
		}
		

	}
})();