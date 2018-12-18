<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>

</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="${returnUrl }" class="btn btn-primary fa fa-back"><span>返回</span></a>
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>保存</span></a>
			</div>
		</div>
		<div class="">
			<form class="fr-form" id="crsStdForm" action="save.htm">
				<input type="hidden" name="m:crsStd:id" value="${crsStd.id}" />
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">学号</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:crsStd:stdNum"
								value="${crsStd.stdNum}" validate="{required:false}" />
						</div>
					</div>
					<div class="fr-form-group">
						<label class="fr-control-label">通知单编号</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:crsStd:crsTchId"
								value="${crsStd.crsTchId}" validate="{required:false}" />
						</div>
					</div>
				</div>
			</form>

		</div>
	</div>
</body>
<script type="text/javascript">
var returnUrl = '${returnUrl}';
</script>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsStd.js"></script>
</html>
