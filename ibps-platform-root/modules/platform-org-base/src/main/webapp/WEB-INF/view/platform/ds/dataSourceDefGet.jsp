<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/ds/dataSourceDef.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form" id="dataSourceDefDiv">
				<table class="table-form"   cellspacing="0">
						<tr>								
							<th><span>名称:</span></th>
							<td>${dataSourceDef.name}</td>
						</tr>
						<tr>								
							<th><span>别名:</span></th>
							<td>${dataSourceDef.alias}</td>
						</tr>
						<tr>								
							<th><span>初始化方法:</span></th>
							<td>${dataSourceDef.initMethod}</td>
						</tr>
						<tr>								
							<th><span>关闭方法:</span></th>
							<td>${dataSourceDef.closeMethod}</td>
						</tr>
						<tr>								
							<th><span>说明:</span></th>
							<td>${dataSourceDef.comment}</td>
						</tr>
						<%-- <tr>								
							<th><span>数据源类全路径:</span></th>
							<td>${dataSourceDef.classPath}</td>
						</tr> --%>
				</table>
				<div class="row m-t-sm">
                               		<div class="col-sm-12">
                               			 <div class="panel blank-panel">
                               			 	 <div class="panel-heading">
		                                        <div class="panel-options">
		                                            <ul class="nav nav-tabs">
		                                                <li><a href="#paramTab" data-toggle="tab" >参数配置</a>
		                                                </li>
		                                            </ul>
		                                        </div>
		                                    </div>
		                                    
		                                     <div class="panel-body">
	                                        	<div class="tab-content">
		                                            <div class="tab-pane active" id="paramTab">
		                                            	 <table class="table table-striped">
		                                                    <thead>
		                                                        <tr>
		                                                            <th>名称</th>
		                                                            <th>描述</th>
		                                                            <th>参数类型</th>
		                                                            <th>默认值</th>
		                                                            <th>是否必填</th>
		                                                        </tr>
		                                                    </thead>
		                                                    <tbody>
		                                                    <c:forEach var="variableDef"  items="${dataSourceDef.variableDefs}">
				                                                    <tr>
													 					<td >${variableDef.name}</td>
													  					<td >${variableDef.comment}</td>
															       		<td>${variableDef.type}</td>
													  					<td >${variableDef.value}</td>
															        	<td>
																				<c:if test="${variableDef.isReq==0 } ">否</c:if>
																				<c:if test="${variableDef.isReq==1 } ">是</c:if>
																		</td>
																	</tr>
			                                                    </c:forEach>
		                                                    </tbody>
		                                                </table>

		                                            </div>
	                                            </div>
                                            </div>
                               			 </div>
                               		</div>
                            </div>
			</div>
		</div>
	</body>
</html>