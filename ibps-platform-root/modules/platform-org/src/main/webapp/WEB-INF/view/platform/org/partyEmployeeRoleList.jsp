<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp" %>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/form.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyEmployeeRoleList.js"></script>
<script type="text/javascript">
var id = '${id}';
</script>
</head>
<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="jqGrid_wrapper">
			<table id="employeeRoleAssignGrid" ></table>
			<div id="employeeRoleAssignPager"></div>
		</div>
	</div>
</body>
</html>