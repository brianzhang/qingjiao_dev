<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<%@include file="/commons/include/list.jsp" %>
<title>人员预览</title>
<script type="text/javascript"  src="${ctx}/js/lc/platform/bpmn/userConditionPreview.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>

	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
</head>
<body id="userConditionPer">
	<div class="wrapper wrapper-content col-sm-12 p-xxs">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0)" class="btn btn-primary fa fa-eye"
					id="addNodeBtn" onclick="userConPre._previewCondition()">预览</a>  
				<a href="javascript:DialogUtil.close(frameElement.dialog.index);"
					class="btn btn-primary fa fa-close">关闭</a>
			</div>
		</div>
		<div class="tabs-container" style="padding-top: 5px;">
			<ul class="nav nav-tabs">
				<li class="active"><a data-toggle="tab" href="#preParam"
					aria-expanded="true"> 预览参数</a></li>
				<li class=""><a data-toggle="tab" href="#queryResult"
					aria-expanded="false">查询结果</a></li>
			</ul>
			<div class="tab-content">
				<div id="preParam" class="tab-pane active">
					<div class="panel-body">
						<form id="paramForm">
							<table class="table table-bordered"  id="paramTable">
								<tr id="prevUserTr"  hidden>
									<th width="20%"><span>上一步执行人:</span><span class="required">*</span></th>
									<td>
									<div class="input-group">
										<input type="hidden" class="form-control" id="prevUserId" name="prevUserId" /> 
										<input type="text" class="form-control" id="prevUserName"  name="prevUserName" validate="{required:true}" readonly="readonly" /> 
										<span class="input-group-btn"> 
											<button type="button" id="prevUserBut" class="btn btn-primary" onclick="userConPre._selectUser(this)">请选择</button> 
										</span>
									</div>
									</td>
								</tr>
								<tr id="startUserTr" hidden>
									<th width="20%"><span>发起人:</span><span class="required">*</span></th>
									<td>
										<div class="input-group">
											<input type="hidden" class="form-control" id="startUserId" name="startUserId"/> 
											<input type="text" class="form-control"  id="startUserName" name="startUserName" validate="{required:true}" readonly="readonly" /> 
											<span class="input-group-btn"> 
												<button type="button" id="startUserBut" class="btn btn-primary" onclick="userConPre._selectUser(this)">请选择</button> 
											</span>
										</div>
									</td>
								</tr>
							</table>
						</form>
					</div>
					<div id="noPre" class="hidden">
						<span>不支持预览！</span>
					</div>
				</div>
				<div id="queryResult" class="tab-pane">
					<div class="panel-body">
						<div class="jqGrid_wrapper">
							<table id="userGrid" ></table>
							<div id="userPager"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/html"  id='executorTypeTem'>
						{{ if list.executorType=='group'}}
							<tr id="groupVarTr"  >
								<th width="20%"><span>组变量({{list.name}})</span><span class="required">*</span></th>
								<td>
									<div class="input-group">
										<input type="hidden" class="form-control" id="groupVarId" key="{{list.name}}" name="groupVarId"/> 
										<input type="text" class="form-control"  id="groupVarName"  name="groupVarName"  validate="{required:true}" readonly="readonly" /> 
										<span class="input-group-btn"> 
											<button type="button" id="groupVarBut" class="btn btn-primary" onclick="userConPre._selectGourp(this)">请选择</button> 
										</span>
									</div>
								</td>
							</tr>
						{{else if list.executorType=='user' }}
							<tr id="userVarTr">
								<th width="20%"><span>人员变量({{list.name}})</span><span class="required">*</span></th>
								<td>
									<div class="input-group">
										<input type="hidden" class="form-control" id="userVarId" key="{{list.name}}" name="userVarId"/> 
										<input type="text" class="form-control"  id="userVarName" name="userVarName" validate="{required:true}" readonly="readonly" /> 
										<span class="input-group-btn"> 
											<button type="button" id="userVarBut" class="btn btn-primary" onclick="userConPre._selectUser(this)">请选择</button> 
										</span>
									</div>
								</td>
							</tr>
						{{/if}}
</script>
</html>


