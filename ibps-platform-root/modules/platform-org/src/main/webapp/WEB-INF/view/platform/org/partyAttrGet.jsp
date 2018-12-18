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
						<label class="col-sm-2 control-label">属性名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyAttr.name}</p>
						</div>
						
						<label class="col-sm-2 control-label">业务主键:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyAttr.key}</p>
						</div>
						
						<label class="col-sm-2 control-label">所属参与者类型 :</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyAttr.partyTypeName }</p>
						</div>
						
						<label class="col-sm-2 control-label">属性类型 :</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyAttr.typeName }</p>
						</div>
						
						<label class="col-sm-2 control-label">数据类型 :</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyAttr.dataTypeName }</p>
						</div>
						
						<c:if test="${partyAttr.dataType eq 'OPTION' }">
							<label class="col-sm-2 control-label">是否多选 :</label>
							<div class="col-sm-10">
								<p class="form-control-static">
									<c:if test="${partyAttr.isMulti eq 89 }">是</c:if>
									<c:if test="${partyAttr.isMulti eq 78 }">否</c:if>
								</p>
							</div>
							
							<label class="col-sm-2 control-label">自定义选项 :</label>
							<div class="col-sm-10">
								<table class="" type="arrayData" stype="width:100%">
									<c:forEach items="${options}" var="keyValue">
										<tr>
											<td style="padding:5px;">
												<p class="form-control-static"><label class="control-label">选项:</label>&nbsp;&nbsp;${keyValue.groupName}</p>
											</td>
											<td style="padding:5px;">
												<p class="form-control-static"><label class="control-label">值:</label>&nbsp;&nbsp;${keyValue.value}</p>
											</td>
										</tr>
									</c:forEach>
								</table>
							</div>
						</c:if>
						
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyAttr.createTime}" /></p>		
						</div>
						
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyAttr.updateTime}" /></p>		
						</div>
					</div>
			</div>
		</div>
	</body>
</html>