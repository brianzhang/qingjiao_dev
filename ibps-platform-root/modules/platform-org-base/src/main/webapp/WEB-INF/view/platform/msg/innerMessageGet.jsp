<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
					<c:if test="${innerMessage.canreply == 1 && !receive}"><a class="btn btn-primary fa fa-reply-all " href="${ctx }/platform/msg/innerMessage/reply.htm?id=${innerMessage.id}"><span>回复</span></a></c:if>
					
				</div>
			</div>
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
						<div class="form-group">
							<label class="col-sm-2 control-label">主题:</label>
							<div class="col-sm-3">
								<p class="form-control-static">${innerMessage.subject}</p>
							</div>
							
							
							<label class="col-sm-2 control-label">创建时间:</label>
							<div class="col-sm-3">
								<p class="form-control-static"><fmt:formatDate value="${innerMessage.createTime}"  pattern="yyyy-MM-dd HH:mm:ss"/></p>		
							</div>
						</div>
					
						<div class="form-group">
								<label class="col-sm-2 control-label">发送人:</label>
								<div class="col-sm-3">
									<p class="form-control-static">${innerMessage.owner}</p>
								</div>
						
							<label class="col-sm-2 control-label">消息类型:</label>
							<div class="col-sm-3">
								<p class="form-control-static">
									<c:choose>
										<c:when test="${innerMessage.messageType == 'system'}">系统</c:when>
										<c:otherwise>普通</c:otherwise>
									</c:choose>
								</p>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-2 control-label">是否公告:</label>
							<div class="col-sm-3">
								<p class="form-control-static">
									<c:choose>
										<c:when test="${innerMessage.isPublic == 1}">是</c:when>
										<c:otherwise>否</c:otherwise>
									</c:choose>
								</p>
							</div>
							
							<label class="col-sm-2 control-label">是否可回复:</label>
							<div class="col-sm-3">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${innerMessage.canreply == 1}">是</c:when>
									<c:otherwise>否</c:otherwise>
								</c:choose>
							</p>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-2 control-label">消息内容:</label>
							<div class="col-sm-10">
								<p>${innerMessage.content}</p>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-2 control-label">附件:</label>
							<div class="col-sm-10">
								<div name="div_attachment_container" data-rights="r">
	                                	<div class="fr-files" ></div>
	                                	<textarea style="display: none"   data-control="attachment"  name="fileMsg" labelname="附件" >${innerMessage.fileMsg}</textarea>
								</div>
							</div>
						</div>
						<div class="panel">
							<div class="tabs-container tabs-x">
								<ul class="nav nav-tabs">
									<li class="active">
										<a data-toggle="tab" href="#tab-1" data-iframe="true" aria-expanded="false" data-url="${ctx}/platform/msg/innerMessageReply/List.htm?msgId=${innerMessage.id}" >已回复消息列表</a>
									</li>
									<li class="">
										<a data-toggle="tab" href="#tab-2" data-iframe="true" aria-expanded="true" data-url="${ctx}/platform/msg/innerMessageRead/List.htm?msgId=${innerMessage.id}" >已读取人员列表</a>
									</li>
								</ul>
							</div>
							
							<div class="tab-content">
								<div id="tab-1" class="tab-pane active">
									<div class="panel-body">
										<div class="wrapper wrapper-content col-sm-12">
											
										</div>
									</div>
								</div>
								
								<div id="tab-2" class="tab-pane">
									<div class="panel-body">
										<div class="wrapper wrapper-content col-sm-12">
											
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>