<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<f:link href="codemirror/lib/codemirror.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/htmlmixed/htmlmixed.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/xml/xml.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/desktop/desktopLayout.js"></script>
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
					<form class="form-horizontal" id="desktopLayoutForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">布局名称:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${desktopLayout.name}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">排序:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="sn" name="sn" value="${desktopLayout.sn}"  validate="{required:true,number:true,maxIntLen:10}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">布局描述:</label>
                                <div class="col-sm-10">
                                		<textarea id="memo" name="memo" class="form-control">${fn:escapeXml(desktopLayout.memo)}</textarea>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">模版内容:</label>
                                <div class="col-sm-10">
                                    <textarea  class="form-control"  id="templateHtml" name="templateHtml" style="width: 90%;height: 220px;">${fn:escapeXml(desktopLayout.templateHtml)}</textarea>
                                </div>
                            </div>
							
					<input type="hidden" name="id" value="${desktopLayout.id}" />
					</form>
				</div>
		</div>
	</body>
</html>