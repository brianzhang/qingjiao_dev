<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/desktop/desktopManage.js"></script>
		<title>桌面管理-选择模版</title>
		<script type="text/javascript">
			function getData(){
				var id= $("#desktopManageSelectGrid").jqGrid('getGridParam', 'selarrrow');
				if (id == null || id.length == 0) {
					DialogUtil.msg("请选择记录！");
					return false
				}
				var data = $("#desktopManageSelectGrid").jqGrid("getRowData", id);
				return data.designHtml;
			}
		</script>
	</head>
	<body>
	<div class="panel-form">
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
									<div  class="form-inline p-xxs">
										<div class="form-group">
											<label   class="search-label">布局名称</label>:
											<input type="text"  name="Q^NAME_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">布局描述</label>:
											<input type="text"  name="Q^MEMO_^SL"  class="form-control"  />
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="desktopManageSelectGrid" ></table>
					<div id="desktopManagePager"></div>
				</div>
		</div>
	
	</body>
	
</html>