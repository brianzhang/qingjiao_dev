<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<f:link href="codemirror/lib/codemirror.css" />
			<f:link href="lc/form/formFormula.css"  isCommon="false"/>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
			<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/field/field-mode.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/javascript/javascript.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateDataTitle.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal"    >
								<div class="form-group col-sm-12">
										<label class="radio">
												 <input type="radio" class="ibps" value="first" name="type"  checked="checked" validate="{required:true}" />
												 <span class="lbl">第一个字段的值</span>
										</label>
										<label class="radio"> 
												<input type="radio" class="ibps" value="custom" name="type" validate="{required:true}"  />
												<span class="lbl">自定义标题</span>
										</label>
								</div>
								<div class="form-group col-sm-12" id="customGroup" style="display: none;">
										<table>
											<tr>
												<td width="90%"><textarea class="cm-s-default"  id="customTitle" ></textarea></td>
												<td width="10%"><a class="btn btn-primary btn-xs " id="settingTitle">字段</a></td>
											</tr>
										</table>
								</div>
					</form>
			</div>
		</div>
	</body>
</html>