<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/crsDegree.js"></script>
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
				<form  class="fr-form"  id="crsDegreeForm" action="save.htm" >
					<input type="hidden" name="m:crsDegree:id"  value="${crsDegree.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:crsDegree:createTime"   value="<fmt:formatDate value="${crsDegree.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:course_id" value="${crsDegree.course_id}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否合理</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:rationality" value="${crsDegree.rationality}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程负责人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:course_principal" value="${crsDegree.course_principal}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">规范性</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:standardability" value="${crsDegree.standardability}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">完整性</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:integrality" value="${crsDegree.integrality}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">试卷分析</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsDegree:paper_analysis" style="display: none;" validate="{required:false}">${fn:escapeXml(crsDegree.paper_analysis)}</textarea>
				<script id="m:crsDegree:paper_analysisEditor" data-name="m:crsDegree:paper_analysis" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程分析</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:course_analysis" value="${crsDegree.course_analysis}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">完全覆盖</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:complete_cover" value="${crsDegree.complete_cover}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学管理员</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:education_manager" value="${crsDegree.education_manager}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:judgement_result" value="${crsDegree.judgement_result}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">整改意见</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:change_advice" value="${crsDegree.change_advice}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">专业负责人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsDegree:major_principal" value="${crsDegree.major_principal}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
