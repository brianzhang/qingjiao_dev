<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
<%@include file="/commons/page/codegen.jsp" %>
</head>
<body>
	<div class="wrapper wrapper-content col-sm-12">
		<table name="s:param" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">参数列表</div>
			</caption>
			<thead>
				<tr>
	       			 <th>参数名</th>
	       			 <th>参数来源</th>
	       			 <th>参数值</th>
		    	</tr>
			</thead>
			<tbody>	
			</tbody>
		</table>
	</div>
	
	<script type="text/html" id="s:param:TrTemplate">
	<tr>
		<td>
			<input type="hidden" name="name" value="{{name}}"/>
			<span>{{name}}</span>
		</td>
		<td>
			<input type="hidden" name="source" value="{{source}}"/>
			<span>{{source}}</span>
		</td>
		<td>
			<input type="hidden" name="{{value}}"  value="{{value}}"/>
		</td>
	</tr>
	</script>
	<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/data/datasetParamDialog.js"></script>
</body>
</html>