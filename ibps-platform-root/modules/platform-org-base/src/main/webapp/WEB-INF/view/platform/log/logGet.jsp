

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
				<div class="form-horizontal ">
					<label class="col-sm-2 control-label">标题:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${log.title}</p>
					</div>
					<label class="col-sm-2 control-label">类型:</label>
					<div class="col-sm-10">
						<p class="form-control-static">
							<c:choose>
								<c:when test="${log.type == 'access'}">访问日志</c:when>
									<c:when test="${log.type == 'exception'}">异常日志</c:when>
									<c:when test="${log.type == 'login'}">登录日志</c:when>
									<c:when test="${log.type == 'loginError'}">登录异常</c:when>
									<c:otherwise>未知</c:otherwise>
							</c:choose>
						</p>
					</div>
					<label class="col-sm-2 control-label">模块:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${log.module}</p>
					</div>
					<label class="col-sm-2 control-label">子模块:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${log.subModule}</p>
					</div>
					<label class="col-sm-2 control-label">IP地址:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${log.ipAddr}</p>
					</div>
					<label class="col-sm-2 control-label">请求URI:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${log.requestUri}</p>
					</div>
					<label class="col-sm-2 control-label">操作人:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${log.createor}</p>
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-10">
						<p class="form-control-static"><fmt:formatDate value="${log.createTime}"  pattern="yyyy-MM-dd HH:mm:ss"/></p>		
					</div>
					<label class="col-sm-2 control-label">用户代理:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${log.userAgent}</p>
					</div>
					<label class="col-sm-2 control-label">操作方式:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${log.method}</p>
					</div>
					<label class="col-sm-2 control-label">操作提交的数据:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${fn:escapeXml(log.params)}</p>
					</div>
					<label class="col-sm-2 control-label">异常数据:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${fn:escapeXml(log.exception)}</p>
					</div>

				</div>
			</div>
		</div>
	</body>
</html>