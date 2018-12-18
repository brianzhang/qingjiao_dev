<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		
		<style type="text/css">
			.table>thead>tr>td,.table>tbody>tr>td,.table>tfoot>tr>td{
				padding:3px;
			}
		</style>
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
				<form class="form-horizontal" id="tableConfigForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
							<div class="group">
		                        <label class="col-sm-2 control-label">表来源:</label>
		                        <div class="col-sm-4">
		                        	<div style="position: relative;">
		                            <input type="hidden" id="tableSource" name="tableSource" value="${tableConfig.tableSource}"/>
			                        <input type="text" class="form-control dropdownTree" id="tableSourceName" name="tableSourceName" 
		                            	data-toggle="dropdownTree" data-dic="tableSource" 
		                            	data-key="#tableSource" validate="{required:true}" readonly
		                            	value="${f:getDictLabel(tableConfig.tableSource, 'tableSource', 'key', '')}"/>
		                            </div>
		                        </div>
		                    </div>
							<div class="group hidden" id="boDiv">
		                        <label class="col-sm-2 control-label">业务对象:</label>
		                        <div class="col-sm-4">
									<div class="fr-bodef" data-toggle="bodef" data-single="true" data-table="Y" data-type="" data-bind-id="boId">
										<ul class="selector-list"></ul>
										<textarea style="display: none" id="boId" name="boId" >${tableConfig.boId }</textarea>
										<textarea style="display: none" id="boName" name="boName" data-control="bodef" validate="{required:true}">${tableConfig.boName }</textarea>
									 </div>
		                        </div>
		                    </div>
		                    <div class="group hidden" id="dsAliasDiv">
								<label class="col-sm-2 control-label">数据源:</label>
								<div class="col-sm-4">
									<select id="dsAlias" name="dsAlias" class="form-control">
										<c:forEach items="${dataSourceList}" var="dataSource">
										<option value="${dataSource.alias}">${dataSource.name}</option>
										</c:forEach>
									</select>
								</div>
							</div> 
	                    </div>
	                    
	                    <div class="form-group">
		                    <div class="group">
		                        <label class="col-sm-2 control-label">表名:</label>
		                        <div class="col-sm-4">
		                            <select id="tableName" name="tableName" class="form-control"
		                             data-value="${tableConfig.tableName }"
		                             data-comment="${tableConfig.tableComment }"
		                             data-toggle="select2" data-multiple="false"
		                             data-ajax="${ctx }/platform/codegen/tableConfig/tableList.htm"
		                             validate="{required:true}"
		                             >
									</select>
		                        </div>
		                    </div>
		                    <div class="group">
		                        <label class="col-sm-2 control-label">注释:</label>
		                        <div class="col-sm-4">
		                            <input type="text" class="form-control" id="tableComment" name="tableComment" value="${tableConfig.tableComment}"  validate="{required:true,maxlength:192}"/>
		                        </div>
		                    </div>
	                    </div>
	                    
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">类名:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="className" name="className" value="${tableConfig.className}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
	                    <div class="group">
	                        <label class="col-sm-2 control-label">布局模板:</label>
	                        <div class="col-sm-4">
	                        	<div style="position: relative;">
									<input type="hidden" id="layerTemplate" name="layerTemplate" value="${tableConfig.layerTemplate}"/>
			                        <input type="text" class="form-control dropdownTree" name="layerTemplateName" 
		                            	data-toggle="dropdownTree" data-dic="layerTemplate" 
		                            	data-key="#layerTemplate" validate="{required:true}" 
		                            	value="${f:getDictLabel(tableConfig.layerTemplate, 'layerTemplate', 'key', '')}"/>
		                            </div>
	                        </div>
	                    </div>
	                    </div>
	                    
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">主表表名:</label>
	                        <div class="col-sm-4">
	                            <select id="parentTableName" name="parentTableName" class="form-control"
	                             data-value="${tableConfig.parentTableName }"
	                             data-toggle="select2" data-multiple="false"
	                             data-clear="true"
	                             data-ajax="${ctx }/platform/codegen/tableConfig/ptableList.htm"
	                             >
	                             </select>
	                        </div>
	                    </div>
	                    <div class="group">
	                        <label class="col-sm-2 control-label">分类:</label>
	                        <div class="col-sm-4">
	                        	<div style="position: relative;">
		                            <input type="hidden" class="form-control"  id="typeId" name="typeId" value="${tableConfig.typeId}"/>
	                        		<input type="text" class="form-control dropdownTree" id="typeName"
	                                  	data-toggle="dropdownTree"  data-type="TEMPLATE_TYPE" data-id="#typeId" readonly value="${tableConfig.typeName}"
	                                  	validate="{required:false,maxlength:64}"  />
                                  </div>
	                        </div>
                        </div>
	                    </div>
	                    
	                    <div class="form-group" id="subTblDiv">
	                    	<div id="foreignKeyDiv" class="group">
		                        <label class="col-sm-2 control-label">外键:</label>
		                        <div class="col-sm-2">
		                            <select id="foreignKey" name="foreignKey" class="form-control"
		                             data-value="${tableConfig.foreignKey }"
		                             data-toggle="select2" data-multiple="false"
		                             data-ajax="${ctx }/platform/codegen/tableConfig/columnList.htm"
		                             validate="{required:true}"
		                             >
		                             </select>
		                        </div>
		                    </div>
	                    	<div id="fromKeyDiv" class="group">
		                        <label class="col-sm-2 control-label">来自属性:</label>
		                        <div class="col-sm-2">
		                            <select id="fromKey" name="fromKey" class="form-control"
		                             data-value="${tableConfig.fromKey }"
		                             data-toggle="select2" data-multiple="false"
		                             data-ajax="${ctx }/platform/codegen/tableConfig/pcolumnList.htm"
		                             validate="{required:true}"
		                             >
		                             </select>
		                        </div>
		                    </div>
		                    <div class="group">
		                        <label class="col-sm-2 control-label">关系类型:</label>
		                        <div class="col-sm-2">
		                            <select id="relation" name="relation" class="form-control" validate="{required:true}">
                              			<option value="">请选择</option>
                              			<option value="one2one" <c:if test="${tableConfig.relation == 'one2one' }">selected="selected"</c:if> >一对一</option>
                              			<option value="one2many" <c:if test="${tableConfig.relation == 'one2many' }">selected="selected"</c:if> >一对多</option>
                              		</select>
		                        </div>
		                     </div>
	                    </div>
	                    
	                    <div class="form-group">
						<div class="group">
							
	                        <label class="col-sm-2 control-label">展现形式:</label>
	                        <div class="col-sm-4" id="struType">
                            	<label class="radio-inline">
                               	 	<input type="radio" class="ibps" value="list" name="struType" <c:if test="${empty tableConfig || empty tableConfig.struType || tableConfig.struType == 'list'}">checked</c:if> />
                               	 	<span class="lbl">列表</span>
                                </label>
                                <label class="radio-inline">
                               	 	<input type="radio" class="ibps"  value="tree" name="struType" <c:if test="${tableConfig.struType == 'tree'}">checked</c:if> />
                               	 	<span class="lbl">树形</span>
                                </label>
	                        </div>
	                    </div>
	                    <div class="group">
	                   		<div id="idKeyDiv">
	                        <label class="col-sm-2 control-label">节点ID字段:</label>
	                        <div class="col-sm-4">
	                        	<select id="idKey" name="idKey" class="form-control"
		                             data-value="${tableConfig.idKey }"
		                             data-toggle="select2" data-multiple="false"
		                             data-ajax="${ctx }/platform/codegen/tableConfig/columnList.htm"
		                             validate="{required:true}"
		                             >
		                         </select>
	                        </div>
	                        </div>
                        </div>
	                    </div>
	                    
	                    <div class="form-group">
						<div class="group">
							<div id="pIdKeyDiv">
	                        <label class="col-sm-2 control-label">父节点ID字段:</label>
	                        <div class="col-sm-4">
	                        	<select id="pidKey" name="pidKey" class="form-control"
		                             data-value="${tableConfig.pidKey}"
		                             data-toggle="select2" data-multiple="false"
		                             data-ajax="${ctx }/platform/codegen/tableConfig/columnList.htm"
		                             validate="{required:true}"
		                             >
		                         </select>
	                        </div>
							</div>
	                    </div>
	                    <div class="group">
	                    	<div id="keyDiv">
	                        <label class="col-sm-2 control-label">节点名称:</label>
	                        <div class="col-sm-4">
	                        	<select id="key" name="key" class="form-control"
		                             data-value="${tableConfig.key}"
		                             data-toggle="select2" data-multiple="false"
		                             data-ajax="${ctx }/platform/codegen/tableConfig/columnList.htm"
		                             validate="{required:true}"
		                             >
		                         </select>
		                    </div>	
	                        </div>
                        </div>
	                    </div>
	                    
 						<input type="hidden" name="id" value="${tableConfig.id}" />
 						<input type="hidden" name="creator" value="${tableConfig.creator}" />
 						<input type="hidden" name="createTime" value="<fmt:formatDate value="${tableConfig.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/>" />
					</div>
					
					<div class="form-group">
						<div class="col-sm-12 table-responsive">
							<table name="fieldConfigPoList" class="table table-bordered table-hover table-condensed">
								<caption>
									<label class="col-sm-12 text-center">字段列表</label>
								</caption>
								<thead>
									<tr>
										<td style="width:46px;">序号</td>
										<td>列名</td>
										<td>列注释</td>
										<td style="width:80px;">物理类型</td>
										<td style="width:80px;">JAVA类型</td>
										<td>JAVA属性名</td>
										<td style="width:46px;">主键</td>
										<td style="width:56px;">
										<label class="checkbox-inline" style="padding-top: 0px; "> <input class="ibps" type="checkbox" name="showList"><span class="lbl">列表</span></label>
										</td>
										<td style="width:56px;">
										<label class="checkbox-inline" style="padding-top: 0px; "> <input class="ibps" type="checkbox" name="showQuery"><span class="lbl">查询</span></label>
										</td>
										<td>控件类型</td>
										<td style="width:56px;">排序</td>
									</tr>
								</thead>
								<tbody>
									<c:forEach var="fieldConfigPo" varStatus="status" items="${tableConfig.fieldConfigPoList}">
									   <tr>
											<td>${status.index + 1}</td>
										   	<td>
												<input type="hidden" name="field" value="${fieldConfigPo.field}" />
												<span>${fieldConfigPo.field}</span>
											</td>
										   	<td>
												<div class="form-group form-group-clear">
												<div class="col-sm-12">
												<input type="text" class="form-control" name="fieldComment" value="${fieldConfigPo.fieldComment}"  validate="{required:true,maxlength:40}"/>
												</div>
												</div>
											</td>
										   	<td>
												<input type="hidden" name="sqlType" value="${fieldConfigPo.sqlType}" />
												<input type="hidden" name="length" value="${fieldConfigPo.length}" />
												<input type="hidden" name="precision" value="${fieldConfigPo.precision}" />
												<input type="hidden" name="scale" value="${fieldConfigPo.scale}" />
												<span>${fieldConfigPo.sqlType}</span>
											</td>
										   	<td>
												<div class="form-group form-group-clear">
												<div class="col-sm-12">
												<input type="text" class="form-control" name="javaType" value="${fieldConfigPo.javaType}"  validate="{required:true,maxlength:40}"/>
												</div>
												</div>
											</td>
										   	<td>
												<div class="form-group form-group-clear">
												<div class="col-sm-12">
												<input type="text" class="form-control" name="propName" value="${fieldConfigPo.propName}" validate="{required:true,maxlength:40}" <c:if test="${tableConfig.tableSource == 'bo'}">readonly</c:if>/>
												</div>
												</div>
											</td>
										   	<td>
												<input type="hidden" name="keyName" value="${fieldConfigPo.keyName}" />
												<c:if test="${fieldConfigPo.keyName == 'pk'}"><span style="color:red">是</span></c:if>
												<c:if test="${fieldConfigPo.keyName != 'pk'}"><span>否</span></c:if>
											</td>
										   	<td>
												<label class="checkbox-inline" style="padding-top: 0px; "> <input class="ibps" type="checkbox" name="showList" <c:if test="${fieldConfigPo.showList == 'Y'}">checked</c:if> ><span class="lbl"></span></label>
											</td>
										   	<td>
												<label class="checkbox-inline" style="padding-top: 0px; "> <input class="ibps" type="checkbox" name="showQuery" <c:if test="${fieldConfigPo.showQuery == 'Y'}">checked</c:if> ><span class="lbl"></span></label>
											</td>
										   	<td>
												<div class="form-group form-group-clear">
												<div class="col-sm-12">
													<div style="position: relative;">
														<input type="hidden" id="control${status.index + 1}" name="control" value="${fieldConfigPo.control}"/>
								                        <input type="text" class="form-control dropdownTree" 
							                            	data-toggle="dropdownTree" data-dic="fieldControl" 
							                            	data-key="#control${status.index + 1}" validate="{required:true}" 
							                            	value="${f:getDictLabel(fieldConfigPo.control, 'fieldControl', 'key', '')}"/>
						                            	</div>
					                            </div>
					                            </div>
											</td>
										   	<td>
												<div class="form-group form-group-clear">
												<div class="col-sm-12">
												<input type="text" class="form-control" name="sn" value="${fieldConfigPo.sn}"  validate="{required:true,number:true,maxIntLen:10}"/>
												</div>
												</div>
											</td>
									   </tr>
									</c:forEach>
								</tbody>
								<tfoot>
									<c:if test="${empty tableConfig || empty tableConfig.fieldConfigPoList}">
									<c:set var="subSize" scope="session" value="0"/>
									</c:if>
									<c:if test="${not empty tableConfig && not empty tableConfig.fieldConfigPoList}">
									<c:set var="subSize" scope="session" value="${tableConfig.fieldConfigPoList.size()}"/>
									</c:if>
									<input type="hidden" name="subSize" value="${subSize}"/>
									<tr><td colspan="12">共${subSize}条</td></tr>
								</tfoot>
							</table>
						</div>
					</div>
				</form>
			</div>
		</div>
		
		<script type="text/html" id="fieldConfigPoListTrTemplate">
			<tr>
				<td>{{index}}</td>
				<td>
					<input type="hidden" name="field" value="{{field}}" />
					<span>{{field}}</span>
				</td>
				<td>
					<div class="form-group form-group-clear">
					<div class="col-sm-12">
					<input type="text" class="form-control" name="fieldComment" value="{{fieldComment}}" validate="{required:true,maxlength:40}"/>
					</div>
					</div>
				</td>
				<td>
					<input type="hidden" name="sqlType" value="{{sqlType}}" />
					<input type="hidden" name="length" value="{{length}}" />
					<input type="hidden" name="precision" value="{{precision}}" />
					<input type="hidden" name="scale" value="{{scale}}" />
					<span>{{sqlType}}</span>
				</td>
				<td>
					<div class="form-group form-group-clear">
					<div class="col-sm-12">
					<input type="text" class="form-control" name="javaType" value="{{javaType}}" validate="{required:true,maxlength:40}"/>
					</div>
					</div>
				</td>
				<td>
					<div class="form-group form-group-clear">
					<div class="col-sm-12">
					<input type="text" class="form-control" name="propName" value="{{propName}}" validate="{required:true,maxlength:40}"/>
					</div>
					</div>
				</td>
				<td>
					<input type="hidden" name="keyName" value="{{keyName}}"/>
					{{if keyName == 'pk'}}
					<span style="color:red">是</span>
					{{else}}
					<span>否</span>
					{{/if}}
				</td>
				<td>
					<label class="checkbox-inline" style="padding-top: 0px; "> <input class="ibps" type="checkbox" name="showList" {{if showList == 'Y'}}checked{{/if}} ><span class="lbl"></span></label>
				</td>
				<td>
					<label class="checkbox-inline" style="padding-top: 0px; "> <input class="ibps" type="checkbox" name="showQuery" {{if showQuery == 'Y'}}checked{{/if}} ><span class="lbl"></span></label>
				</td>
				<td>
					<div class="form-group form-group-clear">
					<div class="col-sm-12">
					<div style="position: relative;">
						<input type="hidden" id="control{{index}}" name="control" value="{{control}}"/>
						<input type="text" class="form-control dropdownTree" 
							data-toggle="dropdownTree" data-dic="fieldControl" 
					   	 	data-key="#control{{index}}" validate="{required:true}" 
					    	value="{{controlLabel}}"
							/>
					</div>
					</div>
					</div>
				</td>
				<td>
					<div class="form-group form-group-clear">
					<div class="col-sm-12">
					<input type="text" class="form-control" name="sn" value="{{index}}" validate="{required:true,number:true,maxIntLen:10}"/>
					</div>
					</div>
				</td>
			</tr>
		</script>
		
		<!-- value="{{prfix}}{f:getDictLabel({{control}}, 'fieldControl', 'key', '')}" -->
		
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
		<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/BoDefControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/ExternalTableControl.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/tableConfig.js"></script>
	</body>
</html>