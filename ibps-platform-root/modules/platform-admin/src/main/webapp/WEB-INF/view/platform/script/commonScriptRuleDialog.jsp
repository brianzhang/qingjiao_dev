<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
<title>构造脚本</title>
  	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<%@include file="/commons/include/get.jsp" %>
	<%@include file="/commons/page/tree.jsp" %>
	<f:link href="codemirror/lib/codemirror.css" />
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/groovy/groovy.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/script/commonScriptRuleDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>
</head>
	<body >
		<table class="table table-bordered"  id="scriptRuletable">
			<tr>
				<th width="20%"><span>表单变量</span> </th>
				<td>
					<a class="btn btn-primary btn-xs" onclick="scriptRule._selectScript()">常用脚本</a>
					<a class="btn btn-primary btn-xs" onclick="scriptRule._selectConditionScript()">条件脚本</a>
					<a id="varTree" class="btn btn-primary btn-xs">表单变量</a>
				</td>
			</tr>
			<tr>
				<th width="20%"><span>脚本:</span></th>
				<td> 
					<textarea class="form-control" id="script" name="script" style="width: 100%; height: 200px;"></textarea>
				</td>
			</tr>
			<tr>
				<th width="20%"><span>描述</span> </th>
				<td>
					<input  class="form-control"  style="width: 260px" id="conDesc" value="脚本">
				</td>
			</tr>
		</table> 
</body>
</html>


