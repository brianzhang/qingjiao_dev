

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12">
				<div class="form-horizontal ">
					<label class="col-sm-2 control-label">ACCOUNT_:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${test.account}</p>
					</div>
					<label class="col-sm-2 control-label">NAME_:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${test.name}</p>
					</div>

				</div>
			</div>
		</div>
	</body>
</html>