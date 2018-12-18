<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<f:link href="iconpicker/fontawesome-iconpicker.min.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/iconpicker/fontawesome-iconpicker.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/RightsSetting.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateFuntionButton.js"></script>
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
						<div class="form-group">
							<label class="col-sm-3 control-label">权限:<a id="settingRights" class="fa fa-cog" title="字段权限"></a></label>
							<div class="col-sm-9">
									<textarea id="rights" style="display: none"></textarea>
									<div id="rightsDiv"></div>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-3 control-label">按钮位置:</label>
							<div class="col-sm-9">
								<select name="position" id="position" class="form-control">
									<option value="all">所有</option>
									<option value="edit">仅编辑</option>
									<option value="detail">仅明细</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">按钮颜色:</label>
							<div class="col-sm-9">
								<select name="style" id="style" class="form-control">
									<option value="btn-primary">默认</option>
									<option value="btn-default">灰色</option>
									<option value="btn-success">成功色</option>
									<option value="btn-info">信息色</option>
									<option value="btn-warning">警告色</option>
									<option value="btn-danger">危险色</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">按钮图标:</label>
							<div class="col-sm-9">
							<input type="hidden" id="icon" name="icon"  class="iconpicker-component" />
		                        <div class="btn-group">
		                           <button data-selected="graduation-cap" type="button" class="icp icp-dd btn btn-default dropdown-toggle iconpicker-component" data-toggle="dropdown">
		                                <i class="	  fa-fw"  data-icon="icp"></i>
		                               <span class="caret"></span>
		                           </button>
		                           <div class="dropdown-menu"></div>
		                        </div>
							</div>
						</div>
						
						<input type="hidden" id="name" />
					</form>
			</div>
		</div>
	</body>
</html>