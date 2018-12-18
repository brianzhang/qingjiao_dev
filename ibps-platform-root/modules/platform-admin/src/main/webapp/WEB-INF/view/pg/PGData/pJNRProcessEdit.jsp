<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/pJNRProcess.js"></script>
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
				<form  class="fr-form"  id="pJNRProcessForm" action="save.htm" >
					<input type="hidden" name="m:pJNRProcess:id"  value="${pJNRProcess.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:pJNRProcess:createTime"   value="<fmt:formatDate value="${pJNRProcess.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">支撑权重</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJNRProcess:weight" value="${pJNRProcess.weight}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJNRProcess:inspection_way" value="${pJNRProcess.inspection_way}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">最近一次评价结果文档</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:pJNRProcess:document" style="display: none;" validate="{required:false}">${fn:escapeXml(pJNRProcess.document)}</textarea>
				<script id="m:pJNRProcess:documentEditor" data-name="m:pJNRProcess:document" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">毕业要求</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJNRProcess:biYeYaoQiu" value="${pJNRProcess.biYeYaoQiu}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">指标点</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJNRProcess:zhiBiaoDian" value="${pJNRProcess.zhiBiaoDian}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">相关教学活动</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pJNRProcess:jiaoXueHuoDong" value="${pJNRProcess.jiaoXueHuoDong}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
