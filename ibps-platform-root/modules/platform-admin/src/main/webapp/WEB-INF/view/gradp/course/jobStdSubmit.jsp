<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script>
var index =null;
function upload(status,num,f){
	if(status==2){//来来来，随便改
		DialogUtil.error("已结束！");
		return;
	}
	var file = $('#file').val();
	if($.isEmpty(file)){
		DialogUtil.error("请选择文件！");
		return;
	}
	DialogUtil.alert("正在进行字数统计与文件查重，请勿操作窗口...");
	$.ajax({
		url:'saveUploadFile.htm',
		data:{
			file:file,
			stdNum:'${stdNum}',
			stdName:'${stdName}',
			jobId:'${jobId}'
		},
		method:'post',
		success:function(responseText){
			var result = new com.lc.form.ResultMessage(responseText);
			if (result.isSuccess()) {
				DialogUtil.closeAll();
				f();
				DialogUtil.alert(result.getMessage());
				
			} else {
					DialogUtil.error(result.getMessage());
					document.write(result.getCause());
			}
		}
	});
}

function showResponse(responseText,callbak) {
	DialogUtil.close(index);
	var result = new com.lc.form.ResultMessage(responseText);
	if (result.isSuccess()) {
		DialogUtil.confirm(result.getMessage() + ',是否继续操作',
				function(rtn) {
				if(rtn)
					window.location.reload(true);
				else{
					DialogUtil.closeAll();
				}
				
					
				});
	} else {
		if(result.isWarn()){
			DialogUtil.warn(result.getMessage());
		}else{
			DialogUtil.error(result.getMessage(),result.getCause());
		}
	}
}</script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<!-- <div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div> -->
			<h1 style="text-align: center; line-height: 1.5em">请按照作业要求，认真完成作业</h1>
			<h2 style="text-align: center; line-height: 1.5em; color: red">
				doc或docx格式，并且文件名包含"${stdNum}"和"${stdName}"</h2>
		</div>
		<div class="">
			<form class="fr-form" id="jobStdForm" action="saveUploadFile.htm">
				<input type="hidden" name="m:jobStd:id" value="${jobStd.id}" />
				<div class="fr_response_field col-sm-9">
					<div class="fr-form-group">
						<label class="fr-control-label">作业名称</label>
						<div class="fr-form-block">
							<p class="form-control-static">${jobName}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-9" >
					<div class="fr-form-group">
						<label class="fr-control-label">最近上传时间</label>
						<div class="fr-form-block">
							<p class="form-control-static" id="time">${jobStd.fileUploadTime}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-6" >
					<div class="fr-form-group">
						<label class="fr-control-label">作业文件</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-media="" id="fileint"
								data-media_type="docs" data-max_file_size="2"
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									name="m:jobStd:file" id="file" validate="{required:false}">${jobStd.file}</textarea>
							</div>
						</div>
					</div>
				</div>
				<c:if test="${jobName=='参观汇总表' }">
				<div class="fr_response_field col-sm-6" >
					<div class="fr-form-group">
						<label class="fr-control-label">请下载文件模板</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-media="" data-rights="r"
								data-media_type="docs" data-max_file_size="2"
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									name="m:jobStd:file" id="file" validate="{required:false}">[{"fileName":"参观汇总表-模板","id":"335502557927440384"}]</textarea>
							</div>
						</div>
					</div>
				</div>
				</c:if>
				<c:if test="${jobName=='讲座汇总表' }">
				<div class="fr_response_field col-sm-6" >
					<div class="fr-form-group">
						<label class="fr-control-label">请下载文件模板</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-media="" data-rights="r"
								data-media_type="docs" data-max_file_size="2"
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									name="m:jobStd:file" id="file" validate="{required:false}">[{"fileName":"讲座汇总表-模板","id":"335503085386334208"}]</textarea>
							</div>
						</div>
					</div>
				</div>
				</c:if>
				
				
			</form>

		</div>
	</div>
</body>
</html>
