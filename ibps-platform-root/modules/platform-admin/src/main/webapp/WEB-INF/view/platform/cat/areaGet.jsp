

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
			<div class="panel-form col-sm-12">
				<div class="form-horizontal ">
					<label class="col-sm-2 control-label">父区域:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${parentName}</p>
					</div>
					<label class="col-sm-2 control-label">区域代码:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${area.key}</p>
					</div>
					<label class="col-sm-2 control-label">区域名称:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${area.name}</p>
					</div>
					<label class="col-sm-2 control-label">排序:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${area.sn}</p>
					</div>

				</div>
			</div>
		</div>
	</body>
</html>