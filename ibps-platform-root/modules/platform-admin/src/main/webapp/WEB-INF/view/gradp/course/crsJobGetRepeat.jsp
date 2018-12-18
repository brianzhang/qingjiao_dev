<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<%-- <script type="text/javascript" src="${ctx}/js/lc/commons/control/Attachement.js"></script> --%>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsTch.js"></script>
<style>
td{
	text-align:center
}
</style>
</head>
<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="">
			<form class="fr-form">

				<br>
				<table class="table table-bordered">
					<thead>
						<tr>
							<td>作业一</td>
							<td>作业二</td>
							<td>相似度</td>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
				<script>
					var add = $('tbody')
					var params = frameElement.dialog.params
					$.each(params, function(n, o) {
						var td1 = make(o.doc1)
						var td2 = make(o.doc2)
						var td3 = '<span style="color:red">'+o.similarity+'</span>'
						var item = '<tr><td>' + td1 + '</td><td>' + td2
								+ '</td><td>' + td3 + '</td></tr>'
						add.append(item)
					});
					//for ( var o in params) {

					//}
					function make(str) {
						return '<div name="div_attachment_container" data-rights="r">'
								+ '<div class="fr-files"></div>'
								+ '<textarea style="display: none" data-control="attachment">'
								+ str+'</textarea>'
								+ '</div>'
					}
				</script>
				<%-- 			<form class="fr-form" id="crsTchForm" action="save.htm">
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label"></label>
						<div class="fr-form-block">
							<div name="div_attachment_container"  data-media=""
								data-media_type="docs" data-max_file_size="5"
								data-max_file_quantity="1">
								<div class="fr-files" ></div>
								<textarea style="display: none"  data-control="attachment"
									name="m:myPaper:stuppfid" validate="{required:false}">${myPaper.stuppfid}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label"></label>
						<div class="fr-form-block">
							<div name="div_attachment_container"  data-media=""
								data-media_type="docs" data-max_file_size="5"
								data-max_file_quantity="1">
								<div class="fr-files" ></div>
								<textarea style="display: none"  data-control="attachment"
									name="m:myPaper:stuppfid" validate="{required:false}">${myPaper.stuppfid}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">相似度</label>
						<div class="fr-form-block">
							<p class="form-control-static">${crsJob.showStatus}</p>
						</div>
					</div>
				</div>
			</form>
 --%>
		</div>
	</div>
</body>
</html>
