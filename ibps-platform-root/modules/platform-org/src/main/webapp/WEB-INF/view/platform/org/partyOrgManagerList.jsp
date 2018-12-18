<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp" %>
<script type="text/javascript">
	var orgId = "${orgId}";
</script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyOrgManagerList.js"></script>
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div  class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
						<a class="btn btn-primary fa fa-add" href="javascript:orgManager.addManager('${orgId }');" ><span>设置</span></a>
						<a class="btn btn-primary fa fa-remove" action="${ctx}/platform/org/partyOrg/removeManager.htm?orgId=${orgId}" href="javascript:void(0);"><span>撤销</span></a>
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
							<div  class="form-inline p-xxs">
								<div class="form-group">
									<label class="search-label">姓名</label>: <input type="text"
										id="name" name="Q^name_^SL" class="form-control" />
								</div>
							</div>
					</form>
				</div><!--/ 查询条件-->
			</div>
		</div>
		<div class="jqGrid_wrapper">
			<table id="orgManagerGrid" ></table>
			<div id="orgManagerPager"></div>
		</div>
	</div>
</body>
</html>