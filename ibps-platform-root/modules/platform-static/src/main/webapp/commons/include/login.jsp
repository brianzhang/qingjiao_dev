<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="f"   uri="http://www.bpmhome.cn/functions" %>
<%@taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<meta name="renderer" content="webkit">
<!-- 移动设备 viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<!-- icon -->
<link rel="icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
<!-- css -->
<f:link href="bootstrap/bootstrap.min.css" ></f:link>
<f:link href="font-awesome/font-awesome.min.css" ></f:link>
<f:link href="animate/animate.css" ></f:link>
<!-- js -->
<!--[if !IE]> -->
<script type="text/javascript">
	window.jQuery || document.write("<script src='${ctx}/js/plugins/jquery/jquery.min.js'>"+"<"+"/script>");
</script>
<!-- <![endif]-->
<!--[if IE]>
<script type="text/javascript">
	 window.jQuery || document.write("<script src='${ctx}/js/plugins/jquery/jquery1x.min.js'>"+"<"+"/script>");
</script>
<![endif]-->
<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.backstretch.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/DialogUtil.js"></script>
<!--[if lte IE 8]>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/html5shiv.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/respond.min.js"></script>
<![endif]-->
