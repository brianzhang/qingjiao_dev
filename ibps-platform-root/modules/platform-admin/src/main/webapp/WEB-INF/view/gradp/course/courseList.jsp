
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/gradp/course/course.js"></script>
		<title>t_course管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search hidden" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/course/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/gradp/course/course/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/gradp/course/course/remove.htm"><span>删除</span></a>
					        <a class="btn btn-primary fa fa-upload" href="javascript:void(0);" id="importCourse"><span>导入课程</span></a>
					       <!--  <a class="btn btn-primary fa fa-upload" href="javascript:void(0);" id="uniManage"><span>院系管理课程</span></a> -->
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
									<label   class="search-label">课程编号</label>:
									<input type="text"  name="Q^NUM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">课程名称</label>:
									<input type="text"  name="Q^NAME^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">学时</label>:
									<input type="text"  name="Q^PERIOD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">学分</label>:
									<input type="text"  name="Q^CREDIT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">开课院系</label>:
									<input type="text"  name="Q^COLLEGE^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="courseGrid" ></table>
				<div id="coursePager"></div>
			</div>
		</div>
	
	</body>
	
</html>
