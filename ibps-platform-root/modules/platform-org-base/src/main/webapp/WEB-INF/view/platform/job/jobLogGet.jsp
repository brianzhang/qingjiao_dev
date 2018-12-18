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
			<div class="panel-form">
				<table class="table-form"   cellspacing="0">
						<tr>								
							<th><span>任务名:</span></th>
							<td>${jobLog.jobName}</td>
						</tr>
						<tr>								
							<th><span>触发器名称:</span></th>
							<td>${jobLog.trigName}</td>
						</tr>
						<tr>								
							<th><span>任务分组:</span></th>
							<td>${jobLog.group}</td>
						</tr>
						<tr>								
							<th><span>开始时间:</span></th>
							<td><fmt:formatDate value="${jobLog.startTime}" /></td>		
						</tr>
						<tr>								
							<th><span>结束时间:</span></th>
							<td><fmt:formatDate value="${jobLog.endTime}" /></td>		
						</tr>
						<tr>								
							<th><span>内容:</span></th>
							<td>${jobLog.content}</td>
						</tr>
						<tr>								
							<th><span>状态:</span></th>
							<td>
							<c:if test="${jobLog.state==0}">失败</c:if>
							<c:if test="${jobLog.state==1}">成功</c:if>
							</td>
						</tr>
						<tr>								
							<th><span>运行时长:</span></th>
							<td>${jobLog.runTime}</td>
						</tr>
				</table>
			</div>
		</div>
	</body>
</html>