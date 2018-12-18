<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<link rel="stylesheet" type="text/css"
	href="${ctx }/styles/commons/css/gxy/dist/bootstrap-clockpicker.min.css">
<link rel="stylesheet"
	href="${ctx }/styles/commons/css/gxy/jqueryui/jquery-ui-1.10.4.custom.min.css" />

</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="${returnUrl }" class="btn btn-primary fa fa-back"><span>返回</span></a>
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>保存</span></a>
			</div>
		</div>
		<div class="">
			<form class="fr-form" id="crsJobForm" action="save.htm">
				<input type="hidden" name="m:crsJob:id" value="${crsJob.id}" />
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">作业标题</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:crsJob:title"
								value="${crsJob.title}" validate="{required:true}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">分值</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:crsJob:scorePower"
								value="${crsJob.scorePower}" validate="{required:true,range:[0,100] }"  />
						</div>
					</div>
				</div>
				<input type="hidden" class="fr-form-control"
					name="m:crsJob:crsTchId" value="${crsJob.crsTchId }"
					validate="{required:false}" />
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">开始时间</label>
						<div class="fr-form-block col-sm-2"
							style="margin-left: -10px; margin-bottom: 5px">
							<input type="text" class="form-control date"
								name="m:crsJob:startTimeP1"
								value="${crsJob.startTime.split(' ')[0]}"
								validate="{required:true}" />
						</div>
						<div class="fr-form-block col-sm-2" style="margin-left: -10px;">
							<div class="input-group clockpicker" data-placement="right"
								data-align="top" data-autoclose="true">
								<input type="text" class="form-control"
									name="m:crsJob:startTimeP2" readonly
									value="${crsJob.startTime.split(' ')[1]}" validate="{required:true}" > <span
									class="input-group-addon"> <span
									class="glyphicon glyphicon-time"></span>
								</span>
							</div>
						</div>

					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">截止时间</label>
						<div class="fr-form-block col-sm-2"
							style="margin-left: -10px; margin-bottom: 5px">
							<input type="text" class="form-control date" 
								name="m:crsJob:stopTimeP1"
								value="${crsJob.stopTime.split(' ')[0]}"
								validate="{required:true}" />
						</div>
						<div class="fr-form-block col-sm-2" style="margin-left: -10px;">
							<div class="input-group clockpicker" data-placement="right"
								data-align="top" data-autoclose="true">
								<input type="text" class="form-control"
									name="m:crsJob:stopTimeP2" readonly
									value="${crsJob.stopTime.split(' ')[1]}" validate="{required:true}" > <span
									class="input-group-addon"> <span
									class="glyphicon glyphicon-time"></span>
								</span>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" class="fr-form-control" name="m:crsJob:status"
					value="${crsJob.status}" validate="{required:false}" />
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">作业要求</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:crsJob:content" value="${crsJob.content}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">上传模板文件</label>
				  	<div class="fr-form-block">
				<div name="div_attachment_container" data-media=""   data-media_type=""  data-max_file_size="15"   data-max_file_quantity="1">
					<div class="fr-files" ></div>
					<textarea style="display: none"   data-control="attachment"  name="m:crsJob:modelFile"  validate="{required:false}">${crsJob.modelFile}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
				<input type="hidden" class="fr-form-control" id="t"
					name="m:crsJob:category" value="${crsJob.category}"
					validate="{required:false}" /><input type="hidden" class="fr-form-control"
					name="m:crsJob:isTrans" value="${crsJob.isTrans}"
					validate="{required:false}" /><input type="hidden" class="fr-form-control"
					name="m:crsJob:createdTime" value="${crsJob.createdTime}"
					validate="{required:false}" /><input type="hidden" class="fr-form-control"
					name="m:crsJob:tchNd" value="${crsJob.tchNd}"
					validate="{required:false}" /><input type="hidden" class="fr-form-control"
					name="m:crsJob:stdNd" value="${crsJob.stdNd}"
					validate="{required:false}" /><input type="hidden" class="fr-form-control"
					name="m:crsJob:tchFnsh" value="${crsJob.tchFnsh}"
					validate="{required:false}" /><input type="hidden" class="fr-form-control"
					name="m:crsJob:stdFnsh" value="${crsJob.stdFnsh}"
					validate="{required:false}" /><input type="hidden" class="fr-form-control"
					name="m:crsJob:tchAllFnsh" value="${crsJob.tchAllFnsh}"
					validate="{required:false}" /><input type="hidden" class="fr-form-control"
					name="m:crsJob:stdAllFnsh" value="${crsJob.stdAllFnsh}"
					validate="{required:false}" />
			</form>

		</div>
	</div>
</body>
<script type="text/javascript">
var preUrl = '${returnUrl }';
var showChangeAfter = ${showChangeAfter};
</script>
<script type="text/javascript"
	src="${ctx }/js/lc/gradp/course/jqueryui/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript"
	src="${ctx }/js/lc/gradp/course/clock/bootstrap-clockpicker.min.js"></script>
<script type="text/javascript"
	src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsJob.js"></script>
</html>
