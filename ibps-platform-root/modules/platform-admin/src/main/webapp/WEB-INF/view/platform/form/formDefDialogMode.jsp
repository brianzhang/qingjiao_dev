<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
	<%@include file="/commons/page/customform.jsp"%>
	<f:link href="lc/form/formPreview.css"  isCommon="false"/>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefDialogMode.js"></script>
</head>
	<body>
		<div>
			<div  class="panel-preview">
    			<form data-formrenderer></form>
    		</div>
    		<input type="hidden" id="id"  value="${id }"/>
    		<input type="hidden" id="mode"  value="${mode }"/>
			<textarea id="data" rows="0" cols="0" style="display: none;">${data}</textarea>
		 </div>
	</body>
</html>