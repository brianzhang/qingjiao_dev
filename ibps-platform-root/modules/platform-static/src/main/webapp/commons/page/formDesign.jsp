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
<f:link href="jquery/jquery.layout.css" />
<f:link href="qtip/jquery.qtip.css"/>
<f:link href="ztree/ztree.css"  isCommon="false" />
<f:link href="cityPicker/city-picker.css"/>
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
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/util.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.min.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.string.min.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/backbone/backbone.min.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/backbone/backbone-deep-model.min.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/rivets/rivets.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.layout.min.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/jqueryui/jquery-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/nicescroll/nicescroll.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/contextMenu.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/tooltipster/tooltipster.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/qtip/jquery.qtip.js" ></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/DialogUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/QtipUtil.js"></script>
<%@include file="/commons/page/datetimepicker.jsp" %>
<%@include file="/commons/page/ueditor.jsp" %>
<f:link href="select2/select2.min.css"/>
<f:link href="select2/select2-bootstrap.min.css" />
<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script type="text/javascript"  src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/cityPicker/city-picker-custom.data.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/cityPicker/city-picker-custom.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/rivets/rivetsBind.js"></script>

<script type="text/javascript" src="${ctx }/js/lc/platform/form/formoptions.js"></script>

