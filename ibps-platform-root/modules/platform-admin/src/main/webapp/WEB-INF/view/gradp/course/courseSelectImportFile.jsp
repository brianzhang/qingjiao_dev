<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>

<script type="text/javascript">
	var index =null;
	function upload(callback){
		var path = $('#xlsFile').val();
		var extNaem = path.substring(path.length-3, path.length);
		if(extNaem!='xls'){
			DialogUtil.warn("请选择 *.xls文件进行导入!");
			return;
		}
		
		var frm = $('#importForm').form();
		frm.ajaxForm({
			success : function(responseText){
				showResponse(responseText,callback);
			}
				
		});
		if (frm.valid()) {
			index = DialogUtil.load();
			$('#importForm').submit();
		}
	}
	
	function showResponse(responseText,callbak) {
		DialogUtil.close(index);
		var result = new com.lc.form.ResultMessage(responseText);
		if (result.isSuccess()) {
			DialogUtil.alert(result.getMessage(),function(){
				DialogUtil.closeAll();
				callbak(true);
			});	
		} else {
			if(result.isWarn()){
				DialogUtil.warn(result.getMessage());
			}else{
				DialogUtil.error(result.getMessage(),result.getCause());
			}
		}
	}
</script>
</head>
<body>
	<h1 style="margin:5px">请选择xls格式文件上传</h1>
	<form id="importForm" action="imbortXls.htm?type=${type }" method="post" enctype="multipart/form-data">
		<table class="table-form" cellspacing="0">
			<tr>
				<th><span>选择文件:</span></th>
				<td>
					<input type="file" size="40" name="xlsFile" id="xlsFile" accept="	application/vnd.ms-excel"
					 	   class="inputText input-wh-9" validate="{required:true}"/>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>