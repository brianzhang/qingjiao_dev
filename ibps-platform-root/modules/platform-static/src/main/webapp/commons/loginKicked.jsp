<%@page isErrorPage="true" pageEncoding="UTF-8"%>
<html>
	<head>
		<title>会话过期了</title>
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
								会话过期了
							</span>
						</h1>

						<hr />
						<h3 class="lighter smaller">会话过期了!</h3>
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