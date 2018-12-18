

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/variable.js"></script>
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
				<form class="form-horizontal" id="variableForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">变量key:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control" <c:if test="${not empty variable && not empty variable.id}">readonly</c:if> id="key" name="key" value="${variable.key}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="group">
	                        <label class="col-sm-2 control-label">变量名:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="name" name="name" value="${variable.name}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
	                    </div>
	                    
	                    <div class="form-group">
	                    <div class="group">
	                        <label class="col-sm-2 control-label">变量类型:</label>
	                        <div class="col-sm-4">
	                            <select id="type" name="type" class="form-control search-select" >
									<option <c:if test="${variable.type == 'global'}">selected</c:if> value="global">全局</option>
									<option <c:if test="${variable.type == 'default'}">selected</c:if> value="default">默认</option>
									<option <c:if test="${variable.type == 'private'}">selected</c:if> value="private">私有</option>
								</select>
	                        </div>
	                    </div>
						<div class="group">
	                        <label class="col-sm-2 control-label">变量值:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control" 
	                            	id="value" name="value" value="${variable.value}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
	                    </div>
	                    
						<div class="form-group">
	                        <label class="col-sm-2 control-label">变量描述:</label>
	                        <div class="col-sm-10">
	                            <textarea id="comment" name="comment" cols="60" rows="5" class="form-control" >${variable.comment }</textarea>
	                        </div>
	                    </div>
						
 						<input type="hidden" name="id" value="${variable.id}" />
 						<input type="hidden" name="creator" value="${variable.creator}" />
 						<input type="hidden" name="createTime" value="<fmt:formatDate value="${variable.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/>" />
					</div>
					
				</form>
			</div>
		</div>
		
	</body>
</html>