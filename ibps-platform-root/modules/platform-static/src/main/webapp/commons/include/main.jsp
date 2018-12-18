<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="f"   uri="http://www.bpmhome.cn/functions" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!-- icon -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<meta name="renderer" content="webkit">
<!-- 移动设备 viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
<!-- css -->
<f:link href="bootstrap/bootstrap.min.css" />
<f:link href="font-awesome/font-awesome.min.css" />
<f:link href="animate/animate.css" />
<f:link href="openSans.css" />
<f:link href="layui/css/layui.css" />
<%-- <f:link href="dropdown/dropdown.css" /> --%>
<f:link href="toastr/toastr.min.css" />
<f:link href="qtip/jquery.qtip.css"/>

<!-- js -->
<script type="text/javascript" src="${ctx}/js/dynamic.jsp"></script>
<script type="text/javascript" src="${ctx}/js/dynamicExt.jsp"></script>
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
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/qtip/jquery.qtip.js" ></script>
 <script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.cookie.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap.min.js "></script>
<script type="text/javascript" src="${ctx}/js/plugins/nicescroll/nicescroll.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-contextmenu.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script> 

<script type="text/javascript" src="${ctx}/js/plugins/toastr/toastr.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/DialogUtil.js"></script>

<!--[if lte IE 8]>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/html5shiv.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/respond.min.js"></script>
<![endif]-->

<!-- LayIM引入-->
<%@include file="/commons/page/layim.jsp" %>
