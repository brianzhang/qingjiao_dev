<%@page import="com.hotent.sys.util.RequestUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<% String taskTurnId = RequestUtil.getString(request, "taskTurnId"); %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
	</head>
	<body>
		<div data-options="region:'center',border:false" style="text-align:center;" >
				<div id="tb" style="padding:8px;height:auto;">
				</div>
				<table id="userGridList" 
					 url="${ctx}/platform/office/bpmReceivedProcess/taskTurnAssigns.ht?taskTurnId=<%=taskTurnId%>">
				    <thead>
					    <tr>
					    	<th field="fromUser"  title="转交人" ></th>
							<th field="receiver"  title="接收人" ></th> 
							<th field="createTime" formatter="ht" title="转办时间" dateFormat="YYYY-MM-DD"></th>
							<th field="comment"  title="备注" ></th>
					    </tr>
				    </thead>
			    </table>
		</div>
	</body>
</html>