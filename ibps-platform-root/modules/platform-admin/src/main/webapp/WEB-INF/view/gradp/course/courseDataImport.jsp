<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<%@include file="/commons/page/codegen.jsp"%>
<script>
	$(
			function() {
				$('a.fa-upload')
						.click(
								function() {
									var url = __ctx
											+ "/gradp/course/course/selectImportFile.htm?type=${type}&crs_job_id=${crs_job_id}";
									DialogUtil
											.dialog({
												title : '导入${dataType}',
												content : url,
												area : [ '40%', '50%' ],
												btn : [
														{
															label : '导入',
															iconCls : 'btn btn-success fa fa-ok',
															action : function(
																	dialog,
																	index) {
																DialogUtil
																		.getChildFrameWindow(
																				index)
																		.upload(
																				function(
																						rtn) {
																					if (rtn) {
																						location
																								.reload();
																					}
																				});
															}
														},
														{
															label : '取消',
															iconCls : 'btn btn-success fa fa-cancel',
															action : function(
																	dialog,
																	index) {
																DialogUtil
																		.close(index);
															}
														} ]
											});
								})
			})();
</script>

</head>
<body>
	<h1 style="margin: 5px; text-align: center; line-height: 70px">导入${dataType}</h1>
	<form id="importForm" method="post" enctype="multipart/form-data">
		<table class="table-form" cellspacing="0">
			<tr>
				<th><span>选择文件:</span></th>
				<td><a class="btn btn-primary fa fa-upload">选择导入文件</a></td>
			</tr>
			<tr>
				<th>导入模板下载</th>
				<td><div class="col-sm-12">
						<div name="div_attachment_container" data-media="" data-rights="r"
							data-media_type="docs" data-max_file_size=""
							data-max_file_quantity="1">
							<div class="fr-files"></div>
							<textarea style="display: none" data-control="attachment"
								validate="{required:false}">[{"fileName":"${dataType }-模板","id":"${fid }"}]</textarea>
						</div>
					</div></td>
			</tr>
		</table>
	</form>

</body>
</html>