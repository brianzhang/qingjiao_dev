<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/baoZhengRen/bZRXXB.js"></script>
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
					<form  class="fr-form"  id="bZRXXBForm" >
				 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${bZRXXB.bzlx=='1'}">自然人保证</c:if><c:if test="${bZRXXB.bzlx=='2'}">企业保证 </c:if><c:if test="${bZRXXB.bzlx=='3'}">政府保证</c:if><c:if test="${bZRXXB.bzlx=='4'}">下岗失业贷款担保中心</c:if><c:if test="${bZRXXB.bzlx=='5'}">国有商业银行及政策性银行保证</c:if><c:if test="${bZRXXB.bzlx=='6'}">其他银行保证</c:if><c:if test="${bZRXXB.bzlx=='7'}">非银行金融机构保证 </c:if><c:if test="${bZRXXB.bzlx=='8'}">外资和中外合资 </c:if><c:if test="${bZRXXB.bzlx=='9'}">非银行金融机构保证 </c:if><c:if test="${bZRXXB.bzlx=='10'}">组合保证</c:if><c:if test="${bZRXXB.bzlx=='11'}">其它保证</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.bzrmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人证件类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.bzrzjlx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.zjhm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系电话</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.lxdh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否保险公司保险</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${bZRXXB.sfbxgsbx=='1'}">是</c:if><c:if test="${bZRXXB.sfbxgsbx=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.bzfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.bzje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证比例</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.bzbl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">与借款人关系</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.yjkrgx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人配偶名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.bzrpomc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人配偶证件类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.bzrpozjlx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人配偶证件号码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.bzrpozjhm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">实际居住地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.sjjzdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.bz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label >若您未婚，请您提供一位联系人的基本信息，以便在必要情况下，及时保持联系联系人，必须年满18周岁</label>
				  	<div class="fr-form-block">
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人姓名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.lxrxm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人与借款人关系</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${bZRXXB.lxryjkrgx=='1'}">父母</c:if><c:if test="${bZRXXB.lxryjkrgx=='2'}">子女</c:if><c:if test="${bZRXXB.lxryjkrgx=='3'}">兄弟姐妹</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人联系电话</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bZRXXB.lxrlxdh}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
