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
							<p class="form-control-static">${selector.name}</p>
						</div>
						<label class="col-sm-2 control-label">别名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${selector.alias}</p>
						</div>
						<label class="col-sm-2 control-label">组合字段:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${selector.groupField}</p>
						</div>
						<label class="col-sm-2 control-label">按钮定义:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${selector.buttons}</p>
						</div>
						<label class="col-sm-2 control-label">系统预定义:</label>
						<div class="col-sm-10">
							<c:if test="${empty selector || selector.isCustom==0}">
                                    <p class="form-control-static">否</p>
                            </c:if>
                            <c:if test="${selector.isCustom==1}">
                                    <p class="form-control-static">是</p>
                            </c:if>
						</div>
						<label class="col-sm-2 control-label">选择器对应的js方法名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${selector.method}</p>
						</div>
						<label class="col-sm-2 control-label">已选数据参数的传递key:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${selector.confKey}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>