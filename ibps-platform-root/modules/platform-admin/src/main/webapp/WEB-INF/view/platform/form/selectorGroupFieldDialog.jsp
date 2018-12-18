<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/selector.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-form">
			<form class="form-horizontal" id="groupFieldForm" >
			<div class="form-group">
               <label class="col-sm-2 control-label">名称:</label>
               <div class="col-sm-10">
                   <input type="text" class="form-control"  id="fieldName" name="fieldName"  validate="{required:true,maxlength:192}"/>
               </div>
           </div>
           <div class="form-group">
               <label class="col-sm-2 control-label">键:</label>
               <div class="col-sm-10">
                   <input type="text" class="form-control"  id="fieldKey" name="fieldKey" validate="{required:true,maxlength:192}"/>
               </div>
           </div>
           <div class="form-group">
               <label class="col-sm-2 control-label">返回脚本:</label>
               <div class="col-sm-10">
                   <textarea rows="4" cols="30" class="form-control"  id="fieldScript" name="fieldScript" validate="{required:false,maxlength:500}"></textarea>
               </div>
           </div>
			</form>
		</div>
		</div>
	</body>
</html>