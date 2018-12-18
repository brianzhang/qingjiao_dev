<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/mulu/muLu.js"></script>
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
				<form  class="fr-form"  id="muLuForm" action="save.htm" >
					<input type="hidden" name="m:muLu:id"  value="${muLu.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">材料类别</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:muLu:cllb"  value="${muLu.cllb}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${muLu.cllb=='1'}">selected="selected"</c:if>>借款人提供材料</option>
				    <option value="2" <c:if test="${muLu.cllb=='2'}">selected="selected"</c:if>>担保人提供材料</option>
				    <option value="3" <c:if test="${muLu.cllb=='3'}">selected="selected"</c:if>>担保企业提供材料</option>
				    <option value="8" <c:if test="${muLu.cllb=='8'}">selected="selected"</c:if>>担保公司提供材料</option>
				    <option value="4" <c:if test="${muLu.cllb=='4'}">selected="selected"</c:if>>贷款审批材料</option>
				    <option value="5" <c:if test="${muLu.cllb=='5'}">selected="selected"</c:if>>合同签订及放款材料</option>
				    <option value="6" <c:if test="${muLu.cllb=='6'}">selected="selected"</c:if>>贷后材料</option>
				    <option value="7" <c:if test="${muLu.cllb=='7'}">selected="selected"</c:if>>其他</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">材料名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:muLu:clmc" value="${muLu.clmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">企业</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:muLu:qy"  value="${muLu.qy}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${muLu.qy=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${muLu.qy=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">二手房</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:muLu:esf"  value="${muLu.esf}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${muLu.esf=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${muLu.esf=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人生产经营</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:muLu:grscjy"  value="${muLu.grscjy}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${muLu.grscjy=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${muLu.grscjy=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">商业用房</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:muLu:syyf"  value="${muLu.syyf}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${muLu.syyf=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${muLu.syyf=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
