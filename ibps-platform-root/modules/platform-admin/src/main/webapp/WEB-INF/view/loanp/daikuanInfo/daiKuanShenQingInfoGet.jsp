<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/daikuanInfo/daiKuanShenQingInfo.js"></script>
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
					<form  class="fr-form"  id="daiKuanShenQingInfoForm" >
				 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.khmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请授信额度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.sqsxed}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请授信期限</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.sqsxqx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授信总额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.sxze}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">产品名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.cpmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.sqje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款形式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.dkxs=='1'}">新增</c:if><c:if test="${daiKuanShenQingInfo.dkxs=='2'}">收回再贷</c:if><c:if test="${daiKuanShenQingInfo.dkxs=='3'}">借新换旧</c:if><c:if test="${daiKuanShenQingInfo.dkxs=='4'}">重组</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">期限类别</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.qxlb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${fn:contains(daiKuanShenQingInfo.dbfs, '1')}">质押&nbsp;</c:if><c:if test="${fn:contains(daiKuanShenQingInfo.dbfs, '2')}">抵押&nbsp;</c:if><c:if test="${fn:contains(daiKuanShenQingInfo.dbfs, '3')}">保证&nbsp;</c:if><c:if test="${fn:contains(daiKuanShenQingInfo.dbfs, '4')}">信用&nbsp;</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">合同性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.htxz=='1'}">非高额合同</c:if><c:if test="${daiKuanShenQingInfo.htxz=='2'}">一般高额合同</c:if><c:if test="${daiKuanShenQingInfo.htxz=='3'}">循环高额合同</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">行（社）定利率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.xdll}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">执行利率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.zxll}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">基准利率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.jzll}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否优惠</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.sfyh=='1'}">是</c:if><c:if test="${daiKuanShenQingInfo.sfyh=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">利率调整方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.lldzfs=='1'}">月调（对月一号</c:if><c:if test="${daiKuanShenQingInfo.lldzfs=='2'}">月调（对月对日）</c:if><c:if test="${daiKuanShenQingInfo.lldzfs=='3'}">季调（对月一号</c:if><c:if test="${daiKuanShenQingInfo.lldzfs=='4'}">季调（对月对日）</c:if><c:if test="${daiKuanShenQingInfo.lldzfs=='5'}">年调（一月一号）</c:if><c:if test="${daiKuanShenQingInfo.lldzfs=='6'}">年调（对年对月对日）</c:if><c:if test="${daiKuanShenQingInfo.lldzfs=='7'}">立即调整</c:if><c:if test="${daiKuanShenQingInfo.lldzfs=='8'}">固定</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">浮动比例</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.fdbl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">结息方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.jxfs=='1'}">利随本清</c:if><c:if test="${daiKuanShenQingInfo.jxfs=='2'}">每月20日结息</c:if><c:if test="${daiKuanShenQingInfo.jxfs=='3'}">每季末20日结息</c:if><c:if test="${daiKuanShenQingInfo.jxfs=='4'}">每年12月20日结息</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">还款来源</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.hkly=='1'}">薪酬收入</c:if><c:if test="${daiKuanShenQingInfo.hkly=='2'}">生产经营收入</c:if><c:if test="${daiKuanShenQingInfo.hkly=='3'}">补贴收入</c:if><c:if test="${daiKuanShenQingInfo.hkly=='4'}">其他收入</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有还款计划</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.sfyhkjh=='1'}">是</c:if><c:if test="${daiKuanShenQingInfo.sfyhkjh=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否政府承诺还款</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.sfzfcnhk=='1'}">是</c:if><c:if test="${daiKuanShenQingInfo.sfzfcnhk=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否合作项目贷款</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.sfhzxmdk=='1'}">是</c:if><c:if test="${daiKuanShenQingInfo.sfhzxmdk=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否涉农贷款</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.sfsndk=='1'}">是</c:if><c:if test="${daiKuanShenQingInfo.sfsndk=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">涉农贷款类别</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.sndklb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">涉农贷款用途</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.sndkyt}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款投向</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.dktx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款用途</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.dkyt}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款用途明细</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.dkytmx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否接受短息通</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.sfjsdxt=='1'}">是</c:if><c:if test="${daiKuanShenQingInfo.sfjsdxt=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.lxrmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人手机号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.lxrsjh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">支付方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.zffs=='1'}">自主支付</c:if><c:if test="${daiKuanShenQingInfo.zffs=='2'}">受托支付</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否自动扣款</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.sfzdkk=='1'}">是</c:if><c:if test="${daiKuanShenQingInfo.sfzdkk=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">自动扣款账号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${daiKuanShenQingInfo.zdkkzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">还款方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${daiKuanShenQingInfo.hkfs=='1'}">土地使用权</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='2'}">住宅</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='3'}">门市、商店、店铺、车库</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='4'}">工业厂房、仓库</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='5'}">办公用房、办公楼</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='6'}">宾馆、酒店、问题娱乐用房</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='7'}">多功能建筑（综合楼宇</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='8'}">荒地等土地承包经营权抵押</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='9'}">水域滩涂使用权</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='10'}">林权抵押</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='11'}">农机具等农用生产设备抵押</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='12'}">交通运输工具抵押</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='13'}">机器设备抵押</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='14'}">原材料、半成品、产品抵押</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='15'}">在建工程</c:if><c:if test="${daiKuanShenQingInfo.hkfs=='16'}">其他抵押</c:if></p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
