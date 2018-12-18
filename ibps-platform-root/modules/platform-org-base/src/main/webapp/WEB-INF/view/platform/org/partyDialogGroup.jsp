<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.lc.ibps.base.web.controller.*,com.lc.ibps.base.web.context.ContextUtil"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyDialogGroup.js"></script>
<%-- <script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script> --%>
</head>
<body>
	<div class="panel">
		<div>
			<div name="group_container" class="selector-container">
			</div>
		</div>
		
		<div class="panel-body">
			<div class="wrapper wrapper-content animated fadeInRight">
				<div class="row">
					<table border="1" width="100%">
						<tr>
							<td>
								<div class="toolbar-panel ">
									<div class="toolbar-box">
										<div class="toolbar-head clearfix">
											<!-- 顶部按钮 -->
											<div class="buttons">
												<a class="btn btn-primary fa fa-search" href="javascript:void(0);"><span>搜索</span></a>
											</div>
											<!-- 收缩 -->
											<div class="tools">
												<a href="javascript:void(0);" class="collapse"> <i class="bigger-180 fa  fa-angle-double-up"></i></a>
											</div>
										</div>
										<!-- #查询条件-->
										<div class="toolbar-body">
											<form role="form" class="search-form">
												<div class="form-inline p-xxs">
													<div class="form-group">
														<label class="search-label">名称</label>: 
														<input type="text" name="Q^NAME_^SL" class="form-control" />
													</div>
													<div class="form-group">
														<label class="search-label">别名</label>: 
														<input type="text" name="Q^GROUP_ALIAS_^SL" class="form-control" />
													</div>
												</div>
											</form>
										</div>
										<!--/ 查询条件-->
									</div>
								</div>
							</td>
						</tr>
						<tr width="100%">
							<td valign="top">
								<div class="jqGrid_wrapper">
									<table id="partyDialogGroupGrid" ></table>
									<div id="partyDialogGroupPager"></div>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		
		<%-- <div class="tabs-container tabs-x">
			<ul class="nav nav-tabs">
				<li class="active">
					<a data-toggle="tab" href="#tab-1" data-iframe="true" aria-expanded="false">成员</a>
				</li>
				<li class="">
					<a data-toggle="tab" href="#tab-2" data-iframe="true" aria-expanded="false">我</a>
				</li>
			</ul>
			
			<div class="tab-content">
				<div id="tab-1" class="tab-pane active">
					<div class="panel-body">
						<div class="wrapper wrapper-content animated fadeInRight">
							<div class="row">
								<table border="1" width="100%">
									<tr width="100%">
										<td valign="top">
											<div class="jqGrid_wrapper">
												<table id="partyDialogGroupGrid" ></table>
												<div id="partyDialogGroupPager"></div>
											</div>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div id="tab-2" class="tab-pane">
					<div class="panel-body">
						<div class="wrapper wrapper-content animated fadeInRight">
							<div class="row">
								<table id="tbl_myself" border="0" width="100%">
									<tr align="center">
										<td><input id="myself" type="checkbox"/></td>
										<td width="48%"><span><%= ContextUtil.getCurrentUser().getFullname() %></span></td>
										<td width="48%"><span><%= ContextUtil.getCurrentUser().getAccount() %></span></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> --%>
	</div>
</body>
</html>