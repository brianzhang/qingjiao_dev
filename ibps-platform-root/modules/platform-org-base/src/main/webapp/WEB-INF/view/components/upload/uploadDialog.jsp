<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>

<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<f:link href="/lc/upload/webuploader.css" isCommon="false" />
<link href="${ctx}/js/plugins/ueditor/dialogs/attachment/attachment.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="${ctx}/js/plugins/webuploader/webuploader.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/laypage/laypage.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/components/upload/FileUpload.js"></script>
<title>附件上传</title>
</head>
<body>
	<div class="tabs-container">
		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#upload_tab"
				aria-expanded="true">上传附件</a></li>
			<li><a data-toggle="tab" href="#online_tab"
				aria-expanded="false">在线附件</a></li>
		</ul>
		<div class="tab-content">
			<!--   上传附件 -->
			<div id="upload_tab" class="tab-pane active">
				<div id="upload" class="panel focus">
					<div id="queueList" class="queueList">
						<div class="statusBar ">
							<div class="progress">
								<span class="text">0%</span> <span class="percentage"></span>
							</div>
							<div class="info"></div>
							<div class="btns">
								<div id="filePickerBtn"></div>
								<div class="delUploadBtn">全部删除</div>
							</div>
						</div>
						<div id="dndArea">
							<ul class="filelist">
								<li id="filePickerBlock" class="filePickerBlock"></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!--   已经上传的附件 -->
			<div id="online_tab" class="tab-pane">
				<div id="online" class="panel focus">
					<div id="filePage" class="pull-left"></div>
					<div style="float: right; padding-right: 100px;">
						<input id="fileName" type="text" class="form-control"
							style="width: 120px; height: 26px; display: inline;" />&nbsp;
						<a class="btn btn-primary fa fa-search" href="javascript:void(0);" id="search"><span>搜索</span></a>
					</div>
					<div id="fileList"></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>