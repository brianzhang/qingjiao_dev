<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@include file="/commons/page/codegen.jsp"%>
<f:link href="fengmap/style.css" />
<f:link href="fengmap/common.css" />
<f:link href="fengmap/iconfont/iconfont.css" />
<title>Insert title here</title>
<style type="text/css">
.full {
	height: 100%;
}
</style>
</head>
<body>
	<div id="map" class="full"></div>
	<!-- data-backdrop="false" -->
	<div id="dlgModelInfo" class="modal fade">
		<div class="modal-dialog top">
			<div class="modal-content">
				<div class="modal-header">
					<div class="step-2  editable">
						<a href="javascript:void(0);" class="btn btn-default green fa fa-save" name="modal-save-n"style="float: right"><span>&nbsp;保&nbsp;存</span></a>
						<a href="javascript:void(0);" class="btn btn-default red fa fa-back change"  style="float: right;margin-right:5px;"><span>&nbsp;上一步</span></a>
					</div>
					
					<h3 class="modal-title">巡课记录</h3>
				</div>
				<div class="modal-body">
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-12" id="m-title"></div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<label class="fr-control-label">班级：</label>
								<div class="fr-form-block">
									<p class="form-control-static" id="className" style="line-height: 15px;"></p>
								</div>
							</div>
							<div class="col-md-6">
								<label class="fr-control-label">节次：</label>
								<div class="fr-form-block">
									<p class="form-control-static" id="curTime" style="line-height: 15px;"></p>
								</div>
							</div>
							<div class="col-md-12">
								<label class="fr-control-label">教师：</label>
								<div class="fr-form-block">
									<p class="form-control-static" id="tch" style="line-height: 15px;"></p>
								</div>
							</div>
							
						</div>
						<div class="step-1 ">
							<div class="row disEditable hidden">
								<div class="col-md-12">
									<label class="fr-control-label">巡课情况：</label>
									<div class="fr-form-block">
										<p class="form-control-static green" style="line-height: 15px;">正常</p>
									</div>
								</div>
							</div>
							<div class="row editable">
								<div class="col-md-12">
									<label class="fr-control-label">巡课情况：</label>
									<div class="fr-form-block">
										<a href="javascript:void(0);" class="btn btn-success fa fa-ok " name="modal-save-p" ><span>&nbsp;正&nbsp;常</span></a>
										<a href="javascript:void(0);" class="btn btn-danger fa fa-cancel change" ><span>&nbsp;异&nbsp;常</span></a>
									</div>
								</div>
							</div>
						</div>
						<div class="step-2 hidden">
							<div class="row actTch">
								<div class="col-md-12">
									<label class="fr-control-label">实际上课教师：</label>
									<div class="fr-form-block">
										<input type="text" id="actTch" class="fr-form-control" />
									</div>
								</div>
							</div>
							<div class="row reason" >
								<div class="col-md-12">
									<label class="fr-control-label">说明原因：</label>
									<div class="fr-form-block">
										<input type="text" id="reason" class="fr-form-control" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<div class="operating">
		<a class="btn btn-default green fa fa-save hidden">&nbsp;保&nbsp;存</a>
		<a class="btn btn-default gray fa fa-trash hidden">&nbsp;清&nbsp;空</a>
		<a class="btn btn-default blue fa fa-back hidden">撤&nbsp;销</a> <a
			class="btn btn-default red fa fa-close hidden">关&nbsp;闭</a>
	</div>
	<script type="text/javascript">
		var mapId;
	</script>
	<script type="text/javascript"
		src="${ctx }/js/plugins/fengmap/fengmap.min.js"></script>
	<script type="text/javascript"
		src="${ctx }/js/plugins/jquery/plugins/jquery.nicescroll.js"></script>
	<script type="text/javascript"
		src="${ctx }/js/plugins/fengmap/layerGroup.js"></script>
	<script type="text/javascript"
		src="${ctx }/js/plugins/fengmap/layerList.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/fengmap/map.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/patrolp/control/patrolProgram.js"></script>

</body>
</html>