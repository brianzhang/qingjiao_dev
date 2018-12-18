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
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save"><span>保存</span></a>
				<a href="${ctx}/loanp/apply/applyMoney/list.htm?tx=0" class="btn btn-primary fa fa-back"><span>返回</span></a>
			</div>
		</div>
		<div class="">
		     <input  type="hidden"   id="demoLoanForm"   value="${xinDaiLiuCheng.id}"  />
				<input   type="hidden"  id="id" name="m:demoLoan:id" value="${applyMoney.id}" />
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">客户名称确认</label>
						<div class="fr-form-block">
							<input type="text" id="name" class="fr-form-control" name="m:demoLoan:name"
								value="${applyMoney.customer}" validate="{required:false" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">文件配置模板</label>
						<div class="fr-form-block">
							<select name="modelId" id="model"
							    value="${xinDaiLiuCheng.wj}" 
								style="display: none; width: 100%" class="form-control"
								data-toggle="select2" data-multiple="false"
								data-ajax="${ctx }/platform/codegen/tableData/select.htm?tableName=t_business_model&select=name_">
							</select>
						</div>
					</div>
				</div>
           
		</div>
	</div>
</body>

<script type="text/javascript"
	src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
<script type="text/javascript"
	src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/loanp/demo/demoLoan.js"></script>
</html>
