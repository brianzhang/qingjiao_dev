$(function() {
	reportPreview = new ReportPreview();
	reportPreview.init();
});

(function() {
	//定义常量
	var _consts = {};
	/**
	 * 报表预览 对象
	 * @returns {ReportDef}
	 */
	ReportPreview = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ReportPreview.prototype = {
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
			this.loadPage();
		},
		_initFrameHeight : function() {
			var ofs = $(".report_wrapper").offset().top;
			var newFrameHeight = $(window).height() - ofs - 40;
			$('#reportFrame').height(newFrameHeight);
		},
		_initBts : function() {
			var me = this;

			/* ----------------------预览-------------------- */
			$('a.fa-file-code-s').click(function() {
				// html格式预览
				$("#type").val("html");
				me.loadReport();
			});
			$('a.fa-file-pdf-s').click(function() {
				// pdf格式预览
				$("#type").val("pdf");
				me.loadReport();
			});

			/* ----------------------导出-------------------- */
			$('a.fa-file-code-e').click(function() {
				// html格式导出
				$("#type").val("html");
				me.exportReport();
			});
			$('a.fa-file-pdf-e').click(function() {
				// pdf格式导出
				$("#type").val("pdf");
				me.exportReport();
			});
			$('a.fa-file-excel-e').click(function() {
				// excel格式导出
				$("#type").val("xlsx");
				me.exportReport();
			});
			$('a.fa-file-word-e').click(function() {
				// word格式导出
				$("#type").val("docx");
				me.exportReport();
			});

			/* ----------------------打印-------------------- */
			$('a.fa-print').click(function() {
				// 打印
				$("#type").val("pdf");
				$("[name='pageable'][value='N']").attr("checked", true);
				me.loadReport();
				me.printReport();
			});

			// 收缩、展开
			$(document)
					.on(
							"click",
							".toolbar-box .tools .collapse, .toolbar-box .tools .expand",
							function() {
								var self = $(this), el = self.parents(
										".toolbar-box").children(
										".toolbar-body");
								if (self.hasClass("collapse")) {
									$.cookie("isCollapse", true);
									self.attr("title", "展开");
									self.removeClass("collapse").addClass(
											"expand");
									var i = self
											.children(".fa-angle-double-up");
									i.removeClass("fa-angle-double-up")
											.addClass("fa-angle-double-down");
									self.parents('.toolbar-box').addClass(
											"toolbar-border-bottom");
									el.slideUp(200, function() {
										// 重置报表的尺寸
										me._initFrameHeight();
									});
								} else {
									$.cookie("isCollapse", false);
									self.attr("title", "收缩");
									self.removeClass("expand").addClass(
											"collapse");
									var i = self
											.children(".fa-angle-double-down");
									i.removeClass("fa-angle-double-down")
											.addClass("fa-angle-double-up");
									self.parents('.toolbar-box').removeClass(
											"toolbar-border-bottom");
									el.slideDown(200, function() {
										// 重置报表的尺寸
										me._initFrameHeight();
									});
								}
							});
		},
		loadReport : function() {
			var url = __ctx + "/platform/report/ireport/showReport.htm?"
					+ this.getFormData();

			$("#reportFrame").attr("src", url);
		},
		exportReport : function() {
			var url = __ctx + "/platform/report/ireport/exportReport.htm?"
					+ this.getFormData();

			$("#reportFrame").attr("src", url);
		},
		printReport : function() {
			$(".report_wrapper").jqprint();
		},
		getFormData : function() {
			var formData = $('.search-form').serialize() + "&"
					+ $('.page-form').serialize();
			return formData;
		},
		loadPage : function(params) {
			var _this = this;
			if (!params) {
				params = {};
			}

			params.page = params.page || 1;
			params.rows = params.rows || 20;

			var formData = this.getFormData();

			$.ajax({
				url : __ctx + "/platform/report/ireport/page.htm?" + formData,
				data : params,
				type : 'POST',
				success : function(data) {
					$("#page").val(params.page);
					$("#rows").val(params.rows);
					_this.loadReport();

					laypage({
						cont : 'reportPage', //容器。
						pages : data.total, //通过后台拿到的总页数
						records : data.records, //记录数
						rows : params.rows,
						rowlist : [ 20 ],
						curr : params.page, //当前页
						skip : true, //是否开启跳页
						jump : function(obj, first) { //触发分页后的回调
							if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
								params.page = obj.curr;
								params.rows = obj.rows;
								_this.loadPage(params);
							}
						}
					});
				},
				error : function(xhr) {
					DialogUtil.error('请求异常！');
				}
			});
		}
	}
})();