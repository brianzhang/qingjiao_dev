<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyLevel.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="partyLevelForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">参与者类型:</label>
                                <div class="col-sm-10">
                                	<select class="form-control"  id="type" name="type" validate="{required:true,maxlength:120}">
                                		<c:forEach items="${types}" var="type">
											<option value="${type.value}"
												<c:if test="${empty partyLevel.type||partyLevel.type eq type.value}">selected="selected"</c:if>>${type.label}</option>
										</c:forEach> 
									</select>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="name" name="name" value="${partyLevel.name}"  validate="{required:true,maxlength:255}"/>
                                </div>
                            </div>
                          
							<div class="form-group">
                                <label class="col-sm-2 control-label">级别数值<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="level" name="level" value="${partyLevel.level}"  validate="{required:true,number:true,maxIntLen:10}"/>
                                </div>
                            </div>
                        <input type="hidden" name="createTime" value="<fmt:formatDate value='${partyLevel.createTime}' pattern='yyyy-MM-dd'/>" />
						<input type="hidden" name="id" value="${partyLevel.id}" />
					</form>
				</div>
		</div>
	</body>
</html>