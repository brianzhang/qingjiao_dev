<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskChange.js"></script>
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
				<form  class="fr-form"  id="bpmTaskChangeForm" action="save.htm" >
					<input type="hidden" name="m:bpmTaskChange:id"  value="${bpmTaskChange.id}"/>
					<input type="hidden" name="m:bpmTaskChange:createTime"   value="<fmt:formatDate value="${bpmTaskChange.createTime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" />
					<input type="hidden" name="m:bpmTaskChange:completeTime" value="<fmt:formatDate value="${bpmTaskChange.completeTime}"  pattern="yyyy-MM-dd HH:mm:ss"/>" />
					<input type="hidden" name="m:bpmTaskChange:taskId" value="${bpmTaskChange.taskId}" />
					<input type="hidden" name="m:bpmTaskChange:procInstId" value="${bpmTaskChange.procInstId}" />
					<input type="hidden" name="m:bpmTaskChange:nodeId" value="${bpmTaskChange.nodeId}" />
					
			 	<div class="fr_response_field col-sm-6" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">事项标题</label>
					  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" readonly name="m:bpmTaskChange:taskSubject" value="${bpmTaskChange.taskSubject}" />
					 	</div>
				  	</div>
				</div>
			 	<div class="fr_response_field col-sm-6" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">任务名称</label>
					  	<div class="fr-form-block">
					<input type="text" class="fr-form-control " readonly name="m:bpmTaskChange:taskName" value="${bpmTaskChange.taskName}" />
					 	</div>
				  	</div>
				</div>
			 	<div class="fr_response_field col-sm-6" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">更改类型</label>
					  	<div class="fr-form-block">
							<select class="fr-form-control" name="m:bpmTaskChange:changeType" disabled value="${bpmTaskChange.changeType}" validate="{required:false}">
							    <option value="assignee" <c:if test="${bpmTaskChange.changeType=='assignee'}">selected="selected"</c:if>>代理</option>
							    <option value="shift" <c:if test="${bpmTaskChange.changeType=='shift'}">selected="selected"</c:if>>转办</option>
							</select>
					 	</div>
				  	</div>
				</div>
			 	<div class="fr_response_field col-sm-6" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">状态</label>
					  	<div class="fr-form-block">
							<select class="fr-form-control" name="m:bpmTaskChange:status" disabled value="${bpmTaskChange.status}" validate="{required:false}">
							    <option value="running" <c:if test="${bpmTaskChange.status=='running'}">selected="selected"</c:if>>运行中</option>
							    <option value="finish" <c:if test="${bpmTaskChange.status=='finish'}">selected="selected"</c:if>>完成</option>
							    <option value="cancel" <c:if test="${bpmTaskChange.status=='cancel'}">selected="selected"</c:if>>取消</option>
							</select>
					 	</div>
				  	</div>
				</div>
				<div class="fr_response_field col-sm-6" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">委托人</label>
					  	<div class="fr-form-block">
						<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmTaskChange:ownerId" data-rights="r">
							<ul class="selector-list"></ul>
							<textarea style="display: none"   name="m:bpmTaskChange:ownerId" >${bpmTaskChange.ownerId}</textarea>
							<textarea style="display: none"   data-control="selector"  name="m:bpmTaskChange:ownerName" >${bpmTaskChange.ownerName}</textarea>
						</div>
					 	</div>
				  	</div>
				</div>
				<div class="fr_response_field col-sm-6" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">执行人</label>
					  	<div class="fr-form-block">
						<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmTaskChange:executorId" data-rights="r">
							<ul class="selector-list"></ul>
							<textarea style="display: none"   name="m:bpmTaskChange:executorId" >${bpmTaskChange.executorId}</textarea>
							<textarea style="display: none"   data-control="selector"  name="m:bpmTaskChange:executorName" >${bpmTaskChange.executorName}</textarea>
						</div>
					 	</div>
				  	</div>
				</div>
				<div class="fr_response_field col-sm-12" >
				 	<div class="fr-form-group"> 
					 	<label class="fr-control-label">变更描述</label>
					  	<div class="fr-form-block">
							<textarea class="fr-form-control fr-control-textarea"  name="m:bpmTaskChange:comment"  validate="{required:false}">${bpmTaskChange.comment}</textarea>
					 	</div>
				  	</div>
				</div>
	  
				<table name="s:bpmTaskChangeAssign" data-mode="dialog" data-required="true" class="table table-bordered table-hover table-condensed">
					<caption>
						<div class="fr-table-header-label">任务变更候选人</div>
						<div class="fr-table-tools">
							<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
							<a class="btn btn-danger fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
						</div>
					</caption>
					<thead>
						<tr>
				     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:bpmTaskChangeAssign" type="checkbox"></th>
			       			 <th>候选人类型</th>
			       			 <th>执行人</th>
				      	<th class="fr_table_col_remove" width="45px">管理</th>
				    </tr>
					</thead>
					<tbody>	
						<c:forEach varStatus="stat" var="bpmTaskChangeAssign" items="${bpmTaskChange.bpmTaskChangeAssignPoList}">	
							<tr>	
								<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmTaskChangeAssign" ></td>
						 		<td>
									<input type="hidden" name="s:bpmTaskChangeAssign:type:${stat.index+1}"  value="${bpmTaskChange.type}"/><span>${bpmTaskChange.typeName}</span>
								</td>	
						 		<td>
									<input type="hidden" name="s:bpmTaskChangeAssign:executor:${stat.index+1}"  value="${bpmTaskChange.executor}"/><span>${bpmTaskChange.executorName}</span>
								</td>	
								<td class="fr_table_col_remove" width="45px">
									<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
								</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
		
	<script type="text/html" id="s:bpmTaskChangeAssign:TrTemplate">
			<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmTaskChangeAssign" ></td>
	 	 	<input type="hidden" name="s:bpmTaskChangeAssign:id:{{idx}}"  value="{{id}}"/>	 	 	 
			<input type="hidden" name="s:bpmTaskChangeAssign:taskChangeId:{{idx}}"  value="{{taskChangeId}}"/>	 	 	 
	 		<td>
	 			<input type="hidden" name="s:bpmTaskChangeAssign:type:{{idx}}"  value="{{type}}"/><span>{{typeName}}<span>
	 		</td>
	 		<td>
	 			<input type="hidden" name="s:bpmTaskChangeAssign:executor:{{idx}}"  value="{{executor}}"/><span>{{executorName}}<span>
	 		</td>
		  	<td class="fr_table_col_remove" width="45px">
				<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
			</td>
		</tr>
	</script>
				</form>

			</div>
		</div>
	</body>
</html>
