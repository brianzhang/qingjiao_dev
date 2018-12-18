<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript">
		var orgId = "${orgId}";
		var tree = '${tree}';
		var mainOrgrade = '${mainOrgrade}';
		var self = '${self}';
		var prem = '${prem}';
		</script>
		<script type="text/javascript"
			src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyPosition.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<c:if test="${self}">
						<a href="${ctx }/platform/org/partyPosition/info.htm?id=${orgId}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</c:if>
					<c:if test="${mainOrgrade == 'main'}">
						<a href="${ctx }/platform/org/partyOrg/info.htm?groupId=${orgId}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</c:if>
					<c:if test="${tree && mainOrgrade == 'grade'}">
						<a href="${ctx }/platform/org/partyOrg/gradeInfo.htm?id=${orgId}&prem=${prem}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</c:if>
					<c:if test="${!tree && mainOrgrade == 'grade'}">
						<a href="${ctx }/platform/org/partyOrg/gradePositionList.htm?groupId=${orgId}&prem=${prem}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</c:if>
				</div>
			</div>
			<div class="panel-form">
				<form class="form-horizontal" id="partyPositionForm"  action="save.htm"   method="post"  >
					<div class="form-group">
                        <label class="col-sm-2 control-label">岗位名称<span class="required">*</span>:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control"  id="name" name="name" value="${partyPosition.name}" data-pinyin="#posAlias"  validate="{required:true,maxlength:192}"/>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-sm-2 control-label">岗位别名<span class="required">*</span>:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" <c:if test="${not empty partyPosition && not empty partyPosition.posAlias}">readonly</c:if> id="posAlias" name="posAlias" value="${partyPosition.posAlias}"  validate="{required:true,maxlength:64}"/>
                        </div>
                    </div>
                    
					<div class="form-group">
                         <label class="col-sm-2 control-label">岗位等级<span class="required">*</span>:</label>
                         <div class="col-sm-10">
                         	<select class="form-control" name="levelID" validate="{required:true,maxlength:64}">
								<c:forEach items="${levelList}" var="levelRank">
									<option value="${levelRank.id}"
										<c:if test="${partyPosition.levelID eq levelRank.id}">selected="selected"</c:if>>${levelRank.name}</option>
								</c:forEach> 
							</select>
                         </div>
                    </div>
					
					<div class="form-group">
                        <label class="col-sm-2 control-label">岗位说明:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control"  id="desc" name="desc" value="${partyPosition.desc}"  validate="{required:false}"/>
                        </div>
                    </div>
							
					<input type="hidden" name="id" value="${partyPosition.id}" />
					<c:if test="${not empty orgId && orgId != ''}">
						<input type="hidden" name="orgID" value="${orgId}" />
					</c:if>
					<c:if test="${empty orgId && orgId == ''}">
						<input type="hidden" name="orgID" value="${partyPosition.orgID}" />
					</c:if>
					<input type="hidden" name="partyEntityPo.parentId" value="${parentId}" />
					<input type="hidden" name="createTime" value="<fmt:formatDate value='${partyPosition.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/>" /> 
				</form>
			</div>
		</div>
	</body>
</html>