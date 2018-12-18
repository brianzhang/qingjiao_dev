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
			<h1 style="text-align: center; margin: 10px">盲审详情信息</h1>
		</div>
		<div class="">
			<form class="fr-form" id="myPaperForm">
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
						<p class="form-control-static" style="color:<c:if test="${myPaper.ptidea=='2'}">red</c:if><c:if test="${myPaper.ptidea=='1'}">green</c:if>">
							<c:if test="${myPaper.ptidea=='1'}">同意</c:if>
							<c:if test="${myPaper.ptidea=='2'}">拒绝</c:if>
						</p>
					</div>
				</div>
		</div>
		<div class="fr_response_field col-sm-4">
			<div class="fr-form-group">
				<label class="fr-control-label">批阅文件</label>
				<div class="fr-form-block">
					<div name="div_attachment_container" data-rights="r">
						<div class="fr-files"></div>
						<textarea style="display: none" data-control="attachment"
							name="m:myPaper:stupppfid" validate="{required:false}">${myPaper.ptreviewfid}</textarea>
					</div>
				</div>
			</div>
		</div>
		<div class="fr_response_field col-sm-12">
			<div class="fr-form-group">
				<label class="fr-control-label">批阅文件上传时间</label>
				<div class="fr-form-block">
					<p class="form-control-static">${myPaper.ptreviewuptime}</p>
				</div>
			</div>
		</div>
		</form>

	</div>
	</div>
</body>
</html>
