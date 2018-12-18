<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/system/codeTemplate.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>保存</span></a>
				<a href="list.htm" class="btn btn-primary fa fa-back"><span>返回</span></a>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="codeTemplateForm" action="save.htm"
				method="post">
				<div class="form-group">
					<label class="col-sm-2 control-label">模板名称:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="templateName"
							name="templateName" value="${codeTemplate.templateName}"
							validate="{required:false,maxlength:600}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">模板:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="html" name="html"
							value="${codeTemplate.html}" validate="{required:false}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">模版备注:</label>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="memo" name="memo"
							value="${codeTemplate.memo}"
							validate="{required:false,maxlength:600}" />
					</div>
					<label class="col-sm-2 control-label">模板别名:</label>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="templateAlias"
							name="templateAlias" value="${codeTemplate.templateAlias}"
							validate="{required:false,maxlength:600}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-2 control-label">模板类型:</label>
					<div class="col-sm-4">
						<select name="templateType" id="templateType" class="form-control">
							<option value="1">系统模版</option>
							<option value="0">自定义模版</option>
						</select>
					</div>
					<label class="col-sm-2 control-label">子表需要生成的模版:</label>
					<div class="col-sm-4">
						<select name="issubneed" id="issubneed" class="form-control">
							<option value="1">是</option>
							<option value="0">否</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">生成文件名称:</label>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="filename"
							name="filename" value="${codeTemplate.filename}"
							validate="{required:false,maxlength:600}" />
					</div>
					<label class="col-sm-2 control-label">文件路径:</label>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="filedir"
							name="filedir" value="${codeTemplate.filedir}"
							validate="{required:false,maxlength:600}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">表单编辑标识:</label>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="formedit"
							name="formedit" value="${codeTemplate.formedit}"
							validate="{required:false,number:true,maxIntLen:10}" />
					</div>
					<label class="col-sm-2 control-label">表单明细标识:</label>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="formdetail"
							name="formdetail" value="${codeTemplate.formdetail}"
							validate="{required:false,number:true,maxIntLen:10}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">子表生成文件:</label>
					<div class="col-sm-4">
						<select name="sub" id="sub" class="form-control">
							<option value="1">是</option>
							<option value="0">否</option>
						</select>
					</div>
					<label class="col-sm-2 control-label">是否覆盖原有文件:</label>
					<div class="col-sm-4">
						<select name="override" id="override" class="form-control">
							<option value="1">是</option>
							<option value="0">否</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">是否添加:</label>
					<div class="col-sm-4">
						<select name="append" id="append" class="form-control">
							<option value="true">是</option>
							<option value="false">否</option>
						</select>
					</div>
					<label class="col-sm-2 control-label">是否模板路径下的:</label>
					<div class="col-sm-4">
						<select name="module" id="module" class="form-control">
							<option value="true">是</option>
							<option value="false">否</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">插入标识:</label>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="insertTag"
							name="insertTag" value="${codeTemplate.insertTag}"
							validate="{required:false,maxlength:60}" />
					</div>
					<label class="col-sm-2 control-label">开始标识:</label>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="startTag"
							name="startTag" value="${codeTemplate.startTag}"
							validate="{required:false,maxlength:60}" />
					</div>
					<label class="col-sm-2 control-label">结束标识:</label>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="endTag" name="endTag"
							value="${codeTemplate.endTag}"
							validate="{required:false,maxlength:60}" />
					</div>
				</div>
				<input type="hidden" name="id" value="${codeTemplate.id}" />
			</form>
		</div>
	</div>
</body>
</html>