<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<h1 style="text-align: center; margin: 10px">更多基本信息</h1>
		</div>
		<div class="">
			<form class="fr-form" id="myPaperForm">
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">班级</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.subject}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">学号</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.stunum}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">姓名</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.stuname}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">题目</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.title}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">题目来源</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.titlesrc}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">题目类型</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.titletype}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">学生所属团队</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.stuteam}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">地点</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.location}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">所属学院</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.college}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">备注</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.remarks}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">论文上传时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.stupptime}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评阅文件上传时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.pfileuptime}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">答辩ppt上传时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.stupptuptime}</p>
						</div>
					</div>
				</div>
			</form>

		</div>
	</div>
</body>
</html>
