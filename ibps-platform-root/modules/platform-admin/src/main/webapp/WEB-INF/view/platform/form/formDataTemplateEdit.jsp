<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	 <%@include file="/commons/page/customform.jsp"%>
	 <script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateButton.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateEdit.js"></script>
</head>
<body>
	<div class="srcoll-panel">
		<div class="gray-div">
			<div>
				<div data-template-button ></div>
			</div>
			<div  class="preview">
    			<form data-formrenderer></form>
    		</div>
		</div>
	</div>
	
</body>
</html>
