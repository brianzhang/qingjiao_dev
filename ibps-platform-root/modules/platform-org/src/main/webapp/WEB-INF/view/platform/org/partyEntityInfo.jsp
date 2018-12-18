<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyEntit.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
<title>${isGrade}</title>
</head>
<body>


	<c:choose>
		<c:when test="${groupId == '' || groupId == '0' }">
			<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="alert alert-warning m-t-sm"  >
				尚未指定一个组</div>
				
			</div>
		</c:when>
		<c:otherwise>
			<div class="panel">
				<div class="tabs-container tabs-x">
					<ul class="nav nav-tabs">
		     			<c:if test="${isGrade && partyEntit.hasUser == 89}">  
						<li class="active"><a  data-toggle="tab" href="#tab-1"   data-iframe="true"  data-url="${ctx}/platform/org/partyEntit/userList.htm?isGrade=true&id=${groupId}"
							aria-expanded="false">用户组人员</a></li>
						</c:if>
						<c:if test="${!isGrade && partyEntit.hasUser== 89}">  
						<li class="active"><a  data-toggle="tab" href="#tab-1"   data-iframe="true"  data-url="${ctx}/platform/org/partyEntit/userList.htm?id=${groupId}"
							aria-expanded="false">用户组人员</a></li>
						</c:if>
						<li class=""><a  data-toggle="tab" href="#tab-2"   data-iframe="true"  data-url="${ctx}/platform/org/partyEntit/get.htm?id=${groupId}"
							aria-expanded="true">参与组明细</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-3"   data-iframe="true"  data-url="${ctx}/platform/org/group/attrManager.htm?groupId=${groupId}"
							aria-expanded="true">扩展属性</a></li>
						<c:if test="${partyType.typeKey eq 'org' && !isGrade}">
						<li class=""><a  data-toggle="tab" href="#tab-4"   data-iframe="true"  data-url="${ctx}/platform/org/group/roleAssignList.htm?groupId=${groupId}"
							aria-expanded="true">已分配角色</a></li>
						</c:if>
						<c:if test="${partyType.gradeAuth == 89 }">
						<li class=""><a data-toggle="tab" href="#tab-6"   data-iframe="true"  data-url="${ctx}/platform/org/groupAuth/list.htm?groupId=${groupId}"
							aria-expanded="true">组织分级管理</a></li>
						</c:if>
					</ul>
					<div class="tab-content">
		     			<c:if test="${isGrade && partyEntit.hasUser == 89}">  
						<div id="tab-1" class="tab-pane active" >
						</div>
						</c:if>
		    			<c:if test="${!isGrade && partyEntit.hasUser == 89}"> 
		    			<div id="tab-1" class="tab-pane active" >
		    			</div>
		    			</c:if>
		    			<div id="tab-2" class="tab-pane " >
		    			</div>
		    			<div id="tab-3" class="tab-pane " >
						</div>
		    			<c:if test="${partyType.typeKey eq 'org' && !isGrade}">
		    			<div id="tab-4" class="tab-pane " ></div>
		    			</c:if>
		    			<div id="tab-5" class="tab-pane " ></div>
		    			<c:if test="${partyType.gradeAuth == 89 }">
		    			<div id="tab-6" class="tab-pane " ></div>
		    			</c:if>
					</div>
				</div>
			</div>
		</c:otherwise>
	</c:choose>
</body>
</html>