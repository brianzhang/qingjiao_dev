<%@page language="java" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>表单授权</title>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/plugins/doT/doT.min.js"></script>
<f:link href="lc/form/formDataTemplateSelectField.css"  isCommon="false"/>
<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateSelectField.js"></script>
</head>
<body>
	<div class="panel">
		<table cellpadding="1" cellspacing="1" class="table table-bordered table-condensed table-hover table-striped" 
			name="tableContainer" id="selectFields">
			<thead>
				<tr>
					<th width="6%">
						<label class="checkbox-inline">
	                   	 	<input type="checkbox" class="ibps chk" checked="checked" title=""/>
	                   	 	<span class="lbl">字段名</span>
	                    </label>
					</th>
				</tr>
			</thead>
		</table>
	</div>
</body>
</html>