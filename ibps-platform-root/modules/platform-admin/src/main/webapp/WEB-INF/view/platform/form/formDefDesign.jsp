<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/page/formDesign.jsp"%>
<f:link href="lc/form/formDesign.css"  isCommon="false"/>
<f:link href="intro/introjs.min.css"  />
<link  rel="stylesheet" type="text/css" href="${ctx}/js/plugins/ueditor/themes/builder/css/UBuilder.css"></link>
<script type="text/javascript" src="${ctx}/js/plugins/ueditor/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/intro/intro.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bo/BoDefDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/utils/FormulaUtil.js"></script>
<script type="text/javascript" src="${ctx }/js/lc/platform/form/formbuilder.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefDesign.js"></script>
<title>表单设计</title>
</head>
<body  id="form_design" >
	<!-- 左边BO对象 -->
	<div class="ui-layout-west" >
		<div class="fb-tabs hidden" >
			<div role="tab">
				  <ul class="nav  nav-pills nav-tabs" role="tablist">
					    <li role="presentation" class="active"><a href="#add_field" aria-controls="add" role="tab" data-toggle="tab">表单字段</a></li>
					    <li role="presentation" ><a href="#bo"   role="tab" data-toggle="tab">业务对象</a></li>
				  </ul>
				  <div class="tab-content">
				  	 <div class="tab-pane fb-add-field-types active" id="add_field">
					 		<div class="add-field-wrapper niceScroll"></div>
					 </div>
				  	<div class="tab-pane" id="bo">
				  		<div id="boTreeDiv" class="niceScroll">
							<div id="boTree" class="ztree" ></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
	<!-- //左边BO对象 -->
	<!-- /中间表单设计 -->
	<div class="ui-layout-center"   style="overflow: hidden;">
		<div class="layout-header  hidden">
			<div class="layout-header-title">表单布局</div>
			<div class="layout-tools" id="save_tools">
			  		<a class="btn  btn-info btn-narrow  js-save-form" id="saveForm" href="javascript:void(0)"><i class="fa fa-save" ></i>保存表单</a>
				   <a class="btn  btn-info btn-narrow  js-preview-from" href="javascript:void(0)" ><i class="fa fa-preview"></i>预览</a>
				   <a class="btn  btn-info btn-narrow  js-intro-from" href="javascript:void(0)" ><i class="fa fa-question-circle-o"></i>再看次介绍</a>
				   <a class="btn  btn-info btn-narrow js-close" href="javascript:void(0)" ><i class="fa fa-close"></i>关闭</a>
			</div>
		</div>
		<div id="form-builder"  class="niceScroll">
			<div class="preview-container">
			    <div class="preview">
				      	<div class="form-header-wrapper"></div>
				      <div class="fb-response-fields"></div>
			    </div>
		  </div>	
 		</div>	
	</div>
	<div class="ui-layout-east">
		<div class="fb-tabs hidden" >
			<div role="tabpanel">
				  <ul class="nav  nav-pills nav-tabs" role="tablist">
					    <li role="presentation"><a href="#edit_field" aria-controls="edit" role="tab" data-toggle="tab">编辑字段</a></li>
					    <li role="presentation" class="active"><a href="#form_property" aria-controls="style" role="tab" data-toggle="tab">表单属性</a></li>
				  </ul>
				  <div class="tab-content">
					<div role="tabpanel" class="tab-pane " id="edit_field">
					  		<div class="fb-edit-field-wrapper niceScroll">
					  		<div class="edit-response-field">
					  			<div class="empty-text-container">
								      <div class="empty-text">
								        <i class="fa fa-edit"></i>
								        <p>没有选定的字段<br/>请添加或者选择一个字段</p>
								      </div>
					  			</div>
						    </div>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane active" id="form_property">
			  		  		<div class="edit-form-property niceScroll"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /右边设置 -->
	</div>
		<input type="hidden" id="boDefId" />
		<textarea id="boDefJson" rows="0" cols="0" style="display: none;"></textarea>
		<input type="hidden" id="id"  value="${id }"/>
		<textarea id="data" rows="0" cols="0" style="display: none;">${data}</textarea>
		
	
  <div id="subMenu"   class="bootstrap-contextmenu" >
         <ul class="dropdown-menu" role="menu">
             <li><a data-action="node_add" tabindex="-1"  ><i class="fa fa-add"></i>&nbsp;&nbsp;管理业务对象</a></li>
         </ul>
     </div>
     
     <div id="topMenu" class="bootstrap-contextmenu"   >
         <ul class="dropdown-menu" role="menu">
             <li><a data-action="node_bind" tabindex="-1"  ><i class="fa fa-add"></i>&nbsp;&nbsp;绑定业务对象</a></li>
         </ul>
     </div>
</body>
</html>