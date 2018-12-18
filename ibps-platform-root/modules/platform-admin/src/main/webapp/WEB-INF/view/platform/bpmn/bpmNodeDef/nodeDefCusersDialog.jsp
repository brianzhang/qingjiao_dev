<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/commons/include/get.jsp" %>
  <%@include file="/commons/page/tree.jsp" %>
<title>用户选择</title>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/cusersDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>
</head>
<body  id="CusersTable">
	<form id="cusersForm" >
			<table class="table table-bordered" cellspacing="1">
				<tr class="radiorow">
					<th style="width:20%">
						<label for="startMan">发起人</label>
						<input id="startMan" type="radio" name="source" value="start">
					</th>
					<td></td>
				</tr>
				<tr class="radiorow">
					<th style="width:20%">
						<label for="prevMan">上一步执行人</label>
						<input id="prevMan" type="radio" name="source" value="prev">
					</th>
					<td></td>
				</tr>
				<tr >
					<th style="width:20%">
						<label for="specMan">指定人</label>
						<input id="specMan"  type="radio" name="source" value="spec">
					</th>
					<td>
                        <div class="input-group">
                            <input name="account"  id="account" type="hidden" >
                            <input type="text" id="fullName" readonly class="form-control"> 
                            <span class="input-group-btn">
                            <button type="button" class="btn btn-primary" onclick="cusersDialog._getUsers(this)"> 请选择</button> 
                            </span>
                        </div>
					</td>
				</tr>
				<tr class="radiorow">
					<th style="width:20%">
						<label for="manVar">人员变量</label>
						<input id="manVar"  type="radio" name="source" value="var">
					</th>
					<td>
						<input type="hidden" id="cusersFlowVar">
						<a id="cusers" class="btn btn-primary btn-xs">表单变量</a>
						<span id="cusersVarSpan"></span>
					</td>
				</tr>
				<tr >
					<th style="width:20%">
						<label for="nodeMan">相同节点执行人</label>
						<input id="nodeMan"  type="radio" name="source" value="node">
					</th>
					<td>
                        <div class="input-group">
                            <input name="nodeId1" id="nodeId1" type="hidden" >
                            <input type="text" id="nodeName1" readonly class="form-control"> 
                            <span class="input-group-btn">
                            <button type="button" class="btn btn-primary" onclick="cusersDialog._getNode(this)"> 请选择</button> 
                            </span>
                        </div>
					</td>
				</tr>
			</table>
		</form>
</body>
</html>
