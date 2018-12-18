<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/authAppApi.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="authAppApiForm" action="save.htm" >
					<input type="hidden" name="m:authAppApi:id"  value="${authAppApi.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">应用key</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:appKey" value="${authAppApi.appKey}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API标识</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:apiKey" value="${authAppApi.apiKey}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:apiName" value="${authAppApi.apiName}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:apiUri" value="${authAppApi.apiUri}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">作用域</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:scope" value="${authAppApi.scope}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">频次</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:authAppApi:limit"  value="${authAppApi.limit}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">测试频次</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:authAppApi:testLimit"  value="${authAppApi.testLimit}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API描述</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:apiDesc" value="${authAppApi.apiDesc}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
