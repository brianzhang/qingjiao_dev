<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTrigerParam.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="bpmTrigerParamForm" action="save.htm" >
					<input type="hidden" name="m:bpmTrigerParam:id"  value="${bpmTrigerParam.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">触发ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmTrigerParam:trigerId" value="${bpmTrigerParam.trigerId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">源属性</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmTrigerParam:srcAttr" value="${bpmTrigerParam.srcAttr}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">目标属性</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmTrigerParam:destAttr" value="${bpmTrigerParam.destAttr}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">允许为空</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmTrigerParam:allowEmpty" value="${bpmTrigerParam.allowEmpty}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
