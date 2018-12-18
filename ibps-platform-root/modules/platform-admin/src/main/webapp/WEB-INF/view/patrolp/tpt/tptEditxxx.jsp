<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/tpt/tpt.js"></script>
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
				<form  class="fr-form"  id="tptForm" action="save.htm" >
					<input type="hidden" name="m:tpt:id"  value="${tpt.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">tptName</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:tpt:tptName" value="${tpt.tptName}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">tptLb</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:tpt:tptLb" value="${tpt.tptLb}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">json</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:tpt:json"  validate="{required:false}">${tpt.json}</textarea>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
