

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/userSecurity.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-form">
				<form class="form-horizontal" id="userSecurityForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">是否启用复杂度策略:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="isUseComp" name="m:userSecurity:isUseComp" value="${userSecurity.isUseComp}"  validate="{required:false,maxlength:18}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">复杂度设置:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="complexity" name="m:userSecurity:complexity" value="${userSecurity.complexity}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">密码长度最小值:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="minLength" name="m:userSecurity:minLength" value="${userSecurity.minLength}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">密码长度最大值:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="maxLength" name="m:userSecurity:maxLength" value="${userSecurity.maxLength}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">强制更改密码时间:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="updTlimit" name="m:userSecurity:updTlimit" value="${userSecurity.updTlimit}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">最长使用期限:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="timeLimit" name="m:userSecurity:timeLimit" value="${userSecurity.timeLimit}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">是否为系统默认:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="isDefault" name="m:userSecurity:isDefault" value="${userSecurity.isDefault}"  validate="{required:false,maxlength:15}"/>
	                        </div>
	                    </div>
	                    <input type="hidden" name="m:userSecurity:id" value="${userSecurity.id}" />
					</div>
					
				</form>
			</div>
		</div>
	</body>
</html>