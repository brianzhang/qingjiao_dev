<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<f:link href="bootstrap/bootstrap-multiselect.min.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-multiselect.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/rights/rightsConfig.js"></script>
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
					<form class="form-horizontal" id="rightsConfigForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${rightsConfig.name}"  data-pinyin="#key"   validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">业务主键<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="key" name="key" value="${rightsConfig.key}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">实体表名<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="entityType" name="entityType" value="${rightsConfig.entityType}"  validate="{required:true,maxlength:120}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">实体ID的KEY:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="entityIdKey" name="entityIdKey" value="${rightsConfig.entityIdKey}"  validate="{required:false,maxlength:120}"/>
                                	  <span class="help-block m-b-none">如果不填写，则默认<label class="red">ID_</label>。</span>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">拥有权限:</label>
                                <div class="col-sm-10">
                                <select id="ownRightsSelect"  name="ownRights"  multiple="multiple">
                                	<c:forEach items="${rightsTypeList}" var="rightsType">
                                			<option value="${rightsType.key}"  <c:if test="${fn:contains(rightsConfig.ownRights,rightsType.key)}"> selected="selected"</c:if>>${rightsType.label }</option>
                                	</c:forEach>
									</select>
                               		 <span class="help-block m-b-none">如果未选择，则默认拥有所有的权限:。</span>
                                </div>
                            </div>
					<input type="hidden" name="id" value="${rightsConfig.id}" />
					</form>
				</div>
		</div>
	</body>
</html>