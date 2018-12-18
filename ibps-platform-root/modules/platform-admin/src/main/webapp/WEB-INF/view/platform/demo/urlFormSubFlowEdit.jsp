<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/demo/urlFormSub.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="urlFormSubForm" action="save.htm" >
							<input type="hidden" name="m:urlFormSub:id"  value="${urlFormSub.id}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">KEY</label>
				  	<div class="fr-form-block">
						<input type="text" class="fr-form-control" name="m:urlFormSub:key" value="${urlFormSub.key}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">NAME</label>
				  	<div class="fr-form-block">
						<input type="text" class="fr-form-control" name="m:urlFormSub:name" value="${urlFormSub.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">AGE</label>
				  	<div class="fr-form-block">
						<input type="number"  class="fr-form-control"  name="m:urlFormSub:age"  value="${urlFormSub.age}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
		
	</body>
</html>
