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
						<label class="col-sm-2 control-label">登录账号:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyUser.account}</p>
						</div>
						
						<label class="col-sm-2 control-label">是否超级管理员:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${partyUser.isSuper=='89'}">是</c:when>
									<c:when test="${partyUser.isSuper=='78'}">否</c:when>
								</c:choose>
							</p>
						</div>
						<label class="col-sm-2 control-label">数据校验码:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyUser.dataCheck}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyUser.createTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyUser.updateTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">用户状态:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${partyUser.status.value eq 'actived'}">激活</c:when>
									<c:when test="${partyUser.status.value eq 'inactive'}">未激活</c:when>
									<c:when test="${partyUser.status.value eq 'locked'}">锁定</c:when>
									<c:when test="${partyUser.status.value eq 'deleted'}">已删除</c:when>
								</c:choose> 
							</p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>