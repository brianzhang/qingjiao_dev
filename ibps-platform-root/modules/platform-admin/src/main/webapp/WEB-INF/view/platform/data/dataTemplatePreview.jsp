<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
			<%@include file="/commons/page/customform.jsp"%>
			<%@include file="/commons/page/layout.jsp"%>
			<%@include file="/commons/page/grid.jsp"%>
			<f:link href="jqgrid/ui.jqgrid.css" />
			<f:link href="lc/commons/rowOps.css"   isCommon="false"/>
			<f:link href="style.css"  isCommon="false"/>
			<script type="text/javascript" src="${ctx}/js/lc/commons/control/DictionaryControl.js"></script>
			<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.cookie.min.js"></script>
			<script type="text/javascript"src="${ctx}/js/lc/commons/plugins/contextMenu.js"></script>
			<script type="text/javascript" src="${ctx}/js/lc/platform/data/JTemplate.js"></script>
			<script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
			
			<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/dataTemplaterenderer.js"></script>
			<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/i18n/zh_CN.js"></script>
			
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/list.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/tree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/queryField.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/searchLabel.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/selectedContainer.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/toolbarButton.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/toolbarPanel.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/valueSource.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/contextmenu.js"></script>
		

		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/address.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/datePicker.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/dateRange.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/dictionary.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/select.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/checkbox.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/selector.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/customDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/text.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/templates/list.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/templates/tree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/templates/treeList.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/templates/listTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/templates/valueSource.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/templates/models.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/templates/views.js"></script>
			
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/buttons/models.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/buttons/views.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/buttons/actions.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/querys/models.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/querys/views.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplatePreview.js"></script
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  col-sm-12">
				<div  data-template-renderer></div>
		</div>
			<input type="hidden" id="id"  value="${id }"/>
			<input type="hidden" id="pk"  value="${pk }"/>
			<textarea id="data" name="" rows="0" cols="0" style="display: none;">${data}</textarea>
	<!-- 导出表单 -->
		<form id="exportForm" name="exportForm" method="post" target="download" action="${ctx}/platform/data/dataTemplate/exportData.htm" style="display: none;"></form>  
		<iframe id="download" name="download" height="0px" width="0px" style="display: none;"></iframe>  	 
	</body>
</html>