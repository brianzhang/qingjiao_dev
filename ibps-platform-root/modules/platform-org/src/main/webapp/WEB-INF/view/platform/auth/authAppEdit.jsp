<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/authApp.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="authAppForm" action="save.htm" >
					<input type="hidden" name="m:authApp:id"  value="${authApp.id}"/>
					<input type="hidden" name="m:authApp:createBy"  value="${authApp.createBy}"/>
					<input type="hidden" name="m:authApp:createTime"  value="<fmt:formatDate value="${authApp.createTime}"  pattern="yyyy-MM-dd"/>"/>
					<input type="hidden" name="m:authApp:updateBy"  value="${authApp.updateBy}"/>
					<input type="hidden" name="m:authApp:updateTime"  value="<fmt:formatDate value="${authApp.updateTime}"  pattern="yyyy-MM-dd"/>"/>
					
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">应用key</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApp:appKey" value="${authApp.appKey}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">应用名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApp:appName" value="${authApp.appName}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">应用首页</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApp:appUri" value="${authApp.appUri}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">应用描述</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApp:appDesc" value="${authApp.appDesc}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
		</form>

			</div>
		</div>
	</body>
</html>
