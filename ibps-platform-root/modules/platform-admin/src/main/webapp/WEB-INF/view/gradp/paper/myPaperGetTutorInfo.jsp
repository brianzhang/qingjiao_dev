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
			<h1 style="text-align: center; margin: 10px">指导教师评审详情</h1>
		</div>
		<div class="">
			<form class="fr-form" id="myPaperForm">
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">教师工号</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.ttnum}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">教师姓名</label>
						<div class="fr-form-block">
							<p class="form-control-static">${ttName}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">教师职称</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.ttposition}</p>
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
						<label class="fr-control-label">评审评语</label>
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
				<div class="fr_response_field col-sm-4">
					<div class="fr-form-group">
						<label class="fr-control-label">批阅文件</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-rights="r" >
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									name="m:myPaper:ttreviewfid" validate="{required:false}">${myPaper.ttreviewfid}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">批阅文件上传时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${myPaper.ttreviewuptime}</p>
						</div>
					</div>
				</div>
			</form>

		</div>
	</div>
</body>
</html>
