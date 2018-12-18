<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/authClient.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
			<form  class="fr-form"  id="authClientForm" action="save.htm" >
			<input type="hidden" name="m:authClient:id"  value="${authClient.id}"/>
		 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三方标识</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authClient:clientKey" value="${authClient.clientKey}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三方名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authClient:clientName" value="${authClient.clientName}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
		 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三方Domain</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authClient:clientUri" value="${authClient.clientUri}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">密钥</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authClient:clientSecret" value="${authClient.clientSecret}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
		 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">作用域</label>
				  	<div class="fr-form-block">
				  		<c:forEach var="scope" varStatus="status" items="${scopes}">
				  		<label class="checkbox-inline">
                             	 	<input type="checkbox" class="ibps" value="${scope.value }" 
                             	 		name="m:authClient:scope" <c:if test="${fn:contains(authClient.scope, authClient.value)}" >checked="checked"</c:if> />
                             	 	<span class="lbl">${scope.label }</span>
                              </label>
						</c:forEach>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授权类型</label>
				  	<div class="fr-form-block">
				  		<c:forEach var="grantType" varStatus="status" items="${grantTypes}">
				  		<label class="checkbox-inline">
                             	 	<input type="checkbox" class="ibps" value="${grantType.value }" 
                             	 		name="m:authClient:grantTypes" <c:if test="${fn:contains(authClient.grantTypes, authClient.value)}" >checked="checked"</c:if> />
                             	 	<span class="lbl">${grantType.label }</span>
                              </label>
						</c:forEach>
				 	</div>
			  	</div>
			</div>
		 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">状态</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authClient:status" value="${authClient.status}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
		 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authClient:createBy" value="${authClient.createBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
		 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:authClient:createTime"   value="<fmt:formatDate value="${authClient.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
		 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">过期时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:authClient:expireTime"   value="<fmt:formatDate value="${authClient.expireTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
		 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审核人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authClient:auditBy" value="${authClient.auditBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
		 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审核时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:authClient:auditTime"   value="<fmt:formatDate value="${authClient.auditTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">描述</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authClient:clientDesc" value="${authClient.clientDesc}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			</form>
			</div>
		</div>
	</body>
</html>
