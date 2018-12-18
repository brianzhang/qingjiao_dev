<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp"%>
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="chrome=1">
		<meta http-equiv="Content-Type" content="text/html; charset = UTF-8" />
		<title>实训Home</title>
		<style>
			body {
				overflow: hidden;
				background-color: #ffffff;
				user-select: none;
				-webkit-user-select: none;
				-moz-user-select: none;
				-o-user-select: none;
				-ms-user-select: none;
			}
		</style>
</head>
<body>
	<div style="text-align:center;clear:both">
<script src="/gg_bd_ad_720x90.js" type="text/javascript"></script>
<script src="/follow.js" type="text/javascript"></script>
</div>
	<div id="canvas"></div>
	<script src="${ctx }/js/lc/gradp/course/index/protoclass.js"></script>
	<script src='${ctx }/js/lc/gradp/course/index/box2d.js'></script>
	<script src='${ctx }/js/lc/gradp/course/index/Main.js'></script>
</body>
</html>