<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/budgetApply.js"></script>
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
					<form  class="fr-form"  id="budgetApplyFormGet" >
					 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请人</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:budgetApply:proposer"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:budgetApply:proposerName" >${budgetApply.proposerName}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请部门</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:budgetApply:applyDept"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:budgetApply:applyDeptName" >${budgetApply.applyDeptName}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${budgetApply.applyTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">预算金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${budgetApply.budgetAmount}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">产品</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${budgetApply.product}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所属区域</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${budgetApply.area}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">事项描述</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${budgetApply.eventDesc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${budgetApply.remark}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">上级领导审批</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${budgetApply.leaderAppoval}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>