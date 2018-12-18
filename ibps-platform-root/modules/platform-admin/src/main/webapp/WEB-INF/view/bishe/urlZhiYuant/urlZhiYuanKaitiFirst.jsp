
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
<script type="text/javascript" src="${ctx}/pageoffice.js"  id="po_js_main"></script>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<h2>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp开题准备情况</h2>
		</br>
		<div class="">
			<form class="fr-form" id="urlZhiYuanForm" action="save.htm">
				<input type="hidden" name="m:urlZhiYuan:id" value="${urlZhiYuan.id}" />
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
				<div class="fr_response_field col-sm-3" id="view">
					<div class="fr-form-group">
						<label class="fr-control-label">开题准备情况记录文件下载</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-rights="r"
								data-media="" data-media_type="" data-max_file_size=""
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									validate="{required:false}">${filedownload}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3"  id="show">
					<div class="fr-form-group">
						<p  style="color:red; font-size:15px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;没有上传文档，请提交毕设作业！</p>
					</div>
				</div>

			</form>

		</div>
	</div>
</body>
<script type="text/javascript">
$(function() {
	var word=${word};
	if(word=="0"){
		document.getElementById("view").style.display = "none";
		
		}else{
			document.getElementById("show").style.display = "none";
			}
});
	var fo = eval( '(${filedownload})' )[0], fileName = fo.fileName , fileId = fo.id;
		function pageOffice(){
			POBrowser.openWindowModeless('/platform/office/pageOffice/dialog.htm?fileId='+fileId ,'fullscreen=yes','123');
		}
</script>
<script type="text/javascript"
	src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/dialog/office/officeDialog.js"></script>
</html>
