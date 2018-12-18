<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/dyrInfo/dyr.js"></script>
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
					<form  class="fr-form"  id="dyrForm" >
				 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dyr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有户籍证明</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.sfyhjzm=='1'}">是</c:if><c:if test="${dyr.sfyhjzm=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人证件类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dyrzjlx=='1'}">营业执照</c:if><c:if test="${dyr.dyrzjlx=='2'}">身份证</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人证件号码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dyrzjhm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人贷款卡号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dyrdkkh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否共有</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dywsfgy=='1'}">是</c:if><c:if test="${dyr.dywsfgy=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物共有权人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywgyqr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">共有方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.gyfs=='1'}">共同共有比例</c:if><c:if test="${dyr.gyfs=='2'}">（按份）共有</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物位置</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywwz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物种类</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dywzl=='1'}">土地使用权</c:if><c:if test="${dyr.dywzl=='2'}">住宅</c:if><c:if test="${dyr.dywzl=='3'}">门市、商店、店铺、车库</c:if><c:if test="${dyr.dywzl=='4'}">工业厂房、仓库</c:if><c:if test="${dyr.dywzl=='5'}">办公用房、办公楼</c:if><c:if test="${dyr.dywzl=='6'}">宾馆、酒店</c:if><c:if test="${dyr.dywzl=='7'}">问题娱乐用房</c:if><c:if test="${dyr.dywzl=='8'}">多功能建筑（综合楼宇）</c:if><c:if test="${dyr.dywzl=='9'}">荒地等土地承包经营权抵押</c:if><c:if test="${dyr.dywzl=='10'}">水域滩涂使用权</c:if><c:if test="${dyr.dywzl=='11'}">林权抵押</c:if><c:if test="${dyr.dywzl=='12'}">农机具等农用生产设备抵押</c:if><c:if test="${dyr.dywzl=='13'}">交通运输工具抵押</c:if><c:if test="${dyr.dywzl=='14'}">机器设备抵押</c:if><c:if test="${dyr.dywzl=='15'}">原材料、半成品、产品抵押</c:if><c:if test="${dyr.dywzl=='16'}">在建工程</c:if><c:if test="${dyr.dywzl=='17'}">其他抵押</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">房屋预登记</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.fwydj=='1'}">是</c:if><c:if test="${dyr.fwydj=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">房屋结构</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.fwjg=='1'}">砖木结构</c:if><c:if test="${dyr.fwjg=='2'}">砖混结构</c:if><c:if test="${dyr.fwjg=='3'}">钢筋混凝土结构</c:if><c:if test="${dyr.fwjg=='4'}">钢结构</c:if><c:if test="${dyr.fwjg=='5'}">其他结构</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">房产层数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.fccs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">房产所在层数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.fcszcs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywbh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否拥有土地使用权证书</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dywsfyytdsyqzs=='1'}">是</c:if><c:if test="${dyr.dywsfyytdsyqzs=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物房产土地使用权人名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywfctdsyqrmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权证号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dyfctdsyqzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dyfctdsyqlx=='1'}">出让</c:if><c:if test="${dyr.dyfctdsyqlx=='2'}">划拨</c:if><c:if test="${dyr.dyfctdsyqlx=='3'}">其他</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权面积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dyfctdsyqmj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权是否</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dyfctdsyqsf=='1'}">是</c:if><c:if test="${dyr.dyfctdsyqsf=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权抵押方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dyfctdsyqdyfs=='1'}">零价抵押</c:if><c:if test="${dyr.dyfctdsyqdyfs=='2'}">有价值抵押</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物详细描述</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywxxms}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物相关证明文件</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywxgzmwj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">购房合同/抵押物产权证号/使用权证号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.gfhtDywcqzhSyqzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">发证机关</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.fzjg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物原置购置价</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywyzgzj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">面积/数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.mjS}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">建成/购置时间</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.jcGzsj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物使用年限</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywsynx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">尚可使用年限</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.sksynx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">折旧率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.zjl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否评估</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dywsfpg=='1'}">是</c:if><c:if test="${dyr.dywsfpg=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物评估机构</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywpgjg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估方法</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.pgff=='1'}">重置成本法</c:if><c:if test="${dyr.pgff=='2'}">现值成本法</c:if><c:if test="${dyr.pgff=='3'}">现行市价法</c:if><c:if test="${dyr.pgff=='4'}">收益现值法</c:if><c:if test="${dyr.pgff=='5'}">其他方法</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物评估日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${dyr.dywpgrq}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估结论使用有效期限</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.pgjlsyyxqx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">该抵押物贷款金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.gdywdkje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估价值</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.pgjz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dyl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否进行抵押登记</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dywsfjxdydj=='1'}">是</c:if><c:if test="${dyr.dywsfjxdydj=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物登记机构</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywdjjg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押登记文件号/他项权人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dydjwjhTxqr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押价值</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dyjz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押登记日</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${dyr.dydjr}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押到期日</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${dyr.dydqr}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否保险</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dywsfbx=='1'}">是</c:if><c:if test="${dyr.dywsfbx=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险机构名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.bxjgmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物保险单号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dywbxdh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.bxje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险生效日</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${dyr.bxsxr}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险到期日</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${dyr.bxdqr}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第一受益人名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.dysyrmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否办理公证</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${dyr.dywsfblgz=='1'}">是</c:if><c:if test="${dyr.dywsfblgz=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公证机关</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.gzjg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公证日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${dyr.gzrq}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公证书编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.gzsbh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${dyr.bz}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
