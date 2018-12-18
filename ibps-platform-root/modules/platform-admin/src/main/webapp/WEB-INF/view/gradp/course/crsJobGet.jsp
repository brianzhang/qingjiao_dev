<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsJob.js"></script>
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
			<input type="hidden" id="jobId" value="${crsJob.id }">
			<form class="fr-form" id="crsJobForm">
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">标题</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsJob.title}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">起止时间</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsJob.startStopTime}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">状态</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsJob.showStatus}</p>
						</div>
					</div>
				</div>

				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">分值</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsJob.scorePower}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">性质</label>
						<div class="fr-form-block">
							<p class="form-control-static">${categoryList[crsJob.category]}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">分数是否折合</label>
						<div class="fr-form-block">
							<p class="form-control-static">
								<c:if test="${crsJob.isTrans==0}">否</c:if>
								<c:if test="${crsJob.isTrans==1}">是</c:if>
							</p>
						</div>
					</div>
				</div>

				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">备注</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsJob.content}</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">已<c:if
								test="${crsJob.category==0 }">提交</c:if><c:if test="${crsJob.category==1 }">签到</c:if>
						</label>
						<div class="fr-form-block">
							<a class="btn btn-primary fa fa-detail my-showSubmitted">&nbsp;${submitted }&nbsp;人
							</a>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">未<c:if
								test="${crsJob.category==0 }">提交</c:if><c:if test="${crsJob.category==1 }">签到</c:if>
						</label>
						<div class="fr-form-block">
							<a class="btn btn-primary fa fa-detail my-showUnSubmitted">&nbsp;${unSubmitted }&nbsp;人
							</a>
						</div>
					</div>
				</div>

				<%-- <c:if test="${crsJob.category==0 }">
					<!-- 如果提交作业，则提供重复度展现 -->
					<div class="fr_response_field col-sm-12">
						<div class="fr-form-group">
							<label class="fr-control-label">重复度展现
							</label>
							<div class="fr-form-block">
								<a class="btn btn-primary fa fa-detail showRepeat">&nbsp;点击查看
								</a>
							</div>
						</div>
					</div>
				</c:if> --%>



			</form>

		</div>
	</div>
</body>
</html>
