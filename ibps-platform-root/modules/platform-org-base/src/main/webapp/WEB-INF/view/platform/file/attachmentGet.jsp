<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/file/attachment.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/office/officeDialog.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12" id="attachmentGet" >
					<div class="form-horizontal "  >
						<label class="col-sm-2 control-label">文件名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${attachment.fileName}</p>
						</div>
						<label class="col-sm-2 control-label">附件分类:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${attachment.typeId}</p>
						</div>
						<input type="hidden"  id="attachmentId"  value=" ${attachment.id}" />
						<label class="col-sm-2 control-label">附件类型:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${attachment.fileType eq 'mail'}">邮件附件</c:when>
									<c:when test="${attachment.fileType eq 'user'}">用户信息附件</c:when>
								</c:choose>
							</p>
						</div>
						
						<label class="col-sm-2 control-label">文件路径:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${attachment.filePath}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${attachment.createTime}" pattern="yyyy-MM-dd HH:mm:ss" /></p>		
						</div>
						<label class="col-sm-2 control-label">存储类型:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${attachment.storeType eq 'disk'}">基于磁盘</c:when>
									<c:when test="${attachment.storeType eq 'db'}">基于数据库</c:when>
								</c:choose>
							</p>
						</div>
						<label class="col-sm-2 control-label">总字节数:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${attachment.totalBytes}</p>
						</div>
						<label class="col-sm-2 control-label">扩展名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${attachment.ext}</p>
						</div>
						<label class="col-sm-2 control-label">说明:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${attachment.note}</p>
						</div>
						<label class="col-sm-2 control-label">上传者:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${attachment.creatorName}</p>
						</div>
						
						<label class="col-sm-2 control-label">操作:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${attachment.isDel eq 1}"><font color="red">对不起，该文件已经被删除</font></c:when>
									<c:otherwise>
									<a id="download"  target="_blank" class="link download"><i class="fa fa-download"></i>下载</a>
									<c:choose>
									<c:when test="${attachment.ext == 'doc' || attachment.ext == 'docx' || attachment.ext == 'ppt' || attachment.ext == 'pptx' || attachment.ext == 'xls' || attachment.ext == 'xlsx'}">
									<a id="preview" href="javascript:attachment.openFile('${attachment.id}','${attachment.ext}');" class="btn fa fa-eye">预览</a>
									</c:when>
									</c:choose>
									</c:otherwise>
								</c:choose>
							</p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>