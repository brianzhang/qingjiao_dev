<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript">
			var id = '${id}';
		</script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyOrgDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyPositionOrgInfo.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<c:choose>
								<c:when test="${not empty partyOrg}">
									<a class="btn btn-primary fa fa-trash-o" href="javascript:void(0);" ><span>清除组织</span></a>
								</c:when>
							</c:choose>
							<a class="btn btn-primary fa fa-add" href="javascript:void(0);" ><span>指定组织</span></a>
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		
			<c:choose>
				<c:when test="${empty partyOrg}">
					<div class="alert alert-warning m-t-sm"  >
						尚未指定组织</div>
				</c:when>
				<c:otherwise>
					<div class="panel-form col-sm-12">
						<div class="form-horizontal "  >
							<label class="col-sm-2 control-label">组织名称:</label>
							<div class="col-sm-10">
								<p class="form-control-static">${partyOrg.name}</p>
							</div>
							<label class="col-sm-2 control-label">等级:</label>
							<div class="col-sm-10">
								<p class="form-control-static">${level.name}</p>
							</div>
							
							<label class="col-sm-2 control-label">状态:</label>
							<div class="col-sm-10">
								<p class="form-control-static">
									<c:choose>
										<c:when test="${partyOrg.status eq 'actived'}">激活</c:when>
										<c:when test="${partyOrg.status eq 'locked'}">锁定</c:when>
										<c:when test="${partyOrg.status eq 'deleted'}">已删除</c:when>  
									</c:choose>
								</p>
							</div>
						</div>
					</div>
				</c:otherwise>
			</c:choose>
		</div>
	</body>
</html>