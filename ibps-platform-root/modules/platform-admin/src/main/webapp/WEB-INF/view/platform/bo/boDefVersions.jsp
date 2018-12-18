<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bo/boDef.js"></script>
		<title>业务对象定义管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
				<div class="panel-toolbar " >
					<div class="buttons">
						<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</div>
				</div>	
				<input type="hidden" id="code" value="${param.code }">
				<div class="jqGrid_wrapper">
					<table id="boDefVersionGrid" ></table>
					<div id="boDefVersionPager"></div>
				</div>
				<input type="hidden" id="profix" value="${profix }"/>
		</div>
	</body>
</html>