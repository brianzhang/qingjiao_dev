<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/IconDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyEntity.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="info.htm?id=${partyEntity.id}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="partyEntityForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${partyEntity.name}"  validate="{required:true,maxlength:64}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">描述:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="desc" name="desc" value="${partyEntity.desc}"  validate="{required:false,maxlength:512}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">参与者类型<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                	<input type="hidden" id="typeId" name="typeId" value="${partyType.id}"/>
							    	<input type="hidden" id="typeName" name="typeName" value="${partyType.alias}"/>
							  		<p class="form-control-static"> ${partyType.name}</p>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <label class="col-sm-4 control-label">参与者等级Key:</label>
                                <div class="col-sm-8">
                                	<select class="form-control search-select" name="levelKey" validate="{required:false,maxIntLen:10}">
										<c:forEach var="rankType" items="${partyLevelList}">
											<option value="${rankType.levelKey}"
												<c:if test="${partyEntity.levelKey eq rankType.levelKey}">selected="selected"</c:if>>${rankType.name}</option>
										</c:forEach> 
									</select>
                                </div>
                            </div>
                             <div class="form-group col-sm-6">
                                <label class="col-sm-4 control-label">参与者等级:</label>
                                <div class="col-sm-8">
                                	<select class="form-control search-select" name="level" validate="{required:false,number:true,maxIntLen:10}">
										<c:forEach var="rankType" items="${partyLevelList}">
											<option value="${rankType.level}"
												<c:if test="${partyEntity.level eq rankType.level}">selected="selected"</c:if>>${rankType.level}</option>
										</c:forEach> 
									</select>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">是否有用户<span class="required">*</span>:</label>
                                <div class="col-sm-10">
	                                <label class="radio-inline "> <input type="radio" class="ibps" value="Y" name="hasUser"
										<c:if test="${empty partyEntity || partyEntity.hasUser==89}">checked="checked"</c:if>><span class="lbl">是</span>
									</label> 
									<label class="radio-inline "> <input type="radio" class="ibps" value="N" name="hasUser"
										<c:if test="${partyEntity.hasUser==78}">checked="checked"</c:if>><span class="lbl">否</span>
									</label>
                                </div>
                            </div>
						<%-- 	<div class="form-group">
                                <label class="col-sm-2 control-label">图片:</label>
                                <div class="col-sm-10">
                                	<input type="hidden" id="profile" name="profile" value="${partyEntit.profile}"/> 
										<i id="logoIcon" class="fa ${partyEntit.profile}"></i>
										 <a class="btn btn-info fa fa-search-plus" id="selectIcon" href="javascript:void(0);">选择</a>
                                </div>
                            </div> --%>
							
							<div class="form-group">
                                <label class="col-sm-2 control-label">状态:</label>
                                <div class="col-sm-10">
									<select class="form-control search-select" id="status" name="status" validate="{required:true,maxlength:120}">
										<c:forEach items="${statuses}" var="status">
											<option value="${status.value}"
												<c:if test="${partyEntity.status eq status.value}">selected="selected"</c:if>>${status.label}</option>
										</c:forEach> 
								</select>
                                </div>
                            </div>
						<input type="hidden" name="id" value="${partyEntity.id}" />
						<input type="hidden" name="path" value="${partyEntity.path}" /> 
						<input type="hidden" name="parentId" value="${parentId}" /> 
						<input type="hidden" name="depth" value="${partyEntity.depth}" /> 
					</form>
				</div>
		</div>
	</body>
</html>