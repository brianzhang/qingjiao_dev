<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<c:choose>
			<c:when test="${resources == null }">
				<div class="alert alert-warning m-t-sm">请选择左边菜单右键进行操作！</div>
			</c:when>
			<c:otherwise>
				<div class="panel-form">
					<table class="table-form" cellspacing="0">
						<tr>
							<th><span>资源名称:</span></th>
							<td>${resources.name}</td>
						</tr>
						<tr>
							<th><span>别名:</span></th>
							<td>${resources.alias}</td>
						</tr>
						<tr>
							<th><span>序号:</span></th>
							<td>${resources.sn}</td>
						</tr>
						<tr>
							<th><span>图标:</span></th>
							<td><c:if test="${resources.icon!=null}">
									<i class="fa ${resources.icon}"></i>
								</c:if>
							</td>
						</tr>
						<tr>
							<th><span>父类ID:</span></th>
							<td>${resources.parentId}</td>
						</tr>
						<tr>
							<th><span>默认URL:</span></th>
							<td>${resources.defaultUrl}</td>
						</tr>
						<tr>
							<th><span>是否目录:</span></th>
							<td><c:if test="${resources.isFolder==true}">是</c:if> <c:if
									test="${resources.isFolder==false}">否</c:if></td>
						</tr>
						<tr>
							<th><span>显示到菜单:</span></th>
							<td><c:if test="${resources.displayInMenu==true}">是</c:if> 
								<c:if test="${resources.displayInMenu==false}">否</c:if>
							</td>
						</tr>
						<tr>
							<th><span>是否展开:</span></th>
							<td><c:if test="${resources.isOpen==true}">是</c:if> 
								<c:if test="${resources.isOpen==false}">否</c:if>
							</td>
						</tr>
						<tr>
							<th><span>资源描述:</span></th>
							<td>${resources.desc}</td>
						</tr>
					</table>
				</div>
			</c:otherwise>
		</c:choose>
	</div>
</body>
</html>