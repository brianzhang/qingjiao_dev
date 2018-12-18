<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateBatchModify.js"></script>
		
		
	</head>
	<body>
		<div class="wrapper wrapper-content col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal" id="queryForm"    >
						<div class="form-group">
							<label class="col-sm-3 control-label">需要修改的字段:</label>
							<div class="col-sm-9">
									<select id="batchEditFld"  class="form-control">
										<option>-请选择-</option>
									</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">将字段值修改为:</label>
							<div class="col-sm-9">
									<div id="batchEditVal"></div>
							</div>
						</div>
					</form>
			</div>
		</div>
	</body>
</html>