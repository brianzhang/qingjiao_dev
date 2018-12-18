<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bo/boDef.js"></script>
		<script type="text/javascript" >
		
		window.onload = function(){
			document.getElementById("panel").style.height=document.body.clientHeight*0.99+"px";
			var level = frameElement.dialog.params.level;
			var data = frameElement.dialog.params.data;
			var url=__ctx+"/platform/bo/boDef/edit.htm?level="+level;
			$("#listFrame").attr("src",url);
			var listIframe =$("#listFrame")[0];
			//传递参数
			listIframe.params={
					data: data,
					level:level
			};
			//回调方法
			listIframe.callback = function(data){
				boDef.setTreeNode(data,data.id);
				boDef.loadExternalTree();
			}
		}
		
		</script>
	</head>
	<body  class="gray-bg">
		<!-- 顶部 -->
<!-- 			<div class="ui-layout-north"> -->
<!-- 				<div class="panel-toolbar "> -->
<!-- 						<div class="buttons"> -->
<!-- 							<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a> -->
<%-- 	      					<c:if test="${boDef !=null }"> --%>
<!-- 					        	<a  href="javascript:void(0);"   class="btn btn-primary fa fa-release"><span>发布新版本</span></a> -->
<%-- 					       </c:if> --%>
<!-- 							<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a> -->
<!-- 						</div> -->
<!-- 					</div>	 -->
<!-- 				</div> -->
			<!-- 左部 -->
		 	<div class="ui-layout-west">
		 			<div class="layout-header ">
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
				<div class="treeFrame" id="panel">
			  				<iframe id="listFrame" src="edit.htm?defId=${boDef.id }"  frameborder="no" width="100%" height="100%"></iframe>
			  		</div>		
			</div>
		<input type="hidden" id="defId" value="${boDef.id }"/>
		<textarea id="boDefJson" rows="0" cols="0" style="display: none;">${fn:escapeXml(boDefJson)}</textarea>
	</body>
</html>