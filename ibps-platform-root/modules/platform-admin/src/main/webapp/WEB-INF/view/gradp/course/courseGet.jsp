<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/course.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<%-- <div class="panel-toolbar ">
			<div class="buttons">
				<a class="btn btn-primary fa fa-back" href="${returnUrl}"><span>返回</span></a>
			</div> --%>
		</div>
		
		<div class="" style="margin: 3% auto" >
			<form class="fr-form" id="courseForm">
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">课程编号</label>
						<div class="fr-form-block">
							<p class="form-control-static">${course.num}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">课程名称</label>
						<div class="fr-form-block">
							<p class="form-control-static">${course.name}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">学时</label>
						<div class="fr-form-block">
							<p class="form-control-static">${course.period}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">学分</label>
						<div class="fr-form-block">
							<p class="form-control-static">${course.credit}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">性质</label>
						<div class="fr-form-block">
							<p class="form-control-static">${course.category}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">开课院系</label>
						<div class="fr-form-block">
							<p class="form-control-static">${course.college}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">考试性质</label>
						<div class="fr-form-block">
							<p class="form-control-static">${course.testing}</p>
						</div>
					</div>
				</div>
			</form>

		</div>
	</div>
</body>
</html>
