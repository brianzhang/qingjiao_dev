<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript"	src="${ctx}/js/lc/platform/auth/subsystem.js"></script>
	</head>
	<body class="gray-bg">
		<div class="ui-layout-west">
				<div class="layout-header ">
        				<h5>子系统管理</h5>
        				<div class="layout-tools">
        					<a herf="javascript:void(0);" class="pinBtn"><i class="fa fa-angle-double-left"></i></a>
                      </div>
         		</div>
				<div class="tree-toolbar" >
					<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
					<a class="btn btn-primary fa fa-expand" title="展开"></a> 
					<a class="btn btn-primary fa fa-compress" title="收缩"></a>
				</div>
				<div id="subsystemTree" class="ztree" ></div>	
		</div>
		<div class="ui-layout-center"> 
			 <div class="treeFrame">
					  <iframe id="listFrame" src="get.htm?tree=true"  frameborder="no" width="100%" height="100%"></iframe>
				</div>
		</div>
		
		<div id="subsystemMenu"  class="bootstrap-contextmenu" >
	          <ul class="dropdown-menu" role="menu">
	              <li><a data-action="node_add" tabindex="-1"  ><i class="fa fa-add"></i>&nbsp;&nbsp;增加子系统</a></li>
	              <li><a  data-action="node_edit" tabindex="-1"><i class="fa fa-edit"></i>&nbsp;&nbsp;编辑子系统</a></li>
	              <li><a data-action="node_del"  tabindex="-1"><i class="fa fa-remove"></i>&nbsp;&nbsp;删除子系统</a></li>
	          </ul>
	      </div>
	</body>
</html>