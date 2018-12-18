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
						<label class="col-sm-2 control-label">名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${identity.name}</p>
						</div>
						<label class="col-sm-2 control-label">别名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${identity.alias}</p>
						</div>
						<label class="col-sm-2 control-label">规则:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${identity.regulation}</p>
						</div>
						<label class="col-sm-2 control-label">生成类型:</label>
						<div class="col-sm-10">
							<c:if test="${empty identity || identity.genType==0}">
                                    <p class="form-control-static">每天生成</p>
                            </c:if>
                            <c:if test="${identity.genType==1}">
                                    <p class="form-control-static">每月生成</p>
                            </c:if>
                            <c:if test="${identity.genType==2}">
                                    <p class="form-control-static">每年生成</p>
                            </c:if>
                            <c:if test="${identity.genType==3}">
                                    <p class="form-control-static">递增</p>
                            </c:if>
						</div>
						<label class="col-sm-2 control-label">流水号长度:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${identity.noLength}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${identity.curData}" /></p>		
						</div>
						<label class="col-sm-2 control-label">初始值:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${identity.initValue}</p>
						</div>
						<%-- <label class="col-sm-2 control-label">当前值:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${identity.curValue}</p>
						</div> --%>
						<label class="col-sm-2 control-label">步长:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${identity.step}</p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>