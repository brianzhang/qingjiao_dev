<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<%@include file="/commons/page/layout.jsp"%>
<%@include file="/commons/page/qtip.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/bo/boDefExport.js"></script>
</head>
<body>
	<div class="ui-layout-west">
		<div class="layout-header">
   			<h5>上级主对象</h5>
    	</div>
    	<div class="jqGrid_wrapper">
			<table id="upBoDefGrid" ></table>
		</div>
	</div>
	<div class="ui-layout-center"> 
		 <div class="layout-header">
   			<h5><abbr title="当前对象数据会全部导出.点击选中某一条数据,可设置是否导出其父对象和子对象。" data-tip>当前对象数据</abbr></h5>
    	</div>
    	<div class="jqGrid_wrapper">
			<table id="currBoDefGrid" ></table>
		</div>
	</div>
	<div class="ui-layout-east"> 
		 <div class="layout-header">
   			<h5>下级子对象</h5>
    	</div>
    	<div class="jqGrid_wrapper">
			<table id="subBoDefGrid" ></table>
		</div>
	</div>
	<textarea id="ids" class="hide">${ids }</textarea>
</body>
</html>