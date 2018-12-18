<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/report/raqsoft/reportParams.js"></script>
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
					<form  class="fr-form"  id="reportParamsForm" >
					<input type="hidden" name="reportType"  value="${reportType?reportType:param.reportType}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数名</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${reportParams.name}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数描述</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${reportParams.desc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数据类型</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${reportParams.dataType}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数类型</label>
				  	<div class="fr-form-block">
						<p class="form-control-static"><c:if test="${reportParams.paramType=='nomal'}">普通参数</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数来源</label>
				  	<div class="fr-form-block">
						<p class="form-control-static"><c:if test="${reportParams.source=='fixed'}">固定值</c:if><c:if test="${reportParams.source=='input'}">表单输入</c:if><c:if test="${reportParams.source=='script'}">脚本</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数值</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${reportParams.value}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">默认值</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${reportParams.defValue}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
