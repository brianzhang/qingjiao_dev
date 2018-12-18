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
			
			<div class="panel-form col-sm-12">
					<div class="form-horizontal">
						<label class="col-sm-2 control-label">机构名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyOrg.name}</p>
						</div>
						<label class="col-sm-2 control-label">机构别名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyOrg.orgAlias}</p>
						</div>
						<label class="col-sm-2 control-label">机构等级:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${level.name}</p>
						</div>
						<label class="col-sm-2 control-label">机构状态:</label>
							<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${partyOrg.status eq 'actived'}">激活</c:when>
									<c:when test="${partyOrg.status eq 'inactive'}">禁用</c:when>
									<c:when test="${partyOrg.status eq 'locked'}">锁定</c:when>
									<c:when test="${partyOrg.status eq 'deleted'}">已删除</c:when>  
								</c:choose>
							</p>
						</div>
						
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyOrg.createTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyOrg.updateTime}" /></p>		
						</div>
					</div>
			</div>
		</div>
	</body>
</html>