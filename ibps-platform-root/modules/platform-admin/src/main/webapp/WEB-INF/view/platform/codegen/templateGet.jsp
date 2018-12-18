

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
		<f:link href="codemirror/lib/codemirror.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
		<script type="text/javascript">
			$(function() {	
				var width = $("#content").width();
				var height = $("#content").height();
				this._editor = CodeMirror.fromTextArea(document.getElementById("content"), {
					mode: "text/html",
					tabMode: "indent",
					readOnly: 'nocursor',
					lineNumbers: true
				 });
				
				this._editor.setSize(width,height);
			});
		</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form col-sm-12">
				<div class="form-horizontal ">
					<label class="col-sm-2 control-label">模板key:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${template.key}</p>
					</div>
					<label class="col-sm-2 control-label">模板名称:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${template.name}</p>
					</div>
					
					<label class="col-sm-2 control-label">文件名:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${template.filename}</p>
					</div>
					<label class="col-sm-2 control-label">代码目录:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${template.dir}</p>
					</div>
					
					<label class="col-sm-2 control-label">是否子表:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						<c:if test="${template.sub == 'true'}">是</c:if>
						<c:if test="${template.sub == 'fase'}">是</c:if>
						</p>
					</div>
					<label class="col-sm-2 control-label">是否覆盖:</label>
					<div class="col-sm-4">
						<p class="form-control-static">
						<c:if test="${template.override == 'true'}">是</c:if>
						<c:if test="${template.override == 'fase'}">是</c:if>
						</p>
					</div>
					
					<label class="col-sm-2 control-label">模板路径:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${template.path}</p>
					</div>
					
					<label class="col-sm-2 control-label">创建人:</label>
					<div class="col-sm-4">
						<p class="form-control-static">${f:getPartyLabel(template.creator, 'employee', '')}</p>
					</div>
					<label class="col-sm-2 control-label">创建时间:</label>
					<div class="col-sm-4">
						<p class="form-control-static"><fmt:formatDate value="${template.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>		
					</div>
					
					<label class="col-sm-2 control-label">模板内容:</label>
					<div class="col-sm-10">
						<textarea  class="form-control" validate="{required:true}" id="content" name="content" style="width: 100%;height: 220px;">${fn:escapeXml(template.content)}</textarea>
					</div>
					
					<label class="col-sm-2 control-label">描述:</label>
					<div class="col-sm-10">
						<p class="form-control-static">${template.comment}</p>
					</div>

				</div>
			</div>
		</div>
	</body>
</html>