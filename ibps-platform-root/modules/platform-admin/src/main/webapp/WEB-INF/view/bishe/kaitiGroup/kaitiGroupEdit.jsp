<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/kaitiGroup/kaitiGroup.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="kaitiGroupForm" action="save.htm" >
					<input type="hidden" name="m:kaitiGroup:id"  value="${kaitiGroup.id}"/>
					<input type="hidden" name="m:kaitiGroup:dbfzrId"  value="${kaitiGroup.dbfzrId}"/>
					<input type="hidden" name="m:kaitiGroup:tdid"  value="${kaitiGroup.tdid}"/>
					<input type="hidden" name="m:kaitiGroup:dbgroupId"  value="${kaitiGroup.dbgroupId}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题小组</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianXiaoZu" value="${kaitiGroup.daBianXiaoZu}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题小组组长</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:dbfzr" value="${kaitiGroup.dbfzr}" disabled="true" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题小组成员</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  value="${name}"  disabled="true" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:kaitiGroup:daBianShiJian"   value="<fmt:formatDate value="${kaitiGroup.daBianShiJian}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:ktsj" value="${kaitiGroup.ktsj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题地点</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianDeDian" value="${kaitiGroup.daBianDeDian}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	
			 	
</form>

			</div>
		</div>
	</body>
</html>
