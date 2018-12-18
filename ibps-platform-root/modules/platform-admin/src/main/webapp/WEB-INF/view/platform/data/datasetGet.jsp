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
					<label class="col-sm-2 control-label">名称:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${dataset.name}</p>
					</div>
					<label class="col-sm-2 control-label">数据集KEY:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${dataset.key}</p>
					</div>
					<label class="col-sm-2 control-label">类型:</label>
					<div class="col-sm-10">
						<p class="form-control-static">
						<c:if test="${dataset.type == 'table'}">表</c:if>
						<c:if test="${dataset.type == 'view'}">视图</c:if>
						<c:if test="${dataset.type == 'sql'}">自定义SQL</c:if>
						</p>
					</div>
					<c:if test="${dataset.type != 'sql'}">
					<label class="col-sm-2 control-label">来源:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${dataset.from}</p>
					</div>
					</c:if>
					<c:if test="${dataset.type == 'sql'}">
					<label class="col-sm-2 control-label">SQL语句:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${dataset.sql}</p>
					</div>
					</c:if>
					<label class="col-sm-2 control-label">是否外部数据源:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						<c:if test="${dataset.external == 'Y'}">是</c:if><c:if test="${dataset.external == 'N'}">否</c:if>
						</p>
					</div>
					<c:if test="${dataset.external == 'Y'}">
					<label class="col-sm-2 control-label">数据源别名:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${dataset.dsAlias}</p>
					</div>
					</c:if>
					<label class="col-sm-2 control-label">是否树型:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						<c:if test="${dataset.isTree == 'Y'}">是</c:if><c:if test="${dataset.isTree == 'N'}">否</c:if>
						</p>
					</div>
					<c:if test="${dataset.isTree == 'Y'}">
					<label class="col-sm-2 control-label">关联字段:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${dataset.refField}</p>
					</div>
					</c:if>
					<label class="col-sm-2 control-label">创建人:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${f:getPartyLabel(dataset.createBy, 'employee', '')}</p>
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-4">
						<p class="form-control-static"><fmt:formatDate value="${dataset.createTime}" /></p>		
					</div>
					<label class="col-sm-2 control-label">更新人:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${f:getPartyLabel(dataset.updateBy, 'employee', '')}</p>
					</div>
					<label class="col-sm-2 control-label">更新时间:</label>
					<div class="col-sm-4">
						<p class="form-control-static"><fmt:formatDate value="${dataset.updateTime}" /></p>		
					</div>
				</div>
			</div>
		</div>
	</body>
</html>