<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/teacherAndStudent/teacherAndStudent.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="teacherAndStudentForm" action="save.htm" >
					<input type="hidden" name="m:teacherAndStudent:id"  value="${teacherAndStudent.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教师员工号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teacherAndStudent:teacher_id" value="${teacherAndStudent.teacher_id}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 <div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教师姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teacherAndStudent:js" value="${teacherAndStudent.js}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 <div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">上传立题论证书</label>
				  	<div class="fr-form-block">
				<input type="file" class="fr-form-control" name="m:teacherAndStudent:wjm"   validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			</div>
</form>

			</div>
		</div>
	</body>
</html>
