<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/desktop/desktopMyLayout.js"></script>
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
					<form class="form-horizontal" id="desktopMyLayoutForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">用户ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="userId" name="userId" value="${desktopMyLayout.userId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">模版内容:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="templateHtml" name="templateHtml" value="${desktopMyLayout.templateHtml}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">设计模版:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="designHtml" name="designHtml" value="${desktopMyLayout.designHtml}"  validate="{required:false}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">布局管理ID:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="layoutId" name="layoutId" value="${desktopMyLayout.layoutId}"  validate="{required:false,maxlength:192}"/>
                                </div>
                            </div>
					<input type="hidden" name="id" value="${desktopMyLayout.id}" />
					</form>
				</div>
		</div>
	</body>
</html>