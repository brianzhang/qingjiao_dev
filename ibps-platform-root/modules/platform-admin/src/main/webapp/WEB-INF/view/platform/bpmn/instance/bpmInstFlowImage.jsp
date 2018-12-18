<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
 <%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp"%>
		<script type="text/javascript" src="${ctx}/js/plugins/nicescroll/nicescroll.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmInstFlowImage.js"></script>
		
		<style type="text/css">
			body {
				  overflow-x: auto;
			}
			div.icon{
				border:1px solid #868686;
				line-height: 10px;
				width: 10px;
				height:10px;
				float: left;
				overflow: hidden;
				margin-top:3px;
			}
			.target .value{
				margin: 0 10px 0 3px;
				font-size: 12px;
				font-weight: bold;
				float:left;
				vertical-align: middle;
				white-space: nowrap;
			}

			td, th {
				    padding: 5px 10px;
				    border: 1px solid #DDD;
			}
			th {
			    border-top: 1px solid #BBB;
			    background-color: #F7F7F7;
			    font-weight:100; 
			    font-size:12px; 
			    padding:5px;
			}
			td{font-weight:100; font-size:12px; padding:5px;}
		</style>
		<script type="text/html"  id='approvalTemplate'>
		{{if d.hasApproval}}
			<ul>
				 {{each d.data as approval}}
				<li>
					<div style="margin-bottom:10px;" class="form-table">
						<table  class="form-table">
							<tr>
									<th width="120">任务名称</th><td width="150">{{approval.taskName}}</td>
							</tr>
						{{if approval.auditor !=null}}
							<tr >
								<th>执行人</th>
								<td><span class="owner-span">
											<a href="javascript:void(0)" data-auditor="{{approval.auditor}}">{{approval.auditorName}}</a>
										</span>
								</td>
							</tr>
						{{else}}
							<tr>
								<th><abbr data-tip title="有资格审批的用户及用户组">候选人</abbr></th>
								<td>
									<div class="owner-div">
									{{if approval.qualifiedExecutor == null}}
									<span class="owner-span">暂无</span>
									{{else}}
									{{if approval.qualifiedExecutor.length > d.bpmNodeUserShowCount}}
									 	{{each approval.qualifiedExecutor as qualfied idx}}
										{{if idx < d.bpmNodeUserShowCount}}
										<span class="owner-span">
											<a href="#" data-executId="{{qualfied.executId}}">{{qualfied.executor}}</a>
										</span>
										{{/if}}
										{{/each}}
										<span class="owner-span">
											<a href="javascript:void(0);" onclick="javascript:showMore('{{d.instId}}', '{{d.nodeId}}', '{{approval.id}}');">更多</a>
										</span>
									{{else}}
										{{each approval.qualifiedExecutor as qualfied}}
										<span class="owner-span">
											<a href="#" data-executId="{{qualfied.executId}}">{{qualfied.executor}}</a>
										</span>
										{{/each}}
									{{/if}}
									{{/if}}
									</div>
								</td>
							</tr>
						{{/if}}
							<tr>
								<th>开始时间</th>
								<td style="font-size:11px;">{{approval.createTime |dateFormat:"yyyy-MM-dd HH:mm:ss"}}</td>
							</tr>
							<tr>
								<th>结束时间</th>
								<td style="font-size:11px;">{{approval.completeTime |dateFormat:"yyyy-MM-dd HH:mm:ss"}}</td>
							</tr>
							<tr>
								<th>审批用时</th><td>{{approval.durMs | time}}</td>
							</tr>
							<tr>
								<th>状态</th><td>{{approval.statusName}}</td>
							</tr>
							<tr>
								<th>意见</th><td>{{approval.opinion}}</td>
							</tr> 
						</table>
					</div>
				</li>
				{{/each}}
			</ul>
		{{else}}

		<div class="form-table">
		<table>
			<tr>
				<th width="120">状态</th>
				<td width="150">未执行任务</td>
			</tr>
			<tr>
				<th>
					<abbr data-tip title="暂定的有审批资格的用户及用户组，实际候选人要在产生任务以后才能确定">暂定候选人</abbr>
				</th>
				<td>
					<div class="owner-div">
						{{if d.data == null}}
						<span class="owner-span">暂无</span>
						{{else}}
						{{if d.data.length > d.bpmNodeUserShowCount}}						
							{{each d.data as qualfied idx}}
								{{if idx < d.bpmNodeUserShowCount}}
									<span class="owner-span">
										<a href="#" data-executId="{{qualfied.id}}">{{qualfied.name}}</a>
									</span>
								{{/if}}
							{{/each}}
							<span class="owner-span">
								<a href="javascript:void(0);" onclick="javascript:showMore('{{d.instId}}', '{{d.nodeId}}');">更多</a>
							</span>
						{{else}}
							{{each d.data as qualfied}}
								<span class="owner-span">
									<a href="#" data-executId="{{qualfied.id}}">{{qualfied.name}}</a>
								</span>
							{{/each}}
						{{/if}}
						{{/if}}
					</div>
				</td>
			</tr></table></div>
		{{/if}}
		</script>
	</head>

	<body>
			<div  id="bpmImage" class="niceScroll">
				<div style="margin:10px 0 20px 10px;">
					<c:forEach items="${statusColorList }" var="color">
						<div class="target">
							<div class="icon" style="background:${color.color};"></div>
							<div class="value">${color.value }</div>
						</div>		
					</c:forEach>    
				</div> 
				<p></br></br></p>
				<div style="margin-top:40px;position:relative;width:${bpmDefLayout.width}px;height:${bpmDefLayout.height}px;background:url('${ctx}/platform/bpmn/image/gen.htm?<c:if test="${!empty bpmProcInst.bpmnInstId}">bpmnInstId=${bpmProcInst.bpmnInstId}</c:if><c:if test="${empty bpmProcInst.bpmnInstId}">defId=${bpmProcInst.procDefId}</c:if>') no-repeat;">
					<c:forEach var="layout" items="${bpmDefLayout.listLayout}">
						<div class="flowNode" 
								 data-node-id="${layout.nodeId}" 
								 data-node-name="${layout.name}"
								 data-node-type="${layout.nodeType.key}"
								 data-inst-id="${instId}"
							 style="position:absolute;left:${layout.x}px;top:${layout.y}px;width:${layout.width}px;height:${layout.height}px;"></div>
					</c:forEach>
				</div>
				<p></br></br></p>
		</div>
	</body>
</html>