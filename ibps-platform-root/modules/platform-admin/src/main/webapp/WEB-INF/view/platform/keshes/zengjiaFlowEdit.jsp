<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/keshes/zengjia.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="zengjiaForm" action="save.htm" >
					<input type="hidden" name="m:zengjia:id"  value="${zengjia.id}"/>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">IP地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zengjia:ip" value="${zengjia.ip}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zengjia:createBy" value="${zengjia.createBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:zengjia:createTime"   value="<fmt:formatDate value="${zengjia.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zengjia:updateBy" value="${zengjia.updateBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:zengjia:updateTime"   value="<fmt:formatDate value="${zengjia.updateTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>