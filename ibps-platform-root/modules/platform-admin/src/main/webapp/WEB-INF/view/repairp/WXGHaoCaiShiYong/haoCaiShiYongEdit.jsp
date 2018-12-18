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
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="haoCaiShiYongForm" action="save.htm" >
					<input type="hidden" name="m:haoCaiShiYong:id"  value="${haoCaiShiYong.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiShiYong:haoCaiBianHao" value="${haoCaiShiYong.haoCaiBianHao}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiShiYong:haoCaiMingCheng" value="${haoCaiShiYong.haoCaiMingCheng}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">种类编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiShiYong:zhongLeiBianHao" value="${haoCaiShiYong.zhongLeiBianHao}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数量</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiShiYong:shuoLiang" value="${haoCaiShiYong.shuoLiang}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiShiYong:chanWei" value="${haoCaiShiYong.chanWei}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">耗材总价</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiShiYong:haoCaiZongJia" value="${haoCaiShiYong.haoCaiZongJia}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">维修工工种</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiShiYong:gongChong" value="${haoCaiShiYong.gongChong}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">维修工部门</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiShiYong:buMen" value="${haoCaiShiYong.buMen}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">维修工</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:haoCaiShiYong:weiXiuGong" value="${haoCaiShiYong.weiXiuGong}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:haoCaiShiYong:createTime"   value="<fmt:formatDate value="${haoCaiShiYong.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
