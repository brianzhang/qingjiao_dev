<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12">
				<div class="form-horizontal ">
					<label class="col-sm-2 control-label">表来源:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${f:getDictLabel(tableConfig.tableSource, 'tableSource', 'key', '')}</p>
					</div>
					<label class="col-sm-2 control-label">业务对象:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${tableConfig.boName}</p>
					</div>
					<label class="col-sm-2 control-label">表名:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${tableConfig.tableName}</p>
					</div>
					
					<label class="col-sm-2 control-label">表注释:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${tableConfig.tableComment}</p>
					</div>
					
					<label class="col-sm-2 control-label">类名:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${tableConfig.className}</p>
					</div>
					<label class="col-sm-2 control-label">布局模板:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						${f:getDictLabel(tableConfig.layerTemplate, 'layerTemplate', 'key', '')}
						</p>
					</div>
					
					<label class="col-sm-2 control-label">主表表名:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${tableConfig.parentTableName}</p>
					</div>
					<label class="col-sm-2 control-label">分类:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${tableConfig.typeName}</p>
					</div>
					
					<label class="col-sm-2 control-label">外键:</label>
					<div class="col-sm-2">
						<p class="form-control-static">${tableConfig.foreignKey}</p>
					</div>
					<label class="col-sm-2 control-label">来自属性:</label>
					<div class="col-sm-2">
						<p class="form-control-static">${tableConfig.fromKey}</p>
					</div>
					<label class="col-sm-2 control-label">关系类型:</label>
					<div class="col-sm-2">
						<p class="form-control-static">${tableConfig.relation}</p>
					</div>
					
					<label class="col-sm-2 control-label">创建人:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${f:getPartyLabel(tableConfig.creator, 'employee', '')}</p>
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-4">
						<p class="form-control-static"><fmt:formatDate value="${tableConfig.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
					</div>

					<div class="col-sm-12 table-responsive">
						<table name="fieldConfigPoList" class="table table-bordered table-hover table-condensed">
							<caption>
								<label class="col-sm-12 text-center">字段列表</label>
							</caption>
							<thead>
								<tr>
									<td>序号</td>
									<td>列名</td>
									<td>列注释</td>
									<td>物理类型</td>
									<td>JAVA类型</td>
									<td>JAVA属性名</td>
									<td>主键</td>
									<td>列表</td>
									<td>查询</td>
									<td>控件类型</td>
									<td>排序</td>
								</tr>
							</thead>
							<tbody>
								<c:forEach var="fieldConfigPo" varStatus="status" items="${tableConfig.fieldConfigPoList}">
								   <tr>
										<td>${status.index + 1}</td>
									   	<td>${fieldConfigPo.field}</td>
									   	<td>${fieldConfigPo.fieldComment}</td>
									   	<td>${fieldConfigPo.sqlType}</td>
									   	<td>${fieldConfigPo.javaType}</td>
									   	<td>${fieldConfigPo.propName}</td>
									   	<td>
									   	<c:if test="${fieldConfigPo.keyName == 'pk'}"><span style="color:red;">是</span></c:if>
									   	<c:if test="${fieldConfigPo.keyName != 'pk'}">否</c:if>
									   	</td>
									   	<td>
									   	<c:if test="${fieldConfigPo.showList == 'Y'}"><span style="color:red;">是</span></c:if>
									   	<c:if test="${fieldConfigPo.showList == 'N'}">否</c:if>
									   	</td>
									   	<td>
									   	<c:if test="${fieldConfigPo.showQuery == 'Y'}"><span style="color:red;">是</span></c:if>
									   	<c:if test="${fieldConfigPo.showQuery == 'N'}">否</c:if>
									   	</td>
									   	<td>${f:getDictLabel(fieldConfigPo.control, 'fieldControl', 'key', '')}</td>
									   	<td>${fieldConfigPo.sn}</td>
								   </tr>
								</c:forEach>
							</tbody>
							<tfoot>
								<c:if test="${empty tableConfig || empty tableConfig.fieldConfigPoList}">
								<c:set var="subSize" scope="session" value="0"/>
								</c:if>
								<c:if test="${not empty tableConfig && not empty tableConfig.fieldConfigPoList}">
								<c:set var="subSize" scope="session" value="${tableConfig.fieldConfigPoList.size()}"/>
								</c:if>
								<tr><td colspan="12">共${subSize}条</td></tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>