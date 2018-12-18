<%@page language="java" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>数据模版-导出字段</title>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/plugins/doT/doT.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
<f:link href="lc/form/formDataTemplateDataExport.css"  isCommon="false"/>
<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateExportColumn.js"></script>
</head>
<body>
<div class="wrapper wrapper-content   col-sm-12">
	<div class="panel">
	<form >
		<div class="form-group">
		<div class="group">
            <label class="col-sm-2 control-label">导出时选择字段:</label>
            <div class="col-sm-4">
                <label class="radio-inline">
                  	 	<input type="radio" class="ibps" value="Y" name="selectField" />
                  	 	<span class="lbl">是</span>
                   </label>
                   <label class="radio-inline">
                  	 	<input type="radio" class="ibps" value="N" name="selectField" checked="checked"/>
                  	 	<span class="lbl">否</span>
                   </label>
            </div>
        </div>
		<div class="group ">
            <label class="col-sm-2 control-label">导出数据形式
            	<a href="javascript:void(0);" style="text-decoration: none;" title="数据库元数据:数据库存什么数据就导出什么数据；<br/>界面形式数据:界面展示格式是什么样就导出；<br/>例：用户选择器在数据库保存的是json格式数据，数据库元数据导出就直接导出json，界面形式数据就导出用户姓名。"
				class="fa fa-exclamation-circle" data-tip></a>:</label>
           <div class="col-sm-4">
               <label class="radio-inline">
                 	 	<input type="radio" class="ibps" value="db" name="exportType" checked="checked"/>
                 	 	<span class="lbl">数据库元数据</span>
                  </label>
                  <label class="radio-inline">
                 	 	<input type="radio" class="ibps" value="page" name="exportType" />
                 	 	<span class="lbl">界面形式数据</span>
                  </label>
           </div>
       </div>
      </div>
	</form>
	</div>
</div>
	<div class="panel">
		<table cellpadding="1" cellspacing="1" class="table table-bordered table-condensed table-hover table-striped" 
			name="tableContainer" id="tableExports">
			<thead>
				<tr>
					<th width="10%" >字段</th>
					<th width="20%" class="hidden">格式</th>
					<th width="20%">
						<div class="text-left inline-block">
						<div class="tdTitle">
						权限
						</div>
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
						</div>
					</th>
				</tr>
			</thead>
		</table>
	</div>
</body>
</html>