<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/grid.jsp"%>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp"%>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript">
			var userId = '${partyEmployee.id}';
			var isGrade = '${isGrade}';
			var orgId = '${orgId}';
		</script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyEmployee.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyGroupDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/UploadDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<input type="hidden" id="mode" value="edit">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<form class="form-horizontal" id="partyEmployeeForm"  action="save.htm"   method="post"  >
				<div class="panel">
					<div class="tabs-container tabs-x">
						<ul class="nav nav-tabs">
							<li class="active">
								<a data-toggle="tab" href="#tab-1" data-iframe="true" aria-expanded="false">基本资料</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-1-1" data-iframe="true" aria-expanded="false">扩展属性</a>
							</li>
							<!-- 分级管理员不能编辑角色 -->
							<c:if test="${empty orgId || orgId == ''}">
							<li class="">
								<a data-toggle="tab" href="#tab-2" data-iframe="true" aria-expanded="true">组织信息</a>
							</li>
							</c:if>
							<li class="">
								<a data-toggle="tab" href="#tab-3" data-iframe="true" aria-expanded="true">岗位信息</a>
							</li>
							<!-- 分级管理员不能编辑角色 -->
							<c:if test="${empty orgId || orgId == ''}">
							<li class="">
								<a data-toggle="tab" href="#tab-4" data-iframe="true" aria-expanded="true">角色信息<c:if test="${!empty partyEmployee }"><i class="fa fa-help red" data-tip title="“其他”来源的角色继承于组织、岗位，不能删除"></i></c:if></a>
							</li>
							</c:if>
							<li class="">
								<a data-toggle="tab" href="#tab-5" data-iframe="true" aria-expanded="true">用户组信息</a>
							</li>
						</ul>
						
						<div class="tab-content">
							<div id="tab-1" class="tab-pane active">
								<div class="panel-body">
									<div class="wrapper wrapper-content col-sm-12">
									<div class="row">
										<div class="panel-form col-sm-3 panel-left">
											<div style="height: 28px; margin-top: 2px">
												<a class="btn btn-sm btn-primary fa fa-delete" href="#"
													onclick="delPic();"><span>删除照片</span></a> <a
													class="btn btn-sm btn-primary fa fa-cloud-upload" href="#"
													onclick="addPic();"><span>上传照片</span></a>
											</div>
											<div>
												<p>
													<c:if test="${not empty partyEmployee && not empty partyEmployee.photo}">
														<img id="personPic" style="height: 300px; width: 260px"
															src="${ctx}${partyEmployee.photo}" 
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
										<div class="col-sm-9 animated fadeInRight">
											<div class="panel-form col-sm-12">
												<form class="form-horizontal" id="employeeBaseForm" action="save.htm" method="post">
													<!-- 账号资料 -->
													<div class="form-group">
						                                <label class="col-sm-2 control-label">账号<span class="required">*</span>:</label>
						                                <div class="col-sm-10">
						                                	<c:if test="${not empty partyUser.account}">
						                                		<input type="text" class="form-control" disabled="disabled" id="account" name="account" value="${partyUser.account}"  validate="{required:true,maxlength:192}"/>
						                                	</c:if>
						                                	<c:if test="${empty partyUser.account}">
							                                    <input type="text" class="form-control"  id="account" name="account" value="${partyUser.account}"  validate="{required:true,maxlength:192}"/>
						                                	</c:if>
						                                	<span class="help-block">格式：由数字字母组成，以字母开头，至少3位</span>
						                                </div>
						                            </div>
						                            <div class="form-group col-sm-12"
														<c:if test="${not empty partyUser.password}"> hidden="true" </c:if>>
														<input type="hidden" name="password" class="inputText"
															value="${partyUser.password}" />
													</div>
						                            <c:if test="${empty partyUser.password}">
														<div class="form-group">
							                                <label class="col-sm-2 control-label">密码<span class="required">*</span>:</label>
							                                <div class="col-sm-10">
							                                	<c:choose>
																	<c:when test="${not empty userSecurity&& userSecurity.isUseComp=='N'}">
																		<input class="form-control"   type="password" id="password" name="password" value="${partyUser.password}" validate="{required:true,minlength:${userSecurity.minLength},maxlength:${userSecurity.maxLength}}"/>
																	</c:when>
																	<c:when test="${not empty userSecurity&& userSecurity.isUseComp=='Y'}">
																		<input class="form-control"   type="password" id="password" name="password" value="${partyUser.password}" validate="{required:true,minlength:${userSecurity.minLength},maxlength:${userSecurity.maxLength}<c:if test='${fn:contains(userSecurity.complexity,3)}'>,containnum:true</c:if><c:if test='${fn:contains(userSecurity.complexity,1)}'>,containlowcase:true</c:if><c:if test='${fn:contains(userSecurity.complexity,2)}'>,containuppercase:true</c:if><c:if test='${fn:contains(userSecurity.complexity,4)}'>,containspec:true</c:if>}"/>
																	</c:when>
																	<c:otherwise>
																	<input class="form-control"   type="password" id="password" name="password" value="${partyUser.password}" validate="{required:true,maxlength:384}"/>
																	</c:otherwise>
																</c:choose>
																<c:if test="${not empty userSecurity}">
																	<span class="help-block">格式：最大长度${userSecurity.maxLength};最小长度${userSecurity.minLength};
																	<c:if test="${userSecurity.isUseComp=='Y'}">
																			<c:if test="${fn:contains(userSecurity.complexity,1)}">必须包含小写字母;</c:if>
																			<c:if test="${fn:contains(userSecurity.complexity,2)}">必须包含大写字母;</c:if>
																			<c:if test="${fn:contains(userSecurity.complexity,3)}">必须包含数字;</c:if>
																			<c:if test="${fn:contains(userSecurity.complexity,4)}">必须包含（^%&@*?!$）特殊字符;</c:if>
																	</c:if>
																	</span>
																</c:if>
							                                </div>
							                            </div>
						                            </c:if>
													<div class="form-group hide">
						                                <label class="col-sm-2 control-label">是否管理员<span class="required">*</span>:</label>
						                                <div class="col-sm-10">
						                                 	<label class="radio-inline "> <input type="radio" class="ibps" value="Y" name="isSuper"
																<c:if test="${partyUser.isSuper==89}">checked="checked"</c:if>><span class="lbl">是</span>
															</label> 
															<label class="radio-inline "> <input type="radio" class="ibps" value="N" name="isSuper"
																<c:if test="${empty partyUser || partyUser.isSuper==78}">checked="checked"</c:if>><span class="lbl">否</span>
															</label>
						                                </div>
						                            </div>
						                            
													<!-- 员工资料 -->
													<div class="form-group">
						                                <label class="col-sm-2 control-label">员工姓名: </label>
						                                <div class="col-sm-10">
						                                    <input type="text" class="form-control"  id="name" name="name" value="${partyEmployee.name}"  validate="{required:true,maxlength:765}"/>
						                                </div>
						                            </div>
													<div class="form-group">
						                                <label class="col-sm-2 control-label">员工状态<span class="required">*</span>:</label>
						                                <div class="col-sm-10">
															<select class="form-control" id="status" name="status" validate="{required:true,maxlength:120}">
																<c:forEach items="${statuses}" var="status">
																	<option value="${status.value}"
																		<c:if test="${not empty partyEmployee && partyEmployee.status eq status.value}">selected="selected"</c:if>>${status.label}</option>
																</c:forEach> 
															</select>
						                                </div>
						                            </div>
						                            <div class="form-group">
														<label class="col-sm-2 control-label">性别: </label>
														<div class="col-sm-10">
															<label class="radio-inline "> <input type="radio"
																value="male" name="gender" class="ibps"
																<c:if test="${empty partyEmployee || partyEmployee.gender=='male'}">checked="checked"</c:if>><span
																class="lbl">男</span></label> <label class="radio-inline ">
																<input type="radio" value="female" name="gender"
																class="ibps"
																<c:if test="${partyEmployee.gender=='female'}">checked="checked"</c:if>><span
																class="lbl">女</span>
															</label>
														</div>
													</div>
													<div class="form-group">
						                                <label class="col-sm-2 control-label">邮箱:</label>
						                                <div class="col-sm-10">
						                                    <input type="text" class="form-control"  id="email" name="email" value="${partyEmployee.email}"  validate="{required:true,maxlength:192,email:true}"/>
						                                </div>
						                            </div>
													<div class="form-group">
						                                <label class="col-sm-2 control-label">地址:</label>
						                                <div class="col-sm-10">
						                                    <input type="text" class="form-control"  id="address" name="address" value="${partyEmployee.address}"  validate="{required:false,maxlength:765}"/>
						                                </div>
						                            </div>
													<div class="form-group">
						                                <label class="col-sm-2 control-label">电话:</label>
						                                <div class="col-sm-10">
						                                    <input type="text" class="form-control"  id="mobile" name="mobile" value="${partyEmployee.mobile}"  validate="{phone:true,required:false,maxlength:765}"/>
						                                </div>
						                            </div>
													<div class="form-group">
						                                <label class="col-sm-2 control-label">QQ:</label>
						                                <div class="col-sm-10">
						                                    <input type="text" class="form-control"  id="qq" name="qq" value="${partyEmployee.qq}"  validate="{QQ:true,required:false,maxlength:60}"/>
						                                </div>
						                            </div>
													<div class="form-group">
						                                <label class="col-sm-2 control-label">微信账号:</label>
						                                <div class="col-sm-10">
						                                    <input type="text" class="form-control"  id="wcAccount" name="wcAccount" value="${partyEmployee.wcAccount}" 
						                                    	validate="{required:false,maxlength:64}" />
						                                </div>
						                            </div>
						                            
													<input type="hidden" name="id" value="${partyEmployee.id}" />
													<input type="hidden" id="photo" name="photo" value="${partyEmployee.photo}" />
													<input type="hidden" id="prem" name="prem" value="${prem}" />
													<input type="hidden" name="createTime" value="<fmt:formatDate value='${partyEmployee.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/>"/>
												</form>
											</div>
										</div>
									</div>
								</div>
								</div>
							</div>
							
							<div id="tab-1-1" class="tab-pane">
								<div class="panel-body">
									<div class="panel-toolbar ">
										<div class="buttons">
											<a href="javascript:partyEmployee.clearAttr();" class="btn btn-primary fa fa-transh-o" ><span>清空</span></a>
										</div>
									</div>
									<div class="wrapper wrapper-content col-sm-12">
										<div type="attrData" id="attrItem" class="panel-form col-sm-12">
											<div class="form-group  col-sm-6">
											<label class="col-sm-12 control-label">属性名称
											</label>
											</div>
											<div class="form-group col-sm-6">
												<label class="col-sm-4 control-label">属性值
												</label>
											</div>
											
											<c:forEach var="partyAttr" items="${partyAttrs}">
												<div type="attrItem">
													<div class="form-group  col-sm-6">
														<label class="col-sm-12 control-label">${partyAttr.name}:
														</label>
													</div>
													<div class="form-group col-sm-6">
														<div class="col-sm-12">
															<c:choose>
																<c:when test="${partyAttr.dataType eq 'OPTION'}">
																	<c:choose>
																		<c:when test="${partyAttr.isMulti == 89}">
																			<!-- 多选 -->
																			<c:forEach items="${partyAttr.options}" var="keyValue">
																				<label class="control-label"> 
																			    <input type="checkbox" name="${partyAttr.key}" value="${keyValue.value}" class="ibps" 
																				    <c:forEach items="${partyAttr.values}" var="value">
																				    	<c:if test="${keyValue.value == value.value }">checked='checked'</c:if>
																				    </c:forEach>
																			    >
																			    <span class="lbl">${keyValue.groupName}</span>
																				</label>
																			</c:forEach>
																		</c:when>
																		<c:otherwise>
																			<!-- 单选 -->
																			<c:forEach items="${partyAttr.options}" var="keyValue">
																				<label class="radio-inline"> 
																				<input type="radio" name="${partyAttr.key}" value="${keyValue.value}" class="ibps" 
																					<c:forEach items="${partyAttr.values}" var="value">
																				    	<c:if test="${keyValue.value == value.value }">checked='checked'</c:if>
																				    </c:forEach>
																				>
																				<span class="lbl">${keyValue.groupName}</span>
																				</label>
																			</c:forEach>
																		</c:otherwise>
																	</c:choose>
																</c:when>
																<c:when test="${partyAttr.dataType eq 'DATE'}">
																	<!-- 日期-->
																	<input type="text" id="attributeValue.dateVal" name="${partyAttr.key}" 
																		value="${partyAttr.values[0].value}" validate="{date:true}" class="form-control date" />
																</c:when>
																<c:when test="${partyAttr.dataType eq 'DOUBLE'}">
																	<!-- 浮点 -->
																	<input type="text" name="${partyAttr.key}" value="${partyAttr.values[0].value}" class="form-control" validate="{number:true}" />
																</c:when>
																<c:when test="${partyAttr.dataType eq 'INT'}">
																	<!-- 整型 -->
																	<input type="text" name="${partyAttr.key}" value="${partyAttr.values[0].value}" class="form-control" validate="{digits:true}" />
																</c:when>
																<c:when test="${partyAttr.dataType eq 'BOOLEAN'}">
																	<!-- 布尔（字符串） -->
																	<label class="radio-inline"> 
																	<input type="radio" name="${partyAttr.key}" value="Y" class="ibps" 
																		<c:forEach items="${partyAttr.values}" var="value">
																	    	<c:if test="${'Y' == value.value }">checked='checked'</c:if>
																	    </c:forEach>
																	>
																	<span class="lbl">是</span>
																	</label>
																	<label class="radio-inline"> 
																	<input type="radio" name="${partyAttr.key}" value="N" class="ibps" 
																		<c:forEach items="${partyAttr.values}" var="value">
																	    	<c:if test="${'N' == value.value }">checked='checked'</c:if>
																	    </c:forEach>
																	>
																	<span class="lbl">否</span>
																	</label>
																</c:when>
																<c:when test="${partyAttr.dataType eq 'STRING'}">
																	<!-- 字符串 -->
																	<input type="text" name="${partyAttr.key}" value="${partyAttr.values[0].value}" class="form-control" validate="{}" />
																</c:when>
															</c:choose>
														</div>
													</div>
													<input type="hidden" name="attrId" value="${partyAttr.id}" />
												</div>
											</c:forEach>
										</div>
									</div>
								</div>
							</div>
							
							<div id="tab-2" class="tab-pane">
								<div class="panel-body ">
									<div class="wrapper wrapper-content col-sm-12">
										<div class="row">
											<div class="col-sm-3 panel-left panel-form">
												<div class="org-tree-toolbar">
													<a class="btn btn-primary fa fa-refresh" title="刷新"></a> <a
														class="btn btn-primary fa fa-expand" title="展开"></a> <a
														class="btn btn-primary fa fa-compress" title="收缩"></a>
												</div>
												<div class="zTreeDemoBackground left"><!-- 360px -->
													<ul id="orgTree" class="ztree"
														style="border: 1px solid #617775; overflow-y: scroll; height: 100%;"></ul>
												</div>
											</div>
											
											<div class="col-sm-1 panel-center">
												<div>
													<!-- 分级管理员不能编辑组织 -->
													<c:if test="${empty orgId || orgId == ''}">
													<a class="btn btn-primary fa fa-angle-double-right"
														href="javascript:partyEmployee.showOrgInfo();"><span>属于</span></a>
													<a class="btn btn-primary fa fa-angle-double-left"
														href="javascript:partyEmployee.hiddenOrgInfo();"><span>清空</span></a>
													</c:if>
												</div>
											</div>
											
											<div class="col-sm-8 panel-right panel-form party-org-info">
												<c:if test="${not empty orgId && orgId != ''}">
													<input type="hidden" id="orgId" name="groupID" value="${orgId}"/>
												</c:if>
												<c:if test="${empty orgId || orgId == ''}">
													<input type="hidden" id="orgId" name="groupID" value="${partyOrg.id}"/>
												</c:if>
												
												<label class="col-sm-2 control-label">组织名称:</label>
												<div class="col-sm-10">
													<p id="orgName" class="form-control-static">${partyOrg.name}</p>
												</div>
												
												<label class="col-sm-2 control-label">组织路径:</label>
												<div class="col-sm-10">
													<p id="pathName" class="form-control-static">${partyOrg.pathName}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div id="tab-3" class="tab-pane">
								<div class="panel-body">
									<div class="wrapper wrapper-content animated fadeInRight col-sm-12">
										<div class="row">
											<div class="col-sm-3 panel-left panel-form">
												<div class="pos-tree-toolbar">
													<a class="btn btn-primary fa fa-refresh" title="刷新"></a> <a
														class="btn btn-primary fa fa-expand" title="展开"></a> <a
														class="btn btn-primary fa fa-compress" title="收缩"></a>
												</div>
												<div class="zTreeDemoBackground left">
													<ul id="posTree" class="ztree"
														style="border: 1px solid #617775; overflow-y: scroll; height: 100%;"></ul>
												</div>
											</div>
											
											<div class="col-sm-1 panel-center">
												<div>
													<a class="btn btn-primary fa fa-angle-double-right"
														href="javascript:partyEmployee.addRow2Grid('posTree');"><span>分配</span></a>
													<a class="btn btn-primary fa fa-angle-double-left"
														href="javascript:partyEmployee.clearGrid('posTree');"><span>清空</span></a>
												</div>
											</div>
											
											<div class="col-sm-8 panel-right">
												<div class="jqGrid_wrapper">
													<table id="posItemGrid"></table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div id="tab-4" class="tab-pane">
								<div class="panel-body">
									<div class="wrapper wrapper-content animated fadeInRight col-sm-12">
										<div class="row">
											<div class="col-sm-3 panel-left panel-form">
												<div class="role-tree-toolbar">
													<a class="btn btn-primary fa fa-refresh" title="刷新"></a> <a
														class="btn btn-primary fa fa-expand" title="展开"></a> <a
														class="btn btn-primary fa fa-compress" title="收缩"></a>
												</div>
												<div class="zTreeDemoBackground left">
													<ul id="roleTree" class="ztree"
														style="border: 1px solid #617775; overflow-y: scroll; height: 100%;"></ul>
												</div>
											</div>
											
											<div class="col-sm-1 panel-center">
												<div>
													<a class="btn btn-primary fa fa-angle-double-right"
														href="javascript:partyEmployee.addRow2Grid('roleTree');"><span>分配</span></a>
													<a class="btn btn-primary fa fa-angle-double-left"
														href="javascript:partyEmployee.clearGrid('roleTree');"><span>清空</span></a>
												</div>
											</div>
											
											<div class="col-sm-8 panel-right">
												<div class="jqGrid_wrapper">
													<table id="roleItemGrid"></table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div id="tab-5" class="tab-pane">
								<div class="panel-body">
									<div class="wrapper wrapper-content animated fadeInRight col-sm-12">
										<div class="row">
											<div class="toolbar-box">
												<div class="toolbar-head clearfix">
													<!-- 顶部按钮 -->
													<div class="buttons">
														<a class="btn btn-primary fa fa-add" href="javascript:partyEmployee.addUserGroup();"><span>添加</span></a>
														<a class="btn btn-primary fa fa-transh-o" href="javascript:partyEmployee.clearUserGroup();"><span>清空</span></a>
													</div>
												</div>
											</div>
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
			</form>
		</div>
	</body>
</html>