<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/TypeTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formRightsDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDef.js"></script>
		<title>表单管理列表</title>
	</head>
	<body>
		<div class="ui-layout-west">
			<div class="layout-header ">
				<h5>表单分类</h5>
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
									<a class="btn btn-primary fa fa-add"   href="javascript:formDef.createForm()" ><span>添加</span></a>
							        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/bpmn/bpmDefine/remove.htm"><span>删除</span></a>
						        	<a class="btn btn-primary fa fa-import"  href="javascript:void(0)"  ><span>导入</span></a>
							        <a class="btn btn-primary fa fa-export" href="javascript:void(0)" ><span>导出</span></a>
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
									<input type="hidden"  id="typeId"  name="Q^type_id_^SL"  />
										<div  class="form-inline p-xxs">
											<div class="form-group">
												<label   class="search-label">表单名称</label>:
												<input type="text"  name="Q^name_^SL"  class="form-control"  />
											</div> 
											<div class="form-group">
												<label   class="search-label">表单Key</label>:
												<input type="text"  name="Q^key_^SL"  class="form-control"  />
											</div> 
											<div class="form-group">
												<label   class="search-label">表单状态</label>:
				                            	<select name="Q^status_^S" class="form-control search-select" >
				                            		<option value="">请选择...</option>
													<option value="deploy">已发布</option>
													<option value="draft">草稿</option>
													<option value="forbidden">禁用</option>
												</select>
											</div>
										</div>
										<div  class="form-inline p-xxs">
											<div class="form-group">
												<label class="search-label">创建时间 </label>:
												<input type="text" name="Q^create_time_^DL"  class="form-control date"  />
											</div>
											<div class="form-group">
												<label class="search-label" >至</label>:
												<input type="text" name="Q^create_time_^DG"  class="form-control date" />
											</div>
										</div>
								</form>
							</div><!--/ 查询条件-->
						</div>
					</div><!--/ 操作、查询-->
					<div class="jqGrid_wrapper">
						<table id="formDefGrid" ></table>
						<div id="formDefPager"></div>
					</div>
			</div>
		</div>
	</body>
	
</html>