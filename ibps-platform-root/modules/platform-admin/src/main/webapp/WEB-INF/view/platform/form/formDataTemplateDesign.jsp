<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/formDesign.jsp"%>
		<f:link href="intro/introjs.min.css"  />
		<f:link href="lc/form/formDataTemplate.css"  isCommon="false"/>
		<script type="text/javascript" src="${ctx}/js/plugins/intro/intro.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/form/FormDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateDesign.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/form/FormPrintTemplateDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/templatebuilder.js"></script>
	
	</head>
	<body>
	<body  id="data_template_design" >
	<!-- 左边数据模版 -->
	<div class="ui-layout-west">
		<div class="layout-header ">
			<div class="layout-header-title">数据模版</div>
		</div>
		<div id="add_template" class="data-template-wrapper niceScroll"></div>
	</div>
	<!-- //左边数据模版 -->
	<!-- /中间模版设计 -->
	<div class="ui-layout-center"   style="overflow: hidden;">
		<div class="layout-header  hidden">
			<div class="layout-header-title">模版设计</div>
			<div class="layout-tools"  id="save_tools">
			  		<a class="btn  btn-info btn-narrow  js-save-template" id="saveTemplate" href="javascript:void(0)"><i class="fa fa-save"></i>保存模版</a>
				   <a class="btn  btn-info btn-narrow  js-preview-template" href="javascript:void(0)" ><i class="fa fa-preview"></i>预览</a>
			<c:if test="${!empty id}">
				   	   <a class="btn  btn-info btn-narrow  js-add-menu"  data-id="${id}" href="javascript:void(0)" ><i class="fa fa-telegram "></i>添加为菜单</a>
			</c:if>
				  <a class="btn  btn-info btn-narrow  js-intro-template" href="javascript:void(0)" ><i class="fa fa-question-circle-o"></i>再看次介绍</a>
				   <a class="btn  btn-info btn-narrow js-close" href="javascript:DialogUtil.closeDialog();"><i class="fa fa-close"></i>关闭</a>
			</div>
		</div>
		<div id="template-builder"  class="niceScroll">
			<div class="preview-container">
			    <div class="preview">
				      <div class="query-condition-wrapper"></div>
				      <div class="tb-response-templates"></div>
			    </div>
		  </div>	
 		</div>	
	</div>
	<!-- / 右边设置 -->
	<div class="ui-layout-east">
		<div class="tb-tabs hidden" >
			<div role="tabpanel">
				  <ul class="nav nav-pills nav-tabs " role="tablist">
					    <li role="presentation"   class="active"><a href="#query_condition"  role="tab" data-toggle="tab">查询条件</a></li>
					    <li role="presentation"><a href="#edit_template"  role="tab" data-toggle="tab">模版设置</a></li>
					    <li role="presentation"><a href="#template_property"  role="tab" data-toggle="tab">模版属性</a></li>
				  </ul>
				  <div class="tab-content">
					 <div role="tabpanel" class="tab-pane active " id="query_condition">
					 		<div class="edit-query-condition-wrapper niceScroll">
					 		</div>
					 </div>
					<div role="tabpanel" class="tab-pane" id="edit_template">
					  		<div class="edit-template-wrapper niceScroll">
					  		<div class="edit-response-template">
					  			<div class="empty-text-container">
								      <div class="empty-text">
								        <i class="fa fa-edit"></i>
								        <p>没有设置模版<br/>请添加或者选择一个模版</p>
								      </div>
					  			</div>
						    </div>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane" id="template_property">
			  		  		<div class="edit-template-property niceScroll"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /右边设置 -->
		<input type="hidden" id="id"  value="${id }"/>
		<input type="hidden" id="formKey"  value="${formKey }"/>
		<input type="hidden" id="pk"  value="${pk }"/>
		<textarea id="formData" rows="0" cols="0" style="display: none;">${formData}</textarea>
		<textarea id="data" rows="0" cols="0" style="display: none;">${data}</textarea>
	</body>
</html>