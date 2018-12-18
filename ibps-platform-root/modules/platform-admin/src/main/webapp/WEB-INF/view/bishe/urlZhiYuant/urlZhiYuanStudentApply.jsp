<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuan.js"></script>
</head>
<body>
<script type="text/javascript" src="/pageoffice.js" id="po_js_main"></script>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="">
			<form class="fr-form" id="urlZhiYuanForm" action="save.htm">
				<input type="hidden" name="m:urlZhiYuan:id" value="${urlZhiYuan.id}" />
				</br>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">班级</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:urlZhiYuan:classr" disabled="disabled"
								value="${urlZhiYuan.classr}" validate="{required:false" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">学号</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:urlZhiYuan:xh"
								disabled="disabled" value="${urlZhiYuan.xh}"
								validate="{required:false" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">姓名</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:urlZhiYuan:name" disabled="disabled"
								value="${urlZhiYuan.name}" validate="{required:false" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3"  id="normalView">
					<div class="fr-form-group">
						<label class="fr-control-label">正常论文下载</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-rights="r"
								data-media="" data-media_type="" data-max_file_size=""
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									validate="{required:false}">${normalFileDownload}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3"  id="anonymousView">
					<div class="fr-form-group">
						<label class="fr-control-label">匿名论文下载</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-rights="r"
								data-media="" data-media_type="" data-max_file_size=""
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									validate="{required:false}">${anonymousFileDownload}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3"  id="normalPaperShow">
					<div class="fr-form-group">
						<p  style="color:red; font-size:15px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正常论文还未上传，请联系管理员！</p>
					</div>
				</div>
				<div class="fr_response_field col-sm-3"  id="anonymousPaperShow">
					<div class="fr-form-group">
						<p  style="color:red; font-size:15px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;匿名论文还未上传，请联系管理员！</p>
					</div>
				</div>

			</form>

		</div>
	</div>
</body>
<script type="text/javascript">
$(function(){
	var normalPaperFlag="${normalPaperFlag}";
	if(normalPaperFlag=="0"){
		document.getElementById("normalView").style.display = "none";
	}else{
		document.getElementById("normalPaperShow").style.display = "none";
	}
	
	var anonymousPaperFlag="${anonymousPaperFlag}";
	if(normalPaperFlag=="0"){
		document.getElementById("anonymousView").style.display = "none";
	}else{
		document.getElementById("anonymousPaperShow").style.display = "none";
	}
	
});
</script>
</html>
