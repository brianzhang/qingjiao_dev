<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/shenPRYJ.js"></script>
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
					<form  class="fr-form"  id="shenPRYJForm" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">借款申请人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${shenPRYJ.jksqr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授信金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${shenPRYJ.sxje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授信期限</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${shenPRYJ.sxqx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${shenPRYJ.dbfs=='1'}">选项一</c:if><c:if test="${shenPRYJ.dbfs=='2'}">选项二</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款类别</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${shenPRYJ.dklb=='1'}">选项一</c:if><c:if test="${shenPRYJ.dklb=='2'}">选项二</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${shenPRYJ.dkje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款期限</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${shenPRYJ.dkqx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">月利率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${shenPRYJ.yll}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">归还方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${shenPRYJ.ghfs=='1'}">选项一</c:if><c:if test="${shenPRYJ.ghfs=='2'}">选项二</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审批人签名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${shenPRYJ.sprqm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审批人签字时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${shenPRYJ.sprqzsj}" /></p>		
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
