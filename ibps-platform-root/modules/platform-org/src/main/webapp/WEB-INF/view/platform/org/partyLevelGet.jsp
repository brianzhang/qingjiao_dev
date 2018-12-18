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
						<label class="col-sm-2 control-label">参与者类型 :</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:forEach items="${types}" var="type">
									<c:if test="${not empty partyLevel.type && partyLevel.type eq type.value}">${type.label}</c:if>
								</c:forEach> 
							</p>
						</div>
						<label class="col-sm-2 control-label">名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyLevel.name}</p>
						</div>
						<label class="col-sm-2 control-label">级别数值:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyLevel.level}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyLevel.createTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyLevel.updateTime}" /></p>		
						</div>
					</div>
			</div>
		</div>
	</body>
</html>