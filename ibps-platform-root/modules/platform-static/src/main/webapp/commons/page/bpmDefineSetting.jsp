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
	<f:link href="intro/introjs.min.css"  />
	<f:link href="style.css" isCommon="false"/>
	<!--[if lte IE 9]>
		<f:link href="style-ie.css" isCommon="false"/>
	<![endif]-->
	<f:link href="jquery/jquery.layout.css" />
	<f:link href="lc/bpmn/bpmDefineSetting.css"  isCommon="false"/>
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
	<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/util.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.string.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/backbone/backbone.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/backbone/backbone-deep-model.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/rivets/rivets.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/rivets/rivetsBind.js"></script>
	
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ConstUtil.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/form.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.form.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/DialogUtil.js"></script>
	<%@include file="/commons/page/datetimepicker.jsp" %>
	<%@include file="/commons/page/ueditor.jsp" %>
	<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.min.js"></script>

	<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.layout.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/nicescroll/nicescroll.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/qtip/jquery.qtip.js" ></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/qtip.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/intro/intro.min.js"></script>
	<f:link href="codemirror/lib/codemirror.css" />
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/groovy/groovy.js"></script>
	<!--[if lte IE 8]>
		<script type="text/javascript" src="${ctx}/js/plugins/ieonly/html5shiv.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/ieonly/respond.min.js"></script>
	<![endif]-->
	
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bo/BoDefDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/form/FormDefDialog.js"></script> 
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formRightsDialog.js"></script>
	
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/form/FormPrintTemplateDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
	
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/ScriptSelector.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/ConditionScript.js"></script>
	
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>

	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmDefinitionSetting.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmDefinitionBuilder.js"></script>
