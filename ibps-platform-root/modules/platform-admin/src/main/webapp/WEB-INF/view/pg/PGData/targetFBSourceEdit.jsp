<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/targetFBSource.js"></script>
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
				<form  class="fr-form"  id="targetFBSourceForm" action="save.htm" >
					<input type="hidden" name="m:targetFBSource:id"  value="${targetFBSource.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:targetFBSource:createTime"   value="<fmt:formatDate value="${targetFBSource.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:targetFBSource:time" value="${targetFBSource.time}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:targetFBSource:name" value="${targetFBSource.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:targetFBSource:job" value="${targetFBSource.job}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">职称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:targetFBSource:position" value="${targetFBSource.position}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">内容</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:targetFBSource:content" style="display: none;" validate="{required:false}">${fn:escapeXml(targetFBSource.content)}</textarea>
				<script id="m:targetFBSource:contentEditor" data-name="m:targetFBSource:content" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">意见</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:targetFBSource:advice" style="display: none;" validate="{required:false}">${fn:escapeXml(targetFBSource.advice)}</textarea>
				<script id="m:targetFBSource:adviceEditor" data-name="m:targetFBSource:advice" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">形式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:targetFBSource:form" value="${targetFBSource.form}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:targetFBSource:remark" style="display: none;" validate="{required:false}">${fn:escapeXml(targetFBSource.remark)}</textarea>
				<script id="m:targetFBSource:remarkEditor" data-name="m:targetFBSource:remark" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
