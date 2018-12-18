<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<%@include file="/commons/page/ueditor.jsp" %>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/mail/outMailReply.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-send"><span>立即发送</span></a>
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>存为草稿</span></a>
				<a href="list.htm?setId=${outMail.setId}&types=${outMail.types}" class="btn btn-primary fa fa-back"><span>返回</span></a>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="outMailForm" action="save.htm" method="post">
				<div class="form-group">
					<label class="col-sm-2 control-label">收件人:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${outMail.receiverNames} <<span>${outMail.receiverAddresses}</span>>;</p>
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-2 control-label">发件人:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${outMail.senderName}<<span>${outMail.senderAddresses}</span>>;</p>
							<input type="hidden" id="sendee" value="${outMail.senderAddresses};">
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-2 control-label">主题:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="title" name="title" value="回复:${outMail.title}" />
					</div>
				</div>
				
				<c:if test="${outMail.fileIds != ''}">
					<div class="form-group">
						<label class="col-sm-2 control-label">附件:</label>
						<div class="col-sm-10">
								<div name="div_attachment_container" data-upload-callback="outMail.attachmentCallback">
                                	<div class="fr-files" ></div>
                                	<textarea style="display: none"   data-control="attachment"  name="fileIds" labelname="附件" >${outMail.fileIds}</textarea>
                                </div>
						</div>
					</div>
				</c:if>
				<div class="form-group">
					<div class="col-sm-12">
						<textarea rows="0" cols="0" id="content" name="content" style="display: none;">
										   <br/><br/><hr><br/>----<strong> 回复邮件</strong>----<br/>
											<strong>发件人</strong>:${outMail.senderName}
											<br/><strong>发送时间</strong>:<fmt:formatDate
								value="${outMail.mailDate}" pattern="yyyy年MM月dd日" />
											<br><strong>收件人</strong>:${outMail.receiverNames}
											<c:if test="${not empty outMail.ccNames}">
												<br/>
								<strong>抄送人</strong>:${outMail.ccNames}
											</c:if>
											<br/><strong>主题</strong>:${outMail.title}
											<br/><strong>内容</strong>:<br/><br/>${fn:escapeXml(outMail.content)}
									</textarea>
						<script id="editor" type="text/plain" style="width: 100%; height: 200px;"></script>
					</div>
				</div>
				<input type="hidden" id="setId" name="setId" value="${outMail.setId}" />
			    <input type="hidden" id="types" name="types" value="${outMail.types}" /> 
			    <input type="hidden" id="receiverNames" name="receiverNames" value="${outMail.receiverNames}" />
			    <input type="hidden" id="receiverAddresses" name="receiverAddresses" value="${outMail.receiverAddresses}" /> 
			    <input type="hidden" name="senderAddresses" value="${outMail.senderAddresses}" /> 
			    <input type="hidden" name="senderName" value="${outMail.senderName}" /> 
			    <input type="hidden" name="isReply" value="${outMail.isReply}" /> 
			    <input type="hidden" name="id" value="" />
			</form>
		</div>
</body>
</html>