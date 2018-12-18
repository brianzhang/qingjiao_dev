<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/repairp/bxhcb/bxhcb.js"></script>
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
				<form  class="fr-form"  id="bxhcbForm" action="save.htm" >
					<input type="hidden" name="m:bxhcb:id"  value="${bxhcb.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">报修单ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bxhcb:bxdId" value="${bxhcb.bxdId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bxhcb:haoCaiMingCheng" value="${bxhcb.haoCaiMingCheng}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材数量</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:bxhcb:haoCaiShuLiang"  value="${bxhcb.haoCaiShuLiang}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
