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
	<f:link href="ztree/ztree.css"  isCommon="false" />
	<f:link href="qtip/jquery.qtip.css"/>
	<f:link href="cityPicker/city-picker.css"/>
	<f:link href="jquery/magnific-popup.css"/>
	<f:link href="lc/form/formrenderer.css"  isCommon="false"/>
	
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
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/util.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.string.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/backbone/backbone.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/backbone/backbone-deep-model.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/rivets/rivets.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/rivets/purify.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/stickUp/stickUp.min.js"> </script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ConstUtil.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/form.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.form.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/DialogUtil.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/DataTemplateUtil.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/rivets/rivetsBind.js"></script>
	<%@include file="/commons/page/datetimepicker.jsp" %>
	<%@include file="/commons/page/ueditor.jsp" %>
	<f:link href="select2/select2.min.css"/>
	<f:link href="select2/select2-bootstrap.min.css" />
	<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
	<script type="text/javascript"  src="${ctx}/js/lang/select2/zh_CN.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/UploadDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
	 <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PositionDialog.js"></script>
	 <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ConstUtil.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/qtip/jquery.qtip.js" ></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/CustomDialogUtil.js"></script>
	 <script type="text/javascript" src="${ctx}/js/plugins/cityPicker/city-picker-custom.data.js"></script>
	 <script type="text/javascript" src="${ctx}/js/plugins/cityPicker/city-picker-custom.js"></script>
 	<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.min.js"></script>
 	<!--[if lt IE 9]>
	<script type="text/javascript" src="${ctx}/js/plugins/jSignature/flashcanvas.min.js"></script>
	<![endif]-->
 	<script type="text/javascript" src="${ctx}/js/plugins/jSignature/jSignature.min.js"></script>
 	
	<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.magnific-popup.min.js"></script>
 	
 	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/MimeType.js"></script>
 	<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficePlugin.js"></script>
 	<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
	
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/FormulaUtil.js"></script>
	<script type="text/javascript" src="${ctx }/js/lc/platform/form/formoptions.js"></script>
	<script type="text/javascript" src="${ctx }/js/lc/platform/form/JForm.js"></script>
	<script type="text/javascript" src="${ctx }/js/lc/platform/form/formrendererUtil.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formrenderer.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/json/json2.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
<!--[if lte IE 8]>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/html5shiv.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/ieonly/respond.min.js"></script>
<![endif]-->
	