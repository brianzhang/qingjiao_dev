<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/grid.jsp"%>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript">
			var userId = '${partyEmployee.id}';
			var isGrade = '${isGrade}';
			var orgId = '${orgId}';
		</script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyEmployee.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar <c:if test="${isDialog}">hidden</c:if>">
				<div class="buttons">
					<input type="hidden" id="mode" value="get">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel">
				<div class="tabs-container tabs-x">
						<ul class="nav nav-tabs">
							<li class="active">
								<a data-toggle="tab" href="#tab-1" data-iframe="true" aria-expanded="false">基本资料</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-1-1" data-iframe="true" aria-expanded="true">扩展属性</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-2" data-iframe="true" aria-expanded="true">组织信息</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-3" data-iframe="true" 
								data-url="${ctx}/platform/org/partyEmployee/posList.htm?groupId=${partyEmployee.id}" 
								aria-expanded="true">岗位信息</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-4" data-iframe="true" 
								data-url="${ctx}/platform/org/partyEmployee/roleList.htm?groupId=${partyEmployee.id}" 
								aria-expanded="true">角色信息</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-5" data-iframe="true" aria-expanded="true">用户组信息</a>
							</li>
						</ul>
						
						<div class="tab-content">
							<div id="tab-1" class="tab-pane active">
								<div class="panel-body">
									<div class="panel-form col-sm-3 panel-left">
											<div>
												<p>
													<c:if test="${not empty partyEmployee && not empty partyEmployee.photo}">
														<img id="personPic" style="height: 300px; width: 260px"
															src="${ctx}/${partyEmployee.photo}" 
															alt="个人相片" />
													</c:if>
													<c:if test="${empty partyEmployee || empty partyEmployee.photo}">
														<img id="personPic" style="height: 300px; width: 260px"
															src="${ctx}/commons/image/default_use_image.jpg" 
															alt="个人相片" />
													</c:if>
												</p>
											</div>
										</div>
									<div class="wrapper wrapper-content col-sm-9">
										<label class="col-sm-2 control-label">员工姓名:</label>
										<div class="col-sm-10">
											<p class="form-control-static">${partyEmployee.name}</p>
										</div>
										
										<label class="col-sm-2 control-label">性别:</label>
										<div class="col-sm-10">
											<p class="form-control-static">
												<c:choose>
													<c:when test="${partyEmployee.gender=='male'}">男</c:when>
													<c:when test="${partyEmployee.gender=='female'}">女</c:when>
												</c:choose>
											</p>
										</div>
										
										<label class="col-sm-2 control-label">归属组织路径:</label>
										<div class="col-sm-10">
											<p class="form-control-static">
												<c:choose>
													<c:when test="${empty partyEmployee.orgName || partyEmployee.orgName==''}">无</c:when>
													<c:otherwise>${partyOrg.pathName}</c:otherwise>
												</c:choose>
											</p>
										</div>
									
										<label class="col-sm-2 control-label">登录账号:</label>
										<div class="col-sm-10">
											<p class="form-control-static">${partyUser.account}</p>
										</div>
										
										<label class="col-sm-2 control-label">是否超级管理员:</label>
										<div class="col-sm-10">
											<p class="form-control-static">
												<c:choose>
													<c:when test="${partyUser.isSuper=='89'}">是</c:when>
													<c:when test="${partyUser.isSuper=='78'}">否</c:when>
												</c:choose>
											</p>
										</div>
										
										<label class="col-sm-2 control-label">微信账号:</label>
										<div class="col-sm-10">
											<p class="form-control-static">${partyEmployee.wcAccount}</p>
										</div>
										
										<label class="col-sm-2 control-label">创建时间:</label>
										<div class="col-sm-10">
											<p class="form-control-static"><fmt:formatDate value="${partyEmployee.createTime}" /></p>		
										</div>
										
										<label class="col-sm-2 control-label">更新时间:</label>
										<div class="col-sm-10">
											<p class="form-control-static"><fmt:formatDate value="${partyEmployee.updateTime}" /></p>		
										</div>
										
										<label class="col-sm-2 control-label">用户状态:</label>
										<div class="col-sm-10">
											<p class="form-control-static">
												<c:choose>
													<c:when test="${partyEmployee.status eq 'actived'}">激活</c:when>
													<c:when test="${partyEmployee.status eq 'inactive'}">未激活</c:when>
													<c:when test="${partyEmployee.status eq 'locked'}">锁定</c:when>
													<c:when test="${partyEmployee.status eq 'deleted'}">已删除</c:when>
												</c:choose> 
											</p>
										</div>
									</div>
								</div>
							</div>
							
							<div id="tab-1-1" class="tab-pane">
								<div class="panel-body">
									<div class="wrapper wrapper-content col-sm-12">
										<div type="arrayData" id="attrItem" class="col-sm-12">
											<div class="form-group  col-sm-6">
											<label class="col-sm-12 control-label">属性名称
											</label>
											</div>
											<div class="form-group col-sm-6">
												<label class="col-sm-4 control-label">属性值
												</label>
											</div>
										
											<c:forEach items="${partyAttrs }" var="partyAttr">
												<div type="arrayItem">
													<div class="form-group  col-sm-6">
														<p class="form-control-static">${partyAttr.name}</p>
													</div>
													<div class="form-group  col-sm-6">
														<c:forEach items="${partyAttr.values }" var="partyAttrValue">
															<p class="form-control-static">${partyAttrValue.value}</p>
														</c:forEach>
													</div>
												</div>
											</c:forEach>
										</div>
									</div>
								</div>
							</div>
							
							<div id="tab-2" class="tab-pane">
								<div class="panel-body">
									<div class="wrapper wrapper-content col-sm-12">
									<c:choose>
									<c:when test="${empty partyOrg}">
										<div class="alert alert-warning m-t-sm"  >
											尚未指定组织</div>
									</c:when>
									<c:otherwise>
										<label class="col-sm-2 control-label">组织名称:</label>
										<div class="col-sm-10">
											<p class="form-control-static">${partyOrg.name}</p>
										</div>
										
										<label class="col-sm-2 control-label">组织路径:</label>
										<div class="col-sm-10">
											<p id="pathName" class="form-control-static">${partyOrg.pathName}</p>
										</div>
												
										<label class="col-sm-2 control-label">等级数值:</label>
										<div class="col-sm-10">
											<p class="form-control-static">${partyLevel.level}</p>
										</div>
										
										
										<label class="col-sm-2 control-label">状态:</label>
										<div class="col-sm-10">
											<p class="form-control-static">
												<c:choose>
													<c:when test="${partyOrg.status eq 'actived'}">激活</c:when>
													<c:when test="${partyOrg.status eq 'locked'}">锁定</c:when>
													<c:when test="${partyOrg.status eq 'deleted'}">已删除</c:when>  
												</c:choose>
											</p>
										</div>
									</c:otherwise>
									</c:choose>
									</div>
								</div>
							</div>
							
							<div id="tab-3" class="tab-pane">
								<div class="panel-body">
									<div class="wrapper wrapper-content col-sm-12">
									</div>
								</div>
							</div>
							
							<div id="tab-4" class="tab-pane">
								<div class="panel-body">
									<div class="wrapper wrapper-content col-sm-12">
									</div>
								</div>
							</div>
							
							<div id="tab-5" class="tab-pane">
								<div class="panel-body">
									<div class="wrapper wrapper-content animated fadeInRight col-sm-12">
										<div class="row">
											<div class="jqGrid_wrapper">
												<table id="userGroupItemGrid"></table>
											</div>
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