<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/job/jobLog.js"></script>
		<title>定时器运行日志管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/job/jobLog/remove.htm"><span>删除</span></a>
						        <c:choose>
							        <c:when test="${param. jobName != null  || param. trigName!=null}">
							       		 <a class="btn btn-primary fa fa-back"   href="${ctx}/platform/job/scheduler/jobList.htm" ><span>返回</span></a>
							        </c:when>
						        </c:choose>
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
										<input type="hidden"  name="Q^JOB_NAME_^SL"  class="form-control"  value="${param. jobName}" />
										<input type="hidden"  name="Q^TRIG_NAME_^SL"  class="form-control"  value="${param. trigName}"  />
										<input type="hidden"  name="Q^GROUP_^SL"  class="form-control"  value="${param. group}"  />
										<div class="form-group">
											<label class="search-label">开始时间 </label>:
											<input type="text" name="Q^START_TIME_^DL"  class="form-control date"  />
										</div>
										<div class="form-group">
											<label class="search-label" >至</label>:
											<input type="text" name="Q^START_TIME_^DG"  class="form-control date" />
										</div>
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<input type="hidden"  id="jobName"  class="form-control"  value="${param. jobName}" />
				<input type="hidden"  id="trigName"  class="form-control"  value="${param. trigName}"  />
				<input type="hidden"  id="group"  class="form-control"  value="${param. group}"  />
				<div class="jqGrid_wrapper">
					<table id="jobLogGrid" ></table>
					<div id="jobLogPager"></div>
				</div>
		</div>
	
	</body>
	
</html>