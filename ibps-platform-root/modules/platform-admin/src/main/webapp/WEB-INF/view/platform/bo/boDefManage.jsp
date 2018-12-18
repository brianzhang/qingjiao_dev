<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript">
			var isMain = "${isMain}";
			var action = "${action}";
		</script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bo/boDef.js"></script>
	</head>
	
	<body  class="gray-bg">
		<!-- 顶部 -->
		<div class="ui-layout-north"   style="border-bottom: 0;">
			<div class="panel-toolbar"  style="border-bottom: 0;">
				<div class="buttons">
					<c:if test="${action == 'edit' }">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
     				<c:if test="${not empty defId && defId != null}">
			        <a  href="javascript:void(0);" class="btn btn-primary fa fa-release"><span>发布新版本</span></a>
			       	</c:if>
			       	</c:if>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
		</div>
		
		<!-- 左部 -->
	 	<div class="ui-layout-west">
 			<div class="layout-header">
  				<h5>业务对象管理</h5>
 				<div class="layout-tools">
 					<a herf="javascript:void(0);" class="pinBtn"><i class="fa fa-angle-double-left"></i></a>
              	</div>
    		</div>
			<div class="tree-toolbar" >
				<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
				<a class="btn btn-primary fa fa-expand" title="展开"></a> 
				<a class="btn btn-primary fa fa-compress" title="收缩"></a>
			</div>
			<div id="boDefTree" class="ztree" ></div>	
		</div>
		
		<!-- 中间 -->
		<div class="ui-layout-center">
			<div class="treeFrame">
		  		<iframe id="listFrame" src="edit.htm?defId=${defId }&isMain=${isMain}"  frameborder="no" width="100%" height="100%"></iframe>
		  	</div>
		</div>
			
		<!-- 主业务对象右键菜单 -->
		<div id="subMenu" class="bootstrap-contextmenu">
	    	<ul class="dropdown-menu" role="menu">
            	<li><a data-action="node_add" tabindex="-1"><i class="fa fa-add"></i>&nbsp;&nbsp;添加下级业务对象</a></li>
              	<li><a data-action="node_edit" tabindex="-1"><i class="fa fa-edit"></i>&nbsp;编辑当前业务对象</a></li>
              	<li><a data-action="node_del" tabindex="-1"><i class="fa fa-remove"></i>&nbsp;&nbsp;删除当前业务对象</a></li>
         	</ul>
	    </div>
	    
	    <!-- 根节点右键菜单 -->
		<div id="topMenu" class="bootstrap-contextmenu">
		    <ul class="dropdown-menu" role="menu">
		         <li><a data-action="node_add" tabindex="-1"><i class="fa fa-add"></i>&nbsp;&nbsp;增加主业务对象</a></li>
		    </ul>
		</div>
		
		<!-- 隐藏信息 -->
		<input type="hidden" id="defId" value="${defId }"/>
		<input type="hidden" id="profix" value="${profix }"/>
		<textarea id="boDefJson" rows="0" cols="0" style="display: none;">${fn:escapeXml(boDefJson)}</textarea>
	</body>
</html>