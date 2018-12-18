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
						<label class="col-sm-2 control-label">标题:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${acceptIp.title}</p>
						</div>
						<label class="col-sm-2 control-label">开始地址:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${acceptIp.startIp}</p>
						</div>
						<label class="col-sm-2 control-label">结束地址:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${acceptIp.endIp}</p>
						</div>
						<label class="col-sm-2 control-label">备注:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${acceptIp.remark}</p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>