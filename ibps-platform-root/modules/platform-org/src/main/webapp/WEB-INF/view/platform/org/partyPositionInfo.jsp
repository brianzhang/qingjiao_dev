<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<%@include file="/commons/page/qtip.jsp" %>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
<title>${isGrade}</title>
</head>
<body>
	<c:choose>
		<c:when test="${id == '' || id == '0' }">
			<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="alert alert-warning m-t-sm"  >
				尚未指定一个岗位</div>
			</div>
		</c:when>
		<c:otherwise>
			<div class="panel">
				<div class="tabs-container tabs-x">
					<ul class="nav nav-tabs">
						<li class="active"><a  data-toggle="tab" href="#tab-1"   data-iframe="true"  
							data-url="${ctx}/platform/org/partyPosition/get.htm?id=${id}"
							aria-expanded="false">岗位明细</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-1-1"   data-iframe="true"  
							data-url="${ctx}/platform/org/partyPosition/orgInfo.htm?id=${id}"
							aria-expanded="true">归属组织</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-2"   data-iframe="true"  
							data-url="${ctx}/platform/org/partyPosition/userList.htm?id=${id}"
							aria-expanded="true">岗位人员</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-3"   data-iframe="true"  
							data-url="${ctx}/platform/org/partyEntity/attrEdit.htm?entityId=${id}&partyType=position"
							aria-expanded="true">扩展属性</a></li>
						<li class=""><a  data-toggle="tab" href="#tab-4"   data-iframe="true"  
							data-url="${ctx}/platform/org/partyPosition/roleList.htm?id=${id}"
							aria-expanded="true">已分配角色<i class="fa fa-help red" data-tip title="岗位继承归属组织的角色不可删除"></i></a></li>
					</ul>
					<div class="tab-content">
						<div id="tab-1" class="tab-pane active" ></div>
						<div id="tab-1-1" class="tab-pane " ></div>
		    			<div id="tab-2" class="tab-pane " ></div>
		    			<div id="tab-3" class="tab-pane " ></div>
		    			<div id="tab-4" class="tab-pane " ></div>
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