<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefCopy.js"></script>
<title>表单复制</title>
</head>
<body>
	<div class="panel-form">
		<form class="form-horizontal" id="formDefCopy"  action="saveCopy.htm"   method="post"  >
				<input type="hidden" id="id" name="id" value="${formDef.id}">
				<div class="form-group">
					<div  class="group">
                             <label class="col-sm-2 control-label">原表单名称:</label>
                             <div class="col-sm-4">
                                 <input type="text" class="form-control"  id="origname" name="origname" disabled="disabled"   value="${formDef.name}"  validate="{required:true,maxlength:384}"/>
                             </div>
                            </div>
                           <div  class="group">
                            <label class="col-sm-2 control-label">表单名称<span class="required">*</span>:</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control"  id="name" name="name"  data-pinyin="#key"   validate="{required:true,maxlength:60}"/>
                            </div>
                       </div>
                  </div>
                  	<div class="form-group">
					<div  class="group">
                             <label class="col-sm-2 control-label">原表单key:</label>
                             <div class="col-sm-4">
                                 <input type="text" class="form-control"  id="origkey" name="origkey" disabled="disabled"  value="${formDef.key}"  validate="{required:true,maxlength:384}"/>
                             </div>
                            </div>
                           <div  class="group">
                            <label class="col-sm-2 control-label">表单key<span class="required">*</span>:</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control"  id="key" name="key"   validate="{required:true,maxlength:60}"/>
                            </div>
                       </div>
                  </div>
               </form>
      </div>
</body>
</html>