<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<%@include file="/commons/include/list.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/system/codeTemplateDetail.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>生成</span></a>
				<a href="downLoadZip.htm" class="btn btn-primary fa fa-down"><span>下载</span></a>
			</div>
		</div>
		<div class="panel-form">
			<form class="form-horizontal" id="codegenForm" action="codegen.htm"
				method="post">
				<input type="hidden" id="ids"
							name="ids"  />
				<div class="form-group">
					<label class="col-sm-1 control-label">开发者:</label>
					<div class="col-sm-3">
						<input type="text" class="form-control"
							name="developer" value="" placeholder="请填写开发者  张三"
							validate="{required:true,maxlength:128}" />
					</div>
					<label class="col-sm-1 control-label">邮箱:</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="email"
							name="email" value="" placeholder="请填写邮箱地址 "
							validate="{required:false,maxlength:600}" />
					</div>
					<label class="col-sm-1 control-label">公司:</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="company"
							name="company" value="" placeholder="广州流辰信息技术有限公司版权所有"
							validate="{required:true,maxlength:128}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-1 control-label">前端系统:</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="system"
							name="system" value="" placeholder="前端系统   platform"
							validate="{required:true,maxlength:128}" />
					</div>
					<label class="col-sm-1 control-label">后端模块:</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="module"
							name="module" value="" placeholder="归属模块   common"
							validate="{required:false,maxlength:600}" />
					</div>
					<label class="col-sm-1 control-label">模块包:</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="module"
							name="group" value="" placeholder="ibps-common-biz"
							validate="{required:false,maxlength:600}" />
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-4">
						<div class="jqGrid_wrapper">
							<table id="codeTemplateGrid"></table>
							<div id="codeTemplatePager"></div>
						</div>
					</div>
					<div class="col-sm-8" title="代码信息">
						<table id="tableVarSet" cellpadding="1"
							class="table-grid table-list" cellspacing="1">
							<tr>
								<th>自定义表名</th>
								<th>包名(package)</th>
								<th>类名(class)</th>
							</tr>
							<tr type="append">
								<td><input type="text" id="tableName" name="tableName"
									 class="inputText"  validate="{required:true}"/></td>
								<td><input type="text" class="inputText" id="packageName"
									name="packageName" value=""
									validate="{required:true,maxlength:128}" /></td>
								<td><input type="text" class="inputText" id="className"
									name="className" value="" validate="{required:true}" /></td>
							</tr>
						</table>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>