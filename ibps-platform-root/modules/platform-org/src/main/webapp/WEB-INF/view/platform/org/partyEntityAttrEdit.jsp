<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript">
		var entityId = "${entityId}";
		var partyType = "${partyType}";
		var retUrl = "${returnUrl}";
		</script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyEntityAttr.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-transh-o" ><span>清空</span></a>
				</div>
			</div>
			<form class="form-horizontal" id="partyEntityAttrForm"  action="addAttr.htm"   method="post"  >
				<div type="attrData" id="attrItem" class="panel-form col-sm-12">
					<div class="form-group  col-sm-6">
					<label class="col-sm-12 control-label">属性名称
					</label>
					</div>
					<div class="form-group col-sm-6">
						<label class="col-sm-4 control-label">属性值
						</label>
					</div>
					
					<c:forEach var="partyAttr" items="${partyAttrs}">
						<div type="attrItem">
							<div class="form-group  col-sm-6">
								<label class="col-sm-12 control-label">${partyAttr.name}:
								</label>
							</div>
							<div class="form-group col-sm-6">
								<div class="col-sm-12">
									<c:choose>
										<c:when test="${partyAttr.dataType eq 'OPTION'}">
											<c:choose>
												<c:when test="${partyAttr.isMulti == 89}">
													<!-- 多选 -->
													<c:forEach items="${partyAttr.options}" var="keyValue">
														<label class="control-label"> 
													    <input type="checkbox" name="${partyAttr.key}" value="${keyValue.value}" class="ibps" 
														    <c:forEach items="${partyAttr.values}" var="value">
														    	<c:if test="${keyValue.value == value.value }">checked='checked'</c:if>
														    </c:forEach>
													    >
													    <span class="lbl">${keyValue.groupName}</span>
														</label>
													</c:forEach>
												</c:when>
												<c:otherwise>
													<!-- 单选 -->
													<c:forEach items="${partyAttr.options}" var="keyValue">
														<label class="radio-inline"> 
														<input type="radio" name="${partyAttr.key}" value="${keyValue.value}" class="ibps" 
															<c:forEach items="${partyAttr.values}" var="value">
														    	<c:if test="${keyValue.value == value.value }">checked='checked'</c:if>
														    </c:forEach>
														>
														<span class="lbl">${keyValue.groupName}</span>
														</label>
													</c:forEach>
												</c:otherwise>
											</c:choose>
										</c:when>
										<c:when test="${partyAttr.dataType eq 'DATE'}">
											<!-- 日期-->
											<input type="text" id="attributeValue.dateVal" name="${partyAttr.key}" 
												value="${partyAttr.values[0].value}" validate="{date:true}" class="form-control date" />
										</c:when>
										<c:when test="${partyAttr.dataType eq 'DOUBLE'}">
											<!-- 浮点 -->
											<input type="text" name="${partyAttr.key}" value="${partyAttr.values[0].value}" class="form-control" validate="{number:true}" />
										</c:when>
										<c:when test="${partyAttr.dataType eq 'INT'}">
											<!-- 整型 -->
											<input type="text" name="${partyAttr.key}" value="${partyAttr.values[0].value}" class="form-control" validate="{digits:true}" />
										</c:when>
										<c:when test="${partyAttr.dataType eq 'BOOLEAN'}">
											<!-- 布尔（字符串） -->
											<label class="radio-inline"> 
											<input type="radio" name="${partyAttr.key}" value="Y" class="ibps" 
												<c:forEach items="${partyAttr.values}" var="value">
											    	<c:if test="${'Y' == value.value }">checked='checked'</c:if>
											    </c:forEach>
											>
											<span class="lbl">是</span>
											</label>
											<label class="radio-inline"> 
											<input type="radio" name="${partyAttr.key}" value="N" class="ibps" 
												<c:forEach items="${partyAttr.values}" var="value">
											    	<c:if test="${'N' == value.value }">checked='checked'</c:if>
											    </c:forEach>
											>
											<span class="lbl">否</span>
											</label>
										</c:when>
										<c:when test="${partyAttr.dataType eq 'STRING'}">
											<!-- 字符串 -->
											<input type="text" name="${partyAttr.key}" value="${partyAttr.values[0].value}" class="form-control" validate="{}" />
										</c:when>
									</c:choose>
								</div>
							</div>
							<input type="hidden" name="attrId" value="${partyAttr.id}" />
						</div>
					</c:forEach>
				</div>
			</form>
		</div>
	</body>
</html>