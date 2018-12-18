<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/basicRequirements.js"></script>
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
				<form  class="fr-form"  id="basicRequirementsForm" action="save.htm" >
					<input type="hidden" name="m:basicRequirements:id"  value="${basicRequirements.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:basicRequirements:createTime"   value="<fmt:formatDate value="${basicRequirements.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:difficulty1" value="${basicRequirements.difficulty1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">分值1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:score1" value="${basicRequirements.score1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:difficulty2" value="${basicRequirements.difficulty2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">分值2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:score2" value="${basicRequirements.score2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">测试</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:test" value="${basicRequirements.test}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">分值3</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:score3" value="${basicRequirements.score3}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考勤</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:attendance" value="${basicRequirements.attendance}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">预习</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:prepare" value="${basicRequirements.prepare}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:operate" value="${basicRequirements.operate}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">实验报告</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:report" value="${basicRequirements.report}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">分值4</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:score4" value="${basicRequirements.score4}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">PPT</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:ppt" value="${basicRequirements.ppt}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">文件</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:document" value="${basicRequirements.document}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">答辩</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:presentation" value="${basicRequirements.presentation}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">分值5</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:basicRequirements:score5" value="${basicRequirements.score5}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
