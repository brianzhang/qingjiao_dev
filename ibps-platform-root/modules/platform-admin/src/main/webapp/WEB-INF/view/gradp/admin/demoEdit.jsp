<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/model/propModel.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>保存</span></a>
				<a href="list.htm" class="btn btn-primary fa fa-back"><span>返回</span></a>
			</div>
		</div>
		<div class="">
			<form class="fr-form" id="propModelForm" action="save.htm">
				<input type="hidden" name="m:propModel:id" value="${propModel.id}" />
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">创建时间</label>
						<div class="fr-form-block">
							<div data-toggle="office">
								<div id="createTime"></div>
								<input type="hidden" id="createTime_value"
									name="m:propModel:createTime" data-office_type=""
									value="<fmt:formatDate value="${propModel.createTime}"  pattern=""/>" />
							</div>

						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">更新时间</label>
						<div class="fr-form-block"></div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">名称</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-media=""
								data-media_type="docs" data-max_file_size="15"
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									name="m:propModel:name" validate="{required:false}">${propModel.name}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">1</label>
						<div class="fr-form-block">
							<div name="div_attachment_container"
								data-media="application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel"
								data-media_type="costum" data-max_file_size="15"
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									id="file"></textarea>
								<input class="hidden" value="1" id="cost" />
							</div>
						</div>
					</div>
				</div>
				
			</form>

		</div>
	</div>
</body>
</html>
