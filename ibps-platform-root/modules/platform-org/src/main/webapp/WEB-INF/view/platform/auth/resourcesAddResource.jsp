<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/addResources.js"></script>
	</head>
	<body class="gray-bg">
		<div class="ui-layout-west">
				<div class="layout-header ">
        				<h5>添加菜单</h5>
        				<div class="layout-tools">
        					<a herf="javascript:void(0);" class="pinBtn"><i class="fa fa-angle-double-left"></i></a>
                      </div>
         		</div>
				<select id="subSystem"  class="form-control">  
		              <c:forEach var="subSystemItem" items="${subSystemList}">  
		         			<option value="${subSystemItem.id}"  <c:if test="${subSystemItem.id== curSubsysId}">selected="selected"</c:if> >${subSystemItem.name}</option>  
		        	  </c:forEach>
		        </select>
				<div class="tree-toolbar" >
					<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
					<a class="btn btn-primary fa fa-expand" title="展开"></a> 
					<a class="btn btn-primary fa fa-compress" title="收缩"></a>
				</div>
				<div id="resourcesTree" class="ztree" ></div>	
		</div>
		<div class="ui-layout-center"> 
			 <div class="treeFrame">
					  <input type="hidden" id="menuUrl" value="${menuUrl }">
					  <iframe id="listFrame" src="addEdit.htm?menuUrl=${menuUrl }"  frameborder="no" width="100%" height="100%"></iframe>
				</div>
		</div>
	</body>
</html>