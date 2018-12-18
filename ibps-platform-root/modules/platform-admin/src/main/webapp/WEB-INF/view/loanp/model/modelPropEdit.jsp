<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<%@include file="/commons/page/tree.jsp"%>
<f:link href="select2/select2.min.css" />
<f:link href="select2/select2-bootstrap.min.css" />
<style>
input, td {
	text-align: center
}
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
			<form class="fr-form" id="modelPropForm" action="save.htm">
				<input type="hidden" id="id" name="id" value="${modelProp.id}" />
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">模板名称</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" id="propName"
								name="propName" value="${modelProp.propName}"
								validate="{required:true}" />
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
										href="javascript:modelProp.addSub('modelPropParamList');"><span>添加</span></a>
									<a class="btn btn-primary fa fa-remove"
										href="javascript:modelProp.removeSubAll('modelPropParamList');"><span>重置</span></a>
								</div>
							</div>
						</div>
						<table name="modelPropParamList" class="table table-bordered">
							<thead>
								<tr>
									<td>序号</td>
									<td>属性名称</td>
									<td>对应实体字段</td>
									<td>属性类型</td>
									<td>下拉框关联业务对象</td>
									<td>下拉框关联字段</td>
									<td>操作</td>
								</tr>
							</thead>
							<tbody>
								<c:forEach var="modelPropParam" varStatus="status"
									items="${modelPropParamList}">
									<tr>
										<td>${status.index + 1}</td>
										<td><input type="text" class="form-control" name="name"
											value="${modelPropParam.name}" /></td>
										<td><input type="text" class="form-control"
											name="poField" value="${modelPropParam.poField}" /></td>
										<td>
													<input type="hidden" id="propType" name="propType"
														value="${modelPropParam.propType}" /> <input type="text"
														class="form-control dropdownTree"
														data-toggle="dropdownTree" data-dic="propType"
														data-key="#propType${status.index + 1}" 
														value="${f:getDictLabel(modelPropParam.propType, 'propType', 'key', '')}" />
										</td>
										<td>
													<select name="tableName${status.index + 1}"
														style="display: none; width: 100%" class="form-control"
														data-value="${modelPropParam.tableName }"
														data-toggle="select2" data-multiple="false"
														data-ajax="${ctx }/platform/codegen/tableConfig/tableList.htm">
													</select>
										</td>
										<td><select name="select${status.index + 1}"
											class="form-control">
										</select></td>
										<td><a class="btn btn-primary fa fa-remove"
											href="javascript:void(0);"
											onclick="modelProp.removeSub('modelPropParamList',this);"><span>删除</span></a>
										</td>
									</tr>
								</c:forEach>
							</tbody>
							<tfoot>
								<c:if test="${empty modelPropParamList}">
									<c:set var="subSize" scope="session" value="0" />
								</c:if>
								<c:if test="${not empty modelPropParamList}">
									<c:set var="subSize" scope="session"
										value="${modelPropParamList.size()}" />
								</c:if>
								<input type="hidden" name="subSize" value="${subSize}" />
								<tr>
									<td colspan="12">共${subSize}条</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</form>
		</div>
	</div>

	<script type="text/html" id="modelPropParamListTrTemplate">
			<tr>
				<td>{{index}}</td>
				<td><input type="text" class="form-control" name="name"/></td>
				<td><input type="text" class="form-control" name="poField"/></td>
				<td>
											<div class="group">
												<div class="">
													<input type="hidden" id="propType" name="propType"
														value="${modelPropParam.propType}" /> <input type="text"
														class="form-control dropdownTree"
														data-toggle="dropdownTree" data-dic="propType"
														data-key="#propType"
														value="${f:getDictLabel(modelPropParam.propType, 'propType', 'key', '')}" />
												</div>
										</td>
										<td>
											<div class="group">
												<div class="">
													<select name="tableName{{index}}" style="display:none;width:100%"
														class="form-control"
														data-toggle="select2" data-multiple="false"
														data-ajax="${ctx }/platform/codegen/tableConfig/tableList.htm"
													>
													</select>
												</div>
											</div>
										</td>
										<td>
											<select name="select{{index}}" class="form-control" >
											</select>
										</td>
										<td>
											<a class="btn btn-primary fa fa-remove" href="javascript:void(0);" onclick="modelProp.removeSub('modelPropParamList',this);"><span>删除</span></a>
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
	src="${ctx}/js/lc/loanp/model/modelProp.js"></script>
<script type="text/javascript"
	src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
</html>






