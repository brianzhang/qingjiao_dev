<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/list.jsp" %>
		
		<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.jqprint.js"></script>
		<f:link href="jquery/print.css" />
		
		<title>报表预览</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<div class="btn-group">
								<a href="${returnUrl }" class="btn btn-primary fa fa-back" ><span>返回</span></a>
							</div>
							
							<div class="btn-group">
								<a class="btn btn-primary fa fa-file-code-o fa-file-code-s" href="javascript:void(0);" ><span>HTML预览</span></a>
								<a class="btn btn-primary fa fa-file-pdf-o fa-file-pdf-s" href="javascript:void(0);" ><span>PDF预览</span></a>
							</div>
							
							<div class="btn-group">
								<a class="btn btn-primary fa fa-file-code-o fa-file-code-e" href="javascript:void(0);" ><span>HTML导出</span></a>
								<a class="btn btn-primary fa fa-file-pdf-o fa-file-pdf-e" href="javascript:void(0);" ><span>PDF导出</span></a>
								<a class="btn btn-primary fa fa-file-excel-o fa-file-excel-e" href="javascript:void(0);" ><span>EXCEL导出</span></a>
								<a class="btn btn-primary fa fa-file-word-o fa-file-word-e" href="javascript:void(0);" ><span>WORD导出</span></a>
							</div>
							
							<!-- <div class="btn-group">
								<a class="btn btn-primary fa fa-print" href="javascript:void(0);" ><span>打印</span></a>
							</div> -->
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					<!-- #查询条件-->
					<div class="toolbar-body" >
						<form role="form" class="search-form">
								<div  class="form-inline p-xxs">
									<c:forEach items="${reportParams }" var="reportParam">
									<div class="form-group">
										<label class="search-label">${reportParam.desc }</label>:
										<input type="text" name="${reportParam.name }" class="form-control" value="${reportParam.defValue }"/>
									</div>
									</c:forEach>
								</div>
								<input type="hidden" id="reportId" name="reportId" value="${reportId }"/>
								<input type="hidden" id="type" name="type" value="html"/>
								<input type="hidden" id="page" name="page" value="1"/>
								<input type="hidden" id="rows" name="rows" value="20"/>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="report_wrapper">
				<c:if test="${not empty msg }">
					<span>${msg }</span>
				</c:if>
				<c:if test="${empty msg }">
					<iframe id="reportFrame" src="${ctx }/components/report/center/showReport.htm?reportId=${reportId }"  frameborder="no" width="100%" height="400px"></iframe>
				</c:if>
			</div>
			<!-- #分页条件-->
			<div class="toolbar-body" >
				<form role="form" class="page-form">
					<div  class="form-inline p-xxs">
						<div class="form-group">
							<label class="search-label">是否分页:</label>
							<label class="radio-inline "> 
								<input type="radio" class="ibps" value="Y" name="pageable" checked="checked"><span class="lbl">是</span>
							</label> 
							<label class="radio-inline "> 
								<input type="radio" class="ibps" value="N" name="pageable"><span class="lbl">否</span>
							</label>
						</div>
						<div id="reportPage" class="pull-right"></div>
					</div>
				</form>
			</div><!--/ 分页条件-->
		</div>
		
		<OBJECT  ID="jatoolsPrinter" CLASSID="CLSID:B43D3361-D075-4BE2-87FE-057188254255"
                  codebase="${ctx}/js/plugins/jatoolsPrinter_free/jatoolsPrinter.cab#version=8,6,0,0"></OBJECT>
                  
		<script type="text/javascript" src="${ctx}/js/plugins/laypage/laypage.js"></script>
		<script type="text/javascript">
			$(function() {
				reportPreview  = new ReportPreview();
				reportPreview.init();
			});
	
			(function() {
				//定义常量
				var 	_consts = {};
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
					consts:	_consts,
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
					_initFrameHeight : function(){
						var ofs = $(".report_wrapper").offset().top;
						var newFrameHeight = $(window).height() - ofs - 40;
						$('#reportFrame').height(newFrameHeight);
					},
					_initBts : function(){
						var me = this;

						/* ----------------------预览-------------------- */
						$('a.fa-file-code-s').click(function(){
							// html格式预览
							$("#type").val("html");
							me.loadReport();
						});
						$('a.fa-file-pdf-s').click(function(){
							// pdf格式预览
							$("#type").val("pdf");
							me.loadReport();
						});

						/* ----------------------导出-------------------- */
						$('a.fa-file-code-e').click(function(){
							// html格式导出
							$("#type").val("html");
							me.exportReport();
						});
						$('a.fa-file-pdf-e').click(function(){
							// pdf格式导出
							$("#type").val("pdf");
							me.exportReport();
						});
						$('a.fa-file-excel-e').click(function(){
							// excel格式导出
							$("#type").val("xlsx");
							me.exportReport();
						});
						$('a.fa-file-word-e').click(function(){
							// word格式导出
							$("#type").val("docx");
							me.exportReport();
						});

						/* ----------------------打印-------------------- */
						$('a.fa-print').click(function(){
							// 打印
							$("#type").val("pdf");
							$("[name='pageable'][value='N']").attr("checked", true);
							me.loadReport();
							me.printReport();
						});

						// 收缩、展开
						$(document).on("click", ".toolbar-box .tools .collapse, .toolbar-box .tools .expand", function(){
							var self = $(this), el = self.parents(".toolbar-box").children(".toolbar-body");
							if (self.hasClass("collapse")) {
								$.cookie("isCollapse", true);
								self.attr("title", "展开");
								self.removeClass("collapse").addClass("expand");
								var i = self.children(".fa-angle-double-up");
								i.removeClass("fa-angle-double-up").addClass(
										"fa-angle-double-down");
								self.parents('.toolbar-box').addClass(
										"toolbar-border-bottom");
								el.slideUp(200,function(){
									// 重置报表的尺寸
									me._initFrameHeight();
								});
							} else {
								$.cookie("isCollapse", false);
								self.attr("title", "收缩");
								self.removeClass("expand").addClass("collapse");
								var i = self.children(".fa-angle-double-down");
								i.removeClass("fa-angle-double-down").addClass(
										"fa-angle-double-up");
								self.parents('.toolbar-box').removeClass(
										"toolbar-border-bottom");
								el.slideDown(200,function(){
									// 重置报表的尺寸
									me._initFrameHeight();
								});
							}
						});
					},
					loadReport : function(){
						var url = __ctx + "/components/report/center/showReport.htm?" + this.getFormData();
						
						$("#reportFrame").attr("src", url);
					},
					exportReport : function(){
						var url = __ctx + "/components/report/center/exportReport.htm?" + this.getFormData();
						
						$("#reportFrame").attr("src", url);
					},
					printReport : function(){
						$(".report_wrapper").jqprint();
					},
					getFormData : function(){
						var formData = $('.search-form').serialize() + "&" + $('.page-form').serialize();
						return formData;
					},
					loadPage : function(params){
						var _this = this;
						if(!params){
							params = {};
						}
						
						params.page = params.page || 1;
						params.rows = params.rows || 20;

						var formData = this.getFormData();
						
						$.ajax({
					        url:  __ctx+ "/components/report/center/page.htm?"+formData,
					        data : params,
					        type:'POST',
					        success: function(data) {
						        $("#page").val(params.page);
						        $("#rows").val(params.rows);
					        	_this.loadReport();
					        	
					            laypage({
					                cont: 'reportPage', //容器。
					                pages: data.total, //通过后台拿到的总页数
					                records: data.records, //记录数
					                rows: params.rows,
					                rowlist: [20],
					                curr: params.page, //当前页
					                skip: true, //是否开启跳页
					                jump: function(obj, first){ //触发分页后的回调
					                    if(!first ){ //点击跳页触发函数自身，并传递当前页：obj.curr
					                    	params.page = obj.curr;
					                		params.rows =obj.rows;
					                  	  	_this.loadPage(params);
					                    }
					                }
					            });	
					        },
					        error : function(xhr){
					        	DialogUtil.error('请求异常！');
						    }
					    });
					}
				}
			})();
		</script>
	</body>
</html>
