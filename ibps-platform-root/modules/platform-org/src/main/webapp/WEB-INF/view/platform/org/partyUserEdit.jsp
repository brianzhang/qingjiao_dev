<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/grid.jsp"%>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp"%>
		<script type="text/javascript">
			var userId = '${partyUser.id}';
			var isGrade = '${isGrade}';
			var orgId = '${orgId}';
		</script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyUser.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/UploadDialog.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${returnUrl }" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<form class="form-horizontal" id="partyUserForm"  action="save.htm"   method="post"  >
				<div class="panel">
					<div class="tabs-container tabs-x">
						<ul class="nav nav-tabs">
							<li class="active">
								<a data-toggle="tab" href="#tab-1" data-iframe="true" aria-expanded="false">基本资料</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-2" data-iframe="true" aria-expanded="true">组织信息</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-3" data-iframe="true" aria-expanded="true">岗位信息</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-4" data-iframe="true" aria-expanded="true">角色信息</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-5" data-iframe="true" aria-expanded="true">其他参与者类型</a>
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
													<img id="personPic" style="height: 380px; width: 250px"
														src="${ctx}/${pictureLoad}" alt="个人相片" />
												</p>
											</div>
										</div>
										<div class="col-sm-9 animated fadeInRight">
											<div class="panel-form col-sm-12">
												<form class="form-horizontal" id="userBaseForm" action="save.htm" method="post">
													<div class="form-group">
								                                <label class="col-sm-2 control-label">账号<span class="required">*</span>:</label>
								                                <div class="col-sm-10">
								                                    <input type="text" class="form-control"  id="account" name="account" value="${partyUser.account}"  validate="{required:true,maxlength:192}"/>
								                                </div>
								                            </div>
															<div class="form-group">
								                                <label class="col-sm-2 control-label">密码<span class="required">*</span>:</label>
								                                <div class="col-sm-10">
								                                    <input type="password" class="form-control"  id="password" name="password" value="${partyUser.password}"  validate="{required:true,maxlength:384}"/>
								                                </div>
								                            </div>
															<div class="form-group">
								                                <label class="col-sm-2 control-label">用户状态<span class="required">*</span>:</label>
								                                <div class="col-sm-10">
																	<select class="form-control" id="status" name="status" validate="{required:true,maxlength:120}">
																		<c:forEach items="${statuses}" var="status">
																			<option value="${status.value}"
																				<c:if test="${partyUser.status eq status.value}">selected="selected"</c:if>>${status.label}</option>
																		</c:forEach> 
																</select>
								                                </div>
								                            </div>
															<div class="form-group">
								                                <label class="col-sm-2 control-label">是否管理员<span class="required">*</span>:</label>
								                                <div class="col-sm-10">
								                                 	<label class="radio-inline "> <input type="radio" class="ibps" value="Y" name="hasUser"
																		<c:if test="${partyUser.isSuper==89}">checked="checked"</c:if>><span class="lbl">是</span>
																	</label> 
																	<label class="radio-inline "> <input type="radio" class="ibps" value="N" name="hasUser"
																		<c:if test="${empty partyUser || partyUser.isSuper==78}">checked="checked"</c:if>><span class="lbl">否</span>
																	</label>
								                                </div>
								                            </div>
								                            
								                            <div class="form-group">
																<label class="col-sm-2 control-label">性别: </label>
																<div class="col-sm-10">
																	<label class="radio-inline "> <input type="radio"
																		value="male" name="sex" class="ibps"
																		<c:if test="${empty user || user.sex=='male'}">checked="checked"</c:if>><span
																		class="lbl">男</span></label> <label class="radio-inline ">
																		<input type="radio" value="female" name="sex"
																		class="ibps"
																		<c:if test="${user.sex=='female'}">checked="checked"</c:if>><span
																		class="lbl">女</span>
																	</label>
																</div>
															</div>
															
															<div class="form-group">
								                                <label class="col-sm-2 control-label">邮箱:</label>
								                                <div class="col-sm-10">
								                                    <input type="text" class="form-control"  id="email" name="email" value="${partyUser.email}"  validate="{required:true,maxlength:192,email:true}"/>
								                                </div>
								                            </div>
															<div class="form-group">
								                                <label class="col-sm-2 control-label">地址:</label>
								                                <div class="col-sm-10">
								                                    <input type="text" class="form-control"  id="address" name="address" value="${partyUser.address}"  validate="{required:false,maxlength:765}"/>
								                                </div>
								                            </div>
															<div class="form-group">
								                                <label class="col-sm-2 control-label">电话:</label>
								                                <div class="col-sm-10">
								                                    <input type="text" class="form-control"  id="mobile" name="mobile" value="${partyUser.mobile}"  validate="{required:false,maxlength:765}"/>
								                                </div>
								                            </div>
															<div class="form-group">
								                                <label class="col-sm-2 control-label">QQ:</label>
								                                <div class="col-sm-10">
								                                    <input type="text" class="form-control"  id="qq" name="qq" value="${partyUser.qq}"  validate="{QQ:true,required:false,maxlength:60}"/>
								                                </div>
								                            </div>
													<input type="hidden" name="id" value="${partyUser.id}" />
													<inputtype="hidden" id="photo" name="photo" value="${partyUser.photo}" />
													<input type="hidden" name="createTime" value="<fmt:formatDate value='${partyUser.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/>"/>
												</form>
											</div>
										</div>
									</div>
								</div>
								</div>
							</div>
							<div id="tab-2" class="tab-pane ">
								<div class="row">
									<div class="col-sm-3 panel-left">
										<div class="org-tree-toolbar">
											<a class="btn btn-primary fa fa-refresh" title="刷新"></a>
											<a class="btn btn-primary fa fa-expand" title="展开"></a>
											<a class="btn btn-primary fa fa-compress" title="收缩"></a>
										</div>
										<div class="zTreeDemoBackground left">
											<ul id="orgTree" class="ztree"  overflow-y: scroll; height: 100%;"></ul>
										</div>
									</div>
									<div class="relationSelect col-sm-1 panel-center" style="margin-top: 10%;">
										<div>
											<a class="btn btn-primary fa fa-angle-double-right" href="javascript:btnAddRow('orgTree',0,'属于','many2many');"><span >属于</span></a>
										</div>
									</div>
									<div class="jqGrid_wrapper col-sm-8">
										<table id="orgItemGrid"></table>
									</div>
								</div>
							</div>
							
							<div id="tab-3" class="tab-pane ">
								
							</div>
							
							<div id="tab-4" class="tab-pane ">
								<div class="row">
									<div class="col-sm-3 panel-left">
										<div class="role-tree-toolbar">
											<a class="btn btn-primary fa fa-refresh" title="刷新"></a>
											<a class="btn btn-primary fa fa-expand" title="展开"></a>
											<a class="btn btn-primary fa fa-compress" title="收缩"></a>
										</div>
										<div class="zTreeDemoBackground left">
											<ul id="roleTree" class="ztree"  overflow-y: scroll; height: 100%;"></ul>
										</div>
									</div>
									<div class="relationSelect col-sm-1 panel-center" style="margin-top: 10%;">
										<div>
											<a class="btn btn-primary fa fa-angle-double-right" href="javascript:btnAddRow('roleTree',0,'属于','many2many');"><span >属于</span></a>
										</div>
									</div>
									<div class="jqGrid_wrapper col-sm-8">
										<table id="roleItemGrid"></table>
									</div>
								</div>
							</div>
							
							<div id="tab-5" class="tab-pane ">
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</body>
</html>