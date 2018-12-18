<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/repairp/repair/bxd.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
					<form  class="fr-form"  id="bxdFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">报修区域</label>
				  	<div class="fr-form-block">
			 <p class="form-control-static">${f:getDictLabel(bxd.bxqy,'bxqy', 'key', '')}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">详细地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bxd.xxdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">报修项目</label>
				  	<div class="fr-form-block">
			 <p class="form-control-static">${f:getDictLabel(bxd.bxxm,'bxxm', 'key', '')}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">报修详细</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bxd.bxxx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">预约时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${bxd.yysj}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">报修人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bxd.bxr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bxd.lxfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">上传图片</label>
				  	<div class="fr-form-block">
			<div name="div_attachment_container" data-rights="r">
				<div class="fr-files" ></div>
				<textarea style="display: none"   data-control="attachment"  name="m:bxd:sctp" >${bxd.sctp}</textarea>
			</div>
				 	</div>
			  	</div>
			</div>
							</form>

			</div>
		</div>
	</body>
</html>
