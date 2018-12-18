<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html ng-app>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/comboTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/form/FormDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateCreate.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal" id="formDataTemplateForm"   method="post"  >
			
							<div class="form-group">
                                <label class="col-sm-2 control-label">模版名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"    id="name" name="name"  validate="{required:true,maxlength:64}"/>
                                </div>
                            </div>
                            <div class="form-group">
								 <label class="col-sm-2 control-label">模版分类:</label>
                                <div class="col-sm-10">
                                    <input type="hidden" class="form-control"  id="typeId" name="typeId" />
                                    <input type="text" class="form-control comboTree"  id="typeName" name="typeName" 
                                    	 data-toggle="comboTree"  data-type="FORM_TYPE" data-id="#typeId"  readonly/>
                                </div>
							</div>
							<div class="form-group">
								 <label class="col-sm-2 control-label">数据来源:</label>
							    <div class="col-sm-10">
							    	 <select id="dataSource" name="dataSource" class="form-control"  >
											<option value="singleTable"  selected="selected" >单表单</option>
											<option value="moreTable">多表单</option>
								    </select>
							    </div>
                            </div>
						<div class="form-group "  >
							 <label class="col-sm-2 control-label">表单<span class="required">*</span>:</label>
	            			<div  class="col-sm-10">
	            				<div class="selector-list">
	            					<div  class="selector-list-item hidden">
	            						<div class="preview-area pull-left">
	            								<i class="fa fa-form"></i>
	            								<span class="selector-name"></span>
	            						</div>
	            						<div class="actions selector-actions pull-right hidden" >
		            						<a class="rechoose-link  js-selector-data" data-role="rechoose" href="javascript:void(0)">重新选择</a>|
		            						<a class="delete-link  js-remove-data" data-role="remove" href="javascript:void(0)">删除</a>
	            						</div>
	            				 	</div>
		            				 <label class="js-selector-data js-selector-empty" >
		            				 	<div class="plus">+</div><div class="selector-empty">请选择表单</div>
		            				 	</label>
	            				 </div>
	            			</div>
						</div>
							
						
           				<input type="hidden" id="formKey" />
           				<input type="hidden" id="formName" />
						
						<input type="hidden" name="id"  id="id"  />
					</form>
				</div>
		</div>
	</body>
</html>