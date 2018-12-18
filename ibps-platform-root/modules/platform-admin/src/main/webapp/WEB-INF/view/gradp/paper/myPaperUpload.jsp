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
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>上传</span></a>
			</div>
		</div>
		<div class="">
			<form class="fr-form" id="myPaperForm" action="save.htm">
				<input type="hidden" name="m:myPaper:id" value="${myPaper.id}" />
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">学号</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:myPaper:stunum" value="${myPaper.stunum}"
								validate="{required:false" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">指导教师姓名</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" 
								value="${ttName}" validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12" style="display:none">
					<div class="fr-form-group">
						<label class="fr-control-label">指导教师姓名</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:myPaper:ttnum"
								value="${myPaper.ttnum}" validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">上传论文</label>
						<div class="fr-form-block">
							<div name="div_attachment_container"  data-media=""
								data-media_type="docs" data-max_file_size="5"
								data-max_file_quantity="1">
								<div class="fr-files" ></div>
								<textarea style="display: none"  data-control="attachment"
									name="m:myPaper:stuppfid" validate="{required:false}">${myPaper.stuppfid}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">上传评阅论文</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-media=""
								data-media_type="docs" data-max_file_size="5"
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									name="m:myPaper:stupppfid" validate="{required:false}">${myPaper.stupppfid}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">上传答辩ppt</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-media=""
								data-media_type="docs" data-max_file_size="5"
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									name="m:myPaper:stupptfid" validate="{required:false}">${myPaper.stupptfid}</textarea>
							</div>
						</div>
					</div>
				</div>
			</form>

		</div>
	</div>
</body>
</html>
