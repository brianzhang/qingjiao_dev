<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
	<f:link href="codemirror/lib/codemirror.css" />
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/groovy/groovy.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/system/sysUrlPerm/sysUrlPermission.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/system/sysUrlPerm/sysUrlPermissionEdit.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/system/sysUrlPerm/sysUrlRuleEdit.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>保存</span></a>
				<a href="list.htm" class="btn btn-primary fa fa-back"><span>返回</span></a>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="sysUrlPermissionForm"
				action="save.htm" method="post">
				<div class="form-group">
					<label class="col-sm-2 control-label">描述<span
						class="required">*</span>:
					</label>
					<div class="col-sm-10">
						<input type="text" class="inputText" id="descp" name="descp"
							value="${urlPermission.descp}" validate="{required:true}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">拦截地址<span
						class="required">*</span>:
					</label>
					<div class="col-sm-10">
						<input type="text" id="url" name="url"
							value="${urlPermission.url}" style="width: 500px !important"
							class="inputText" validate="{required:true,maxlength:765}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">拦截参数<span
						class="required">*</span>:
					</label>
					<div class="col-sm-10">
						<input type="text" class="inputText" id="params" name="params"
							value="${urlPermission.params}" validate="{required:true}" />
						<a href="#" style="text-decoration: none;"
							title="参数与参数之间以','分割,eg:usrId,name"
							class="fa fa-exclamation-circle" ht-tip> </a>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">是否启用:</label>
					<div class="col-sm-10">
						<!-- 						<input type="text" class="form-control" id="enable" name="enable" -->
						<%-- 							value="${sysUrlPermission.enable}" validate="{required:true}" /> --%>
						<select name="enable" class="inputText input-wh-1">
							<option value="0"
								<c:if test="${urlPermission.enable ==0}"> selected="selected"</c:if>>禁用</option>
							<option value="1"
								<c:if test="${urlPermission.enable ==1}"> selected="selected"</c:if>>启用</option>
						</select>
					</div>
				</div>
				<input type="hidden" name="id"  id="id" value="${urlPermission.id}" />
			</form>
		</div>

		<div class="panel-detail">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a id="addSysUrlRule" href="javascript:void(0);" class="btn btn-primary fa-add"><span>添加</span></a>
				</div>
			</div>
			<div class="panel-detail">
			<table class="ui-jqgrid-htable ui-common-table table table-bordered">
				<thead>
					<tr class="ui-jqgrid-labels">
						<th><span>脚本名称</span></th>
						<th><span>是否启用</span></th>
						<th><span>优先级</span></th>
						<th><span>管理</span></th>
					</tr>
					<c:forEach items="${urlRules}" var="rule" varStatus="_status">
						<tr>
							<td width="40%">${rule.script}<input type="hidden" value="${rule.id}" /></td>
							<td width="20%">
								<c:if test="${rule.enable == '0'}">禁用</c:if>
							
								<c:if test="${rule.enable == '1'}">启用</c:if>
								</td>
							<td width="25%">${rule.sort}</td>
							<td width="15%"><a href="#" class="btn btn-default fa-edit"><span>编辑</span></a>
								<a href="#" class="btn btn-default fa-remove"><span>删除</span></a>
							</td>
						</tr>
					</c:forEach>
				</thead>
			</table>
			</div>
		</div>
	</div>
</body>
</html>