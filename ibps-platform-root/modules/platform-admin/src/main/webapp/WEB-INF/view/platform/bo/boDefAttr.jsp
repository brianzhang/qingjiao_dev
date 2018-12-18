<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/grid.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/CamelCase.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bo/boDefAttr.js"></script>
	</head>
	<body>
			<div class="wrapper wrapper-content col-sm-12">
				<div class="panel">
				<div class="tabs-container">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="false">属性信息</a></li>
			     	</ul>
			     	<div class="tab-content">
			     		<!-- 属性信息 -->
                        <div id="tab-1" class="tab-pane active">
                            <div class="panel-body">
                            		<form class="form-horizontal col-sm-12" id="boDefAttrForm">
                            			<input type="hidden" id="id" name="id"/>
                           				<div class="form-group">
			                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
			                                <div class="col-sm-10">
			                                    <input type="text" class="form-control"  id="name" name="name" validate="{required:true,maxlength:64,name:true}"/>
			                                </div>
			                           </div>
                           				<div class="form-group">
	                           				<div class="group">
				                                <label class="col-sm-2 control-label">
				                                	编码
				                                	<a href="javascript:void(0);" style="text-decoration: none;" title="驼峰命名法：sysData、uesrId"
									 					class="fa fa-exclamation-circle" data-tip></a>
				                                	<span class="required">*</span>:</label>
				                                <div class="col-sm-4">
				                                    <input type="text" class="form-control"  id="code" name="code"     validate="{required:true,maxlength:64,fields:true}"  />
				                                </div>
				                           </div>
				                           <div class="group">
				                                <label class="col-sm-2 control-label">
				                                	字段
				                                	<a href="javascript:void(0);" style="text-decoration: none;" title="下划线分隔：sys_data_"
									 					class="fa fa-exclamation-circle" data-tip></a>
				                                	<span class="required">*</span>:</label>
				                                <div class="col-sm-4">
				                                    <input type="text" class="form-control"  id="fieldName" name="fieldName"     validate="{required:true,maxlength:64,fields:true}"  />
				                                </div>
			                                </div>
			                           </div>
			                           <div class="form-group">
			                              	<label class="col-sm-2 control-label">描述:</label>
			                                <div class="col-sm-10">
			                                		<textarea rows="2" cols="5"  class="form-control"  id="desc" name="desc"  ></textarea>
			                                </div>
			                           </div>
			                           <div class="form-group">
			                                <label class="col-sm-2 control-label">是否允许空:</label>
				                             <div class="col-sm-4">
				                              		<label class="radio-inline">
				                                       	 	<input type="radio" class="ibps" value="Y" name="isNull" checked="checked" />
				                                       	 	<span class="lbl">是</span>
				                                      </label>
			                                        <label class="radio-inline">
			                                       	 	<input type="radio"  class="ibps"   value="N" name="isNull"  />
			                                       	 	<span class="lbl">否</span>
			                                        </label>
			                                </div>
			                                <label class="col-sm-2 control-label">默认值:</label>
			                                <div class="col-sm-4">
												 <input type="text" id="defValue" name="defValue" class="form-control" />
			                                </div>
			                           </div>
			                          <div class="form-group">
			                                <label class="col-sm-2 control-label">数据类型<span class="required">*</span>:</label>
			                                <div class="col-sm-4">
			                              		<select class="form-control" id="dataType" name="dataType"    validate="{required:true}">
													<option value="varchar" selected="selected">字符串</option>
													<option value="number">数字型</option>
													<option value="date">日期型</option>
													<option value="clob">大文本</option>
												</select>
			                                </div>
			                             	<label class="col-sm-2 control-label attrLength">属性长度<span class="required">*</span>:</label>
			                                <div class="col-sm-4 attrLength">
												 <input type="text" id="attrLength" name="attrLength" class="form-control"  value="200"/>
			                                </div>
			                              	<label class="col-sm-2 control-label format" style="display: none;">日期格式<span class="required">*</span>:</label>
			                                <div class="col-sm-4 format"  style="display: none;">
												<select id="format" name="format"  class="form-control" >												
													<option value="yyyy-MM-dd">yyyy-MM-dd</option>
													<option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
													<option value="yyyyMMddHHmm">yyyyMMddHHmm</option>
													<option value="">自定义</option>
												</select>
			                                </div>
			                          </div>
		                  			<div class="form-group"  >
		                                <label class="col-sm-2 control-label precision" style="display: none;">小数位数<span class="required">*</span>:</label>
		                                <div class="col-sm-4 precision" style="display: none;">
											 <input type="text" id="precision" name="precision" class="form-control" />
		                                </div>
		                           </div>
					               </form>
                            </div>
                         </div>
                        
			     </div>
				</div>
			</div>
	</body>
</html>