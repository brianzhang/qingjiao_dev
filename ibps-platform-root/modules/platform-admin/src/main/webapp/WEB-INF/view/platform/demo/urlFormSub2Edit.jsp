<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/demo/urlFormSub2.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="urlFormSub2Form" action="save.htm" >
					<input type="hidden" name="m:urlFormSub2:id"  value="${urlFormSub2.id}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">KEY</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:urlFormSub2:key"  data-single="true">
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
				 <input type="hidden" id="name" name="m:urlFormSub2:name"  value="${urlFormSub2.name}"/>
				<input type="text" readonly="readonly"  class="fr-form-control comboTree"
						 data-toggle="dictionary"   data-dic="tableSource" data-key="#name"
		                 value="${f:getDictLabel(urlFormSub2.name,'tableSource', 'key', '')}"  validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">AGE</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:urlFormSub2:age"  value="${urlFormSub2.age}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
					<input type="hidden" name="m:urlFormSub2:parentId"  value="${urlFormSub2.parentId}"/>
</form>

			</div>
		</div>
	</body>
</html>
