<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			
			<div style="background-color: #F7F7F7;border-bottom: 1px solid #CFCFCF;height: 105px;">
				<div style="color: #323232;font-size: 18px;font-weight: bold;line-height: 44px;padding-left:20px">
					<span><c:if test="${news.publicItem=='notices'}">[公告]</c:if><c:if test="${news.publicItem=='important'}"><font color="red">[重要公告]</font></c:if></span>--<span style="color:#000000;">${news.title}</span>
				</div>
				<div style="color: #807F7F;padding-left:10px">
					<p>类型：${news.type}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布人:&nbsp;&nbsp;${news.userName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效时间:&nbsp;&nbsp;<fmt:formatDate value="${news.publicDate}" />&nbsp;&nbsp;至&nbsp;&nbsp;<fmt:formatDate value="${news.loseDate}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是否公共:&nbsp;&nbsp;<c:if test="${news.isPublic=='yes'}">是</c:if><c:if test="${news.isPublic=='no'}">否</c:if>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布状态:<c:if test="${news.status=='drafts'}">草稿</c:if><c:if test="${news.status=='publish'}">发布</c:if></p>
				</div>
				<c:if test="${news.isPublic=='no'}">
					<div style="color: #807F7F;padding-left:10px">
					查看范围组织:<span>${news.depName}</span>
					</div>
				</c:if>
			
				<div style="color: #807F7F;padding-left:10px">
					关键字:&nbsp;&nbsp;<span style="color:red">${news.key}</span>
				</div>
			</div>
			
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
					<c:if test="${not empty news.picture }">
						<div class="col-sm-12">
								<p style="text-align:center"><img id="newsPic" src="${ctx}/${news.picture}" /></p>
						</div>
					</c:if>
						
						<div class="col-sm-12">
							<p class="form-control-static">${news.content}</p>
						</div>
						<div class="col-sm-12" >
								<div name="div_attachment_container" data-rights="r">
	                                	<div class="fr-files" ></div>
	                                	<textarea style="display: none"   data-control="attachment" right="r"  name="fileAttach" labelname="附件" >${news.fileAttach}</textarea>
								</div>
							
						</div>
					</div>
			</div>
		</div>
	</body>
</html>