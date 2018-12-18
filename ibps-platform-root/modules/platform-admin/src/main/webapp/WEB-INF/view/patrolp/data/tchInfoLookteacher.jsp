
<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" 
		src="${ctx}/js/lc/patrolp/data/teacherSchedule.js"></script>
		<title>t_jsskb管理列表</title>
	</head>
<body>

	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</div>
					<!-- 收缩 -->
					<div class="tools">
						<a href="javascript:void(0);" class="collapse"> <i
							class="bigger-180 fa  fa-angle-double-up"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
		</div>

<!--  填写老师名 -->
<form role="form" class="search-form" id="SchedulePoForm"    enctype="multipart/form-data">
			<input  type="hidden"  name="teacherId"  value="${id}"  id= "teacherId" />
			<input type="hidden" name="usefulSchduleIds" value="${usefulSchduleIds}" id="usefulSchduleIds" />
</form>

			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${name}</p>
				 	</div>
			  	</div>
			</div>
			
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">科目</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${subject}</p>
				 	</div>
			  	</div>
			</div>


			<div class="jqGrid_wrapper">
				<table id="SchedulePoGrid" ></table>
				<div id="SchedulePoPager"></div>
			</div>
			
</body>
	
</html>
