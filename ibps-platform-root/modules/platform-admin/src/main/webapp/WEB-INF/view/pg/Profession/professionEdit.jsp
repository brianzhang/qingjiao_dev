<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/Profession/profession.js"></script>
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
				<form  class="fr-form"  id="professionForm" action="save.htm" >
			 	<%-- <div class="fr_response_field col-sm-12" >
					<label class="fr-control-label">专业号</label> <input type="text"
						name="m:profession:id" class="fr-form-control"
						value="${profession.id}" />

				</div> --%>
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">专业号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:profession:id" value="${profession.id}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学校</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:profession:xueXiao" value="${profession.xueXiao}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学院</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:profession:xueYuan" value="${profession.xueYuan}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">专业</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:profession:zhuanYe" value="${profession.zhuanYe}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
