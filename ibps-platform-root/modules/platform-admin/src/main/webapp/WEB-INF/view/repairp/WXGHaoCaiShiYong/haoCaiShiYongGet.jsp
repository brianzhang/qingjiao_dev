<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/repairp/WXGHaoCaiShiYong/haoCaiShiYong.js"></script>
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
					<form  class="fr-form"  id="haoCaiShiYongFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiShiYong.haoCaiBianHao}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiShiYong.haoCaiMingCheng}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">种类编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiShiYong.zhongLeiBianHao}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数量</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiShiYong.shuoLiang}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiShiYong.chanWei}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材总价</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiShiYong.haoCaiZongJia}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">维修工工种</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiShiYong.gongChong}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">维修工部门</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiShiYong.buMen}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">维修工</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${haoCaiShiYong.weiXiuGong}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${haoCaiShiYong.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
