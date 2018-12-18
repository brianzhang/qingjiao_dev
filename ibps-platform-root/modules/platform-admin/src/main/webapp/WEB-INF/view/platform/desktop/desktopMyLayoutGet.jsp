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
							<th><span>用户ID:</span></th>
							<td>${desktopMyLayout.userId}</td>
						</tr>
						<tr>								
							<th><span>模版内容:</span></th>
							<td>${desktopMyLayout.templateHtml}</td>
						</tr>
						<tr>								
							<th><span>设计模版:</span></th>
							<td>${desktopMyLayout.designHtml}</td>
						</tr>
						<tr>								
							<th><span>布局管理ID:</span></th>
							<td>${desktopMyLayout.layoutId}</td>
						</tr>
				</table>
			</div>
		</div>
	</body>
</html>