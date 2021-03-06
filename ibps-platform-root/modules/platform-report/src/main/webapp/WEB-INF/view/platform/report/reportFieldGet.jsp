<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/components/report/ireport/reportField.js"></script>
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
					<form  class="fr-form"  id="reportFieldForm" >
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">字段名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${reportField.name}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">字段类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${reportField.dataType}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">字段描述</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${reportField.desc}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
