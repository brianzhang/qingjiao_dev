<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/lyzygl/Xiuzheng/xiuzheng.js"></script>
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
					<form  class="fr-form"  id="xiuzhengFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${xiuzheng.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林地</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiuzheng.linDi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林木</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiuzheng.linMu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">去年面积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiuzheng.quNianMianJi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">去年蓄积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiuzheng.quNianXuJi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">修正面积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiuzheng.xiuZhengMianJi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">修正蓄积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiuzheng.xiuZhengXuJi}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
