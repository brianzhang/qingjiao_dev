<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>驳回任务</title>
<%@include file="/commons/include/get.jsp"%>
</head>
<body>
	<div class="wrapper wrapper-content col-sm-12">
		<div class="panel-toolbar">
			<div class="buttons" style="margin-left: 1em;">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save">驳回发起人</a>
				<a href="javascript:void(0);" onclick="DialogUtil.close(frameElement.dialog.index);" class="btn btn-default fa fa-close">取消</a>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="agreeForm"  action="complete.htm" method="post">
				<input type="hidden" name="taskId" value="${taskId}" /> 
				<input type="hidden" id="actionName" name="actionName" value="rejectToStart"/>
				<div class="form-group">
					<label class="col-sm-3 control-label">返回方式:</label>
					<div class="col-sm-9">&nbsp;&nbsp;&nbsp;&nbsp;
						<label class="radio-inline"> 
							<input class="ibps" type="radio" name="backHandMode" value="direct" checked="checked" /><span class="lbl">回到本节点</span>
						</label>&nbsp;&nbsp;&nbsp;&nbsp; 
						<label class="radio-inline"> 
							<input class="ibps" type="radio" name="backHandMode" value="normal" /><span class="lbl">按流程图执行</span>
						</label>
					</div>
				</div>
							
				<div class="form-group">
					<label class="col-sm-3 control-label">意见:</label>
					<div class="col-sm-9">
						<a href="javascript:void(0)" class="btn btn-info fa fa-commonStatment">常用语</a> 
						<textarea name="opinion" cols="60" rows="5" class="form-control rejectToStart" validate="{required:true}">${defaultCommonStatment.value }</textarea>
						<input id='destination' name='destination' type="hidden" />
					</div>
				</div>
			</form>
		</div>
	</div>
	
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/StatmentDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskToRejectToStart.js"></script>
</body>
</html>