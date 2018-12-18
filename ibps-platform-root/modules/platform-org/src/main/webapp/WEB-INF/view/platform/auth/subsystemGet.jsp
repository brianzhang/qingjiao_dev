<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
	</head>
	<body >
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<c:if test="${!tree }">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="${returnUrl}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
				<table  class="table-form" cellspacing="0">
					<tr>								
						<th><span>名称:</span></th>
						<td>${subsystem.name}</td>								
					</tr>
					<tr>								
						<th><span>别名:</span></th>
						<td>${subsystem.alias}</td>								
					</tr>
					<tr>								
						<th><span>LOGO:</span></th>
						<td>${subsystem.logo}</td>								
					</tr>
					<tr>								
						<th><span>基准URL:</span></th>
						<td>${subsystem.baseUrl}</td>								
					</tr>
					<tr>								
						<th><span>子系统主页:</span></th>
						<td>${subsystem.homePage}</td>								
					</tr>
					<tr>								
						<th><span>备注:</span></th>
						<td>${subsystem.memo}</td>								
					</tr>
					<tr>								
						<th><span>创建时间:</span></th>
						<td><fmt:formatDate value="${subsystem.createTime}" pattern="yyyy-MM-dd"/></td>								
					</tr>
					<tr>								
						<th><span>创建人:</span></th>
						<td>${f:getPartyLabel(subsystem.creatorId, 'employee', '')}</td>								
					</tr>
					<tr>								
						<th><span>是否本地:</span></th>
						<td>
						<c:if test="${subsystem.isLocal}">是</c:if>
						<c:if test="${!subsystem.isLocal}">否</c:if>
						</td>								
					</tr>
				</table>
			</div>
			</c:if>
			
			<c:if test="${tree }">
			<c:if test="${empty subsystem }">
			<div class="alert alert-warning m-t-sm">请选择左边树右键进行操作！</div>
			</c:if>
			<c:if test="${not empty subsystem }">
			<div class="panel-form">
				<table  class="table-form" cellspacing="0">
					<tr>								
						<th><span>父系统:</span></th>
						<td>${subsystem.parentName}</td>								
					</tr>
					<tr>								
						<th><span>名称:</span></th>
						<td>${subsystem.name}</td>								
					</tr>
					<tr>								
						<th><span>别名:</span></th>
						<td>${subsystem.alias}</td>								
					</tr>
					<tr>								
						<th><span>LOGO:</span></th>
						<td>${subsystem.logo}</td>								
					</tr>
					<tr>								
						<th><span>基准URL:</span></th>
						<td>${subsystem.baseUrl}</td>								
					</tr>
					<tr>								
						<th><span>子系统主页:</span></th>
						<td>${subsystem.homePage}</td>								
					</tr>
					<tr>								
						<th><span>备注:</span></th>
						<td>${subsystem.memo}</td>								
					</tr>
					<tr>								
						<th><span>创建时间:</span></th>
						<td><fmt:formatDate value="${subsystem.createTime}" pattern="yyyy-MM-dd"/></td>								
					</tr>
					<tr>								
						<th><span>创建人:</span></th>
						<td>${f:getPartyLabel(subsystem.creatorId, 'employee', '')}</td>								
					</tr>
					<tr>								
						<th><span>是否本地:</span></th>
						<td>
						<c:if test="${subsystem.isLocal}">是</c:if>
						<c:if test="${!subsystem.isLocal}">否</c:if>
						</td>								
					</tr>
				</table>
			</div>
			</c:if>
			</c:if>
	</div>
</body>
</html>