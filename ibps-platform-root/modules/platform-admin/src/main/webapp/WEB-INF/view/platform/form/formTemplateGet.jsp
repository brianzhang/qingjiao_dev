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
						<label class="col-sm-2 control-label">模板名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formTemplate.name}</p>
						</div>
						<label class="col-sm-2 control-label">模版别名:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formTemplate.alias}</p>
						</div>
						<label class="col-sm-2 control-label">模版描述:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formTemplate.desc}</p>
						</div>
						<label class="col-sm-2 control-label">模板分类:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formTemplate.typeId}</p>
						</div>
						<label class="col-sm-2 control-label">样式:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formTemplate.style}</p>
						</div>
						<label class="col-sm-2 control-label">模版内容:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formTemplate.content}</p>
						</div>
						<label class="col-sm-2 control-label">创建人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formTemplate.createBy}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${formTemplate.createTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">更新人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${formTemplate.updateBy}</p>
						</div>
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${formTemplate.updateTime}" /></p>		
						</div>
					</div>
			</div>
		</div>
	</body>
</html>