<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmAuthDef.js"></script>
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
					<form class="form-horizontal" id="bpmAuthDefForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">流程授权ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="authId" name="authId" value="${bpmAuthDef.authId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">授权流程KEY:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="defKey" name="defKey" value="${bpmAuthDef.defKey}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">授权流程名称:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="defName" name="defName" value="${bpmAuthDef.defName}"  validate="{required:false,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">授权内容:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="rights" name="rights" value="${bpmAuthDef.rights}"  validate="{required:false}"/>
                                </div>
                            </div>
					<input type="hidden" name="id" value="${bpmAuthDef.id}" />
					</form>
				</div>
		</div>
	</body>
</html>