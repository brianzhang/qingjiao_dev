<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
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
					<form  class="fr-form"  id="bpmTaskChangeForm" >
					 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">事项标题</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmTaskChange.taskSubject}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">任务名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmTaskChange.taskName}</p>
				 	</div>
			  	</div>
			</div>
					 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更改类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${bpmTaskChange.changeType=='assignee'}">代理</c:if><c:if test="${bpmTaskChange.changeType=='shift'}">转办</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">状态</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${bpmTaskChange.status=='running'}">运行中</c:if><c:if test="${bpmTaskChange.status=='finish'}">完成</c:if><c:if test="${bpmTaskChange.status=='cancel'}">取消</c:if></p>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">委托人</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmTaskChange:ownerId"  data-rights="r">
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
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bpmTaskChange:executorId"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   name="m:bpmTaskChange:executorId" >${bpmTaskChange.executorId}</textarea>
					<textarea style="display: none"   data-control="selector"  name="m:bpmTaskChange:executorName" >${bpmTaskChange.executorName}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${bpmTaskChange.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">完成时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${bpmTaskChange.completeTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">变更描述</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmTaskChange.comment}</p>
				 	</div>
			  	</div>
			</div>
	  
		<table name="s:bpmTaskChangeAssign" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">任务变更候选人</div>
			</caption>
			<thead>
				<tr>
	       			 <th>候选人类型</th>
	       			 <th>执行人</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach varStatus="stat" var="bpmTaskChangeAssign" items="${bpmTaskChange.bpmTaskChangeAssignPoList}">	
					<tr>	
				 		<td>
							<p class="form-control-static">
							<c:if test="${bpmTaskChangeAssign.type == 'user'}">用户</c:if>
							<c:if test="${bpmTaskChangeAssign.type == 'org'}">组织</c:if>
							<c:if test="${bpmTaskChangeAssign.type == 'pos'}">岗位</c:if>
							<c:if test="${bpmTaskChangeAssign.type == 'role'}">角色</c:if>
							</p>
						</td>	
				 		<td>
							<p class="form-control-static">${bpmTaskChangeAssign.executorName}</p>
						</td>	
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</form>

			</div>
		</div>
	</body>
</html>
