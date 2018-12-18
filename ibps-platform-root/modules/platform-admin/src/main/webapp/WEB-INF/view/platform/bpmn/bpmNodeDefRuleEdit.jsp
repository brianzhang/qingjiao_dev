<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.lc.ibps.bpmn.api.constant.NodeType"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/ScriptSelector.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/ConditionScript.js"></script>
		
		<link  rel="stylesheet" type="text/css" href="${ctx}/styles/default/css/ztree/ztree.css"></link>
		<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.min.js"></script>
		
		<link rel="stylesheet" type="text/css" href="${ctx}/js/plugins/codemirror/mode/javacode/javacode.css"></link>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/javacode/codemirror.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/javacode/InitMirror.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDefRuleEdit.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated  col-sm-12">
				<div class="panel-form">
				<form class="form-horizontal" id="ruleFrom" method="post"  >
					<div class="form-group">
						<label class="col-sm-3 control-label">规则名称：<span class="required">*</span></label>
						<div class="col-sm-9">
							<input type="text" id="ruleName" name="ruleName" size="40"  class="form-control" validate="{required:true,maxlength:120}"/>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-3 control-label">跳转节点名称：<span class="required">*</span></label>
						<div class="col-sm-9 m-t-xs">
							<select name="targetNode" id="targetNode" validate="{required:true,maxlength:120}" class="form-control">
								<option value="">请选择</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"  style="margin-top:1em;">规则表达式：<span class="required">*</span></label>
						<div class="col-sm-9">
							<a class="btn btn-primary btn-xs" onclick="bpmNodeDefRuleEdit.selectScript()">常用脚本</a>
							<a class="btn btn-primary btn-xs" onclick="bpmNodeDefRuleEdit.selectConditionScript()">条件脚本</a>
						    <a id="varTree" class="btn btn-primary btn-xs js-form-var">表单变量</a>
						    <div class="scriptArea m-t-xs">
							<textarea id="conditionCode" name="conditionCode" codemirror="true" validate="{required:true}">return true;</textarea>
							</div>
							<div style="margin:8px 0;">这个脚本需要使用返回语句(return)返回布尔值，返回true流程将跳转到指定的节点。</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</body>
</html>