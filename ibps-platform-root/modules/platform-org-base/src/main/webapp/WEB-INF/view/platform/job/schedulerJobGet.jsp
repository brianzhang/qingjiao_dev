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
							<th><span>DESCRIPTION:</span></th>
							<td>${scheduler.description}</td>
						</tr>
						<tr>								
							<th><span>JOB_CLASS_NAME:</span></th>
							<td>${scheduler.jobClassName}</td>
						</tr>
						<tr>								
							<th><span>IS_DURABLE:</span></th>
							<td>${scheduler.isDurable}</td>
						</tr>
						<tr>								
							<th><span>IS_NONCONCURRENT:</span></th>
							<td>${scheduler.isNonconcurrent}</td>
						</tr>
						<tr>								
							<th><span>IS_UPDATE_DATA:</span></th>
							<td>${scheduler.isUpdateData}</td>
						</tr>
						<tr>								
							<th><span>REQUESTS_RECOVERY:</span></th>
							<td>${scheduler.requestsRecovery}</td>
						</tr>
						<tr>								
							<th><span>JOB_DATA:</span></th>
							<td>${scheduler.jobData}</td>
						</tr>
				</table>
			</div>
		</div>
	</body>
</html>