<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/cgqd1.js"></script>
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
					<form  class="fr-form"  id="cgqd1FormGet" >
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">外键</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgqd1.parentId}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">IP地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgqd1.ip}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgqd1.updateBy}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${cgqd1.updateTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购项品目</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgqd1.purGoodsItem}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购项名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgqd1.purGoodsName}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购数量</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgqd1.purNumber}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">市场参考价</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgqd1.purMarketPrice}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">需求时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${cgqd1.purRequireDate}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">说明</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgqd1.purExplain}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgqd1.createBy}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${cgqd1.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>