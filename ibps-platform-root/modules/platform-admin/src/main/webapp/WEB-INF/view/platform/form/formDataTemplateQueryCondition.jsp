<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/RightsSetting.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateQueryCondition.js"></script>
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
				<!-- 		<div class="form-group">
							<label class="col-sm-3 control-label">默认值:</label>
							<div class="col-sm-9">
								<input type="hidden" id="defaultValueType" />
									<div class="input-group">
                                              <div class="input-group-btn">
                                                  <button type="button" class="btn   dropdown-toggle" data-toggle="dropdown"><span id="defaultValueTypeSpan"  >固定值</span>
                                                      <i class="fa fa-angle-down"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                      <li>
                                                          <a href="javascript:;" class="defaultValueType"  data-type="fixed"> 固定值 </a>
                                                      </li>
                                                      <li>
                                                          <a href="javascript:;" class="defaultValueType" data-type="dynamic">动态脚本</a>
                                                      </li>
                                                      <li>
                                                          <a href="javascript:;" class="defaultValueType" data-type="formula">公式计算</a>
                                                      </li>
                                                  </ul>
                                              </div>
                                              <div>
                                              	<a class="btn"  style="display: none;">设置</a>
                            	          		<input type="text" id="defaultValue" class="form-control">
                                              </div>
                                              
                                         </div>
							</div>
						</div> -->
						<div class="form-group">
							<label class="col-sm-3 control-label">权限:<a id="settingRights" class=" fa fa-cog" title="设置权限"></a></label>
							<div class="col-sm-9">
									<textarea id="rights" style="display: none"></textarea>
									<div id="rightsDiv"></div>
							</div>
						</div>
					</form>
			</div>
		</div>
	</body>
</html>