<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/commons/include/get.jsp" %>
  <%@include file="/commons/page/tree.jsp" %>
  
<title>用户组选择</title>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/groupDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyGroupDialog.js"></script>
</head>
<body  >
	<form id="groupForm"  class="form-horizontal" >
	
		<table class="table table-bordered"   cellspacing="1">
			<tr class="radiorow">
				<th style="width:20%">
					<label for="startManGroup">发起人所在组</label>
					<input id="startManGroup" type="radio" name="source" value="start">
				</th>
				<td></td>
			</tr>
			<tr class="radiorow">
				<th style="width:20%">
					<label for="prevManGroup">上一步执行人所在组</label>
					<input id="prevManGroup" type="radio" name="source" value="prev">
				</th>
				<td></td>
			</tr>
			<tr >
				<th style="width:20%">
					<label for="specManGroup">指定组</label>
					<input id="specManGroup" type="radio" name="source" value="spec">
				</th>
				<td>
                    <div class="input-group">
	           			<input type="hidden" name="groupKey">
                       	<textarea class="form-control" readonly name="groupName"></textarea> 
                       	<span class="input-group-btn">
                        	<button type="button" class="btn btn-primary" onclick="groupDialog._choiceUser(this)"> 请选择</button> 
                       	</span>
                    </div>
				</td>
			</tr>
			<!-- <tr class="radiorow">
				<th style="width:20%">
					<label for="manVar">组变量</label>
					<input id="manVar"  type="radio" name="source" value="var">
				</th>
				<td>
					<a id="orgVar" class="btn btn-primary btn-xs">表单变量</a>
					<span id="varSpan"> </span>
					<input type="hidden" id="flowVar">
				</td>
			</tr> -->
			<tr >
				<th style="width:20%">
					<label for="nodeMan">相同节点执行人所在组</label>
					<input id="nodeMan"  type="radio" name="source" value="node">
				</th>
				<td>
                       <div class="input-group">
                           <input name="nodeId1" id="nodeId1" type="hidden" >
                           <input type="text" id="nodeName1" readonly class="form-control"> 
                           <span class="input-group-btn">
                           <button type="button" class="btn btn-primary" onclick="groupDialog._getNode(this)"> 请选择</button> 
                           </span>
                       </div>
				</td>
			</tr>
		</table>
         
	</form>
</body>
</html>


