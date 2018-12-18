<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/script/scriptInfo.js"></script>
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
				<form  class="fr-form"  id="scriptInfoForm" >
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">脚本别名</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${scriptInfo.aliasName}</p>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">是否有效</label>
						  	<div class="fr-form-block">
								<p class="form-control-static"><c:if test="${scriptInfo.enable=='Y'}">是</c:if><c:if test="${scriptInfo.enable=='N'}">否</c:if></p>
						 	</div>
					  	</div>
					</div>
					
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">类路径</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${scriptInfo.className}</p>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">方法名</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${scriptInfo.methodName}</p>
						 	</div>
					  	</div>
					</div>
					
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">对象名</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${scriptInfo.classInsName}</p>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">返回类型</label>
						  	<div class="fr-form-block">
					 			<p class="form-control-static">${f:getDictLabel(scriptInfo.returnType,'JavaType', 'key', '')}</p>
						 	</div>
					  	</div>
					</div>
					
					<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">相关设置</label>
						  	<div class="fr-form-block">
								<textarea id="argument" class="hide" >${fn:escapeXml(scriptInfo.argument)}</textarea>
								<table cellpadding="1" cellspacing="1" id="paramTable" class="table table-striped">
									<thead>
									  <th align="center">参数名</th>
									  <th align="center">参数类型</th>
									  <th align="center">值来源</th>
									  <th align="center">参数值</th>
									</thead>
									<tbody id="trContainer">
								    </tbody>
								</table>
								
								<script type="text/html" id="paramTemplate">
										<tr>
											<td>{{paramName}}</td>
											<td>{{paramTypeLabel}}</td>
											<td>
												{{if 'fixed' == paramMode}}固定值{{/if}}
												{{if 'dynamic' == paramMode}}动态传入{{/if}}
												{{if 'script' == paramMode}}脚本{{/if}}
											</td>
											<td>{{paramValue}}</td>
										</tr>
								</script>
						 	</div>
					  	</div>
					</div>
					
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">脚本类型</label>
						  	<div class="fr-form-block">
					 			<p class="form-control-static">${scriptInfo.type }</p>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">方法描述</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${scriptInfo.methodDesc}</p>
						 	</div>
					  	</div>
					</div>
					
					<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">脚本描述</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${scriptInfo.aliasDesc}</p>
						 	</div>
					  	</div>
					</div>
				</form>
			</div>
		</div>
	</body>
</html>
