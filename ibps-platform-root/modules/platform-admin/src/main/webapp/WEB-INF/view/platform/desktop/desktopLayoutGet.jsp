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
							<th><span>布局名称:</span></th>
							<td>${desktopLayout.name}</td>
						</tr>
						<tr>								
							<th><span>布局描述:</span></th>
							<td>${desktopLayout.memo}</td>
						</tr>
						<tr>								
							<th><span>模版内容:</span></th>
							<td><textarea class="form-control" readonly="readonly">${desktopLayout.templateHtml}</textarea></td>
						</tr>
						<tr>								
							<th><span>排序:</span></th>
							<td>${desktopLayout.sn}</td>
						</tr>
				</table>
			</div>
		</div>
	</body>
</html>