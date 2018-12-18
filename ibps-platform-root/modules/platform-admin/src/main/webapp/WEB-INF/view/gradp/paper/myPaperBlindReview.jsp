<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/hrbeu/gradp/paper/myPaper.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<h1 style="margin: 10px">请认真填写盲审评阅信息</h1>
			</div>
		</div>
		<div class="">
			<form class="fr-form" id="myPaperForm" action="save.htm">
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">学生论文文件</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-rights="r" >
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									name="m:myPaper:stupppfid" validate="{required:false}">${myPaper.stupppfid}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评语</label>
						<div class="fr-form-block">
							<textarea class="fr-form-control fr-control-textarea"
								name="m:myPaper:ptcomment"
								validate="{required:true,maxLength:0}">${myPaper.ptcomment}</textarea>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">意见</label>
						<div class="fr-form-block">
							<label class="fr-control-option radio-inline"> <input
								type="radio" name="m:myPaper:ptidea" class="ibps" value="1"
								<c:if test="${myPaper.ptidea=='1'}">checked="checked"</c:if>
								validate="{required:true}" /> <span class="lbl">同意</span>
							</label> <label class="fr-control-option radio-inline"> <input
								type="radio" name="m:myPaper:ptidea" class="ibps" value="2"
								<c:if test="${myPaper.ptidea=='2'}">checked="checked"</c:if>
								validate="{required:true}" /> <span class="lbl">拒绝</span>
							</label>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">请上传批阅文件</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-media=""
								data-media_type="docs" data-max_file_size="10"
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									name="m:myPaper:ptreviewfid" validate="{required:true}">${myPaper.ptreviewfid}</textarea>
							</div>
						</div>
					</div>
				</div>
			</form>

		</div>
	</div>
</body>
</html>
