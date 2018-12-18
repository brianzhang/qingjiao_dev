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
				       <h2>志愿填报结果</h2>
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
				   <input type="text"   class="fr-form-control"  name="m:urlZhiYuan:finaltd"  disabled="true"  validate="{required:false}" value="${urlZhiYuan.finaltd}"/>
				 </div>
				 	</div>
			  	</div>
			  	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">指导教师</label>
				  	<div class="fr-form-block">
				   <input type="text"   class="fr-form-control"  name="m:urlZhiYuan:finalteacher"  disabled="true"  validate="{required:false}" value="${urlZhiYuan.finalteacher}"/>
				 </div>
				 	</div>
			  	</div>
					<div class="fr_response_field col-sm-12" >
						<div class="fr-form-group">
							<label class="fr-control-label">教师联系方式</label>
							<div class="fr-form-block">
								<input type="text"   class="fr-form-control"  name="m:partyEmployee:mobile"  disabled="true"  validate="{required:false}" value="${partyEmployee.mobile}"/>
							</div>
						</div>
					</div>
					
</form>

			</div>
		</div>
	</body>
</html>
