<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/authApiGrant.js"></script>
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
					<form  class="fr-form"  id="authApiGrantFormGet" >
			 	<div class="fr_response_field col-sm-12" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">授权标识</label>
					  	<div class="fr-form-block">
							<p class="form-control-static">${authApiGrant.grantKey}</p>
					 	</div>
				  	</div>
				</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">APP标识</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${authApiGrant.appKey}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API标识</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${authApiGrant.apiKey}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">频次</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${authApiGrant.limit}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">测试频次</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${authApiGrant.testLimit}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">状态</label>
				  	<div class="fr-form-block">
						<c:forEach var="clientStatusV" varStatus="status" items="${clientStatus}">
						<c:if test="${authApiGrant.status == clientStatusV.value}" >${clientStatusV.label } </c:if>
						</c:forEach>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审核时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${authApiGrant.auditTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${authApiGrant.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">过期时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${authApiGrant.expireTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">理由</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${authApiGrant.cause}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
