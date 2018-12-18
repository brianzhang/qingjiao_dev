
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<%
	boolean f = request.getParameter("f").equals("1");
	boolean r = request.getParameter("jl") == null;
	String c = request.getParameter("t");
	boolean q = request.getParameter("t").equals("3");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link  href="bootstrap/bootstrap-tour.min.css" />
<title>t_job_std管理列表</title>
</head>
<body>
	<c:if test="${a==1 }">
		<script type="text/javascript">
			DialogUtil.closeAll();
			DialogUtil.error("非法操作！error：js恶意篡改！<br>已将您的非法行为记录，<br>系统将参考您近期的非法操作，<br>严重者将被禁止登录本系统！<br>若想交流安全技术，请联系管理员");
		</script>
	</c:if>
	<input type="hidden" id="jobId" value="<%=request.getParameter("id")%>">
	<input type="hidden" id="f" value="<%=request.getParameter("f")%>">
	<input type="hidden" id="c" value="<%=c%>">
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						 <a
							class="btn btn-primary fa fa-search"  style="display: none"
							href="javascript:void(0);"><span>搜索</span></a>
						<%-- <a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/jobStd/edit.htm" ><span>添加</span></a> --%>
						<c:if test="<%=!q%>">
							<c:if test="<%=r && f%>">
							</c:if>
							<c:if test="<%=!r && !f%>">
								<a class="btn btn-primary fa fa-edit" href="javascript:void(0);"
									action="${ctx}/gradp/course/jobStd/markScore.htm?t=0"><span>评分</span></a>
							</c:if>
						</c:if>
						<a class="btn btn-primary fa" href="javascript:void(0);" onclick="intro()"><i class="fa fa-question-circle-o"></i>查看引导</a>
						<%-- <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/gradp/course/jobStd/remove.htm"><span>删除</span></a> --%>
						<h1 style="float:right;margin:3px"id="title">${curtitle }</h1>
					</div>
					<!-- 收缩 -->
					<div class="tools">
						<a href="javascript:void(0);" class="collapse"> <i
							class="bigger-180 fa  fa-angle-double-up"></i>
						</a>
					</div>
				</div>
				<!-- #查询条件-->
				<div class="toolbar-body">
					<form role="form" class="search-form">
						<div class="form-inline p-xxs">
							<!-- <div class="form-group">
									<label   class="search-label">作业ID</label>:
									<input type="text"  name="Q^JOBID^SL"  class="form-control"  />
								</div>  -->
							<div class="form-group">
								<label class="search-label">学号</label>: <input type="text" id="search"
									name="Q^STD_NUM^SLR" class="form-control" onkeyup="cg()" />
							</div>
							<c:if test="<%=f%>">
								<div class="form-group" id="rs">
									<label class="search-label">评阅状态</label>: <select
										name="Q^REVIEW_STATUS^S" class="form-control search-select"
										onchange="cg()">
										<option value="">all</option>
										<option value="0">未评阅</option>
										<option value="1">已评阅</option>
									</select>
								</div>
							</c:if>

							<!-- <div class="form-group">
									<label   class="search-label">文件上传时间</label>:
									<input type="text"  name="Q^FILE_UPLOAD_TIME^SL"  class="form-control"  />
								</div>  -->
							<!-- <div class="form-group">
									<label   class="search-label">作业成绩</label>:
									<input type="text"  name="Q^SCORE^SL"  class="form-control"  />
								</div>  -->
							<!-- <div class="form-group">
									<label   class="search-label">完成状态</label>:
									<input type="text"  name="Q^STATUS^SL"  class="form-control"  />
								</div>  -->
						</div>
					</form>
				</div>
				<!--/ 查询条件-->
			</div>
		</div>
		<!--/ 操作、查询-->
		<div class="jqGrid_wrapper">
			<table id="jobStdGrid"></table>
			<div id="jobStdPager"></div>
		</div>
	</div>

</body>

<script type="text/javascript" src="${ctx}/js/lc/gradp/course/jobStd.js"></script>
<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>
</html>
