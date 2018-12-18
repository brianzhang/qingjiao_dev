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
				   <h2>开题小组</h2>
				</div>	
                 <br /><br />
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教师姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:xh" disabled="true" value="${name}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在开题小组</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:name"  disabled="true"  value="${ktxz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>	
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">答辩时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:name"  disabled="true"  value="${date}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">答辩地点</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:name"  disabled="true"  value="${kaitipo.daBianDeDian}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">答辩小组负责人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:name"  disabled="true"  value="${kaitipo.dbfzr}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>		
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:name"  disabled="true"  value="${kaitipo.ktsj}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>			
</form>
			</div>
		</div>
	</body>
</html>
