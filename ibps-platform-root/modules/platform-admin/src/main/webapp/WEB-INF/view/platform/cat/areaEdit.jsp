

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/area.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
				</div>
			</div>
			<div class="panel-form">
				<form class="form-horizontal" id="areaForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">父区域:</label>
	                        <div class="col-sm-10">
	                            <input type="hidden" id="parentId" name="parentId" value="${parentId}"/>
	                            <input type="text" class="form-control" readonly="readonly" id="parentName" name="parentName" value="${parentName}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">区域代码:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="key" name="key" value="${area.key}"  validate="{required:true,maxlength:120}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">区域名称:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="name" name="name" value="${area.name}"  validate="{required:true,maxlength:384}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">排序:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="sn" name="sn" value="${area.sn}"  validate="{required:true,digits:true,maxIntLen:10}"/>
	                        </div>
	                    </div>
 						<input type="hidden" name="id" value="${area.id}" />
					</div>
					
				</form>
			</div>
		</div>
		
	</body>
</html>