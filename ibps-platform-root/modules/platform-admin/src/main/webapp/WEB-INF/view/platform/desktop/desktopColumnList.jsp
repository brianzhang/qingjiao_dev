<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/desktop/desktopColumn.js"></script>
		<title>桌面栏目管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/desktop/desktopColumn/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/desktop/desktopColumn/edit.htm" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/desktop/desktopColumn/remove.htm"><span>删除</span></a> 
								<a class="btn btn-primary fa fa-codepen" href="javascript:void(0);"  id="initTemplate"  action="${ctx}/platform/desktop/desktopColumn/initTemplate.htm"><span>初始化栏目</span></a>
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
											<label   class="search-label">名称</label>:
											<input type="text"  name="Q^NAME_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">别名</label>:
											<input type="text"  name="Q^ALIAS_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">类型</label>:
											<select class="form-control search-select"   name="Q^COL_TYPE_^SN" >
												<option value="">全部</option>
												<option value="0">一般</option>
												<option value="1">图表</option>
												<option value="2">日历</option>
												<option value="3">滚动</option>
											</select>
										</div>  
										<div class="form-group">
											<label   class="search-label">类型</label>:
											<select class="form-control search-select"   name="Q^IS_ENABLED_^S" >
												<option value="">全部</option>
												<option value="Y">启动</option>
												<option value="N">禁用</option>
											</select>
										</div>  
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="desktopColumnGrid" ></table>
					<div id="desktopColumnPager"></div>
				</div>
		</div>
	
	</body>
	
</html>