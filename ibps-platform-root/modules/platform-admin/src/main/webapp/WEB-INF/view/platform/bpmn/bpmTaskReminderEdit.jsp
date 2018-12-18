<%@page import="com.lc.ibps.bpmn.api.constant.NodeType"%>
<%@page import="com.lc.ibps.bpmn.api.constant.ScriptType"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskReminder.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>
		
		<f:link href="codemirror/lib/codemirror.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content animated fadeInRight col-sm-12">
		<input type="hidden" id="procDefId" value="${procDefId}"/>
		
		<div class="col-sm-12">
			<div class="tabs-container m-t-xs">
				<ul class="nav nav-tabs">
					<li class="active">
						<a href="#reminder-tab_cond" data-toggle="tab" aria-expanded="false">到期条件设置</a>
					</li>
					<li>
						<a href="#reminder-tab-act" data-toggle="tab" aria-expanded="true">到期动作设置</a>
					</li>
					<li>
						<a href="#reminder-tab-send" data-toggle="tab" aria-expanded="true">发送催办消息设置</a>
					</li>
					<li>
						<a href="#reminder-tab-msg" data-toggle="tab" aria-expanded="true">消息内容</a>
					</li>
				</ul>
			</div>
			
			<div class="tab-content">
				<div id="reminder-tab_cond" class="tab-pane active">
					<form id="conditionFrom">
						<input type="hidden" id="id" name="id"/>
						<table class="table-form" cellspacing="0">
							<tr>
								<th><span>名称:</span><span class="required">*</span></th>
								<td><input type="text" id="name" class="inputText" validate="{required:true,maxlength:128}"/></td>
								<th><span>当前节点:</span></th>
								<td><input type="text" id="nodeId" class="inputText" value="${nodeId}" readonly="readonly"  />
								</td>
							</tr>
							<tr>
								<th><span>相对节点:</span></th>
								<td><select id="relNodeId" class="inputText">
									<c:forEach items="${bpmNodeDefs}" var="bpmNodeDef">
										<option value="${bpmNodeDef.nodeId}"
										<c:if test="${bpmNodeDef.nodeId==reminderType.relNodeId}">selected="selected"</c:if>>${bpmNodeDef.name}(${bpmNodeDef.nodeId})</option>
									</c:forEach>
								</select>
								</td>
								<th><span>相对处理事件:</span></th>
								<td><select id="relNodeEvent" class="inputText">
										<option value="create">创建</option>
										<option value="complete">完成</option>
								</select>
								</td>
							</tr>
							<tr>
								<th><span>相对时间类型:</span></th>
								<td colspan="3">
									<select id="relTimeType" class="inputText" class="inputText" >
										<option value="caltime">日历日</option>
										<option value="worktime">工作日</option>
									</select>
								</td>
							</tr>
							<tr>
								<th><span>相对到期时间:</span></th>
								<td id="completeTr" colspan="3">
								<input type="text" id="dueTimeDay" class="inputText input-wh-2" validate="{digits:true }" /><span>天</span>
									<select id="dueTimeHour" class="inputText input-wh-2" >
										<c:forEach var="i" begin="0" end="23" step="1">
											<option value="${i}"
												<c:if test="${completeTimeHour==i}">selected="selected"</c:if>>${i}小时</option>
										</c:forEach>
									</select> 
									<select id="dueTimeMinute" class="inputText input-wh-2">
										<c:forEach var="i" begin="0" end="4" step="1">
											<option value="${i}"
												<c:if test="${completeTimeMinute==i}">selected="selected"</c:if>>${i}分钟</option>
										</c:forEach>
										<c:forEach var="i" begin="5" end="59" step="5">
											<option value="${i}"
												<c:if test="${completeTimeMinute==i}">selected="selected"</c:if>>${i}分钟</option>
										</c:forEach>
									</select>
								</td>
							</tr>
							<tr>
								<th><span> <a href="javascript:void();"
										style="text-decoration: none;"
										class="fa fa-exclamation-circle"  ht-tip
										title="条件表达要求是返回Boolean值的脚本。返回true,表示满足条件；返回false,表示条件不满足。如果表达式为空，将视为返回true。"></a>
										条件表达式:</span></th>
								<td colspan="3">
									
									<div>
										<a class="btn btn-primary btn-xs" onclick="bpmTaskReminder.selectScript(0)">常用脚本</a>
										<a class="btn btn-primary btn-xs" onclick="bpmTaskReminder.selectConditionScript(0)">条件脚本</a>
									    <a id="cronExpTree" class="btn btn-primary btn-xs" idx="0">表单变量</a> 
									</div>
									
									<div class="scriptArea m-t-xs">
										<textarea  class="form-control" id="cronExpression" name="cronExpression" style="width: 80%;height: 100px;display:none;"></textarea>
									</div>
								</td>
							</tr>
						</table>
					</form>
				</div>
		
				<div id="reminder-tab-act" class="tab-pane">
					<table class="table-form" cellspacing="0">
						<tr>
							<th><span>执行动作:</span>
							</th>
							<td><select id="dueAction" class="inputText" onchange="bpmTaskReminder.callMethod(this,'');">
									<option value="no-action">无动作</option>
									<option value="auto-next">执行同意操作</option>
									<option value="end-process">结束该流程</option>
									<option value="call-method">调用指定方法</option>
							</select>
							</td>
						</tr>
						<tr class="callScript-tr" >
							<th><span>执行脚本: </span></th>
							<td>
								<div>
									<a class="btn btn-primary btn-xs" onclick="bpmTaskReminder.selectScript(1)">常用脚本</a>
									<a class="btn btn-primary btn-xs" onclick="bpmTaskReminder.selectConditionScript(1)">条件脚本</a>
								    <a id="callScriptTree" class="btn btn-primary btn-xs" idx="1">表单变量</a> 
								</div>
								<div class="scriptArea m-t-xs">
									<textarea  class="form-control" id="callScript" name="callScript" style="width: 80%;height: 100px;display:none;"></textarea>
								</div>
							</td>
						</tr>
					</table>
				</div>
		
				<div id="reminder-tab-send" class="tab-pane">
					<table class="table-form" cellspacing="0">
						<tr>
							<th><span>发送催办信息:</span></th>
							<td colspan="3"><label>
								<label class="checkbox-inline" style="padding-top: 0px; ">
								<input class="ibps" type="checkbox" id="needSendMsg" name="needSendMsg" value="">
								<span class="lbl">发送</span>
								</label>
							</td>
						</tr>
						<tr class="send-msg-tr">
							<th><span>开始发送时间:</span></th>
							<td id="startTr" colspan="3">
								<input type="text" id="reminderStartDay" class="inputText input-wh-2" validate="{digits:true }" /> <span>天</span>
								<select id="reminderStartHour" class="inputText input-wh-2">
									<c:forEach var="i" begin="0" end="23" step="1">
										<option value="${i}"
											<c:if test="${reminderStartHour==i}">selected="selected"</c:if>>${i}小时</option>
									</c:forEach>
								</select> 
								<select id="reminderStartMinute" class="inputText input-wh-2">
									<c:forEach var="i" begin="0" end="4" step="1">
										<option value="${i}"
											<c:if test="${reminderStartMinute==i}">selected="selected"</c:if>>${i}分钟</option>
									</c:forEach>
									<c:forEach var="i" begin="5" end="59" step="5">
										<option value="${i}"
											<c:if test="${reminderStartMinute==i}">selected="selected"</c:if>>${i}分钟</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr class="send-msg-tr">
							<th><span> <a href="#"
									style="text-decoration: none;"
									class="fa fa-exclamation-circle" ht-tip
									title="每过多长的时间发送催办信息。"></a> 发送的间隔: </span>
							</th>
							<td id="endTr">
								<input type="text" id="reminderIntervalDay"	class="inputText input-wh-2" validate="{digits:true }" /> <span>天</span> 
								<select id="reminderIntervalHour" class="inputText input-wh-2">
									<c:forEach var="i" begin="0" end="23" step="1">
										<option value="${i}"
											<c:if test="${reminderEndHour==i}">selected="selected"</c:if>>${i}小时</option>
									</c:forEach>
								</select> 
								<select id="reminderIntervalMinute"	class="inputText input-wh-2">
									<c:forEach var="i" begin="1" end="4" step="1">
										<option value="${i}"
											<c:if test="${reminderEndMinute==i}">selected="selected"</c:if>>${i}分钟</option>
									</c:forEach>
									<c:forEach var="i" begin="5" end="59" step="5">
										<option value="${i}"
											<c:if test="${reminderEndMinute==i}">selected="selected"</c:if>>${i}分钟</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr class="send-msg-tr">
							<th><span>发送信息次数: </span></th>
							<td><select id="sendTimes" class="inputText input-wh-2">
									<c:forEach var="i" begin="0" end="10" step="1">
										<option value="${i}"
											<c:if test="${taskReminder.times==i}">selected="selected"</c:if>>${i}</option>
									</c:forEach>
							</select>
							</td>
						</tr>
					</table>
				</div>
		
				<div id="reminder-tab-msg" class="tab-pane">
					<table class="table-form" cellspacing="0">
						<tr>
							<th><span>发送类型:</span>
							</th>
							<td>
								<c:forEach items="${handlerList}"  var="model">
									<c:if test="${model.type!='sms'}">
									<label class="checkbox-inline" style="padding-top: 0px; ">
									<input class="ibps" type="checkbox" name="msgType_html" value="${model.type}">
									<span class="lbl">${model.title}</span>
									</label>
									</c:if>
									<c:if test="${model.type=='sms'}">
									<label class="checkbox-inline" style="padding-top: 0px; ">
									<input class="ibps" type="checkbox" name="msgType_pt" value="${model.type}">
									<span class="lbl">${model.title}</span>
									</label>
									</c:if>
								</c:forEach>
							</td>
						</tr>
						<tr>
							<th class="input-wh-2"><span>富文本内容:</span>
							</th>
							<td><script id="html" type="text/plain" class="input-wh-10"	style="height:200px;width:100%;"></script>
							</td>
						</tr>
						<tr>
							<th class="input-wh-2"><span>普通文本内容:</span></th>
							<td>
								<!-- <div>
									<a href="#" class="link var" title="选择模板内容" onclick="slectTemplate('mailContent',false)">选择模板内容</a>
								</div> --> 
								<textarea id="plainText" class="inputText input-wh-12" cols="80" rows="10"></textarea>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td>
								提示：可以用{title}来代表任务名称、用{time}来代表收到任务的时间。
							</td>
						</tr>
					</table>
				</div>
			</div>
			</div>
			
			<!-- <div class="col-sm-1 p-xxxs" style="padding-top:10em;">
				<a onclick="bpmTaskReminder.addReminder()" class="btn btn-sm btn-primary fa fa-arrow-right">添加</a>
			</div>
			
			<div class="col-sm-3 p-xxxs">
				<table id="bpmTaskReminderTable"></table>
			</div> -->
		</div>
	</body>
	<style>
	.send-msg-tr {
		display: none;
	}
	.callScript-tr {
		display: none;
	}
	.scriptArea{
		border:1px solid;
		border-color:silver;
	}
	</style>
</html>