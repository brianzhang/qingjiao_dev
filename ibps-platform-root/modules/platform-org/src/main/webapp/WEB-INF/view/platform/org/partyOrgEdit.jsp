<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%-- <%@include file="/commons/include/get.jsp" %> --%>
		<%@include file="/commons/include/get.require.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="info.htm?id=${partyOrg.id}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="partyOrgForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">机构名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${partyOrg.name}" data-pinyin="#orgAlias"   validate="{required:true,maxlength:64}"/>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="col-sm-2 control-label">机构别名<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" <c:if test="${not empty partyOrg && not empty partyOrg.orgAlias}">readonly</c:if> id="orgAlias" name="orgAlias" value="${partyOrg.orgAlias}"  validate="{required:true,maxlength:64}"/>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="col-sm-2 control-label">机构等级<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                	<select class="form-control" name="levelID" validate="{required:true,maxlength:64}">
										<c:forEach items="${levelList}" var="levelRank">
											<option value="${levelRank.id}"
												<c:if test="${partyOrg.levelID eq levelRank.id}">selected="selected"</c:if>>${levelRank.name}</option>
										</c:forEach> 
									</select>
                                </div>
                            </div>
                            
							<div class="form-group">
                                <label class="col-sm-2 control-label">机构状态<span class="required">*</span>:</label>
                                <div class="col-sm-10">
									<select class="form-control" id="status" name="status" validate="{required:true,maxlength:120}">
										<c:forEach items="${statuses}" var="status">
											<option value="${status.value}"
												<c:if test="${partyOrg.status eq status.value}">selected="selected"</c:if>>${status.label}</option>
										</c:forEach> 
								</select>
                                </div>
                            </div>
						<input type="hidden" name="id" value="${partyOrg.id}" />
						<input type="hidden" name="partyEntityPo.parentId" value="${parentId}" />
						<input type="hidden" name="createTime" value="<fmt:formatDate value='${partyOrg.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/>" /> 
					</form>
				</div>
		</div>
		
		<%-- <script type="text/javascript" src="${ctx}/js/plugins/require/require.min.js" data-main="${ctx }/js/lc/platform/org/partyOrg.edit.require.config"></script> --%>
		<script type="text/javascript" src="${ctx }/js/lc/platform/org/partyOrg.edit.require.config.js"></script>
		
		<%--
		<script type="text/javascript" src="${ctx }/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx }/js/lc/platform/org/partyOrg.js"></script>
		--%>
	</body>
</html>