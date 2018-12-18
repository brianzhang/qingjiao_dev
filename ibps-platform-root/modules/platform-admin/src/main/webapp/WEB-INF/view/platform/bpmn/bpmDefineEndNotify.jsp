<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
	     <%@include file="/commons/include/get.jsp" %>
	     <script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmDefineEndNotify.js"></script>
	     <script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
	</head>
<body >
	<div  class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
				<div class="buttons"> 
			    	<a href="javascript:void(0)" class="btn btn-primary fa fa-add"  onclick="endNotify._addNotify()">添加</a>
			    </div>
		</div>
		<div class="panel-form" id="endNotify">
			 <table class="table table-bordered"   cellspacing="1">
					<thead>
			    		<tr>
				    		<th width="20%">通知类型</th>
				    		<th>人员配置</th>
				    		<th width="5%">管理</th>
			    		</tr>
    				</thead>
    				<tbody id="notifyView">
    					
    				</tbody>
			</table>
		 </div>
		<div hidden="true">
				<c:forEach var="msgType" items="${handlerList}">
					<input type="hidden" id="msgType" name="msgType" value="${msgType.type}"  title="${msgType.title}">
				</c:forEach> 
		</div>
	</div>
</body>
<script type="text/html"  id='endNotifyTemp'>
		{{each list.copyTo as notify notify_i}}
			<tr id="notify_{{notify_i}}">
    			<td>
    					<div style="width:100%;text-align:left;">
						{{each list.msgTypeList as msgType j}}
							<label>
									<input type="checkbox"  value="{{msgType.type}}" notifyId="{{notify_i}}" onclick="endNotify._changeMsgType(this,'{{notify_i}}')"
									 {{if notify.msgTypes.indexOf(msgType.type)>-1}}checked="checked"{{/if}}/>{{msgType.title}}
							</label></br>
					    {{/each}}
					</div> 
    			</td>
    			<td>
    				<div style="min-height:120px">
    					<div style="margin-bottom: 5px;"><a class="btn btn-info fa fa-add"  onclick="endNotify._addUserRule(this,'{{notify_i}}')"><span>添加人员设置</span></a></div>
						<table class="table-grid">
						     <thead>
							     <tr>
									<th width="5%">序号</th>
									<th>条件</th>
									<th width="15%">批次</th>
									<th width="15%">操作</th>
								</tr>
							</thead>
							<tbody id="userRuleView_{{notify_i}}">
								{{each notify.userAssignRules as rule userRule_j}}	
									<tr id="userRule_{{userRule_j}}">
										<td>{{userRule_j+1}}</td>
										<td>{{rule.description}}</td>
										<td>
												<input type="text" size="3" name="groupNo" 
												 class="form-control" value="{{rule.groupNo}}" onchange="endNotify._changeNo(this,'{{notify_i}}','{{userRule_j}}')" /> 
										</td> 
										<td>
											<a class="btn btn-primary fa  fa-edit" title="编辑" onclick="endNotify._addUserRule(this,'{{notify_i}}','{{userRule_j}}')"></a>
											<a class="btn btn-primary fa  fa-delete" title="删除" onclick="endNotify._delUserRule('{{notify_i}}','{{userRule_j}}')"></a> 
										</td>
									</tr> 
								 {{/each}}
							</tbody>
						</table>
					</div>
    			</td>
				<td>
					<a class="btn btn-danger fa fa-delete" onclick="endNotify._delNotify('{{notify_i}}')" ></a>
				</td>
    		</tr>
		{{/each}}
</script>
<script type="text/html"  id='userRuleTemp'>
		{{each list.userAssignRules as rule userRule_j}}	
			<tr id="assignRules_{{userRule_j}}">
				<td>{{userRule_j+1}}</td>
				<td>{{rule.description}}</td>
				<td>
						<input type="text" size="3" name="groupNo" 
						 class="form-control" value={{rule.groupNo}} onchange="endNotify._changeNo(this,'{{list.notify_i}}','{{userRule_j}}')"> 
				</td> 
				<td>
						<a class="btn btn-primary fa  fa-edit"onclick="endNotify._addUserRule(this,'{{list.notify_i}}','{{userRule_j}}')">编辑</a>
						<a class="btn btn-primary fa  fa-delete" onclick="endNotify._delUserRule('{{list.notify_i}}','{{userRule_j}}')">删除</a> 
				</td>
			</tr> 
		{{/each}}
</script>

</html>