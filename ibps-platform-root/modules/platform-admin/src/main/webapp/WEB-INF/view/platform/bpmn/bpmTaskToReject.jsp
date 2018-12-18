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
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save">驳回</a>
				<a href="javascript:void(0);" onclick="DialogUtil.close(frameElement.dialog.index);" class="btn btn-default fa fa-close">取消</a>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="agreeForm"  action="complete.htm" method="post">
				<input type="hidden" name="taskId" value="${taskId}" /> 
				<input type="hidden" id="actionName" name="actionName" value="reject"/>
				<div class="form-group">
					<label class="col-sm-3 control-label">驳回方式:</label>
					<div class="col-sm-9">&nbsp;&nbsp;&nbsp;&nbsp;
						<label class="radio-inline"> 
						<input class="ibps" type="radio" name="rejectMode" value="reject" checked="checked"  /><span class="lbl">驳回到上一步</span>
						</label>&nbsp;&nbsp;&nbsp;&nbsp;
						<label class="radio-inline">
						<input class="ibps" type="radio" name="rejectMode" value="rejectDest" showDestination="true" /><span class="lbl">驳回指定节点</span>
						</label>
					</div>
				</div>
							
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
							
				<div class="form-group nodeChoice"  id="nodeChoice1"  style="display: none;">
					<label class="col-sm-3 control-label">驳回到节点(按流程图走):</label>
					<div class="col-sm-9">
						<select class="form-control" id='goMapUserNodeSelect'>
							<option value="">请选择...</option>
							<c:forEach var="bpmExec" items="${bpmExecGoMapUserNode}">
								<option value="${bpmExec.nodeId}">${bpmExec.name}</option>
							</c:forEach>
						</select>
					</div>
				</div>
							
				<div class="form-group nodeChoice" id="nodeChoice2"   style="display: none;">
					<label class="col-sm-3 control-label">驳回到节点(直来直往):</label>
					<div class="col-sm-9">
						<select class="form-control" id="userNodeSelect">
							<option value="">请选择...</option>
							<c:forEach var="bpmExec" items="${bpmExecUserNode}">
								<option value="${bpmExec.nodeId}">${bpmExec.name}</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">意见:</label>
					<div class="col-sm-9">
						<a href="javascript:void(0)" class="btn btn-info fa fa-commonStatment">常用语</a> 
						<textarea name="opinion" cols="60" rows="5" class="form-control" validate="{required:true}">${defaultCommonStatment.value }</textarea>
						<input id='destination' name='destination' type="hidden" />
					</div>
				</div>
			</form>
		</div>
	</div>
	
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/StatmentDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskToReject.js"></script>
</body>
</html>