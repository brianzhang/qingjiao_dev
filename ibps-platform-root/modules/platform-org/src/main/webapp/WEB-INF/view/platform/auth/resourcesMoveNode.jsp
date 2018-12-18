<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/resources.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<form class="form-horizontal" id="moveForm"  action="move.htm"   method="post"  >
				<select id="subSystem" name="subSystemId" class="form-control">  
	              <c:forEach var="subSystemItem" items="${subSystemList}">  
	         		<option value="${subSystemItem.id}"  <c:if test="${subSystemItem.id== curSubsysId}">selected="selected"</c:if> >${subSystemItem.name}</option>  
	        	  </c:forEach>
		        </select>
				<input id="id" name="id" type="hidden" value="${id}"/>
				<input id="destinationId" name="destinationId" type="hidden" value=""/>
			</form>
			<div id="resourcesMoveTree" class="ztree"></div>
		</div>
	</body>
</html>