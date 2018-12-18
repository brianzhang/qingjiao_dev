<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/TypeTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bo/boDef.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bo/BoSetCategoryDialog.js"></script>
		<title>业务对象定义管理列表</title>
	</head>
	<body>
		<div class="ui-layout-west">
			<div class="layout-header ">
				<h5>业务对象分类</h5>
				<div class="layout-tools">
					<a herf="javascript:void(0);" class="pinBtn"><i class="fa fa-angle-double-left"></i></a>
	            </div>
        	</div>
			<div class="tree-toolbar" >
				<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
				<a class="btn btn-primary fa fa-expand" title="展开"></a> 
				<a class="btn btn-primary fa fa-compress" title="收缩"></a>
			</div>
			<div id="typeTree" class="ztree" ></div>	
		</div>
	
		<div class="ui-layout-center">
			<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
				<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/bo/boDef/manage.htm?action=edit" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/bo/boDef/manage.htm?action=edit" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/bo/boDef/remove.htm"><span>删除</span></a>
						       	<a class="btn btn-primary fa fa-cog" href="javascript:void(0);"  id="setCategory"><span>设置分类</span></a>
						       	<%-- <a class="btn btn-primary fa fa-plus-circle" href="${ctx}/platform/bo/boDef/external.htm"><span>添加外部数据</span></a> --%>
						        <a class="btn btn-primary fa fa-export" href="javascript:void(0)"><span>导出</span></a>
						        <a class="btn btn-primary fa fa-import" href="javascript:void(0)"><span>导入</span></a>
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
										<input type="hidden"  id="typeId"  name="Q^TYPE_ID_^S"  />
										<div class="form-group">
											<label class="search-label">名称</label>:
											<input type="text" name="Q^NAME_^SL" class="form-control"  />
										</div> 
										<div class="form-group">
											<label class="search-label">编码</label>:
											<input type="text" name="Q^CODE_^SL" class="form-control"  />
										</div> 
										<div class="form-group">
											<label class="search-label">状态</label>:
											<select name="Q^STATUS_^S" class="form-control">
												<option value="">--全部--</option>
												<option value="actived">激活</option>
												<option value="inactive">未激活</option>
												<option value="forbidden">禁止</option>
											</select>
										</div> 
										<div class="form-group">
											<label class="search-label">是否生成表</label>:
											<select name="Q^IS_CREATE_TABLE_^S" class="form-control">
												<option value="">--全部--</option>
												<option value="Y">是</option>
												<option value="N">否</option>
											</select>
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="boDefGrid" ></table>
					<div id="boDefPager"></div>
				</div>
			</div>
		</div>
		
		<div id="typeMenu"  class="bootstrap-contextmenu" >
	         <ul class="dropdown-menu" role="menu">
	              <li><a data-action="node_add" tabindex="-1"  ><i class="fa fa-add"></i>&nbsp;&nbsp;增加分类</a></li>
	              <li><a  data-action="node_edit" tabindex="-1"><i class="fa fa-edit"></i>&nbsp;&nbsp;编辑分类</a></li>
	              <li><a data-action="node_del"  tabindex="-1"><i class="fa fa-remove"></i>&nbsp;&nbsp;删除分类</a></li>
	              <li class="divider"></li>
	              <li><a data-action="node_sort" tabindex="-1"><i class="fa fa-sort"></i>&nbsp;&nbsp;分类排序</a></li>
	         </ul>
	    </div>
	    
	    <input type="hidden" id="profix" value="${profix }"/>
	</body>
</html>