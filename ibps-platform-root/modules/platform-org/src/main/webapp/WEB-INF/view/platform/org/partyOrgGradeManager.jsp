<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<%@include file="/commons/page/layout.jsp" %>
<f:link href="ztree/ztree.css" isCommon="false"></f:link>
<script type="text/javascript">
	//当前访问系统
	var hasDelMenuItem = []; // 主维度中、新增的节点、需要在下次切换岗位时删除
	var rootMenu;
	//树
	var orgTree;
	var partyOrgAuths = '${partyOrgAuths}';
	var prem = '${prem}';
</script>
<script type="text/javascript"
	src="${ctx}/js/plugins/nicescroll/nicescroll.min.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/commons/plugins/contextMenu.js"></script>
<script type="text/javascript"
	src="${ctx}/js/plugins/ztree/jquery.ztree.min.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/org/partyOrgGradeManager.js"></script>
</head>
<body class="gray-bg">
	<div class="ui-layout-west">
		<div class="layout-header">
			<h5>组织管理</h5>
			<div class="layout-tools">
				<a herf="javascript:void(0);" class="pinBtn"> <i class="fa fa-angle-double-left"></i>
				</a>
			</div>
		</div>
		
		<div class="tree-toolbar">
			<a class="btn btn-primary fa fa-refresh" title="刷新"></a> <a
				class="btn btn-primary fa fa-expand" title="展开"></a> <a
				class="btn btn-primary fa fa-compress" title="收缩"></a>
		</div>
		<div id="orgTree" class="ztree"></div>
	</div>
	
	<div class="ui-layout-center">
		<div class="treeFrame">
			<iframe id="listFrame" src="gradeInfo.htm" frameborder="no" width="100%"
				height="100%"></iframe>
		</div>
	</div>
			
	<div id="groupMenu" class="bootstrap-contextmenu">
		<ul class="dropdown-menu" role="menu">
			<li><a data-action="node_add" tabindex="-1"><i
					class="fa fa-add"></i>&nbsp;&nbsp;增加</a></li>
			<li><a data-action="node_edit" tabindex="-1"><i
					class="fa fa-edit"></i>&nbsp;&nbsp;编辑</a></li>
			<li><a data-action="node_del" tabindex="-1"><i
					class="fa fa-remove"></i>&nbsp;&nbsp;删除</a></li>
			<li class="divider"></li>
			<li><a data-action="node_set" tabindex="-1"><i
					class="fa fa-sort"></i>&nbsp;&nbsp;设置分级管理员</a></li>
			<li><a data-action="node_addPOS" tabindex="-1"><i
					class="fa fa-arrows-v"></i>&nbsp;&nbsp;新增岗位</a></li>
		</ul>
	</div>

	<div id="rootMenu" class="bootstrap-contextmenu">
		<ul class="dropdown-menu" role="menu">
			<li><a data-action="node_add" tabindex="-1"><i
					class="fa fa-add"></i>&nbsp;&nbsp;增加</a></li>
		</ul>
	</div>
	
	<div id="addByMainFromself" class="bootstrap-contextmenu">
		<ul class="dropdown-menu" role="menu">
			<li><a data-action="node_addByMainFromself" tabindex="-1"><i
					class="fa fa-add"></i>&nbsp;&nbsp;新增</a></li>
		</ul>
	</div>
</body>
</html>