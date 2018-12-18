

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<f:link href="codemirror/lib/codemirror.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/template.js"></script>
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
				<form class="form-horizontal" id="templateForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">模板key:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="key" name="key" value="${template.key}"  validate="{required:true,maxlength:64}"/>
	                        </div>
	                    </div>
						<div class="group">
	                        <label class="col-sm-2 control-label">模板名称:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="name" name="name" value="${template.name}"  validate="{required:true,maxlength:64}"/>
	                        </div>
	                    </div>
	                    </div>
	                    
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">文件名:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="filename" name="filename" value="${template.filename}"  validate="{required:true,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="group">
	                        <label class="col-sm-2 control-label">代码目录:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="dir" name="dir" value="${template.dir}"  validate="{required:true,maxlength:765}"/>
	                        </div>
	                    </div>
	                    </div>
	                    
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">是否子表:</label>
	                        <div class="col-sm-4">
	                            <label class="radio-inline">
                               	 	<input type="radio" class="ibps" value="true" name="sub" <c:if test="${empty template || empty template.sub || template.sub == 'true'}">checked</c:if> />
                               	 	<span class="lbl">是</span>
                                </label>
                                <label class="radio-inline">
                               	 	<input type="radio" class="ibps"  value="false" name="sub" <c:if test="${template.sub == 'false'}">checked</c:if> />
                               	 	<span class="lbl">否</span>
                                </label>
	                        </div>
	                    </div>
						<div class="group">
	                        <label class="col-sm-2 control-label">是否覆盖:</label>
	                        <div class="col-sm-4">
	                            <label class="radio-inline">
                               	 	<input type="radio" class="ibps" value="true" name="override" <c:if test="${empty template || empty template.override ||template.override == 'true'}">checked</c:if> />
                               	 	<span class="lbl">是</span>
                                </label>
                                <label class="radio-inline">
                               	 	<input type="radio" class="ibps"  value="false" name="override" <c:if test="${template.override == 'false'}">checked</c:if> />
                               	 	<span class="lbl">否</span>
                                </label>
	                        </div>
	                    </div>
	                    </div>
	                    
						<div class="form-group">
	                        <label class="col-sm-2 control-label">模板路径:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="path" name="path" value="${template.path}"  validate="{required:false,maxlength:765}"/>
	                        </div>
	                    </div>
	                    
						<div class="form-group">
	                        <label class="col-sm-2 control-label">模板内容:</label>
	                        <div class="col-sm-10">
	                            <textarea  class="form-control" validate="{required:true}" id="content" name="content" style="width: 100%;height: 220px;">${fn:escapeXml(template.content)}</textarea>
	                        </div>
	                    </div>
	                    
						<div class="form-group">
	                        <label class="col-sm-2 control-label">描述:</label>
	                        <div class="col-sm-10">
	                            <textarea id="comment" name="comment" cols="60" rows="5" class="form-control" >${template.comment }</textarea>
	                        </div>
	                    </div>
	                    
 						<input type="hidden" name="id" value="${template.id}" />
 						<input type="hidden" name="isDef" value="${template.isDef}" />
 						<input type="hidden" name="creator" value="${template.creator}" />
 						<input type="hidden" name="createTime" value="<fmt:formatDate value="${template.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/>" />
					</div>
					
				</form>
			</div>
		</div>
		
	</body>
</html>