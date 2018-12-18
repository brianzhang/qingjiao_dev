<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.lc.ibps.base.web.controller.*,com.lc.ibps.base.web.context.ContextUtil"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/grid.jsp"%>
	<%@include file="/commons/include/list.jsp" %>
	<script type="text/javascript" src="${ctx}/js/lc/platform/office/officeTemplateSelector.js"></script>
</head>
<body>
	<div class="panel">
		<div>
			<div name="template_container" class="selector-container">
			</div>
		</div>
		<div class="panel-body">
			<div class="wrapper wrapper-content animated fadeInRight">
				<div class="row">
					<table border="1" width="100%">
						<tr width="100%">
							<td valign="top">
								<div class="jqGrid_wrapper">
									<table id="officeTemplateGrid" ></table>
									<div id="officeTemplatePager"></div>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>