<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/data/tchInfo.js"></script>
<script type="text/javascript">
	function in_click() {
		if($('#tch').val() == "") {
			DialogUtil.error("对不起,教师不能为空!");
		} 
		if($('#tchNum').val() == "") {
			DialogUtil.error("对不起,教师工号不能为空");
		} 
		if($('#subject').val() == "") {
			DialogUtil.error("对不起,科目不能为空!");
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
				<form  class="fr-form"  id="tchInfoForm" action="save.htm" >
					<input type="hidden" name="m:tchInfo:id"  value="${tchInfo.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学校</label>
				  	<div class="fr-form-block">
				<input type="text" readonly="readonly"  class="fr-form-control" name="m:tchInfo:school" value="${tchInfo.school}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教师姓名</label>
				  	<div class="fr-form-block">
				<input id="tch" type="text" class="fr-form-control" name="m:tchInfo:tchName" value="${tchInfo.tchName}" validate="{required:false}"/>

				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教师工号</label>
				  	<div class="fr-form-block">
				<input type="text" id="tchNum" class="fr-form-control" name="m:tchInfo:tchNum" value="${tchInfo.tchNum}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">科目</label>
				  	<div class="fr-form-block">
				<select id="subject" class="fr-form-control" name="m:tchInfo:subject" value="${tchInfo.subject}" validate="{required:false}">
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
 	var subject = ${subject}; 
	$("#subject").select2({
 				data : subject,
				placeholder : '请选择',
				cache : true,
				allowClear : true
			});
	
	
</script>
</html>
