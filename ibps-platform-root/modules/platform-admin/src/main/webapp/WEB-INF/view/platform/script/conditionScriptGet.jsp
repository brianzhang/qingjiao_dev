<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/script/scriptGet.js"></script>
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
						<label class="col-sm-2 control-label">脚本的别名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${conditionScript.aliasName}</p>
						</div>
						<label class="col-sm-2 control-label">脚本的描述:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${conditionScript.aliasDesc}</p>
						</div>
						<label class="col-sm-2 control-label">调用类的路径:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${conditionScript.className}</p>
						</div>
						<label class="col-sm-2 control-label">调用类的对象名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${conditionScript.classInsName}</p>
						</div>
						<label class="col-sm-2 control-label">调用的方法名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${conditionScript.methodName}</p>
						</div>
						<label class="col-sm-2 control-label">调用的方法的描述:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${conditionScript.methodDesc}</p>
						</div>
						<label class="col-sm-2 control-label">方法返回类型:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${conditionScript.returnType}</p>
						</div>
						<label class="col-sm-2 control-label">是否有效:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
							<c:if test="${conditionScript.enable==1}">有效</c:if>
							<c:if test="${conditionScript.enable==0}">无效</c:if></p>
						</div>
						<label class="col-sm-2 control-label">脚本类型:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
							<c:if test="${conditionScript.type==1}">条件脚本</c:if>
							<c:if test="${conditionScript.type==2}">别名脚本</c:if>
							<c:if test="${conditionScript.type==3}">人员脚本</c:if>
							</p>
						</div>
						<label class="col-sm-2 control-label">方法相关设置:</label>
						<div class="col-sm-10">
							<textarea class="hidden" name="argument">${conditionScript.argument}</textarea>
							<div id="paraInfo">
						</div>
						
					</div>
			</div>
		</div>
		<div style="display: none;">
				<div id="para-txt">
					<table class="table-detail para-info-table" cellpadding="0"
						cellspacing="0" border="0">
						<thead>
							<tr>
								<th width="10%" align="center">参数信息</th>
								<th width="25%" align="center">参数类型</th>
								<th width="25%" align="center">参数说明</th>
								<th width="35%" align="center">控件类型</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><span name="paraName"></span></td>
								<td><span name="paraType"></span></td>
								<td><input type="text" name="paraDesc" class="inputText" /></td>
								<td>
									<div class="controlType-div">
										<select name="paraCt" class="inputText">
											<c:forEach var="selectors" items="${selectors}">
												<option value="${selectors.id}">${selectors.name}</option>
											</c:forEach>
										</select> <span style="display: none;" id="settingSpan"> <select
											id="dialog-type" name="dialog-type"
											onchange="dialogChange(this)" style="width: 100px;">
												<option value="">请选择对话框……</option>
										</select> <select id="dialog-param" name="dialog-param"
											style="width: 100px;">
												<option value="">请选择返回值……</option>
										</select>
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
	</body>
</html>