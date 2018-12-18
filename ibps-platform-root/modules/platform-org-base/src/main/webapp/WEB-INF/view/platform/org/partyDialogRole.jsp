<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.lc.ibps.base.web.controller.*,com.lc.ibps.base.web.context.ContextUtil"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<%@include file="/commons/page/tree.jsp" %>
<script type="text/javascript">
var subSystemId = '${subSystemId}';
</script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyDialogRole.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
</head>
<body>
	<div class="panel">
		<div>
			<div name="role_container" class="selector-container">
			</div>
		</div>
		
		<div class="tabs-container tabs-x">
			<ul class="nav nav-tabs">
				<li class="active">
					<a data-toggle="tab" href="#tab-1" data-iframe="true" aria-expanded="false">角色</a>
				</li>
				<li class="">
					<a data-toggle="tab" href="#tab-2" data-iframe="true" aria-expanded="false">我的角色</a>
				</li>
			</ul>
			
			<div class="tab-content">
				<div id="tab-1" class="tab-pane active">
					<div class="panel-body p-t-0">
						<div class="wrapper wrapper-content animated fadeInRight">
							<div class="row">
								<div  class="toolbar-panel ">
									<div class="toolbar-box">
										<div class="toolbar-head clearfix">
											<!-- 顶部按钮 -->
											<div class="buttons"> 		
												<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
											</div>
											<!-- 收缩 -->
											<div class="tools">
												<a href="javascript:void(0);" class="collapse">
													<i class="bigger-180 fa  fa-angle-double-up"></i>
												</a>
											</div>
										</div>
										<!-- #查询条件-->
										<div class="toolbar-body" >
											<form role="form" class="search-form">
												<div  class="form-inline p-xxs">
													<div class="form-group">
														<label class="search-label">系统</label>: 
														<select name="Q^system_id_^S" class="form-control">
															<option value="1">全局角色</option>
													     	<c:forEach var="Subsystem" items="${subSystemList}">
																<option value="${Subsystem.id}">${Subsystem.name}</option>
															</c:forEach>
														</select>
													</div>
													<div class="form-group">
														<label class="search-label">角色名</label>: <input type="text"
															id="fullname" name="Q^name_^SL" class="form-control" />
													</div>
												</div>
											</form>
										</div><!--/ 查询条件-->
									</div>
								</div><!--/ 操作、查询-->
								<div class="jqGrid_wrapper">
									<table id="partyDialogRoleGrid" ></table>
									<div id="partyDialogRolePager"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div id="tab-2" class="tab-pane">
					<div class="panel-body">
						<div class="wrapper wrapper-content animated fadeInRight">
							<div class="row">
								<table id="tbl_myself" border="0" width="100%">
									<c:forEach items="${roleList}" var="role">
										<tr align="center">
											<td><input type="checkbox" value="${role.id},${role.name },${role.roleAlias}"/></td>
											<td width="32%"><span>${role.name }</span></td>
											<td width="32%"><span>${role.roleAlias }</span></td>
											<td width="32%"><span>${role.subSystemName }</span></td>
										</tr>
									</c:forEach>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>