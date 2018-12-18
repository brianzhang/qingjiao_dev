<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/TypeTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/comboTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/data/datasetSetCategoryDialog.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content col-sm-12">
		<div class="panel-form col-sm-12">
			<form id="frmDel">
				<div class="form-group col-sm-12">
					<label class="col-sm-2 control-label">设置分类:
					</label>
					<div class="col-sm-10">
						<input type="hidden" class="form-control"  id="typeId" name="typeId" value="${typeId}" />
                        <input type="text" class="form-control comboTree"  
                                  data-toggle="comboTree"  data-type="DATASET_TYPE" data-id="#typeId"  readonly
                                  validate="{required:true}"/>
					</div>
				</div>
			
			</form>
		</div>
		</div>
	</body>
</html>