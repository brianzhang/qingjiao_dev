<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <%@include file="/commons/include/get.jsp" %>
  <%@include file="/commons/page/grid.jsp" %>
  <title><c:if test="${ not empty nodeName}">[${nodeName}]</c:if>节点设置</title>

	<link href="${ctx}/styles/commons/css/jqueryui/plugins/link-div-default.css" rel="stylesheet" type="text/css" />
	<link href="${ctx}/styles/default/css/lc/bpmn/bpmNodeDefCondition.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/nodeDefCondition.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/RuleConditionDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/ScriptDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.linkdiv.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeRule.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyOrgDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyRoleDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyPositionDialog.js"></script>

<script type="text/javascript">            

var defId = '${defId}'; 
var nodeId = '${nodeId}';
var nodeType = '${nodeType}';
var extract = '${extract}';

template.helper('getNodeType', function(){
	if(nodeType=='SIGNTASK'){
		return 'true';
	}
    return 'false';
});


</script>

</head>
<body  id="defConditionGrid">
	<fieldset class="scheduler-border">
	<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;"><span>规则设置</span></legend>	
		<div style="height:auto; margin-top: 5px">
			<div class="datagrid-toolbar" style="height: 36px; text-align: right;">
				 <a onclick="nodeDefCondition._addDiv(1)" 	class="btn btn-sm btn-primary fa fa-add ">添加规则 </a>
				 <a onclick="nodeDefCondition._addDiv(2)" 	class="btn btn-sm btn-primary fa  fa-add">添加脚本</a>
				 <a onclick="nodeDefCondition._assembleDiv()" class="btn btn-sm btn-primary fa fa-sign-in">组合规则</a>
				 <a onclick="nodeDefCondition._splitDiv()"	class="btn btn-sm btn-primary fa fa-sign-out">拆分规则</a>
				 <a onclick="nodeDefCondition._removeDiv()" 	class="btn btn-sm btn-primary fa fa-remove">删除</a>
			</div>
			<div>
				 <div id="ruleDiv" style="margin:5px 0 0 0;"></div>
			</div>
		</div>
	</fieldset>
	<fieldset class="scheduler-border"> 
	<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;"><span>人员设置</span></legend>
			<div class="datagrid-toolbar" style="height: 35px; text-align: right;">
				 <a class="btn btn-primary fa fa-add" onclick="nodeDefCondition._addUserParam()" >添加</a>
				 <a class="btn btn-primary fa fa-delete" onclick="nodeDefCondition._deleteSelect()" >删除</a>
				 <a class="btn btn-primary fa fa-youtube-play" onclick="nodeDefCondition._previewCondition()" >预览</a>
			</div>
			<div id="tempDiv" hidden="true"></div>
			<div class="panel-form" >
				<table class="table table-bordered"  id="nodeDefConTable" >
					<thead>
						<tr>
							<th style="width:5%"><span><span></th>
							<th style="width:25%"><span>用户类型</span></th>
							<th  style="width:30%"><span>用户来自</span></th>
							<th  style="width:20%"><span>抽取用户</span></th>
							<th  style="width:15%"><span>运算类型</span></th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		<br>
		</fieldset>
		
	<!-- 所有模板  -->
	<div hidden="true">
		
		<!-- 人员插件选择模板 -->
		<c:forEach var="pulgins" items="${nodeUserPluginList}">
			<input type="hidden"  name="pluginTypeVal" value="${pulgins.type}"  title="${pulgins.title}">
		</c:forEach> 
		
	</div>
</body>
<script type="text/html"  id='nodeDefTem'>
		    {{each list.calcs as item i}}
				<tr name="userSetting">								
					<td style="width:5%">
							<div class="input-group">
								<input type="checkbox"  name="key" value="{{item.id}}"> 
							</div>
					</td>
					<td style="width:25%">
							<div class="input-group">
								<select  class="form-control m-b" name="pluginType">
									{{each list.pluginType as type j}}
									<option value="{{type.type}}" {{if item.pluginType==type.type}}selected="selected"{{/if}}>{{type.title}}</option>
									{{/each}}
								</select>
							</div>
					</td>
					<td style="width:30%">
						<div class="input-group">
								<textarea  name="descVal" hidden>{{item.descVal}}</textarea>
								<textarea class="form-control" readonly name="descText">{{item.description}}</textarea> 
								<span class="input-group-btn"> 
									<button type="button" name="descBut" class="btn btn-sm btn-primary ">选择</button> 
								</span>
						</div>
					</td> 
					<td style="width:20%">
						<div class="input-group">
 							<select  class="form-control m-b" name="extractUser">
								<option value="extract" {{if item.extract=='extract'}}selected="selected"{{/if}} >抽取</option>
								<option value="no" {{if item.extract=='no'}}selected="selected"{{/if}}>不抽取</option>
							</select>
						</div>
					</td> 
					<td style="width:15%">
						<div class="input-group">
							<select  class="form-control m-b" name="compType">
									<option value='or' {{if item.logicCal=='or'}}selected="selected"{{/if}}>或</option>
									<option value='and' {{if item.logicCal=='and'}}selected="selected"{{/if}}>与</option>
									<option value='exclude' {{if item.logicCal=='exclude'}}selected="selected"{{/if}}>排除</option>
							</select>
						</div>
					</td>
				</tr>
			{{/each}}
		</script>
</html>
