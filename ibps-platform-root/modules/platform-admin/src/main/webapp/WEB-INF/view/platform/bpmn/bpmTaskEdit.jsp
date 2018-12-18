<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTask.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="bpmTaskForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${bpmTask.name}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">待办事项标题<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="subject" name="subject" value="${bpmTask.subject}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">关联 - 流程实例ID<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="procInstId" name="procInstId" value="${bpmTask.procInstId}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">关联的任务ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="taskId" name="taskId" value="${bpmTask.taskId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">关联 - 节点执行ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="execId" name="execId" value="${bpmTask.execId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">关联 - 任务节点ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="nodeId" name="nodeId" value="${bpmTask.nodeId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">关联 - 流程定义ID<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="procDefId" name="procDefId" value="${bpmTask.procDefId}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">关联 - 流程业务主键:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="procDefKey" name="procDefKey" value="${bpmTask.procDefKey}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">关联 - 流程名称:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="procDefName" name="procDefName" value="${bpmTask.procDefName}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务所属人ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="ownerId" name="ownerId" value="${bpmTask.ownerId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务执行人ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="assigneeId" name="assigneeId" value="${bpmTask.assigneeId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务状态<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="status" name="status" value="${bpmTask.status}"  validate="{required:true,maxlength:120}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务优先级:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="priority" name="priority" value="${bpmTask.priority}"  validate="{required:false,number:true,maxIntLen:10}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务创建时间<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="createTime" name="createTime" value="${bpmTask.createTime}"  validate="{required:true}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务到期时间:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="dueTime" name="dueTime" value="${bpmTask.dueTime}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">是否挂起(0正常,1挂起):</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="suspendState" name="suspendState" value="${bpmTask.suspendState}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">父任务ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="parentId" name="parentId" value="${bpmTask.parentId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">BPMN流程实例ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="bpmnInstId" name="bpmnInstId" value="${bpmTask.bpmnInstId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">BPMN流程定义ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="bpmnDefId" name="bpmnDefId" value="${bpmTask.bpmnDefId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">分类ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="typeId" name="typeId" value="${bpmTask.typeId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">是否锁定(0正常,1锁定):</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="lockState" name="lockState" value="${bpmTask.lockState}"  validate="{required:false}"/>
                                </div>
                            </div>
					<input type="hidden" name="id" value="${bpmTask.id}" />
					</form>
				</div>
		</div>
	</body>
</html>