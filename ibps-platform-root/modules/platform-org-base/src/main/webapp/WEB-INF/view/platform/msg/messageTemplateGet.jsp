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
						<label class="col-sm-2 control-label">模版名称:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.name}</p>
						</div>
						<label class="col-sm-2 control-label">模版业务键:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.key}</p>
						</div>
						<label class="col-sm-2 control-label">模板分类。可以按任务操作类型分类，也可以按其它方式分类。:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.typeKey}</p>
						</div>
						<label class="col-sm-2 control-label">模板二级分类。:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.subTypeKey}</p>
						</div>
						<label class="col-sm-2 control-label">是否默认模板。对于同一组（模板分类+二级分类）下的多个模板其中默认的一个。:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.isDefault}</p>
						</div>
						<label class="col-sm-2 control-label">标题:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.subject}</p>
						</div>
						<label class="col-sm-2 control-label">纯文本:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.plain}</p>
						</div>
						<label class="col-sm-2 control-label">模版体HTML:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.html}</p>
						</div>
						<label class="col-sm-2 control-label">创建人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.createBy}</p>
						</div>
						<label class="col-sm-2 control-label">创建时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${messageTemplate.createTime}" /></p>		
						</div>
						<label class="col-sm-2 control-label">创建者所属组织ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.createOrgId}</p>
						</div>
						<label class="col-sm-2 control-label">更新人ID:</label>
						<div class="col-sm-10">
							<p class="form-control-static">${messageTemplate.updateBy}</p>
						</div>
						<label class="col-sm-2 control-label">更新时间:</label>
						<div class="col-sm-10">
							<p class="form-control-static"><fmt:formatDate value="${messageTemplate.updateTime}" /></p>		
						</div>
					</div>
			</div>
		</div>
	</body>
</html>