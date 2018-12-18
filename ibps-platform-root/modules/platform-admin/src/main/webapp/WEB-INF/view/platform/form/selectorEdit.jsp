<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/selector.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="selectorForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">名称:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${selector.name}"  data-pinyin="#alias"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">别名:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="alias" name="alias" value="${selector.alias}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">对应方法:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="method" name="method" value="${selector.method}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">参数名:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="confKey" name="confKey" value="${selector.confKey}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">系统预定义:</label>
                                <div class="col-sm-10">
                                	<label class="radio-inline">
                                       	 	<input type="radio" class="ibps" value="1" name="isCustom"  <c:if test="${selector.isCustom==1}">checked="checked"</c:if>>
                                       	 	<span class="lbl">是</span>
                                     </label>
                                     <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="0" name="isCustom"  <c:if test="${empty selector ||  selector.isCustom==0}">checked="checked"</c:if>>
											<span class="lbl">否</span>                                       
									 </label>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">组合字段:</label>
                                <div class="col-sm-10">
                                <table class="table table-striped" >  
								    <thead>
								    	<tr>
								    		<td colspan="4">
                                				<a href="javascript:void(0);" class="btn btn-primary fa fa-add"  id="addGroupField"><span>添加字段</span></a>
								    		</td>
								    	</tr>
								    	<tr>
								    		<th  width="25%">名称</th>
								    		<th width="25%">键</th>
								    		<th width="30%">返回脚本</th>
								    		<th width="20%">操作</th>
								    	</tr>
								    </thead>
								 	<tbody id="groupFieldItem">
								 	</tbody>
							   	</table>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">按钮定义:</label>
                                <div class="col-sm-10">
                                <table class="table table-striped" >  
								    <thead>
								    	<tr>
								    		<td colspan="4">
								    	 		<a href="javascript:void(0);" class="btn btn-primary fa fa-add"  id="addButtons"><span>添加按钮</span></a>
								    		</td>
								    	</tr>
								    	<tr>
								    		<th width="25%">名称</th>
								    		<th width="25%">图标</th>
								    		<th width="30%">点击事件</th>
								    		<th width="20%">操作</th>
								    	</tr>
								    </thead>
								 	<tbody id="buttonsItem">
								 	</tbody>
							   	</table>
                            	</div>
                            </div>
                            
                     <textarea id="groupField" name="groupField"  class="hidden">${fn:escapeXml(selector.groupField)}</textarea>	
						<textarea id="buttons" name="buttons" class="hidden">${fn:escapeXml(selector.buttons)}</textarea>
					<input type="hidden" name="flag" value="${selector.flag}" />
					<input type="hidden" name="id" value="${selector.id}" />
					</form>
				</div>
		</div>
	</body>
	
	<textarea id="groupFieldTemplate" style="display: none;">
		<tr>
			<td>
				<input type="hidden" name="fieldName" value="#fieldName">
				<input type="hidden" name="fieldKey" value="#fieldKey">
				<input type="hidden" name="fieldScript" value="#fieldScript">
				<span class="fieldName-span">#fieldName</span>
			</td>
			<td>
				<span class="fieldKey-span">#fieldKey</span>
			</td>
			<td>
				<span class="fieldScript-span">#fieldScript</span>
			</td>
			<td>
				<a href="javascript:void(0);" class="btn btn-danger fa fa-edit edit-groupField">编辑</a>
				<a href="javascript:void(0);" class="btn btn-danger fa fa-delete delete-tr">删除</a>
												
			</td>
		</tr>
	</textarea>
	<textarea id="buttonsTemplate" style="display: none;">
		<tr>
			<td>
				<input type="hidden" name="buttonName" value="#buttonName">
				<input type="hidden" name="buttonIcon" value="#buttonIcon">
				<input type="hidden" name="buttonOnclick" value="#buttonOnclick">
				<span class="buttonName-span">#buttonName</span>
			</td>
			<td>
				<i  id="iconImg"  class="fa #buttonIcon"></i>
			</td>
			<td>
				<span class="buttonOnclick-span">#buttonOnclick</span>
			</td>
			<td>
				<a href="javascript:void(0);" class="btn btn-danger fa fa-edit edit-buttons" >编辑</a>
				<a href="javascript:void(0);" class="btn btn-danger fa fa-delete delete-tr">删除</a>
												
			</td>
		</tr>
	</textarea>
	
	
</html>