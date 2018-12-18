

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/office/officeControl.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-form">
				<form class="form-horizontal" id="officeControlForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">文件名:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="fileName" name="m:officeControl:fileName" value="${officeControl.fileName}"  validate="{required:false,maxlength:384}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">文件拓展名:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="ext" name="m:officeControl:ext" value="${officeControl.ext}"  validate="{required:false,maxlength:60}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">文件大小:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="totalBytes" name="m:officeControl:totalBytes" value="${officeControl.totalBytes}"  validate="{required:false,number:true,maxIntLen:10}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">文件路径:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="filePath" name="m:officeControl:filePath" value="${officeControl.filePath}"  validate="{required:false,maxlength:765}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">创建人:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="createBy" name="m:officeControl:createBy" value="${officeControl.createBy}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">修改人:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="updateBy" name="m:officeControl:updateBy" value="${officeControl.updateBy}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">创建时间:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="createTime" name="m:officeControl:createTime" value="${officeControl.createTime}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">修改时间:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="updateTime" name="m:officeControl:updateTime" value="${officeControl.updateTime}"  validate="{required:false}"/>
	                        </div>
	                    </div>
	                    <input type="hidden" name="m:officeControl:id" value="${officeControl.id}" />
					</div>
					
				</form>
			</div>
		</div>
	</body>
</html>