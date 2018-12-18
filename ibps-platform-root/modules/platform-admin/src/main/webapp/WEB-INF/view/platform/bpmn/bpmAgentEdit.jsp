<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
		<%-- <script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script> --%>
		
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmAgent.js"></script>
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
				<form  class="fr-form"  id="bpmAgentForm" action="save.htm" >
					<input type="hidden" name="m:bpmAgent:id"  value="${bpmAgent.id}"/>
					<input type="hidden" name="m:bpmAgent:createBy" value="${bpmAgent.createBy}" />
					<textarea class="hidden" name="m:bpmAgent:delegatorId" >${bpmAgent.delegatorId}</textarea>
					<input type="hidden" name="m:bpmAgent:createTime" value="<fmt:formatDate value="${bpmAgent.createTime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" />
				 	<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">标题</label>
						  	<div class="fr-form-block">
						<input type="text" class="fr-form-control" name="m:bpmAgent:title" value="${bpmAgent.title}" validate="{required:true}"/>
						 	</div>
					  	</div>
					</div>
					 <div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">代理类型</label>
						  	<div class="fr-form-block">
							<label class="fr-control-option radio-inline">
							    <input type="radio" name="m:bpmAgent:agentType" class="ibps" value="all"   <c:if test="${empty bpmAgent || bpmAgent.agentType=='all'}">checked="checked"</c:if>  validate="{required:true}"/>
							   	<span class="lbl">全权代理</span>
						  </label>
							<label class="fr-control-option radio-inline">
							    <input type="radio" name="m:bpmAgent:agentType" class="ibps" value="part"   <c:if test="${bpmAgent.agentType=='part'}">checked="checked"</c:if>  validate="{required:true}"/>
							   	<span class="lbl">部分代理</span>
						  </label>
							<label class="fr-control-option radio-inline">
							    <input type="radio" name="m:bpmAgent:agentType" class="ibps" value="condition"   <c:if test="${bpmAgent.agentType=='condition'}">checked="checked"</c:if>  validate="{required:true}"/>
							   	<span class="lbl">条件代理</span>
						  </label>
						 	</div>
					  	</div>
					</div>
					 <div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">是否启用</label>
						  	<div class="fr-form-block">
							<label class="fr-control-option radio-inline">
							    <input type="radio" name="m:bpmAgent:isEnabled" class="ibps" value="enabled"   <c:if test="${empty bpmAgent || bpmAgent.isEnabled=='enabled'}">checked="checked"</c:if>  validate="{required:true}"/>
							   	<span class="lbl">启用</span>
						  </label>
							<label class="fr-control-option radio-inline">
							    <input type="radio" name="m:bpmAgent:isEnabled" class="ibps" value="disabled"   <c:if test="${bpmAgent.isEnabled=='disabled'}">checked="checked"</c:if>  validate="{required:true}"/>
							   	<span class="lbl">禁用</span>
						  </label>
						 	</div>
					  	</div>
					</div>
					
					<c:if test="${isSuper == true}">
					<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">委托人</label>
						  	<div class="fr-form-block">
						<div class="fr-selector" data-toggle="selector" data-type="user" data-single="true" data-bind-id="m:bpmAgent:delegatorId">
							<ul class="selector-list"></ul>
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
						<div class="input-icon" >
							<i class="fa fa-calendar datepicker-icon"></i>
							<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:bpmAgent:effectiveTime"   value="<fmt:formatDate value="${bpmAgent.effectiveTime}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
						</div>
						 	</div>
					  	</div>
					</div>
					 <div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">失效时间</label>
						  	<div class="fr-form-block">
						<div class="input-icon" >
							<i class="fa fa-calendar datepickericon"></i>
							<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:bpmAgent:expiryTime"   value="<fmt:formatDate value="${bpmAgent.expiryTime}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
						</div>
						 	</div>
					  	</div>
					</div>
					 <div id="agentor-div" class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">代理人</label>
						  	<div class="fr-form-block">
						<div class="fr-selector" data-toggle="selector" data-type="user" data-single="true" data-bind-id="m:bpmAgent:agenterId">
							<ul class="selector-list"></ul>
							<textarea style="display: none"   name="m:bpmAgent:agenterId" >${bpmAgent.agenterId}</textarea>
							<textarea style="display: none"   data-control="selector"  name="m:bpmAgent:agenterName" >${bpmAgent.agenterName}</textarea>
						 </div>
						 	</div>
					  	</div>
					</div>
					<div id="procdef-div" class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">流程名称</label>
						  	<div class="fr-form-block">
						  		<div class="input-group">
									<input type="hidden" name="m:bpmAgent:procDefId"  id="procDefId" value="${bpmAgent.procDefId }"/> 
									<input type="hidden" name="m:bpmAgent:procDefKey"  id="procDefKey" value="${bpmAgent.procDefKey }"/> 
	                               	<input type="text" class="form-control"  id="procDefName" readonly="readonly" value="${bpmAgent.procDefName }"/>
	                           	  	<span class="input-group-btn">
	                           	  		<button type="button" class="btn  btn-info btn-mm"  
	                           	  			 id="flowSelector" data-single="true"  data-id="#procDefId" data-key="#procDefKey" data-name="#procDefName" >
	                           	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
	                           	  		<button type="button" class="btn btn-info btn-mm" 
			                               	 id="flowClear" data-id="#procDefId" data-key="#procDefKey" data-name="#procDefName">
			                               	 <i class="fa fa-times"></i></button>
	                           	  	</span>
							 	</div>
						 	</div>
					  	</div>
					</div>
	  
					<table name="s:bpmAgentDef" data-mode="dialog" data-required="true" class="table table-bordered table-hover table-condensed">
						<caption>
							<div class="fr-table-header-label">流程定义</div>
							<div class="fr-table-tools">
										<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
										<a class="btn btn-primary fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
							</div>
						</caption>
						<thead>
							<tr>
					     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:bpmAgentDef" type="checkbox"></th>
				       			 <th>流程名称</th>
					      	<th class="fr_table_col_remove" width="45px">管理</th>
					    </tr>
						</thead>
						<tbody>	
							<c:forEach var="bpmAgentDef" items="${bpmAgent.bpmAgentDefPoList}">	
								<tr>	
									<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmAgentDef" ></td>
							 		<td>
										<input type="hidden" name="s:bpmAgentDef:id" value="${bpmAgentDef.id}"/>
										<input type="hidden" name="s:bpmAgentDef:agentId" value="${bpmAgentDef.agentId}"/>
										<input type="hidden" name="s:bpmAgentDef:procDefKey" value="${bpmAgentDef.procDefKey}"/>
										<input type="hidden" name="s:bpmAgentDef:nodeId" value="${bpmAgentDef.nodeId}"/>
										<span>${bpmAgentDef.procDefName}</span>
									</td>	
									<td class="fr_table_col_remove" width="45px">
										<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);">
											<i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i>
										</a>
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
						
	<script type="text/html" id="s:bpmAgentDef:TrTemplate">
		<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmAgentDef" ></td>
	 	 	 <td>
				<input type="hidden" name="s:bpmAgentDef:id" value="{{id}}"/>
				<input type="hidden" name="s:bpmAgentDef:agentId" value="{{agentId}}"/>
				<input type="hidden" name="s:bpmAgentDef:procDefKey" value="{{procDefKey}}"/>
				<input type="hidden" name="s:bpmAgentDef:nodeId" value="{{nodeId}}"/>
				<span>{{procDefName}}</span>
			</td>
		  	<td class="fr_table_col_remove" width="45px">
				<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
			</td>
		</tr>
	</script>
					  
					<table name="s:bpmAgentCondition" data-mode="dialog" data-required="true" class="table table-bordered table-hover table-condensed">
							<caption>
								<div class="fr-table-header-label">流程代理条件</div>
								<div class="fr-table-tools">
											<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
											<a class="btn btn-primary fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
								</div>
							</caption>
							<thead>
								<tr>
						     		 <th class="fr_table_col_checkbox" width="75px"><input role="checkbox" class="checkAll" name="s:bpmAgentCondition" type="checkbox"></th>
					       			 <th>代理人</th>
					       			 <th>条件名称</th>
						      	<th class="fr_table_col_remove" width="75px">管理</th>
						    </tr>
							</thead>
							<tbody>	
								<c:forEach var="bpmAgentCondition" items="${bpmAgent.bpmAgentConditionPoList}">	
									<tr>	
										<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmAgentCondition" ></td>
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
										<td class="fr_table_col_remove" width="75px">
												<a title="编辑" class="btn  btn-xs btn-outline btn-row js-edit-row" href="javascript:void(0);"><i class=" fa fa-edit  fa-lg fa-font-green"></i></a>	
												<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
										</td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
						
					<script type="text/html" id="s:bpmAgentCondition:TrTemplate">
			<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmAgentCondition" ></td>
	 		<td>
	 	 	 	<input type="hidden" name="s:bpmAgentCondition:id"  value="{{id}}"/>	 	 	 
	 			<input type="hidden" name="s:bpmAgentCondition:agentId"  value="{{agentId}}"/>
	 			<input type="hidden" name="s:bpmAgentCondition:agenterId"  value="{{agenterId}}"/>
				<input type="hidden" name="s:bpmAgentCondition:agenterName"  value="{{agenterName}}"/>
				<span>{{agenterName}}<span>
	 		</td>
	 		<td>
	 			<input type="hidden" name="s:bpmAgentCondition:name"  value="{{name}}"/>
	 			<input type="hidden" name="s:bpmAgentCondition:desc"  value="{{desc}}"/>
				<textarea class="hidden" name="s:bpmAgentCondition:condition" >{{condition}}</textarea>
				<span>{{name}}<span>
	 		</td>
		  	<td class="fr_table_col_remove" width="75px">
		  		<a title="编辑" class="btn  btn-xs btn-outline btn-row js-edit-row" href="javascript:void(0);"><i class=" fa fa-edit  fa-lg fa-font-green"></i></a>
				<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
			</td>
		</tr>
	</script>
				</form>
			</div>
		</div>
	</body>
</html>
