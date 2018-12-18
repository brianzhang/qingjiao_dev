<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskChangeAssign.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="bpmTaskChangeAssignForm" action="save.htm" >
					<input type="hidden" name="m:bpmTaskChangeAssign:id"  value="${bpmTaskChangeAssign.id}"/>
					<input type="text" class="fr-form-control" name="m:bpmTaskChangeAssign:taskChangeId" value="${bpmTaskChangeAssign.taskChangeId}" validate="{required:false"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">候选人类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmTaskChangeAssign:type" value="${bpmTaskChangeAssign.type}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">执行人ID</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmTaskChangeAssign:executor"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:bpmTaskChangeAssign:executor" >${bpmTaskChangeAssign.executor}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
