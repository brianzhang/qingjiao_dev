<#assign pkVar=pkModel.colName >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="<#noparse>${</#noparse>ctx}/js/${cAlias}/${app}/${module}/${classVar}.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<#if model.variables.struType='list'>
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="<#noparse>${</#noparse>returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			</#if>
			<#if model.variables.struType='tree'>
			<c:choose>
			<c:when test="<#noparse>${</#noparse>empty ${classVar}}">
			<div class="alert alert-warning m-t-sm"  >
				尚未指定一个${comment}
			</div>
			</c:when>
			<c:otherwise>
			</#if>
			<#if vars.getContent?exists>
			<div class="">
				${vars.getContent}
			</div>
			<#else>
			<div class="panel-form col-sm-12">
				<div class="form-horizontal ">
					<#list commonList as col>
					<#assign colName=col.colName>
					<#if colName!=pkVar>
					<label class="col-sm-2 control-label">${col.getComment()}:</label>
					<div class="col-sm-10">
						<#if (col.colType=="java.util.Date")>
						<p class="form-control-static"><fmt:formatDate value="<#noparse>${</#noparse>${classVar}.${colName}}" /></p>		
						<#else>	
						<p class="form-control-static"><#noparse>${</#noparse>${classVar}.${colName}}</p>
						</#if>				
					</div>
					</#if>
					</#list>

					<#-- 子表部分 -->
					<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
					<#list model.subTableList as subTable>
					<div class="col-sm-12">
						<div>
							<label class="col-sm-12 text-center">${subTable.getTabComment()}</label>
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
								</tr>
							</thead>
							<tbody>
								<c:forEach var="${subTable.variables.classVar}Po" varStatus="status" items="<#noparse>${</#noparse>${classVar}.${subTable.variables.classVar}PoList}">
								   <tr>
										<td><#noparse>${</#noparse>status.index + 1}</td>
										<#list subTable.columnList as col>
										<#assign colName=col.colName>
										<#if (!col.isPK && subTable.foreignKey != col.columnName)>
									   	<td><#noparse>${</#noparse>${subTable.variables.classVar}Po.${colName}}</td>
										</#if>
										</#list>
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
								<tr><td colspan="${colspan}">共<#noparse>${</#noparse>subSize}条</td></tr>
							</tfoot>
						</table>
					</div>
					</#list>
					</#if>
				</div>
			</div>
			</#if>
		<#if model.variables.struType='tree'>
		</c:otherwise>
		</c:choose>
		</#if>
		</div>
	</body>
</html>