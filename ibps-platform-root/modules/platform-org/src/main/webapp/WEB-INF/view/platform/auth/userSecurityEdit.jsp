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
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
				<form class="form-horizontal" id="userSecurityForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">是否启用复杂度策略:</label>
	                        <div class="col-sm-10">
	                        	<label class="radio-inline">
                               	 	<input type="radio" class="ibps" value="Y" name="m:userSecurity:isUseComp" <c:if test="${not empty userSecurity && userSecurity.isUseComp=='Y'}">checked="checked"</c:if> validate="{required:true}"/>
                               	 	<span class="lbl">启用</span>
                                </label>
                                <label class="radio-inline">
                               	 	<input type="radio" class="ibps"  value="N" name="m:userSecurity:isUseComp" <c:if test="${empty userSecurity || userSecurity.isUseComp=='N'}">checked="checked"</c:if> validate="{required:true}"/>
                               	 	<span class="lbl">禁用</span>
                                </label>
	                        </div>
	                    </div>
						<div class="form-group" id="complexityDiv">
							<div class="group">
		                        <label class="col-sm-2 control-label">复杂度设置:</label>
		                        <div class="col-sm-10">
		                        	<label class="checkbox-inline">
		                            <input type="checkbox" class="ibps" name="m:userSecurity:complexity" value="1" <c:if test="${fn:contains(userSecurity.complexity,1)}" >checked="checked"</c:if>  validate="{required:true}"/>
		                            <span class="lbl">包含小写字母</span>
		                            </label>
		                            <label class="checkbox-inline">
		                            <input type="checkbox" class="ibps" name="m:userSecurity:complexity" value="2" <c:if test="${fn:contains(userSecurity.complexity,2)}" >checked="checked"</c:if> validate="{required:true}"/>
		                            <span class="lbl">包含大写字母</span>
		                            </label>
		                            <label class="checkbox-inline">
		                            <input type="checkbox" class="ibps" name="m:userSecurity:complexity" value="3" <c:if test="${fn:contains(userSecurity.complexity,3)}" >checked="checked"</c:if>  validate="{required:true}"/>
		                            <span class="lbl">包含数字</span>
		                            </label>
		                            <label class="checkbox-inline">
		                            <input type="checkbox" class="ibps" name="m:userSecurity:complexity" value="4" <c:if test="${fn:contains(userSecurity.complexity,4)}" >checked="checked"</c:if> validate="{required:true}"/>
		                            <span class="lbl">包含特殊字符</span>
		                            </label>
		                        </div>
		                    </div>
	                    </div>
						<div class="form-group">
							<div class="group">
		                        <label class="col-sm-2 control-label">密码长度最小值（字符）:</label>
		                        <div class="col-sm-4">
		                            <input type="text" class="form-control"  id="minLength" name="m:userSecurity:minLength" value="${userSecurity.minLength}"  validate="{required:true}"/>
		                        </div>
		                     </div>
		                     <div class="group">
		                     	<label class="col-sm-2 control-label">密码长度最大值（字符）:</label>
		                        <div class="col-sm-4">
		                            <input type="text" class="form-control"  id="maxLength" name="m:userSecurity:maxLength" value="${userSecurity.maxLength}"  validate="{required:true}"/>
		                        </div>
		                     </div>
	                    </div>
						<div class="form-group">
							<div class="group">
		                        <label class="col-sm-2 control-label">强制更改密码期限（天）:</label>
		                        <div class="col-sm-4">
		                            <input type="text" class="form-control"  id="updTlimit" name="m:userSecurity:updTlimit" value="${userSecurity.updTlimit}"  validate="{required:true}"/>
		                        </div>
		                    </div>
		                    <div class="group">
		                        <label class="col-sm-2 control-label">最长使用期限（天）:</label>
		                        <div class="col-sm-4">
		                            <input type="text" class="form-control"  id="timeLimit" name="m:userSecurity:timeLimit" value="${userSecurity.timeLimit}"  validate="{required:true}"/>
		                        </div>
		                    </div>
	                    </div>
	                    <input type="hidden" name="m:userSecurity:id" value="${userSecurity.id}" />
	                    <input type="hidden" name="m:userSecurity:isDefault" value="${userSecurity.isDefault}" />
					</div>
					
				</form>
			</div>
		</div>
	</body>
</html>