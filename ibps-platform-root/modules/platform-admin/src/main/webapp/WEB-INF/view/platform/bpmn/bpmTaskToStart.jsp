<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
	<title>任务办理</title>
	<%@include file="/commons/page/customform.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmnButton.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormToStart.js"></script>
	
</head>
</script>
<body>
	<div class="srcoll-panel">
			<div  class="panel-preview">
    			<form data-formrenderer></form>
    		</div>
    		
    		<input type="hidden" id="taskId" value="${taskId}"/>
    		<input type="hidden" id="lockUser" value="${lockUser}"/>
    		<input type="hidden" id="suspendState" value="${suspendState}"/>
		</div>
	</div>
</body>
</html>