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
					<form  class="fr-form"  id="regDataForm" >
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${regData.fullName}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">性别</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">
						<c:if test="${'male' == regData.gender}">男</c:if>
						<c:if test="${'female' == regData.gender}">女</c:if>
						</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">手机</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${regData.mobile}</p>
				 	</div>
			  	</div>
			</div>
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公司名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${regData.company}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">区域</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${regData.area}</p>
				 	</div>
			  	</div>
			</div>
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${regData.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
		</form>

			</div>
		</div>
	</body>
</html>
