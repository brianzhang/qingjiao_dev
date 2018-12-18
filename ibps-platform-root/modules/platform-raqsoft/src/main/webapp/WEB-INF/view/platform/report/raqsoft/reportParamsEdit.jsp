<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript">
			var controlType='${ reportParams.controlType }';
			var controlOptions = '${reportParams.controlOptions }';
		</script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/report/raqsoft/reportParams.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="reportParamsForm" action="${ctx}/report/reportParams/save.htm" >
				<input type="hidden" name="reportType"  value='${reportType?reportType:param.reportType}'/>
				<input type="hidden" name="m:reportParams:id"  value='${reportParams.id}'/>
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
					<c:forEach var="item"   items="${reportDataType }">
					    <option value="${item.value }" <c:if test="${reportParams.dataType==item.value}">selected="selected"</c:if>>${item.label }</option>
					</c:forEach>
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
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">控件类型</label>
				  	<div class="fr-form-block">
						<select class="fr-form-control controlType-select" name="m:reportParams:controlType"  value="${reportParams.controlType}" validate="{required:false}">
						<c:forEach var="item" items="${reportControlType }" >
						    <option value="${item.key }" <c:if test="${reportParams.controlType==item.key}">selected="selected"</c:if>>${item.label }</option>
						</c:forEach>
						</select>
				 	</div>
			  	</div>
			</div>
			<input type="hidden" name="m:reportParams:controlOptions" id="controlOptions" value="${reportParams.controlOptions}" />
			
			</form>
			
			</div>
		</div>

<script type="text/html" id="s:reportParams:option">
<tr>
	<td><input type="radio" name="optionRadio" {{if checked==true}}checked{{/if}}></td>
	<td><input type="text" class="fr-form-control" placeholder="选项key" value="{{value}}"></td>
	<td><input type="text" class="fr-form-control" placeholder="展示值" value="{{label}}"></td>
	<td><i class="js-remove-option fa fa-minus-circle"></i></td>
</tr>
</script>
<script type="text/html" id="s:reportParams:select">
<div class="fr_response_field col-sm-12 option-select options" >
	<div class="fr-form-group">
		<label class="fr-control-label">控件选项</label>
		<div class="fr-form-block">
			<table class="option-table">{{option}}</table>
		</div>
		<div class="fr-form-block">
			<a  class="add-option-button">添加选项</a>
		</div>
	</div>
</div>
</script>
<script type="text/html" id="s:reportParams:datePicker">
<div class="fr_response_field col-sm-12 option-datePicker options" >
	<div class="fr-form-group">
	<label class="fr-control-label">控件选项</label>
	<div class="fr-form-block">
		<select class="fr-form-control">
			<option value="date" {{if dateType=='date'}}selected{{/if}} datefmt="yyyy-MM-dd">日期</option>
			<option value="datetime" {{if dateType=='datetime'}}selected{{/if}} datefmt="yyyy-MM-dd HH:mm:ss">日期时间</option>
			<option value="time" {{if dateType=='time'}}selected{{/if}} datefmt="HH:mm:ss">时间</option>
		</select>
	</div>
	</div>
</div>
</script>

	</body>
</html>
