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
			<div class="">
				<form  class="fr-form"  id="cgqd1Form" action="save.htm" >
					<input type="hidden" name="m:cgqd1:id"  value="${cgqd1.id}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">外键</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgqd1:parentId" value="${cgqd1.parentId}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">IP地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgqd1:ip" value="${cgqd1.ip}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgqd1:updateBy" value="${cgqd1.updateBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:cgqd1:updateTime"   value="<fmt:formatDate value="${cgqd1.updateTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购项品目</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgqd1:purGoodsItem" value="${cgqd1.purGoodsItem}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购项名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgqd1:purGoodsName" value="${cgqd1.purGoodsName}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购数量</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgqd1:purNumber" value="${cgqd1.purNumber}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">市场参考价</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgqd1:purMarketPrice" value="${cgqd1.purMarketPrice}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">需求时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:cgqd1:purRequireDate"   value="<fmt:formatDate value="${cgqd1.purRequireDate}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">说明</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgqd1:purExplain" value="${cgqd1.purExplain}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgqd1:createBy" value="${cgqd1.createBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">操作时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:cgqd1:createTime"   value="<fmt:formatDate value="${cgqd1.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>