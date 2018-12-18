<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmOperNotifyRecer.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="bpmOperNotifyRecerForm" action="save.htm" >
					<input type="hidden" name="m:bpmOperNotifyRecer:id"  value="${bpmOperNotifyRecer.id}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperNotifyRecer:notifyId" value="${bpmOperNotifyRecer.notifyId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">接收人ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperNotifyRecer:receiverId" value="${bpmOperNotifyRecer.receiverId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否已读</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperNotifyRecer:isRead" value="${bpmOperNotifyRecer.isRead}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">阅读时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:bpmOperNotifyRecer:updateTime"   value="<fmt:formatDate value="${bpmOperNotifyRecer.updateTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
