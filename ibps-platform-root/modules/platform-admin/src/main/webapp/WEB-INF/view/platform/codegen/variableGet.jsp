

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
					<label class="col-sm-2 control-label">变量key:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${variable.key}</p>
					</div>
					<label class="col-sm-2 control-label">变量名:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${variable.name}</p>
					</div>
					
					<label class="col-sm-2 control-label">变量类型:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						<c:if test="${variable.type == 'global'}">全局</c:if>
						<c:if test="${variable.type == 'default'}">默认</c:if>
						<c:if test="${variable.type == 'private'}">私有</c:if>
						</p>
					</div>
					<label class="col-sm-2 control-label">变量值:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${variable.value}</p>
					</div>
					
					<label class="col-sm-2 control-label">创建人:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${f:getPartyLabel(variable.creator, 'employee', '')}</p>
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-4">
						<p class="form-control-static"><fmt:formatDate value="${variable.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
					</div>
					
					<label class="col-sm-2 control-label">变量描述:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${variable.comment}</p>
					</div>

				</div>
			</div>
		</div>
	</body>
</html>