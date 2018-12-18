<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmOperLog.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="bpmOperLogForm" action="save.htm" >
					<input type="hidden" name="m:bpmOperLog:id"  value="${bpmOperLog.id}"/>
					<input type="text" class="fr-form-control" name="m:bpmOperLog:procDefId" value="${bpmOperLog.procDefId}" validate="{required:false"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">流程业务主键</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperLog:procDefKey" value="${bpmOperLog.procDefKey}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">任务节点ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperLog:nodeId" value="${bpmOperLog.nodeId}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
					<input type="text" class="fr-form-control" name="m:bpmOperLog:procInstId" value="${bpmOperLog.procInstId}" validate="{required:false"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">事项标题</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperLog:procInstSubject" value="${bpmOperLog.procInstSubject}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
					<input type="text" class="fr-form-control" name="m:bpmOperLog:taskId" value="${bpmOperLog.taskId}" validate="{required:false"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作意见</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:bpmOperLog:option"  validate="{required:false}">${bpmOperLog.option}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:bpmOperLog:operType"  value="${bpmOperLog.operType}" validate="{required:false}">
				    <option value="agree" <c:if test="${bpmOperLog.operType=='agree'}">selected="selected"</c:if>>同意</option>
				    <option value="oppose" <c:if test="${bpmOperLog.operType=='oppose'}">selected="selected"</c:if>>反对</option>
				    <option value="instEnd" <c:if test="${bpmOperLog.operType=='instEnd'}">selected="selected"</c:if>>实例终止</option>
				    <option value="instStart" <c:if test="${bpmOperLog.operType=='instStart'}">selected="selected"</c:if>>实例启动</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否干预</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:bpmOperLog:interpose" class="ibps" value="Y"   <c:if test="${bpmOperLog.interpose=='Y'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:bpmOperLog:interpose" class="ibps" value="N"   <c:if test="${bpmOperLog.interpose=='N'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作内容</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:bpmOperLog:content"  validate="{required:false}">${bpmOperLog.content}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperLog:createBy" value="${bpmOperLog.createBy}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd HH:mm:ss"   name="m:bpmOperLog:createTime"   value="<fmt:formatDate value="${bpmOperLog.createTime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
		
	</body>
</html>
