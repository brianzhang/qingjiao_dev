<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/selector.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/IconDialog.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-form">
			<form class="form-horizontal" id="buttonForm"   >
			<div class="form-group">
               <label class="col-sm-2 control-label">名称:</label>
               <div class="col-sm-10">
                   <input type="text" class="form-control"  id="buttonName" name="buttonName"   validate="{required:true,maxlength:192}"/>
               </div>
           </div>
           <div class="form-group">
               <label class="col-sm-2 control-label">图标:</label>
               <div class="col-sm-10">
                   <input type="hidden" id="buttonIcon" name="buttonIcon"/>
                   <i  id="iconImg"  class="fa "></i>
                   <a class="btn btn-info fa fa-search-plus"  id="selectIcon" href="javascript:void(0);">选择</a>
               </div>
           </div>
           <div class="form-group">
               <label class="col-sm-2 control-label">点击事件:</label>
               <div class="col-sm-10">
                   <textarea rows="4" cols="30" class="form-control"  id="buttonOnclick" name="buttonOnclick" validate="{required:false,maxlength:500}"></textarea>
               </div>
           </div>
			</form>
		</div>
		</div>
	</body>
</html>