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
							<th><span>名称:</span></th>
							<td>${category.name}</td>
						</tr>
						<tr>								
							<th><span>业务主键</span></th>
							<td>${category.categoryKey}</td>
						</tr>
						<tr>								
							<th><span>是否默认:</span></th>
							<td>
								<c:if test="${category.flag==0}">否</c:if>
								<c:if test="${category.flag==1}">是</c:if>
							</td>
						</tr>
						<tr>								
							<th><span>序号:</span></th>
							<td>${category.sn}</td>
						</tr>
						<tr>								
							<th><span>结构类型:</span></th>
							<td>
								<c:if test="${category.type==0}">平铺结构</c:if>
								<c:if test="${category.type==1}">树型结构</c:if>
							</td>
						</tr>
						<tr>								
							<th><span>创建时间:</span></th>
							<td><fmt:formatDate value="${category.createTime}" /></td>		
						</tr>
						<tr>								
							<th><span>更新时间:</span></th>
							<td><fmt:formatDate value="${category.updateTime}" /></td>		
						</tr>
				</table>
			</div>
		</div>
	</body>
</html>