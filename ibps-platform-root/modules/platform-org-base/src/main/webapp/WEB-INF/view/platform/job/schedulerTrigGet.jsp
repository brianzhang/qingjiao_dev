<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
				<table class="table-form"   cellspacing="0">
						<tr>								
							<th><span>JOB_NAME:</span></th>
							<td>${schedulerTrig.jobName}</td>
						</tr>
						<tr>								
							<th><span>JOB_GROUP:</span></th>
							<td>${schedulerTrig.jobGroup}</td>
						</tr>
						<tr>								
							<th><span>DESCRIPTION:</span></th>
							<td>${schedulerTrig.description}</td>
						</tr>
						<tr>								
							<th><span>NEXT_FIRE_TIME:</span></th>
							<td>${schedulerTrig.nextFireTime}</td>
						</tr>
						<tr>								
							<th><span>PREV_FIRE_TIME:</span></th>
							<td>${schedulerTrig.prevFireTime}</td>
						</tr>
						<tr>								
							<th><span>PRIORITY:</span></th>
							<td>${schedulerTrig.priority}</td>
						</tr>
						<tr>								
							<th><span>TRIGGER_STATE:</span></th>
							<td>${schedulerTrig.triggerState}</td>
						</tr>
						<tr>								
							<th><span>TRIGGER_TYPE:</span></th>
							<td>${schedulerTrig.triggerType}</td>
						</tr>
						<tr>								
							<th><span>START_TIME:</span></th>
							<td>${schedulerTrig.startTime}</td>
						</tr>
						<tr>								
							<th><span>END_TIME:</span></th>
							<td>${schedulerTrig.endTime}</td>
						</tr>
						<tr>								
							<th><span>CALENDAR_NAME:</span></th>
							<td>${schedulerTrig.calendarName}</td>
						</tr>
						<tr>								
							<th><span>MISFIRE_INSTR:</span></th>
							<td>${schedulerTrig.misfireInstr}</td>
						</tr>
						<tr>								
							<th><span>JOB_DATA:</span></th>
							<td>${schedulerTrig.jobData}</td>
						</tr>
				</table>
			</div>
		</div>
	</body>
</html>