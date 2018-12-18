<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<head>
<title>忘记密码 轻教平台</title>
<%@include file="/commons/include/login.jsp"%>
</head>
<%
	String un = request.getParameter("username");
	String acsstk = request.getParameter("accessToken");
	if (un != null) {
		response.sendRedirect("/getBack.htm?username=" + request.getParameter("username") + "&email="
				+ request.getParameter("email") + "&validCode=" + request.getParameter("validCode"));
	}
	
	else if(acsstk != null){
		response.sendRedirect("/reset.htm?token="+acsstk);
	}
%>