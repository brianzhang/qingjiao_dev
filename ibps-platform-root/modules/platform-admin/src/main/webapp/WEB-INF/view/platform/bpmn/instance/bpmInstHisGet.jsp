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
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
						<div class="form-group">
							<label class="col-sm-2 control-label">流程实例标题:</label>
							<div class="col-sm-3">
								<p class="form-control-static">${bpmInstHis.subject}</p>
							</div>
							
							<label class="col-sm-2 control-label">实例状态:</label>
							<div class="col-sm-3">
								<p class="form-control-static">
									<c:choose>
										<c:when test="${bpmInstHis.status eq 'running'}">
											<span class="green">正在运行</span>
										</c:when>
										<c:when test="${bpmInstHis.status eq 'manualend'}">
											<span class="red">人工结束</span>
										</c:when>
										<c:when test="${bpmInstHis.status eq 'end'}">
											<span class="red">结束</span>
										</c:when>
										 <c:otherwise>   
										 	${bpmInstHis.status}
										 </c:otherwise>
									</c:choose>
								</p>
							</div>
						</div>
					
						<div class="form-group">
								<label class="col-sm-2 control-label">流程名称:</label>
								<div class="col-sm-3">
									<p class="form-control-static">${bpmInstHis.procDefName}</p>
								</div>
								
								<label class="col-sm-2 control-label">流程定义Key:</label>
								<div class="col-sm-3">
									<p class="form-control-static">${bpmInstHis.procDefKey}</p>
								</div>
						</div>
						
						<div class="form-group">
								<label class="col-sm-2 control-label">关联数据业务主键:</label>
								<div class="col-sm-3">
									<p class="form-control-static">${bpmInstHis.bizKey}</p>
								</div>
								
								<label class="col-sm-2 control-label">绑定的表单key:</label>
								<div class="col-sm-3">
									<p class="form-control-static">${bpmInstHis.formKey}</p>
								</div>
						</div>
					
						<div class="form-group">
							<label class="col-sm-2 control-label">创建时间:</label>
							<div class="col-sm-3">
								<p class="form-control-static"><fmt:formatDate value="${bpmInstHis.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
							</div>
							
							<label class="col-sm-2 control-label">实例结束时间:</label>
							<div class="col-sm-3">
								<p class="form-control-static"><fmt:formatDate value="${bpmInstHis.endTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-2 control-label">持续时间(ms):</label>
							<div class="col-sm-3">
								<p class="form-control-static"> ${bpmInstHis.duration} 毫秒</p>
							</div>
							
							<label class="col-sm-2 control-label">是否禁止:</label>
							<div class="col-sm-3">
								<p class="form-control-static">${bpmInstHis.forbidden}</p>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-2 control-label">数据保存模式:</label>
							<div class="col-sm-3">
								<p class="form-control-static">
									<c:choose>
										<c:when test="${bpmInstHis.dataMode eq 'bo_db'}">
													物理表
										</c:when>
										<c:when test="${bpmInstHis.dataMode eq 'table'}">
													物理表
										</c:when>
										 <c:otherwise>   
										 	实例数据
										 </c:otherwise>
									</c:choose>
								</p>
							</div>
							
							<label class="col-sm-2 control-label">是否正式数据:</label>
							<div class="col-sm-3">
								<p class="form-control-static">
									<c:choose>
										<c:when test="${bpmInstHis.isFormmal eq 'N'}">
											<span class="green">测试数据</span>
										</c:when>
										 <c:otherwise>   
										 	<span class="red">正式数据</span>
										 </c:otherwise>
									</c:choose>
								
								</p>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-2 control-label">BPMN流程实例ID:</label>
							<div class="col-sm-3">
								<p class="form-control-static">${bpmInstHis.bpmnInstId}</p>
							</div>
							
							<label class="col-sm-2 control-label">父实例Id:</label>
							<div class="col-sm-3">
								<p class="form-control-static">
									<c:choose>
										<c:when test="${bpmInstHis.parentInstId eq '0'}">
													无
										</c:when>
										 <c:otherwise>   
										 	${bpmInstHis.parentInstId}
										 </c:otherwise>
									</c:choose>
								</p>
							</div>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>