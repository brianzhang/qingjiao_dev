<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
		<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/jqueryui/jquery-ui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dataAdapter/dataAdapter.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
	</head>
	<body>
			<div class="panel-toolbar">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>

			<form  id="dataAdapterForm"  action="save.htm"   method="post">
			
			<table class="table table-form">
				<tbody>
					<tr>
						<th width="20%">提示:</th>
						<td>将<span class="red">同步源数据表字段</span>拖拉到<span class="blue">目标源数据表字段</span></td>
					</tr>
				</tbody>
			</table>
			
			<ul>
			<li style="float:left;margin-right:1em;width:28em;">
				<div class="layout-header ">
					<h5>同步源信息</h5>
	        	</div>
				<div class="panel-form">
					<div class="form-inline p-xxs">
						<div class="form-group">
							<label>数据源：</label>
							<select id="sourceDbRes" name="m:dataAdapte:sourceConnInfo" class="form-control search-select" validate="{required:true}">
	                        	<option value="">请选择...</option>
	                        	<c:forEach var="res" items="${dbRes}">
	                        		<option value="${res}" <c:if test="${dataAdapter.sourceConnInfo==res}">selected="selected"</c:if>>${res}</option>
	                        	</c:forEach>
							</select>
						</div>
						
	                    <div class="form-group"style="margin-top:1em;">
		                        <label>数据表：</label>
	                            <select id="sourceTable" name="m:dataAdapte:sourceTable" class="form-control search-select"
	                             data-value="${dataAdapter.sourceTable}"
	                             data-comment="${dataAdapter.sourceTable}"
	                             data-toggle="select2" data-multiple="false"
	                             data-ajax="${ctx}/platform/codegen/tableConfig/tableList.htm"
	                             validate="{required:true}"
	                             >
								</select>
	                    </div>
	                    
						<div class="form-group" style="margin-top:1em;">
							<a class="btn btn-primary fa fa-link sourceRead" href="javascript:void(0);" ><span>读取</span></a>
						</div>
					</div>
					
					<div id="sourceField"></div>
					
				</div>
			</li>
			
			<li style="float:left;width:40em;">
				<div class="layout-header ">
					<h5>目标源信息</h5>
	        	</div>
				<div class="panel-form">
					<div class="form-inline p-xxs">
						<div class="form-group">
							<label class="search-label">数据源：</label>
	                        <select id="targetDbRes" name="m:dataAdapte:targetConnInfo" class="form-control search-select" validate="{required:true}">
	                        	<option value="">请选择...</option>
	                        	<c:forEach var="res" items="${dbRes}">
	                        		<option value="${res}" <c:if test="${dataAdapter.targetConnInfo==res}">selected="selected"</c:if>>${res}</option>
	                        	</c:forEach>
							</select>
						</div>
						<div class="form-group" style="margin-top:1em;">
							<label class="search-label">数据表：</label>
                            <select id="targetTable" name="m:dataAdapte:targetTable" class="form-control search-select"
                             data-value="${dataAdapter.targetTable}"
                             data-comment="${dataAdapter.targetTable}"
                             data-toggle="select2" data-multiple="false"
                             data-ajax="${ctx}/platform/codegen/tableConfig/tableList.htm"
                             validate="{required:true}"
                             >
							</select>
						</div>
						<div class="form-group" style="margin-top:1em;">
							<a class="btn btn-primary fa fa-link targetRead" href="javascript:void(0);" ><span>读取</span></a>
						</div>
					</div>
					
					<div id="targetField"></div>
					
				</div>

			</li>
			
			</ul>
			</form>
			
			<input type="hidden" id="primaryKey" value="${id}" />
			
			<script type="text/html" id="draggableTemplate">
						
				{{each fields as field}}
					<div class="form-group draggable" style="border:1px solid #0099FF;" id="source_{{field.name}}">
						<label class="search-label" style="width:10em;">{{field.name}}</label>
						<label class="search-label">{{field.columnType}}</label>
					</div>
				{{/each}}
						
			</script>
			
			<script type="text/html" id="droppableTemplate">
						
				{{each fields as field}}
					<div class="form-group droppable" id="target_{{field.name}}">
						<label class="search-label targetField" style="width:10em;">{{field.name}}</label>
						<label class="search-label targetType">{{field.columnType}}</label>
						<label class="search-label mapping" style="border:1px solid #996633;width:20em;">
							<label class="search-label sourceField" style="width:10em;">&nbsp;</label>
							<label class="search-label sourceType">&nbsp;</label>
						</label>
					</div>
				{{/each}}
						
			</script>
			
			<script type="text/html" id="initDroppableTemplate">
						
				{{each fields as field}}
					<div class="form-group droppable" id="target_{{field.targetField}}">
						<label class="search-label targetField" style="width:10em;">{{field.targetField}}</label>
						<label class="search-label targetType">{{field.targetType}}</label>
						<label class="search-label mapping" style="border:1px solid #996633;width:20em;">
							{{if field.sourceField!=null && field.sourceField!=""}}
								<label class="search-label sourceField" style="width:10em;">{{field.sourceField}}</label>
								<label class="search-label sourceType">{{field.sourceType}}</label>
								<label class="search-label fa fa-remove" style="width:1em;color:red;" onclick="dataAdapter._delTargetField(this)"></label>
							{{else}}
								&nbsp;
							{{/if}}
						</label>
					</div>
				{{/each}}
						
			</script>
	</body>
</html>