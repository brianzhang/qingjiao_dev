<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/pJProcess.js"></script>
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
				<form  class="fr-form"  id="pJProcessForm" action="save.htm" >
					<input type="hidden" name="m:pJProcess:id"  value="${pJProcess.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:pJProcess:createTime"   value="<fmt:formatDate value="${pJProcess.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程id</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJProcess:course_id" value="${pJProcess.course_id}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJProcess:name" value="${pJProcess.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价学期</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJProcess:evaluation_term" value="${pJProcess.evaluation_term}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价对象</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJProcess:evaluation_object" value="${pJProcess.evaluation_object}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">目标值</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJProcess:aim_figure" value="${pJProcess.aim_figure}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价值</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJProcess:evaluation_figure" value="${pJProcess.evaluation_figure}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJProcess:evaluation" value="${pJProcess.evaluation}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价日期</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJProcess:evaluation_time" value="${pJProcess.evaluation_time}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">计算过程</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJProcess:calculation_pro" value="${pJProcess.calculation_pro}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
