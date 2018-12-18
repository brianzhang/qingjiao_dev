<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/formDesign.jsp"%>
		<f:link href="intro/introjs.min.css"  />
		<f:link href="lc/data/dataTemplate.css"  isCommon="false"/>
		<script type="text/javascript" src="${ctx}/js/plugins/intro/intro.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/data/DatasetDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/data/DataTemplateDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formRightsDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/DataTemplateUtil.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateDesign.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/form/FormDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/form/FormPrintTemplateDialog.js"></script>
	
		<!--构建js  -->
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/dataTemplatebuilder.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/options.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/i18n/zh_CN.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/register/list.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/register/tree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/register/valueSource.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/register/compose.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/templates/edit.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/templates/view.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/builder/templates/property.js"></script>
		


	</head>
	<body>
	<body  id="data_template_design" >
	<!-- 左边数据模版 -->
	<div class="ui-layout-west">
		<div class="layout-header ">
			<div class="layout-header-title">数据集</div>
		</div>
	  		<div id="datasetTreeDiv" class="niceScroll">
				<div id="datasetTree" class="ztree" ></div>
			</div>
	</div>
	<!-- //左边数据模版 -->
	<!-- /中间模版设计 -->
	<div class="ui-layout-center"   style="overflow: hidden;">
		<div class="layout-header  hidden">
			<div class="layout-header-title">模版设计</div>
			<div class="layout-tools"  id="save_tools">
			  		<a class="btn  btn-primary btn-narrow  js-save-template" id="saveTemplate" href="javascript:void(0)"><i class="fa fa-save"></i>保存模版</a>
				   <a class="btn  btn-primary btn-narrow  js-preview-template" href="javascript:void(0)" ><i class="fa fa-preview"></i>预览</a>
			<c:if test="${!empty id}">
				   	   <a class="btn  btn-primary btn-narrow  js-add-menu"  data-id="${id}" href="javascript:void(0)" ><i class="fa fa-telegram "></i>添加为菜单</a>
			</c:if>
				  <a class="btn  btn-primary btn-narrow  js-intro-template" href="javascript:void(0)" ><i class="fa fa-question-circle-o"></i>再看次介绍</a>
				   <a class="btn  btn-primary btn-narrow js-close" href="javascript:void(0)"><i class="fa fa-close"></i>关闭</a>
			</div>
		</div>
		<div id="template-builder"  class="niceScroll">
			<div class="preview-container">
			    <div class="preview">
				      <div class="template-header-wrapper"></div>
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
					    <li role="presentation"><a href="#edit_template"  role="tab" data-toggle="tab">模版设置</a></li>
					      <li role="presentation" id="dialogPropertyLi" style="display: none;"><a href="#dialog_property"  role="tab" data-toggle="tab">对话框属性</a></li>
					    <li role="presentation" class="active"><a href="#template_property"  role="tab" data-toggle="tab">模版属性</a></li>
				  </ul>
				  <div class="tab-content">
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
					<div role="tabpanel" class="tab-pane active" id="dialog_property">
			  		  		<div class="edit-dialog-property niceScroll"></div>
					</div>
					<div role="tabpanel" class="tab-pane active" id="template_property">
			  		  		<div class="edit-template-property niceScroll"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /右边设置 -->
		<input type="hidden" id="id"  value="${id }"/>
		<textarea id="datasetJson" rows="0" cols="0" style="display: none;"></textarea>
		<textarea id="data" rows="0" cols="0" style="display: none;">${data}</textarea>
		
		
		     
     <div id="topMenu" class="bootstrap-contextmenu"   >
         <ul class="dropdown-menu" role="menu">
             <li><a data-action="node_setting" tabindex="-1"  ><i class="fa fa-cogs"></i>&nbsp;&nbsp;设置字段控件</a></li>
         </ul>
     </div>
	</body>
</html>