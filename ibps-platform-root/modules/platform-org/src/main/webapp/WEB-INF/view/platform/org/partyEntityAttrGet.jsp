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
			<div class="panel-body">
				<div class="wrapper wrapper-content col-sm-12">
					<div type="arrayData" id="attrItem" class="panel-form col-sm-12">
						<div class="form-group  col-sm-6">
						<label class="col-sm-12 control-label">属性名称
						</label>
						</div>
						<div class="form-group col-sm-6">
							<label class="col-sm-4 control-label">属性值
							</label>
						</div>
					
						<c:forEach items="${partyAttrs }" var="partyAttr">
							<div type="arrayItem">
								<div class="form-group  col-sm-6">
									<p class="form-control-static">${partyAttr.name}</p>
								</div>
								<div class="form-group  col-sm-6">
									<c:forEach items="${partyAttr.values }" var="partyAttrValue">
										<p class="form-control-static">${partyAttrValue.value}</p>
									</c:forEach>
								</div>
							</div>
						</c:forEach>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>