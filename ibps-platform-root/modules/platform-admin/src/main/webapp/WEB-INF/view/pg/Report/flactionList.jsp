
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/Report/flaction.js"></script>
		<title>t_p_ysqk管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/pg/Report/flaction/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/pg/Report/flaction/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/pg/Report/flaction/remove.htm"><span>删除</span></a>
							
							
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
									<input type="text"  name="Q^COURSE_ID^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">课程名称</label>:
									<input type="text"  name="Q^NAME^SL"  class="form-control"  />
								</div> 
								
								<div class="form-group">
									<label   class="search-label">参考指标点</label>:
									<input type="text"  name="Q^INDEX_POINT^SL"  class="form-control"  />
								</div> 
								
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="flactionGrid" ></table>
				<div id="flactionPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
