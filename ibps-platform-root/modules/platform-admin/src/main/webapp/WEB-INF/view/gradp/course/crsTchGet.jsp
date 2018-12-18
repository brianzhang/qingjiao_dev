<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsTch.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a class="btn btn-primary fa fa-back" href="${returnUrl}"><span>返回</span></a>
			</div>
		</div>
		<div class="">
			<form class="fr-form" id="crsTchForm">
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">课程编号</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsTch.crsNum}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">授课时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsTch.time}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">上课地点</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsTch.location}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">授课班级</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsTch.clazz}</p>
						</div>
					</div>
				</div>
			</form>

		</div>
	</div>
</body>
</html>
