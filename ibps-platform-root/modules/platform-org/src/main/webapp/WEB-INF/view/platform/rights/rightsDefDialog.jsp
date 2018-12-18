<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript">
			var entityId = "${entityId}";
			var entityType = "${entityType}";
		</script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/rights/rightsDef.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PositionDialog.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content">
			<form id="rightsDefForm" action="save.htm">
				<textarea id="rightsDefJson" style="display: none;" name="rightsDefJson">${fn:escapeXml(rightsDefJson)}</textarea>
				<table id="rightsDefTable" class="table table-bordered table-striped">
					<thead>
						<tr>
							<th style="text-align: center;width: 25%;">权限分类</th>
							<th style="text-align: center;width: 50%;">授权给</th>
							<th style="text-align: center; width: 25%;">操作</th>
						</tr>
					</thead>
					<c:forEach items="${rightsTypeList}" var="rightsType">
							<c:choose>
								<c:when test="${rightsType.key =='all' }">
									<tr >
											<td colspan="3">
													<label><input id="selectAll" type="checkbox"  class="ibps"  rightsType="${rightsType.key }"/><span class="lbl">允许所有人访问</span></label>
											</td>
									</tr>
								</c:when>
								<c:when test="${rightsType.key =='none' }"></c:when>
								<c:otherwise>
									<tr  id="${rightsType.key}Tr" class="rightsTr">
										<th>${rightsType.label} 授权</th>
										<td>
											<div class="rights-div" name="rightsShow"></div> 
											<textare  style="display: none;" name="rightsId"></textarea>
											<textarea style="display: none;" name="rightsName"></textarea>
											<input 	type="hidden" name="type" value="${rightsType.key}">
										</td>
										<td><a  class="btn btn-info fa fa-search-plus rightsSelect" >选择</a>
												<a  class="btn btn-danger fa fa-undo  rightsReset">重置</a>
										</td>
									</tr>
								</c:otherwise>
							</c:choose>
					</c:forEach>
				</table>
			</form>
		</div>
	</body>
</html>