<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/GTGSHXX/gTGSHXX.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
<%-- 			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div> --%>
			<div class="">
					<form  class="fr-form"  id="gTGSHXXForm" >
				 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">营业执照号码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.yyzzhm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">营业执照年检时间</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.yyzznjsj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">成立时间</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.clsj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营范围</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.jyfw}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.jyfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">门店字号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.mdzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">门店地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.mddz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营规模</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.jygm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">基本账号开户行</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.jbzhkhx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">基本账号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.jbzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营面积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.jymj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">关联账户类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gTGSHXX.glzhlx=='1'}">个人结算账户</c:if><c:if test="${gTGSHXX.glzhlx=='2'}">银行卡账户口</c:if><c:if test="${gTGSHXX.glzhlx=='3'}">其他账户</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">从业人数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.cyrs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">组成形式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gTGSHXX.zcxs=='1'}">个人经营</c:if><c:if test="${gTGSHXX.zcxs=='2'}">家庭经营</c:if><c:if test="${gTGSHXX.zcxs=='3'}">合伙经营</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">营业用房</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gTGSHXX.yyyf=='1'}">自置</c:if><c:if test="${gTGSHXX.yyyf=='2'}">租用</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管户机构</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.ghjg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.bz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">合伙人名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.hhrmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gTGSHXX.zjlx=='1'}">身份证</c:if><c:if test="${gTGSHXX.zjlx=='2'}">军官证</c:if><c:if test="${gTGSHXX.zjlx==''}">护照</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件有效期限</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.zjyxqx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.zjhm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">户籍地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.hjdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户性别</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gTGSHXX.khxb=='1'}">男</c:if><c:if test="${gTGSHXX.khxb=='2'}">女</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">民族</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.mz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系电话</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.lxdh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">合伙方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gTGSHXX.hhfs}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
		
			<input type="hidden"  id="sfid" value="${sfid}">
		
			<input type="hidden"  id="id" value="${id}">
	</body>
</html>
