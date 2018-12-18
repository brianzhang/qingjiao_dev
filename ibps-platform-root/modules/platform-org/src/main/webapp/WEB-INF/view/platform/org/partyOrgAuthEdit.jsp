<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript">
	var orgId = '${groupId}';
	var tree = '${tree}';
	var mainOrgrade = '${mainOrgrade}';
	var groupName = '${org.name}';
	var prem = '${prem}';
</script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bo/BoDefDialog.js"></script>

<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyOrgAuth.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>保存</span></a>
				<c:if test="${!tree}">
					<a href="#" class="btn btn-primary fa fa-back" onclick="javascript:history.back(-1);"><span>返回</span></a>
				</c:if>
				<c:if test="${tree && mainOrgrade == 'main'}">
					<a href="${ctx }/platform/org/partyOrg/info.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</c:if>
				<c:if test="${tree && mainOrgrade == 'grade'}">
					<a href="${ctx }/platform/org/partyOrg/gradeInfo.htm?id=${groupId}&prem=${prem}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</c:if>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="partyOrgAuthForm" action="save.htm"
				method="post">
				<div class="form-group">
					<label class="col-sm-4 control-label">分级管理员用户<span
						class="required">*</span>:
					</label>
					<div class="col-sm-8">
						<div class="row col-sm-10">
							<div class="input-group ">
								<input type="hidden" name="managerID"  id="managerID" value="${partyOrgAuth.managerID}"/> 
                               	<input type="text" class="form-control"  id="managerName" name="managerName" value="${partyOrgAuth.managerName}" readonly="readonly"/>
                           	  	<span class="input-group-btn">
                           	  		<button type="button" class="btn  btn-info btn-mm"  
                           	  			 data-toggle="selector"  data-type="user" data-single="true"  data-id="#managerID" data-name="#managerName" >
                           	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
                           	  		<button type="button" class="btn btn-info btn-mm" 
		                               	 data-toggle="clear" data-id="#managerID" data-name="#managerName">
		                               	 <i class="fa fa-times"></i></button>
                           	  	</span>
                            </div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label">被授权的组织:</label>
					<div class="col-sm-8">
						<label class="control-label">${org.name}</label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label">本层级组织操作授权项:</label>
					<div class="col-sm-8">
						<label class="checkbox-inline">
							<input class="ibps" type="checkbox" name="orgPerms" value="add"
							<c:if test="${fn:contains(partyOrgAuth.orgPerms, 'add')}">checked="checked"</c:if>><span class="lbl">增加</span></label>
						<label class="checkbox-inline">
							<input class="ibps" type="checkbox" name="orgPerms" value="delete"
							<c:if test="${fn:contains(partyOrgAuth.orgPerms, 'delete')}">checked="checked"</c:if>><span class="lbl">删除</span></label>
						<label class="checkbox-inline">
							<input class="ibps" type="checkbox" name="orgPerms" value="edit"
							<c:if test="${fn:contains(partyOrgAuth.orgPerms, 'edit')}">checked="checked"</c:if>><span class="lbl">修改</span></label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label">其子级组织操作授权项:</label>
					<div class="col-sm-8">
						<label class=" checkbox-inline">
							<input class="ibps" type="checkbox" name="userPerms" value="add" 
							<c:if test="${fn:contains(partyOrgAuth.userPerms, 'add')}">checked="checked" </c:if>><span class="lbl">增加</span></label>
						<label class="checkbox-inline">
							<input class="ibps" type="checkbox" name="userPerms" value="delete"
							<c:if test="${fn:contains(partyOrgAuth.userPerms, 'delete')}">checked="checked" </c:if>><span class="lbl">删除</span></label>
						<label class=" checkbox-inline">
							<input class="ibps" type="checkbox" name="userPerms" value="edit"
							<c:if test="${fn:contains(partyOrgAuth.userPerms, 'edit')}">checked="checked" </c:if>><span class="lbl">修改</span></label>
					</div>
				</div>
				<input type="hidden" id="orgID" name="orgID" value="${ groupId}" />
				<input type="hidden" name="id" value="${partyOrgAuth.id}" />
				<input type="hidden" name="createTime" value="<fmt:formatDate value='${partyOrgAuth.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/>" />
			</form>
		</div>
	</div>
</body>
</html>