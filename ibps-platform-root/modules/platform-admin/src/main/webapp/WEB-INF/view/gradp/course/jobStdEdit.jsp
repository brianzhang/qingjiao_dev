<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/gradp/course/jobStd.js"></script>
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
				<form  class="fr-form"  id="jobStdForm" action="save.htm" >
					<input type="hidden" name="m:jobStd:id"  value="${jobStd.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jobStd:stdNum" value="${jobStd.stdNum}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学生作业文件</label>
				  	<div class="fr-form-block">
				<div name="div_attachment_container" data-media=""   data-media_type="docs"  data-max_file_size=""   data-max_file_quantity="1">
					<div class="fr-files" ></div>
					<textarea style="display: none"   data-control="attachment"  name="m:jobStd:file"  validate="{required:false}">${jobStd.file}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">文件上传时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jobStd:fileUploadTime" value="${jobStd.fileUploadTime}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">作业成绩</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jobStd:score" value="${jobStd.score}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
