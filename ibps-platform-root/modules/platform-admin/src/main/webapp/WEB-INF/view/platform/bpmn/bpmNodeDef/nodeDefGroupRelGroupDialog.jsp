<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/commons/include/get.jsp" %>
  
<title>组与组选择</title>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/groupRelGroupDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/FlowVarDialog.js"></script>

<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
</head>
<body  >
	<form id="groupRelGroupForm"  class="form-horizontal" >
         <table class="table table-bordered"   cellspacing="1">
				<tr class="radiorow">
					<th style="width:20%">
						<span>组类型</span>
					</th>
					<td>
						<select name='groupType'  id="groupType"  class="form-control" >
							<option value="">请选择</option>
							<c:forEach items="${dimensionList}" var="dimension">
							<option value="${dimension.key}">${dimension.name}</option>
							</c:forEach>
						</select>
					</td>
				</tr>
				<tr class="radiorow">
					<th style="width:20%">
						<span>组来源</span>
					</th>
					<td>
                        <input type="radio" name="source" value="start" id="source_start" >
						<label class="normal_label" for="source_start"><span>发起人所在的组</span></label>　
						<input type="radio" name="source" value="prev" id="source_prev" >
						<label class="normal_label" for="source_prev">上一步执行人所在的组</label>　 <br>
						<input type="radio" name="source" value="var" id="source_var" >
						<label class="normal_label" for="source_var">变量</label>　
						<input type="radio" name="source" value="spec" id="source_spec"  checked="checked">
						<label class="normal_label" for="source_spec">指定组</label>　
					</td>
				</tr>
				<tr id="varTr" >
					<th style="width:20%">
						<label>变量选择</label>
					</th>
					<td>
							<a  class="btn btn-primary"  id="varBut">选择变量</a>
							<a href="#" style="text-decoration: none;" 
							title="如果选择人员变量，则为人员变量所在的组，<br>如果选择组变量，则为该组"
							   class="fa fa-exclamation-circle" data-tip></a> 
							<span id="varSpan"> </span>
							<input type="hidden" id="flowVar">
					</td>
				</tr>
				<tr id="groupTr">
					<th style="width:20%">
						 <span>指定组</span> 
					</th>
					<td>
							<div class="input-group">
				             	<input type="hidden" name="groupKey">
				             	<textarea class="form-control" name="groupName" validate="{required:true}"></textarea> 
								<span class="input-group-btn"> 
									<button type="button" name="groupBut" class="btn btn-primary" >选择</button> 
								</span>
							</div>
					</td>
				</tr>
				<tr name="supportRelationTr">
					<th style="width:20%">
						<span>关系类型</span>
					</th>
					<td>
							<select id="relationKey_" name="relationKey"  class="form-control">
					</select>
					</td>
				</tr>
				<tr class="radiorow" >
					<th style="width:20%">
						<span>关系类型方</span>
					</th>
					<td>
						<select name="relationParty" id="relationParty_"
							class="form-control">
							<option value="cur">对方</option>
							<option value="rel">当前方</option>
						</select>
						<a href="#" style="text-decoration: none;"
							title=" 
						查询出符合组类型的组，根据这些组的关系进行查找组。<br>
						如果双方同一组类型，关系方，当前方存在意义，<br>
						如果双方不同维度而且非双向关系，请选择第一项<br>
						如果关系是双项的，请根据需要进行选择"
							class="fa fa-exclamation-circle" data-tip> </a>
				</td>
				</tr>
			</table>
	</form>
</body>
</html>


