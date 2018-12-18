<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp" %>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/form.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyRoleDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyOrgRoleList.js"></script>
<script type="text/javascript">
var id = '${id}';
</script>
</head>
<body>
<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-add"    href="javascript:void(0);" ><span>添加角色</span></a>
							</div>
							<!-- 收缩 -->
							<div class="tools">
								<a href="javascript:void(0);" class="collapse">
									<i class="bigger-180 fa  fa-angle-double-up"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div class="jqGrid_wrapper">
					<table id="orgRoleAssignGrid" ></table>
					<div id="orgRoleAssignPager"></div>
				</div>
			</div>
</body>
</html>