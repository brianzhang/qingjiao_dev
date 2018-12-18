<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/msg/innerMessageReply.js"></script>
		<title>消息回复管理列表</title>
	</head>
	
	<body>
		
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<input type="hidden" id="msgId" name="msgId" value="${param.msgId}"/> 
					</div>
			</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="innerMessageReplyGrid" ></table>
					<div id="innerMessageReplyPager"></div>
				</div>
		</div>
	
	</body>
	
</html>