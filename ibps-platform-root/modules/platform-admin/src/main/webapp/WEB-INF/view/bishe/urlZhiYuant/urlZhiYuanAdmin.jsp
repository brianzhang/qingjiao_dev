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
				       <h2>管理员分配学生</h2>
				</div>	
                 <br /><br /><br />
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:xh" value="${urlZhiYuan.xh}" disabled="true" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:name" value="${urlZhiYuan.name}" disabled="true" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">最终团队</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:urlZhiYuan:finaltdId"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlZhiYuan:finaltd" >${urlZhiYuan.finaltd}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
					<input type="hidden" name="m:urlZhiYuan:finaltdId"  value="${urlZhiYuan.finaltdId}"/>
			 	
			  	<br/><br/>
				       <h2>团队信息</h2>
               <br/>
					<div class="">
				          <iframe id="iframe1"  name="iframe1"  width="100%" height="600px" frameborder=no  border=0  marginwidth=0  marginheight=0  scrolling=no src="${ctx}/bishe/teacherAndStudent/teacherAndStudent/list.htm"></iframe>			
	        </div
</form>

			</div>
		</div>
	</body>
</html>
