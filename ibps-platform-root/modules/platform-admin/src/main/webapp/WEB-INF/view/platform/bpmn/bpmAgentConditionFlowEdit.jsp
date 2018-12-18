<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmAgentCondition.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="bpmAgentConditionForm" action="save.htm" >
					<input type="hidden" name="m:bpmAgentCondition:id"  value="${bpmAgentCondition.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">代理ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmAgentCondition:agentId" value="${bpmAgentCondition.agentId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">代理人ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmAgentCondition:agenterId" value="${bpmAgentCondition.agenterId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">条件名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmAgentCondition:name" value="${bpmAgentCondition.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">条件描述</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmAgentCondition:desc" value="${bpmAgentCondition.desc}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">条件内容</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmAgentCondition:condition" value="${bpmAgentCondition.condition}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
		
	</body>
</html>
