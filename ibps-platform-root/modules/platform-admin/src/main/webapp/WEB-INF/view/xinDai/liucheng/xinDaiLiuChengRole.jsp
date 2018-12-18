<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/xinDai/liucheng/xinDaiLiuCheng.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
				<div class="buttons">
					<a href="${ctx}/loanp/DaiKSSCSP/jingBRYJ/edit.htm?jdid=${xinDaiLiuCheng.id} " class="btn btn-primary fa " ><span>审批意见</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="xinDaiLiuChengForm" action="save.htm" >
					<input type="hidden" name="m:xinDaiLiuCheng:id"  value="${xinDaiLiuCheng.id}"/>
			 	<div class="fr_response_field col-sm-2" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xinDaiLiuCheng:customer" value="${xinDaiLiuCheng.customer}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-2" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款金额</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xinDaiLiuCheng:dkje" value="${xinDaiLiuCheng.dkje}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-2" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xinDaiLiuCheng:zjlx" value="${xinDaiLiuCheng.zjlx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-2" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xinDaiLiuCheng:sfid" value="${xinDaiLiuCheng.sfid}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-2" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款类别</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xinDaiLiuCheng:dklb" value="${xinDaiLiuCheng.dklb}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="">
				          <iframe id="iframe1"  name="iframe1"  width="100%" height="800px" frameborder=no  border=0  marginwidth=0  marginheight=0  scrolling=no src="${ctx}/loanp/files/file/list.htm?loanId=${xinDaiLiuCheng.id}&ty=1"></iframe>			
	        </div
			 	
</form>

			</div>
		</div>
		
		  
	</body>
</html>