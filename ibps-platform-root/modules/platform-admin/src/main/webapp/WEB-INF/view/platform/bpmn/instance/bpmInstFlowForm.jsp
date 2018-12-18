<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 <%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	<%@include file="/commons/page/customform.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmnButton.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormToStart.js"></script>
</head>
<body>
	<div class="srcoll-panel">
		<div class="gray-div">
			<div>
				<div data-bpmn-button ></div>
			</div>
			<div  class="preview">
    			<form data-formrenderer></form>
    		</div>
    		<input type="hidden" id="instanceId" value="${instanceId}"/>
		</div>
	</div>
	
</body>
</html>