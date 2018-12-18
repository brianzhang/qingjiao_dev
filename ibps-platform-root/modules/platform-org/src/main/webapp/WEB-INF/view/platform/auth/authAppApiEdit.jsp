<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/authAppApi.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/authAppControl.js"></script>
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
				<form  class="fr-form"  id="authAppApiForm" action="save.htm" >
					<input type="hidden" name="m:authAppApi:id"  value="${authAppApi.id}"/>
					<input type="hidden" name="m:authApp:createBy"  value="${authAppApi.createBy}"/>
					<input type="hidden" name="m:authApp:createTime"  value="<fmt:formatDate value="${authAppApi.createTime}"  pattern="yyyy-MM-dd"/>"/>
					<input type="hidden" name="m:authApp:updateBy"  value="${authAppApi.updateBy}"/>
					<input type="hidden" name="m:authApp:updateTime"  value="<fmt:formatDate value="${authAppApi.updateTime}"  pattern="yyyy-MM-dd"/>"/>
					
				<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">父级应用</label>
						  	<div class="fr-form-block">
						<div class="fr-selector" data-toggle="app-selector" data-single="true" data-bindKey="m:authAppApi:appKey">
							<ul class="selector-list"></ul>
							<textarea style="display: none"   data-control="app-selector"  name="m:authAppApi:appKey" >${authAppApi.appKey}</textarea>
						 </div>
						 	</div>
					  	</div>
					</div> 
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API标识</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:apiKey" value="${authAppApi.apiKey}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:apiName" value="${authAppApi.apiName}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:apiUri" value="${authAppApi.apiUri}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">作用域</label>
					<div class="fr-form-block">
				  		<c:forEach var="scope" varStatus="status" items="${scopes}">
				  			<label class="checkbox-inline">
                           	 	<input type="checkbox" class="ibps" value="${scope.value }" 
                           	 		name="m:authAppApi:scope" <c:if test="${fn:contains(authAppApi.scope, scope.value)}" >checked="checked"</c:if> />
                           	 	<span class="lbl">${scope.label }</span>
                             </label>
						</c:forEach>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">频次</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:authAppApi:limit"  value="${authAppApi.limit}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">测试频次</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:authAppApi:testLimit"  value="${authAppApi.testLimit}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">API描述</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:authAppApi:apiDesc" value="${authAppApi.apiDesc}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
