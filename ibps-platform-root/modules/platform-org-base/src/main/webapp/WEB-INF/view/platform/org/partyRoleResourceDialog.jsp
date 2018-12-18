<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<%@include file="/commons/page/tree.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyRoleResourceDialog.js"></script>
<script type="text/javascript">
var roleId = '${role.id}';
</script>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content col-sm-12">
				<select id="subSystem" class="form-control">
					<c:forEach var="subSystemItem" items="${subSystemList}">
						<option value="${subSystemItem.id}" 
							<c:if test="${systemId==subSystemItem.id}">selected="selected"</c:if>>${subSystemItem.name}</option>
					</c:forEach>
				</select>
				<div class="tree-toolbar">
					<a class="btn btn-primary fa fa-refresh" title="刷新"></a> <a
						class="btn btn-primary fa fa-expand" title="展开"></a> <a
						class="btn btn-primary fa fa-compress" title="收缩"></a>
				</div>
				<div id="resourcesTree" class="ztree"></div>
	</div>
</body>
</html>