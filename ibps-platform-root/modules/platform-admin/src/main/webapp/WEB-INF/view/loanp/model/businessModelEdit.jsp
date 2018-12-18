<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link href="select2/select2.min.css" />
<f:link href="select2/select2-bootstrap.min.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx }/styles/commons/css/gxy/dist/bootstrap-clockpicker.min.css">
<link rel="stylesheet"
	href="${ctx }/styles/commons/css/gxy/jqueryui/jquery-ui-1.10.4.custom.min.css" />
<style>
td{
text-align:center}
</style>
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
		<div class="">
				<input type="hidden" id="id"
					value="${businessModel.id}" />
					<input type="hidden" id="propModelId"
					value="${propModelId}" />
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">模板名称</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								id="modelName"  value="${modelName}"/>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-12">
						<label class="col-sm-12 text-center">设置参数</label>
						<div class="col-sm-12 panel-toolbar ">
							<div class="toolbar-panel">
								<div class="buttons">
									<a class="btn btn-primary fa fa-add"
										href="javascript:businessModel.addSub('businessModelParamList');"><span>添加</span></a>
									<a class="btn btn-primary fa fa-remove"
										href="javascript:businessModel.removeSubAll('businessModelParamList');"><span>重置</span></a>
								</div>
							</div>
						</div>
						<table name="businessModelParamList" class="table table-bordered">
							<thead>
								<tr>
									<td>序号</td>
									<c:forEach items="${modelPropParamList }" var="modelPropParam">
										<td>${modelPropParam.name }</td>
									</c:forEach>
									<td>操作</td>
								</tr>
							</thead>
							<tbody>
								<c:forEach var="businessModelParam" varStatus="status"
									items="${businessModelParamList}">
									<tr>
										<td>${status.index + 1}</td>
										<c:forEach items="${modelPropParamList }" var="modelPropParam">
											<td><c:if test="${modelPropParam.propType=='input' }">
													<input type="text" class="form-control"
														name="${modelPropParam.poField }"
														value="${businessModelParam[modelPropParam.poField]}" />
												</c:if> 
												
												
												<c:if test="${modelPropParam.propType=='number' }">
													<input type="text" class="form-control spinner"
														name="${modelPropParam.poField }" readonly value="${businessModelParam[modelPropParam.poField]}" />
												</c:if> 
												
												
												<c:if test="${modelPropParam.propType=='select' }">
													<select name="${modelPropParam.poField }@select${status.index + 1}"
														style="display: none; width: 100%" class="form-control"
														data-value="${businessModelParam[modelPropParam.poField]}"
														data-toggle="select2" data-multiple="false"
														data-ajax="${ctx }/platform/codegen/tableData/select.htm">
													</select>
												</c:if> 
												
												
												<c:if test="${modelPropParam.propType=='date' }">
													<input type="text" class="form-control date"
														name="${modelPropParam.poField }" 
														value="${businessModelParam[modelPropParam.poField]}"  />
												</c:if> 
												
												
												<c:if test="${modelPropParam.propType=='time' }">
													<div class="input-group clockpicker" data-placement="right"
														data-align="top" data-autoclose="true">
													<input type="text" class="form-control" name="${modelPropParam.poField }" 
														readonly 	value="${businessModelParam[modelPropParam.poField]}"> <span
														class="input-group-addon"> <span
														class="glyphicon glyphicon-time"></span>
													</span>
											</div>
												</c:if></td>
										</c:forEach>
										<td><a class="btn btn-primary fa fa-remove"
											href="javascript:void(0);"
											onclick="businessModel.removeSub('businessModelParamList',this);"><span>删除</span></a>
										</td>
									</tr>
								</c:forEach>
							</tbody>
							<tfoot>
								<c:if test="${empty businessModelParamList}">
									<c:set var="subSize" scope="session" value="0" />
								</c:if>
								<c:if test="${not empty businessModelParamList}">
									<c:set var="subSize" scope="session"
										value="${businessModelParamList.size()}" />
								</c:if>
								<input type="hidden" name="subSize" value="${subSize}" />
								<tr>
									<td colspan="12">共${subSize}条</td>
								</tr>
							</tfoot>
						</table>
					</div>
		</div>
	</div>
	<script type="text/html" id="businessModelParamListTrTemplate">
									<tr>
										<td>{{index}}</td>
										<c:forEach items="${modelPropParamList }" var="modelPropParam">
											<td><c:if test="${modelPropParam.propType=='input' }">
													<input type="text" class="form-control"
														name="${modelPropParam.poField }"/>
												</c:if> 
												
												
												<c:if test="${modelPropParam.propType=='number' }">
													<input type="text" class="form-control"
														name="${modelPropParam.poField }" />
												</c:if> 
												
												
												<c:if test="${modelPropParam.propType=='select' }">
													<select name="${modelPropParam.poField }@select{{index}}"
														style="display: none; width: 100%" class="form-control"
														data-toggle="select2" data-multiple="false"
														data-ajax="${ctx }/platform/codegen/tableData/select.htm?tableName=${modelPropParam.tableName}&select=${modelPropParam.select}">
													</select>
												</c:if> 
												
												
												<c:if test="${modelPropParam.propType=='date' }">
													<input type="text" class="form-control date"
														name="${modelPropParam.poField }"  />
												</c:if> 
												
												
												<c:if test="${modelPropParam.propType=='time' }">
													<div class="input-group clockpicker" data-placement="right"
														data-align="top" data-autoclose="true">
													<input type="text" class="form-control" name="${modelPropParam.poField }" 
														value="${businessModelParam[modelPropParam.poField]}"> <span
														class="input-group-addon"> <span
														class="glyphicon glyphicon-time"></span>
													</span>
											</div>
												</c:if></td>
										</c:forEach>
										<td><a class="btn btn-primary fa fa-remove"
											href="javascript:void(0);"
											onclick="businessModel.removeSub('businessModelParamList',this);"><span>删除</span></a>
										</td>
									</tr>
	</script>
</body>

<script type="text/javascript"
	src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
<script type="text/javascript"
	src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
	<script type="text/javascript"
	src="${ctx }/js/lc/gradp/course/jqueryui/jquery.spinner.js">
<script type="text/javascript"
	src="${ctx }/js/lc/gradp/course/clock/bootstrap-clockpicker.min.js"></script>
<script type="text/javascript"
	src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/loanp/model/businessModel.js"></script>
	</script>
<script type="text/javascript"
	src="${ctx }/js/lc/gradp/course/jqueryui/jquery-ui-1.10.4.custom.min.js"></script>
</html>
