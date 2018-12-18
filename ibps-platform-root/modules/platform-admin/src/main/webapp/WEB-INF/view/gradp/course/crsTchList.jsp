
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link  href="bootstrap/bootstrap-tour.min.css" />
<title>t_crs_tch管理列表</title>
</head>
<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search hidden"
							href="javascript:void(0);"><span>搜索</span></a>
						<%-- <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/gradp/course/crsTch/remove.htm"><span>删除</span></a> 
						<a class="btn btn-primary fa fa-edit" href="javascript:void(0);"  action="${ctx}/gradp/course/crsTch/edit.htm?admin=1" ><span>编辑</span></a> --%>
						<c:if test="${admin }">
							<a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/crsTch/edit.htm?admin=1" ><span>添加</span></a>
						</c:if>
						<a class="btn btn-primary fa fa-export" href="javascript:void(0);" ><span>导出课表</span></a> 
						<a class="btn btn-primary fa fa-help" href="javascript:void(0);" ><span>查看指引</span></a>
						<%-- <a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/crsTch/edit.htm" ><span>添加</span></a> --%>
						<!-- <a class="btn btn-primary fa fa-download" href="javascript:void(0);" ><span>导出成绩</span></a>
							<a class="btn btn-primary fa fa-detail" href="javascript:void(0);" ><span>导入学生名单</span></a> -->
						<%-- <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/gradp/course/crsTch/remove.htm"><span>删除</span></a> 
					        <a class="btn btn-primary fa fa-upload" href="javascript:void(0);" ><span>导入课程</span></a>
					        
					        <a class="btn btn-primary fa fa-download" href="javascript:void(0);" ><span>导出课程</span></a>--%>
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
							<div class="form-group">
								<label class="search-label">课程名称</label>: <input type="text"
									name="Q^NAME^SL" class="form-control" onkeyup="cg()" />
							</div>
							<div class="form-group <c:if test="${!admin }">hidden</c:if> " >
								<label class="search-label">教师工号</label>: <input type="text"
									name="Q^TCH_NUM^SLR" class="form-control" onkeyup="cg()" />
							</div>
							<div class="form-group <c:if test="${!admin }">hidden</c:if> " >
								<label class="search-label">教师姓名</label>: <input type="text"
									name="Q^TCH_NAME^SLR" class="form-control" onkeyup="cg()" />
							</div>
							<div class="form-group">
									<label   class="search-label">上课学期</label>:
									<select name="Q^TERM^S" class="form-control search-select" onchange="cg()">
										<option value="-1">--请选择--</option>	
										<c:forEach items="${termList }" var="term">
											<option value="${term }" <c:if test="${term == curTerm }">selected</c:if>>${term }</option>
										</c:forEach>
									</select>
								</div>
							<div class="form-group">
								<label class="search-label">授课班级</label>: <input type="text"
									name="Q^CLAZZ^SL" class="form-control" onkeyup="cg()" />
							</div>
						</div>
					</form>
				</div>
				<!--/ 查询条件-->
			</div>
		</div>
		<!--/ 操作、查询-->
		<div class="jqGrid_wrapper">
			<table id="crsTchGrid"></table>
			<div id="crsTchPager"></div>
		</div>
	</div>

</body>
<script type="text/javascript">
var admin = ${admin};
var curTerm = '${curTerm}';
</script>
<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsTch.js"></script>
</html>
