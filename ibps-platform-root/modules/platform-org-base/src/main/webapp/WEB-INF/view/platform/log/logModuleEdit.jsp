

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/log/logModule.js"></script>
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
				<form class="form-horizontal" id="logModuleForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">模块名称<span class="required">*</span>:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="name" name="name" value="${logModule.name}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label"><abbr title="对应URL的模块别名。<br/>eg:表单管理的地址是：/platform/form/formDef/list.htm，则别名是：form" data-tip>模块别名</abbr><span class="required">*</span>:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="alias" name="alias" value="${logModule.alias}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">是否启用<span class="required">*</span>:</label>
	                        <div class="col-sm-10">
	                        	<label class="radio-inline">
									 <input type="radio" class="ibps" value="1" name="enabled"  <c:if test="${logModule.enabled ==true }">checked="checked"</c:if>/>
									 <span class="lbl">是</span>
								</label>
								<label class="radio-inline"> 
										<input type="radio" class="ibps" value="0" name="enabled"  <c:if test="${empty logModule || logModule.enabled ==false }">checked="checked"</c:if>/>
										<span class="lbl">否</span>
								</label>
	                        </div>
	                    </div>
 						<input type="hidden" name="id" value="${logModule.id}" />
					</div>
					
				</form>
			</div>
		</div>
		
	</body>
</html>