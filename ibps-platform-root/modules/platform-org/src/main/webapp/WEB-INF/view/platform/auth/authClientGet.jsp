<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/authClient.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="authClientFormGet" >
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三方标识</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${authClient.clientKey}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三方名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${authClient.clientName}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三方Domain</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${authClient.clientUri}</p>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">密钥</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${authClient.clientSecret}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">作用域</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">
							<c:forEach var="scope" varStatus="status" items="${scopes}">
							<c:if test="${fn:contains(authClient.scope, scope.value)}" >${scope.label } </c:if>
							</c:forEach>
						</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授权类型</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">
							<c:forEach var="grantType" varStatus="status" items="${grantTypes}">
							<c:if test="${fn:contains(authClient.grantTypes, grantType.value)}" >${grantType.label } </c:if>
							</c:forEach>
						</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">状态</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">
						<c:forEach var="clientStatusV" varStatus="status" items="${clientStatus}">
						<c:if test="${authClient.status == clientStatusV.value}" >${clientStatusV.label } </c:if>
						</c:forEach>
						</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审核时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${authClient.auditTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${authClient.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">过期时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${authClient.expireTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">描述</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${authClient.clientDesc}</p>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">理由</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${authClient.cause}</p>
				 	</div>
			  	</div>
			</div>
		</form>

			</div>
		</div>
	</body>
</html>
