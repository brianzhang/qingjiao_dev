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
	    
		 <div class="panel-toolbar ">
			<div class="buttons">
				<%-- <a class="btn btn-primary fa fa-detail " id="officeOnline"
					href="javascript:void(0);" onclick="javascript:officeOnline()"><span>在线word批阅（旧）</span></a> <a class="btn btn-primary fa fa-detail hidden"
					href="${ctx}/gradp/sys/user/help.htm#officeOnline"><span>在线office用前必读</span></a> --%>
				<a class="btn btn-primary fa fa-detail " id="officeOnline"
							onclick="pageOffice()"><span>在线word查看</span></a>						
             
			</div>
		</div> 
		<div class="">
		<h2>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp开题准备阶段检查记录</h2>
		</br>
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
						<label class="fr-control-label">学生开题准备情况记录文件下载</label>
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
						<p  style="color:red; font-size:15px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学生没有上传文档，请督促该学生！</p>
					</div>
				</div>
				
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">综合意见</label>
				  	<div class="fr-form-block">
				<textarea style="font-size:15px; width:800px; height:200px" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:td3id"  validate="{required:false}">${urlZhiYuan.td3id}</textarea>
				 	</div>
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
	function officeOnline() {
		var rights, btns, b = [ {
			'alias' : 'file',
			'css' : 'fa-file',
			'text' : '文件',
			'parentAlias' : '-1'
		}, {
			'alias' : 'save',
			'css' : 'fa-floppy-o ',
			'text' : '保存',
			'parentAlias' : 'file'
		}, {
			'alias' : 'print',
			'css' : 'fa-print',
			'text' : '打印',
			'parentAlias' : 'file'
		}, {
			'alias' : 'review',
			'css' : 'fa-file',
			'text' : '审阅',
			'parentAlias' : '-1'
		}, {
			'alias' : 'addComment',
			'css' : 'fa-file',
			'text' : '新建批注',
			'parentAlias' : 'review'
		}, {
			'alias' : 'delAllComment',
			'css' : 'fa-file',
			'text' : '删除所有批注',
			'parentAlias' : 'review'
		} ];
		if (status == '1' && role == 'std')//已经结束,教师可以编辑
			btn = [ b[0], b[2] ];
		else
			//进行中全部开放
			btn = b;
		new OfficeDialog({
		 	fileName : fileName,
			fileId : fileId,
			rights : "e",
			btns : btn,
			title : "附件预览"
		}).show();
	}
		function pageOffice(){
			POBrowser.openWindowModeless('/platform/office/pageOffice/dialog.htm?fileId='+fileId+'&readOnly=1' ,'fullscreen=yes','123');
		}
</script>
<script type="text/javascript"
	src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/dialog/office/officeDialog.js"></script>
</html>
