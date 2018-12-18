<%@page language="java" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>表单授权</title>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
<f:link href="lc/form/formRights.css"  isCommon="false"/>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/formRights.js"></script>
</head>
<body>
	<div class="panel">
		<table cellpadding="1" cellspacing="1" class="table table-bordered table-condensed table-hover table-striped" name="tableContainer"  id="tablePermission">
				<thead >
					<tr >
						<th width="15%" >字段</th>
						<th width="20%" >只读权限</th>
						<th width="20%" >编辑权限</th>
						<th width="20%">必填权限</th>
					</tr>
					<tr>
						<td colspan="1" class="text-center" >
							<div class="text-center inline-block">
								<div class="pull-left "  >
									<input type="radio" value="hide" name="fields" id="fieldHide" >
									<label for="fieldHide"  class="btn label-sm">隐藏</label>
								</div>
								<div class="pull-left" >
									<input type="radio" value="read" name="fields" id="fieldRead"  >
									<label for="fieldRead" class="btn label-sm">只读</label>
								</div>
								<div class="pull-left" >
									<input type="radio" value="edit" name="fields" id="fieldEdit"  >
									<label for="fieldEdit" class="btn label-sm">编辑</label>
								</div>
								<div class="pull-left" >
									<input type="radio" value="required" name="fields" id="fieldRequired"  >
									<label for="fieldRequired" class="btn label-sm">必填</label>
								</div>
							</div>
						</td>
						<td colspan="1" class="text-left">
							<div class="allRadio">
								<input type="radio" value="all" name="read" id="readFieldAll" class="general-rights"/>
								<label for="readFieldAll" class="btn label-sm">所有人</label>
							</div>
							<div class="noneRadio">
								<input type="radio" value="none" name="read" id="readFieldNone" class="general-rights"/>
								<label for="readFieldNone" class="btn label-sm">无</label>
							</div>
							<div class="editRadio">
								<input type="radio" value="edit" name="read" id="readFieldEdit" class="general-rights" />
								<label for="readFieldEdit"  class="btn label-sm">编辑</label>
							</div>
						</td>
						<td colspan="1" class="text-left" >
							<div class="allRadio">
								<input type="radio" value="all" name="edit" id="editFieldAll" class="general-rights"/>
								<label for="editFieldAll" class="btn label-sm">所有人</label>
							</div>
							<div class="noneRadio">
								<input type="radio" value="none" name="edit" id="editFieldNone" class="general-rights"/>
								<label for="editFieldNone" class="btn label-sm">无</label>
							</div>
							<div class="editRadio">
								<input type="radio" value="edit" name="edit" id="editFieldEdit" class="general-rights"/>
								<label for="editFieldEdit"  class="btn label-sm">编辑</label>
							</div>	
						</td>
						<td colspan="1" class="text-left">
							<div class="allRadio">
								<input type="radio" value="all" name="required" id="requiredFieldAll" class="general-rights"/>
								<label for="requiredFieldAll" class="btn label-sm">所有人</label>
							</div>
							<div class="noneRadio">
								<input type="radio" value="none" name="required" id="requiredFieldNone" class="general-rights"/>
								<label for="requiredFieldNone" class="btn label-sm">无</label>
							</div>
							<div class="editRadio">
								<input type="radio" value="edit" name="required" id="requiredFieldEdit"  class="general-rights"/>
								<label for="requiredFieldEdit"  class="btn label-sm">编辑</label>
							</div>
						</td>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
	</body>
</html>

