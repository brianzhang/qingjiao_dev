<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
<title>${isGrade}</title>
</head>
<body>
	<c:choose>
		<c:when test="${id == '' || id == '0' }">
			<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="alert alert-warning m-t-sm"  >
				尚未指定一个组织</div>
			</div>
		</c:when>
		<c:otherwise>
			<div class="panel">
				<div class="tabs-container tabs-x">
					<ul class="nav nav-tabs">
						<li class="active"><a  data-toggle="tab" href="#tab-1" data-iframe="true"  
							data-url="${ctx}/platform/org/partyOrg/get.htm?id=${id}"
							aria-expanded="true">组织明细</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-1-1" data-iframe="true"  
							data-url="${ctx}/platform/org/partyOrg/managerList.htm?orgId=${id}"
							aria-expanded="true">组织负责人</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-2" data-iframe="true"  
							data-url="${ctx}/platform/org/partyOrg/gradePositionList.htm?groupId=${id}&prem=${prem}"
							aria-expanded="false">行政岗位</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-3" data-iframe="true"  
							data-url="${ctx}/platform/org/partyOrg/gradeUserList.htm?orgId=${id}&prem=${prem}"
							aria-expanded="false">组织人员</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-4" data-iframe="true"  
							data-url="${ctx}/platform/org/partyEntity/attrEdit.htm?entityId=${id}&partyType=org"
							aria-expanded="true">扩展属性</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-5" data-iframe="true"  
							data-url="${ctx}/platform/org/partyOrg/gradeRoleList.htm?groupId=${id}&prem=${prem}"
							aria-expanded="true">已分配角色</a></li>
						<li class=""><a data-toggle="tab" href="#tab-7" data-iframe="true"  
							data-url="${ctx}/platform/org/partyOrgAuth/list.htm?mainOrgrade=grade&groupId=${id}&prem=${prem}"
							aria-expanded="true">组织分级管理</a></li>
					</ul>
					<div class="tab-content">
						<div id="tab-1" class="tab-pane active" ></div>
		    			<div id="tab-1-1" class="tab-pane " ></div>
		    			<div id="tab-2" class="tab-pane " ></div>
		    			<div id="tab-3" class="tab-pane " ></div>
		    			<div id="tab-4" class="tab-pane " ></div>
		    			<div id="tab-5" class="tab-pane " ></div>
		    			<div id="tab-6" class="tab-pane " ></div>
		    			<div id="tab-7" class="tab-pane " ></div>
					</div>
				</div>
			</div>
		</c:otherwise>
	</c:choose>
	<script type="text/javascript">
		setTimeout(function(){
	    	DialogUtil.closeAll();
	    },500);
	</script>
</body>
</html>