<%@page import="org.springframework.security.access.AccessDeniedException"  pageEncoding="UTF-8" isErrorPage="true" %>
<%
	String basePath=request.getContextPath();
	AccessDeniedException ex=(AccessDeniedException)request.getAttribute("ex");
	
%>
<html>
	<head>
		<title>无法找到该网页</title>
		<%@include file="/commons/include/error.jsp"%>
	</head>
	<body>
		<div class="container">
			<div class="col-xs-12">		
				<div class="error-container">
					<div class="well">
						<h1 class="grey lighter smaller">
							<span class="blue bigger-125">
								<i class="fa fa-frown-o"></i>
								400
							</span>无法找到该网页
						</h1>

						<hr />
						<h3 class="lighter smaller">我们无法找到该网页</h3>

						<div>
							

							<div class="space"></div>
							<h4 class="smaller">尝试下列问题:</h4>

							<ul class="list-unstyled spaced inline bigger-110 margin-15">
								<li>
									<i class="fa fa-hand-o-right blue"></i>
									仔细检查URL是否输入正确
								</li>

								<li>
									<i class="fa fa-hand-o-right blue"></i>
									查阅FAQ问题
								</li>

								<li>
									<i class="fa fa-hand-o-right blue"></i>
									请告诉我们
								</li>
							</ul>
						</div>

						<hr />
						<div class="space"></div>

						<div class="center">
							<a href="javascript:history.back()" class="btn btn-grey">
								<i class="ace-icon fa fa-arrow-left"></i>
								返回
							</a>

							<a href="#" onclick="javascript:location.href='<%=basePath%>/logout.ht';" class="btn btn-primary">
								<i class="ace-icon fa fa-share-square-o"></i>
								重新登录
							</a>
						</div>
					</div>
				</div>
		</div>

	</body>
</html>
