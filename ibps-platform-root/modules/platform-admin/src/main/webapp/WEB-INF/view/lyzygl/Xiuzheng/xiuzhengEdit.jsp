<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/lyzygl/Xiuzheng/xiuzheng.js"></script>
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
				<form  class="fr-form"  id="xiuzhengForm" action="save.htm" >
					<input type="hidden" name="m:xiuzheng:id"  value="${xiuzheng.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:xiuzheng:createTime"   value="<fmt:formatDate value="${xiuzheng.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林地</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiuzheng:linDi" value="${xiuzheng.linDi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林木</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiuzheng:linMu" value="${xiuzheng.linMu}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">去年面积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiuzheng:quNianMianJi" value="${xiuzheng.quNianMianJi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">去年蓄积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiuzheng:quNianXuJi" value="${xiuzheng.quNianXuJi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">修正面积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiuzheng:xiuZhengMianJi" value="${xiuzheng.xiuZhengMianJi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">修正蓄积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiuzheng:xiuZhengXuJi" value="${xiuzheng.xiuZhengXuJi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
