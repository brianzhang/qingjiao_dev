<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
</head>
<body style="background-color:transparent;background:rgba(242,234,191,0.15)">
	<!-- 顶部按钮 -->
	<div id="mainBd" class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a class="btn btn-primary fa fa-refresh" action="javascript:void(0);" href="javascript:void(0);" ><span>刷新</span></a>
				<a class="btn btn-primary fa fa-export export-unSubmitted" href="javascript:void(0);" id="students"><span>导出未提交名单</span></a>
			</div>
		</div>
	</div>
	<div id="main" style="padding:50px;margin:0 auto;width: 100%;height:97%"></div>
</body>
<script type="text/javascript">
var crsName='${crsName}';
var crsTchId='${crsTchId}';
</script>
<script type="text/javascript" src="${ctx }/js/plugins/echarts/echarts.min.js"></script>
<script type="text/javascript" src="${ctx }/js/plugins/echarts/template/essos.js"></script>
<script type="text/javascript" src="${ctx }/js/lc/gradp/course/statistics.js"></script>
</html>
