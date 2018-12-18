<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmDefinitionVariable.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content col-sm-12 p-xxs">
			<div class="panel-form">
				<form class="form-horizontal" id="bpmDefinitionVariableForm" method="post" >
					<div class="form-group">
						<label class="col-sm-2 control-label">节点：<span class="required">*</span></label>
						<div class="col-sm-10 ">
							<select name="nodeId" id="nodeId" class="form-control">
								<option value="">全局变量</option>
							</select>
						</div>
					</div>
					<div class="form-group">
                        <label class="col-sm-2 control-label">变量名称<span class="required">*</span>:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control"  id="name" name="name"  validate="{required:true,maxlength:192}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">变量key（唯一）<span class="required">*</span>:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control"  id="key" name="key"  validate="{required:true,maxlength:192}"/>
                        </div>
                    </div>
                    <div class="form-group">
	                      <label class="col-sm-2 control-label">数据类型<span class="required">*</span>:</label>
	                      <div class="col-sm-10">
	                      		<select id="dataType" name="dataType" class="form-control" validate="{required:true}">
                      				<option value="string">字符串</option>
                      				<option value="int">整型</option>
                      				<option value="float">浮点型</option>
                      				<option value="double">双精度</option>
								</select>
	                      </div>
	                  </div>
	                   <div class="form-group">
	                      <label class="col-sm-2 control-label">必填<span class="required">*</span>:</label>
	                      <div class="col-sm-10">
	                      		<select id="isRequired" name="isRequired" class="form-control" validate="{required:true}">
                      				<option value="false">否</option>
                      				<option value="true">是</option>
								</select>
	                      </div>
	                  </div>
					<div class="form-group">
                        <label class="col-sm-2 control-label">默认值:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control"  id="defaultVal" name=“defaultVal”  validate="{maxlength:192}"/>
                        </div>
                    </div>
         			<div class="form-group">
                        <label class="col-sm-2 control-label">描述:</label>
                        <div class="col-sm-10">
                            	<textarea  id="description" name="description" cols="50" rows="5" class="form-control"></textarea>
                        </div>
                    </div>
	             </form>
             </div>
		</div>
	</body>
</html>