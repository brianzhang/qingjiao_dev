<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<f:link href="ztree/ztree.css"  isCommon="false" />
		<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.min.js"></script>
		<f:link href="query-builder2/query-builder.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/RightsSetting.js"></script>
	
		<script type="text/javascript" src="${ctx}/js/plugins/queryBuilder/lib/jQuery.extendext.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/queryBuilder/lib/doT.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/queryBuilder/lib/interact.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/queryBuilder2/query-builder.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lang/query-builder2/zh_CN.js"></script>
		
				<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
		 <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PositionDialog.js"></script>
		 <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>		
		
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.min.js"></script>	
				
	
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateFilterCondition.js"></script>
			
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content col-sm-12">
			<div class="panel-form">
				<fieldset >
				  <legend>基本属性</legend>
			 		<p>&nbsp;</p>

					<form class="form-horizontal" id="filterForm"  >
						<input type="hidden"  class="form-control"  id="key"  />
						<div class="form-group">
							<label class="col-sm-2 control-label">名称:</label>
							<div class="col-sm-4">
								<input type="text"  class="form-control"  id="label"  />
							</div>
							<label class="col-sm-2 control-label">类型</label>
							<div class="col-sm-4">
								<label class="radio-inline"><input type="radio" class="ibps" name="type" value="condition"  checked="checked" /><span class="lbl">条件过滤</span></label>
								<!-- <label class="radio-inline"><input type="radio" class="ibps"  name="type" value="expression"   /><span class="lbl">表达式过滤</span></label> -->
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">权限:<a id="settingRights" class=" fa fa-cog"></a></label>
							<div class="col-sm-10">
								<textarea id="rights" style="display: none"></textarea>
								<div id="rightsDiv"></div>
							</div>
						</div>
					</form>
				</fieldset>
				<fieldset>
					 <legend>条件规则</legend>
					 <p>&nbsp;</p>
					 <div id="builder"></div>
				</fieldset>
			</div>
		</div>
	</body>
	
	</html>