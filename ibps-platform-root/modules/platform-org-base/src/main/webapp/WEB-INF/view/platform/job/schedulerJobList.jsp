<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/job/schedulerJob.js"></script>
		<title>定时计划管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<!-- <a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a> -->
								<c:if test="${isShutdown == true }">
								<a class="btn btn-primary fa fa-play"   href="${ctx}/platform/job/scheduler/toggleSchedulerRun.htm?state=start" ><span>启动调度器</span></a>
								</c:if>
								<c:if test="${isShutdown == false }">
								<a class="btn btn-primary fa fa-pause"   href="${ctx}/platform/job/scheduler/toggleSchedulerRun.htm?state=stop" ><span>停止调度器</span></a>
								</c:if>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/job/scheduler/jobEdit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-times" href="javascript:void(0);"  action="${ctx}/platform/job/scheduler/jobRemove.htm"><span>删除</span></a>
							</div>
							
							<!-- 收缩
							<div class="tools">
								<a href="javascript:void(0);" class="collapse">
									<i class="bigger-180 fa  fa-angle-double-up"></i>
								</a>
							</div>
							 -->
						</div>
						<!-- #查询条件
						<div class="toolbar-body" >
							<form role="form" class="search-form">
									<div  class="form-inline p-xxs">
									 	<div class="form-group">
											<label   class="search-label">DESCRIPTION</label>:
											<input type="text"  name="Q^DESCRIPTION^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">JOB_CLASS_NAME</label>:
											<input type="text"  name="Q^JOB_CLASS_NAME^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">IS_DURABLE</label>:
											<input type="text"  name="Q^IS_DURABLE^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">IS_NONCONCURRENT</label>:
											<input type="text"  name="Q^IS_NONCONCURRENT^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">IS_UPDATE_DATA</label>:
											<input type="text"  name="Q^IS_UPDATE_DATA^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">REQUESTS_RECOVERY</label>:
											<input type="text"  name="Q^REQUESTS_RECOVERY^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">JOB_DATA</label>:
											<input type="text"  name="Q^JOB_DATA^SL"  class="form-control"  />
										</div>
									</div>
							</form>
						</div>
						-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="schedulerJobGrid" ></table>
					<div id="schedulerJobPager"></div>
				</div>
		</div>
	
	</body>
	
</html>