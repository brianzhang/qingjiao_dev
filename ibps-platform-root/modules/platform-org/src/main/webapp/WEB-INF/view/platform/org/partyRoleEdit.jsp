<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript"
			src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/PartyRole.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
		<script type="text/javascript">
			var roleId = '${partyRole.id}';	
		</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<div class="tabs-container tabs-x">
							<ul class="nav nav-tabs">
								<li class="active">
									<a data-toggle="tab" href="#tab-1" data-iframe="true" aria-expanded="false">基本信息</a>
								</li>
								<c:if test="${not empty partyRole && not empty partyRole.id}">
								<li class="">
									<a data-toggle="tab" href="#tab-2" data-iframe="true" aria-expanded="false">人员列表</a>
								</li>
								</c:if>
							</ul>	
					</div>
					<div class="tab-content">
						<div id="tab-1" class="tab-pane active">
							<div class="panel-body">
							<div class="wrapper wrapper-content col-sm-12">
							<form class="form-horizontal" id="partyRoleForm"  action="save.htm"   method="post"  >
								<div class="form-group">
	                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
	                                <div class="col-sm-10">
	                                    <input type="text" class="form-control"  id="name" name="name" value="${partyRole.name}" data-pinyin="#roleAlias"  validate="{required:true,maxlength:192}"/>
	                                </div>
                                </div>
								<div class="form-group">
	                                <label class="col-sm-2 control-label">角色别名<span class="required">*</span>:</label>
	                                <div class="col-sm-10">
	                                    <input type="text" class="form-control" <c:if test="${not empty partyRole}">readonly</c:if> id="roleAlias" name="roleAlias" value="${partyRole.roleAlias}"  validate="{required:true,maxlength:192}"/>
	                                </div>
	                            </div>
								<div class="form-group">
	                                <label class="col-sm-2 control-label">子系统选择:</label>
	                                <div class="col-sm-10">
	                                	<select class="form-control"  name="subSystemId">
									     	<c:forEach var="Subsystem" items="${subSystemList}">
											<option value="${Subsystem.id}" <c:if test="${Subsystem.id eq roleSystem.systemId}">selected="selected" </c:if>>${Subsystem.name}</option>
											</c:forEach>
										</select>
	                                </div>
	                            </div>
	
	                            <div class="form-group">
	                                <label class="col-sm-2 control-label">描述:</label>
	                                <div class="col-sm-10">
	                                    <input type="text" class="form-control"  id="roleNote" name="roleNote" value="${partyRole.roleNote}"  validate="{required:false,maxlength:765}"/>
	                                </div>
	                            </div>
								<input type="hidden" name="id" value="${partyRole.id}" />
							</form>
						</div>
						</div>
						</div>
						<div id="tab-2" class="tab-pane jqGrid_wrapper">
							<table id="partyRoleUserGrid" ></table>
							<div id="partyRoleUserPager"></div>
						</div>
				</div>
		</div>
	</body>
</html>