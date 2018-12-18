<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
			<%@include file="/commons/page/select2.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/RightsSetting.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/FieldTypeSetting.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateDisplayColumn.js"></script>
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
							<label class="col-sm-3 control-label">无权限样式:</label>
							<div class="col-sm-9">
								<select id="noRightStyle" class="form-control"  >
										<option value="">不显示</option>
										<option value="asterisk">星号(*)</option>
								</select>
							</div>
						</div>
						<div class="form-group" >
							<label class="col-sm-3 control-label">允许排序:</label>
							<div class="col-sm-9">
								<select id="sortable" class="form-control"  >
										<option value="Y">是</option>
										<option value="N">否</option>
								</select>
							</div>
						</div>
						<div class="form-group" >
							<label class="col-sm-3 control-label">对齐:</label>
							<div class="col-sm-9">
								<select id="align" class="form-control"  >
										<option value="left">居左</option>
										<option value="center">居中</option>
										<option value="right">居右</option>
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
						<div class="form-group"  id="fieldTypeGroup"  style="display: none;">
							<label class="col-sm-3 control-label">显示格式:</label>
							<div class="col-sm-9">
								<select id="fieldType" class="form-control"  >
										<option value="text">原样输出</option>
										<option value="hidden">隐藏</option>
										<option value="datePicker">日期格式</option>
										<option value="number">数字格式</option> 
										<option value="select">枚举值格式</option>
										<option value="dictionary">数据字典格式</option>
										<option value="selector">选择器格式</option>
										<option value="customDialog">自定义对话框</option>
										<option value="attachment">附件格式</option>
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
						
						<div class="form-group"  id="numberGroup"  style="display: none;">
							<label class="col-sm-3 control-label">数字格式:</label>
							<div class="col-sm-9">
								<select id="numberType" class="form-control"  >
										<option value="orig">原样输出</option>
										<option value="integer">整型</option>
										<option value="number">小数</option> 
										<option value="currency">货币</option>
								</select>
						<!-- 		<input type="text"  id="datefmt"  class="form-control hidden" /> -->
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
                           			<tbody id="enumTb"></tbody>
                           		</table>
                           	 </div>
						</div>
					
						<div class="form-group"  id="dictionaryGroup"  style="display: none;">
							<label class="col-sm-3 control-label">数据字典格式:</label>
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
						
						<input type="hidden" id="name" />
					</form>
			</div>
		</div>
	</body>
</html>