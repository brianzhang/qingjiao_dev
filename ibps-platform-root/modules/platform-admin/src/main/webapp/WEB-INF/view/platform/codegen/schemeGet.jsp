

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
					<label class="col-sm-2 control-label">方案名称:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${scheme.name}</p>
					</div>
					<label class="col-sm-2 control-label">分类:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${scheme.typeName}</p>
					</div>
					<label class="col-sm-2 control-label">是否生成子表:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						<c:if test="${scheme.genSub == 'Y'}">是</c:if>
						<c:if test="${scheme.genSub == 'N'}">否</c:if>
						</p>
					</div>
					<label class="col-sm-2 control-label">表名:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${scheme.tableName}</p>
					</div>
					<label class="col-sm-2 control-label">表单:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${scheme.formLabel}</p>
					</div>
					
					<label class="col-sm-2 control-label">生成类型:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${scheme.doType}</p>
					</div>
					
					<label class="col-sm-2 control-label">系统:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${scheme.sys}</p>
					</div>
					<label class="col-sm-2 control-label">平台:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${scheme.platform}</p>
					</div>
					
					<label class="col-sm-2 control-label">模块:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${scheme.module}</p>
					</div>
					<label class="col-sm-2 control-label">是否基础模块<i class="fa fa-help red" data-tip title="基础模块是指系统名与模块名一致，生成代码时不会连续使用相同包名；系统名org，模块名org，是否基础模块为'是'则生成包名为com.lc.ibps.org；是否基础模块为'否'则生成包名为com.lc.ibps.org.org；"></i>:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						<c:if test="${scheme.isBase == 'Y'}">是</c:if>
						<c:if test="${scheme.isBase == 'N'}">否</c:if>
						</p>
					</div>
					
					<label class="col-sm-2 control-label">代码作者:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${scheme.developer}</p>
					</div>
					<label class="col-sm-2 control-label">作者邮箱:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${scheme.email}</p>
					</div>
					
					<label class="col-sm-2 control-label">包路径:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${scheme.packageUrl}</p>
					</div>
					
					<label class="col-sm-2 control-label">菜单url:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${scheme.menuUrl}</p>
					</div>
					
					<label class="col-sm-2 control-label">描述:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${scheme.comment}</p>
					</div>
					
					<label class="col-sm-2 control-label">创建人:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${f:getPartyLabel(scheme.creator, 'employee', '')}</p>
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-4">
						<p class="form-control-static"><fmt:formatDate value="${scheme.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
					</div>

					<div class="col-sm-12 table-responsive">
						<table name="schemeParamPoList" class="table table-bordered table-hover table-condensed">
							<caption>
								<label class="col-sm-12 text-center">参数列表</label>
							</caption>
							<thead>
								<tr>
									<td>序号</td>
									<td>参数名</td>
									<td>值</td>
								</tr>
							</thead>
							<tbody>
								<c:forEach var="schemeParamPo" varStatus="status" items="${scheme.schemeParamPoList}">
								   <tr>
										<td>${status.index + 1}</td>
									   	<td>${f:getDictLabel(schemeParamPo.key, 'schemeParam', 'key', '')}</td>
									   	<td>${schemeParamPo.value}</td>
								   </tr>
								</c:forEach>
							</tbody>
							<tfoot>
								<c:if test="${empty scheme || empty scheme.schemeParamPoList}">
								<c:set var="subSize" scope="session" value="0"/>
								</c:if>
								<c:if test="${not empty scheme && not empty scheme.schemeParamPoList}">
								<c:set var="subSize" scope="session" value="${scheme.schemeParamPoList.size()}"/>
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