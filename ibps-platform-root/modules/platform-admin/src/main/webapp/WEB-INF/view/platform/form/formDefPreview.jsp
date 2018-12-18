<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
	<%@include file="/commons/page/customform.jsp"%>
	<f:link href="lc/form/formPreview.css"  isCommon="false"/>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefPreview.js"></script>
</head>
	<body>
		<div  class="srcoll-panel">
			<div class="panel-toolbar stuckMenu">
					<div class="buttons">
						<a href="javascript:void(0);" class="btn btn-primary fa fa-save js-preview"  ><span>预览数据</span></a>
			<%-- 			<c:if test="${not empty id}">
							<a href="javascript:void(0);" class="btn btn-primary fa fa-save js-gen-template"  ><span>生成模版</span></a>
							</c:if> --%>
						<a href="javascript:void(0);" class="btn btn-primary fa fa-close"><span>关闭</span></a>
					</div>
			</div>
			<div  class="panel-preview">
    			<form data-formrenderer></form>
    		</div>
    		<input type="hidden" id="id"  value="${id }"/>
    		<input type="hidden" id="mode"  value="${mode }"/>
			<textarea id="data" rows="0" cols="0" style="display: none;">${data}</textarea>
		 </div>
	</body>
</html>