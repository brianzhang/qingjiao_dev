<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
	<%@include file="/commons/include/list.jsp"%>
	<%@include file="/commons/page/layout.jsp" %>
	<%@include file="/commons/page/tree.jsp" %>
	<f:link href="select2/select2.min.css"/>
	<f:link href="select2/select2-bootstrap.min.css" />
	<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
	<script type="text/javascript"  src="${ctx}/js/lang/select2/zh_CN.js"></script>
		
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/data/FieldTypeSetting.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateSettingField.js"></script>
	<style type="text/css">
 .empty-text-container {
    display: table;
    width: 100%;
    height: 100%;
}
.empty-text-container .empty-text {
    display: table-cell;
    width: 100%;
    height: 100%;
    text-align: center;
    vertical-align: middle;
    color: #848484;
}
.empty-text-container .empty-text i {
    color: #D9D9D9;
    font-size: 50px;
    line-height: 1.2;
}
		</style>
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
		<div class="layout-header">
					<div class="layout-header-title">字段设置</div>
		</div>
		<div class="tb-tabs">
			<div class="edit-template-wrapper niceScroll"  style="overflow: hidden;">
		  			<div id="emptyField" class="empty-text-container">
					      <div class="empty-text">
					        <i class="fa fa-edit"></i>
					        <p>没有选择字段<br/>请选择左侧的树的字段</p>
					      </div>
		  			</div>
		  			<div id="fieldEdit"   style="display: none;padding-top:10px;" class="  col-sm-12" >
		  				<form class="form-horizontal" id="fieldForm"    >
						<div class="form-group">
							<label class="col-sm-3 control-label">显示名:</label>
							<div class="col-sm-9">
									<input type="text"  class="form-control"  id="label"  />
							</div>
						</div>
						<div class="form-group"  id="fieldTypeGroup">
							<label class="col-sm-3 control-label">控件类型:</label>
							<div class="col-sm-9">
								 <select id="fieldType"   class="form-control" > 
								 </select>
							</div>
						</div>
						
						<div class="form-group"  id="dateGroup"  style="display: none;">
							<label class="col-sm-3 control-label">日期格式:</label>
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
						
						<div class="form-group"  id="enumGroup"  style="display: none;">
							   	<div class="col-sm-12">
									<div class="panel-toolbar ">
										<div class="buttons">
											<a href="javascript:void(0);" class="btn btn-primary fa fa-add js-add-enum"><span>添加</span></a>
										</div>
									</div>
								</div>
                           		<div class="col-sm-12">
                           		<table  class=" table table-bordered ">
                           			<thead>
                           				<tr>
                           					<td>值</td>
                           					<td>标签</td>
                           					<td>操作</td>
                           				</tr>
                           			</thead>
                           			<tbody id="enumTb">
                           				
                           			</tbody>
                           		</table>
                           	 </div>
						</div>
					
						<div class="form-group"  id="dictionaryGroup"  style="display: none;">
							<label class="col-sm-3 control-label">数据字典:</label>
							<div class="col-sm-9">
								<input type="hidden" id="dicKey" />
								<input type="text" class="form-control dropdownTree" readonly  id="dicName" name="dicName" 
									data-toggle="dropdownTree"  data-type="DIC_TYPE" data-bind_dic="true" data-typekey="#dicKey"
							 	 />
			
							</div>
						</div>
						
						<div class="form-group"  id="selectorGroup"  style="display: none;">
							<label class="col-sm-3 control-label">选择器类型:</label>
							<div class="col-sm-9">
								<select id="selectorType" class="form-control"  >
										<option value="user">用户</option>
										<option value="org">组织</option>
										<option value="position">岗位</option>
										<option value="role">角色</option>
								</select>
							</div>
						</div>
						<div class="form-group"  id="customDialogGroup"  style="display: none;">
							<label class="col-sm-3 control-label">自定义对话框:</label>
							<div class="col-sm-9">
						 			<select id="customDialog" class="form-control"></select>
                             </div>
                          </div>
                         <div class="form-group"  id="storeGroup"  style="display: none;">
							<label class="col-sm-3 control-label">存储格式:</label>
							<div class="col-sm-9">
								<select id="store" class="form-control"  >
										<option value="json">json</option>
										<option value="id">仅ID</option>
										<option value="bind">绑定ID</option>
								</select>
							</div>
						</div>
		  				</form>
		  			</div>
		  				
			    </div>
 		</div>	
	</div>
	
	
	
	
		<textarea id="data" rows="0" cols="0" style="display: none;">${data}</textarea>
	</body>
</html>