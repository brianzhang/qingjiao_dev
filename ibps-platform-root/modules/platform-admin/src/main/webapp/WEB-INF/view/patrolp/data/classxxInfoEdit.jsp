<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/data/classxxInfo.js"></script>
<script type="text/javascript">
	function in_click() {
		if($('#classxx').val() == "") {
			DialogUtil.error("对不起,班级不能为空");
		} 
	}
</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" onclick="in_click()"><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="classxxInfoForm" action="save.htm" >
					<input type="hidden" name="m:classxxInfo:id"  value="${classxxInfo.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学校</label>
				  	<div class="fr-form-block">
				<input type="text"  readonly="readonly"  class="fr-form-control" name="m:classxxInfo:school" value="${classxxInfo.school}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">班级</label>
				  	<div class="fr-form-block">
				<input type="text"  id="classxx" class="fr-form-control" name="m:classxxInfo:classxx" value="${classxxInfo.classxx}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">班主任</label>
				  	<div class="fr-form-block">
				<select id="tch" class="fr-form-control" name="m:classxxInfo:classMaster"  validate="{required:false}">
				 	<option value=""></option>
				 </select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地点</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:classxxInfo:place" value="${classxxInfo.place}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
<script type="text/javascript"
	src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript">
 	var tch = ${tch}; 
	var master = ${master};
	$("#tch").select2({

  		data : tch,  
		placeholder : master,
		cache : true,
		allowClear : true
	});	
</script>	
</html>
