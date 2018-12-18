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
			<div class="">
				<form  class="fr-form"  id="urlZhiYuanForm" action="save.htm" >
					<input type="hidden" name="m:urlZhiYuan:id"  value="${urlZhiYuan.id}"/>
				<div class="fr_response_field col-sm-12" >
				   <h2>填报志愿</h2>
				</div>	
                 <br /><br />
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:xh" disabled="true" value="${urlZhiYuan.xh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:name"  disabled="true"  value="${urlZhiYuan.name}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">选择团队1</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:urlZhiYuan:td1id"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlZhiYuan:td1" >${urlZhiYuan.td1}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
					<input type="hidden" name="m:urlZhiYuan:td1id"  value="${urlZhiYuan.td1id}"/>
			
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">选择团队2</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:urlZhiYuan:td2id"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlZhiYuan:td2" >${urlZhiYuan.td2}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
					<input type="hidden" name="m:urlZhiYuan:td2id"  value="${urlZhiYuan.td2id}"/>
</form>

			</div>
		</div>
	</body>
</html>
