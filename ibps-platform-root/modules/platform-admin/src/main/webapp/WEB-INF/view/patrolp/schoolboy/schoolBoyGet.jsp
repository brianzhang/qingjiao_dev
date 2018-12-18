<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/schoolboy/schoolBoy.js"></script>
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
					<form  class="fr-form"  id="schoolBoyFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${schoolBoy.name}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">入学时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${schoolBoy.startTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">毕业时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${schoolBoy.finishTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">班级职务</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${schoolBoy.classJob}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">班主任</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${schoolBoy.teacher}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">高中</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${schoolBoy.highSchool}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">大学</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${schoolBoy.daXue}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工作单位</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${schoolBoy.job}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人在校照片</label>
				  	<div class="fr-form-block">
			<div name="div_attachment_container" data-rights="r">
				<div class="fr-files" ></div>
				<textarea style="display: none"   data-control="attachment"  name="m:schoolBoy:atSchool" >${schoolBoy.atSchool}</textarea>
			</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">近照</label>
				  	<div class="fr-form-block">
			<div name="div_attachment_container" data-rights="r">
				<div class="fr-files" ></div>
				<textarea style="display: none"   data-control="attachment"  name="m:schoolBoy:jinZhao" >${schoolBoy.jinZhao}</textarea>
			</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">毕业照</label>
				  	<div class="fr-form-block">
			<div name="div_attachment_container" data-rights="r">
				<div class="fr-files" ></div>
				<textarea style="display: none"   data-control="attachment"  name="m:schoolBoy:biYeZhao" >${schoolBoy.biYeZhao}</textarea>
			</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人荣誉</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${schoolBoy.geRenRongYu}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
