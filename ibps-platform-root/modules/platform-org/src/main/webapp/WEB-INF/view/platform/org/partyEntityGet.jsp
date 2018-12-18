<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
						<label class="col-sm-2 control-label">名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyEntit.name}</p>
						</div>
						<label class="col-sm-2 control-label">描述:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyEntit.desc}</p>
						</div>
						<label class="col-sm-2 control-label">参与者类型 :</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyType.name}</p>
						</div>
						<label class="col-sm-2 control-label">是否有用户:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${partyEntit.hasUser=='89'}">有</c:when>
									<c:when test="${partyEntit.hasUser=='78'}">无</c:when>
								</c:choose>
							</p>
						</div>
					
						<%-- <label class="col-sm-2 control-label">图片:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyEntit.profile}</p>
						</div> --%>
						<label class="col-sm-2 control-label">参与者等级:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyEntit.level}</p>
						</div>
						<label class="col-sm-2 control-label">状态:</label>
						<div class="col-sm-10">
							<p class="form-control-static">
								<c:choose>
									<c:when test="${partyEntit.status eq 'actived'}">激活</c:when>
									<c:when test="${partyEntit.status eq 'locked'}">锁定</c:when>
									<c:when test=""></c:when>  
								</c:choose>
							</p>
						</div>
						<label class="col-sm-2 control-label">创建者:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyEntit.createBy}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyEntit.createTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">更新者:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${partyEntit.updateBy}</p>
						</div>
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${partyEntit.updateTime}" /></p>		
						</div>
					</div>
			</div>
		</div>
	</body>
</html>