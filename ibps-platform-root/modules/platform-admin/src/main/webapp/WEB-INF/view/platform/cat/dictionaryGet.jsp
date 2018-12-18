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
				<c:choose>
			<c:when test="${type == null}">
				<div class="alert alert-warning m-t-sm" >
					请选择左边菜单右键进行操作！
				</div>
			</c:when>
			<c:otherwise>
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
				<table class="table-form"   cellspacing="0">
						<tr>								
							<th><span>类型ID:</span></th>
							<td>${dictionary.typeId}</td>
						</tr>
						<tr>								
							<th><span>字典值代码,在同一个字典中值不能重复:</span></th>
							<td>${dictionary.key}</td>
						</tr>
						<tr>								
							<th><span>字典值名称:</span></th>
							<td>${dictionary.name}</td>
						</tr>
						<tr>								
							<th><span>父ID:</span></th>
							<td>${dictionary.parentId}</td>
						</tr>
				</table>
			</div>
						</c:otherwise>
		</c:choose>
		</div>
	</body>
</html>