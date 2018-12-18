

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
					<label class="col-sm-2 control-label">模板名:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeTemplate.name}</p>
					</div>
					<label class="col-sm-2 control-label">模板类型</label>
					<div class="col-sm-10">
						<p class="form-control-static">
							<c:choose>
								<c:when test="${officeTemplate.type=='plain'}">普通模板</c:when>
								<c:when test="${officeTemplate.type=='red'}">套红模板</c:when>
							</c:choose>
						</p>
					</div>
					
					<label class="col-sm-2 control-label">模板路径:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeTemplate.path}</p>
					</div>
					<label class="col-sm-2 control-label">创建人:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeTemplate.createBy}</p>
					</div>
					<label class="col-sm-2 control-label">修改人:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${officeTemplate.updateBy}</p>
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-10">
						<p class="form-control-static"><fmt:formatDate value="${officeTemplate.createTime}" /></p>		
					</div>
					<label class="col-sm-2 control-label">修改时间:</label>
					<div class="col-sm-10">
						<p class="form-control-static"><fmt:formatDate value="${officeTemplate.updateTime}" /></p>		
					</div>

				</div>
			</div>
		</div>
	</body>
</html>