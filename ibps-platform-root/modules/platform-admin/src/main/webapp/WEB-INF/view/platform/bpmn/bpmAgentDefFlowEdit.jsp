<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmAgentDef.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="bpmAgentDefForm" action="save.htm" >
					<input type="hidden" name="m:bpmAgentDef:id"  value="${bpmAgentDef.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">代理ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmAgentDef:agentId" value="${bpmAgentDef.agentId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">流程key</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmAgentDef:procDefKey" value="${bpmAgentDef.procDefKey}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">节点ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmAgentDef:nodeId" value="${bpmAgentDef.nodeId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
		
	</body>
</html>
