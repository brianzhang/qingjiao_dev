<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
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
					<form  class="fr-form"  id="urlFormSub2Form" >
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">KEY</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="" data-bind-id="m:urlFormSub2:"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlFormSub2:key" >${urlFormSub2.key}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">NAME</label>
				  	<div class="fr-form-block">
			 <p class="form-control-static">${f:getDictLabel(urlFormSub2.name,'', 'key', '')}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">AGE</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${urlFormSub2.age}</p>
				 	</div>
			  	</div>
			</div>
		</form>

			</div>
		</div>
	</body>
</html>
