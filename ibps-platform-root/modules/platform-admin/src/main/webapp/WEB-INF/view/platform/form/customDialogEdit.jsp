<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/qtip.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/customDialog.js"></script>
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
					<form class="form-horizontal" id="customDialogForm"  action="save.htm"   method="post"  >
							<div class="form-group">
								<div  class="group">
	                                <label class="col-sm-2 control-label">名称:</label>
	                                <div class="col-sm-4">
	                               		 <input type="text" data-pinyin="#alias"  id=name name="name"  class="form-control" validate="{required:true,maxlength:192}"  value="${customDialog.name}"/>
	                                </div>
                                 </div>
                                 <div  class="group">
	                                 <label class="col-sm-2 control-label">别名:</label>
	                                <div class="col-sm-4">
	                                	<input type="text" id="alias" name="alias"  class="form-control" validate="{required:true,maxlength:192}"  value="${customDialog.alias}"/>
	                                </div>
	                             </div>
                            </div>
							<div class="form-group">
							    <div  class="group">
	                                <label class="col-sm-2 control-label">显示样式:</label>
	                                <div class="col-sm-4">
										<label class="radio-inline">
											<input value="0" type="radio"  class="ibps"  name="style"  id="listRadio"  <c:if test="${customDialog==null || customDialog.style==0}">checked="checked"</c:if>/>
											<span class="lbl">列表</span>
										</label>
										<label class="radio-inline">
											<input value="1" type="radio" class="ibps"  name="style"  id="treeRadio"  <c:if test="${customDialog.style==1}">checked="checked"</c:if>/>
											<span class="lbl">树形</span>
										</label>
	                                </div>
                                </div>
                               <div  class="group">
                                 <label class="col-sm-2 control-label">尺寸<i class="fa fa-help" data-tip title="如果填写小于100 则按百分比算尺寸;大于100,则按px算尺寸。" ></i>:</label>
                                   <div class="col-sm-4">
	                                   		<div class="input-group  col-sm-10">
	                                   				<span class="input-group-addon">宽度</span>
	                                        		<input type="text" name="width" value="${customDialog.width}"  class="form-control"/>
	                                        		<span class="input-group-addon">高度</span>
		                                        	<input type="text" name="height" value="${customDialog.height}"  class="form-control"/>
	                                    	</div>
                                   </div>
                                  </div>
                            </div>
							<div class="form-group" >
                                <label class="col-sm-2 control-label" >是否分页:</label>
                                <div class="col-sm-10">
	                                <label class="radio-inline">
										<input type="radio" name="needPage" value="0" class="ibps"  <c:if test="${customDialog.needPage==0}">checked="checked"</c:if>>
										<span class="lbl">不分页</span>
									</label>
									<label class="radio-inline">
										<input type="radio" name="needPage" value="1" class="ibps"  <c:if test="${customDialog==null || customDialog.needPage==1}">checked="checked"</c:if>/>
										<span class="lbl">分页</span>
									</label>
                                	<span <c:if test="${customDialog.needPage==0}">display:none;</c:if>" id="spanPageSize" name="spanPageSize" style="position: fixed;margin-top: 6px;margin-left: 5px;">
										<font class="red">分页大小：</font>
									  <select id="pageSize" name="pageSize" class="inputText">
									  		<option value="5" <c:if test="${customDialog.pageSize==5}">selected="selected"</c:if> >5</option>
											<option value="10" <c:if test="${customDialog.pageSize==10}">selected="selected"</c:if>>10</option>
											<option value="15" <c:if test="${customDialog.pageSize==15}">selected="selected"</c:if> >15</option>
											<option value="20" <c:if test="${customDialog==null || customDialog.pageSize==20}">selected="selected"</c:if>>20</option>
											<option value="50" <c:if test="${customDialog.pageSize==50}">selected="selected"</c:if>>50</option>						  
									  </select>
								 </span>
                                </div>
                            </div>
						<div class="form-group">
                                <label class="col-sm-2 control-label">是否多选:</label>
                                <div class="col-sm-4">
                               		 <label class="radio-inline">
										<input  type="radio" name="selectNum"  value="1"   class="ibps"  <c:if test="${customDialog.selectNum=='1'}">checked="checked"</c:if>>
										<span class="lbl">单选项</span>
									</label>
									<label class="radio-inline">
										<input type="radio"  name="selectNum"   value="0"  class="ibps"  <c:if test="${customDialog==null || customDialog.selectNum=='0'}">checked="checked"</c:if>>
										<span class="lbl">多选项</span>
									</label>
                                </div class="col-sm-4">
                                  <label class="col-sm-2 control-label">内部对话框:</label>
                                  <div class="col-sm-4">
                                  		  <select id="system" name="system"   class="form-control"  >
									  		<option value="0" <c:if test="${customDialog==null || customDialog.system==0}">selected="selected"</c:if> >否</option>
											<option value="1" <c:if test="${customDialog.system==1}">selected="selected"</c:if>>是</option>
									  </select>
                                  </div>
                            </div>
						<div class="form-group" >
							 <label class="col-sm-2 control-label">数据源:</label>
							 <div class="col-sm-4">
							 	<select id="dataSource" name="dsalias" class="form-control">
										<c:forEach items="${dsList}" var="ds">
											<option value="${ds.alias}"  <c:if test="${customDialog.dsalias == ds.alias }"></c:if>>${ ds.name} </option>
										</c:forEach>
									</select>
							 </div>
							  <label class="col-sm-2 control-label">查询表(视图):</label>
							   <div class="col-sm-4">
							              	<div class="col-sm-4"  style="padding-left:0px;padding-right: 0px;">
	                                		<select name="isTable" id="isTable" class="form-control">
												<option value="1">表</option>
												<option value="0">视图</option>
											</select>
										</div>
										<div class="col-sm-8" style="padding-left: 2px;">
		                                	<div class="input-group">	
		                                		<input type="text"  id="objectname"  name="objectname" class="form-control"/>
		                                		<span class="input-group-btn">
		                                			<button id="btnSearch" type="button" class="btn  btn-info "><i class="fa fa-search"></i>&nbsp;&nbsp;查询</button>
		                                		</span>
		                                	</div>
	                                	</div>
							   </div>
						</div>
						<div class="form-group">
							 <label class="col-sm-2 control-label">
							 	<c:choose>
									<c:when test="${empty customDialog.id}">选择表或视图:</c:when>
									<c:otherwise>设置列：</c:otherwise>								
								</c:choose>
							</label>
							 <div class="col-sm-10">
									<a href="javascript:;" id="btnSetting" class="btn btn-primary fa fa-edit" >设置列</a>
								<c:choose>
									<c:when test="${empty customDialog.id}">
										<br>
										<select id="objName" name="objName" size="10" style="width:50%;" class="form-control"></select>
									</c:when>
									<c:otherwise >
										<input type="hidden"  id="objName" name="objName" value="${customDialog.objName}" />
									</c:otherwise>
								</c:choose>
							</div>
					   </div>
					</div>
					<!-- 非数据库字段 -->
					<input type="hidden" id="styletemp"  value="${customDialog.style}" />
					<input type="hidden" id="settingobj" value="${customDialog.objName}" />
					
					<input type="hidden"  name="id" value="${customDialog.id}" />
					<textarea id="displayfield" name="displayfield"  style="display: none;">${fn:escapeXml(customDialog.displayfield)}</textarea>
					<textarea  id="conditionfield"  name="conditionfield" style="display: none;">${fn:escapeXml(customDialog.conditionfield)}</textarea>
					<textarea  id="resultfield"  name="resultfield" style="display: none;">${fn:escapeXml(customDialog.resultfield)}</textarea>
					<textarea  id="sortfield"  name="sortfield" style="display: none;">${fn:escapeXml(customDialog.sortfield)}</textarea>
					</form>
				</div>
		</div>
	</body>
</html>