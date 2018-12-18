<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/employeeDic.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-close" onclick="DialogUtil.closeDialog()"><span>关闭</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="employeeDicForm" action="save.htm" >
					<div class="panel-body">
						<div class="wrapper wrapper-content animated fadeInRight col-sm-12">
							<div class="row">
								<label class="fr-control-label">授权给</label>
							  	<%-- <div class="fr-form-block">
								<div class="fr-selector" data-toggle="selector" data-type="user" 
									data-bind-id="m:employeeDic:userId" data-single="true">
									<ul class="selector-list" id="userId"></ul>
									<textarea style="display: none" 
									name="m:employeeDic:userId" validate="{required:true}">${employeeDic.userId}</textarea>
									<textarea style="display: none"   
									data-control="selector"  name="m:employeeDic:userName" >${employeeDic.userName}</textarea>
								</div>
							 	</div> --%>
							  	<div class="fr-form-block">
										<input type="hidden" name="m:employeeDic:userId" id="userId" value="${employeeDic.userId}"/>
										<p class="fr-form-static">${employeeDic.userName}</p>
									</div>
							 	</div>
							</div>
							<div class="row">
								<div class="col-sm-12 panel-left panel-form">
									<div class="pos-tree-toolbar">
										<a class="btn btn-primary fa fa-refresh" title="刷新"></a> <a
											class="btn btn-primary fa fa-expand" title="展开"></a> <a
											class="btn btn-primary fa fa-compress" title="收缩"></a>
									</div>
									<div class="zTreeDemoBackground left">
										<ul id="dicTree" class="ztree"
											style="border: 1px solid #617775; height: 100%;"></ul>
									</div>
								</div>
								
<!-- 								<div class="col-sm-1 panel-center">
									<div>
										<div>&nbsp;</div>
										<div>&nbsp;</div>
										<a class="btn btn-primary fa fa-angle-double-right"
											href="javascript:employeeDic.addRow2Grid();"><span>分配</span></a>
										<a class="btn btn-primary fa fa-angle-double-left"
											href="javascript:employeeDic.clearGrid();"><span>清空</span></a>
									</div>
								</div>
								
								<div class="col-sm-8 panel-right">
									<div class="jqGrid_wrapper">
										<table id="dicItemGrid"></table>
									</div>
								</div> -->
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</body>
</html>