<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/auth/authApiSelector.js"></script>
</head>
<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div>
			<div name="api_container" class="selector-container">
			</div>
		</div>
		<div  class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons"> 		
						<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
					</div>
					<!-- 收缩 -->
					<div class="tools">
						<a href="javascript:void(0);" class="collapse">
							<i class="bigger-180 fa  fa-angle-double-up"></i>
						</a>
					</div>
				</div>
				<!-- #查询条件-->
				<div class="toolbar-body" >
					<form role="form" class="search-form">
						<div  class="form-inline">
							<div class="form-group">
								<label   class="search-label">应用key</label>:
								<input type="text"  name="Q^APP_KEY_^SL"  class="form-control"  />
							</div> 
							<div class="form-group">
								<label   class="search-label">API标识</label>:
								<input type="text"  name="Q^API_KEY_^SL"  class="form-control"  />
							</div> 
							<div class="form-group">
								<label   class="search-label">API名称</label>:
								<input type="text"  name="Q^API_NAME_^SL"  class="form-control"  />
							</div> 
							<div class="form-group">
								<label   class="search-label">API地址</label>:
								<input type="text"  name="Q^API_URI_^SL"  class="form-control"  />
							</div> 
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="jqGrid_wrapper">
			<table id="authApiDialogGrid" ></table>
			<div id="authApiDialogPager"></div>
		</div>
	</div>
</body>
</html>