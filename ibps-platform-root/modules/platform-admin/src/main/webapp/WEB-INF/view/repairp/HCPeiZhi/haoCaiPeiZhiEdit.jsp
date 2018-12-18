<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/repairp/HCPeiZhi/haoCaiPeiZhi.js"></script>
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
				<form  class="fr-form"  id="haoCaiPeiZhiForm" action="save.htm" >
					<input type="hidden" name="m:haoCaiPeiZhi:id"  value="${haoCaiPeiZhi.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">种类编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiPeiZhi:zhongLeiBianHao" value="${haoCaiPeiZhi.zhongLeiBianHao}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiPeiZhi:haoCaiMingCheng" value="${haoCaiPeiZhi.haoCaiMingCheng}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:haoCaiPeiZhi:createTime"   value="<fmt:formatDate value="${haoCaiPeiZhi.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
