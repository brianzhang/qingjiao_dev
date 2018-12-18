<#assign url ="ctx}/"+app+"/"+module+"/"+classVar>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="<#noparse>${</#noparse>ctx}/js/${cAlias}/${app}/${module}/${classVar}.js"></script>
		<script type="text/javascript">
			var ${classVar}Tree;
		</script>
		<title>${comment}</title>
	</head>
	<body>
		<div class="ui-layout-west">
			<div class="layout-header">
				<h5>${comment}</h5>
				<div class="layout-tools">
					<a href="javascript:void(0);" class="pinBtn"> <i class="fa fa-angle-double-left"></i>
					</a>
				</div>
			</div>
			
			<div class="tree-toolbar">
				<a class="btn btn-primary fa fa-refresh" title="刷新"></a> <a
					class="btn btn-primary fa fa-expand" title="展开"></a> <a
					class="btn btn-primary fa fa-compress" title="收缩"></a>
			</div>
			<div id="${classVar}Tree" class="ztree"></div>
		</div>
		
		<div class="ui-layout-center">
			<div class="treeFrame">
				<iframe id="listFrame" src="get.htm" frameborder="no" width="100%"
					height="100%"></iframe>
			</div>
		</div>
				
		<div id="groupMenu" class="bootstrap-contextmenu">
			<ul class="dropdown-menu" role="menu">
				<li><a data-action="node_add" tabindex="-1">
					<i class="fa fa-add"></i>&nbsp;&nbsp;增加</a></li>
				<li><a data-action="node_edit" tabindex="-1">
					<i class="fa fa-edit"></i>&nbsp;&nbsp;编辑</a></li>
				<li><a data-action="node_del" tabindex="-1">
					<i class="fa fa-remove"></i>&nbsp;&nbsp;删除</a></li>
			</ul>
		</div>
	
		<div id="rootMenu" class="bootstrap-contextmenu">
			<ul class="dropdown-menu" role="menu">
				<li><a data-action="node_add" tabindex="-1"><i
						class="fa fa-add"></i>&nbsp;&nbsp;增加</a></li>
			</ul>
		</div>
	</body>
</html>