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
					<label class="col-sm-2 control-label">是否启用复杂度策略:</label>
					<div class="col-sm-10">
						<p class="form-control-static">
						<c:if test="${userSecurity.isUseComp=='Y'}">启用</c:if>
						<c:if test="${userSecurity.isUseComp=='N'}">禁用</c:if>
						</p>
					</div>
					<label class="col-sm-2 control-label">复杂度设置:</label>
					<div class="col-sm-10">
						<p class="form-control-static">
						<c:if test="${fn:contains(userSecurity.complexity, 1)}" >包含小写字母 </c:if>
						<c:if test="${fn:contains(userSecurity.complexity, 2)}" >包含大写字母 </c:if>
						<c:if test="${fn:contains(userSecurity.complexity, 3)}" >包含数字 </c:if>
						<c:if test="${fn:contains(userSecurity.complexity, 4)}" >包含特殊字符 </c:if>
						</p>
					</div>
					<label class="col-sm-2 control-label">密码长度最小值:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${userSecurity.minLength}</p>
					</div>
					<label class="col-sm-2 control-label">密码长度最大值:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${userSecurity.maxLength}</p>
					</div>
					<label class="col-sm-2 control-label">强制更改密码时间（天）:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${userSecurity.updTlimit}</p>
					</div>
					<label class="col-sm-2 control-label">最长使用期限（天）:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${userSecurity.timeLimit}</p>
					</div>
					<label class="col-sm-2 control-label">是否为系统默认:</label>
					<div class="col-sm-10">
						<p class="form-control-static">
						<c:if test="${userSecurity.isDefault=='Y'}">是</c:if>
						<c:if test="${userSecurity.isDefault=='N'}">否</c:if>
						</p>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>