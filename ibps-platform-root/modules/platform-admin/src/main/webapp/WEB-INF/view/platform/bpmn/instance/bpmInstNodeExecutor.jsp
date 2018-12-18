<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>候选人列表</title>
<%@include file="/commons/include/get.jsp"%>
</head>

<body>
	<table class="table table-bordered table-hover table-condensed">
		<thead>
			<tr>
				<th>序号</th>
				<th>姓名</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="d" varStatus="status" items="${data}">
				<tr>
					<td>${status.index+1 }</td>
					<td>
					<span class="owner-span"> 
						<c:if test="${hasApproval }">
						<a href="#" data-executId="${d.executId }">${d.executor}</a>
						</c:if>
						<c:if test="${!hasApproval }">
						<a href="#" data-executId="${d.id }">${d.name}</a>
						</c:if>
					</span>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</body>
</html>