<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
			<%@include file="/commons/page/customform.jsp"%>
			<%@include file="/commons/page/grid.jsp"%>
			<f:link href="jqgrid/ui.jqgrid.css" />
			<f:link href="lc/commons/rowOps.css"   isCommon="false"/>
			<f:link href="style.css"  isCommon="false"/>
			<script type="text/javascript" src="${ctx}/js/lc/commons/control/DictionaryControl.js"></script>
			<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.cookie.min.js"></script>
			<script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
			<script type="text/javascript" src="${ctx}/js/lc/platform/form/templaterenderer.js"></script>
			<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplatePreview.js"></script
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  col-sm-12">
				<div  data-template-renderer></div>
		</div>
			<input type="hidden" id="id"  value="${id }"/>
			<input type="hidden" id="pk"  value="${pk }"/>
			<textarea id="data" name="" rows="0" cols="0" style="display: none;">${data}</textarea>
			<textarea id="formData" rows="0" cols="0" style="display: none;">${formData}</textarea>
	<!-- 导出表单 -->
		<form id="exportForm" name="exportForm" method="post" target="download" action="${ctx}/platform/form/formDataTemplate/exportData.htm" style="display: none;"></form>  
		<iframe id="download" name="download" height="0px" width="0px" style="display: none;"></iframe>  	 
	</body>
</html>