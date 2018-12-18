<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/script/scriptGet.js"></script>
</head>

<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-body">
			<div class="form-inline p-xxs">
				<div class="form-group">
					<label class="search-label">条件脚本</label>: <input type="text"
						name="Q^method_name_^SL" class="form-control" />
				</div>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="conditionScriptForm"
				action="save.htm" method="post">
				<input type="hidden" name="id" value="${conditionScript.id}" />
				<textarea class="hidden" name="argument">${conditionScript.argument}</textarea>
				<input type="hidden" id="methodName"
					value="${conditionScript.methodName}" />

				<div class="form-group">
					<div class="col-sm-12">
						<div id="paraInfo"></div>
					</div>
				</div>
			</form>
			<div style="display: none;">
				<div id="para-txt">
					<table class="table-detail para-info-table" cellpadding="0"
						cellspacing="0" border="0">
						<thead>
							<tr>
								<th width="10%" align="center">参数信息</th>
								<th width="25%" align="center">参数类型</th>
								<th width="25%" align="center">参数说明</th>
								<th width="35%" align="center">参数值</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><span name="paraName"></span></td>
								<td><span name="paraType"></span></td>
								<td><span name="paraDesc"></span></td>
								<td><input type="text" name="" class="inputText" /></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>