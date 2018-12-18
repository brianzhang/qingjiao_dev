<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="codemirror/lib/codemirror.css" />
		<link href="${ctx}/styles/default/css/lc/bpmn/bpmNodeDefCondition.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/RuleConditionDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/ScriptDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<link href="${ctx}/styles/commons/css/jqueryui/plugins/link-div-default.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.linkdiv.js"></script> 
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeRule.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmAgentCondition.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content animated fadeInRight col-sm-12">

			<form  class="fr-form"  id="bpmAgentConditionForm" action="save.htm" >
				<input type="hidden" name="m:bpmAgentCondition:id"  value="${bpmAgentCondition.id}"/>
				<input type="hidden" name="m:bpmAgentCondition:agentId"  value="${bpmAgentCondition.agentId}"/>
				<br>
				<div class="fr_response_field col-sm-12" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">代理人</label>
					  	<div class="fr-form-block">

						<div class="fr-selector" data-toggle="selector" data-type="user" 
							data-bind-id="m:bpmAgentCondition:agenterId" >
							<ul class="selector-list"></ul>
							<textarea style="display: none"   
							name="m:bpmAgentCondition:agenterId" >${bpmAgentCondition.agenterId}</textarea>
							<textarea style="display: none"   
							data-control="selector"  name="m:bpmAgentCondition:agenterName" >${bpmAgentCondition.agenterName}</textarea>
						</div>
					 	</div>
				  	</div>
				</div>
		
			 	<div class="fr_response_field col-sm-12" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">条件名称</label>
					  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" name="m:bpmAgentCondition:name" value="${bpmAgentCondition.name}" validate="{required:true}"/>
					 	</div>
				  	</div>
				</div>
				
			 	<div class="fr_response_field col-sm-12" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">条件描述</label>
					  	<div class="fr-form-block">
							<textarea class="fr-form-control fr-control-textarea" name="m:bpmAgentCondition:desc" 
								validate="{required:false}" >${bpmAgentCondition.desc}</textarea>
							<textarea class="hidden" name="m:bpmAgentCondition:condition" >${fn:escapeXml(bpmAgentCondition.condition)}</textarea>
					 	</div>
				  	</div>
				</div>
				
				<div class="fr_response_field col-sm-12" >
					<fieldset class="scheduler-border">
						<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;"><span>规则设置</span></legend>
						<div style="height:auto; margin-top: 5px">
							<div class="datagrid-toolbar" style="height: 36px; text-align: right;">
								 <a onclick="bpmAgentCondition._addDiv(1)" 	class="btn btn-sm btn-primary fa fa-add ">添加规则 </a>
								 <a onclick="bpmAgentCondition._addDiv(2)" 	class="btn btn-sm btn-primary fa  fa-add">添加脚本</a>
								 <a onclick="bpmAgentCondition._assembleDiv()" class="btn btn-sm btn-primary fa fa-sign-in">组合规则</a>
								 <a onclick="bpmAgentCondition._splitDiv()"	class="btn btn-sm btn-primary fa fa-sign-out">拆分规则</a>
								 <a onclick="bpmAgentCondition._removeDiv()" class="btn btn-sm btn-primary fa fa-remove">删除</a>
							</div>
							<div>
								 <div id="ruleDiv" style="margin:5px 0 0 0;"></div>
							</div>
						</div>
					</fieldset>
				</div>
			</form>

		</div>
	</body>
</html>
