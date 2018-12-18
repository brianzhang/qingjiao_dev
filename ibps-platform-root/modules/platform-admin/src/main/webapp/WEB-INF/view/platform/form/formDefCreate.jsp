<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html ng-app>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/comboTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bo/BoDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
		<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefCreate.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal" id="formDefForm"   method="post"  >
			
							<div class="form-group">
                                <label class="col-sm-2 control-label">表单名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  data-pinyin="#key"  id="name" name="name"   validate="{required:true,maxlength:64}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">表单Key<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="key" name="key"  validate="{required:true,maxlength:64}"/>
                                </div>
                            </div>
                            <div class="form-group">
								 <label class="col-sm-2 control-label">表单分类:</label>
                                <div class="col-sm-10">
                                    <input type="hidden" class="form-control"  id="typeId" name="typeId" />
                                    <input type="text" class="form-control comboTree"  id="typeName" name="typeName" 
                                    	 data-toggle="comboTree"  data-type="FORM_TYPE" data-id="#typeId"  readonly />
                                </div>
							</div>
							
							
							<div class="form-group">
								 <label class="col-sm-2 control-label">表单模式:</label>
							    <div class="col-sm-10">
							    	 <select id="mode" name="mode" class="form-control"  >
											<option value="bo"  selected="selected" >业务对象</option>
											<option value="table">表</option>
											<option value="codeGen">表配置</option>
								    </select>
							    </div>
                            </div>
						<div class="form-group "  id="bo">
							 <label class="col-sm-2 control-label">业务对象:</label>
	            			<div  class="col-sm-10">
	            				<div class="selector-list">
	            					<div  class="selector-list-item hidden">
	            						<div class="preview-area pull-left">
	            								<i class="fa fa-bo"></i>
	            								<span class="selector-name"></span>
	            						</div>
	            						<div class="actions selector-actions pull-right hidden" >
		            						<a class="rechoose-link  js-selector-data" data-role="rechoose" href="javascript:void(0)">重新选择</a>|
		            						<a class="delete-link  js-remove-data" data-role="remove" href="javascript:void(0)">删除</a>
	            						</div>
	            				 	</div>
		            				 <label class="js-selector-data js-selector-empty" >
		            				 	<div class="plus">+</div><div class="selector-empty">请选择业务对象</div>
		            				 	</label>
	            				 </div>
	            			</div>
						</div>
						<div class="form-group hidden "   id="table" >
	                        <label class="col-sm-2 control-label">表名:</label>
	                        <div class="col-sm-4">
	                            <select id="tableName" name="tableName" class="form-control"
	                             data-toggle="select2" data-multiple="false"
	                             data-ajax="${ctx }/platform/form/formDef/tableList.htm"
	                             validate="{required:true}"
	                             >
								</select>
	                        </div>
	                    </div>
	                    
	                    <div class="form-group hidden "   id="codeGen" >
	                        <label class="col-sm-2 control-label">表名:</label>
	                        <div class="col-sm-4">
	                                <select id="codeGenTableName" name="codeGenTableName" class="form-control"
		                             data-toggle="select2" data-multiple="false"
		                             data-ajax="${ctx }/platform/codegen/tableConfig/tableConfigList.htm"
		                             validate="{required:true}"
		                             >
									</select>
	                        </div>
	                    </div>
	                    
	                    <div class="form-group">
								 <label class="col-sm-2 control-label">表单构建模式:</label>
							    <div class="col-sm-10">
							    	 <select id="buildMode" name="buildMode" class="form-control"  >
							    	 		<option value="default" selected="selected">默认模版</option>
											<option value="template"  >表单模版</option>
											<option value="table" >表定义模版</option>
								    </select>
							    </div>
                            </div>
							
						
           				<input type="hidden" id="boId" />
           				<input type="hidden" id="boCode" />
						<input type="hidden" name="id"  id="id" />
					</form>
				</div>
		</div>
	</body>
</html>