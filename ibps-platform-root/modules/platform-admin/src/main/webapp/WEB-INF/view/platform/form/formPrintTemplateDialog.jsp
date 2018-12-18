<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<%@include file="/commons/page/layout.jsp" %>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/formPrintTemplateSelector.js"></script>
</head>
<body>
	<div class="wrapper wrapper-content col-sm-12">
		<div class="selector-wrapper">
			<div  class ="selector-container" name="selector_container" >
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 animated fadeInLeft">
				<div class="wrapper wrapper-content  animated fadeInRight">
					<div class="toolbar-panel ">
						<div class="toolbar-box">
							<div class="toolbar-head clearfix">
								<!-- 顶部按钮 -->
								<div class="buttons">
									<a class="btn btn-primary fa fa-search"
										href="javascript:void(0);"><span>搜索</span></a>
								</div>
								<!-- 收缩 -->
								<div class="tools">
									<a href="javascript:void(0);" class="collapse"> <i
										class="bigger-180 fa  fa-angle-double-up"></i>
									</a>
								</div>
							</div>
							<!-- #查询条件-->
							<div class="toolbar-body">
								<form role="form" class="search-form">
									<div class="form-inline p-xxs">
										<div class="form-group">
											<label class="search-label">名称</label>: <input type="text"
												name="Q^NAME_^SL" class="form-control" />
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="jqGrid_wrapper">
						<table id="formPrintTemplateGrid" ></table>
						<div id="formPrintTemplatePager"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>