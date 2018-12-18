<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<f:link href="lc/bpmn/timeline.css" isCommon="false"/>
</head>
<body>
	<div class="wrapper wrapper-content  col-sm-12">
		<div class="col-xs-12 col-sm-10 col-sm-offset-1">
			<div class="timeline-container">
				<c:set var="currentDay"/>
					<c:forEach items="${bpmTaskOpinions}" var="opinion" varStatus="i">
						
						<c:set var="createTime">
							<fmt:formatDate value="${opinion.createTime}" pattern="yyyy-MM-dd" type="date"/>
						</c:set>
						
						<c:if test="${currentDay !=  createTime }">
							<c:set var="currentDay">
								<fmt:formatDate value="${opinion.createTime}" pattern="yyyy-MM-dd" type="date"/>
							</c:set>
							<div class="timeline-label">
								<span class="label label-primary arrowed-in-right label-lg">
									<b><fmt:formatDate value="${opinion.createTime}" pattern="yyyy年MM月dd日"/></b>
								</span>
							</div>
						</c:if>
						
						<%-- 会签任务处理 --%>
						<c:if test="${not empty opinion.batch}">
						<div class="timeline-items">
							<div class="timeline-item clearfix">
								<div class="timeline-info">
									<c:if test="${not empty opinion.userImg}">
										<img alt="图片" src="${ctx }${opinion.userImg}"  />
									</c:if>
										
									<c:if test="${empty opinion.userImg}">
										<img alt="图片" src="${ctx }/commons/image/default_use_image.jpg" />
									</c:if>
									<span class="label label-info label-sm"><fmt:formatDate value="${opinion.createTime}" pattern="HH:mm:ss"/></span>
								</div>

								<div class="widget-box transparent">
									<div class="widget-header widget-header-small">
										<h5 class="widget-title smaller">
											${opinion.taskName}
										</h5>
										<span class="widget-toolbar no-border ">
											审批状态：
											<span
												<c:choose>
													<c:when test="${opinion.status == 'pending'}">
														class="green"
													</c:when>
													<c:otherwise>
														class="red"
													</c:otherwise>
												</c:choose>
											 >${opinion.statusName}</span>
										</span>
									</div>
									
									<div class="widget-body">
										<div class="widget-main">
											<span class="label label-info">审批意见:</span>	${opinion.opinion}
											<span class="widget-toolbar no-border">
												<a href="javascript:more('${opinion.batch }');">更多</a>
											</span>
										</div>
										<div class="widget-toolbox padding-8 clearfix">
											<c:choose>
												<c:when test="${not empty opinion.qualifiedExecutor}">
													<span class="widget-title smaller">
														<c:choose>
														<c:when test="${opinion.status == 'pending'}">
														<span>待执行人：
														</c:when>
														<c:otherwise>
														<span>执行人：
														</c:otherwise>
														</c:choose>
														<c:forEach items="${opinion.qualifiedExecutor}" var="qualifiedExecutor" >
															${qualifiedExecutor.executor }
														</c:forEach>
														</span>
													</span>
												</c:when>
												<c:otherwise>
													<span class="widget-title smaller">未设置执行人</span>
												</c:otherwise>
											</c:choose>
																			
											<c:if test="${not empty opinion.completeTime}">
												<span class="widget-toolbar no-border">
													审批时间:
													<span class="yellow-bg">
														<fmt:formatDate value="${opinion.completeTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
													</span>
												</span>
											</c:if>
										</div>
									</div>
								</div>
							</div>
						</div>
						</c:if>
						
						<%-- 外部子流程处理 --%>
						<%-- <c:if test="${opinion.callSub == true}">
						<div class="timeline-items">
							<div class="timeline-item clearfix">
								<div class="timeline-info">
									<c:if test="${not empty opinion.userImg}">
										<img alt="图片" src="${ctx }${opinion.userImg}"  />
									</c:if>
										
									<c:if test="${empty opinion.userImg}">
										<img alt="图片" src="${ctx }/commons/image/default_use_image.jpg" />
									</c:if>
									<span class="label label-info label-sm"><fmt:formatDate value="${opinion.createTime}" pattern="HH:mm:ss"/></span>
								</div>

								<div class="widget-box transparent">
									<div class="widget-header widget-header-small">
										<h5 class="widget-title smaller">
											${opinion.taskName}
										</h5>
										<span class="widget-toolbar no-border ">
											审批状态：
											<span
												<c:choose>
													<c:when test="${opinion.status == 'pending'}">
														class="green"
													</c:when>
													<c:otherwise>
														class="red"
													</c:otherwise>
												</c:choose>
											 ></span>
										</span>
									</div>
									
									<div class="widget-body">
										<div class="widget-main">
											<span class="label label-info">审批意见:</span>
											<span class="widget-toolbar no-border">
												<a href="javascript:callSubMore('${opinion.procInstId }','${opinion.taskName }','${opinion.taskKey }');">更多</a>
											</span>
										</div>
										<div class="widget-toolbox padding-8 clearfix">
											<c:choose>
												<c:when test="${not empty opinion.qualifiedExecutor}">
													<span class="widget-title smaller">
														<c:choose>
														<c:when test="${opinion.status == 'pending'}">
														<span>待执行人：
														</c:when>
														<c:otherwise>
														<span>执行人：
														</c:otherwise>
														</c:choose>
														<c:forEach items="${opinion.qualifiedExecutor}" var="qualifiedExecutor" >
															${qualifiedExecutor.executor }
														</c:forEach>
														</span>
													</span>
												</c:when>
												<c:otherwise>
													<span class="widget-title smaller">未设置执行人</span>
												</c:otherwise>
											</c:choose>
																			
											<c:if test="${not empty opinion.completeTime}">
												<span class="widget-toolbar no-border">
													审批时间:
													<span class="yellow-bg">
														<fmt:formatDate value="${opinion.completeTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
													</span>
												</span>
											</c:if>
										</div>
									</div>
								</div>
							</div>
						</div>
						</c:if> --%>
						
						<%-- 普通任务处理 --%>
						<c:if test="${empty opinion.batch && opinion.callSub == false}">
						<div class="timeline-items">
							<div class="timeline-item clearfix">
								<div class="timeline-info">
									<c:if test="${not empty opinion.userImg}">
										<img alt="图片" src="${ctx }${opinion.userImg}"  />
									</c:if>
										
									<c:if test="${empty opinion.userImg}">
										<img alt="图片" src="${ctx }/commons/image/default_use_image.jpg" />
									</c:if>
									<span class="label label-info label-sm"><fmt:formatDate value="${opinion.createTime}" pattern="HH:mm:ss"/></span>
								</div>

								<div class="widget-box transparent">
									<div class="widget-header widget-header-small">
										<h5 class="widget-title smaller">
											${opinion.taskName}
										</h5>
										<span class="widget-toolbar no-border ">
											审批状态：
											<span
												<c:choose>
													<c:when test="${opinion.status == 'pending'}">
														class="green"
													</c:when>
													<c:otherwise>
														class="red"
													</c:otherwise>
												</c:choose>
											 >${opinion.statusName}</span>
										</span>
									</div>
									
									<div class="widget-body">
										<div class="widget-main">
											<span class="label label-info">审批意见:</span>	${opinion.opinion}
										</div>
										<div class="widget-toolbox padding-8 clearfix">
											<c:choose>
												<c:when test="${not empty opinion.auditor}">
													<span class="widget-title smaller">
														执行人：<i class="ace-icon fa fa-user bigger-110"></i>${opinion.auditorName}
													</span>
												</c:when>
												<c:when test="${not empty  opinion.qualifiedExecutor}">
													<span class="widget-title smaller">
														<span>待执行人：
														<c:forEach items="${opinion.qualifiedExecutor}" var="qualifiedExecutor" >
																${qualifiedExecutor.executor }
														</c:forEach>
														</span>
													</span>
												</c:when>
												<c:otherwise>
													<span class="widget-title smaller">未设置执行人</span>
												</c:otherwise>
											</c:choose>
																			
											<c:if test="${not empty  opinion.completeTime}">
												<span class="widget-toolbar no-border">
													审批时间:
													<span class="yellow-bg">
														<fmt:formatDate value="${opinion.completeTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
													</span>
												</span>
											</c:if>
										</div>
									</div>
								</div>
							</div>
						</div>
						</c:if>
					</c:forEach>											
				</div>
			</div>
		</div>
		
		<script type="text/javascript">
			function more(batch){
				var url = __ctx + "/platform/bpmn/instance/bpmInst/flowHistorySign.htm?batch="+batch;
				
				DialogUtil.dialog({
					title:"会签任务审批历史",
					content: url,
					params: {},
					area:['66%','88%'],
					 btn:[
			             {
			            	label: '关闭',
			            	iconCls:'btn btn-danger fa fa-cancel',
			                action: function(dialog,index) {
			                	DialogUtil.close(index);
			                }
			            }]
				});
			}

			function callSubMore(instId, nodeId, flowName){
				var url = __ctx + "/platform/bpmn/instance/bpmInst/flowHistoryCallSub.htm?instId="+instId+"&nodeId="+nodeId;
				
				DialogUtil.dialog({
					title:"外部子流程【"+flowName+"】审批历史",
					content: url,
					params: {},
					area:['66%','88%'],
					 btn:[
			             {
			            	label: '关闭',
			            	iconCls:'btn btn-danger fa fa-cancel',
			                action: function(dialog,index) {
			                	DialogUtil.close(index);
			                }
			            }]
				});
			}
		</script>
	</body>
</html>