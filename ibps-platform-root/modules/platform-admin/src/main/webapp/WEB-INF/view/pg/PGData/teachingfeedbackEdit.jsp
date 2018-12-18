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
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="teachingfeedbackForm" action="save.htm" >
					<input type="hidden" name="m:teachingfeedback:id"  value="${teachingfeedback.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:teachingfeedback:createTime"   value="<fmt:formatDate value="${teachingfeedback.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:course_id" value="${teachingfeedback.course_id}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:course_name" value="${teachingfeedback.course_name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授课教师</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:teacher" value="${teachingfeedback.teacher}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">听课时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:teachingfeedback:time"   value="<fmt:formatDate value="${teachingfeedback.time}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果1.1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result1_1" value="${teachingfeedback.judge_result1_1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果1.2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result1_2" value="${teachingfeedback.judge_result1_2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果2.1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result2_1" value="${teachingfeedback.judge_result2_1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果2.2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result2_2" value="${teachingfeedback.judge_result2_2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果3.1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result3_1" value="${teachingfeedback.judge_result3_1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">如上项选是3.1.1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result3_1_1" value="${teachingfeedback.judge_result3_1_1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果3.2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result3_2" value="${teachingfeedback.judge_result3_2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">如上项选是3.2.1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result3_2_1" value="${teachingfeedback.judge_result3_2_1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果4.1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result4_1" value="${teachingfeedback.judge_result4_1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果4.2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result4_2" value="${teachingfeedback.judge_result4_2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果 5</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result5" value="${teachingfeedback.judge_result5}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果6</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:judge_result6" value="${teachingfeedback.judge_result6}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachingfeedback:evalution_name" value="${teachingfeedback.evalution_name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
