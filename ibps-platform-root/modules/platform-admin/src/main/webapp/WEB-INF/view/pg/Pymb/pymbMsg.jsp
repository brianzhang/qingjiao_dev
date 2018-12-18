<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>

<head>

<!-- <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> -->
<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<style>
/* Custom Styles */
ul.nav-tabs {
	width:200px;
	margin-top: 20px;
	border-radius: 4px;
	border: 1px solid #ddd;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);
}

ul.nav-tabs li {
	margin: 0;
	border-top: 1px solid #ddd;
}

ul.nav-tabs li:first-child {
	border-top: none;
}

ul.nav-tabs li a {
	margin: 0;
	padding: 8px 16px;
	border-radius: 0;
}

ul.nav-tabs li.active a, ul.nav-tabs li.active a:hover {
	color: #fff;
	background: #0088cc;
	border: 1px solid #0088cc;
}

ul.nav-tabs li:first-child a {
	border-radius: 4px 4px 0 0;
}

ul.nav-tabs li:last-child a {
	border-radius: 0 0 4px 4px;
}

ul.nav-tabs.affix {
	top: 30px; /* Set the top position of pinned element */
}

.font-siz {
	font-size: 15px;
	line-height:25px;
	font-family:宋体;
}
</style>
<title>t_pymb管理列表</title>
</head>

<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel "></div>
		<!--/ 操作、查询-->
		<!--<div class="jqGrid_wrapper">
				<table id="pymbGrid" ></table>
				<div id="pymbPager"></div>
			</div>-->
		<div class="container" style="width: 100%;margin-top: 10px;">
			<div class="jumbotron" style="text-align: center;width: 100%">
				<h1 style="font-family:隶书" >${po.pro_name }专业</h1>
			</div>
			<div class="row">
				<div class="col-xs-2" id="myScrollspy">

					<ul class="nav nav-tabs nav-stacked font-siz" data-spy="affix"
						data-offset-top="125" >
						<li class="active"><a href="#section-1">${po.pro_name }</a></li>
						<li><a href="#section-2">办学定位</a></li>
						<li><a href="#section-3">学科支撑</a></li>
						<li><a href="#section-4">专业定位</a></li>
						<li><a href="#section-5">本专业社会需求</a></li>
					</ul>
					<!-- <ul class="nav nav-tabs nav-stacked font-siz" data-spy="affix"
						data-offset-top="125">
						<li><a href="">指标点分解</a></li>
						<li><a href="">历史指标点</a></li>
					</ul> -->
				</div>
				<div class="col-xs-9">
					
					<h2 id="section-2">办学定位</h2>
					<p class="font-siz">${po.school_local }</p>
					<br />
					<hr>
					<br />
					<h2 id="section-3">学科支撑</h2>
					<p class="font-siz">${po.subject_zhi_cheng_ }</p>
					<br />
					<hr>
					<br />
					<h2 id="section-4">专业定位</h2>
					<p class="font-siz">${po.pro_local }</p>
					<br />
					<hr>
					<br />
					<h2 id="section-5">本专业社会需求</h2>
					<p class="font-siz">${po.social_demand }</p>
				</div>
			</div>
		</div>
	</div>

</body>
</html>