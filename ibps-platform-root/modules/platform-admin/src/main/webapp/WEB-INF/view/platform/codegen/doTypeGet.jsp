

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
					<label class="col-sm-2 control-label">分类:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${doType.typeName}</p>
					</div>
					<label class="col-sm-2 control-label">类型key:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${doType.key}</p>
					</div>
					<label class="col-sm-2 control-label">类型名称:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${doType.name}</p>
					</div>
					
					<label class="col-sm-2 control-label">子集类型:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						<c:if test="${doType.subType == 'doType'}">生成类型</c:if>
						<c:if test="${doType.subType == 'template'}">模板</c:if>
						</p>
					</div>
					<label class="col-sm-2 control-label">是否默认:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						<c:if test="${doType.isDef == 'true'}">是</c:if>
						<c:if test="${doType.isDef == 'false'}">否</c:if>
						</p>
					</div>
					
					<label class="col-sm-2 control-label">子集keys:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${doType.subKeys}</p>
					</div>
					
					<label class="col-sm-2 control-label">创建人:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${f:getPartyLabel(doType.creator, 'employee', '')}</p>
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-4">
						<p class="form-control-static"><fmt:formatDate value="${doType.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
					</div>
					
					<label class="col-sm-2 control-label">描述:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${doType.comment}</p>
					</div>

				</div>
			</div>
		</div>
	</body>
</html>