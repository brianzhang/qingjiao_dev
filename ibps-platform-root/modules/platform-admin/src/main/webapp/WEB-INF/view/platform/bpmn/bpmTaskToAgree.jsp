<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<title>任务办理</title>
<%@include file="/commons/include/get.jsp"%>

</head>
<body>
	<div class="wrapper wrapper-content col-sm-12">
		<form class="form-horizontal" id="agreeForm" action="complete.htm" method="post">
			<div class="panel-toolbar">
				<div class="buttons" >
					<a href="javascript:void(0)" class="btn btn-primary fa fa-save">确定</a> 
					<a href="javascript:void(0)" onclick="javascript:DialogUtil.closeDialog();" class="btn btn-default fa fa-close">取消</a>
					<c:if test="${directHandlerSign}">
					&nbsp;&nbsp;
					<label title="您拥有会签特权，可以对会签任务进行直接处理。" data-tip="position:{my:'top right',at:'bottom right'}">
					    <input type="checkbox" name="directHandlerSign" value="true" />特权：直接处理
					</label>
					</c:if>
				</div>
			</div>
			<!-- 按钮组end -->
			
			<c:if test="${actionName eq 'agree'}">
			<c:if test="${not empty pathOutgoingNodes}">
			<table id="pathTbl" class="table table-bordered table-hover table-condensed">
				<thead>
				<tr>
				<th>路径</th>
				<th>执行人</th>
				</tr>
				</thead>
				<tbody>
				<c:forEach items="${pathOutgoingNodes}" var="outgoingNode">
				<tr>
					<td>
						<label class="control-label">${outgoingNode.name}</label>
						<input type="hidden" name="destination" value="${outgoingNode.nodeId}"/>
					</td>
					<td>
			 			<div class="input-group">
							<span name="nodeUserSpan">
							<c:forEach items="${pathOutgoingNodesUsersMap[outgoingNode.nodeId]}" var="pathOutgoingNodeUsersMap">
								<label class="checkbox-inline">
								<input class="ibps" type="checkbox" name="nodeUser" checked="checked" value="${pathOutgoingNodeUsersMap.id },${pathOutgoingNodeUsersMap.name}"/>
								<span class="lbl">${pathOutgoingNodeUsersMap.name}</span></label>
							</c:forEach>
							</span>
							<a style="margin-left:1em;" href="javascript:void(0);" class="btn btn-xs btn-primary" onclick="bpmTaskToAgree.choosePathUser(this)">选择</a>
                        </div>
					</td>
				</tr>
				</c:forEach>
				</tbody>
			</table>
			</c:if>
			
			<table id="jumptbl" class="table table-bordered table-hover table-condensed">
				<tr>
					<td colspan="4">
						<c:if test="${fn:contains(jumpType, 'common')}">
						<label class="radio-inline" >
							 <input type="radio" class="ibps" name="jumpType" value="common" checked="checked" onchange="bpmTaskToAgree.selJumpType(this)"/>
							 <span class="lbl">正常跳转</span>
						</label>
						</c:if>
						<c:if test="${fn:contains(jumpType, 'select')}">
						<label class="radio-inline"> 
							<input type="radio" class="ibps"name="jumpType" value="select" onchange="bpmTaskToAgree.selJumpType(this)"/>
							<span class="lbl">选择路径跳转</span>
						</label>
						</c:if>
						<c:if test="${fn:contains(jumpType, 'free')}">
						<label class="radio-inline">
							 <input type="radio" class="ibps" name="jumpType" value="free" onchange="bpmTaskToAgree.selJumpType(this)"/>
							 <span class="lbl">自由跳转</span>
						</label>
						</c:if>
					</td>
				</tr>
				<tr id="jptselect">
					<td>
						<label class="control-label">选择路径</label>
					</td>
					<td>
						<select class="form-control" name="destination">
							<c:forEach items="${outgoingNodes}" var="outgoingNode">
								<option value="${outgoingNode.nodeId}" nodeType="${outgoingNode.type}">${outgoingNode.name}</option>
							</c:forEach>
						</select>
					</td>
					<td>
                     	<label class="control-label">选择执行人</label>
					</td>
					<td>
			 			<div class="input-group">
			 				<textarea id="outgoingNodesUsersMap" class="hide">${fn:escapeXml(outgoingNodesUsersMap)}</textarea>
							<span name="nodeUserSpan"></span>
							<a style="margin-left:1em;" href="javascript:void(0);" class="btn btn-xs btn-primary" onclick="bpmTaskToAgree.chooseUser()">选择</a>
                        </div>
					</td>
				</tr>
				<tr id="jptfree">
					<td>
						<label title="自由跳转目标节点" data-tip="position:{my:'top right',at:'bottom left'}" class="control-label">目标节点</label>
					</td>
					<td>
						<select class="form-control" name="destination">
							<c:forEach items="${allNodeDef}" var="nodeDef">
								<option value="${nodeDef.nodeId}" nodeType="${nodeDef.type}">${nodeDef.name}</option>
							</c:forEach>
						</select>
					</td>
					<td>
						<label class="control-label">选择执行人</label>
					</td>
					<td>
						<div class="input-group">
							<textarea id="allNodeDefUsersMap" class="hide">${fn:escapeXml(allNodeDefUsersMap)}</textarea>
							<span name="nodeUserSpan"></span>
							<a style="margin-left:1em;" href="javascript:void(0);" class="btn btn-xs btn-primary" onclick="bpmTaskToAgree.chooseUser()">选择</a>
	                    </div>
					</td>
				</tr>
			</table>
			</c:if>
			
			<div id="opinionDiv" class="form-group">
				<label class="col-sm-2 control-label">
					<c:choose>
						<c:when test="${actionName eq 'agree'}">审批意见</c:when>
						<c:when test="${actionName eq 'oppose'}">反对意见</c:when>
						<c:when test="${actionName eq 'abandon'}">弃权原因</c:when>
						<c:when test="${actionName eq 'agreeTrans'}">审批意见</c:when>
						<c:when test="${actionName eq 'opposeTrans'}">反对意见</c:when>
					</c:choose>:
				</label>
				<br>
				<div class="col-sm-10">
					<a href="javascript:void(0)" class="btn btn-info fa fa-commonStatment">常用语</a> 
					<textarea id = "opinion" name="opinion" cols="60" rows="5"  class="form-control" >${defaultCommonStatment.value }</textarea>
				</div>
			</div>
			
			<input type="hidden" name="taskId" value="${taskId}">
			<input type="hidden" name="actionName" value="${actionName}">
			<input type="hidden" id="nodeUsers" name="nodeUsers"/>
		</form>
	</div>
	<script type="text/javascript">
		var hidePath = "${hidePath}" ,hideOpinion = "${hideOpinion}", jumpType = "${jumpType}",actionName="${actionName}";
		
	</script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/StatmentDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskToAgree.js"></script>
	
	
</body>
</html>