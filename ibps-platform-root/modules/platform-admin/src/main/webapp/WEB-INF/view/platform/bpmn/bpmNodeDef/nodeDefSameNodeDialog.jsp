<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<%@include file="/commons/include/get.jsp" %>
  
	<title>相同节点执行人</title>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/sameNodeDialog.js"></script>
</head>
<body>
	<form id="sameNodeForm"  class="form-horizontal" >
		<div class="form-group">
             <label class="col-sm-2 control-label">节点选择：</label>
             <div class="col-sm-10">
                <select name="nodeId" id="nodeId" class="form-control">
                	<c:forEach var="node"  items="${nodeDefList}">
                		<c:if test="${node.nodeId!=nodeId}">
                			<option value="${node.nodeId}">${node.name}</option>
                		</c:if>
                	</c:forEach>
				</select>
             </div>
         </div>
	</form>
</body>
</html>
