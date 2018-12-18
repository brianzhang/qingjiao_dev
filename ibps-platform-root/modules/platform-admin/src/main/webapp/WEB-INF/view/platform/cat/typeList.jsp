<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/type.js"></script>
		<title>分类表。用于显示平级或树层次结构的分类，可以允许任何层次结构。管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/cat/type/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/cat/type/edit.htm" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/cat/type/remove.htm"><span>删除</span></a>
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
											<label   class="search-label">分类组键</label>:
											<input type="text"  name="Q^CATEGORYP_KEY_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">分类名称</label>:
											<input type="text"  name="Q^NAME_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">节点的分类Key(在本分类树中唯一)</label>:
											<input type="text"  name="Q^TYPE_KEY_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">flat 平行；tree 树形</label>:
											<input type="text"  name="Q^STRU_TYPE_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">父节点</label>:
											<input type="text"  name="Q^PARENT_ID_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">层次</label>:
											<input type="text"  name="Q^DEPTH_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">路径</label>:
											<input type="text"  name="Q^PATH_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">是否叶子节点。Y=是；N=否</label>:
											<input type="text"  name="Q^IS_LEAF_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">所属人ID (如果为0表示这个分类为公共分类,有用户id 表示为私有分类)</label>:
											<input type="text"  name="Q^OWNER_ID_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">序号</label>:
											<input type="text"  name="Q^SN_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">创建人ID</label>:
											<input type="text"  name="Q^CREATE_BY_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label class="search-label">创建时间 </label>:
											<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
										</div>
										<div class="form-group">
											<label class="search-label" >至</label>:
											<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
										</div>
										<div class="form-group">
											<label   class="search-label">创建者所属组织ID</label>:
											<input type="text"  name="Q^CREATE_ORG_ID_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">更新人ID</label>:
											<input type="text"  name="Q^UPDATE_BY_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label class="search-label">更新时间 </label>:
											<input type="text" name="Q^UPDATE_TIME_^DL"  class="form-control date"  />
										</div>
										<div class="form-group">
											<label class="search-label" >至</label>:
											<input type="text" name="Q^UPDATE_TIME_^DG"  class="form-control date" />
										</div>
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="typeGrid" ></table>
					<div id="typePager"></div>
				</div>
		</div>
	
	</body>
	
</html>