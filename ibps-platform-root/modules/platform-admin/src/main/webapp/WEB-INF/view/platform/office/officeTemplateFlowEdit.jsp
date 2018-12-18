

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/office/officeTemplate.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-form">
				<form class="form-horizontal" id="officeTemplateForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">模板名:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="name" name="m:officeTemplate:name" value="${officeTemplate.name}"  validate="{required:false,maxlength:384}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">plain：普通模板，red：套红模板:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="type" name="m:officeTemplate:type" value="${officeTemplate.type}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">模板路径:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="path" name="m:officeTemplate:path" value="${officeTemplate.path}"  validate="{required:false,maxlength:765}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">创建人:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="createBy" name="m:officeTemplate:createBy" value="${officeTemplate.createBy}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">修改人:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="updateBy" name="m:officeTemplate:updateBy" value="${officeTemplate.updateBy}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">创建时间:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="createTime" name="m:officeTemplate:createTime" value="${officeTemplate.createTime}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">修改时间:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="updateTime" name="m:officeTemplate:updateTime" value="${officeTemplate.updateTime}"  validate="{required:false}"/>
	                        </div>
	                    </div>
	                    <input type="hidden" name="m:officeTemplate:id" value="${officeTemplate.id}" />
					</div>
					
				</form>
			</div>
		</div>
	</body>
</html>