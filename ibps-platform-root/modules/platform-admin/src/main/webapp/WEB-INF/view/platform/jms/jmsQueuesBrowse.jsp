<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/jms/jmsBrowse.js"></script>
		<title>jms消息列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-refresh" href="javascript:void(0);" onclick="window.location.reload(true);"><span>刷新</span></a>
							</div>
						</div>
					</div>
				</div><!--/ 操作、查询-->
				<input type="hidden"  id ="name" value="${param.name}"> 
				<div class="jqGrid_wrapper">
					<table id="jmsBrowseGrid" ></table>
					<div id="jmsBrowsePager"></div>
				</div>
		</div>
	
	</body>
	
</html>