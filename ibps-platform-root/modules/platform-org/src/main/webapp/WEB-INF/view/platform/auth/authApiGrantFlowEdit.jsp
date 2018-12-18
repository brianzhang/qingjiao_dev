<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/authApiGrant.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="authApiGrantForm" action="save.htm" >
					<input type="hidden" name="m:authApiGrant:id"  value="${authApiGrant.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授权类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:grantType" value="${authApiGrant.grantType}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授权标识</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:grantKey" value="${authApiGrant.grantKey}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">APP标识</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:appKey" value="${authApiGrant.appKey}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API标识</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:apiKey" value="${authApiGrant.apiKey}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">频次,非负整数,0标识不限制;</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:limit" value="${authApiGrant.limit}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">测试频次,非负整数,0标识不限制;</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:testLimit" value="${authApiGrant.testLimit}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">状态:pendding/effect/expired</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:status" value="${authApiGrant.status}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:createBy" value="${authApiGrant.createBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:authApiGrant:createTime"   value="<fmt:formatDate value="${authApiGrant.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">过期时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:authApiGrant:expireTime"   value="<fmt:formatDate value="${authApiGrant.expireTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审核人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:auditBy" value="${authApiGrant.auditBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审核时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:authApiGrant:auditTime"   value="<fmt:formatDate value="${authApiGrant.auditTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">理由</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authApiGrant:cause" value="${authApiGrant.cause}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
