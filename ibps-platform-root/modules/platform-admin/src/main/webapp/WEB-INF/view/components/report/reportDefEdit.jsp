<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/components/report/reportDef.js"></script>
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
				<form  class="fr-form"  id="reportDefForm" action="save.htm" >
					<input type="hidden" name="m:reportDef:id"  value="${reportDef.id}"/>
					<input type="hidden" name="m:reportDef:parentId"  value="${reportDef.parentId}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">标题</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:reportDef:title" value="${reportDef.title}" validate="{required:true,maxlength:64}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">分类</label>
				  	<div class="fr-form-block">
				  		<input type="hidden" class="form-control"  id="typeId" name="m:reportDef:typeId" value="${reportDef.typeId}"/>
                   		<input type="text" class="form-control dropdownTree" id="typeName"
                            	data-toggle="dropdownTree"  data-type="REPORT_TYPE" data-id="#typeId" readonly value="${reportDef.typeName}"
                            	validate="{required:false,maxlength:64}"  />
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数据源</label>
				  	<div class="fr-form-block">
					  	<select  id="dsAlias" name="m:reportDef:dsAlias" class="form-control">
							<c:forEach items="${dataSourceList}" var="dataSource">
								<option value="${dataSource.alias}" <c:if test="${not empty reportDef && reportDef.dsAlias == dataSource.alias}">selected='selected'</c:if> >${dataSource.name}</option>
							</c:forEach>
						</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否系统报表</label>
				  	<div class="fr-form-block">
				  		<input type="hidden" name="m:reportDef:isSys" value="${reportDef.isSys }"/>
						<p><c:if test="${reportDef.isSys == 'Y'}">是</c:if><c:if test="${reportDef.isSys == 'N'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">源文件</label>
				  	<div class="fr-form-block">
				  		<input type="hidden" name="m:reportDef:dir" value="${reportDef.dir }"/>
						<p>${reportDef.dir }</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">SQL</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" readonly name="m:reportDef:sql" validate="{required:false}">${fn:escapeXml(reportDef.sql)}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">描述</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:reportDef:note"  validate="{required:false}">${reportDef.note}</textarea>
				 	</div>
			  	</div>
			</div>
	  
		<table name="s:reportParams" data-mode="dialog" data-required="" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">报表参数</div>
			</caption>
			<thead>
				<tr>
	       			 <th>参数名</th>
	       			 <th>参数描述</th>
	       			 <th>数据类型</th>
	       			 <th>参数类型</th>
	       			 <th>参数来源</th>
	       			 <th>参数值</th>
	       			 <th>默认值</th>
		      	<th class="fr_table_col_remove" width="45px">管理</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach varStatus="stat" var="reportParams" items="${reportDef.reportParamsPoList}">	
					<tr>	
				 		<td>
							<input type="hidden" name="s:reportParams:name:${stat.index+1}"  value="${reportParams.name}"/><span>${reportParams.name}</span>
						</td>	
				 		<td>
							<input type="hidden" name="s:reportParams:desc:${stat.index+1}"  value="${reportParams.desc}"/><span>${reportParams.desc}</span>
						</td>	
				 		<td>
							<input type="hidden" name="s:reportParams:dataType:${stat.index+1}"  value="${reportParams.dataType}"/><span>${reportParams.dataType}</span>
						</td>	
				 		<td>
							<input type="hidden" name="s:reportParams:paramType:${stat.index+1}"  value="${reportParams.paramType}"/><span>${reportParams.paramTypeName}</span>
						</td>	
				 		<td>
							<input type="hidden" name="s:reportParams:source:${stat.index+1}"  value="${reportParams.source}"/><span>${reportParams.sourceName}</span>
						</td>	
				 		<td>
							<input type="hidden" name="s:reportParams:value:${stat.index+1}"  value="${reportParams.value}"/><span>${reportParams.value}</span>
						</td>	
				 		<td>
							<input type="hidden" name="s:reportParams:defValue:${stat.index+1}"  value="${reportParams.defValue}"/><span>${reportParams.defValue}</span>
						</td>	
						<td class="fr_table_col_remove" width="45px">
							<a title="编辑" class="btn  btn-xs btn-outline btn-row js-edit-row" href="javascript:void(0);"><i class=" fa fa-edit  fa-lg fa-font-green"></i></a>	
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
	<script type="text/html" id="s:reportParams:TrTemplate">
			<tr>
	 		<td>
	 			<input type="hidden" name="s:reportParams:name:{{idx}}"  value="{{name}}"/><span>{{name}}<span>
	 		</td>
	 		<td>
	 			<input type="hidden" name="s:reportParams:desc:{{idx}}"  value="{{desc}}"/><span>{{desc}}<span>
	 		</td>
	 		<td>
	 			<input type="hidden" name="s:reportParams:dataType:{{idx}}"  value="{{dataType}}"/><span>{{dataType}}<span>
	 		</td>
	 		<td>
	 			<input type="hidden" name="s:reportParams:paramType:{{idx}}"  value="{{paramType}}"/><span>{{if 'nomal' == paramType}}普通参数{{/if}}<span>
	 		</td>
	 		<td>
	 			<input type="hidden" name="s:reportParams:source:{{idx}}"  value="{{source}}"/><span>{{if 'fixed' == source}}固定值{{/if}}{{if 'input' == source}}表单输入{{/if}}{{if 'script' == source}}脚本{{/if}}<span>
	 		</td>
	 		<td>
	 			<input type="hidden" name="s:reportParams:value:{{idx}}"  value="{{value}}"/><span>{{value}}<span>
	 		</td>
	 		<td>
	 			<input type="hidden" name="s:reportParams:defValue:{{idx}}"  value="{{defValue}}"/><span>{{defValue}}<span>
	 		</td>
		  	<td class="fr_table_col_remove" width="45px">
		  		<a title="编辑" class="btn  btn-xs btn-outline btn-row js-edit-row" href="javascript:void(0);"><i class=" fa fa-edit  fa-lg fa-font-green"></i></a>
			</td>
		</tr>
	</script>
	  
		<table name="s:reportField" data-mode="inner" data-required="" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">报表字段</div>
			</caption>
			<thead>
				<tr>
	       			 <th>字段名</th>
	       			 <th>字段类型</th>
	       			 <th>字段描述</th>
		      	<!-- <th class="fr_table_col_remove" width="45px">管理</th> -->
		    </tr>
			</thead>
			<tbody>	
				<c:forEach varStatus="stat" var="reportField" items="${reportDef.reportFieldPoList}">	
					<tr>	
				 		<td>
				<input type="hidden" name="s:reportField:name:${stat.index+1}" value="${reportField.name}"/><span>${reportField.name}</span>
												</td>	
				 		<td>
				<input type="hidden" name="s:reportField:dataType:${stat.index+1}" value="${reportField.dataType}"/><span>${reportField.dataType}</span>
												</td>	
				 		<td>
				<input type="hidden" name="s:reportField:desc:${stat.index+1}" value="${reportField.desc}"/><span>${reportField.desc}</span>
												</td>	
						<!-- <td class="fr_table_col_remove" width="45px">
						</td> -->
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
	<script type="text/html" id="s:reportField:TrTemplate">
		<tr>
	 	 	 <td>
				<input type="hidden" name="s:reportField:name:{{idx}}"/><span>{{name}}</span>
			</td>
	 	 	 <td>
				<input type="hidden" name="s:reportField:dataType:{{idx}}"/><span>{{dataType}}</span>
			</td>
	 	 	 <td>
				<input type="hidden" name="s:reportField:desc:{{idx}}"/><span>{{desc}}</span>
			</td>
		</tr>
	</script>
	<!-- <td class="fr_table_col_remove" width="45px">
				<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
			</td> -->
</form>
			</div>
		</div>
	</body>
</html>
