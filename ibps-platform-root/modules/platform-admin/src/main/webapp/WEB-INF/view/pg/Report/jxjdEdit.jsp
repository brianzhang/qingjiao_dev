<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/Report/jxjd.js"></script>
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
				<form  class="fr-form"  id="jxjdForm" action="save.htm" >
					<input type="hidden" name="m:jxjd:id"  value="${jxjd.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:jxjd:createTime"   value="<fmt:formatDate value="${jxjd.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jxjd:crs_id" value="${jxjd.crs_id}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			    <div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jxjd:crs_name" value="${jxjd.crs_name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开课单位</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jxjd:crs_unit" value="${jxjd.crs_unit}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学学时</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jxjd:teachinghours" value="${jxjd.teachinghours}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学内容</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jxjd:teachingcontent" value="${jxjd.teachingcontent}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">说明</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jxjd:remark" value="${jxjd.remark}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">撰写人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jxjd:author" value="${jxjd.author}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">院系教学院长签字</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jxjd:sign" value="${jxjd.sign}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
