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
<f:link href="dropdown/dropdown.css" />
<f:link href="animate/animate.css" />
<f:link href="openSans.css" />
<f:link href="jqgrid/ui.jqgrid.css" />
<f:link href="jquery/magnific-popup.css"/>

<f:link href="lc/form/formrenderer.css"  isCommon="false"/>
<f:link href="lc/commons/rowOps.css"   isCommon="false"/>
<f:link href="style.css"  isCommon="false"/>
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
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/util.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.min.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.string.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/stickUp/stickUp.min.js"> </script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ConstUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/form.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.form.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.layout.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/DialogUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/UploadDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PositionDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/qtip/jquery.qtip.js" ></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/utils/CustomDialogUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/utils/DataTemplateUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/cityPicker/city-picker-custom.data.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/cityPicker/city-picker-custom.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/valid.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/CustomValid.js" ></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/CustomValidExt.js" ></script>
<script type="text/javascript" src="${ctx}/js/plugins/json/json2.min.js" ></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.magnific-popup.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/nicescroll/nicescroll.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/contextMenu.js"></script>

<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/rowOps.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/jqgridExt.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/gridList.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/select2Control.js"></script>
<%@include file="/commons/page/datetimepicker.jsp" %>
<%@include file="/commons/page/ueditor.jsp" %>
<%@include file="/commons/page/select2.jsp" %>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/EditorControl.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/SelectorControl.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/DictionaryControl.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/CustomDialogControl.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/AutoNumberControl.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/AddressControl.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficePlugin.js"></script>

<script type="text/javascript" src="${ctx}/js/lc/platform/utils/FormDataUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
