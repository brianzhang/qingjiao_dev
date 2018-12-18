<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.lc.ibps.base.core.entity.ResultMessage"%>
<html>
	<head>
		<title>系统出错了</title>
		<%@include file="/commons/include/error.jsp"%>
		<f:link href="codemirror/lib/codemirror.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/clike/clike.js"></script>
	</head>
	
	<body>
		<div class="col-xs-12">		
			<div class="error-container">
				<div class="well">
					<h4 class="smaller">${msg}</h4>
					<hr />

					<hr />
					</div>
				</div>
			</div>
		</div>
	</body>
		<script type="text/javascript">
	var editor = CodeMirror.fromTextArea(document .getElementById("code"), {
		mode: "text/x-java",
		matchBrackets: true,
		readonly:true,
		height:60
	 });
	
	</script>
</html>
	
	



