<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/commons/include/get.jsp" %>
  <%@include file="/commons/page/tree.jsp" %>
  
<title>用户组织选择</title>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/userGroupDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
</head>
<body  >
	<form id="userGroupForm"  class="form-horizontal" >
	
		<table class="table table-bordered"   cellspacing="1">
			<tr class="radiorow">
				<th style="width:20%">
					<label for="startManOrg">发起人所在组织</label>
					<input id="startManOrg" type="radio" name="source" value="start">
				</th>
				<td></td>
			</tr>
			<tr class="radiorow">
				<th style="width:20%">
					<label for="prevManOrg">上一步执行人所在组织</label>
					<input id="prevManOrg" type="radio" name="source" value="prev">
				</th>
				<td></td>
			</tr>
			<tr >
				<th style="width:20%">
					<label for="specManOrg">指定组织</label>
					<input id="specManOrg" type="radio" name="source" value="spec">
				</th>
				<td>
                    <div class="input-group">
	           			<input type="hidden" name="orgKey">
                       	<textarea class="form-control" readonly name="orgName"></textarea> 
                       	<span class="input-group-btn">
                        	<button type="button" class="btn btn-primary" onclick="userGroupDialog._choiceUser(this)"> 请选择</button> 
                       	</span>
                    </div>
				</td>
			</tr>
			<tr class="radiorow">
				<th style="width:20%">
					<label for="manVar">组织变量</label>
					<input id="manVar"  type="radio" name="source" value="var">
				</th>
				<td>
					<a id="orgVar" class="btn btn-primary btn-xs">表单变量</a>
					<span id="varSpan"> </span>
					<input type="hidden" id="flowVar">
				</td>
			</tr>
			<tr >
				<th style="width:20%">
					<label for="nodeMan">相同节点执行人所在组织</label>
					<input id="nodeMan"  type="radio" name="source" value="node">
				</th>
				<td>
                       <div class="input-group">
                           <input name="nodeId1" id="nodeId1" type="hidden" >
                           <input type="text" id="nodeName1" readonly class="form-control"> 
                           <span class="input-group-btn">
                           <button type="button" class="btn btn-primary" onclick="userGroupDialog._getNode(this)"> 请选择</button> 
                           </span>
                       </div>
				</td>
			</tr>
			<tr class="radiorow">
				<th style="width:20%">
					<label for="manVar">是否包含其子组织：</label>
				</th>
				<td>
				    <label class="checkbox-inline">
						<input type="checkbox" class="ibps" id="containsSub" name="containsSub">
						<span class="lbl">包含</span>
						<a href="#" style="text-decoration: none;" title="如果勾选了，则会根据选中组织，
						<br>包含其组下面所有子组织，子组织下所有子组织" class="fa fa-exclamation-circle" data-tip></a> 
		            </label>
				</td>
			</tr>
		</table>
         
	</form>
</body>
</html>


