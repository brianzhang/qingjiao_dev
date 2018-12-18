<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<%@include file="/commons/page/tree.jsp"%>
<script type="text/javascript">
	var orgId = '${orgId}';
	var tree = '${tree}';
</script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/org/partyDialogAttr.js"></script>
</head>
<body>
	<div class="panel">

		<div class="tab-content">
			<div class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-body">
						<form>
							<table style="margin: 10px;">
								<c:forEach var="partyAttr" items="${partyAttrs}">
									<tr style="height: 55px;">
										<td><label class="search-label">${partyAttr.name}</label>:</td>
										<td>
											<c:choose>
												<c:when test="${partyAttr.dataType eq 'OPTION'}">
													<c:choose>
														<c:when test="${partyAttr.isMulti == 89}">
															<!-- 多选 -->
															<c:forEach items="${partyAttr.options}" var="keyValue">
																<label class="control-label"> 
															    <input type="checkbox" name="QA^${partyAttr.key}" value="${keyValue.value}" class="ibps" 
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
																<input type="radio" name="QA^${partyAttr.key}" value="${keyValue.value}" class="ibps" 
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
													<input type="text" id="attributeValue.dateVal" name="QA^${partyAttr.key}" 
														value="${partyAttr.values[0].value}" validate="{date:true}" class="form-control date" />
												</c:when>
												<c:when test="${partyAttr.dataType eq 'DOUBLE'}">
													<!-- 浮点 -->
													<input type="text" name="QA^${partyAttr.key}" value="${partyAttr.values[0].value}" class="form-control" validate="{number:true}" />
												</c:when>
												<c:when test="${partyAttr.dataType eq 'INT'}">
													<!-- 整型 -->
													<input type="text" name="QA^${partyAttr.key}" value="${partyAttr.values[0].value}" class="form-control" validate="{digits:true}" />
												</c:when>
												<c:when test="${partyAttr.dataType eq 'BOOLEAN'}">
													<!-- 布尔（字符串） -->
													<label class="radio-inline"> 
													<input type="radio" name="QA^${partyAttr.key}" value="Y" class="ibps" 
														<c:forEach items="${partyAttr.values}" var="value">
													    	<c:if test="${'Y' == value.value }">checked='checked'</c:if>
													    </c:forEach>
													>
													<span class="lbl">是</span>
													</label>
													<label class="radio-inline"> 
													<input type="radio" name="QA^${partyAttr.key}" value="N" class="ibps" 
														<c:forEach items="${partyAttr.values}" var="value">
													    	<c:if test="${'N' == value.value }">checked='checked'</c:if>
													    </c:forEach>
													>
													<span class="lbl">否</span>
													</label>
												</c:when>
												<c:when test="${partyAttr.dataType eq 'STRING'}">
													<!-- 字符串 -->
													<input type="text" name="QA^${partyAttr.key}" value="${partyAttr.values[0].value}" class="form-control" validate="{}" />
												</c:when>
											</c:choose>
										</td>
									</tr>
								</c:forEach>
								
							</table>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>