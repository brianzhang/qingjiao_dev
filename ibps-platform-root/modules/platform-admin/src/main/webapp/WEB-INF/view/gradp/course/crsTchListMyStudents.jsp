<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link href="bootstrap/bootstrap-tour.min.css" />
<title>学生课程列表</title>
</head>
<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search" style="display: none"
							href="javascript:void(0);"><span>搜索</span></a> <a
							class="btn btn-primary fa fa-back" href="list.htm"><span>返回</span></a>
					</div>
					&nbsp;
					<div class="buttons">
						<%-- <a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/crsStd/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/gradp/course/crsStd/edit.htm" ><span>编辑</span></a>	 --%>
						<a class="btn btn-primary fa fa-link statistics"
							action="javascript:void(0);" href="javascript:void(0);"><span>数据统计</span></a>
						<!-- <a class="btn btn-primary fa fa-download"
							href="javascript:void(0);"><span>导出</span></a> -->


					</div>
					&nbsp;
					<div class="buttons">
						<a class="btn btn-primary fa fa-import" href="javascript:void(0);"
							id="dataImport" onclick="dataImport()"><span>导入学生</span></a> <a
							class="btn btn-primary fa fa-remove" href="javascript:void(0);"
							action="${ctx}/gradp/course/crsStd/remove.htm"><span>删除学生</span></a>
					</div>
					&nbsp;
					<div class="buttons">
						<a class="btn btn-primary fa fa-export export-students"
							href="javascript:void(0);" id="students"><span>导出学生成绩</span></a>
						<a class="btn btn-primary fa fa-export export-file"
							href="javascript:void(0);" id="file"><span>导出作业文件</span></a>
							
							<!--NOTICE: 后备功能为验证成绩正确性存在,无特殊情况不要开放 -->
					<!-- 	<a class="btn btn-primary fa  "
							href="javascript:void(0);" id="checkScore" onclick="checkErr()"><span>核算该课程成绩</span></a> -->
					</div>
					&nbsp;
					<div class="buttons">
						<a class="btn btn-primary fa fa-help" href="javascript:void(0);"><span>查看指引</span></a>
					</div>
					<!-- 收缩 -->
					<div class="tools">
						<h2 style="float: left; line-height: 1.7em">${crsName }，学生作业本列表&nbsp;</h2>
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
								<label class="search-label">学号</label>: <input type="text"
									name="Q^STD_NUM^SLR" class="form-control" onkeyup="cg()" />
							</div>
							<div class="form-group">
								<label class="search-label">姓名</label>: <input type="text"
									name="Q^NAME_^SLR" class="form-control" onkeyup="cg()" />
							</div>
						</div>
					</form>
				</div>

				<!--/ 查询条件-->
			</div>
		</div>
		<!--/ 操作、查询-->
		<div class="jqGrid_wrapper">
			<table id="crsTchListMyStudentsGrid"></table>
			<div id="crsTchListMyStudentsPager"></div>
		</div>
	</div>

</body>
<script type="text/javascript">
var crsTchId = '<%=request.getParameter("crsTchId")%>';
var crsName = '${crsName}';
</script>

<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/gradp/course/crsTchListMyStudents.js"></script>
</html>
