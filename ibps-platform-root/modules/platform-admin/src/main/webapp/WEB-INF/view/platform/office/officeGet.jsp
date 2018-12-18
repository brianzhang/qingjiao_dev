
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficePlugin.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/office/officeTemplateDialog.js"></script>
	<script type="text/javascript">
		$(function(){
			var params;
			if(frameElement){
				params =frameElement.dialog.params;
			}

			var _params = {
					controlId : 'divContainer',
					fileId 	: '',
					rights 	: 'r',
					btns	: [],
					fileURL : '',
					saveURL : ''
				};
			
			if($.isNotEmpty(params)){
				params = $.extend({}, _params, params);
			}
			
			var obj = new OfficeControl(params);
			obj.init();
		});
	</script>
</head>
<body>
	<form id="office" enctype="multipart/form-data" style="width: 100%;height: 100%;">
		<div id="divContainer"  style="width: 100%;height: 100%;"></div>
	</form>
</body>
</html>