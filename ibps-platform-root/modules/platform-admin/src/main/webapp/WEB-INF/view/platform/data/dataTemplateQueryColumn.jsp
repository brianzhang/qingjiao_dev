<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/RightsSetting.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/FieldTypeSetting.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateQueryColumn.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal" id="queryForm"    >
						<div class="form-group">
							<label class="col-sm-3 control-label">显示名:</label>
							<div class="col-sm-9">
									<input type="text"  class="form-control"  id="label"  />
							</div>
						</div>
						
				
						<div class="form-group">
							<label class="col-sm-3 control-label">权限:<a id="settingRights" class=" fa fa-cog" title="设置权限"></a></label>
							<div class="col-sm-9">
									<textarea id="rights" style="display: none"></textarea>
									<div id="rightsDiv"></div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">是否常用条件:</label>
							<div class="col-sm-9">
								 <select id="common"   class="form-control" >
								 		<option  value="Y">是</option>
								 		<option  value="N">否</option>
								 </select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">跟字段控件类型一致:</label>
							<div class="col-sm-9">
								 <select id="same"   class="form-control" >
								 		<option  value="Y">是</option>
								 		<option  value="N">否</option>
								 </select>
							</div>
						</div>
						<div class="form-group"    id="fieldTypeGroup"  style="display: none;">
							<label class="col-sm-3 control-label">控件类型:</label>
							<div class="col-sm-9">
								 <select id="fieldType"   class="form-control" >  <!--  根据类型不同-->
								 		<option  value="text">单行文本</option>
								 		<option  value="hidden">隐藏域</option>
								 		<option  value="select">下拉框</option>
								 		<option  value="dictionary">数据字典</option>
								 		<option  value="selector">选择器</option>
								 		<option  value="datePicker">日期控件</option>
								 		<option  value="dateRange">日期范围</option>
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
					
						
						<!-- 		<div class="form-group">
							<label class="col-sm-3 control-label">默认值:</label>
							<div class="col-sm-9">
								<input type="hidden" id="defaultValueType" />
									<div class="input-group">
                                              <div class="input-group-btn">
                                                  <button type="button" class="btn   dropdown-toggle" data-toggle="dropdown"><span id="defaultValueTypeSpan"  >固定值</span>
                                                      <i class="fa fa-angle-down"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                      <li>
                                                          <a href="javascript:;" class="defaultValueType"  data-type="fixed"> 固定值 </a>
                                                      </li>
                                                      <li>
                                                          <a href="javascript:;" class="defaultValueType" data-type="dynamic">动态脚本</a>
                                                      </li>
                                                      <li>
                                                          <a href="javascript:;" class="defaultValueType" data-type="formula">公式计算</a>
                                                      </li>
                                                  </ul>
                                              </div>
                                              <div>
                                              	<a class="btn"  style="display: none;">设置</a>
                            	          		<input type="text" id="defaultValue" class="form-control">
                                              </div>
                                              
                                         </div>
							</div>
						</div> -->
					</form>
			</div>
		</div>
	</body>
</html>