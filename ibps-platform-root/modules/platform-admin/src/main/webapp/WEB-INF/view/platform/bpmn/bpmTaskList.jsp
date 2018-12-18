<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTask.js"></script>
		<title>流程任务管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-danger fa fa-ioxhost" href="javascript:void(0);" ><span>终止</span></a>
								<a class="btn btn-primary fa fa-check-square-o fa-agree" href="javascript:void(0);" ><span>同意</span></a>
								<a class="btn btn-primary fa fa-ioxhost fa-suspend" href="javascript:void(0);" key="suspend"><span>挂起</span></a>
								<a class="btn btn-primary fa fa-ioxhost fa-recover" href="javascript:void(0);" key="suspend"><span>恢复</span></a>
								<a class="btn btn-primary fa fa-cog" id="cog" href="javascript:void(0);" ><span>指定执行人</span></a>
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
											<label   class="search-label">任务名称</label>:
											<input type="text"  name="Q^name_^SL"  class="form-control"  />
										</div>
										<div class="form-group">
											<label   class="search-label">任务类型</label>:
			                            	<select name="Q^status_^S" class="form-control search-select" >
												<option value="">全部</option>
												<option value="NORMAL">普通</option>
												<option value="AGENT">代理</option>
												<option value="DELIVERTO">转交</option>
											</select>
										</div> 
										
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
					<table id="bpmTaskGrid" ></table>
					<div id="bpmTaskPager"></div>
				</div>
		</div>
	</body>
</html>