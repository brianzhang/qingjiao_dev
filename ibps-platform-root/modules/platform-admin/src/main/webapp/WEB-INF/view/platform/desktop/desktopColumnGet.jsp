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
			<div class="panel-form">
				<table class="table-form"   cellspacing="0">
						<tr>								
							<th><span>栏目名称:</span></th>
							<td>${desktopColumn.name}</td>
						</tr>
						<tr>								
							<th><span>栏目别名:</span></th>
							<td>${desktopColumn.alias}</td>
						</tr>
						<tr>								
							<th><span>栏目分类:</span></th>
							<td>${desktopColumn.typeId}</td>
						</tr>
						<tr>								
							<th><span>是否启用:</span></th>
							<td>
								<c:choose>
									<c:when test='${desktopColumn.isEnabled=="Y"}'>
										启用
									</c:when>
									<c:when test='${desktopColumn.isEnabled=="N"}'>
										禁用
									</c:when>
									<c:otherwise> 
										其他
									</c:otherwise>
								</c:choose>
							</td>
						</tr>
						<tr>								
							<th><span>栏目类型:</span></th>
							<td>
								<c:choose>
									<c:when test='${desktopColumn.colType==1}'>
										一般栏目
									</c:when>
									<c:when test='${desktopColumn.colType==2}'>
										图表栏目
									</c:when>
									<c:when test='${desktopColumn.colType==3}'>
										滚动栏目
									</c:when>
									<c:otherwise> 
										其他
									</c:otherwise>
								</c:choose>
							</td>
						</tr>
						<tr>								
							<th><span>数据加载方式:</span></th>
							<td>
								<c:choose>
									<c:when test='${desktopColumn.dataMode==0}'>
										服务方法
									</c:when>
									<c:when test='${desktopColumn.dataMode==1}'>
										自定义查询
									</c:when>
									<c:otherwise> 
										其他
									</c:otherwise>
								</c:choose>
							</td>
						</tr>
						<tr>								
							<th><span>栏目URL:</span></th>
							<td>${desktopColumn.colUrl}</td>
						</tr>
						<tr>								
							<th><span>栏目模版:</span></th>
							<td>${desktopColumn.templateHtml}</td>
						</tr>
						<tr>								
							<th><span>数据来源:</span></th>
							<td>${desktopColumn.dataFrom}</td>
						</tr>
						<tr>								
							<th><span>数据参数:</span></th>
							<td>${desktopColumn.dataParam}</td>
						</tr>
						
						<%-- <tr>								
							<th><span>数据别名:</span></th>
							<td>${desktopColumn.dsAlias}</td>
						</tr>
						<tr>								
							<th><span>数据源名称:</span></th>
							<td>${desktopColumn.dsName}</td>
						</tr> --%>
						<tr>								
							<th><span>栏目高度:</span></th>
							<td>${desktopColumn.colHeight}</td>
						</tr>
						<tr>								
							<th><span>是否需要分页:</span></th>
							<td>
								<c:choose>
									<c:when test='${desktopColumn.needPage}'>
										是
									</c:when>
									<c:otherwise> 
										否
									</c:otherwise>
								</c:choose>
							</td>
						</tr>
						<tr>								
							<th><span>是否公共栏目:</span></th>
							<td>
								<c:choose>
									<c:when test='${desktopColumn.isPublic}'>
										是
									</c:when>
									<c:otherwise> 
										否
									</c:otherwise>
								</c:choose>
							</td>
						</tr>
						
						<tr>								
							<th><span>是否支持刷新:</span></th>
							<td>
								<c:choose>
									<c:when test='${desktopColumn.supportRefesh}'>
										是
									</c:when>
									<c:otherwise> 
										否
									</c:otherwise>
								</c:choose>
							</td>
						</tr>
						<tr>								
							<th><span>刷新时间:</span></th>
							<td>${desktopColumn.refeshTime}</td>
						</tr>
						<tr>								
							<th><span>描述:</span></th>
							<td>${desktopColumn.memo}</td>
						</tr>
				</table>
			</div>
		</div>
	</body>
</html>