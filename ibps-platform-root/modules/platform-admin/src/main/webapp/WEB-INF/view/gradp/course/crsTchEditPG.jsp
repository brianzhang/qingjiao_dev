<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link href="select2/select2.min.css" />
<f:link href="select2/select2-bootstrap.min.css" />
</head>
<body>
	<!-- 顶部按钮 -->
	<div id="mainBd"
		class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="${returnUrl }" class="btn btn-primary fa fa-back"><span>返回</span></a>
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save "><span>
						<c:choose>
							<c:when test="${admin }">保存</c:when>
							<c:otherwise>
								<c:choose>
									<c:when test="${empty copy }">生成作业</c:when>
									<c:otherwise>拷贝作业</c:otherwise>
								</c:choose>
							</c:otherwise>
						</c:choose>
				</span></a>
			</div>
		</div>
		<div class="col-sm-12">
			<form class="fr-form" id="crsTchForm" action="save.htm">
				<input
					type="hidden" class="fr-form-control" name="startTime"
					value="${crsTch.startTime}" validate="{required:false}" />
				<%-- <div class="group">
					<label class="col-sm-2 control-label">表名:</label>
					<div class="col-sm-4">
						<select id="tableName" name="tableName" class="form-control"
							data-value="${crsTch.crsNum }"
							data-comment="${tableConfig.tableComment }" data-toggle="select2"
							data-multiple="false"
							data-ajax="${ctx }/gradp/course/course/courseList.htm"
							validate="{required:true}">
						</select>
					</div>
				</div> --%>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">课程名称</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsName }</p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-6">
					<div class="<c:if test="${!admin }">hidden</c:if>">
						<div class="fr-form-group">
							<label class="fr-control-label">课程编号</label>
							<div class="fr-form-block">
								<input type="test" class="fr-form-control" name="crsNum"
									value="${crsTch.crsNum}" validate="{required:false}" />
							</div>
						</div>
						<div class="fr-form-group">
							<label class="fr-control-label">教师编号</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="tchNum"
									value="${crsTch.tchNum}" validate="{required:false}" />
							</div>
						</div>
						<div class="fr-form-group">
							<label class="fr-control-label">上课班级</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="clazz"
									value="${crsTch.clazz}" validate="{required:false}" />
							</div>
						</div>
						<div class="fr-form-group">
							<label class="fr-control-label">上课时间</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="time"
									value="${crsTch.time}" validate="{required:false}" />
							</div>
						</div>
						<div class="fr-form-group">
							<label class="fr-control-label">上课地点</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="location"
									value="${crsTch.location}" validate="{required:false}" />
							</div>
						</div>
						<div class="fr-form-group">
							<label class="fr-control-label">上课学期</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="term"
									value="${crsTch.term}" validate="{required:false}" />
							</div>
						</div>
						<div class="fr-form-group">
							<label class="fr-control-label">通知单编号</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="id"
									value="${crsTch.id}" validate="{required:false}" />
							</div>
						</div>
					</div>
					<c:choose>
						<c:when test="${empty copy }">
							<div class="fr-form-group">
								<label class="fr-control-label">绑定作业设置</label>
								<div class="fr-form-block">
									<select id="param" name="paramid"
										style="display: none; width: 100%" class="form-control"
										data-toggle="select2" data-multiple="false" data-value="" data-cooc="name"
										data-ajax="${ctx }/platform/codegen/tableData/select.htm">
									</select>
								</div>
							</div>
						</c:when>
						<c:otherwise>
							<div class="fr-form-group">
								<label class="fr-control-label">来源</label>
								<div class="fr-form-block">
									<select id="source" name="source"
										style="display: none; width: 100%" class="form-control" data-cooc="name,term,clazz"
										data-toggle="select2" data-multiple="false" data-value=""
										data-ajax="${ctx }/platform/codegen/tableData/select.htm?tableName=t_crs_tch INNER JOIN t_course ON t_crs_tch.crs_num = t_course.num&select=name,term,clazz&where=tch_num='${tchNum}'">
									</select>
								</div>
							</div>
						</c:otherwise>
					</c:choose>
					
				</div>
			</form>
		</div>
	</div>
</body>
<script type="text/javascript">
	var preUrl = '${returnUrl}';
	var admin = ${admin};
	var copy = false;
	<c:if test="${not empty copy }">
		copy = ${copy};
	</c:if>
</script>
<script type="text/javascript"
	src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
<script type="text/javascript"
	src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsTchPG.js"></script>
</html>
