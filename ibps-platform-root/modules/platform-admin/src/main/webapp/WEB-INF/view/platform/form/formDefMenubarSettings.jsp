<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
		<%@include file="/commons/include/get.jsp"%>
		<f:link href="ztree/ztree.css" isCommon="false"></f:link>
		<script type="text/javascript" src="${ctx}/js/plugins/nicescroll/nicescroll.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/contextMenu.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefMenubarSetting.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content col-sm-12">
            <div class="section">
                <div id="menu" class="">
                    <div class="tree-toolbar">
						<a class="btn btn-primary fa fa-refresh" title="刷新"></a>
						<a class="btn btn-primary fa fa-expand" title="展开"></a>
						<a class="btn btn-primary fa fa-compress" title="收缩"></a>
					</div>
					<div id="menuTree" class="ztree"></div>
                </div>
            </div>
		</div>
	</body>
</html>