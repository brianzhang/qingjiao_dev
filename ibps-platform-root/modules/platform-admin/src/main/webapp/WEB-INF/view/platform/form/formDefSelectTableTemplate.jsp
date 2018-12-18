<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html ng-app>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formTemplateSelect.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal" id="formDefForm"   method="post"  >
						<c:if test="${mainTable != null}">
							<div class="form-group">
                                <label class="col-sm-2 control-label">主表模板:</label>
                                <div class="col-sm-10">
	                                  <select id="main"  template="template"   data-name="${mainTable.tableName}" class="form-control" >
										<c:forEach items="${mainTableTemplates}"  var="template">
											<option value="${template.alias}">${template.name}</option>
										</c:forEach>
									</select>
								</div>
                            </div>
						</c:if>
						<c:forEach items="${subTables}" var="subTable">
							<div class="form-group">
                                <label class="col-sm-2 control-label">${subTable.tableComment }模板:</label>
                                <div class="col-sm-10">
	                                <select template="template"  data-name="${subTable.tableName }" class="form-control" >
										<c:forEach items="${subTableTemplates}" var="template">
											<option value="${template.alias}">${template.name}</option>
										</c:forEach>
									</select>
								</div>
                            </div>
						</c:forEach>					
					</table>
					</form>
				</div>
		</div>
	</body>
</html>