<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/script/scriptEdit.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/script/conditionScript.js"></script>
</head>

<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>保存</span></a>
				<a href="list.htm" class="btn btn-primary fa fa-back"><span>返回</span></a>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="conditionScriptForm"
				action="save.htm" method="post">
				<input type="hidden" name="id" value="${conditionScript.id}" />
				<textarea class="hidden" name="argument">${conditionScript.argument}</textarea>
				<input type="hidden" id="methodName"
					value="${conditionScript.methodName}" />
				<div class="form-group">
					<label class="col-sm-2 control-label">脚本的别名:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="aliasName"
							name="aliasName" value="${conditionScript.aliasName}"
							validate="{required:false,maxlength:384}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">脚本的描述:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="aliasDesc"
							name="aliasDesc" value="${conditionScript.aliasDesc}"
							validate="{required:false}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">调用类的路径:</label>
					<div class="col-sm-10">
						<select name="className" class="form-control">
							<c:forEach items="${implClasses}" var="implClass">
								<option value="${implClass.name}"
									<c:if test="${conditionScript.className eq implClass.name}"> selected="selected"</c:if>>${implClass.name}</option>
							</c:forEach>
						</select>
						<%--                                     <input type="text" class="form-control"  id="className" name="className" value="${conditionScript.className}"  validate="{required:false,maxlength:384}"/> --%>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">调用类的对象名:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" readonly="readonly"
							id="classInsName" name="classInsName"
							value="${conditionScript.classInsName}"
							validate="{required:false,maxlength:384}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">调用的方法名:</label>
					<div class="col-sm-10">
						<select class="form-control" name="methodName"></select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">调用的方法的描述:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="methodDesc"
							name="methodDesc" value="${conditionScript.methodDesc}"
							validate="{required:false,maxlength:765}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">方法返回类型:</label>
					<div class="col-sm-10">
						<input type="text"  class="form-control" id="returnType" readonly="readonly"
							name="returnType" value="${conditionScript.returnType}"
							validate="{required:false,maxlength:120}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">参数信息:</label>
					<div class="col-sm-10">
<!-- 						<input type="text" class="form-control" id="paraInfo" /> -->
						<div id="paraInfo">
					
					</div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">是否有效<span
						class="required">*</span>:
					</label>
					<div class="col-sm-10">
						<select name="enable" class="inputText input-wh-1">
							<option value="0"
								<c:if test="${conditionScript.enable eq 0}"> selected="selected"</c:if>>否</option>
							<option value="1"
								<c:if test="${conditionScript.enable eq 1}"> selected="selected"</c:if>>是</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">脚本类型</label>
					<div class="col-sm-10">
						<select name="type" class="inputText input-wh-1">
							<option value="1"
								<c:if test="${conditionScript.type eq 1}"> selected="selected"</c:if>>条件脚本</option>
						</select>
					</div>
				</div>
			</form>

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
		</div>
	</div>
</body>
</html>