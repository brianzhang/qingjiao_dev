<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/budgetApply.js"></script>
		<title>t_budgetapply2018管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/codegen/budgetApply/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/codegen/budgetApply/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/codegen/budgetApply/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">IP地址</label>:
									<input type="text"  name="Q^IP_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">创建人</label>:
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
									<label   class="search-label">更新人</label>:
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
								<div class="form-group">
									<label   class="search-label">申请人</label>:
									<input type="text"  name="Q^PROPOSER_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">申请人名称</label>:
									<input type="text"  name="Q^PROPOSER_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">申请部门</label>:
									<input type="text"  name="Q^APPLY_DEPT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">申请人部门名称</label>:
									<input type="text"  name="Q^APPLY_DEPT_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">申请时间 </label>:
									<input type="text" name="Q^APPLY_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^APPLY_TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">产品</label>:
									<input type="text"  name="Q^PRODUCT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">市场范围</label>:
									<input type="text"  name="Q^MARKET_AREA_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">所属区域</label>:
									<input type="text"  name="Q^AREA_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">办事处</label>:
									<input type="text"  name="Q^OFFICE_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">预算金额</label>:
									<input type="text"  name="Q^BUDGET_AMOUNT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">事项描述</label>:
									<input type="text"  name="Q^EVENT_DESC_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">备注</label>:
									<input type="text"  name="Q^REMARK_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">上级领导审批</label>:
									<input type="text"  name="Q^LEADER_APPOVAL_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="budgetApplyGrid" ></table>
				<div id="budgetApplyPager"></div>
			</div>
		</div>
	
	</body>
	
</html>