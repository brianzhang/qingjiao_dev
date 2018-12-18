<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/course.js"></script>
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
			<form class="fr-form" id="courseForm" action="save.htm" method="post">
				<input type="hidden" name="m:course:id" value="${course.id}" />
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">课程编号</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:course:num"
								value="${course.num}" validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">课程名称</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:course:name"
								value="${course.name}" validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">学时</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:course:period"
								value="${course.period}" validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">学分</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:course:credit"
								value="${course.credit}" validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">性质</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:course:category" value="${course.category}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">管理学期</label>
						<div class="fr-form-block">
							
							<select class="fr-form-control" name="m:course:college">
								<c:if test=""></c:if><option value="">请选择</option>
								<c:forEach items="${orgmap}" var="item">
									<option value="${item.key}@${item.value}"
									<c:if test="${course.college==item.key}">selected="selected"</c:if>>${item.key}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">考试性质</label>
						<div class="fr-form-block">
							<select class="fr-form-control" name="m:course:testing"
								value="${course.testing}" validate="{required:false}">
								<option value="">请选择</option>
								<option value="考查"
									<c:if test="${course.testing=='考查'}">selected="selected"</c:if>>考查</option>
								<option value="考试"
									<c:if test="${course.testing=='考试'}">selected="selected"</c:if>>考试</option>
							</select>
						</div>
					</div>
				</div>
			</form>

		</div>
	</div>
</body>
</html>
