<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html ng-app>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/comboTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/data/DatasetDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateCreate.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal" id="dataTemplateForm"   method="post"  >
			
							<div class="form-group">
                                <label class="col-sm-2 control-label">模版名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"    id="name" name="name" data-pinyin="#key"  validate="{required:true,maxlength:64}"/>
                                </div>
                            </div>
                            
                          <div class="form-group">
                                <label class="col-sm-2 control-label">模版Key<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"    id="key" name="key"  validate="{required:true,maxlength:64}"/>
                                </div>
                            </div>
                            <div class="form-group">
								 <label class="col-sm-2 control-label">分类:</label>
                                <div class="col-sm-10">
                                    <input type="hidden" class="form-control"  id="typeId" name="typeId" />
                                    <input type="text" class="form-control comboTree"  id="typeName" name="typeName" 
                                    	 data-toggle="comboTree"  data-type="DATA_TEMPLATE_TYPE" data-id="#typeId"  readonly/>
                                </div>
							</div>
							 <div class="form-group">
								 <label class="col-sm-2 control-label">模版类型:</label>
                                <div class="col-sm-10">
                 	             		<select class="form-control" id="type" name="type"  validate="{required:true}">
                 	             				<option value="default" >默认</option>
                 	             				<option value="dialog" >对话框</option>
												<option value="valueSource" >值来源</option>
										</select>
                                </div>
							</div>
							
							<div class="form-group" id="showTypeGroup" >
								 <label class="col-sm-2 control-label">展示形式:</label>
                                <div class="col-sm-10">
                 	             		<select class="form-control" id="showType" name="showType"  validate="{required:true}">
                 	             				<option value="" >--请选择--</option>
                 	             				<option value="list"  selected="selected">列表</option>
                 	             				<option value="tree" >树形</option>
												<option value="compose" >组合</option>
										</select>
                                </div>
							</div>
							<div class="form-group" id="composeTypeGroup" style="display: none">
								 <label class="col-sm-2 control-label">组合类型:</label>
                                <div class="col-sm-10">
                 	             		<select class="form-control" id="composeType" name="composeType"  validate="{required:true}">
                 	             				<option value="" >--请选择--</option>
                 	             				<option value="treeList" >左树右列表</option>
                 	             				<option value="listTree" >左列表右树</option>
										</select>
                                </div>
							</div>
						
						<div class="form-group "   id="datasetGroup">
							 <label class="col-sm-2 control-label">数据集<span class="required">*</span>:</label>
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
		            				 	<div class="plus">+</div><div class="selector-empty">请选择数据集</div>
		            				 	</label>
	            				 </div>
	            			</div>
	            		</div>
						
           				<input type="hidden" id="datasetKey" />
           				<input type="hidden" id="datasetName" />
           				
						
						<input type="hidden" name="id"  id="id"  />
					</form>
				</div>
		</div>
	</body>
</html>