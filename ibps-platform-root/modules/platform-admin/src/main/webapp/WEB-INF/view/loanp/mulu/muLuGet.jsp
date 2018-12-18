<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/mulu/muLu.js"></script>
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
					<form  class="fr-form"  id="muLuForm" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">材料类别</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${muLu.cllb=='1'}">借款人提供材料</c:if><c:if test="${muLu.cllb=='2'}">担保人提供材料</c:if><c:if test="${muLu.cllb=='3'}">担保企业提供材料</c:if><c:if test="${muLu.cllb=='4'}">贷款审批材料</c:if><c:if test="${muLu.cllb=='5'}">合同签订及放款材料</c:if><c:if test="${muLu.cllb=='6'}">贷后材料</c:if><c:if test="${muLu.cllb=='7'}">其他</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">材料名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${muLu.clmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">企业</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${muLu.qy=='1'}">是</c:if><c:if test="${muLu.qy=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">二手房</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${muLu.esf=='1'}">是</c:if><c:if test="${muLu.esf=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人生产经营</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${muLu.grscjy=='1'}">是</c:if><c:if test="${muLu.grscjy=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">商业用房</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${muLu.syyf=='1'}">是</c:if><c:if test="${muLu.syyf=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
