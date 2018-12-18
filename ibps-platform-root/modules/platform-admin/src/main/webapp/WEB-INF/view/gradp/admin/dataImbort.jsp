<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript">
	var index = null;
	function upload() {
		var path = $('#xlsFile').val();
		var extNaem = path.substring(path.length - 3, path.length);
		if (extNaem != 'xls') {
			DialogUtil.warn("请选择 *.xls文件进行导入!");
			return;
		}

		var frm = $('#importForm').form();
		frm.ajaxForm({
			dataType : 'json',
			success : function(data) {
				data.success ? DialogUtil.alert(data.msg) : DialogUtil.error(data.msg);
				DialogUtil.close(index);
				location.reload();
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

	function in_click() {
		$('#xlsFile').click();
	}
</script>


</head>
<body>
	<h1 style="margin: 5px; text-align: center; line-height: 70px">导入${dataType}，请按照模板格式准备数据</h1>
	<form id="importForm" method="post"
		action="imbortXls.htm?type=${type }&crsTchId=${crsTchId}" enctype="multipart/form-data">
		<table class="table-form" cellspacing="0">
			<tr>
				<th><span>选择文件:</span></th>
				<td><a class="btn btn-primary fa fa-upload"
					onclick="in_click()">选择导入文件</a> <input style="display: none"
					type="file" size="40" name="xlsFile" id="xlsFile"
					accept="	application/vnd.ms-excel" class="inputText input-wh-9" onchange="upload()"/></td>
			</tr>
			<tr>
				<th>备注</th>
				<td>xls文件中<span style="color:red">第一行</span>各列中含有<span style="color:red">${fields }</span>即可！</td>
			</tr>
		</table>
	</form>

</body>
</html>