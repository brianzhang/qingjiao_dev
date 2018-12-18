<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/danBaoCompany/danBaoCompanyInfo.js"></script>
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
					<form  class="fr-form"  id="danBaoCompanyInfoForm" >
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保公司客户号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.dbgskhh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保公司客户名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.dbgskhmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.dbxz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">负责人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.fzr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系电话</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.lxdh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保经营资格许可证</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.dbjyzgxkz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证金账号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.bzjzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证金分账号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.bzjfzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证金金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.bzjje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">允许放大倍数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.yxfdbs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开办机构</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danBaoCompanyInfo.kbjg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">生效日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${danBaoCompanyInfo.sxrq}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">到期日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${danBaoCompanyInfo.dqrq}" /></p>		
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
