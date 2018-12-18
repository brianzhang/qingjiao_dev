<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/bpmFormList.js"></script>
	</head>
	<body>
		<div class="ui-layout-west">
			<div class="layout-header ">
    				<h5>自定义表单管理</h5>
    				<div class="layout-tools">
    					<a herf="javascript:void(0);" class="pinBtn"><i class="fa fa-angle-double-left"></i></a>
                    </div>
    			</div>
    			<div style="width: 100%;">
					<input type="text" placeholder="请输入表名" name="tableName" id="tableName" style="width:100%;height:25px">
			</div>
				<div class="tree-toolbar" >
					<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>查询</span></a>
				</div>
				<div id="bpmFormTree" class="ztree" ></div>	
		</div>
		<div class="ui-layout-center"> 
			 <div class="treeFrame">
					  <iframe id="listFrame" src="detail.htm"  style="overflow-y:hidden"  frameborder="no" width="100%"  height="100%"></iframe>
				</div>
		</div>
	</body>
</html>