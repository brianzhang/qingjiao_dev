<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/ds/dataSource.js"></script>
		<script type="text/html"  id='paramTem'>
		    {{each list as item i}}
				<div class="form-group {{if item.isReq==1}}has-error{{/if}}">
                       <label class="col-sm-3 control-label">
								{{if item.comment==''}} 
										{{ item.name}}:
								{{else}}
										{{item.comment}}:
								{{/if}}
						</label>
                        <div class="col-sm-9">
                              <input type="text"  class="form-control"  id="{{item.name}}" variable="variable"
									comment="{{item.comment}}" type="{{item.type}}"  isReq="{{item.isReq}}"
								 value="{{if item.value}}"  validate="{required:{{if item.isReq==1}}true{{else}}false{{/if}}}"/>
							{{item.type}}
                        </div>
                 </div>
			{{/each}}
		</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-bug"  id="testConn"><span>测试链接</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="dataSourceForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-3 control-label">名称:</label>
                                <div class="col-sm-9">
                                	<input type="text" class="form-control"  id="name" name="name" value="${dataSource.name}"  data-pinyin="#alias"    validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">别名:</label>
                                <div class="col-sm-9">
                                	<input type="text"  class="form-control"  id="alias" name="alias" value="${dataSource.alias}"  validate="{required:true,maxlength:60,varirule:true}"/>
                                	<input type="hidden"  class="form-control"  id="oldAlias" name="oldAlias" value="${dataSource.alias}"  />
                                	 <span style="display:none" id = "aliasJson">${aliasJson }</span>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">数据库类型:</label>
                                <div class="col-sm-9">
                                    <select id="dbType" name="dbType" class="form-control" >
                                    	<option value="">-请选择类型-</option>
                                    	<option value="mysql"  <c:if test="${dataSource.dbType=='mysql'}">selected = "selected"</c:if>>mysql</option>
                                    	<option value="oracle" <c:if test="${dataSource.dbType=='oracle'}">selected = "selected"</c:if>>oracle</option>
                                    	<option value="sqlserver"  <c:if test="${dataSource.dbType=='sqlserver'}">selected = "selected"</c:if>>sqlserver</option>
                                    </select>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">数据库驱动:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control"  id="driver" name="driver" value="${dataSource.driver}"  validate="{required:true}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">链接地址:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control"  id="driverUrl" name="driverUrl" value="${dataSource.driverUrl}"  validate="{required:true,maxlength:200}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">用户名:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control"  id="user" name="user" value="${dataSource.user}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">密码:</label>
                                <div class="col-sm-9">
                                    <input type="password" class="form-control"  id="password" name="password" value="${dataSource.password}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">确认密码:</label>
                                <div class="col-sm-9">
                                    <input type="password" class="form-control"  id="confirmPwd" name="confirmPwd" value="${dataSource.password}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">是否默认:</label>
                                <div class="col-sm-9">
                                	<c:if test="${dataSource.isDefault==false}"><div class="form-control">否</div></c:if>
                                	<c:if test="${dataSource.isDefault==true}"><div class="form-control">是</div></c:if>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">状态:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control"  id="status" name="status" value="${dataSource.status}"  validate="{required:false,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-3 control-label">说明:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control"  id="comment" name="comment" value="${dataSource.comment}"  validate="{required:false,maxlength:384}"/>
                                </div>
                            </div>
                        
                            
                             <textarea id="variableJson"  style="display: none;">${fn:escapeXml(variableJson)}</textarea>
                            <input type="hidden"  id="paramMap"  value="${dataSource.param }"/>
                            
                           <%--  <c:choose>
	                            <c:when test="${ dataSource.name==null }">
	                            	<div class="form-group">
		                                <label class="col-sm-3 control-label">数据源模板:</label>
		                                <div class="col-sm-9">
		                                    <select id="classPath"  class="form-control"  >
		                                    	<!-- <option></option> -->
		                                    	<c:forEach var="def"  items="${defNameList}"  >
		                                    		<option value="${def}" >${def}</option>
		                                    	</c:forEach>
		                                    </select>
		                                </div>
		                            </div>
	                            </c:when>
	                            <c:otherwise>
	                            	<input type="hidden"  id="classPath"  />
	                            </c:otherwise>
                            </c:choose> --%>
                            
                            <%-- 扩展 --%>
                            <input type="hidden"  id="variableJson" name="variableJson" />
                            <input type="hidden"  id="paramJson" name="paramJson"  />
                            <input type="hidden"  id="initMethod"  value="${dataSourceDef.initMethod}"/>
                            <input type="hidden"  id="closeMethod"  value="${dataSourceDef.closeMethod}" />
                            <input type="hidden"  id="classPath"  value="${dataSourceDef.classPath}" />
                             <div id="paramView">  
                            	<c:forEach var="variableDef"  items="${dataSourceDef.variableDefs }">
	                            	<div class="form-group">
		                            	 <label class="col-sm-3 control-label">
		                            	 <c:choose>
		                            	 	<c:when test=" ${variableDef.comment=='' }"> ${variableDef.name }:</c:when>
		                            	 	<c:otherwise>${variableDef.comment }</c:otherwise>
		                            	 </c:choose>
		                            		
		                            	 </label>
		                                <div class="col-sm-9">
		                                    <input type="text" class="form-control"   id="${variableDef.name }" variable="variable"
												comment="${variableDef.comment }"  type="${variableDef.type }"  isReq="${variableDef.isReq }"
											 value="${variableDef.value }"   <c:if test="${variableDef.isReq==1 }"> validate="{required:true}" </c:if>/>
											 ${variableDef.type }
		                                </div>
		                            </div>
                            	</c:forEach>
                         </div>  
					</form>
				</div>
		</div>
	</body>
</html>