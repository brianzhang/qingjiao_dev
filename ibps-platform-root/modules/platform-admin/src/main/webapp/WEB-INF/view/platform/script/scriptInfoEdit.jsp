<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/script/scriptInfo.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-bug" ><span>校验</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="scriptInfoForm" action="save.htm" >
					<input type="hidden" name="m:scriptInfo:id"  value="${scriptInfo.id}"/>
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">脚本别名</label>
						  	<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="m:scriptInfo:aliasName" value="${scriptInfo.aliasName}" validate="{required:true}"/>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">是否有效</label>
						  	<div class="fr-form-block">
								<label class="fr-control-option radio-inline">
								    <input type="radio" name="m:scriptInfo:enable" class="ibps" value="Y"   <c:if test="${null == scriptInfo || null == scriptInfo.enable || '' == scriptInfo.enable || scriptInfo.enable=='Y'}">checked="checked"</c:if>  validate="{required:true}"/>
								   	<span class="lbl">是</span>
							  	</label>
								<label class="fr-control-option radio-inline">
								    <input type="radio" name="m:scriptInfo:enable" class="ibps" value="N"   <c:if test="${scriptInfo.enable=='N'}">checked="checked"</c:if>  validate="{required:true}"/>
								   	<span class="lbl">否</span>
							  	</label>
						 	</div>
					  	</div>
					</div>
					
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group">
						 	<label class="fr-control-label">类路径</label>
						  	<div class="fr-form-block">
								<input type="text" class="fr-form-control" id="className" name="m:scriptInfo:className" value="${scriptInfo.className}" validate="{required:true}"/>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">方法名</label>
						  	<div class="fr-form-block">
								<input type="text" class="fr-form-control" id="methodName" name="m:scriptInfo:methodName" value="${scriptInfo.methodName}" validate="{required:true}"/>
						 	</div>
					  	</div>
					</div>
					
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">对象名</label>
						  	<div class="fr-form-block">
								<input type="text" class="fr-form-control" id="classInsName" name="m:scriptInfo:classInsName" value="${scriptInfo.classInsName}" validate="{required:true}"/>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">返回类型</label>
						  	<div class="fr-form-block">
							 	<input type="hidden" id="returnType" name="m:scriptInfo:returnType"  value="${scriptInfo.returnType}"/>
								<input type="text" readonly="readonly"  class="fr-form-control comboTree"
									 data-toggle="dictionary"   data-dic="JavaType" data-key="#returnType"
					                 value="${f:getDictLabel(scriptInfo.returnType,'JavaType', 'key', '')}"  validate="{required:true}"/>
						 	</div>
					  	</div>
					</div>
					
					<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group">
						 	<label class="fr-control-label">相关设置</label>
						  	<div class="fr-form-block">
								<textarea class="fr-form-control fr-control-textarea hide" id="argument" name="m:scriptInfo:argument"  validate="{required:false}">${fn:escapeXml(scriptInfo.argument)}</textarea>
								<div class="panel-toolbar ">
									<div class="buttons">
										<a href="javascript:void(0);" class="btn btn-primary fa fa-add" onclick="scriptInfo.addDataParam()"><span>新增</span></a>
									</div>
								</div>
								<div class="panel-form">
									<table cellpadding="1" cellspacing="1" id="paramTable" class="table table-striped">
										<thead>
										  <th align="center">参数名</th>
										  <th align="center">参数类型</th>
										  <th align="center">值来源</th>
										  <th align="center">参数值</th>
										  <th align="center" style="width: 130px;">操作</th>
										</thead>
										<tbody id="trContainer">
									    </tbody>
									</table>
									
									<script type="text/html" id="paramTemplate">
										<tr>
											<td><input type="text" name="paramName" value="{{paramName}}" class="form-control" validate="{required:true}"/></td>
											<td>
												<div style="position: relative;">
													<input type="hidden" id="paramType{{idx}}" name="paramType" value="{{paramType}}"/>
													<input type="text" readonly="readonly" name="paramTypeLabel" class="fr-form-control dropdownTree"
									 					data-toggle="dropdownTree" data-dic="JavaType" data-key="#paramType{{idx}}" 
														value="{{paramTypeLabel}}" validate="{required:true}"/>
												</div>
											</td>
											<td>
												<select name="paramMode" class="form-control" validate="{required:true}">
													<option {{if 'fixed' == paramMode}}selected{{/if}} value="fixed">固定值</option>
													<option {{if 'dynamic' == paramMode}}selected{{/if}} value="dynamic">动态传入</option>
													<option {{if 'script' == paramMode}}selected{{/if}} value="script">脚本</option>
												</select>
											</td>
											<td>
												<textarea rows="3" cols="20" name="paramValue" class="form-control"/>{{paramValue}}</textarea>
											</td>
											<td>
												<a class="btn btn-sm btn-info fa fa-arrow-up" href="javascript:void(0);" title="上移" onclick="scriptInfo.move(this, true)"></a>
												<a class="btn btn-min btn-info fa fa-arrow-down" href="javascript:void(0);" title="下移" onclick="scriptInfo.move(this, false)"></a>
												<a class="btn btn-sm btn-info fa fa-remove" href="javascript:void(0);" title="删除" onclick="scriptInfo.del(this)"></a>
											</td>
										</tr>
									</script>
								</div>
						 	</div>
					  	</div>
					</div>
					
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">脚本类型</label>
						  	<div class="fr-form-block">
							  	<select class="form-control" name="m:scriptInfo:type" validate="{required:true}">
			                    	<c:forEach var="scriptType" items="${typeList}">
			                    		<option value="${scriptType.typeKey }"  <c:if test="${scriptType.typeKey == commonScript.category}">selected</c:if> >${scriptType.name }</option>
			                    	</c:forEach>
			                    </select>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group">
						 	<label class="fr-control-label">方法描述</label>
						  	<div class="fr-form-block">
								<textarea class="fr-form-control fr-control-textarea"  name="m:scriptInfo:methodDesc"  validate="{required:false}">${scriptInfo.methodDesc}</textarea>
						 	</div>
					  	</div>
					</div>
					 	
					<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group">
						 	<label class="fr-control-label">脚本描述</label>
						  	<div class="fr-form-block">
								<textarea class="fr-form-control fr-control-textarea"  name="m:scriptInfo:aliasDesc"  validate="{required:false}">${scriptInfo.aliasDesc}</textarea>
						 	</div>
					  	</div>
					</div>
				</form>
			</div>
		</div>
	</body>
</html>
