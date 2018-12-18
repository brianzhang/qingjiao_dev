<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="#" onclick="window.back()" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
						<label class="col-sm-2 control-label">模板名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${codeTemplate.templateName}</p>
						</div>
						<label class="col-sm-2 control-label">模板:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${codeTemplate.html}</p>
						</div>
						<label class="col-sm-2 control-label">模版备注:</label>
						<div class="col-sm-4">
							<p class="form-control-static">${codeTemplate.memo}</p>
						</div>
						<label class="col-sm-2 control-label">模板别名:</label>
						<div class="col-sm-4">
							<p class="form-control-static">${codeTemplate.templateAlias}</p>
						</div>
						<label class="col-sm-2 control-label">模板类型:</label>
						<div class="col-sm-4">
							<p class="form-control-static">
							<c:if test="${codeTemplate.templateType=='1'}">系统模板</c:if>
							<c:if test="${codeTemplate.templateType!='1'}">自定义模板</c:if>							</p>
						</div>
						<label class="col-sm-2 control-label">子表文件:</label>
						<div class="col-sm-4">
							<p class="form-control-static">${codeTemplate.issubneed}</p>
						</div>
						<label class="col-sm-2 control-label">生成文件名称:</label>
						<div class="col-sm-4">
							<p class="form-control-static">${codeTemplate.filename}</p>
						</div>
						<label class="col-sm-2 control-label">文件路径:</label>
						<div class="col-sm-4">
							<p class="form-control-static">${codeTemplate.filedir}</p>
						</div>
						<label class="col-sm-2 control-label">表单编辑标识:</label>
						<div class="col-sm-4">
							<p class="form-control-static">${codeTemplate.formedit}</p>
						</div>
						<label class="col-sm-2 control-label">表单明细标识:</label>
						<div class="col-sm-4">
							<p class="form-control-static">${codeTemplate.formdetail}</p>
						</div>
						<label class="col-sm-2 control-label">子表生成文件:</label>
						<div class="col-sm-4">
							<p class="form-control-static">
							<c:if test="${codeTemplate.sub=='1'}">是</c:if>
							<c:if test="${codeTemplate.sub!='1'}">否</c:if>
							</p>
						</div>
						<label class="col-sm-2 control-label">是否覆盖原有文件:</label>
						<div class="col-sm-4">
							<p class="form-control-static">
							<c:if test="${codeTemplate.override=='1'}">是</c:if>
							<c:if test="${codeTemplate.override!='1'}">否</c:if>
							</p>
						</div>
						<label class="col-sm-2 control-label">是否添加:</label>
						<div class="col-sm-4">
							<p class="form-control-static">
							<c:if test="${codeTemplate.append=='true'}">是</c:if>
							<c:if test="${codeTemplate.append!='true'}">否</c:if>
							</p>
						</div>
						<label class="col-sm-2 control-label">是否模板路径下的:</label>
						<div class="col-sm-4">
							<p class="form-control-static">
							<c:if test="${codeTemplate.module=='true'}">是</c:if>
							<c:if test="${codeTemplate.module!='true'}">否</c:if></p>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>