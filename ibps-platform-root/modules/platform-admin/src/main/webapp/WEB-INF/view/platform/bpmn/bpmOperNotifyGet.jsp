<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
			  <div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">流程定义</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${bpmOperNotify.procDefName}</p>
				 	</div>
			  	</div>
			 </div>
			   <div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">节点</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmOperNotify.nodeName}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知标题</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmOperNotify.notifyTitle}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${bpmOperNotify.notifyType=='cc'}">抄送</c:if><c:if test="${bpmOperNotify.notifyType=='bcc'}">密送</c:if><c:if test="${bpmOperNotify.notifyType=='fw'}">转发</c:if></p>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知人</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${f:getPartyLabel(bpmOperNotify.notifier, 'employee', '')}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${bpmOperNotify.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知内容</label>
				  	<div class="">
					   <p class="form-control-static">${bpmOperNotify.notifyHtmlContent}</p>
				 	</div>
			  	</div>
			</div>
			 	<%-- <div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知内容</label>
				  	<div class="fr-form-block">
					<p class="form-control-static">${bpmOperNotify.notifyContent}</p>
				 	</div>
			  	</div> --%>
			</div>
			
			<c:if test="${not empty bpmOperNotify.bpmOperNotifyRecerPoList }">
			<table class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">接收人列表</div>
			</caption>
			<thead>
			<tr>
			<th>接收人</th>
			<th>是否已读</th>
			<th>阅读时间</th>
			</tr>
			</thead>
			<tbody>
			<c:forEach items="${bpmOperNotify.bpmOperNotifyRecerPoList }" var="bpmOperNotifyRecer">
			<tr>
			<td>${f:getPartyLabel(bpmOperNotifyRecer.receiverId, 'employee', '')}</td>
			<td><c:if test="${'Y' == bpmOperNotifyRecer.isRead }">是</c:if>
				<c:if test="${'N' == bpmOperNotifyRecer.isRead }"><span style="color:red;">否</span></c:if></td>
			<td><fmt:formatDate value="${bpmOperNotifyRecer.updateTime }" pattern="yyyy-MM-dd HH:mm:ss"/></td>
			</tr>
			</c:forEach>
			</tbody>
			</table>
			</c:if>
	</form>

			</div>
		</div>
	</body>
</html>
