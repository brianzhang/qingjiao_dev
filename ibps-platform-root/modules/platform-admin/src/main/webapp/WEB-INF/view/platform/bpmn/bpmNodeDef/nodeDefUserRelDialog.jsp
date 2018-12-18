<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/commons/include/get.jsp" %>
  
<title>用户关系</title>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/userRelDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/FlowVarDialog.js"></script>
</head>
<body  id="">
	<form id="userRelForm"  class="form-horizontal" >
         <table class="table table-bordered"   cellspacing="1">
				<tr class="radiorow">
					<th style="width:20%">
						<label for="startMan">人员类型：</label>
					</th>
					<td>
						<input type="radio" name="source" value="start" id="start">
						<label for="start">发起人</label> 
						<input type="radio" name="source" value="prev" id="prev">
						<label for="prev">上一步执行人</label>
						<input type="radio" name="source" value="var" id ="var">
						<label for="var">人员变量</label>
					</td>
				</tr>
				<tr id="varTr"  hidden="true">
					<th style="width:20%" >
						<label for="specMan">人员变量选择：</label>
					</th>
					<td>
						<a  class="btn btn-primary"  id="flowVarBut">选择变量</a>
						<span id="varSpan"> </span>
						<input type="hidden" id="flowVar">
					</td>
				</tr>
				<tr class="radiorow">
					<th style="width:20%">
						<label for="manVar">关系类型选择：</label>
					</th>
					<td>
						<select id="relationKey_" name="relationKey"  class="form-control">
							<option value="">请选择</option>
							<c:forEach items="${userRelationTypeList}" var="userRelationType">
								<option curName="${userRelationType.currentName}" relName="${userRelationType.relName}" 
									value="${userRelationType.key }">${userRelationType.name}</option>
							</c:forEach>
						</select>
					</td>
				</tr>
				<tr class="radiorow">
					<th style="width:20%">
						<label for="manVar">关系方：</label>
					</th>
					<td>
							<select name="relationParty" id="relationParty_" class="form-control">
								<option value="cur">对方</option>
								<option value="rel">当前方</option>
							</select>
					</td>
				</tr>
			</table>
	</form>
</body>
</html>


