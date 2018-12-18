<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<f:link href="codemirror/lib/codemirror.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/groovy/groovy.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/script/commonScriptDialog.js"></script>
	</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="row" style="margin: 1px;">
			<div class="col-sm-8">
				<div class="ibox float-e-margins" style="padding: 0 1px;border: 1px solid #CCC;height: 250px;">
					<div class="ibox-title" style="border-bottom: 1px solid #CCC;">
						<h5>脚本</h5>
					</div>
					<div class="ibox-content">
						<div id="scriptTree" class="ztree" style="height: 220px; overflow-y: hidden;"></div>
					</div>
				</div>
			</div>
			<div class="col-sm-4">
				<div class="ibox float-e-margins" style="padding: 0 1px;border: 1px solid #CCC;height: 250px;">
					<div class="ibox-title" style="border-bottom: 1px solid #CCC;">
						<h5>表达式运算符</h5>
					</div>
					<div class="ibox-content">
						<div id="tools_comment" class="icons-box">
							<!-- <div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="+" class="btn btn-outline btn-default calTool" title="加">+</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="-" class="btn btn-outline btn-default calTool" title="减">-</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="*" class="btn btn-outline btn-default calTool" title="乘">×</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="/" class="btn btn-outline btn-default calTool" title="除">÷</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="(" class="btn btn-outline btn-default calTool" title="左括号">(</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value=")" class="btn btn-outline btn-default calTool" title="右括号">)</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="&gt;" class="btn btn-outline btn-default calTool" title="大于">&gt;</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="&lt;" class="btn btn-outline btn-default calTool" title="小于">&lt;</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="=" class="btn btn-outline btn-default calTool" title="等于">=</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="!=" class="btn btn-outline btn-default calTool" title="不等于">!=</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="&&" class="btn btn-outline btn-default calTool" title="并">and</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="||" class="btn btn-outline btn-default calTool" title="或">or</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="not" class="btn btn-outline btn-default calTool" title="不是">not</a>
							</div>
							<div class="infont col-md-3 col-sm-4">
								<a href="javascript:void(0);" value="like" class="btn btn-outline btn-default calTool" title="类似">like</a>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row" style="margin: 1px;">
			<div class="col-sm-12">
				<div class="ibox float-e-margins" style="padding: 0 1px;border: 1px solid #CCC;">
					<div class="ibox-title" style="border-bottom: 1px solid #CCC;">
						<h5>规则表达式</h5>
					</div>
					<div class="ibox-content">
						<textarea class="form-control" id="script" name="script"
							style="width: 100%; height: 140px;"></textarea>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>