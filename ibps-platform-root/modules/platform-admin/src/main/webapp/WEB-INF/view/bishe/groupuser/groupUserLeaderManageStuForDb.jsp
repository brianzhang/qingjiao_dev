
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx }/js/lc/platform/form/onlineForm.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/groupuser/groupStuForDb.js"></script>
		<title>t_zyurl管理列表</title>
	</head>
	<body>
	<c:if test="${role == 'leader' }">
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
						<input type="hidden" name="type" id="type"  value="${type}"/>
						<input type="hidden" name="groupId" id="groupId"  value="${groupId}"/>
						<input type="hidden" name="role" id="role"  value="${role}"/>
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
									<label   class="search-label">班级</label>:
									<input type="text"  name="Q^CLASSR^SL"  class="form-control"  />
								</div>
							    <div class="form-group">
									<label   class="search-label">学号</label>:
									<input type="text"  name="Q^XH^SL"  class="form-control"  />
								</div>
								<div class="form-group">
									<label   class="search-label">姓名</label>:
									<input type="text"  name="Q^NAME^SL"  class="form-control"  />
								</div>  
								<div class="form-group">
									<label   class="search-label">指导教师</label>:
									<input type="text"  name="Q^FINALTEACHER^SL"  class="form-control"  />
								</div>
								 	
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="groupStuGrid" ></table>
					<div id="groupStuPager"></div>
				</div>
		</div>
	</c:if>
		<c:if test="${role == '' }">
			<p  style="color:red; font-size:15px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您好，您不是该小组组长，无法管理学生。</p>
		</c:if>
	
	</body>
	
</html>
