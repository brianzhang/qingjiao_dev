<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
		<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
		
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/TypeTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
		
		<f:link href="lc/form/formrenderer.css"  isCommon="false"/>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/FormDataUtil.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/scheme.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-download" ><span>保存并下载</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-free-code-camp" ><span>保存并生成到工作目录</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
				<form class="form-horizontal" id="schemeForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">方案名称:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="name" name="m:scheme:name" value="${scheme.name}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
	                    
	                    <div class="form-group">
	                        <div class="group">
	                        <label class="col-sm-2 control-label">分类:</label>
	                        <div class="col-sm-4">
	                            <input type="hidden" class="form-control"  id="typeId" name="m:scheme:typeId" value="${scheme.typeId}"/>
                        		<input type="text" class="form-control dropdownTree" id="typeName"
                                  	data-toggle="dropdownTree"  data-type="TEMPLATE_TYPE" data-id="#typeId" readonly value="${scheme.typeName}"
                                  	validate="{required:false,maxlength:64}"  />
	                        </div>
	                        </div>
	                        <div class="group">
		                        <label class="col-sm-2 control-label">是否生成子表:</label>
		                        <div class="col-sm-4">
		                            <label class="radio-inline">
	                               	 	<input type="radio" class="ibps" value="Y" name="m:scheme:genSub" <c:if test="${empty scheme || empty scheme.genSub || scheme.genSub == 'Y'}">checked</c:if> />
	                               	 	<span class="lbl">是</span>
	                                </label>
	                                <label class="radio-inline">
	                               	 	<input type="radio" class="ibps"  value="N" name="m:scheme:genSub" <c:if test="${scheme.genSub == 'N'}">checked</c:if> />
	                               	 	<span class="lbl">否</span>
	                                </label>
		                        </div>
		                    </div>
	                    </div>
	                    
						<div class="form-group">
							<div class="group">
		                        <label class="col-sm-2 control-label">表名:</label>
		                        <div class="col-sm-4">
		                            <select id="tableName" name="m:scheme:tableName" class="form-control"
		                             data-value="${scheme.tableName }"
		                             data-classvar="${scheme.classVar }"
		                             data-toggle="select2" data-multiple="false"
		                             data-ajax="${ctx }/platform/codegen/tableConfig/tableConfigList.htm"
		                             validate="{required:true}"
		                             >
									</select>
		                        </div>
	                        </div>
	                        <div class="group">
		                        <label class="col-sm-2 control-label">表单:</label>
		                        <div class="col-sm-4">
		                            <select id="formIdentity" name="m:scheme:formIdentity" class="form-control"
		                             data-value="${scheme.formIdentity }"
		                             data-label="${scheme.formLabel }"
		                             data-toggle="select2" data-multiple="false"
		                             data-ajax="${ctx }/platform/codegen/scheme/formList.htm"
		                             validate="{required:false}"
		                             >
									</select>
		                        </div>
		                    </div>
	                    </div>
	                    
						<div class="form-group" id="doTypeDiv">
							<div class="group">
		                        <label class="col-sm-2 control-label">生成类型:</label>
		                        <div class="col-sm-10" id="dDiv">
		                            <c:forEach var="doType" items="${doTypeList}">	
		                            <label class="checkbox-inline">
	                               	 	<input type="checkbox" class="ibps" value="${doType.key }" name="m:scheme:doType" <c:if test="${fn:contains(scheme.doType,doType.key)}" >checked="checked"</c:if> />
	                               	 	<span class="lbl">${doType.name }</span>
	                                </label>
	                                </c:forEach>
		                            
		                            <!-- <select id="doType" name="m:scheme:doType" class="form-control"
		                             data-value="${scheme.doType }"
		                             data-toggle="select2" data-multiple="true"
		                             data-ajax="${ctx }/platform/codegen/doType/doTypeGroupList.htm"
		                             validate="{required:true}"
		                             >
									</select> -->
		                        </div>
	                        </div>
		                    <div class="group">
		                        <label class="col-sm-2 control-label"></label>
		                        <div class="col-sm-10" id="tDiv">
	                                <c:forEach var="template" items="${templateList}">	
		                            <label class="checkbox-inline">
	                               	 	<input type="checkbox" class="ibps" value="${template.key }" name="m:scheme:doType" <c:if test="${fn:contains(scheme.doType,template.key)}" >checked="checked"</c:if> />
	                               	 	<span class="lbl">${template.name }</span>
	                                </label>
	                                </c:forEach>
		                        </div>
		                    </div>
	                    </div>
	                    
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">系统:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="sys" name="m:scheme:sys" value="${scheme.sys}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">平台:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="platform" name="m:scheme:platform" value="${scheme.platform}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
	                    </div>
	                    
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">模块:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="module" name="m:scheme:module" value="${scheme.module}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="group">
	                        <label class="col-sm-2 control-label">是否基础模块<i class="fa fa-help red" data-tip title="基础模块是指系统名与模块名一致，生成代码时不会连续使用相同包名；系统名org，模块名org，是否基础模块为'是'则生成包名为com.lc.ibps.org；是否基础模块为'否'则生成包名为com.lc.ibps.org.org；"></i>:</label>
	                        <div class="col-sm-4">
	                            <label class="radio-inline">
                               	 	<input type="radio" class="ibps" value="Y" name="m:scheme:isBase" <c:if test="${scheme.isBase == 'Y'}">checked</c:if> />
                               	 	<span class="lbl">是</span>
                                </label>
                                <label class="radio-inline">
                               	 	<input type="radio" class="ibps"  value="N" name="m:scheme:isBase" <c:if test="${empty scheme || empty scheme.isBase || scheme.isBase == 'N'}">checked</c:if> />
                               	 	<span class="lbl">否</span>
                                </label>
	                        </div>
	                    </div>
	                    </div>
	                    
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">代码作者:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control" readonly id="developer" name="m:scheme:developer" value="${scheme.developer}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">作者邮箱:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control" id="email" name="m:scheme:email" value="${scheme.email}"  validate="{required:true,email:true,maxlength:192}"/>
	                        </div>
	                    </div>
	                    </div>
	                    
						<div class="form-group">
	                        <label class="col-sm-2 control-label">包路径:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control" readonly id="packageUrl" name="m:scheme:packageUrl" value="${scheme.packageUrl}" />
	                        </div>
	                    </div>
	                    
						<div class="form-group">
	                        <label class="col-sm-2 control-label">菜单url:</label>
	                        <div class="col-sm-10">
	                        	<input type="hidden" id="struType" value="">
	                            <input type="text" class="form-control" readonly id="menuUrl" name="m:scheme:menuUrl" value="${scheme.menuUrl}" />
	                        </div>
	                    </div>
	                    
						<div class="form-group">
	                        <label class="col-sm-2 control-label">描述:</label>
	                        <div class="col-sm-10">
	                            <textarea id="comment" name="m:scheme:comment" cols="60" rows="5" class="form-control" >${scheme.comment }</textarea>
	                        </div>
	                    </div>
	                    
	                    <input type="hidden" name="m:scheme:id" value="${scheme.id}" />
	                    <input type="hidden" name="m:scheme:creator" value="${scheme.creator}" />
 						<input type="hidden" name="m:scheme:createTime" value="<fmt:formatDate value="${scheme.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/>" />
					</div>
					
					<div class="form-group">
						<div class="col-sm-12 table-responsive">
							<table name="s:schemeParam" data-mode="inner" data-required="false"  class="table table-bordered table-hover table-condensed">
								<caption>
									<div class="fr-table-header-label">参数列表</div>
									<div class="fr-table-tools">
										<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
										<a class="btn btn-danger fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
									</div>
								</caption>
								<thead>
									<tr>
										<th>参数名</th>
										<th>值</th>
										<th class="fr_table_col_remove" width="45px">管理</th>
									</tr>
								</thead>
								<tbody>
									<c:forEach var="schemeParamPo" varStatus="status" items="${scheme.schemeParamPoList}">
									   <tr>
										   	<td>
												<div class="form-group form-group-clear">
												<div class="col-sm-12">
												<input type="hidden" id="key${status.index + 1}" name="s:schemeParam:key:${status.index + 1}" value="${schemeParamPo.key}"/>
						                        <input type="text" class="form-control dropdownTree" 
					                            	data-toggle="dropdownTree" data-dic="schemeParam" 
					                            	data-key="#key${status.index + 1}" validate="{required:true}" 
					                            	value="${f:getDictLabel(schemeParamPo.key, 'schemeParam', 'key', '')}"/>
					                            </div>
					                            </div>
											</td>
										   	<td>
												<div class="form-group form-group-clear">
												<div class="col-sm-12">
												<input type="text" class="form-control" name="s:schemeParam:value:${status.index + 1}" value="${schemeParamPo.value}"  validate="{required:true,maxlength:64}"/>
												</div>
												</div>
											</td>
											<td class="fr_table_col_remove" width="45px">
												<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
											</td>
									   </tr>
									</c:forEach>
								</tbody>
							</table>
						</div>
					</div>
				</form>
			</div>
		</div>
		
		<script type="text/html" id="chkTemplate">
		<label class="checkbox-inline">
        	<input type="checkbox" class="ibps" value="{{key}}" name="m:scheme:doType" />
        	<span class="lbl">{{name }}</span>
        </label>
		</script>
		
		<script type="text/html" id="s:schemeParam:TrTemplate">
			<tr>
				<td>
					<div class="form-group form-group-clear">
					<div class="col-sm-12">
					<input type="hidden" id="key{{idx}}" name="s:schemeParam:key:{{idx}}" value="{{key}}"/>
					<input type="text" class="form-control dropdownTree" 
						data-toggle="dropdownTree" data-dic="schemeParam" 
					    data-key="#key{{idx}}" validate="{required:true}"
						/>
					</div>
					</div>
				</td>
				<td>
					<div class="form-group form-group-clear">
					<div class="col-sm-12">
					<input type="text" class="form-control" name="s:schemeParam:value:{{idx}}" value="{{value}}" validate="{required:true,maxlength:64}"/>
					</div>
					</div>
				</td>
				<td class="fr_table_col_remove" width="45px">
					<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
				</td>
			</tr>
		</script>
	</body>
</html>