<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/customQuery.js"></script>
	</head>
	<body >
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="customQueryForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" data-pinyin="#alias"  class="form-control"  id="name" name="name"  value="${customQuery.name}"  validate="{required:true,maxlength:128}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">别名<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="alias" name="alias"  value="${customQuery.alias}"  validate="{required:true,maxlength:64}"/>
                                </div>
                            </div>
							<div class="form-group" >
								<label class="col-sm-2 control-label">数据源<span class="required">*</span>:</label>
                                <div class="col-sm-4">
                                <select class="form-control"  style="width: 200px"  name="dsalias" id="dataSource">
                                	<option value="dataSource_default">本地数据源 </option>
										<c:forEach items="${dsList}" var="ds">
											<option value="${ds.alias}">${ ds.name}</option>
										</c:forEach>
                                </select>
                                </div>
                                 <label class="col-sm-2 control-label">查询表(视图):</label>
                                <div  class="col-sm-4">
	                                	<div class="col-sm-4"  style="padding-left:0px;padding-right: 0px;">
	                                		<select name="isTable" id="isTable" class="form-control">
												<option value="1">表</option>
												<option value="0">视图</option>
											</select>
										</div>
										<div class="col-sm-8" style="padding-left: 2px">
		                                	<div class="input-group">	
		                                		<input type="text"  name="objectname" class="form-control"/>
		                                		<span class="input-group-btn">
		                                			<button id="btnSearch" type="button" class="btn  btn-info "><i class="fa fa-search"></i>&nbsp;&nbsp;查询</button>
		                                		</span>
		                                	</div>
	                                	</div>
                                </div>
							</div>
						
							<div class="form-group">
                                 <label class="col-sm-2 control-label">选择表或视图:<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                		<a  id="btnSetting" href="javascript:void(0)" class="btn btn-info fa fa-edit">设置列</a></br>
                                		<c:choose>
											<c:when test="${empty customQuery.id}">
												<select id="objname" name="objName" size="10" style="width:98%;"  class="form-control"  validate="{required:true}">
												</select>
											</c:when>
											<c:otherwise >
												<input type="hidden"  id="objname" name="objName" value="${customQuery.objName}" />
											</c:otherwise>
										</c:choose>
									
                                </div>
                            </div>
		
					<input type="hidden" name="id" value="${customQuery.id}" />
					<input type="hidden" id="settingobj" value="${customQuery.objName}" />
					<textarea  id="conditionfield"  name="conditionfield" style="display: none;">
						${customQuery.conditionfield}
					</textarea>
					<textarea  id="resultfield"  name="resultfield" style="display: none;">
						${customQuery.resultfield}
					</textarea>				
					<textarea  id="sortfield"  name="sortfield" style="display: none;">
						${customQuery.sortfield}
					</textarea>
					</form>
				</div>
		</div>
	</body>
</html>