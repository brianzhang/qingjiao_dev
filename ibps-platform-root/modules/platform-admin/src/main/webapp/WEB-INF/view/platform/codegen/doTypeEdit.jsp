<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
		<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/TypeTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/comboTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/doType.js"></script>
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
				<form class="form-horizontal" id="doTypeForm"  action="save.htm"   method="post">
					<div>
<%-- 						<div class="form-group">
	                        <label class="col-sm-2 control-label">分类:</label>
	                        <div class="col-sm-10">
	                            <input type="hidden" class="form-control"  id="typeId" name="typeId" value="${doType.typeId}"/>
                        		<input type="text" class="form-control comboTree" id="typeName"
                                  	data-toggle="comboTree"  data-type="TEMPLATE_TYPE" data-id="#typeId" readonly value="${doType.typeName}"
                                  	validate="{required:false,maxlength:64}"  />
	                        </div>
	                    </div> --%>
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">类型key:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="key" name="key" value="${doType.key}"  validate="{required:true,maxlength:64}"/>
	                        </div>
	                    </div>
						<div class="group">
	                        <label class="col-sm-2 control-label">类型名称:</label>
	                        <div class="col-sm-4">
	                            <input type="text" class="form-control"  id="name" name="name" value="${doType.name}"  validate="{required:true,maxlength:64}"/>
	                        </div>
	                    </div>
	                    </div>
	                    
						<div class="form-group">
						<div class="group">
	                        <label class="col-sm-2 control-label">子集类型:</label>
	                        <div class="col-sm-4">
	                            <select id="subType" name="subType"  class="form-control search-select">
									<option <c:if test="${doType.subType == 'doType'}">selected</c:if> value="doType">生成类型</option>
									<option <c:if test="${empty doType || empty doType.subType || doType.subType == 'template'}">selected</c:if> value="template">模板</option>
								</select>
	                        </div>
	                    </div>
						<div class="group">
	                        <label class="col-sm-2 control-label">是否默认:</label>
	                        <div class="col-sm-4">
	                            <label class="radio-inline">
                               	 	<input type="radio" class="ibps" value="true" name="isDef" <c:if test="${doType.isDef == 'true'}">checked</c:if> />
                               	 	<span class="lbl">是</span>
                                </label>
                                <label class="radio-inline">
                               	 	<input type="radio" class="ibps"  value="false" name="isDef" <c:if test="${empty doType || empty doType.isDef || doType.isDef == 'false'}">checked</c:if> />
                               	 	<span class="lbl">否</span>
                                </label>
	                        </div>
	                    </div>
	                    </div>
	                    
	                    <div class="form-group">
	                        <label class="col-sm-2 control-label">子集keys:</label>
	                        <div class="col-sm-10" id="subKeysDiv">
	                            <c:forEach var="template" items="${templateList}">	
	                            <label class="checkbox-inline">
                               	 	<input type="checkbox" class="ibps" value="${template.key }" name="subKeys" <c:if test="${fn:contains(doType.subKeys,template.key)}" >checked="checked"</c:if> />
                               	 	<span class="lbl">${template.name }</span>
                                </label>
                                </c:forEach>
                                
	                            <c:forEach var="doType" items="${doTypeList}">	
	                            <label class="checkbox-inline">
                               	 	<input type="checkbox" class="ibps" value="${doType.key }" name="subKeys" <c:if test="${fn:contains(doType.subKeys,doType.key)}" >checked="checked"</c:if> />
                               	 	<span class="lbl">${doType.name }</span>
                                </label>
                                </c:forEach>
	                        </div>
	                        <%-- <div class="col-sm-10" id="subKeysDiv">
	                            <select id="subKeys" name="subKeys" class="form-control"
	                             data-toggle="select2"
	                             data-value="${doType.subKeys}"
	                             validate="{required:true}"
	                             >
								</select>
	                        </div> --%>
	                    </div>
	                    
						<div class="form-group">
	                        <label class="col-sm-2 control-label">描述:</label>
	                        <div class="col-sm-10">
	                            <textarea id="comment" name="comment" cols="60" rows="5" class="form-control" >${doType.comment }</textarea>
	                        </div>
	                    </div>
	                    
	                    <input type="hidden" id="id" name="id" value="${doType.id}" />
	                    <input type="hidden" name="creator" value="${doType.creator}" />
 						<input type="hidden" name="createTime" value="<fmt:formatDate value="${doType.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/>" />
					</div>
				</form>
			</div>
		</div>
		
		<script type="text/html" id="chkTemplate">
		<label class="checkbox-inline">
        	<input type="checkbox" class="ibps" value="{{key}}" name="subKeys" />
        	<span class="lbl">{{name }}</span>
        </label>
		</script>
	</body>
</html>