<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="f"   uri="http://www.bpmhome.cn/functions" %>
<%@taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
	<head>
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/schoolboy/schoolBoy.js"></script>
		
		<style type="text/css">
			.panel-toolbar{
				text-align:center;
			}
			
			
			
			
		</style>
		
		
	
	</head>
	<body>
		<!-- 顶部按钮 -->
		<!-- <script type="text/javascript">
			alert("1");
			var __ctx = '${ctx}';
			alert(__ctx);
		</script> -->
	
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<!-- <div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div> -->
			<div class="">
				<form  class="fr-form"  id="schoolBoyForm" action="save.htm" >
					<input type="hidden" name="m:schoolBoy:id"  value="${schoolBoy.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:schoolBoy:name" value="${schoolBoy.name}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">入学时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:schoolBoy:startTime"   value="<fmt:formatDate value="${schoolBoy.startTime}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">毕业时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:schoolBoy:finishTime"   value="<fmt:formatDate value="${schoolBoy.finishTime}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">班级职务</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:schoolBoy:classJob" value="${schoolBoy.classJob}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">班主任</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:schoolBoy:teacher" value="${schoolBoy.teacher}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			<hr />
			<div class="byqx">
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">高中</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:schoolBoy:highSchool" value="${schoolBoy.highSchool}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">大学（专业）</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:schoolBoy:daXue" value="${schoolBoy.daXue}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工作单位</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:schoolBoy:job" value="${schoolBoy.job}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			</div>
			<hr />
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人在校</label>
				  	<div class="fr-form-block">
				<div name="div_attachment_container" data-media=""   data-media_type=""  data-max_file_size=""   data-max_file_quantity="-1">
					<div class="fr-files" ></div>
					<textarea style="display: none"   data-control="attachment"  name="m:schoolBoy:atSchool"  validate="{required:true}">${schoolBoy.atSchool}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">近照</label>
				  	<div class="fr-form-block">
				<div name="div_attachment_container" data-media=""   data-media_type=""  data-max_file_size=""   data-max_file_quantity="-1">
					<div class="fr-files" ></div>
					<textarea style="display: none"   data-control="attachment"  name="m:schoolBoy:jinZhao"  validate="{required:false}">${schoolBoy.jinZhao}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">毕业照或集体照</label>
				  	<div class="fr-form-block">
				<div name="div_attachment_container" data-media=""   data-media_type=""  data-max_file_size=""   data-max_file_quantity="-1">
					<div class="fr-files" ></div>
					<textarea style="display: none"   data-control="attachment"  name="m:schoolBoy:biYeZhao"  validate="{required:false}">${schoolBoy.biYeZhao}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人荣誉</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:schoolBoy:geRenRongYu"  validate="{required:false}">${schoolBoy.geRenRongYu}</textarea>
				 	</div>
			  	</div>
			</div>
</form>
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" id="save"><span>保存</span></a>
					<!-- <a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a> -->
				</div>
			</div>
			</div>
		</div>
	</body>
</html>
