<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/group/gradGroup.js"></script>
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
					<form  class="fr-form"  id="gradGroupFormGet" >

				<input type="hidden" name="id" id="id"  value="${gradGroup.id}"/>

			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianDeDian" disabled="disabled"value="${stuName}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
			<label class="fr-control-label">${gradGroup.type}日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text"  class="fr-form-control datepicker"disabled="disabled" datefmt="yyyy-MM-dd"   name="date" id="date"  value="<fmt:formatDate value="${gradGroup.date}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			
			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}时间</label>
				  	<div class="fr-form-block">
				<input type="text"  class="fr-form-control" name="time" id="time" disabled="disabled"value="${gradGroup.time}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			

			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}地点</label>
				  	<div class="fr-form-block">
				<input type="text"  class="fr-form-control" name="place" id="place" disabled="disabled"value="${gradGroup.place}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			

			
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}小组名称</label>
				  	<div class="fr-form-block">
				<input type="text"  class="fr-form-control" name="m:kaitiGroup:daBianDeDian" disabled="disabled"value="${gradGroup.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gradGroup.type_}</p>
				 	</div>
			  	</div>
			</div> --%>

			
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">组长</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianDeDian" disabled="disabled"value="${gradGroup.leader}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">组长ID</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gradGroup.leader_id_}</p>
				 	</div>
			  	</div>
			</div> --%>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学期</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gradGroup.term_}</p>
				 	</div>
			  	</div>
			</div> --%>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">院系ID</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gradGroup.org_id_}</p>
				 	</div>
			  	</div>
			</div> --%>
	</form>

			</div>
		</div>
	</body>
</html>
