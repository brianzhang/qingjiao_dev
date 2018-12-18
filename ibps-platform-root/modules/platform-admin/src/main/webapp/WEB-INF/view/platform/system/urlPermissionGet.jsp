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
					<div class="form-horizontal "  >
						<label class="col-sm-2 control-label">描述:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${urlPermission.descp}</p>
						</div>
						<label class="col-sm-2 control-label">拦截地址:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${urlPermission.url}</p>
						</div>
						<label class="col-sm-2 control-label">拦截参数:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${urlPermission.params}</p>
						</div>
						<label class="col-sm-2 control-label">是否启用:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
							<c:if test="${urlPermission.enable==1}">启用</c:if>
							<c:if test="${urlPermission.enable==0}">禁用</c:if>
							</p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>