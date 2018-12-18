<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<f:link href="select2/select2.min.css"/>
<f:link href="select2/select2-bootstrap.min.css" />
<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/formPrintTemplateRange.js"></script>
<title>打印模版范围</title>
</head>
<body>

	<div class="wrapper wrapper-content  col-sm-12">
		<div class="panel-form">
			<form class="form-horizontal" id="formPrintTemplateRange" method="post">
				<input type="hidden"  id="templateId" value="${templateId }"/>
				<div class="form-group">
					<label class="col-sm-2 control-label">打印使用模版范围<span
						class="required">*</span>:
					</label>
					<div class="col-sm-10">
          					<select id="range"  name="range" class="form-control"   multiple="multiple" >
	                   				<option value="dataTemplate" <c:if test="${fn:contains(range,'dataTemplate')}"> selected="selected"</c:if>>业务数据模版</option>
	                   				<option value="flow" <c:if test="${fn:contains(range,'flow')}"> selected="selected"</c:if>>流程</option>
							</select>
                          <span class="help-block m-b-none">如果未选择范围，则默认没有权限选择模版。</span>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>