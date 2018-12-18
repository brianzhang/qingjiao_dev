<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/teachingfeedback.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
					<form  class="fr-form"  id="teachingfeedbackFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${teachingfeedback.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程ID</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.course_id}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.course_name}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授课教师</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.teacher}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">听课时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${teachingfeedback.time}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果1.1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result1_1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果1.2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result1_2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果2.1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result2_1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果2.2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result2_2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果3.1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result3_1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">如上项选是3.1.1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result3_1_1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果3.2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result3_2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">如上项选是3.2.1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result3_2_1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果4.1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result4_1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果4.2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result4_2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果 5</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result5}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果6</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.judge_result6}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${teachingfeedback.evalution_name}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
