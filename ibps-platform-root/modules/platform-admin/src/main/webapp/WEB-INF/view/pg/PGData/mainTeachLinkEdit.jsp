<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/mainTeachLink.js"></script>
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
				<form  class="fr-form"  id="mainTeachLinkForm" action="save.htm" >
					<input type="hidden" name="m:mainTeachLink:id"  value="${mainTeachLink.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:mainTeachLink:createTime"   value="<fmt:formatDate value="${mainTeachLink.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">环节名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:mainTeachLink:link_name" value="${mainTeachLink.link_name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质量要求节点</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:mainTeachLink:quality_dem_node" value="${mainTeachLink.quality_dem_node}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核责任人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:mainTeachLink:test_principal" value="${mainTeachLink.test_principal}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">基于的基本数据</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:mainTeachLink:basic_data" value="${mainTeachLink.basic_data}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">记录文档</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:mainTeachLink:record_text" style="display: none;" validate="{required:false}">${fn:escapeXml(mainTeachLink.record_text)}</textarea>
				<script id="m:mainTeachLink:record_textEditor" data-name="m:mainTeachLink:record_text" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
