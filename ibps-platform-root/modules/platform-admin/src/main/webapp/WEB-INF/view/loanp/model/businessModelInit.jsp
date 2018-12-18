<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link href="select2/select2.min.css" />
<f:link href="select2/select2-bootstrap.min.css" />
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  col-sm-12">
		<div class="panel-form">
				<form class="form-horizontal" id="businessModelInitForm" method="post">
					<div class="form-group">
                        <label class="col-sm-2 control-label">模板名称<span class="required">*</span>:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control"  data-pinyin="#key"  id="name" name="name"   validate="{required:true,maxlength:64}"/>
                        </div>
                    </div>
                    <div class="form-group">
                    	<label class="col-sm-2 control-label">选择属性模板<span class="required">*</span>:</label>
						<select id="propModel" name="propModelName" style="width: 100%"
							data-toggle="select2" data-multiple="false" validate="{required:true,maxlength:64}"
							data-ajax="${ctx }/loanp/model/businessModel/propModelList.htm">
						</select>
                    </div>
			</form>
		</div>
	</div>
</body>
<script type="text/javascript"
	src="${ctx}/js/lc/loanp/model/businessModelInit.js"></script>
<script type="text/javascript"
	src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
</html>
