<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/Report/flaction.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="flactionForm" action="save.htm" >
					<input type="hidden" name="m:flaction:id"  value="${flaction.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:flaction:createTime"   value="<fmt:formatDate value="${flaction.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:flaction:courseId" value="${flaction.courseId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:flaction:name" value="${flaction.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程目标 </label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:flaction:objective" value="${flaction.objective}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:flaction:techRequirement" style="display: none;" validate="{required:false}">${fn:escapeXml(flaction.techRequirement)}</textarea>
				<script id="m:flaction:techRequirementEditor" data-name="m:flaction:techRequirement" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参考指标点</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:flaction:indexPoint" value="${flaction.indexPoint}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求项</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:flaction:teachRequirement" value="${flaction.teachRequirement}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核形式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:flaction:textForm" value="${flaction.textForm}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">占总成绩比例</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:flaction:account" value="${flaction.account}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
