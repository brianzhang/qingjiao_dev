<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="f"   uri="http://www.bpmhome.cn/functions" %>
<%@taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
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
<f:link href="jqgrid/ui.jqgrid.css" />

<f:link href="lc/commons/rowOps.css"   isCommon="false"/>
<f:link href="style.css"  isCommon="false"/>
<!--[if lte IE 9]>
	<f:link href="style-ie.css" isCommon="false"/>
<![endif]-->
<!-- js -->
<script type="text/javascript" src="${ctx}/js/dynamic.jsp"></script>
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
<!--[if lte IE 8]>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/html5shiv.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.cookie.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/moment/moment.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lang/jqgrid/zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jqgrid/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-contextmenu.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/valid.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/json/json2.min.js" ></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/DialogUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ConstUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/form.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/rowOps.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/jqgridExt.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/gridList.js"></script>
<%@include file="/commons/page/datetimepicker.jsp" %>



