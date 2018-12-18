<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/cgxq1.js"></script>
		<title>t_cgxq管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/codegen/cgxq1/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/codegen/cgxq1/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/codegen/cgxq1/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">项目名称</label>:
									<input type="text"  name="Q^PUR_PRO_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">采购计划编号</label>:
									<input type="text"  name="Q^PUR_PLAN_CODE_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">登记日期 </label>:
									<input type="text" name="Q^PUR_REG_DATE_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^PUR_REG_DATE_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">申报部门</label>:
									<input type="text"  name="Q^PUR_APPLY_DEPT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">采购执行部门</label>:
									<input type="text"  name="Q^PUR_OPERA_DEPT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">采购金额</label>:
									<input type="text"  name="Q^PUR_AMOUNT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">采购预算指标</label>:
									<input type="text"  name="Q^PUR_BU_INDEX_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">项目类型</label>:
									<input type="text"  name="Q^PUR_PRO_TYPE_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">项目所属预算年度</label>:
									<input type="text"  name="Q^PUR_PRO_BUD_YEAR_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">投标人资格要求</label>:
									<input type="text"  name="Q^PUR_ZG_REQUIRE_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">备注</label>:
									<input type="text"  name="Q^PUR_REMARK_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">操作人</label>:
									<input type="text"  name="Q^CREATE_BY_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">操作时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div>
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="cgxq1Grid" ></table>
				<div id="cgxq1Pager"></div>
			</div>
		</div>
	
	</body>
	
</html>