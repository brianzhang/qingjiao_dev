<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/customform.jsp"%>
<title>test</title>
</head>
<body>
	<div class="srcoll-panel">
		<div class="panel-toolbar stuckMenu">
			<div class="buttons">
				<a href="javascript:void(0);"
					class="btn btn-primary fa fa-save hidden"><span>保存</span></a>
				<a href="javascript:void(0);" class="btn btn-primary fa fa-close"><span>关闭</span></a>
			</div>
		</div>
		<div class="panel-preview form">
			<form data-formrenderer></form>
		</div>
	</div>
</body>
<script type="text/javascript" src="${ctx }/js/lc/platform/form/onlineForm.js"></script>
</html>