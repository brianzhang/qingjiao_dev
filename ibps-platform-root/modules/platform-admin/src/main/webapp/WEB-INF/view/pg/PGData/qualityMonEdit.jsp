<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/qualityMon.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="qualityMonForm" action="save.htm" >
					<input type="hidden" name="m:qualityMon:id"  value="${qualityMon.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:qualityMon:createTime"   value="<fmt:formatDate value="${qualityMon.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">监控点</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:qualityMon:monitory" value="${qualityMon.monitory}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质量标准</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:qualityMon:quality" value="${qualityMon.quality}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价方法</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:qualityMon:evaluation_method" value="${qualityMon.evaluation_method}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价周期</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:qualityMon:evalution_period" value="${qualityMon.evalution_period}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价执行主体</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:qualityMon:exector" value="${qualityMon.exector}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">反馈改进措施 </label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:qualityMon:measures" value="${qualityMon.measures}" validate="{required:false}"/>
				</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">运行监督责任人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:qualityMon:responsible" value="${qualityMon.responsible}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
