
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/teacherAndStudent/teacherAndStudent2.js"></script>
		<title>t_tddsxs管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">  
				<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-caret-square-o-right" href="javascript:void(0);"><span>启动流程</span></a>		 
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
									<label   class="search-label">教师员工号</label>:
									<input type="text"  name="Q^TEACHERID^SL"  class="form-control"  />
								</div>
								<div class="form-group">
									<label   class="search-label">教师姓名</label>:
									<input type="text"  name="Q^JS^SL"  class="form-control"  />
								</div>  
								 	
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="teacherAndStudentGrid" ></table>
				<div id="teacherAndStudentPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
