<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@include file="/commons/include/html_doctype.html" %>
<%@include file="/commons/include/get.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
	<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/jquery.media.js"></script>  
		 <script type="text/javascript">  
	        $(function() {   
	            $('a.media').media({width:1200, height:850});  
	        });  
	    </script>   
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
<title>${isGrade}</title>
</head>
<body>
	<c:choose>
		<c:when test="${tourl == '' || id == '0' }">
			<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="alert alert-warning m-t-sm"  >
				请选择资料目录</div>
			</div>
		</c:when>
		<c:otherwise>
			<div class="panel">
					<a class="media" href="${ctx}${tourl}"></a>  
			</div>
		</c:otherwise>
	</c:choose>
</body>
</html>