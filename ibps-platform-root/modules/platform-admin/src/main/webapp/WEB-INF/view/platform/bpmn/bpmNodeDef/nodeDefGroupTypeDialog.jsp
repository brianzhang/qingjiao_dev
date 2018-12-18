<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/commons/include/get.jsp" %>
  
<title>用户组属性选择</title>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/groupTypeDialog.js"></script>
</head>
<body >
	<form id="groupPropForm" >
			<table class="table table-bordered"   cellspacing="1">
				<tr class="radiorow">
					<th style="width:20%">
						<label for="startMan">组类型</label>
					</th> 
					<td>
					<select name="dimensionKey" id ="dimensionKey" class="form-control">
						<c:forEach items="${dimensionList}" var="dimension" >
							<option value="${dimension.key}">${dimension.name}</option>
						</c:forEach>
					</select>
					</td>
				</tr>
			</table>
			</form>
</body>
</html>


