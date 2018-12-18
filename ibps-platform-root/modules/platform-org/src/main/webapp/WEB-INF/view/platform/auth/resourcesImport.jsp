<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<title>菜单资源导入</title>
	</head>
	<body >
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<form id="importForm" name="importForm" method="post"  class="form-horizontal"
			target="win" action="importXml.htm" enctype="multipart/form-data">
			<div class="row">
			 <table id="tableid" class="table" >
				<tr>
					<th width="22%">选择文件：</th>
					<td width="78%">
					<input type="file" size="40" name="xmlFile" id="xmlFile"  validate="{required:true}"/>
					<font>请导入xml文件</font>
					</td>						
				</tr>
			</table>				
			</div>
			<input type="hidden" name="resId" id="resId" value=""/>
			<input type="hidden" name="subSysId" id="subSysId" value=""/>
			<input type="hidden" name="cover" id="cover" value="false"/>
	    </form>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/js/lc/platform/auth/resources.js"></script>
</html>