<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/crsAchieve.js"></script>
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
				<form  class="fr-form"  id="crsAchieveForm" action="save.htm" >
					<input type="hidden" name="m:crsAchieve:id"  value="${crsAchieve.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:crsAchieve:createTime"   value="<fmt:formatDate value="${crsAchieve.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">合理</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:result1" value="${crsAchieve.result1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">负责人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:principle1" value="${crsAchieve.principle1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">规范性</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:normative" value="${crsAchieve.normative}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">完整性</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:integrity" value="${crsAchieve.integrity}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">试卷分析</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:analyze1" value="${crsAchieve.analyze1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程分析</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:analyze2" value="${crsAchieve.analyze2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:remark" value="${crsAchieve.remark}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管理人员</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:manager" value="${crsAchieve.manager}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:result2" value="${crsAchieve.result2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">整改意见</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsAchieve:opinion" style="display: none;" validate="{required:false}">${fn:escapeXml(crsAchieve.opinion)}</textarea>
				<script id="m:crsAchieve:opinionEditor" data-name="m:crsAchieve:opinion" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">负责人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:principle2" value="${crsAchieve.principle2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">覆盖</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsAchieve:cover" value="${crsAchieve.cover}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
