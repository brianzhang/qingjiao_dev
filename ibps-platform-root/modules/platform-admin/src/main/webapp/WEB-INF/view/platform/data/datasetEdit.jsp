<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
				<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/comboTree.js"></script>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
		<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
		
		<f:link href="codemirror/lib/codemirror.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/sql/sql.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataset.js"></script>
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
				<form class="form-horizontal" id="datasetForm"  action="save.htm"   method="post">
						<div  class="form-group">
	                        <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="name" name="name" data-pinyin="#key" value="${dataset.name}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                     </div>
						 <div  class="form-group">
	                        <label class="col-sm-2 control-label">数据集KEY<span class="required">*</span>:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="key" name="key" value="${dataset.key}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
               			 <div  class="form-group">
		                        <label class="col-sm-2 control-label">分类:</label>
		                        <div class="col-sm-10">
		                            <input type="hidden"  id="typeId" name="typeId" value="${dataset.typeId}" />
		                         	<input type="text" class="form-control comboTree"  id="typeName" 
	                                    	 data-toggle="comboTree"  data-type="DATASET_TYPE" data-id="#typeId"  readonly
	                                    	 value="${dataset.typeName}"  validate="{required:false}"/>
		                        </div>
		                  </div>
		                  <div class="form-group">
		                  <div class="group">
			                  <label class="col-sm-2 control-label">是否外部数据<span class="required">*</span>:</label>
		                        <div class="col-sm-4">
				                  <label class="radio-inline">
									<input  type="radio" name="external"  value="Y"   class="ibps"  <c:if test="${empty dataset.external == 'Y' }">checked="checked"</c:if> >
									<span class="lbl">是</span>
								</label>
								<label class="radio-inline">
									<input type="radio"  name="external"   value="N"  class="ibps" <c:if test="${empty dataset || dataset.external =='N'  }">checked="checked"</c:if>>
									<span class="lbl">否</span>
								</label>
							</div>
		                  </div>
		                  <div class="group" id="dsAliasDiv">
	                        <label class="col-sm-2 control-label">数据源<span class="required">*</span>:</label>
	                        <div class="col-sm-4">
						         <select class="form-control"   name="dsAlias" id="dsAlias">
					
									<c:forEach items="${dataSourceList}" var="ds">
										<option value="${ds.alias}" <c:if test="${( empty dataset && ds.isDefault) ||  (not empty dataset && ds.alias == dataset.dsAlias) }">selected="selected"</c:if>>${ ds.name}</option>
									</c:forEach>
                               </select>
						    </div>
                    	</div>
                    	</div>
	               		
						<div class="form-group">
	                        <label class="col-sm-2 control-label">类型:</label>
	                        <div class="col-sm-10">
								<div class="group">
	                        	<div class="col-sm-4"  style="padding-left:0px;padding-right: 0px;">
	                        		<select class="form-control" id="type" name="type"  validate="{required:true}">
											<option value="table" <c:if test="${empty dataset || dataset.type == 'table'}">selected</c:if>>物理表</option>
											<option value="view" <c:if test="${dataset.type == 'view'}">selected</c:if>>视图</option>
											<option value="sql" <c:if test="${dataset.type == 'sql'}">selected</c:if>>自定义SQL</option>
									</select>
								</div>
								</div>
								<div class="group">
								<div class="col-sm-8"  id="fromDiv"  style="padding-left:0px;padding-right: 0px;padding-top:0px;">
		                            <select id="from" name="from" class="form-control" validate="{required:true}"
		                             data-toggle="select2" data-multiple="false"  data-value="${dataset.from}"
		                             >
									</select>
								</div> 
								</div>
		                     </div>
	                    </div>
			  		 
						<div class="form-group"  style="display: none" id="sqlDiv">
	                        <label class="col-sm-2 control-label">
	                        SQL语句
	                        <a href="javascript:void(0);" style="text-decoration: none;" 
                 				class="fa fa-exclamation-circle" data-tip
                 				title="参数使用说明：{参数名}。<br/>示例：select id_,name_ from ibps_party_employee <br/>where id_ = '{currentUserId}' <br/>and name_ = '{currentFullName}'"
						 	></a>
	                        :</label>
	                        <div class="col-sm-10">
                      			<div>
				 					<a id="param" class="btn btn-sm btn-danger set-params">参数</a> 
				 					&nbsp; &nbsp; 
				 					<a class="btn btn-sm btn-info validate">校验</a>
				 				</div>
                      			<div><textarea class="form-control"  id="sql" name="sql" style="width: 100%;height: 220px;">${fn:escapeXml(dataset.sql)}</textarea></div>
	                        </div>
	                    </div>
	                    
						<div class="form-group">
							<div class="group">
		                        <label class="col-sm-2 control-label">是否树型:</label>
		                        <div class="col-sm-4">
	                              	<label class="radio-inline">
										<input  type="radio" name="isTree"  value="Y"   class="ibps"  <c:if test="${empty dataset || dataset.isTree =='Y'  }">checked="checked"</c:if> >
										<span class="lbl">是</span>
									</label>
									<label class="radio-inline">
										<input type="radio"  name="isTree"   value="N"  class="ibps"  <c:if test="${empty dataset || dataset.isTree =='N'  }">checked="checked"</c:if>>
										<span class="lbl">否</span>
									</label>
		                        </div>
	                    	</div>
							<div class="group" id="refFieldDiv" >
		                        <label class="col-sm-2 control-label">关联字段:</label>
		                        <div class="col-sm-4">
		                        	<select id="refField" name="refField" class="form-control" validate="{required:true}"
		                             data-toggle="select2" data-multiple="false"  data-value="${dataset.refField}"
		                             >
									</select>
		                        </div>
		                    </div>
	                	</div>
					</div>

                  	<textarea rows="0" cols="0" style="display: none;" id="params" name="params"  >${fn:escapeXml(dataset.params)}</textarea>
                    <input type="hidden" name="id" value="${dataset.id}" />
					<input type="hidden" name="createBy" value="${dataset.createBy }">
					<input type="hidden" name="createTime" value="<fmt:formatDate value='${dataset.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/>">
					<input type="hidden" name="updateBy" value="${dataset.updateBy }">
					<input type="hidden" name="updateTime" value="<fmt:formatDate value='${dataset.updateTime}' pattern='yyyy-MM-dd HH:mm:ss'/>">
				</form>
		</div>
	</body>
</html>