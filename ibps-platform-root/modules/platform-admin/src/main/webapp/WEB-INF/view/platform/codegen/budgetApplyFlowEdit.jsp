<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/budgetApply.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="budgetApplyForm" action="save.htm" >
					<input type="hidden" name="m:budgetApply:id"  value="${budgetApply.id}"/>
					<input type="hidden" name="m:budgetApply:proposer"  value="${budgetApply.proposer}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请人</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:budgetApply:proposer"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:budgetApply:proposerName" >${budgetApply.proposerName}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
					<input type="hidden" name="m:budgetApply:applyDept"  value="${budgetApply.applyDept}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请部门</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:budgetApply:applyDept"  data-single="true">
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
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:budgetApply:applyTime"   value="<fmt:formatDate value="${budgetApply.applyTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">预算金额</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:budgetApply:budgetAmount"  value="${budgetApply.budgetAmount}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">产品</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:budgetApply:product" value="${budgetApply.product}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所属区域</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:budgetApply:area" value="${budgetApply.area}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">事项描述</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:budgetApply:eventDesc"  validate="{required:false}">${budgetApply.eventDesc}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:budgetApply:remark"  validate="{required:false}">${budgetApply.remark}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">上级领导审批</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:budgetApply:leaderAppoval" value="${budgetApply.leaderAppoval}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>