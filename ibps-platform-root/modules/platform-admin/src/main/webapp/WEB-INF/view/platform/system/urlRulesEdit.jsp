<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
	<f:link href="codemirror/lib/codemirror.css" />
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/groovy/groovy.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/system/sysUrlPerm/sysUrlRuleEdit.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-form">
			<form class="form-horizontal" id="sysUrlRulesForm" action="save.htm"
				method="post">
				<div class="form-group">
					<label class="col-sm-2 control-label">拦截规则:</label>
					<div class="col-sm-10">
						<textarea class="form-control" id="script" name="script"
							style="width: 100%; height: 220px;">${fn:escapeXml(urlRules.script)}</textarea>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">是否禁用<span
						class="required">*</span>:
					</label>
					<div class="col-sm-10">
						<select name="enable"  id="enable" class="inputText input-wh-1">
							<option value="0"
								<c:if test="${urlRules.enable eq 0}"> selected="selected"</c:if>>否</option>
							<option value="1"
								<c:if test="${urlRules.enable eq 1}"> selected="selected"</c:if>>是</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">描述:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="descp" name="descp"
							value="${urlRules.descp}" validate="{required:false}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">序号:</label>
					<div class="col-sm-10">
						
							<input type="text" class="inputText"
							id="sort" name="sort"
							value="${urlRules.sort}"
							validate="{required:false,number:true,maxIntLen:10}" />
					</div>
				</div>
				<input type="hidden" name="id" id="id" value="${urlRules.id}" />
				<input type="hidden" name="sysUrlId" id="sysUrlId" value="${urlRules.sysUrlId}" />
			</form>
		</div>
	</div>
</body>
</html>