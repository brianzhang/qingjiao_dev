<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmOperNotify.js"></script>
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
				<form  class="fr-form"  id="bpmOperNotifyForm" action="save.htm" >
					<input type="hidden" name="m:bpmOperNotify:id"  value="${bpmOperNotify.id}"/>
					<input type="text" class="fr-form-control" name="m:bpmOperNotify:procDefId" value="${bpmOperNotify.procDefId}" validate="{required:false}"/>
					<input type="text" class="fr-form-control" name="m:bpmOperNotify:procInstId" value="${bpmOperNotify.procInstId}" validate="{required:false}"/>
					<input type="text" class="fr-form-control" name="m:bpmOperNotify:bpmnDefId" value="${bpmOperNotify.bpmnDefId}" validate="{required:false}"/>
					<input type="text" class="fr-form-control" name="m:bpmOperNotify:bpmnInstId" value="${bpmOperNotify.bpmnInstId}" validate="{required:false}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">节点ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperNotify:nodeId" value="${bpmOperNotify.nodeId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知标题</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperNotify:notifyTitle" value="${bpmOperNotify.notifyTitle}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知类型</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:bpmOperNotify:notifyType" class="ibps" value="cc"   <c:if test="${bpmOperNotify.notifyType=='cc'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">抄送</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:bpmOperNotify:notifyType" class="ibps" value="bcc"   <c:if test="${bpmOperNotify.notifyType=='bcc'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">密送</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:bpmOperNotify:notifyType" class="ibps" value="fw"   <c:if test="${bpmOperNotify.notifyType=='fw'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">转发</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知内容富文本</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:bpmOperNotify:notifyHtmlContent" style="display: none;" validate="{required:false}">${fn:escapeXml(bpmOperNotify.notifyHtmlContent)}</textarea>
				<script id="m:bpmOperNotify:notifyHtmlContentEditor" data-name="m:bpmOperNotify:notifyHtmlContent" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知内容</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmOperNotify:notifyContent" value="${bpmOperNotify.notifyContent}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知人</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmOperNotify:notifier">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:bpmOperNotify:notifier" >${bpmOperNotify.notifier}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通知时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd HH:mm:ss"   name="m:bpmOperNotify:createTime"   value="<fmt:formatDate value="${bpmOperNotify.createTime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
