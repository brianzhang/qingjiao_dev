<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<title>任务办理</title>
<%@include file="/commons/include/get.jsp"%>

</head>
<body>
	<div class="wrapper wrapper-content col-sm-12">
		<form class="form-horizontal" id="agreeForm" action="completeBatch.htm" method="post">
			<div class="panel-toolbar">
				<div class="buttons" >
					<a href="javascript:void(0)" class="btn btn-primary fa fa-save">确定</a> 
					<a href="javascript:void(0)" onclick="javascript:DialogUtil.closeDialog();" class="btn btn-default fa fa-close">取消</a>
				</div>
			</div>
			<!-- 按钮组end -->
			
			<div id="opinionDiv" class="form-group">
				<label class="col-sm-2 control-label">
					<c:choose>
						<c:when test="${actionName eq 'agree'}">审批意见</c:when>
						<c:when test="${actionName eq 'oppose'}">反对意见</c:when>
						<c:when test="${actionName eq 'abandon'}">弃权原因</c:when>
						<c:when test="${actionName eq 'agreeTrans'}">审批意见</c:when>
						<c:when test="${actionName eq 'opposeTrans'}">反对意见</c:when>
					</c:choose>:
				</label>
				<br>
				<div class="col-sm-10">
					<a href="javascript:void(0)" class="btn btn-info fa fa-commonStatment">常用语</a> 
					<textarea id = "opinion" name="opinion" cols="60" rows="5"  class="form-control" >${defaultCommonStatment.value }</textarea>
				</div>
			</div>
			
			<input type="hidden" name="taskIds" value="${taskId}">
			<input type="hidden" name="actionName" value="${actionName}">
			<input type="hidden" id="nodeUsers" name="nodeUsers"/>
		</form>
	</div>
	<script type="text/javascript">
		var actionName="${actionName}";
		
	</script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/StatmentDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskToAgreeDialog.js"></script>
	
	
</body>
</html>