<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/zhiyaRInfo/zhiYaPerson.js"></script>
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
					<form  class="fr-form"  id="zhiYaPersonForm" >
				 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物所有人名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.zywsyrmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有户籍证明</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.sfyhjzm=='1'}">是</c:if><c:if test="${zhiYaPerson.sfyhjzm=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押人证件类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.zyrzjlx=='1'}">营业执照</c:if><c:if test="${zhiYaPerson.zyrzjlx=='2'}">身份证</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押人证件号码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.zyrzjhm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物是否共有</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.zywsfgy=='1'}">是</c:if><c:if test="${zhiYaPerson.zywsfgy=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质物共有权人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.zwgyqr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">共有方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.gyfs=='1'}">共同共有比例 </c:if><c:if test="${zhiYaPerson.gyfs=='2'}">（按份）共有</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物种类</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.zywzl=='1'}">本行存单（折）质押</c:if><c:if test="${zhiYaPerson.zywzl=='2'}">他行存单（折）质押</c:if><c:if test="${zhiYaPerson.zywzl=='3'}">国债质押 </c:if><c:if test="${zhiYaPerson.zywzl=='4'}">金融债券质押 </c:if><c:if test="${zhiYaPerson.zywzl=='5'}">其他有价证券质押</c:if><c:if test="${zhiYaPerson.zywzl=='6'}">保险单质押</c:if><c:if test="${zhiYaPerson.zywzl=='7'}">银行承兑汇票质押</c:if><c:if test="${zhiYaPerson.zywzl=='8'}">商业承兑汇票质押</c:if><c:if test="${zhiYaPerson.zywzl=='9'}">支票质押</c:if><c:if test="${zhiYaPerson.zywzl=='10'}">可转让股权、股票质押</c:if><c:if test="${zhiYaPerson.zywzl=='11'}">可转让基金份额质押</c:if><c:if test="${zhiYaPerson.zywzl=='12'}">应收账款质押</c:if><c:if test="${zhiYaPerson.zywzl=='13'}">粮补账户质押 </c:if><c:if test="${zhiYaPerson.zywzl=='14'}">出口退税权质押</c:if><c:if test="${zhiYaPerson.zywzl=='15'}">收费权质押 </c:if><c:if test="${zhiYaPerson.zywzl=='16'}">经营权、运营权利质押</c:if><c:if test="${zhiYaPerson.zywzl=='17'}">仓单，提单质押</c:if><c:if test="${zhiYaPerson.zywzl=='18'}">存货质押</c:if><c:if test="${zhiYaPerson.zywzl=='19'}">其他动产质押</c:if><c:if test="${zhiYaPerson.zywzl=='20'}">知识产权质押</c:if><c:if test="${zhiYaPerson.zywzl=='21'}">理财产品收益权质押</c:if><c:if test="${zhiYaPerson.zywzl=='22'}">其他质押</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">债券、单、折、票据等证号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.pjdzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">债单、票据、债券金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.zqje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否办理核押止付</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.sfblhyzf=='1'}">是</c:if><c:if test="${zhiYaPerson.sfblhyzf=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">本行存单（折）账号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.bxcdzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">债单/票据/债券开始时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${zhiYaPerson.zqkssj}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">债单/票据/债券 截止时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${zhiYaPerson.zqjzsj}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">止付单位</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.zfdw}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">币种</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.bz=='1'}">人民币</c:if><c:if test="${zhiYaPerson.bz=='2'}">外币</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物数量</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.zywsl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物是否已评估</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.zywsfypg=='1'}">是</c:if><c:if test="${zhiYaPerson.zywsfypg=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估机构</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.pgjg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估方法</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.pgff=='1'}">重置成本法</c:if><c:if test="${zhiYaPerson.pgff=='2'}">现值成本法 </c:if><c:if test="${zhiYaPerson.pgff=='3'}">现行市价法</c:if><c:if test="${zhiYaPerson.pgff=='4'}">收益现值法</c:if><c:if test="${zhiYaPerson.pgff=='5'}">其他方法</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${zhiYaPerson.pgrq}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估结论有效期限</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.pgjlyxqx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">该质押物贷款金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.gzywdkje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估价值</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.pgjz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.zyl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否进行质押登记</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.sfjxzydj=='1'}">是</c:if><c:if test="${zhiYaPerson.sfjxzydj=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物是否保证险</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.zywsfbzx=='1'}">是</c:if><c:if test="${zhiYaPerson.zywsfbzx=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险机构</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.bxjg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.bxje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物是否办理公证</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zhiYaPerson.zywsfblgz=='1'}">是</c:if><c:if test="${zhiYaPerson.zywsfblgz=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第一受益人名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.dysyrmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公证机关</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhiYaPerson.gzjg}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
