<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" 	src="${ctx}/js/lc/platform/org/changePassword.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
				<c:if test="${isReset == 0}">
		<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
				</div>
			</div>
					</c:if>
		<div class="panel-form">
			<form class="form-horizontal" id="changePasswordForm" action="changePassword.htm"
				method="post">
					<c:if test="${isReset == 0}">
						<div class="form-group">
							<label class="col-sm-2 control-label">原始密码<span class="required">*</span>:</label>
							<div class="col-sm-10">
							<input class="form-control"  type="password" name="primitivePassword" validate="{required:true,maxlength:192}"/>
							</div>
						</div>
					</c:if>
					<div class="form-group">
						<label class="col-sm-2 control-label">修改密码<span class="required">*</span>:</label>
						<div class="col-sm-10">
							<c:choose>
								<c:when test="${not empty userSecurity&& userSecurity.isUseComp=='N'}">
									<input class="form-control"   type="password" id="newPassword" name="newPassword" validate="{required:true,minlength:${userSecurity.minLength},maxlength:${userSecurity.maxLength}}"/>
								</c:when>
								<c:when test="${not empty userSecurity&& userSecurity.isUseComp=='Y'}">
									<input class="form-control"   type="password" id="newPassword" name="newPassword" validate="{required:true,minlength:${userSecurity.minLength},maxlength:${userSecurity.maxLength}<c:if test='${fn:contains(userSecurity.complexity,3)}'>,containnum:true</c:if><c:if test='${fn:contains(userSecurity.complexity,1)}'>,containlowcase:true</c:if><c:if test='${fn:contains(userSecurity.complexity,2)}'>,containuppercase:true</c:if><c:if test='${fn:contains(userSecurity.complexity,4)}'>,containspec:true</c:if>}"/>
								</c:when>
								<c:otherwise>
								<input class="form-control"   type="password" id="newPassword" name="newPassword" validate="{required:true,maxlength:192}"/>
								</c:otherwise>
							</c:choose>
							<c:if test="${not empty userSecurity}">
								<span class="help-block">格式：最大长度${userSecurity.maxLength};最小长度${userSecurity.minLength};
								<c:if test="${userSecurity.isUseComp=='Y'}">
									<c:if test="${fn:contains(userSecurity.complexity,1)}">必须包含小写字母;</c:if>
									<c:if test="${fn:contains(userSecurity.complexity,2)}">必须包含大写字母;</c:if>
									<c:if test="${fn:contains(userSecurity.complexity,3)}">必须包含数字;</c:if>
									<c:if test="${fn:contains(userSecurity.complexity,4)}">必须包含（^%&@*?!$）特殊字符;</c:if>
								</c:if>
								</span>
							</c:if>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">重复密码<span class="required">*</span>:</label>
						<div class="col-sm-10">
						<input class="form-control"   type="password" id="repeatPassword" name="repeatPassword" validate="{required:true,maxlength:192}"/>
						</div>
					</div>
				<input type="hidden" name="isReset" value="${isReset}" />
				<input type="hidden" name="userId" value="${userId}" />
			</form>
		</div>
	</div>
</body>
</html>