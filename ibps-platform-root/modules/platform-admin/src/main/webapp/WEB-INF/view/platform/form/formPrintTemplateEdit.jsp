<%@page language="java" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>表单打印模版</title>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="f"   uri="http://www.bpmhome.cn/functions" %>
<%@taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<!-- 移动设备 viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
<!-- css -->
<f:link href="bootstrap/bootstrap.min.css" />
<f:link href="font-awesome/font-awesome.min.css" />

<!--[if lte IE 9]>
	<f:link href="style-ie.css" isCommon="false"/>
<![endif]-->
<f:link href="dropdown/dropdown.css" />
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
<f:link href="jquery/jquery.webui-popover.min.css"/>
<f:link href="handsontable/handsontable.min.css" />
<f:link href="lc/form/formPrintTemplate.css"  isCommon="false"/>
<script type="text/javascript" src="${ctx}/js/plugins/layer/laydialog.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/DialogUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/UploadDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/handsontable/handsontable.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.webui-popover.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.sortable.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/PrintTemplate.js"></script>

</head>
<script type="text/javascript">
$(function () {
	var id = $("#id").val(),
		 formKey = $("#formKey").val();
	if("" == id){
		var params ={};
		if(frameElement){
			params=  frameElement.dialog.params;
			formKey = params.formKey;
		}
	}
	
    new IBPS.PrintPane({
        renderEl: $('<div/>').appendTo($('.print-template')),
        formKey: formKey,
        printId: id,
        hasCoop:false,//是否流程
        fonts: {"SimSun":"宋体","KaiTi":"楷体","SimHei":"黑体"},
        callback:function(rtn){
        	if(frameElement){
        		frameElement.dialog.callback();
    		}else{
    			   if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {  
    			        window.location.href="about:blank";  
    			        window.close();  
    			    } else {  
    			        window.opener = null;  
    			        window.open("", "_self");  
    			        window.close();  
    			    }  
    		}
        }
    });
});

</script>
<body>
	<div class="print-template"></div>
		<input type="hidden" id="id"  value="${id}"/>
		<input type="hidden" id="formKey"  value="${formKey }"/>
</body>
</html>

