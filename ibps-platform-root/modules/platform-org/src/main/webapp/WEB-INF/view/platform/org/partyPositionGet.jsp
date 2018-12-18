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
			<div class="panel-toolbar">
				<div class="buttons">
					<a href="#" class="btn btn-primary fa fa-back" onclick="javascript:history.back(-1);"><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12">
					<div class="form-horizontal">
						<label class="col-sm-2 control-label">岗位名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyPosition.name}</p>
						</div>
						
						<label class="col-sm-2 control-label">岗位别名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyPosition.posAlias}</p>
						</div>
						
						<label class="col-sm-2 control-label">岗位等级:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${level.name}</p>
						</div>
						
						<label class="col-sm-2 control-label">岗位说明:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyPosition.desc}</p>
						</div>
						
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyPosition.createTime}" /></p>
						</div>
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyPosition.updateTime}" /></p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>