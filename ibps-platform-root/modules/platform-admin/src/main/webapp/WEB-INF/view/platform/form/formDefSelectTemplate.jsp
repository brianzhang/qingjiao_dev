<%@ page language="java" contentType="text/html; charset=UTF-8" 	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<%@include file="/commons/page/tree.jsp"%>
<%@include file="/commons/page/qtip.jsp"%>
<script type="text/javascript" src="${ctx}/js/plugins/stickUp/stickUp.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/cat/TypeTree.js"></script>
<f:link href="lc/form/formList.css"  isCommon="false"/>
<script type="text/javascript" src="${ctx}/js/plugins/laypage/laypage.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/formTemplateSelect.js"></script>
<title>表单模版管理列表</title>
</head>
<body>

<div class="dashboard">
		<div class="dashboard-header">
              <h2 class="pull-left">表单模版</h2>
                   		<div id="formPage" class="pull-right"></div>
              <form class="form-inline form-search" >
                  <div class="input-group ">
                      <input type="text" class="form-control"  name="Q^NAME_^SL" placeholder="模版名称"/>
                      <input type="hidden" class="form-control" id="typeId"  name="Q^TYPE_ID_^S"/>
                      <span class="input-group-btn">
                          <a class="btn btn-info  btn-mm search">
                              <i class="fa fa-search"></i>
                          </a>
                      </span>
                  </div>
              </form>
         
         </div>                            
		<div class="dashboard-content">
		  <div class="forms-section clearfix" id="forms_section">
				<div id="formList" class="cover-list"></div>
			</div>
			 <div class="dashboard-sidebar">
			 		<div class="dashboard-sidebar-header ">
							<h5>表单分类</h5>
        			</div>
					<div id="typeTree" class="ztree"></div>
			</div>
	</div>
</div>

<script type="text/html"  id="formTemp">
	 {{each list as item i}}
				<div  class="form dashboard-item"  data-id="{{item.id}}" data-key={{item.key}}>
	       			<a href="javascript:void(0)">
	      					<div class="name">{{item.name}}</div>
					      <div class="symbol">
					        <i class="symbol-color form-color-3">
					          <i class="symbol-icon fa fa-table"></i>
					        </i>
					      </div>
				
					</a> 
					<span class="icon"></span>
			 	</div>
			{{/each}}
</script>
		
</body>
</html>