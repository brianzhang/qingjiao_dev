<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmDefinitionButton.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content col-sm-12 p-xxs">
			<div class="panel-form">
				<form class="form-horizontal" id="buttonNodeForm" method="post"  >
						<input type="hidden" id="aliasName"  name="aliasName"/>
						<input type="hidden" id="supportScript"  name="supportScript"/>
					<div class="form-group">
	                      <label class="col-sm-2 control-label">操作类型<span class="required">*</span>:</label>
	                      <div class="col-sm-10">
	                      			<select id="alias" name="alias" class="form-control" validate="{required:true}">
									<c:forEach items="${types}" var="type" varStatus="s">
										<option value="${type.alias}" script="${type.supportScript}" >${type.name}</option>
									</c:forEach>
								</select>
	                      </div>
	                  </div>
					<div class="form-group">
	                        <label class="col-sm-2 control-label">按钮名称<span class="required">*</span>:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="name" name="name"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
					<div  id="divBeforevscript"  class="form-group">
						 <label class="col-sm-2 control-label">前置脚本: </label>
					   	<div class="col-sm-10">
					   			<textarea  id="beforeScript" name="beforeScript" cols="50" rows="5" class="form-control"></textarea>
								<span class="help-block m-b-none">脚本为javascript，用于在提交前做些处理，需要返回true或false。返回false时不做提交动作。</span>
						</div>
					</div>
					<div id="divAfterscript" class="form-group" >
						<label class="col-sm-2 control-label">后置脚本:  </label>
						<div class="col-sm-10">
							<textarea  id="afterScript" name="afterScript" cols="50" rows="5" class="form-control"></textarea>
							<span class="help-block m-b-none">脚本为javascript，用于在提交后做些处理，需要返回true或false。返回false时可以控制不关闭当前窗口。</span>
						</div>
					</div>
	             </form>
             </div>
		</div>
	</body>
</html>