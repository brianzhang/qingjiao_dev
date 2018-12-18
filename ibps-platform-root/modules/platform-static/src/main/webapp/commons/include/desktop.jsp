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
<f:link href="bootstrap/bootstrap.min.css"/>
<f:link href="font-awesome/font-awesome.min.css" />
<f:link href="fullcalendar/fullcalendar.min.css"/>
<f:link href="slider-layer-slider/layerslider.css"/>
<f:link href="slider-layer-slider/style-layer-slider.css"/>
<f:link href="lc/desktop/desktop.css"  isCommon="false"/>
  
<!-- js -->
<script type="text/javascript" src="${ctx}/js/dynamic.jsp"></script>
<script type="text/javascript" src="${ctx}/js/plugins/moment/moment.min.js"></script>
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
<script type="text/javascript" src="${ctx }/js/plugins/jquery/plugins/jquery.sparkline.min.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/jquery/plugins/jquery.easypiechart.min.js"></script>
<!--[if lte IE 8]>
<script type="text/javascript" src="${ctx}/js/plugins/fullcalendar/fullcalendar-2.9.1.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lang/fullcalendar/zh_CN-2.9.1.js"></script>
<![endif]-->
<!--[if gt IE 8]> 
<script type="text/javascript" src="${ctx}/js/plugins/fullcalendar/fullcalendar.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lang/fullcalendar/zh_CN.js"></script>
<![endif]-->
<!--[if !IE]> -->
<script type="text/javascript" src="${ctx}/js/plugins/fullcalendar/fullcalendar.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lang/fullcalendar/zh_CN.js"></script>
<!-- <![endif]-->
<script type="text/javascript" src="${ctx }/js/plugins/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/DialogUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.waypoints.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.counterup.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.slimscroll.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.blockUI.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.carouFredSel.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/echarts/echarts.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/echarts/skins/shine.js"></script>

<!--[if lte IE 8]>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/html5shiv.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/respond.min.js"></script>
<![endif]-->
<!-- BEGIN LayerSlider -->
<script src="${ctx}/js/plugins/slider-layer-slider/greensock.js" type="text/javascript"></script>
<script src="${ctx}/js/plugins/slider-layer-slider/layerslider.transitions.js" type="text/javascript"></script>
<script src="${ctx}/js/plugins/slider-layer-slider/layerslider.kreaturamedia.jquery.js" type="text/javascript"></script>
<!-- END LayerSlider -->

<script type="text/javascript" src="${ctx}/js/lc/platform/desktop/desktopPage.js"></script>
 	
	