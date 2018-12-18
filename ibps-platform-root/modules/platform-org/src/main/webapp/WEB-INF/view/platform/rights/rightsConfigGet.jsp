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
						<label class="col-sm-2 control-label">类型名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${rightsConfig.name}</p>
						</div>
						<label class="col-sm-2 control-label">类型KEY:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${rightsConfig.key}</p>
						</div>
						<label class="col-sm-2 control-label">实体类型:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${rightsConfig.entityType}</p>
						</div>
						<label class="col-sm-2 control-label">实体ID的KEY:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${rightsConfig.entityIdKey}</p>
						</div>
						<label class="col-sm-2 control-label">拥有的权限:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${rightsConfig.ownRights}</p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>