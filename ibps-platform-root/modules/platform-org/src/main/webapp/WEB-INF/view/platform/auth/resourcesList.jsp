<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/resources.js"></script>
		<title>系统资源管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/auth/resources/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/auth/resources/edit.htm" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/auth/resources/remove.htm"><span>删除</span></a>
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
											<label   class="search-label">资源名称</label>:
											<input type="text"  name="Q^name_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">alias_</label>:
											<input type="text"  name="Q^alias_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">排序号</label>:
											<input type="text"  name="Q^sn_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">图标</label>:
											<input type="text"  name="Q^icon_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">父类ID</label>:
											<input type="text"  name="Q^parent_id_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">默认URL</label>:
											<input type="text"  name="Q^default_url_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">是否文件夹</label>:
											<input type="text"  name="Q^is_folder_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">显示到菜单</label>:
											<input type="text"  name="Q^display_in_menu_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">是否展开</label>:
											<input type="text"  name="Q^is_open_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">系统ID</label>:
											<input type="text"  name="Q^system_id_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">资源路径 使用/分割</label>:
											<input type="text"  name="Q^path_^SL"  class="form-control"  />
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="resourcesGrid" ></table>
					<div id="resourcesPager></div>
				</div>
		</div>
	
	</body>
	
</html>