<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/desktop/desktopMyLayout.js"></script>
		<title>我的桌面布局管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/desktop/desktopMyLayout/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/desktop/desktopMyLayout/edit.htm" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/desktop/desktopMyLayout/remove.htm"><span>删除</span></a>
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
											<label   class="search-label">用户ID</label>:
											<input type="text"  name="Q^USER_ID_^SL"  class="form-control"  />
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
											<label   class="search-label">布局管理ID</label>:
											<input type="text"  name="Q^LAYOUT_ID_^SL"  class="form-control"  />
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="desktopMyLayoutGrid" ></table>
					<div id="desktopMyLayoutPager"></div>
				</div>
		</div>
	
	</body>
	
</html>