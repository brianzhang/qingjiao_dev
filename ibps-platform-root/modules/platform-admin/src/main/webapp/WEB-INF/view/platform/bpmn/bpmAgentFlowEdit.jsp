<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmAgent.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="bpmAgentForm" action="save.htm" >
					<input type="hidden" name="m:bpmAgent:id"  value="${bpmAgent.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">标题</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bpmAgent:title" value="${bpmAgent.title}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">代理类型</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:bpmAgent:agentType" class="ibps" value="all"   <c:if test="${bpmAgent.agentType=='all'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">全权代理</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:bpmAgent:agentType" class="ibps" value="part"   <c:if test="${bpmAgent.agentType=='part'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">部分代理</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:bpmAgent:agentType" class="ibps" value="condition"   <c:if test="${bpmAgent.agentType=='condition'}">checked="checked"</c:if>  validate="{required:false}"/>
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
					    <input type="radio" name="m:bpmAgent:isEnabled" class="ibps" value="enabled"   <c:if test="${bpmAgent.isEnabled=='enabled'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">启用</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:bpmAgent:isEnabled" class="ibps" value="disabled"   <c:if test="${bpmAgent.isEnabled=='disabled'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">禁用</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">委托人</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmAgent:">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:bpmAgent:delegatorId" >${bpmAgent.delegatorId}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">生效时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:bpmAgent:effectiveTime"   value="<fmt:formatDate value="${bpmAgent.effectiveTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">失效时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:bpmAgent:expiryTime"   value="<fmt:formatDate value="${bpmAgent.expiryTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
					<input type="text" class="fr-form-control" name="m:bpmAgent:createBy" value="${bpmAgent.createBy}" validate="{required:false}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:bpmAgent:createTime"   value="<fmt:formatDate value="${bpmAgent.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">代理人</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmAgent:">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:bpmAgent:agenterId" >${bpmAgent.agenterId}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
	  
		<table name="s:bpmAgentDef" data-mode="inner" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">流程代理定义</div>
				<div class="fr-table-tools">
							<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
							<a class="btn btn-primary fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
				</div>
			</caption>
			<thead>
				<tr>
		     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:bpmAgentDef" type="checkbox"></th>
	       			 <th>代理ID</th>
	       			 <th>流程key</th>
	       			 <th>节点ID</th>
		      	<th class="fr_table_col_remove" width="45px">管理</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach var="bpmAgentDef" items="${bpmAgent.bpmAgentDefPoList}">	
					<tr>	
						<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmAgentDef" ></td>
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:bpmAgentDef:agentId" value="${bpmAgentDef.agentId}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:bpmAgentDef:procDefKey" value="${bpmAgentDef.procDefKey}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:bpmAgentDef:nodeId" value="${bpmAgentDef.nodeId}" validate="{required:false}"/>
												</td>	
						<td class="fr_table_col_remove" width="45px">
									
								<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
	<script type="text/html" id="s:bpmAgentDef:TrTemplate">
	 
		<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmAgentDef" ></td>
	 	 	 	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:bpmAgentDef:agentId"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:bpmAgentDef:procDefKey"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:bpmAgentDef:nodeId"  validate="{required:false}"/>
			</td>
		  	<td class="fr_table_col_remove" width="45px">
				<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
			</td>
		</tr>
	</script>
	  
		<table name="s:bpmAgentCondition" data-mode="dialog" class="table table-bordered table-hover table-condensed">
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
	       			 <th>代理ID</th>
	       			 <th>代理人ID</th>
	       			 <th>条件名称</th>
	       			 <th>条件描述</th>
	       			 <th>条件内容</th>
		      	<th class="fr_table_col_remove" width="75px">管理</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach var="bpmAgentCondition" items="${bpmAgent.bpmAgentConditionPoList}">	
					<tr>	
						<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmAgentCondition" ></td>
				 		<td>
							
							<input type="hidden" name="s:bpmAgentCondition:agentId"  value="${bpmAgent.agentId}"/><span>${bpmAgent.agentId}</span>
						</td>	
				 		<td>
							
							<input type="hidden" name="s:bpmAgentCondition:agenterId"  value="${bpmAgent.agenterId}"/><span>${bpmAgent.agenterId}</span>
						</td>	
				 		<td>
							
							<input type="hidden" name="s:bpmAgentCondition:name"  value="${bpmAgent.name}"/><span>${bpmAgent.name}</span>
						</td>	
				 		<td>
							
							<input type="hidden" name="s:bpmAgentCondition:desc"  value="${bpmAgent.desc}"/><span>${bpmAgent.desc}</span>
						</td>	
				 		<td>
							
							<input type="hidden" name="s:bpmAgentCondition:condition"  value="${bpmAgent.condition}"/><span>${bpmAgent.condition}</span>
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
	 	 	 <input type="hidden" name="s:bpmAgentCondition:id"  value="{{id}}"/>	 	 	 
	 		<td>
	 			<input type="hidden" name="s:bpmAgentCondition:agentId"  value="{{agentId}}"/><span>{{agentId}}<span>
	 		</td>
	 	 	 
	 		<td>
	 			<input type="hidden" name="s:bpmAgentCondition:agenterId"  value="{{agenterId}}"/><span>{{agenterId}}<span>
	 		</td>
	 	 	 
	 		<td>
	 			<input type="hidden" name="s:bpmAgentCondition:name"  value="{{name}}"/><span>{{name}}<span>
	 		</td>
	 	 	 
	 		<td>
	 			<input type="hidden" name="s:bpmAgentCondition:desc"  value="{{desc}}"/><span>{{desc}}<span>
	 		</td>
	 	 	 
	 		<td>
	 			<input type="hidden" name="s:bpmAgentCondition:condition"  value="{{condition}}"/><span>{{condition}}<span>
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
		
		<script type="text/html" id="bpmAgentDefPoListTrTemplate">
			<tr>
				<td>{{index}}</td>
				<td>
					<input type="text" class="form-control" name="procDefKey" value="" validate="{required:false,maxlength:192}"/>
				</td>
				<td>
					<input type="text" class="form-control" name="nodeId" value="" validate="{required:false,maxlength:192}"/>
				</td>
				<td>
					<a class="btn btn-primary fa fa-remove" href="javascript:void(0);" onclick="bpmAgent.removeSub('bpmAgentDefPoList',this);"><span>删除</span></a>
				</td>
			</tr>
		</script>
		<script type="text/html" id="bpmAgentConditionPoListTrTemplate">
			<tr>
				<td>{{index}}</td>
				<td>
					<input type="text" class="form-control" name="agenterId" value="" validate="{required:false,maxlength:192}"/>
				</td>
				<td>
					<input type="text" class="form-control" name="name" value="" validate="{required:false,maxlength:192}"/>
				</td>
				<td>
					<input type="text" class="form-control" name="desc" value="" validate="{required:false,maxlength:765}"/>
				</td>
				<td>
					<input type="text" class="form-control" name="condition" value="" validate="{required:false}"/>
				</td>
				<td>
					<a class="btn btn-primary fa fa-remove" href="javascript:void(0);" onclick="bpmAgent.removeSub('bpmAgentConditionPoList',this);"><span>删除</span></a>
				</td>
			</tr>
		</script>
	</body>
</html>
