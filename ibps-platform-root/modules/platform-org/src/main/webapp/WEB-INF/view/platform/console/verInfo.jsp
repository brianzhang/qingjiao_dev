<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/desktop.jsp" %>
</head>
<body>
	<br>
	<div class="wrapper wrapper-content animated fadeInRight col-sm-12">
		<div class="panel-form">
			<table  class="table-form" cellspacing="0">
				<tr>								
					<th><span>授权公司:</span></th>
					<td>${vfyInfo}</td>
				</tr>
				<tr>								
					<th><span>外部版本:</span></th>
					<td>${vfyPubver}</td>								
				</tr>
				<tr>								
					<th><span>内部版本:</span></th>
					<td>${vfyInnver}</td>								
				</tr>
				<tr>								
					<th><span>发布日期:</span></th>
					<td>${pubData}</td>								
				</tr>
				<tr>								
					<th><span>失效日期:</span></th>
					<td>${expData}</td>								
				</tr>
			</table>
		</div>
	</div>
</body>
</html>