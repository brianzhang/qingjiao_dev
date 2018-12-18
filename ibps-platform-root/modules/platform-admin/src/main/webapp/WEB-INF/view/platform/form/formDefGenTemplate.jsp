<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	<title>生成模版</title>
	 <%@include file="/commons/include/get.jsp"%>
	<f:link href="codemirror/lib/codemirror.css"/>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/xml/xml.js"></script>
</head>
<body>
	<div class="srcoll-panel">
    		<textarea id="html" name="html" style="width: 100%;height: 500px;" class="CodeMirror-gutter" readonly="readonly">${fn:escapeXml(html)}</textarea>
	</div>
<script type="text/javascript">
	$(function(){
		var height = $("body").height();
		var editor = CodeMirror.fromTextArea(document .getElementById("html"), {
			mode: "text/html",
			matchBrackets: true,
			readonly:true
		 });
		editor.setSize('100%',height);
	});
	</script>
</body>
</html>
