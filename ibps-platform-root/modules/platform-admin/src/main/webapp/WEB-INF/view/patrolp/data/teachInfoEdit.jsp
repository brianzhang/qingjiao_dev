<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/data/teachInfo.js"></script>
<script type="text/javascript">
//不好使写在后台了
/* 	function in_click() {
		if($('#tch').val() == "") {
			DialogUtil.error("对不起,教师不能为空!");
			return false;
		} 
		if($('#classxx').val() == "") {
			DialogUtil.error("对不起,班级不能为空");
			return false;
		} 
		if($('#day').val() == "") {
			DialogUtil.error("对不起,工作日不能为空!");
			return false;
		} 
		if($('#section').val() == "") {
			DialogUtil.error("对不起,节次不能为空!");
			return false;
		} 
	} */
</script>
</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save"  onclick="in_click()"><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="teachInfoForm" action="save.htm" >
					<input type="hidden" name="m:teachInfo:id"  value="${teachInfo.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课表id</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:teachInfo:scheduleId" value="${teachInfo.scheduleId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教师id</label>
				  	<div class="fr-form-block">
				<select id="tch"  class="fr-form-control" name="m:teachInfo:tchId"  validate="{required:false}">
				<option value=""></option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">班级id</label>
				  	<div class="fr-form-block">
				<select id="classxx"  class="fr-form-control" name="m:teachInfo:classxxId"  validate="{required:false}">
				<option value=""></option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">时间</label>
				  	<div class="fr-form-block">
				<select id="day"  class="fr-form-control" name="m:teachInfo:day"  validate="{required:false}">
				<option value=""></option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">节次</label>
				  	<div class="fr-form-block">
				<select id="section"  class="fr-form-control" name="m:teachInfo:section" validate="{required:false}">
				<option value=""></option>
				</select>
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
	var name = ${name};
	$("#tch").select2({

 		data : tch,  
		placeholder : name,
		cache : true,
		allowClear : true
	});

	var classxx = ${classxx};
	var classxx1 = ${classxx1};
	$("#classxx").select2({
 		data : classxx1, 
		placeholder : classxx,
		cache : true,
		allowClear : true
	});


	var day = ${day};
	var day1 = ${day1};
	$("#day").select2({
 		data : day1, 
		placeholder : day,
		cache : true,
		allowClear : true
	});

	var section = ${section};
	var section1 = ${section1};
	$("#section").select2({
 		data : section1, 
		placeholder : section,
		cache : true,
		allowClear : true
	});

	
</script>		
</html>
