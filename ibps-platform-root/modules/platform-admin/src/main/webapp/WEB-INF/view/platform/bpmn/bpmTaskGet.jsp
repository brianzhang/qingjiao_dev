<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
						<label class="col-sm-2 control-label">任务名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.name}</p>
						</div>
						<label class="col-sm-2 control-label">待办事项标题:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.subject}</p>
						</div>
						<label class="col-sm-2 control-label">关联 - 流程实例ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.procInstId}</p>
						</div>
						<label class="col-sm-2 control-label">关联的任务ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.taskId}</p>
						</div>
						<label class="col-sm-2 control-label">关联 - 节点执行ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.execId}</p>
						</div>
						<label class="col-sm-2 control-label">关联 - 任务节点ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.nodeId}</p>
						</div>
						<label class="col-sm-2 control-label">关联 - 流程定义ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.procDefId}</p>
						</div>
						<label class="col-sm-2 control-label">关联 - 流程业务主键:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.procDefKey}</p>
						</div>
						<label class="col-sm-2 control-label">关联 - 流程名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.procDefName}</p>
						</div>
						<label class="col-sm-2 control-label">任务所属人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.ownerId}</p>
						</div>
						<label class="col-sm-2 control-label">任务执行人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.assigneeId}</p>
						</div>
						<label class="col-sm-2 control-label">任务状态:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.status}</p>
						</div>
						<label class="col-sm-2 control-label">任务优先级:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.priority}</p>
						</div>
						<label class="col-sm-2 control-label">任务创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${bpmTask.createTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">任务到期时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${bpmTask.dueTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">是否挂起(0正常,1挂起):</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.suspendState}</p>
						</div>
						<label class="col-sm-2 control-label">父任务ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.parentId}</p>
						</div>
						<label class="col-sm-2 control-label">BPMN流程实例ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.bpmnInstId}</p>
						</div>
						<label class="col-sm-2 control-label">BPMN流程定义ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.bpmnDefId}</p>
						</div>
						<label class="col-sm-2 control-label">分类ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.typeId}</p>
						</div>
						<label class="col-sm-2 control-label">是否锁定(0正常,1锁定):</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmTask.lockState}</p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>