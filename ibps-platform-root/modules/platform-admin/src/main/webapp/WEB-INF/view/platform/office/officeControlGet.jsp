

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12">
				<div class="form-horizontal ">
					<label class="col-sm-2 control-label">文件名:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeControl.fileName}</p>
					</div>
					<label class="col-sm-2 control-label">文件拓展名:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeControl.ext}</p>
					</div>
					<label class="col-sm-2 control-label">文件大小:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeControl.totalBytes}</p>
					</div>
					<label class="col-sm-2 control-label">文件路径:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeControl.filePath}</p>
					</div>
					<label class="col-sm-2 control-label">创建者:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeControl.createBy}</p>
					</div>
					<label class="col-sm-2 control-label">修改者:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeControl.updateBy}</p>
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-10">
						<p class="form-control-static"><fmt:formatDate value="${officeControl.createTime}" /></p>		
					</div>
					<label class="col-sm-2 control-label">修改时间:</label>
					<div class="col-sm-10">
						<p class="form-control-static"><fmt:formatDate value="${officeControl.updateTime}" /></p>		
					</div>

				</div>
			</div>
		</div>
	</body>
</html>