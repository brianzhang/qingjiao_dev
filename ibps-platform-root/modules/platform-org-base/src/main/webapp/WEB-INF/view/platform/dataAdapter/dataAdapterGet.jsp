

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
					<label class="col-sm-2 control-label">目标源别名:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${dataAdapter.targetConnInfo}</p>
					</div>
					<label class="col-sm-2 control-label">目标源数据表:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${dataAdapter.targetTable}</p>
					</div>
					<label class="col-sm-2 control-label">同步源别名:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${dataAdapter.sourceConnInfo}</p>
					</div>
					<label class="col-sm-2 control-label">目标源数据表:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${dataAdapter.sourceTable}</p>
					</div>

					<div class="col-sm-12">
						<div>
							<label class="col-sm-12 text-center">同步数据字段对应信息</label>
						</div>
						<table name="dataAdapterDetailPoList" class="table table-bordered">
							<thead>
								<tr>
									<td>序号</td>
									<td>目标源数据表字段</td>
									<td>目标源数据表字段类型</td>
									<td>同步源数据表字段</td>
									<td>同步源数据表字段类型</td>
								</tr>
							</thead>
							<tbody>
								<c:forEach var="dataAdapterDetailPo" varStatus="status" items="${dataAdapter.dataAdapterDetailPoList}">
								   <tr>
										<td>${status.index + 1}</td>
									   	<td>${dataAdapterDetailPo.targetField}</td>
									   	<td>${dataAdapterDetailPo.targetType}</td>
									   	<td>${dataAdapterDetailPo.sourceField}</td>
									   	<td>${dataAdapterDetailPo.sourceType}</td>
								   </tr>
								</c:forEach>
							</tbody>
							<tfoot>
								<c:if test="${empty dataAdapter || empty dataAdapter.dataAdapterDetailPoList}">
								<c:set var="subSize" scope="session" value="0"/>
								</c:if>
								<c:if test="${not empty dataAdapter && not empty dataAdapter.dataAdapterDetailPoList}">
								<c:set var="subSize" scope="session" value="${dataAdapter.dataAdapterDetailPoList.size()}"/>
								</c:if>
								<tr><td colspan="5">共${subSize}条</td></tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>