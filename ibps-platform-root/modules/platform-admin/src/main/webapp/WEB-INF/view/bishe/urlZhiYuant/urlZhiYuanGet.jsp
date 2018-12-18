<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuan.js"></script>
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
					<form  class="fr-form"  id="urlZhiYuanForm" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${urlZhiYuan.xh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">团队1</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:urlZhiYuan:td1id"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlZhiYuan:td1" >${urlZhiYuan.td1}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教师1</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:urlZhiYuan:js1id"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlZhiYuan:js1" >${urlZhiYuan.js1}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">团队2</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:urlZhiYuan:td2id"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlZhiYuan:td2" >${urlZhiYuan.td2}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教师2</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:urlZhiYuan:js2id"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlZhiYuan:js2" >${urlZhiYuan.js2}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">团队3</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:urlZhiYuan:td3id"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlZhiYuan:td3" >${urlZhiYuan.td3}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教师3</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:urlZhiYuan:js3id"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlZhiYuan:js3" >${urlZhiYuan.js3}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
		</form>

			</div>
		</div>
	</body>
</html>
