<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<%@include file="/commons/page/layout.jsp" %>
<%@include file="/commons/page/tree.jsp" %>
<script type="text/javascript">
var orgId = '${orgId}';
var tree = '${tree}';
</script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyUserSelector.js"></script>
</head>
<body >
	<c:if test="${!tree }">
		<div class="ui-layout-west"  >
			<div class="layout-header ">
				<h5>选择组织</h5>
				<div class="layout-tools">
					<a herf="javascript:void(0);" class="pinleftBtn"> <i class="fa fa-angle-double-left"></i></a>
				</div>
			</div>
			<div class="tree-toolbar">
				 <a class="btn btn-primary fa fa-refresh" title="刷新"></a>
				 <a class="btn btn-primary fa fa-expand" title="展开"></a>
				 <a class="btn btn-primary fa fa-compress" title="收缩"></a>
			</div>
			<div id="partyOrgTree" class="ztree"></div>
		</div>
	</c:if>
	
	<div class="ui-layout-center">
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div>
				<div name="user_container" class="selector-container">
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
							<div  class="form-inline pd-5">
								<div class="form-group">
									<label   class="search-label">用户帐号</label>:
									<input type="text" id="account" name="Q^account_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">姓名</label>:
									<input type="text"  id="name" name="Q^full_name_^SL"  class="form-control"  />
								</div> 
								<input type="hidden"  id="orgId" name="Q^GROUP_ID_^S"  class="form-control"  />
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="jqGrid_wrapper">
				<table id="partyUserDialogGrid" ></table>
				<div id="partyUserDialogPager"></div>
			</div>
		</div>
	</div>
</body>
</html>