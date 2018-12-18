<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>

<script>
	$(function(){
		$('a.fa-upload').click(function(){
			var url = __ctx + "/gradp/paper/myPaper/imbort2.htm?type=${type}";
			DialogUtil.dialog({
				title : '导入${pos}名单',
				content : url,
				area : [ '40%', '50%' ],
				btn : [{
							label : '上传',
							iconCls : 'btn btn-success fa fa-ok',
							action : function(dialog, index) {
								DialogUtil.getChildFrameWindow(index).upload(function(rtn) {
										if (rtn) {
											location.reload();
										}
									});
								}
							},
							{
								label : '取消',
								iconCls : 'btn btn-success fa fa-cancel',
								action : function(dialog, index) {
									DialogUtil.close(index);
								}
							}]
				});
		})
	})();
</script>

</head>
<body>
	<h1 style="margin:5px;text-align:center;line-height:70px">导入${pos}名单</h1>
	<div class="buttons"> 		
				<a class="btn btn-primary fa fa-search" href="${ctx}/gradp/paper/myPaper/role.htm " ><span>更换角色</span></a>
	</div>
	<form id="importForm" method="post" enctype="multipart/form-data">
		<table class="table-form" cellspacing="0">
			<tr>
				<th><span>选择文件:</span></th>
				<td>
					<a  class="btn btn-primary fa fa-upload">选择文件</a>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>