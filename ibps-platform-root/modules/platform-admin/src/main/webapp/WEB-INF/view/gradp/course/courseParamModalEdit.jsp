<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<link rel="stylesheet" type="text/css"
	href="${ctx }/styles/commons/css/gxy/dist/bootstrap-clockpicker.min.css">
<link rel="stylesheet"
	href="${ctx }/styles/commons/css/gxy/jqueryui/jquery-ui-1.10.4.custom.min.css" />

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
			<form class="fr-form" id="courseParamModalForm" action="save.htm">
				<input type="hidden" name="m:courseParamModal:id" id="id"
					value="${courseParamModal.id}" />
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">分值模板名称</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" id="cname"
								value="${courseParamModal.name}"
								validate="{required:false},maxlength:50}" />
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
										href="javascript:courseParamModal.addSub('courseParamPoList');"><span>添加</span></a>
									<a class="btn btn-primary fa fa-remove"
										href="javascript:courseParamModal.removeSubAll('courseParamPoList');"><span>重置</span></a>
								</div>
							</div>
						</div>
						<table name="courseParamPoList" class="table table-bordered">
							<thead>
								<tr>
									<td>序号</td>
									<td>作业名称</td>
									<td>分值</td>
									<td>开始周</td>
									<td>开始日</td>
									<td>开始时间</td>
									<td>有效时间</td>
									<td>周期</td>
									<td>数量</td>
									<!-- <td>分数是否折合</td> -->
									<!-- <td>性质</td> -->
									<!-- <td>作业最少字数</td> -->
									<td>管理</td>
								</tr>
							</thead>
							<tbody>
								<c:forEach var="courseParamPo" varStatus="status"
									items="${courseParamPoList}">
									<tr>
										<td>${status.index + 1}</td>
										<td><input type="text" class="form-control" name="name"
											value="${courseParamPo.name}" /></td>
										<td><input type="text" class="form-control spinner"
											name="scorePower" validate="{required:false}"
											value="${courseParamPo.scorePower}" /></td>
										<td><select name="startWeek" class="form-control"
											validate="{required:false}">
												<c:forEach var="week" varStatus="i" items="${weekList }">
													<option value="${i.index}"
														<c:if test="${courseParamPo.startWeek==i.index}">selected="selected"</c:if>>${week }</option>
												</c:forEach>
										</select></td>
										<td><select name="startDay" class="form-control"
											validate="{required:false}">
												<c:forEach var="day" varStatus="i" items="${dayList }">
													<option value="${i.index}"
														<c:if test="${courseParamPo.startDay==i.index}">selected="selected"</c:if>>${day }</option>
												</c:forEach>
										</select></td>
										<td>
											<div class="input-group clockpicker" data-placement="right"
												data-align="top" data-autoclose="true">
												<input type="text" class="form-control" name="startTime"
													readonly value="${courseParamPo.startTime }"> <span
													class="input-group-addon"> <span
													class="glyphicon glyphicon-time"></span>
												</span>
											</div>
										</td>
										<td><select name="period" class="form-control"
											validate="{required:false}">
												<c:forEach var="cyc" varStatus="i" items="${cycleList }">
													<option value="${i.index}"
														<c:if test="${courseParamPo.period==i.index}">selected="selected"</c:if>>${cyc }</option>
												</c:forEach>
										</select></td>
										<td><select name="cycle" class="form-control"
											validate="{required:false}">
												<c:forEach var="cyc" varStatus="i" items="${cycleList }">
													<option value="${i.index}"
														<c:if test="${courseParamPo.cycle==i.index}">selected="selected"</c:if>>${cyc }</option>
												</c:forEach>
										</select></td>
										<td><input type="text" class="form-control spinner"
											name="count" readonly value="${courseParamPo.count}"
											validate="{number:true,maxlength:50}" /></td>
										<%-- <td><select name="isTrans" class="form-control"
											validate="{required:false},number:true}">
												<option value="0"
													<c:if test="${courseParamPo.isTrans==0}">selected="selected"</c:if>>否</option>
												<option value="1"
													<c:if test="${courseParamPo.isTrans==1}">selected="selected"</c:if>>是</option>
										</select></td>
										<td><input type="text" class="form-control spinner"
											name="minSize" validate="{number:true}"
											value="${courseParamPo.minSize}" /></td> --%>
										<td><a class="btn btn-primary fa fa-remove"
											href="javascript:void(0);"
											onclick="courseParamModal.removeSub('courseParamPoList',this);"><span>删除</span></a>
										</td>
									</tr>
								</c:forEach>

							</tbody>
							<tfoot>
								<c:if test="${empty course || empty courseParamPoList}">
									<c:set var="subSize" scope="session" value="0" />
								</c:if>
								<c:if test="${not empty course && not empty courseParamPoList}">
									<c:set var="subSize" scope="session"
										value="${courseParamPoList.size()}" />
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

	<script type="text/html" id="courseParamPoListTrTemplate">
								<tr>
										<td>${status.index + 1}</td>
										<td><input type="text" class="form-control" name="name"
											value="${courseParamPo.name}" /></td>
										<td><input type="text" class="form-control spinner" name="scorePower"
											validate="{number:true}"
											value="1" /></td>
										<td><select name="startWeek" class="form-control"
											validate="{required:false}">
												<c:forEach var="week" varStatus="i" items="${weekList }">
													<option value="${i.index}"
														<c:if test="${courseParamPo.startWeek==i.index}">selected="selected"</c:if>>${week }</option>
												</c:forEach>
										</select></td>
										<td><select name="startDay" class="form-control"
											validate="{required:false}">
												<c:forEach var="day" varStatus="i" items="${dayList }">
													<option value="${i.index}"
														<c:if test="${courseParamPo.startDay==i.index}">selected="selected"</c:if>>${day }</option>
												</c:forEach>
										</select></td>
										<td>
											<div class="input-group clockpicker" data-placement="right"
												data-align="top" data-autoclose="true">
												<input type="text" class="form-control" name="startTime" readonly
													value="00:00"> <span class="input-group-addon">
													<span class="glyphicon glyphicon-time"></span>
												</span>
											</div>

										</td>
										<td><select name="period" class="form-control"
											validate="{required:false}">
												<c:forEach var="cyc" varStatus="i" items="${cycleList }">
													<option value="${i.index}">${cyc }</option>
												</c:forEach>
										</select></td>
										<td><select name="cycle" class="form-control"
											validate="{required:false}">
												<c:forEach var="cyc" varStatus="i" items="${cycleList }">
													<option value="${i.index}"
														<c:if test="${courseParamPo.cycle==i.index}">selected="selected"</c:if>>${cyc }</option>
												</c:forEach>
										</select></td>
										<td><input type="text" class="form-control spinner" name="count" readonly
											value="1"
											validate="{number:true,maxlength:50}" /></td>
										<td><a class="btn btn-primary fa fa-remove"
											href="javascript:void(0);"
											onclick="courseParamModal.removeSub('courseParamPoList',this);"><span>删除</span></a>
										</td>
									</tr>
		</script>
</body>
<script type="text/javascript"
	src="${ctx }/js/lc/gradp/course/jqueryui/jquery.spinner.js"></script>
<script type="text/javascript"
	src="${ctx }/js/lc/gradp/course/jqueryui/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript"
	src="${ctx }/js/lc/gradp/course/clock/bootstrap-clockpicker.min.js"></script>
<script type="text/javascript"
	src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/gradp/course/courseParamModal.js"></script>
</html>





