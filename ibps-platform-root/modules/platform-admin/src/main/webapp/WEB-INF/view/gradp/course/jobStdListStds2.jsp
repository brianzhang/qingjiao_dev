<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link href="bootstrap/bootstrap-tour.min.css" />
<title>学生作业列表</title>
</head>

<body>
		<input type="hidden" id="obj" value="${obj }">
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						 
						<a class="btn btn-primary fa fa-back" href="${ctx }/gradp/course/crsJob/list2.htm?crsTchId=${crsTchId}&crsName=${crsName }"><span>返回</span></a>
						<a class="btn btn-primary fa fa-search" href="javascript:void(0);"><span>搜索</span></a>
					<!--	<a class="btn btn-primary fa fa-pencil" href="${ctx }/platform/report/raqsoft/preview2.htm?reportId=443095923178864640&cname1=title&cval1=${jobName}" 
					        content="text/html; charset=UTF-8"><span>学生成绩汇总</span></a>  -->
					  
					</div>     
					&nbsp;
					
					<!-- 收缩 -->
					<div class="tools">
						<h2 style="float: left; line-height: 1.7em">${jobName}作业学生列表&nbsp;</h2>
						<a href="javascript:void(0);" class="collapse"> <i
							class="bigger-180 fa  fa-angle-double-up"></i>
						</a>
					</div>
				</div>
				<!-- #查询条件-->
				<div class="toolbar-body">
					<form role="form" class="search-form">
						<div class="form-inline p-xxs">
							<div class="form-group">
								<label class="search-label">学号</label>: <input id="studentNumber" type="text"
									name="Q^STD_NUM^SLR" class="form-control" onkeyup="cg()" />
							</div>
							 <div class="form-group">
								<label class="search-label">班级</label>: <input type="text"
									name="Q^CLASSR^SLR" class="form-control" onkeyup="cg()" />
							</div>
							<div class="form-group">
								<label class="search-label">所属教师</label>: <input type="text"
									name="Q^FINALTEACHER^SLR" class="form-control" onkeyup="cg()" />
							</div>
							
							<div class="form-group">
									<label   class="search-label" id="studentStatus">学生状态</label>:
									<select name="Q^STATUS^S" class="form-control search-select" onchange="cg()">
										<option value="">ALL</option>	
										<option value="2" >已提交学生</option>
										<option value="0" >未提交学生</option>
										
									</select>
							</div>
							<div class="form-group">
									<label   class="search-label" id="studentStatus">审阅状态</label>:
									<select name="Q^REVIEW_STATUS^S" class="form-control search-select" onchange="cg()">
										<option value="">ALL</option>	
										<option value="1" >已审阅学生</option>
										<option value="0" >未审阅学生</option>	
									</select>
							</div>
							
							
						</div>
				</div>
							
				<!--/ 查询条件-->
			</div>
		</div>
		<!--/ 操作、查询-->
		<div class="jqGrid_wrapper">
			<table id="jobStdListStdGrid"></table>
			<div id="jobStdListStdPager"></div>
		</div>
	</div>

</body>
<script type="text/javascript">
var jobID = '${jobID}';
var jobName = "${jobName}";
var crsTchId = "${crsTchId}";
var crsName = "${crsName}";
var stdNum = "${stdNum}";
var stdName = "${stdName}";
var power='${scorePower}';
var uniManage='${uniManage}';
var remove_a = document.getElementById("remove_a");
var edit = document.getElementById("edit");
var hidden = document.getElementById("hidden");
var guan = document.getElementById("guan");
// var str3 = remove_a.getAttribute("action");
function editc(){
	/*  alert("123"); */
	 hidden.style.display = "block";
}
function guand(){
	hidden.style.display = "none";
}
function remove(){
	hidden.style.display = "none";
}


function asd() {  
	 
	var inp = document.getElementById("inp");
	var red = document.getElementById("remove_a");
	var str1 = inp.value;
	if(parseFloat(str1)>100){
		DialogUtil.error('最大分值:100！');
		return;
	}
	if(parseFloat(str1)<0){
		DialogUtil.error('最小分值:0！');
		return;
	}
	var str2 = str3;
	
	str2 = str2 + str1;
	//alert(str2);
	red.setAttribute("action",str2);
	/* alert(str2); */
}
</script>

<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/jobStdListStd2.js"></script>
</html>
