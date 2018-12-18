<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>撤销任务</title>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/StatmentDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskRevoke.js"></script>
</head>
<body>
	<div class="wrapper wrapper-content col-sm-12">
		<div class="panel-toolbar">
			<div class="buttons" style="margin-left: 1em;">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save">撤销</a>
				<a href="javascript:void(0);" onclick="DialogUtil.close(frameElement.dialog.index);" class="btn btn-default fa fa-close">取消</a>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="agreeForm"  action="${ctx}/platform/bpmn/bpmTask/complete.htm" method="post">
				<input type="hidden" id="taskId" name="taskId"/> 
				<input type="hidden" id="actionName" name="actionName" value="revoke"/>

				<div class="form-group">
					<label class="col-sm-3 control-label">原因:</label>
					<div class="col-sm-9">
						<a href="javascript:void(0)" class="btn btn-info fa fa-commonStatment">常用语</a> 
						<textarea name="opinion" cols="60" rows="5" class="form-control doRevoke" validate="{required:true}">${defaultCommonStatment.value }</textarea>
						<input id='destination' name='destination' type="hidden" />
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>