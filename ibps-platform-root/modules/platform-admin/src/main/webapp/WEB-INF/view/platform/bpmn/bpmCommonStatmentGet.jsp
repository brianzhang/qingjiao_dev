

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
					<label class="col-sm-2 control-label">内容:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${bpmCommonStatment.value}</p>
					</div>
					<label class="col-sm-2 control-label">动作类型:</label>
					<div class="col-sm-10">
						<p class="form-control-static">
						<c:if test="${bpmCommonStatment.action=='agree'}">同意</c:if>
						<c:if test="${bpmCommonStatment.action=='oppose'}">反对</c:if>
						<c:if test="${bpmCommonStatment.action=='reject'}">驳回</c:if>
						<c:if test="${bpmCommonStatment.action=='rejectToStart'}">驳回到发起人</c:if>
						<c:if test="${bpmCommonStatment.action=='abandon'}">弃权</c:if>
						<c:if test="${bpmCommonStatment.action=='manualend'}">终止</c:if>
						</p>
					</div>
					<label class="col-sm-2 control-label">是否默认:</label>
					<div class="col-sm-10">
						<p class="form-control-static">
						<c:if test="${bpmCommonStatment.isDefault=='Y'}">是</c:if>
						<c:if test="${bpmCommonStatment.isDefault=='N'}">否</c:if>
						</p>
						
					</div>
					<label class="col-sm-2 control-label">创建人:</label>
					<div class="col-sm-10">
						<p class="form-control-static">
						${f:getPartyLabel(bpmCommonStatment.createBy, 'employee', '')}
						</p>
						
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-10">
						<p class="form-control-static"><fmt:formatDate value="${bpmCommonStatment.createTime}" /></p>		
					</div>
					<label class="col-sm-2 control-label">使用次数:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${bpmCommonStatment.times}</p>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>