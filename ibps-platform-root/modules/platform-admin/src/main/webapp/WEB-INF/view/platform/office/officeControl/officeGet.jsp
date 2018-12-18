<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
	<script type="text/javascript">
			$(function(){
				var params; 
				if(frameElement)
					params =frameElement.dialog.params;
				var obj = new OfficeControl({
					controlId: 'divContainer',
					fileId:params?params.fileId:'',
					rights : params?params.rights:''
				});
				obj.init();
				officeObjArr = new Array();
				officeObjArr["divContainer"] = obj;
			
			});
			
	</script>
</head>
<body>
	
		<div id="divContainer"  style="width: 100%;height: 100%;"></div>
	
	
	 	<script language="JScript" for="office_divContainer" event="AfterOpenFromURL(doc, statusCode)">
	 		officeObjArr["divContainer"].afterOpenFile();
		</script> 
		<script language="JScript" for="office_divContainer" event="OnCustomMenuCmd2(menuPos,submenuPos,subsubmenuPos,menuCaption,menuID)">
			officeObjArr["divContainer"].customMenuDeal(menuCaption);
		</script>  
</body>
</html>