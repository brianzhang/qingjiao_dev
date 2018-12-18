<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/RightsSetting.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateDisplayColumn.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal" id="queryForm"    >
						<div class="form-group">
							<label class="col-sm-3 control-label">显示名:</label>
							<div class="col-sm-9">
									<input type="text"  class="form-control"  id="label"  />
							</div>
						</div>
						<div class="form-group hidden"  id="datefmtGroup">
							<label class="col-sm-3 control-label">数据格式:</label>
							<div class="col-sm-9">
								<select id="datefmtType" class="form-control"  >
										<option value="date">日期</option>
										<option value="datetime">日期时间</option>
										<option value="time">时间</option>
										<option value="custom">自定义</option>
								</select>
								<input type="text"  id="datefmt"  class="form-control hidden" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">权限:<a id="settingRights" class=" fa fa-cog"></a></label>
							<div class="col-sm-9">
									<textarea id="rights" style="display: none"></textarea>
									<div id="rightsDiv"></div>
							</div>
						</div>
						
						<input type="hidden" id="name" />
							<input type="hidden" id="field_type" />
					</form>
			</div>
		</div>
	</body>
</html>