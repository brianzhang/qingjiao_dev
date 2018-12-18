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
					<iframe id="reportFrame" src="${ctx }/platform/report/ireport/showReport.htm?reportId=${reportId }&reportType=${reportType?reportType:param.reportType}"  frameborder="no" width="100%" height="400px"></iframe>
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
		<script type="text/javascript" src="${ctx}/js/lc/platform/report/ireport/IReportPreview.js"></script>
	</body>
</html>
