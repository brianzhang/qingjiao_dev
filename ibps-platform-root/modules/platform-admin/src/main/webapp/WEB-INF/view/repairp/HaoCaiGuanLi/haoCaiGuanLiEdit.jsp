<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/repairp/HaoCaiGuanLi/haoCaiGuanLi.js"></script>
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
				<form  class="fr-form"  id="haoCaiGuanLiForm" action="save.htm" >
					<input type="hidden" name="m:haoCaiGuanLi:id"  value="${haoCaiGuanLi.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材图片</label>
				  	<div class="fr-form-block">
				<div name="div_attachment_container" data-media=""   data-media_type=""  data-max_file_size=""   data-max_file_quantity="-1">
					<div class="fr-files" ></div>
					<textarea style="display: none"   data-control="attachment"  name="m:haoCaiGuanLi:haoCaiTuPian"  validate="{required:false}">${haoCaiGuanLi.haoCaiTuPian}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiGuanLi:haoCaiBianHao" value="${haoCaiGuanLi.haoCaiBianHao}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiGuanLi:haoCaiMingCheng" value="${haoCaiGuanLi.haoCaiMingCheng}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单价</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiGuanLi:danJia" value="${haoCaiGuanLi.danJia}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiGuanLi:chanWei" value="${haoCaiGuanLi.chanWei}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">种类编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiGuanLi:zhongLeiBianHao" value="${haoCaiGuanLi.zhongLeiBianHao}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
