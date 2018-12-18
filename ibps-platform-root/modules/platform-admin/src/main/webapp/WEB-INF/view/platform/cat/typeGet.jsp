<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/include/get.jsp"%>
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
						<a class="btn btn-primary fa fa-back" href="${returnUrl}"><span>返回</span></a>
					</div>
				</div>
				<div class="panel-form">
					<table class="table-form" cellspacing="0">
						<tr>
							<th><span>分类组键:</span></th>
							<td>${type.categoryKey}</td>
						</tr>
						<tr>
							<th><span>分类名称:</span></th>
							<td>${type.name}</td>
						</tr>
						<tr>
							<th><span>节点的分类Key(在本分类树中唯一):</span></th>
							<td>${type.typeKey}</td>
						</tr>
						<tr>
							<th><span>flat 平行；tree 树形:</span></th>
							<td>${type.struType}</td>
						</tr>
						<tr>
							<th><span>父节点:</span></th>
							<td>${type.parentId}</td>
						</tr>
						<tr>
							<th><span>层次:</span></th>
							<td>${type.depth}</td>
						</tr>
						<tr>
							<th><span>路径:</span></th>
							<td>${type.path}</td>
						</tr>
						<tr>
							<th><span>是否叶子节点。Y=是；N=否:</span></th>
							<td>${type.isLeaf}</td>
						</tr>
						<tr>
							<th><span>所属人ID (如果为0表示这个分类为公共分类,有用户id 表示为私有分类):</span></th>
							<td>${type.ownerId}</td>
						</tr>
						<tr>
							<th><span>序号:</span></th>
							<td>${type.sn}</td>
						</tr>
						<tr>
							<th><span>创建人ID:</span></th>
							<td>${type.createBy}</td>
						</tr>
						<tr>
							<th><span>创建时间:</span></th>
							<td><fmt:formatDate value="${type.createTime}" /></td>
						</tr>
						<tr>
							<th><span>创建者所属组织ID:</span></th>
							<td>${type.createOrgId}</td>
						</tr>
						<tr>
							<th><span>更新人ID:</span></th>
							<td>${type.updateBy}</td>
						</tr>
						<tr>
							<th><span>更新时间:</span></th>
							<td><fmt:formatDate value="${type.updateTime}" /></td>
						</tr>
					</table>
				</div>
			</c:otherwise>
		</c:choose>
	</div>
</body>
</html>