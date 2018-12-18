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
						<label class="col-sm-2 control-label">流程名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.name}</p>
						</div>
						<label class="col-sm-2 control-label">流程业务主键:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.defKey}</p>
						</div>
						<label class="col-sm-2 control-label">流程描述:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.desc}</p>
						</div>
						<label class="col-sm-2 control-label">所属分类ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.typeId}</p>
						</div>
						<label class="col-sm-2 control-label">流程状态。草稿、发布、禁用:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.status}</p>
						</div>
						<label class="col-sm-2 control-label">测试状态:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.testStatus}</p>
						</div>
						<label class="col-sm-2 control-label">BPMN - 流程定义ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.bpmnDefId}</p>
						</div>
						<label class="col-sm-2 control-label">BPMN - 流程发布ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.bpmnDeployId}</p>
						</div>
						<label class="col-sm-2 control-label">版本 - 当前版本号:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.version}</p>
						</div>
						<label class="col-sm-2 control-label">版本 - 主版本流程ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.mainDefId}</p>
						</div>
						<label class="col-sm-2 control-label">版本 - 是否主版本:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.isMain}</p>
						</div>
						<label class="col-sm-2 control-label">版本 - 变更理由:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.reason}</p>
						</div>
						<label class="col-sm-2 control-label">创建人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.createBy}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${bpmDefine.createTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">更新人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${bpmDefine.updateBy}</p>
						</div>
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${bpmDefine.updateTime}" /></p>		
						</div>
					</div>
			</div>
		</div>
	</body>
</html>