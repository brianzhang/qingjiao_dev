<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/hrbeu/gradp/paper/myPaper.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="myPaperForm" action="save.htm" >
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:myPaper:stunum" value="${myPaper.stunum}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">题目</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:myPaper:title" value="${myPaper.title}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学生论文上传时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd HH:mm:ss"   name="m:myPaper:stupptime"   value="<fmt:formatDate value="${myPaper.stupptime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学生评阅文件上传时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd HH:mm:ss"   name="m:myPaper:pfileuptime"   value="<fmt:formatDate value="${myPaper.pfileuptime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评阅教师意见</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:myPaper:ptidea" value="${myPaper.ptidea}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">指导教师工号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:myPaper:ttnum" value="${myPaper.ttnum}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">指导教师下载学生论文时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd HH:mm:ss"   name="m:myPaper:ttdowntime"   value="<fmt:formatDate value="${myPaper.ttdowntime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">指导教师评审时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd HH:mm:ss"   name="m:myPaper:ttreviewtime"   value="<fmt:formatDate value="${myPaper.ttreviewtime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">指导教师评审评语</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:myPaper:ttcomment"  validate="{required:false}">${myPaper.ttcomment}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评审意见</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:myPaper:ttidea" value="${myPaper.ttidea}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评阅教师下载论文时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd HH:mm:ss"   name="m:myPaper:ptdowntime"   value="<fmt:formatDate value="${myPaper.ptdowntime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评阅时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd HH:mm:ss"   name="m:myPaper:ptptime"   value="<fmt:formatDate value="${myPaper.ptptime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评阅教师评语</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:myPaper:ptcomment"  validate="{required:false}">${myPaper.ptcomment}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学生答辩ppt上传时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:myPaper:stupptuptime" value="${myPaper.stupptuptime}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
		
	</body>
</html>
