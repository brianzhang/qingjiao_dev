<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/hrbeu/gradp/paper/myPaper.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<h1 style="text-align: center; margin: 10px">我的论文</h1>
		</div>

		<div class="">
			<form class="fr-form" id="myPaperForm">

				<h3 style="margin: 10px">
					我的信息<a style="margin: 5px" onclick="showDialog('get','MyInfo')">more>>></a>
				</h3>
				<hr>
				<br>
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
						<label class="fr-control-label">论文上传时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.stupptime}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评阅论文上传时间</label>
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
				<h3 style="margin: 10px">
					指导教师评审情况<a style="margin: 5px"
						onclick="showDialog('get','TutorInfo')">more>>></a>
				</h3>
				<hr>
				<br>

				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">指导教师姓名</label>
						<div class="fr-form-block">
							<p class="form-control-static">${ttName}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">下载论文时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.ttdowntime}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评审时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.ttreviewtime}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评语</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.ttcomment}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评审意见</label>
						<div class="fr-form-block">
							<p class="form-control-static" style="color:<c:if test="${myPaper.ttidea=='2'}">red</c:if><c:if test="${myPaper.ttidea=='1'}">green</c:if>">
								<c:if test="${myPaper.ttidea=='1'}">同意</c:if>
								<c:if test="${myPaper.ttidea=='2'}">拒绝</c:if>
							</p>
						</div>
					</div>
				</div>
				<h3 style="margin: 10px">
					盲审评审情况<a style="margin: 5px" onclick="showDialog('get','PRInfo')">more>>></a>
				</h3>
				<hr>
				<br>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">下载论文时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.ptdowntime}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评阅时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.ptptime}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评语</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.ptcomment}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评阅意见</label>
						<div class="fr-form-block">
							<p class="form-control-static" style="color:<c:if test="${myPaper.ptidea=='2'}">red</c:if><c:if test="${myPaper.ptidea=='1'}">green</c:if>">
								<c:if test="${myPaper.ptidea=='1'}">同意</c:if>
								<c:if test="${myPaper.ptidea=='2'}">拒绝</c:if>
							</p>
						</div>
					</div>
				</div>
				
			</form>

		</div>
	</div>
</body>
</html>
