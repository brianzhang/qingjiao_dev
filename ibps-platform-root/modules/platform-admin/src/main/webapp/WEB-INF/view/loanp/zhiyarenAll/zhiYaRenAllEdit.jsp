<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/zhiyarenAll/zhiYaRenAll.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm?jdid=${jdid}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="zhiYaRenAllForm" action="save.htm?jdid=${jdid}" >
					<input type="hidden" name="m:zhiYaRenAll:id"  value="${zhiYaRenAll.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保类别</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaRenAll:dblb"  value="质押人" validate="{required:false}"  disabled="true"/>
					 
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押人名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaRenAll:mc" value="${zhiYaRenAll.mc}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaRenAll:zjlx"  value="${zhiYaRenAll.zjlx}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="营业执照" <c:if test="${zhiYaPerson.zyrzjlx=='1'}">selected="selected"</c:if>>营业执照</option>
				    <option value="身份证" <c:if test="${zhiYaPerson.zyrzjlx=='2'}">selected="selected"</c:if>>身份证</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"    name="m:zhiYaRenAll:zjhm" value="${zhiYaRenAll.zjhm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
