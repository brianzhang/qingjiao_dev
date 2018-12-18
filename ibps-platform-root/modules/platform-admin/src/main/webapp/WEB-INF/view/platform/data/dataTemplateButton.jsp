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
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateButton.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal" id="buttonForm"    >
		
						<div class="form-group">
							<label class="col-sm-3 control-label">显示名:</label>
							<div class="col-sm-9">
									<input type="text"  class="form-control"  id="label"  />
							</div>
						</div>
						<div class="form-group"  id="codeDiv" style="display: none;">
							<label class="col-sm-3 control-label">编码:</label>
							<div class="col-sm-9">
									<input type="text"  class="form-control"  id="code"  />
							</div>
						</div>
						<div class="form-group"   id="rightsGroupDiv" >
							<label class="col-sm-3 control-label">权限:<a id="settingRights" class=" fa fa-cog" title="字段权限"></a></label>
							<div class="col-sm-9">
									<textarea id="rights" style="display: none"></textarea>
									<div id="rightsDiv"></div>
							</div>
						</div>
						<div class="form-group"  id="positionDiv">
							<label class="col-sm-3 control-label">按钮位置:</label>
							<div class="col-sm-9">
								<select name="position" id="position" class="form-control">
									<option value="all">所有</option>
									<option value="toolbar">仅顶部</option>
										<option value="search">仅查询列</option>
									<option value="manage">仅管理列</option>
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
						<div class="form-group deflow" style="display:none">
							<label class="col-sm-3 control-label">绑定流程:<a id="deflowBtn" class="fa fa-send" title="选择流程"></a></label>
							<div class="col-sm-9">
								<input type="hidden" id="deflow" name="deflow"  class="iconpicker-component" />
								<div id="deflowDiv"></div>
							</div>
						</div>
						
	<!-- 					<div class="form-group">
							<label class="col-sm-3 control-label">过滤条件:</label>
							<div class="col-sm-9">
									<a class="btn btn-sm btn-info">设置过滤条件</a>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">不满足条件设置:</label>
							<div class="col-sm-9">
									<select name="style" id="style" class="form-control">
										<option value="none">不显示</option>
										<option value="hint">提示</option>
									</select>
							</div>
						</div> -->
					</form>
			</div>
		</div>
	</body>
</html>