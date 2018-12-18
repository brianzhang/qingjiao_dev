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
					<a href="javascript:void(0);" class="btn btn-primary fa fa-legal fa-audit" ><span>通过</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-legal fa-nopass" ><span>不通过</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="authApiGrantAuditForm" action="doAudit.htm" >
					<input type="hidden" name="m:authApiGrant:id"  value="${authApiGrant.id}"/>
					<input type="hidden" name="m:authApiGrant:grantType"  value="${authApiGrant.grantType}"/>
					<input type="hidden" name="m:authApiGrant:grantKey"  value="${authApiGrant.grantKey}"/>
					<input type="hidden" name="m:authApiGrant:appKey"  value="${authApiGrant.appKey}"/>
					<input type="hidden" name="m:authApiGrant:apiKey"  value="${authApiGrant.apiKey}"/>
					<input type="hidden" name="m:authApiGrant:status"  value="${authApiGrant.status}"/>
					<input type="hidden" name="m:authApiGrant:createBy"  value="${authApiGrant.createBy}"/>
					<input type="hidden" name="m:authApiGrant:createTime"  value="<fmt:formatDate value="${authApiGrant.createTime}"  pattern="yyyy-MM-dd"/>"/>
					<input type="hidden" name="m:authApiGrant:auditBy"  value="${authApiGrant.auditBy}"/>
					<input type="hidden" name="m:authApiGrant:auditTime"  value="<fmt:formatDate value="${authApiGrant.auditTime}"  pattern="yyyy-MM-dd"/>"/>
					<input type="hidden" name="m:authApiGrant:cause" id="cause" value="${authApiGrant.cause}"/>
					
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授权标识</label>
				  	<div class="fr-form-block">
				  		<span>${authApiGrant.grantKey}</span>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">过期时间</label>
				  	<div class="fr-form-block">
						<div class="input-icon" >
							<i class="fa fa-calendar"></i>
							<input type="text" readonly="readonly" class="fr-form-control datepicker" 
								datefmt="yyyy-MM-dd" name="m:authApiGrant:expireTime" 
								value="<fmt:formatDate value="${authApiGrant.expireTime}"  pattern="yyyy-MM-dd"/>" 
								validate="{required:true}"/>
						</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">APP标识</label>
				  	<div class="fr-form-block">
				  		<span>${authApiGrant.appKey}</span>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API标识</label>
				  	<div class="fr-form-block">
				  		<span>${authApiGrant.apiKey}</span>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">频次</label>
				  	<div class="fr-form-block">
						<input type="text" class="fr-form-control" name="m:authApiGrant:limit" value="${authApiGrant.limit}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">测试频次</label>
				  	<div class="fr-form-block">
						<input type="text" class="fr-form-control" name="m:authApiGrant:testLimit" value="${authApiGrant.testLimit}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
