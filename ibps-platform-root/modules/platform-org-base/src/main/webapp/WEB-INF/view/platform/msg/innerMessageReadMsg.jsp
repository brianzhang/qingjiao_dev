<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
	<script type="text/javascript">
		$(function(){
			frameElement.dialog.callback(true);
		});
	</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
						<label class="col-sm-2 control-label">主题:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${innerMessage.subject}</p>
						</div>
						<label class="col-sm-2 control-label">发送人:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${innerMessage.owner}</p>
						</div>
						<label class="col-sm-2 control-label">消息类型:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${innerMessage.messageType == 'system'}">系统</c:when>
									<c:otherwise>普通</c:otherwise>
								</c:choose>
							</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${innerMessage.createTime}"  pattern="yyyy-MM-dd HH:mm:ss"/></p>		
						</div>
						<label class="col-sm-2 control-label">是否可回复:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${innerMessage.canreply == 1}">是</c:when>
									<c:otherwise>否</c:otherwise>
								</c:choose>
							</p>
						</div>
						<label class="col-sm-2 control-label">是否公告:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${innerMessage.isPublic == 1}">是</c:when>
									<c:otherwise>否</c:otherwise>
								</c:choose>
							</p>
						</div>
						<label class="col-sm-2 control-label">消息内容:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${innerMessage.content}</p>
						</div>
						<label class="col-sm-2 control-label">附件:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${innerMessage.fileMsg}</p>
						</div>
						<div>
								<div class="jqGrid_wrapper">
									<table id="innerMessageReplyGrid" ></table>
									<div id="innerMessagePager"></div>
								</div>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>