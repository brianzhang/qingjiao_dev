<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  		<%@include file="/commons/include/list.jsp" %>
		<%@include file="/commons/include/get.jsp" %>
  
<title>用户上下级</title>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/userGradeDialog.js"></script>
</head>
<body>
<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
	<div class="panel-toolbar col-md-12">
		<div class="buttons">
			<a href="javascript:void(0);" class="btn btn-primary fa fa-add" onclick="userGradeDialog.addSetting()">添加</a>
		</div>
	</div>
	<form id="userGradeForm"  class="form-horizontal" >
		<div class="form-group">
			<label class="col-sm-2 control-label">人员类型：</label>
			<div class="col-sm-10">
				<p class="form-control-static">
					<label class="radio-inline">
                   	 	<input type="radio" class="ibps" value="start" name="source" id="start" checked="checked"/>
                   	 	<span class="lbl" id="startText">发起人</span>
                    </label>
					<label class="radio-inline">
                   	 	<input type="radio" class="ibps" value="prev" name="source" id="prev"/>
                   	 	<span class="lbl" id="prevText">上一步执行人</span>
                    </label>
					<label class="radio-inline">
                   	 	<input type="radio" class="ibps" value="node" name="source" id="node"/>
                   	 	<span class="lbl" id="nodeText">相同节点执行人</span>
                    </label>
				</p>
			</div>
		</div>
		
		<div class="form-group" id="nd">
			<label class="col-sm-2 control-label">节点：</label>
			<div class="input-group">
                <input name="nodeId1" id="nodeId1" type="hidden" >
                <input type="text" id="nodeName1" readonly class="form-control"> 
                <span class="input-group-btn">
                <button type="button" class="btn btn-primary" onclick="userGradeDialog._getNode(this)"> 请选择</button> 
                </span>
            </div>
		</div>
		
		<div class="form-group">
			<div class="col-sm-12">
				<table id="userGradeGrid" ></table>
			</div>
		</div>
	</form>
</div>
</body>
</html>


