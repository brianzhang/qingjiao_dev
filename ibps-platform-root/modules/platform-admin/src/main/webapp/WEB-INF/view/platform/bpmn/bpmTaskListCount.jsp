<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskListCou.js"></script>
		<title>流程任务管理列表</title>
		
	</head>
	<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
					<a href="cou.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
			</div>
		</div>
		<div class="jqGrid_wrapper">
					<table id="urlZhiYuanGrid" ></table>
					<div id="urlZhiYuanPager"></div>
				</div>
	</div>
	 <input type="hidden" id="type" value="${type}"/>
	  <input type="hidden" id="proname" value="${proname}"/>
	</body>
<!-- 	<script type="text/javascript">
		var type =${type};
		alert(type);
	</script>
 -->
</html>

