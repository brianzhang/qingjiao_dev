<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript">
	var index = null;
	function upload(callback) {
		var path = $('#xlsFile').val();
		var extNaem = path.substring(path.length - 3, path.length);
		if (extNaem != 'xls') {
			DialogUtil.warn("请选择 *.xls文件进行导入!");
			return;
		}

		var frm = $('#importForm').form();
		frm.ajaxForm({
			success : function(responseText) {
				showResponse(responseText, callback);
			},
			error : function(msg) {
				DialogUtil.error(msg)
			}

		});
		if (frm.valid()) {
			index = DialogUtil.load();
			$('#importForm').submit();
		}
	}

	function showResponse(responseText, callbak) {
		DialogUtil.close(index);
		var result = new com.lc.form.ResultMessage(responseText);
		if (result.isSuccess()) {
			DialogUtil.alert(result.getMessage(), function() {
				DialogUtil.closeAll();
				callbak(true);
			});
		} else {
			if (result.isWarn()) {
				DialogUtil.warn(result.getMessage());
			} else {
				DialogUtil.error(result.getMessage(), result.getCause());
			}
		}
	}
	function in_click() {
		$('#xlsFile').click();
	}
</script>


</head>
<body>
	<h1 style="margin: 5px; text-align: center; line-height: 70px">导入${dataType}</h1>
	<form id="importForm" method="post"
		action="imbortXls.htm?type=${type }" enctype="multipart/form-data">
		<table class="table-form" cellspacing="0">
			<%-- <tr>
				<th><span>选择班级:</span></th>
				<td><select name="clazz"
					class="form-control search-select" id="clazz" >
						<c:forEach items="${crsTchList }" var="crsTch">
							<option value="${crsTch.id }">${crsTch.crsName }-${crsTch.clazz }</option>
						</c:forEach>
				</select></td>
			</tr> --%>
			<tr>
				<th><span>选择文件:</span></th>
				<td><a class="btn btn-primary fa fa-upload"
					onclick="in_click()">选择导入文件</a> <input style="display: none"
					type="file" size="40" name="xlsFile" id="xlsFile"
					accept="	application/vnd.ms-excel" class="inputText input-wh-9"
					validate="{required:true}" /></td>
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