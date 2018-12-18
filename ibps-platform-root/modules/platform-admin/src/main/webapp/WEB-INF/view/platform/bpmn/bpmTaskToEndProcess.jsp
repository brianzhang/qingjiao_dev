<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>终止流程</title>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/StatmentDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskToEndProcess.js"></script>
</head>
<body>
	<div>
		<div class="panel-toolbar col-md-12">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save">确定</a>
				<a href="javascript:void(0);" onclick="javascript:DialogUtil.close(frameElement.dialog.index);" class="btn btn-default fa fa-close">取消</a>
			</div>
		</div>
		
		<form id="agreeForm" action="doEndProcess.htm" method="post">
			<input type="hidden" name="taskId" value="${taskId}">
			
			<div class="col-sm-8">
				<div class="form-horizontal"  >
					<!-- <div class="form-group">
						<label class="col-sm-3 control-label">
							<abbr ht-tip title="提醒消息将会发送给发起人及所有已审批过的执行人.">提醒消息:</abbr>
						</label>
						<div class="col-sm-9">&nbsp;&nbsp;&nbsp;&nbsp;
							<label class="checkbox-inline">
							  <input class="ibps" type="checkbox" name="messageType" value=inner><span class="lbl">内部消息</span>
							</label>
							<label class="checkbox-inline">
							  <input class="ibps" type="checkbox" name="messageType" value="mail"><span class="lbl">邮件</span>
							</label>
							<label class="checkbox-inline">
							  <input class="ibps" type="checkbox" name="messageType" value="sms"><span class="lbl">短信</span>
							</label>
						</div>
					</div> -->
					
					<div class="form-group">
						<label class="col-sm-3 control-label">终止原因:</label>
						<div class="col-sm-9">
							<a href="javascript:void(0)" class="btn btn-info fa fa-commonStatment">常用语</a> 
							<textarea name="endReason" cols="60" rows="5" class="form-control" validate="{required:true}">${defaultCommonStatment.value }</textarea>
						</div>
					</div>

				</div>
			</div>
		</form>
	</div>
</body>
</html>