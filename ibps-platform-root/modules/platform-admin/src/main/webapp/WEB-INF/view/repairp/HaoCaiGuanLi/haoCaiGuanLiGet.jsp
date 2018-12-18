<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/repairp/HaoCaiGuanLi/haoCaiGuanLi.js"></script>
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
					<form  class="fr-form"  id="haoCaiGuanLiFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材图片</label>
				  	<div class="fr-form-block">
			<div name="div_attachment_container" data-rights="r">
				<div class="fr-files" ></div>
				<textarea style="display: none"   data-control="attachment"  name="m:haoCaiGuanLi:haoCaiTuPian" >${haoCaiGuanLi.haoCaiTuPian}</textarea>
			</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiGuanLi.haoCaiBianHao}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiGuanLi.haoCaiMingCheng}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单价</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiGuanLi.danJia}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiGuanLi.chanWei}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">种类编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiGuanLi.zhongLeiBianHao}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
