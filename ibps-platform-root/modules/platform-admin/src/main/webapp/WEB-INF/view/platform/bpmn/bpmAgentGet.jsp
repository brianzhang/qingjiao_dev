<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmAgent.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="bpmAgentForm" >
				 	<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">标题</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${bpmAgent.title}</p>
						 	</div>
					  	</div>
					</div>
				 	<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">代理类型</label>
						  	<div class="fr-form-block">
								<p class="form-control-static"><c:if test="${bpmAgent.agentType=='all'}">全权代理</c:if><c:if test="${bpmAgent.agentType=='part'}">部分代理</c:if><c:if test="${bpmAgent.agentType=='condition'}">条件代理</c:if></p>
						 	</div>
					  	</div>
					</div>
				 	<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">是否启用</label>
						  	<div class="fr-form-block">
								<p class="form-control-static"><c:if test="${bpmAgent.isEnabled=='enabled'}">启用</c:if><c:if test="${bpmAgent.isEnabled=='disabled'}">禁用</c:if></p>
						 	</div>
					  	</div>
					</div>
					<c:if test="${isSuper == true}">
				 	<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">委托人</label>
						  	<div class="fr-form-block">
							<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmAgent:delegatorId"  data-rights="r">
								<ul class="selector-list"></ul>
								<textarea style="display: none"   name="m:bpmAgent:delegatorId" >${bpmAgent.delegatorId}</textarea>
								<textarea style="display: none"   data-control="selector"  name="m:bpmAgent:delegatorName" >${bpmAgent.delegatorName}</textarea>
							</div>
						 	</div>
					  	</div>
					</div>
					</c:if>
				 	<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">生效时间</label>
						  	<div class="fr-form-block">
									<p class="form-control-static"><fmt:formatDate value="${bpmAgent.effectiveTime}" /></p>		
						 	</div>
					  	</div>
					</div>
				 	<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">失效时间</label>
						  	<div class="fr-form-block">
									<p class="form-control-static"><fmt:formatDate value="${bpmAgent.expiryTime}" /></p>		
						 	</div>
					  	</div>
					</div>
				 	<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">创建时间</label>
						  	<div class="fr-form-block">
									<p class="form-control-static"><fmt:formatDate value="${bpmAgent.createTime}" /></p>		
						 	</div>
					  	</div>
					</div>
					<c:if test="${bpmAgent.agentType=='all' || bpmAgent.agentType=='part'}">
				 	<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">代理人</label>
						  	<div class="fr-form-block">
						<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmAgent:agenterId"  data-rights="r">
							<ul class="selector-list"></ul>
							<textarea style="display: none"   name="m:bpmAgent:agenterId" >${bpmAgent.agenterId}</textarea>
							<textarea style="display: none"   data-control="selector"  name="m:bpmAgent:agenterName" >${bpmAgent.agenterName}</textarea>
						</div>
						 	</div>
					  	</div>
					</div>
					</c:if>
					<c:if test="${bpmAgent.agentType=='condition'}">
					<div id="procdef-div" class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">流程名称</label>
						  	<div class="fr-form-block">
						  		<div class="input-group">
									<input type="hidden" name="m:bpmAgent:procDefId"  id="procDefId" value="${bpmAgent.procDefId }"/> 
									<input type="hidden" name="m:bpmAgent:procDefKey"  id="procDefKey" value="${bpmAgent.procDefKey }"/> 
	                               	<input type="text" class="form-control"  id="procDefName" readonly="readonly" value="${bpmAgent.procDefName }"/>
							 	</div>
						 	</div>
					  	</div>
					</div>
					</c:if>
	  
	  <c:if test="${bpmAgent.agentType=='part'}">
		<table name="s:bpmAgentDef" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">流程定义</div>
			</caption>
			<thead>
				<tr>
	       			 <th>流程名称</th>
		    	</tr>
			</thead>
			<tbody>	
				<c:forEach var="bpmAgentDef" items="${bpmAgent.bpmAgentDefPoList}">	
					<tr>	
				 		<td>
							<span>${bpmAgentDef.procDefName}</span>
						</td>	
					</tr>
				</c:forEach>
			</tbody>
		</table>
	  </c:if>
	  <c:if test="${bpmAgent.agentType=='condition'}">
		<table name="s:bpmAgentCondition" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">流程代理条件</div>
			</caption>
			<thead>
				<tr>
	       			 <th>代理人</th>
	       			 <th>条件名称</th>
			      	<th class="fr_table_col_remove" width="45px">管理</th>
		   		</tr>
			</thead>
			<tbody>	
				<c:forEach var="bpmAgentCondition" items="${bpmAgent.bpmAgentConditionPoList}">	
					<tr>	
				 		<td>
				 			<input type="hidden" name="s:bpmAgentCondition:id"  value="${bpmAgentCondition.id}"/>
				 			<input type="hidden" name="s:bpmAgentCondition:agentId"  value="${bpmAgentCondition.agentId}"/>
							<input type="hidden" name="s:bpmAgentCondition:agenterId"  value="${bpmAgentCondition.agenterId}"/>
							<input type="hidden" name="s:bpmAgentCondition:agenterName"  value="${bpmAgentCondition.agenterName}"/>
							<span>${bpmAgentCondition.agenterName}</span>
						</td>	
				 		<td>
							<input type="hidden" name="s:bpmAgentCondition:name"  value="${bpmAgentCondition.name}"/>
							<input type="hidden" name="s:bpmAgentCondition:desc"  value="${bpmAgentCondition.desc}"/>
							<textarea class="hidden" name="s:bpmAgentCondition:condition" >${fn:escapeXml(bpmAgentCondition.condition)}</textarea>
							<span>${bpmAgentCondition.name}</span>
						</td>	
						<td class="fr_table_col_remove" width="45px">
							<a title="查看" class="btn  btn-xs btn-outline btn-row js-detail-row" href="javascript:void(0);"><i class=" fa fa-detail  fa-lg fa-font-green"></i></a>	
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		</c:if>
	</form>

			</div>
		</div>
	</body>
</html>
