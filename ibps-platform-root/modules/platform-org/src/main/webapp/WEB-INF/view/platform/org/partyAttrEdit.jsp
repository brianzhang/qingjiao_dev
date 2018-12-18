<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript"
			src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyAttr.js"></script>
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
					<form class="form-horizontal" id="partyAttrForm"  action="save.htm"   method="post"  >
						<div class="form-group">
                            <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" name="name" value="${partyAttr.name}" data-pinyin="#key" validate="{required:true,maxlength:255}"/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="col-sm-2 control-label">业务主键<span class="required">*</span>:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="key" name="key" value="${partyAttr.key}"  validate="{required:true,maxlength:255}"/>
                            </div>
                        </div>
                           
						<div class="form-group">
                               <label class="col-sm-2 control-label">所属参与者类型:</label>
                               <div class="col-sm-10">
                               	<select class="form-control search-select"  id="partyType" name="partyType" validate="{required:true,maxlength:120}">
									<c:forEach items="${partyTypes }" var="partyType">
									<option value="${partyType.value }" 
										<c:if test="${partyAttr.partyType eq partyType.value }">selected="selected"</c:if> >
										${partyType.label }
									</option>
									</c:forEach>
								</select>
                               </div>
                           </div>
                           
						<div class="form-group">
                            <label class="col-sm-2 control-label">属性类型:</label>
                            <div class="col-sm-10">
                             	<select class="form-control search-select"  id="type" name="type" validate="{required:true,maxlength:120}">
									<c:forEach items="${partyAttrTypes }" var="partyAttrType">
									<option value="${partyAttrType.value }" 
										<c:if test="${partyAttr.type eq partyAttrType.value }">selected="selected"</c:if> >
										${partyAttrType.label }
									</option>
									</c:forEach>
								</select>
                            </div>
                        </div>
                           
                           <div class="form-group">
                               <label class="col-sm-2 control-label">数据类型:</label>
                               <div class="col-sm-10">
                               	<select class="form-control search-select"  id="dataType" name="dataType" validate="{required:true,maxlength:120}">
								<c:forEach items="${partyAttrDataTypes }" var="partyAttrDataType">
								<option value="${partyAttrDataType.value }"
									<c:if test="${partyAttr.dataType eq partyAttrDataType.value }">selected="selected"</c:if> >
									${partyAttrDataType.label }
								</option>
								</c:forEach>
								</select>
                               </div>
                           </div>
                           
                           <div class="form-group" id="isMulti" hidden="true">
                               <label class="col-sm-2 control-label">是否多选:</label>
                               <div class="col-sm-10">
                               	<select class="form-control search-select"  id="isMulti" name="isMulti" validate="{required:true,maxlength:120}">
									<option value="">请选择</option>
									<option value="Y"
										<c:if test="${partyAttr.isMulti eq 89 }">selected="selected"</c:if> >
										是
									</option>
									<option value="N"
										<c:if test="${partyAttr.isMulti eq 78 }">selected="selected"</c:if> >
										否
									</option>
								</select>
                               </div>
                           </div>
                           
                          <div class="form-group" id="xuanzexiang" hidden="true">
							<label class="col-sm-2 control-label">自定义选择项<spanclass="required">*</span>:
							</label>
							<div class="col-sm-10">
								<div id="selectItems">
									<table class="" type="arrayData" >
										<thead>
											<tr>
												<th colspan="5" style="width: 10%;">
													<a href="#" onclick="partyAttr.addSelectItem()" class="btn btn-info fa fa-add">添加项</a>
												</th>
											</tr>
										</thead>
										<tbody id="selectItem">
										<c:forEach items="${options}" var="keyValue">
											<tr type="arrayItem">
												<td style="text-align: right;width:10%;">
													<label class="control-label">选项:</label>
												</td>
												<td>
													<input class="form-control" validate="{required:true,maxlength:120}" 
													type="text" name="groupName"
													value="${keyValue.groupName}">
												</td>
												<td style="text-align: right;width:10%;">
													<label class="control-label">值:</label>
												</td>
												<td>
													<input class="form-control" validate="{required:true,maxlength:120}" 
													type="text" name="value" 
													value="${keyValue.value}">
												</td>
												<td style="text-align: center;width:15%;">
													<a href="#" class="btn btn-info fa fa-delete " onclick="partyAttr.delSelectItem(this);">删除</a>
												</td>
											</tr>
										</c:forEach>
										</tbody>
									</table>
								</div>
							</div>
						</div>
                            
                        <input type="hidden" name="createTime" value="<fmt:formatDate value='${partyAttr.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/>" />
						<input type="hidden" name="id" value="${partyAttr.id}" />
					</form>
				</div>
		</div>
	</body>
</html>