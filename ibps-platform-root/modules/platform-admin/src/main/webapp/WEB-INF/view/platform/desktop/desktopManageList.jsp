<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/desktop/desktopManage.js"></script>
		<title>桌面布局管理管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/desktop/desktopManage/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"   action="${ctx}/platform/desktop/desktopManage/edit.htm" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/desktop/desktopManage/remove.htm"><span>删除</span></a>
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
									<!-- 	<div class="form-group">
											<label   class="search-label">组织ID</label>:
											<input type="text"  name="Q^GROUP_ID_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">模版内容</label>:
											<input type="text"  name="Q^TEMPLATE_HTML_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">设计模版</label>:
											<input type="text"  name="Q^DESIGN_HTML_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">是否是默认</label>:
											<input type="text"  name="Q^IS_DEF_^SL"  class="form-control"  />
										</div>  -->
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="desktopManageGrid" ></table>
					<div id="desktopManagePager"></div>
				</div>
		</div>
	
	</body>
	
</html>