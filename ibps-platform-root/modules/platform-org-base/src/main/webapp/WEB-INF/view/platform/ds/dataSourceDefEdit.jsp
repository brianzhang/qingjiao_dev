<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/ds/dataSourceDef.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/html"  id='paramTem'>
		    {{each list as item i}}
				<tr  id="param">
 					<td id="name"><span id="name">{{item.name}}</span></td>
  					<td ><input type="text" id="comment" value="{{item.comment}}"/></td>
		       		<td><span id="type">{{item.type}}</span></td>
					<td ><input type="text" id="value"  value="{{item.value}}"/></td>
		        	<td>
							<select id="isReq">
									<option value="0"  {{if item.isReq==0}} selected = "selected"{{/if}}>否</option>
									<option value="1"  {{if item.isReq==1}} selected = "selected"{{/if}}>是</option>
							</select>
					</td>
		        	<td>
							<a class="btn btn-primary fa fa-long-arrow-up"   href="javascript:void(0);" id="up" onclick="dataSourceDef._moveParam(this,true)">上移</a>
							<a class="btn btn-primary fa fa-long-arrow-down"   href="javascript:void(0);" id="down" onclick="dataSourceDef._moveParam(this,false)">下移</a>
							<a class="btn btn-primary fa fa-remove"   href="javascript:void(0);" id="del" onclick="dataSourceDef._del(this)"> 删除</a>
					</td>
				</tr>
			{{/each}}
		</script>
	</head>
	<body>
	
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save"  ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa"  id="getParam"><span>重新加载参数</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="dataSourceDefForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">名称:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${dataSourceDef.name}"  validate="{required:true,maxlength:120}"/>
                                    <input type="hidden" id="oldName" name="oldName" value="${dataSourceDef.name}" />
                                    <span style="display:none" id = "nameJson">${nameJson }</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">别名:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="alias" name="alias" value="${dataSourceDef.alias}"  validate="{required:false,maxlength:120}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">初始化方法:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="initMethod" name="initMethod" value="${dataSourceDef.initMethod}"  validate="{required:false,maxlength:120}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">关闭方法:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="closeMethod" name="closeMethod" value="${dataSourceDef.closeMethod}"  validate="{required:false,maxlength:120}"/>
                               		<span>格式：classPath|method<br>例：org.logicalcobwebs.proxool.ProxoolFacade|shutdown</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">说明:</label>
                                <div class="col-sm-10">
                                    <textarea   class="form-control"   id="comment" name="comment" >${dataSourceDef.comment}</textarea>  
                                </div>
                            </div>
		<%-- 			<div class="form-group">
                                <label class="col-sm-2 control-label">数据源全路径:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="classPath" name="classPath" value="${dataSourceDef.classPath}"  validate="{required:false,maxlength:384}"/>
                                    <select id="classPath"  name="classPath"  class="form-control"  >
                                    	<!-- <option></option> -->
                                    	<c:forEach var="def"  items="${allDefConfig}"  >
                                    		<option value="${def}" >${def}</option>
                                    	</c:forEach>
                                    </select>
                                </div>
                            </div> --%>
                                    <input type="hidden"  id="variables" name="variables"  />
							<div class="row m-t-sm">
                               		<div class="col-sm-12">
                               			 <div class="panel blank-panel">
                               			 	 <div class="panel-heading">
		                                        <div class="panel-options">
		                                            <ul class="nav nav-tabs">
		                                                <li class="active"><a href="#paramTab" data-toggle="tab" >参数配置</a>
		                                                </li>
		                                            </ul>
		                                        </div>
		                                    </div>
		                                     <div class="panel-body">
	                                        	<div class="tab-content">
		                                            <div class="tab-pane active" id="paramTab">
		                                            	 <table class="table table-striped">
		                                                    <thead>
		                                                        <tr>
		                                                            <th>名称</th>
		                                                            <th>描述</th>
		                                                            <th>参数类型</th>
		                                                            <th>默认值</th>
		                                                            <th>是否必填</th>
		                                                            <th>管理</th>
		                                                        </tr>
		                                                    </thead>
		                                                    <tbody id="paramView">
			                                                    <c:forEach var="variableDef"  items="${dataSourceDef.variableDefs}">
				                                                    <tr  id="param">
													 					<td id="name"><span id="name">${variableDef.name}</span></td>
													  					<td ><input type="text" id="comment"  value="${variableDef.comment}"/></td>
															       		<td><span id="type">${variableDef.type}</span></td>
													  					<td ><input type="text"  id="value"  value="${variableDef.value}"/></td>
															        	<td>
																				<select id="isReq">
																						<option value="0"  <c:if test="${variableDef.isReq==0 } ">selected = "selected"</c:if>>否</option>
																						<option value="1"  <c:if test="${variableDef.isReq==1 } ">selected = "selected"</c:if>>是</option>
																				</select>
																		</td>
															        	<td>
																				<a class="btn btn-primary fa fa-long-arrow-up"   href="javascript:void(0);" id="up" onclick="dataSourceDef._moveParam(this,true)">上移</a>
																				<a class="btn btn-primary fa fa-long-arrow-down"   href="javascript:void(0);" id="down" onclick="dataSourceDef._moveParam(this,false)">下移</a>
																				<a class="btn btn-primary fa fa-remove"   href="javascript:void(0);" id="del" onclick="dataSourceDef._del(this)"> 删除</a>
																		</td>
																	</tr>
			                                                    </c:forEach>
		                                                    </tbody>
		                                                </table>

		                                            </div>
	                                            </div>
                                            </div>
		                                    
                               			 </div>
                               		</div>
                            </div>
					</form>
				</div>
		</div>
	</body>
</html>