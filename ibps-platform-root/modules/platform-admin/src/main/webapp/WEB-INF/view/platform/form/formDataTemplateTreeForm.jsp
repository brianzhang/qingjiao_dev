<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	 <%@include file="/commons/page/customform.jsp"%>
	 <script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/templateButton.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateTreeForm.js"></script>
</head>
<body>
	<div class="srcoll-panel">
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12" id="noData" style="display: none">
			<div class="alert alert-warning m-t-sm"  >
				尚未选择数据</div>
			</div>
		<div class="gray-div">
			<div  class="preview">
    			<form data-formrenderer></form>
    		</div>
		</div>
	</div>
	
</body>
</html>
