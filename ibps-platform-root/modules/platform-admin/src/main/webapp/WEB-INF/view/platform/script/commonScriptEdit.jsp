<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<f:link href="codemirror/lib/codemirror.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/groovy/groovy.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/script/commonScript.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-edit" ><span>脚本编辑器</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="commonScriptForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">脚本名称:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${commonScript.name}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">脚本:</label>
                                <div class="col-sm-10">
                                    <%-- <input type="text" class="form-control"  id="script" name="script" value="${commonScript.script}"  validate="{required:false}"/> --%>
                                    <textarea class="form-control"  id="script" name="script" style="width: 100%;height: 220px;">${fn:escapeXml(commonScript.script)}</textarea>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">脚本分类:</label>
                                <div class="col-sm-10">
                                    <%-- <input type="text" class="form-control"  id="category" name="category" value="${commonScript.category}"  validate="{required:false,maxlength:192}"/> --%>
                                    <select class="form-control" id="category" name="category" >
                                    	<c:forEach var="scriptType" items="${typeList}">
                                    		<option value="${scriptType.typeKey }"  <c:if test="${scriptType.typeKey == commonScript.category}">selected</c:if> >${scriptType.name }</option>
                                    	</c:forEach>
                                    </select>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">备注:</label>
                                <div class="col-sm-10">
                                    <%-- <input type="text" class="form-control"  id="memo" name="memo" value="${commonScript.memo}"  validate="{required:false}"/> --%>
                                    <textarea class="form-control"  rows="3" cols="10"  id="memo" name="memo">${commonScript.memo}</textarea>
                                </div>
                            </div>
					<input type="hidden" name="id" value="${commonScript.id}" />
					</form>
				</div>
		</div>
	</body>
</html>