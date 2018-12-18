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
						<label class="col-sm-2 control-label">对象名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.name}</p>
						</div>
						<label class="col-sm-2 control-label">对象编码:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.code}</p>
						</div>
						<label class="col-sm-2 control-label">对象描述:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.desc}</p>
						</div>
						<label class="col-sm-2 control-label">数据格式:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.dataFormat}</p>
						</div>
						<label class="col-sm-2 control-label">版本号:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.version}</p>
						</div>
						<label class="col-sm-2 control-label">是否主版本:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.isMain}</p>
						</div>
						<label class="col-sm-2 control-label">是否主对象:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.isMaster}</p>
						</div>
						<label class="col-sm-2 control-label">是否创建表:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.isCreateTable}</p>
						</div>
						<label class="col-sm-2 control-label">状态:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.status}</p>
						</div>
						<label class="col-sm-2 control-label">创建人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${boDef.createBy}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${boDef.createTime}" /></p>		
						</div>
					</div>
			</div>
		</div>
	</body>
</html>