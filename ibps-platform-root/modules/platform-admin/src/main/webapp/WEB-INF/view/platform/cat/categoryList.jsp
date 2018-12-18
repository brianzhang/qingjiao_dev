<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/category.js"></script>
		<title>分类标识表管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/cat/category/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/cat/category/get.htm" ><span>明细</span></a>	 
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
											<label   class="search-label">业务主键</label>:
											<input type="text"  name="Q^CATEGORY_KEY_^SL"  class="form-control"  />
										</div> 
									</div>
									<div  class="form-inline p-xxs">
										<div class="form-group">
											<label   class="search-label">是否默认</label>:
											<select name="Q^FLAG_^SN" class="form-control search-select" >
												<option value="">全部</option>
												<option value="1" >是</option>
												<option value="0" >否</option>
											</select>
										</div> 
										<div class="form-group">
											<label   class="search-label">结构类型</label>:
											<select name="Q^TYPE_^SN" class="form-control search-select" >
												<option value="">全部</option>
												<option value="0" >平铺结构</option>
												<option value="1" >树型结构</option>
											</select>
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="categoryGrid" ></table>
					<div id="categoryPager"></div>
				</div>
		</div>
	
	</body>
	
</html>