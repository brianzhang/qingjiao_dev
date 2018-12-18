<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" %>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<html>
<head>
	<title>没有访问权限</title>
	<%@include file="/commons/include/error.jsp"%>
</head> 
<body>
	<div class="container">
			<div class="col-xs-12">		
				<div class="error-container">
					<div class="well">
						<h1 class="grey lighter smaller">
							<span class="blue bigger-125">
								<i class="fa fa-sitemap "></i>
								没有访问权限
							</span>
						</h1>

						<hr />
						<h3 class="lighter smaller">没有访问权限!</h3>

						<hr />
						<div class="space"></div>

						<div class="center">
							<a href="javascript:history.back()" class="btn btn-grey">
								<i class="ace-icon fa fa-arrow-left"></i>
								返回
							</a>

							<a href="javascript:location.href='${ctx}/logout.htm'" class="btn btn-primary">
								<i class="ace-icon fa fa-share-square-o"></i>
								重新登录
							</a>
						</div>
					</div>
				</div>
</body>
</html>

