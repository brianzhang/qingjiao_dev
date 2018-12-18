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
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12">
					<div class="form-horizontal "  >
						<label class="col-sm-2 control-label">表单key:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.formKey}</p>
						</div>
						<label class="col-sm-2 control-label">名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.name}</p>
						</div>
						<label class="col-sm-2 control-label">是否需要分页:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.needPage}</p>
						</div>
						<label class="col-sm-2 control-label">分页大小:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.pageSize}</p>
						</div>
						<label class="col-sm-2 control-label">是否初始查询:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.initQuery}</p>
						</div>
						<label class="col-sm-2 control-label">是否默认过滤:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.defaultFilter}</p>
						</div>
						<label class="col-sm-2 control-label">显示字段:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.displayField}</p>
						</div>
						<label class="col-sm-2 control-label">排序字段:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.sortField}</p>
						</div>
						<label class="col-sm-2 control-label">查询字段:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.queryField}</p>
						</div>
						<label class="col-sm-2 control-label">条件过滤:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.conditionFilter}</p>
						</div>
						<label class="col-sm-2 control-label">功能按钮:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.functionButton}</p>
						</div>
						<label class="col-sm-2 control-label">导出字段:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.exportField}</p>
						</div>
						<label class="col-sm-2 control-label">创建人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.createBy}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${formDataTemplate.createTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">更新人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formDataTemplate.updateBy}</p>
						</div>
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${formDataTemplate.updateTime}" /></p>		
						</div>
					</div>
			</div>
		</div>
	</body>
</html>