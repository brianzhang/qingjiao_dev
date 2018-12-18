<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmDefine.js"></script>
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
					<form class="form-horizontal" id="bpmDefineForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">流程名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${bpmDefine.name}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">流程业务主键<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="defKey" name="defKey" value="${bpmDefine.defKey}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">流程描述:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="desc" name="desc" value="${bpmDefine.desc}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">所属分类ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="typeId" name="typeId" value="${bpmDefine.typeId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">流程状态。草稿、发布、禁用<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="status" name="status" value="${bpmDefine.status}"  validate="{required:true,maxlength:120}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">测试状态<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="testStatus" name="testStatus" value="${bpmDefine.testStatus}"  validate="{required:true,maxlength:120}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">BPMN - 流程定义ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="bpmnDefId" name="bpmnDefId" value="${bpmDefine.bpmnDefId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">BPMN - 流程发布ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="bpmnDeployId" name="bpmnDeployId" value="${bpmDefine.bpmnDeployId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">版本 - 当前版本号:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="version" name="version" value="${bpmDefine.version}"  validate="{required:false,number:true,maxIntLen:10}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">版本 - 主版本流程ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="mainDefId" name="mainDefId" value="${bpmDefine.mainDefId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">版本 - 是否主版本<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="isMain" name="isMain" value="${bpmDefine.isMain}"  validate="{required:true}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">版本 - 变更理由:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="reason" name="reason" value="${bpmDefine.reason}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">创建人ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="createBy" name="createBy" value="${bpmDefine.createBy}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">创建时间:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="createTime" name="createTime" value="${bpmDefine.createTime}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">更新人ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="updateBy" name="updateBy" value="${bpmDefine.updateBy}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">更新时间:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="updateTime" name="updateTime" value="${bpmDefine.updateTime}"  validate="{required:false}"/>
                                </div>
                            </div>
					<input type="hidden" name="defId" value="${bpmDefine.defId}" />
					</form>
				</div>
		</div>
	</body>
</html>