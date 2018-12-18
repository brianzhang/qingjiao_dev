<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/mail/outMail.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<c:if test="${outMail.isReply&&outMail.types eq 'inbox'}">
						<a class="btn btn-primary fa fa-edit" href="reply.htm?id=${outMail.id}" ><span>回复</span></a>
					</c:if>
					<a class="btn btn-primary fa fa-back" href="list.htm?setId=${outMail.setId}&types=${outMail.types}" ><span>返回</span></a>
				</div>
			</div>
			<div id="getFormData" style="display:none"></div>
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
						<label class="col-sm-2 control-label">主题:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${outMail.title}</p>
						</div>
						<label class="col-sm-2 control-label">日期:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${outMail.mailDate}" /></p>		
						</div>
						<label class="col-sm-2 control-label">收件人:</label>
						<div class="col-sm-10">
							<p class="form-control-static" id="sendee">${outMail.receiverAddresses}</p>
							<input type="hidden" id="sendeen" value="${outMail.receiverNames};">
						</div>
						<label class="col-sm-2 control-label">发件人:</label>
						<div class="col-sm-10">
							<p class="form-control-static" id="sendp">${outMail.senderAddresses};</p>
							<input type="hidden" id="sendpn" value="${outMail.senderName};">
						</div>
						<c:if test="${outMail.ccAddresses != ''}">
							<label class="col-sm-2 control-label">抄送人:</label>
							<div class="col-sm-10">
								<p class="form-control-static" id="ccp">${outMail.ccAddresses}</p>
								<input type="hidden" id="ccpn" value="${outMail.ccNames}">
							</div>
						</c:if>
						<c:if test="${outMail.bccAddresses != ''}">
							<label class="col-sm-2 control-label">暗送人:</label>
							<div class="col-sm-10">
								<p class="form-control-static" id="bccp">${outMail.bccAddresses}</p>
								<input type="hidden" id="bccpn" value="${outMail.bccNames}">
							</div>
						</c:if>
						<label class="col-sm-2 control-label">内容:</label>
						<div class="col-sm-10">
							<div class="form-control-static">${outMail.content}</div>
						</div>
						<c:if test="${outMail.fileIds != ''}">
							<label class="col-sm-2 control-label">附件:</label>
							<div class="col-sm-10">
									<div name="div_attachment_container" data-rights="r">
	                                	<div class="fr-files" ></div>
	                                	<textarea style="display: none"   data-control="attachment"  name="fileIds" labelname="附件" >${outMail.fileIds}</textarea>
	                                </div>
							</div>
						</c:if>
					</div>
			</div>
		</div>
	</body>
</html>