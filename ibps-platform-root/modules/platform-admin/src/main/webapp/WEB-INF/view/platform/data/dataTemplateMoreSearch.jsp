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
			<script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
			
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/dataTemplaterenderer.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/queryField.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/partials/searchLabel.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/address.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/datePicker.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/dateRange.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/dictionary.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/select.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/selector.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/jst/querys/text.js"></script>
			
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/buttons/models.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/buttons/views.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/buttons/actions.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/querys/models.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/renderer/querys/views.js"></script>
		
		
			<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateMoreSearch.js"></script>
			
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content col-sm-12">
			<div class="form-inline p-sm">
				<form role="form" class="search-form" id="moreSearchForm"  >
					
				</form>
			</div>
		</div>
	</body>
</html>