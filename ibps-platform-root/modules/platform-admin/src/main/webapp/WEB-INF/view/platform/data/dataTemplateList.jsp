<%@ page language="java" contentType="text/html; charset=UTF-8" 	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<%@include file="/commons/page/tree.jsp"%>
<f:link href="jquery/jquery.webui-popover.min.css"/>
<f:link href="lc/form/formList.css"  isCommon="false"/>
<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.webui-popover.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/stickUp/stickUp.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/cat/TypeTree.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/laypage/laypage.js"></script>

<script type="text/javascript" src="${ctx}/js/lc/platform/form/formButtons.js"></script>

<script type="text/javascript" src="${ctx}/js/lc/platform/utils/DataTemplateUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateList.js"></script>
<title>业务数据模版管理列表</title>
</head>
<body>

<div class="dashboard">
		<div class="dashboard-header">
              <h2 class="pull-left">数据模版</h2>
              <div id="formPage" class="pull-right"></div>
              <form class="form-inline form-search" >
                  <div class="input-group ">
                      <input type="text" class="form-control"  name="Q^NAME_^SL" placeholder="模版名称"/>
                      <input type="hidden" class="form-control" id="typeId"  name="Q^TYPE_ID_^S"/>
                      <span class="input-group-btn">
                          <a class="btn btn-primary  btn-mm search">
                              <i class="fa fa-search"></i>
                          </a>
                      </span>
                  </div>
<!-- 				<div class="input-group">
					<a href="javascript:void(0);" class="btn btn-primary btn-mx fa fa-import" id="import"><span>导入</span></a>
				</div>
				<div class="input-group">
					<a href="javascript:void(0);" class="btn btn-primary btn-mx fa fa-export" id="export"><span>导出</span></a>
				</div> -->
              </form>
         </div>                            
		<div class="dashboard-content">
		  <div class="forms-section clearfix" id="forms_section">
			    <div class="create-new dashboard-item">
				  <img  class="plus-icon" src="${ctx}/styles/commons/images/form/plus.png" alt="新建" />
					  <div class="dashboard-create-new-options ibps-hide">
						    <a class="create-new-link template-form-create-link template-form-create-event track-event" href="javascript:void(0)">
						      <div class="template-form-create">
						        <i class="fa fa-wpforms"></i>
						        <span>创建模版</span>
						      </div>
							 </a>
					</div>
				</div>
				<div id="formList" class="cover-list"></div>
			</div>
			 <div class="dashboard-sidebar">
			 		<div class="dashboard-sidebar-header ">
							<h5>数据模版分类</h5>
        			</div>
					<div id="typeTree" class="ztree"></div>
			</div>
	</div>
</div>

<script type="text/html"  id="formTemp">
	 {{each list as item i}}
				<div  class="form dashboard-item"  data-id="{{item.id}}" data-key={{item.key}}>
	       			<a href="javascript:void(0)">
						<div class="checks check-icons">
					        	<i class="fa fa-check-square"></i>
					      </div>
						 <div class="name">{{item.name}}</div>
						<div class="symbol">
							<i class="symbol-color form-color-3">
							
				{{if item.type == 'default'}}
		       			<i class=" symbol-icon fa  {{if item.showType == 'list'}}fa-table{{else if item.showType == 'tree'}}fa-tree{{else}}fa-puzzle-piece{{/if}}"></i>
				{{else if item.type == 'dialog'}}
						<span class=" symbol-icon">
 								<i class=" fa fa-window-maximize"></i>
  								<i class=" fa  {{if item.showType == 'list'}}fa-table{{else if item.showType == 'tree'}}fa-tree{{else}}fa-puzzle-piece{{/if}} fa-stack-1x" style=" margin-top: -25px; font-size: 0.4em;"></i>
						</span>
				{{else}}
					 <i class=" symbol-icon fa  fa-database"></i>
				{{/if}}
							</i>
						</div>
						<div class="form-data" ></div>
						<div class="settings info-icons">
					        <i class="fa fa-cog"></i>
						</div>
						<div class="cover-view-icons info-icons"></div>
					</a> 
			 	</div>
	{{/each}}
</script>
		
<script type="text/html"  id="dashboard_form_settings_template">
<ul class="dashboard-settings-options  dropdown-menu" data-id="{{id}}"  data-key={{key}}>
    <li class="preview-form" >
      <a href="javascript:void(0)">
 	 	<i class="item-icon fa fa-eye"></i>
 	 	<span>预览</span>
	  </a>
	</li>

    <li class="edit-form" >
      <a href="javascript:void(0)">
 	 	<i class="item-icon fa fa-edit"></i>
 	 	<span>编辑</span>
	  </a>
	</li>
    <li class="delete-form">
      	<a href="javascript:void(0)">
        	<i class="item-icon red fa fa-times"></i>
        	<span>删除</span>
		</a>
	</li>
    <li class="view-url">
      	<a href="javascript:void(0)">
        	<i class="item-icon  fa fa-bars"></i>
        	<span>查看URL</span>
		</a>
	</li>
  </ul>
</script>
</body>
</html>