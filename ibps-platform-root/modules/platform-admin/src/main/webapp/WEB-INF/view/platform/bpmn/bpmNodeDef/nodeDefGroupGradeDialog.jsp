<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/commons/include/get.jsp" %>
  
<title>用户组等级选择</title>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/groupGradeDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/GroupSelectDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/FlowVarDialog.js"></script>
</head>
<body  >
	<form id="groupGradeForm" >
			<table class="table table-bordered"   cellspacing="1">
				<tr class="radiorow">
					<th style="width:20%">
						<span>组类型</span>
					</th>
					<td>
						<select name='groupType'  id="groupType"  class="form-control" >
							<option value="">请选择</option>
							<c:forEach items="${dimensionList}" var="dimension">
							<option value="${dimension.value}">${dimension.label}</option>
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
				<tr >
					<th style="width:20%">
						<label>等级分类</label>
					</th>
					<td>
							<select name="grade" id="grade"  class="form-control"></select>
					</td>
				</tr>
				<tr >
					<th style="width:20%">
						<span>指定关系</span>
					</th>
					<td>
							<input type="checkbox" class="ibps" checked="checked"
							id="supportRelation" name="supportRelation" >
							<span class="lbl"></span>
							<a href="#" style="text-decoration: none;" 
								title="如果指定了关系类型，将直接抽取<br>指定关系的人员。"
							   class="fa fa-exclamation-circle" data-tip></a> 
					</td>
				</tr>
				<tr name="supportRelationTr">
					<th style="width:20%">
						<span>关系类型</span>
					</th>
					<td>
							<select name="relationType" id="relationType"  class="form-control">
					</select>
					</td>
				</tr>
				<tr class="radiorow" name="supportRelationTr">
					<th style="width:20%">
						<span>查找策略</span>
					</th>
					<td>
							<input type="radio" name="findStrategy" value="upward" id ="upward" checked="checked">
							<label for="upward" class="normal_label">查找指定级别、为空时继续向上级查询 </label><br>
							<input type="radio" name="findStrategy" value="stop" id ="stop">
							<label for="stop" class="normal_label"> 查找指定级别、为空时不向上查找 </label>
					</td>
				</tr>
			</table>
			</form>
</body>
</html>


