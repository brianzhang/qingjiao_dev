<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<title>打印预览</title>
</head>
<script type="text/javascript">

$(function(){
	      $("#displayPdfIframe").attr("src","${ctx}/js/plugins/pdf/web/viewer.html?file=" 
	    		  + encodeURIComponent('${ctx}/platform/form/formPrintTemplate/pdf.htm?id=${id}'));
});  
</script>
<body>
  <iframe id="displayPdfIframe" width="100%" height="100%"></iframe>  
</body>
</html>