<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/components/report/reportParams.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="reportParamsForm" action="save.htm" >
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:reportParams:name" value="${reportParams.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数描述</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:reportParams:desc" value="${reportParams.desc}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数据类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:reportParams:dataType"  value="${reportParams.dataType}" validate="{required:false}">
				    <option value="java.lang.Boolean" <c:if test="${reportParams.dataType=='java.lang.Boolean'}">selected="selected"</c:if>>java.lang.Boolean</option>
				    <option value="java.lang.Byte" <c:if test="${reportParams.dataType=='java.lang.Byte'}">selected="selected"</c:if>>java.lang.Byte</option>
				    <option value="java.lang.Date" <c:if test="${reportParams.dataType=='java.lang.Date'}">selected="selected"</c:if>>java.lang.Date</option>
				    <option value="java.sql.Timestamp" <c:if test="${reportParams.dataType=='java.sql.Timestamp'}">selected="selected"</c:if>>java.sql.Timestamp</option>
				    <option value="java.lang.Double" <c:if test="${reportParams.dataType=='java.lang.Double'}">selected="selected"</c:if>>java.lang.Double</option>
				    <option value="java.lang.Float" <c:if test="${reportParams.dataType=='java.lang.Float'}">selected="selected"</c:if>>java.lang.Float</option>
				    <option value="java.lang.Integer" <c:if test="${reportParams.dataType=='java.lang.Integer'}">selected="selected"</c:if>>java.lang.Integer</option>
				    <option value="java.lang.Long" <c:if test="${reportParams.dataType=='java.lang.Long'}">selected="selected"</c:if>>java.lang.Long</option>
				    <option value="java.lang.Short" <c:if test="${reportParams.dataType=='java.lang.Short'}">selected="selected"</c:if>>java.lang.Short</option>
				    <option value="java.math.BigDemical" <c:if test="${reportParams.dataType=='java.math.BigDemical'}">selected="selected"</c:if>>java.math.BigDemical</option>
				    <option value="java.lang.Number" <c:if test="${reportParams.dataType=='java.lang.Number'}">selected="selected"</c:if>>java.lang.Number</option>
				    <option value="java.lang.String" <c:if test="${reportParams.dataType=='java.lang.String'}">selected="selected"</c:if>>java.lang.String</option>
				    <option value="java.util.List" <c:if test="${reportParams.dataType=='java.util.List'}">selected="selected"</c:if>>java.util.List</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:reportParams:paramType"  value="${reportParams.paramType}" validate="{required:false}">
				    <option value="nomal" <c:if test="${reportParams.paramType=='nomal'}">selected="selected"</c:if>>普通参数</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数来源</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:reportParams:source"  value="${reportParams.source}" validate="{required:false}">
				    <option value="fixed" <c:if test="${reportParams.source=='fixed'}">selected="selected"</c:if>>固定值</option>
				    <option value="input" <c:if test="${reportParams.source=='input'}">selected="selected"</c:if>>表单输入</option>
				    <option value="script" <c:if test="${reportParams.source=='script'}">selected="selected"</c:if>>脚本</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参数值</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:reportParams:value" value="${reportParams.value}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">默认值</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:reportParams:defValue" value="${reportParams.defValue}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
