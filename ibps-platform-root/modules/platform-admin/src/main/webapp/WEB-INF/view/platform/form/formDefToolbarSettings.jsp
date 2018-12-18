<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
		<link rel="icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
		<link rel="shortcut icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
		<!-- js -->
		<script type="text/javascript" src="${ctx}/js/dynamic.jsp"></script>
		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='${ctx}/js/plugins/jquery/jquery.min.js'>"+"<"+"/script>");
		</script>
		<!-- <![endif]-->
		<!--[if IE]>
		<script type="text/javascript">
			 window.jQuery || document.write("<script src='${ctx}/js/plugins/jquery/jquery1x.min.js'>"+"<"+"/script>");
		</script>
		<![endif]-->
		<link  rel="stylesheet" type="text/css" href="${ctx}/js/plugins/ueditor/themes/builder/css/UBuilder.css"></link>
		<script type="text/javascript" src="${ctx}/js/plugins/ueditor/builder/utils.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/ueditor/builder/UBuilder.js"></script>
		<script type="text/javascript">
			$(function(){
				var toolbars =  frameElement.dialog.params;
				UBuilder.main.init(toolbars);
			});
			
			function getData(){
				return UBuilder.main._getToolsByOrder(false);
			}
		
			function cleanData(){
				return UBuilder.main._resetFunSelect();
			}
		</script>
			<body>
			<div class="wrapper wrapper-content col-sm-12">
                    <div class="section">
                        <h3>工具栏(双击可以选中，拖动可以排序)</h3>
                        <div id="J_funAll" class="funAll config">
                            <div id="J_funSelect" class="funSelect">
                                <div id="J_selectHead" class="selectHead"></div>
                                <div id="J_selectBody" class="selectBody"></div>
                            </div>
                            <div class="funTip">
                                <span id="J_funCount" class="funCount"></span>
                                <span id="J_fullScreenTip" style="display: none">(全屏按钮将始终处于工具栏右上角)</span>
                                <span  id="J_clearFun" class="clearFun">清空选择</span>
 								 <span id="J_delFun" name="减少一行" class="delFun">—</span>
                                <span id="J_addFun" name="增加一行" class="addFun">+</span> 
       				<!-- 			<span id="J_addSeparate" name="增加分割线" class="addSeparate">|</span> -->
                            </div>
                            <div id="J_dragCon" class="section dragCon"></div>
                        </div>
                    </div>
                   
			</div>
	</body>
</html>