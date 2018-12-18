
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficePlugin.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/office/officeTemplateDialog.js"></script>
</head>
<body>
	<form id="office" enctype="multipart/form-data" style="width: 100%;height: 100%;">
		<div id="divContainer"  style="width: 100%;height: 100%;"></div>
	</form>
	<script type="text/javascript">
		$(function() {
			var params;
			if(frameElement){
				params =frameElement.params;
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
			
			office = new Office(params);
			office.init();
		});
		
		(function(){
			Office = function(options) {
				// 定义属性
				this.options = $.extend({}, options);
			};
			
			/**
			 * 方法
			 */
			Office.prototype = {
				/**
				 * 初始化
				 */
				init : function() {
					if (this.hasInit) // 是否已初始化
						return false;
					this.hasInit = true;

					this.options.controlMode = "div";
					this.options.controlId = "divContainer";
	
					var obj = new OfficeControl(this.options);
					obj.init();
				}
			};
		})();
	</script>
</body>
</html>