<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	<title>启动流程</title>
	 <%@include file="/commons/page/customform.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmnButton.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormToStart.js"></script>
</head>
<body>
	<div class="srcoll-panel">
			<div class="panel-preview" >
				<form   data-formrenderer></form>
    		</div>
    		<input type="hidden" id="defId" value="${defId}"/>
    		<input type="hidden" id="proInstId" value="${proInstId}"/>
	</div>
	
</body>
</html>
