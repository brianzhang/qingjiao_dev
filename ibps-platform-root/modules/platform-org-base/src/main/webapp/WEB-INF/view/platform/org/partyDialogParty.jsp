<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.lc.ibps.base.web.controller.*,com.lc.ibps.base.web.context.ContextUtil"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<%@include file="/commons/page/tree.jsp" %>
<script type="text/javascript">
var orgId = '${orgId}';
</script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyDialogParty.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
</head>
<body>
	<div class="panel">
		<div>
			<div name="party_container" class="selector-container">
			</div>
		</div>
		
		<div>
			<select id="party" class="form-control" >
				<option value="org" selected="selected">组织</option>
				<option value="position" >岗位</option>
			</select>
		</div>
							
		<div class="tabs-container tabs-x">
			<ul class="nav nav-tabs">
				<li class="active">
					<a data-toggle="tab" href="#tab-1" data-iframe="true" aria-expanded="false">组织</a>
				</li>
				<li class="">
					<a data-toggle="tab" href="#tab-2" data-iframe="true" aria-expanded="false">我的组织</a>
				</li>
			</ul>
			
			<div class="tab-content">
				<div id="tab-1" class="tab-pane active">
					<div class="panel-body">
						<div class="wrapper wrapper-content">
							<div class="tree-toolbar" style="height: 45px;">
								 <a class="btn btn-primary fa fa-refresh" title="刷新"></a>
								 <a class="btn btn-primary fa fa-expand" title="展开"></a>
								 <a class="btn btn-primary fa fa-compress" title="收缩"></a>
								 <label>
								 	<input type="text" id="qPartyName" class="form-control input-s-sm"/>
								 </label>
								 <div class="btn btn-primary fa fa-find" title="搜索">搜索</div>
							</div>
							<div id="partyTree" class="ztree"></div>
						</div>
					</div>
				</div>
				<div id="tab-2" class="tab-pane">
					<div class="panel-body">
						<div class="wrapper wrapper-content animated fadeInRight">
							<div class="row">
								<table id="tbl_org" border="0" width="100%">
									<tr align="center" name="org">
										<td><input name="myself" type="checkbox" value="${org.id},${ org.name },${ org.orgAlias }"/></td>
										<td width="32%"><span>${org.name }</span></td>
										<td width="32%"><span>${org.orgAlias }</span></td>
										<td width="32%"><span>${org.pathName }</span></td>
									</tr>
								</table>
								<table id="tbl_position" border="0" width="100%">
									<c:forEach items="${posList }" var="pos">
										<tr align="center" name="position">
											<td><input name="myself" type="checkbox" value="${pos.id},${pos.name },${pos.posAlias }"/></td>
											<td width="32%"><span>${pos.name }</span></td>
											<td width="32%"><span>${pos.posAlias }</span></td>
											<td width="32%"><span>${pos.orgName }</span></td>
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