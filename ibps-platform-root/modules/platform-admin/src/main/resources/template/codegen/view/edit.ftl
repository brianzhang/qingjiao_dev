<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
		<script type="text/javascript" src="<#noparse>${</#noparse>ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		</#if>
		<script type="text/javascript" src="<#noparse>${</#noparse>ctx}/js/${cAlias}/${app}/${module}/${classVar}.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<#if !(sub?exists && sub==true)>
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<#if model.variables.struType='list'>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</#if>
				</div>
			</div>
			</#if>
			<#if vars.editContent?exists>
			<div class="">
				${vars.editContent}
			</div>
			<#else>
			<div class="panel-form">
				<form class="form-horizontal" id="${classVar}Form"  action="save.htm"   method="post">
					<div>
						<#list commonList as col>
						<#assign colName=convertUnderLine(col.columnName)>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">${col.getComment()}<#if col.isNotNull><span class="required">*</span></#if>:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="${col.colName}" name="${col.colName}" value="<#noparse>${</#noparse>${classVar}.${col.colName}}"  validate="{<#if col.isNotNull>required:true<#else>required:false</#if><#if col.colType=='String'&& col.length<1000>,maxlength:${col.length}</#if><#if col.colType=='Integer'|| col.colType=='Long'||col.colType=='Float'>,number:true<#if col.scale!=0>,maxDecimalLen:${col.scale}</#if><#if col.precision!=0>,maxIntLen:${col.precision}</#if></#if>}"/>
	                        </div>
	                    </div>
						</#list>
	                    <input type="hidden" name="${model.pkModel.colName}" value="<#noparse>${</#noparse>${classVar}.${model.pkModel.colName}}" />
					</div>
					
					<#-- 子表部分 -->
					<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
					<#list model.subTableList as subTable>
					<div class="form-group">
						<div class="col-sm-12">
							<label class="col-sm-12 text-center">${subTable.getTabComment()}</label>
							<div class="col-sm-12 panel-toolbar ">
								<div class="toolbar-panel">
									<div class="buttons">
										<a class="btn btn-primary fa fa-add" href="javascript:${classVar}.addSub('${subTable.variables.classVar}PoList');"><span>添加</span></a>
										<a class="btn btn-primary fa fa-remove" href="javascript:${classVar}.removeSubAll('${subTable.variables.classVar}PoList');"><span>重置</span></a>
									</div>
								</div>
							</div>
							<table name="${subTable.variables.classVar}PoList" class="table table-bordered">
								<thead>
									<tr>
										<td>序号</td>
										<#assign colspan=0>
										<#list subTable.columnList as col>
										<#assign colName=col.colName>
										<#if (!col.isPK && subTable.foreignKey != col.columnName)>
										<td>${col.comment}</td>
										</#if>
										</#list>
										<#assign colspan=colspan+2>
										<td>管理</td>
									</tr>
								</thead>
								<tbody>
									<c:forEach var="${subTable.variables.classVar}Po" varStatus="status" items="<#noparse>${</#noparse>${classVar}.${subTable.variables.classVar}PoList}">
									   <tr>
											<td><#noparse>${</#noparse>status.index + 1}</td>
											<#list subTable.columnList as col>
											<#assign colName=col.coluName>
											<#if (!col.isPK && subTable.foreignKey != col.columnName)>
										   	<td>
												<input type="text" class="form-control" name="${colName}" value="<#noparse>${</#noparse>${subTable.variables.classVar}Po.${colName}}"  validate="{<#if col.isNotNull>required:true<#else>required:false</#if><#if col.colType=='String'&& col.length<1000>,maxlength:${col.length}</#if><#if col.colType=='Integer'|| col.colType=='Long'||col.colType=='Float'>,number:true<#if col.scale!=0>,maxDecimalLen:${col.scale}</#if><#if col.precision!=0>,maxIntLen:${col.precision}</#if></#if>}"/>
											</td>
											</#if>
											</#list>
											<td>
												<a class="btn btn-primary fa fa-remove" href="javascript:void(0);" onclick="${classVar}.removeSub('${subTable.variables.classVar}PoList',this);"><span>删除</span></a>
											</td>
									   </tr>
									</c:forEach>
								</tbody>
								<tfoot>
									<c:if test="<#noparse>${</#noparse>empty ${classVar} || empty ${classVar}.${subTable.variables.classVar}PoList}">
									<c:set var="subSize" scope="session" value="0"/>
									</c:if>
									<c:if test="<#noparse>${</#noparse>not empty ${classVar} && not empty ${classVar}.${subTable.variables.classVar}PoList}">
									<c:set var="subSize" scope="session" value="<#noparse>${</#noparse>${classVar}.${subTable.variables.classVar}PoList.size()}"/>
									</c:if>
									<input type="hidden" name="subSize" value="<#noparse>${</#noparse>subSize}"/>
									<tr><td colspan="${colspan}">共<#noparse>${</#noparse>subSize}条</td></tr>
								</tfoot>
							</table>
							<#-- 子表编辑模板 -->
							<script type="text/html" id="${subTable.variables.classVar}PoListTrTemplate">
								<tr>
									<td>{{index}}</td>
									<#list subTable.columnList as col>
									<#assign colName=col.colName>
									<#if (!col.isPK && subTable.foreignKey != col.columnName)>
									<td>
										<input type="text" class="form-control" name="${colName}" value="" validate="{<#if col.isNotNull>required:true<#else>required:false</#if><#if col.colType=='String'&& col.length<1000>,maxlength:${col.length}</#if><#if col.colType=='Integer'|| col.colType=='Long'||col.colType=='Float'>,number:true<#if col.scale!=0>,maxDecimalLen:${col.scale}</#if><#if col.precision!=0>,maxIntLen:${col.precision}</#if></#if>}"/>
									</td>
									</#if>
									</#list>
									<td>
										<a class="btn btn-primary fa fa-remove" href="javascript:void(0);" onclick="${classVar}.removeSub('${subTable.variables.classVar}PoList',this);"><span>删除</span></a>
									</td>
								</tr>
							</script>
						</div>
					</div>
					</#list>
					</#if>
				</form>
			</div>
			</#if>
		</div>
	</body>
</html>