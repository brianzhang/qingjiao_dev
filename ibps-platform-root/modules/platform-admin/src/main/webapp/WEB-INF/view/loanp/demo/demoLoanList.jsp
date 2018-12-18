
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/demo/demoLoan.js"></script>
		<title>t_demo_loan_管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="demoLoanGrid" ></table>
				<div id="demoLoanPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
