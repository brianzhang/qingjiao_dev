<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript">
	var index =null;
	function upload(callback){
		var path = $('#xmlFile').val();
		var extNaem = path.substring(path.length-3, path.length);
		if(extNaem!='zip'){
			DialogUtil.warn("请选择 *.zip文件进行导入!");
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
	<form id="importForm" action="importBo.htm" method="post" enctype="multipart/form-data">
		<table class="table-form" cellspacing="0">
			<tr>
				<th><span>选择文件:</span></th>
				<td>
					<input type="file" size="100" name="xmlFile" id="xmlFile" accept="application/zip"
					 	   class="inputText input-wh-9" validate="{required:true}"/>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>