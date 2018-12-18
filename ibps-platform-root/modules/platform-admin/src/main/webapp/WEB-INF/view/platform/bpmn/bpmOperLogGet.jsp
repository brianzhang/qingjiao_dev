<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a class="btn btn-primary fa fa-back" href="${returnUrl}"><span>返回</span></a>
			</div>
		</div>
		<div class="">
			<form class="fr-form" id="bpmOperLogForm">
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">事项标题</label>
						<div class="fr-form-block">
							<p class="form-control-static">${bpmOperLog.procInstSubject}</p>
						</div>
					</div>
				</div>
				
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">流程定义key</label>
						<div class="fr-form-block">
							<p class="form-control-static">${bpmOperLog.procDefKey}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">任务节点</label>
						<div class="fr-form-block">
							<p class="form-control-static">${bpmOperLog.nodeId}</p>
						</div>
					</div>
				</div>
				
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">操作类型</label>
						<div class="fr-form-block">
							<p class="form-control-static">${bpmOperLog.operTypeName }</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">是否干预</label>
						<div class="fr-form-block">
							<p class="form-control-static">
								<c:if test="${bpmOperLog.interpose=='Y'}">是</c:if>
								<c:if test="${bpmOperLog.interpose=='N'}">否</c:if>
							</p>
						</div>
					</div>
				</div>
				
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">操作人</label>
						<div class="fr-form-block">
							<p class="form-control-static">${bpmOperLog.createBy}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">操作时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">
								<fmt:formatDate value="${bpmOperLog.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
							</p>
						</div>
					</div>
				</div>
				
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">操作意见</label>
						<div class="fr-form-block">
							<p class="form-control-static">${bpmOperLog.option}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">操作内容</label>
						<div class="fr-form-block">
							<p class="form-control-static">${bpmOperLog.content}</p>
						</div>
					</div>
				</div>
				
			</form>

		</div>
	</div>
</body>
</html>
