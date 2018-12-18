

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/demo/dsTest.js"></script>
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
				<form class="form-horizontal" id="testForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">ACCOUNT_:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="account" name="m:test:account" value="${test.account}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">NAME_:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="name" name="m:test:name" value="${test.name}"  validate="{required:false,maxlength:384}"/>
	                        </div>
	                    </div>
	                    <input type="hidden" name="m:test:id" value="${test.id}" />
					</div>
					
				</form>
			</div>
		</div>
	</body>
</html>