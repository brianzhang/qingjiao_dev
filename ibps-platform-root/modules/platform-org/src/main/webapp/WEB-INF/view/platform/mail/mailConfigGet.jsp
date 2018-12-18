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
					<a class="btn btn-primary fa fa-back" href="list.htm" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
						<label class="col-sm-2 control-label">用户ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.userId}</p>
						</div>
						<label class="col-sm-2 control-label">用户名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.userName}</p>
						</div>
						<label class="col-sm-2 control-label">外部邮件地址:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.mailAddress}</p>
						</div>
						<label class="col-sm-2 control-label">外部邮件密码:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.mailPass}</p>
						</div>
						<label class="col-sm-2 control-label">smtp主机:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.smtpHost}</p>
						</div>
						<label class="col-sm-2 control-label">smtp端口:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.smtpPort}</p>
						</div>
						<label class="col-sm-2 control-label">pop主机:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.popHost}</p>
						</div>
						<label class="col-sm-2 control-label">pop端口:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.popPort}</p>
						</div>
						<label class="col-sm-2 control-label">imap主机:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.imapHost}</p>
						</div>
						<label class="col-sm-2 control-label">imap端口:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.imapPort}</p>
						</div>
						<label class="col-sm-2 control-label">是否默认:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.isDefault}</p>
						</div>
						<label class="col-sm-2 control-label">接收邮件服务器类型:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.mailType}</p>
						</div>
						<label class="col-sm-2 control-label">是否使用SSL连接服务器:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.useSsl}</p>
						</div>
						<label class="col-sm-2 control-label">是否需要身份认证:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.isValidate}</p>
						</div>
						<label class="col-sm-2 control-label">是否下载附件:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.isHanDleAttach}</p>
						</div>
						<label class="col-sm-2 control-label">是否删除远程邮件:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${mailConfig.isDeleteRemote}</p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>