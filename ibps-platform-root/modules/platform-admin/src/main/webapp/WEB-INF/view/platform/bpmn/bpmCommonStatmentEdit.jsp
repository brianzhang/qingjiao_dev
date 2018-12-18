

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmCommonStatment.js"></script>
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
				<form class="form-horizontal" id="bpmCommonStatmentForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">内容:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="value" name="m:bpmCommonStatment:value" value="${bpmCommonStatment.value}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">动作类型:</label>
	                        <div class="col-sm-10">
	                            <select class="form-control"  id="action" name="m:bpmCommonStatment:action" >
									<option value=""></option>
									<option <c:if test="${bpmCommonStatment.action=='agree'}">selected</c:if> value="agree">同意</option>
									<option <c:if test="${bpmCommonStatment.action=='oppose'}">selected</c:if> value="oppose">反对</option>
									<option <c:if test="${bpmCommonStatment.action=='reject'}">selected</c:if> value="reject">驳回</option>
									<option <c:if test="${bpmCommonStatment.action=='rejectToStart'}">selected</c:if> value="rejectToStart">驳回到发起人</option>
									<option <c:if test="${bpmCommonStatment.action=='abandon'}">selected</c:if> value="abandon">弃权</option>
									<option <c:if test="${bpmCommonStatment.action=='manualend'}">selected</c:if> value="manualend">终止</option>
								</select>
	                        </div>
	                    </div>
						<div class="form-group">
							<label class="col-sm-2 control-label">是否默认:</label>
	                        <div class="col-sm-10">
	                            <select id="isDefault" name="m:bpmCommonStatment:isDefault" class="form-control" >
									<option value=""></option>
									<option <c:if test="${bpmCommonStatment.isDefault=='Y'}">selected</c:if> value="Y">是</option>
									<option <c:if test="${bpmCommonStatment.isDefault=='N'}">selected</c:if> value="N">否</option>
								</select>
	                        </div>
	                    </div>
	                    <input type="hidden" name="m:bpmCommonStatment:id" value="${bpmCommonStatment.id}" />
	                    <input type="hidden" name="m:bpmCommonStatment:createBy" value="${bpmCommonStatment.createBy}" />
	                    <input type="hidden" name="m:bpmCommonStatment:createTime" value="${bpmCommonStatment.createTime}" />
	                    <input type="hidden" name="m:bpmCommonStatment:times" value="${bpmCommonStatment.times}" />
					</div>
					
				</form>
			</div>
		</div>
	</body>
</html>