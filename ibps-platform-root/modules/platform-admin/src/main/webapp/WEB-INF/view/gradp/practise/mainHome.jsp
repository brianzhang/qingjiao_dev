<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<meta name="renderer" content="webkit">
<!-- 移动设备 viewport -->
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<link rel="icon" href="/commons/image/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="/commons/image/favicon.ico"
	type="image/x-icon">
<!-- css -->
<link rel="stylesheet" type="text/css"
	href="/styles/commons/css/bootstrap/bootstrap.min.css">
	
<link rel="stylesheet" type="text/css"
	href="/styles/commons/css/font-awesome/font-awesome.min.css">

<link rel="stylesheet" type="text/css"
	href="/styles/default/css/lc/desktop/desktop.css">

<style type="text/css">
.g-btn:HOVER{
	transform:scale(1.01)
}
</style>

</head>
<body style="">
	<div class="desktop-page">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<div class="row clearfix">
					<div class="col-md-12 column">
						<div class="parent-template-class">
							<div class="dashboard-container" template-alias="dashboard">
							
								<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 g-btn">
									<a class="dashboard dashboard-stat yellow"
										href="/gradp/course/crsTch/listMyStudents.htm">
										<div class="visual">
											<i class="fa fa-comments"></i>
										</div>
										<div class="details">
											<div class="desc">实习笔记</div>
										</div>
									</a>
								</div>
								<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 g-btn">
									<a class="dashboard dashboard-stat purple" data-url=""
										href="javascript:void(0);">
										<div class="visual">
											<i class="fa fa-flag"></i>
										</div>
										<div class="details">
											<div class="desc">专题报告</div>
										</div>
									</a>
								</div>


								<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 g-btn">
									<a class="dashboard dashboard-stat blue" data-url=""
										href="javascript:void(0);">
										<div class="visual">
											<i class="fa fa-file-o"></i>
										</div>
										<div class="details">
											<div class="desc">总结报告</div>
										</div>
									</a>
								</div>
								<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 g-btn">
									<a class="dashboard dashboard-stat red" data-url=""
										href="javascript:void(0);">
										<div class="visual">
											<i class="fa fa-hand-o-up"></i>
										</div>
										<div class="details">
											<div class="desc">数据统计</div>
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="hr hr10 hr-dotted"></div>
			</div>
		</div>
	</div>

</body>
<!-- js -->
<script type="text/javascript" src="/js/dynamic.jsp"></script>
<script type="text/javascript" src="/js/plugins/moment/moment.min.js"></script>
<!--[if !IE]> -->
<script type="text/javascript">
	window.jQuery
			|| document.write("<script src='/js/plugins/jquery/jquery.min.js'>"
					+ "<"+"/script>");
</script>
<script src="/js/plugins/jquery/jquery.min.js"></script>
<!-- <![endif]-->
<!--[if IE]>
<script type="text/javascript">
	 window.jQuery || document.write("<script src='/js/plugins/jquery/jquery1x.min.js'>"+"<"+"/script>");
</script>
<![endif]-->
<script type="text/javascript"
	src="/js/plugins/jquery/plugins/jquery.sparkline.min.js"></script>
<script type="text/javascript"
	src="/js/plugins/jquery/plugins/jquery.easypiechart.min.js"></script>
<!--[if lte IE 8]>
<script type="text/javascript" src="/js/plugins/fullcalendar/fullcalendar-2.9.1.min.js"></script>
<script type="text/javascript" src="/js/lang/fullcalendar/zh_CN-2.9.1.js"></script>
<![endif]-->
<!--[if gt IE 8]> 
<script type="text/javascript" src="/js/plugins/fullcalendar/fullcalendar.min.js"></script>
<script type="text/javascript" src="/js/lang/fullcalendar/zh_CN.js"></script>
<![endif]-->
<!--[if !IE]> -->
<!-- <![endif]-->
<script type="text/javascript"
	src="/js/plugins/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="/js/plugins/layer/laydialog.min.js"></script>
<script type="text/javascript" src="/js/lc/commons/utils/util.js"></script>
<script type="text/javascript" src="/js/lc/commons/utils/DialogUtil.js"></script>

<!--[if lte IE 8]>
	<script type="text/javascript" src="/js/plugins/ieonly/html5shiv.min.js"></script>
	<script type="text/javascript" src="/js/plugins/ieonly/respond.min.js"></script>
<![endif]-->
<!-- BEGIN LayerSlider -->

</html>