
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/page/codegen.jsp"%>

<script type="text/javascript"
	src="${ctx}/js/hrbeu/gradp/paper/myPaper.js"></script>
<title>我的论文表单管理列表</title>
</head>
<body>
	<input id="datasite" style="display: none" data="({aflag:${showCol}})" />
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search" href="javascript:void(0);"><span>搜索</span></a>
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
							<!-- 指导教师 -->
							<div ${showSearch2Tutor }>
								<div class="form-group">
									<label class="search-label">题目</label>: <input type="text"
										name="Q^TITLE^SL" class="form-control" />
								</div>
								<div class="form-group">
									<label class="search-label">班级</label>: <input type="text"
										name="Q^SUBJECT^SL" class="form-control" />
								</div>
								<div class="form-group">
									<label class="search-label">学号</label>: <input type="text"
										name="Q^STUNUM^SL" class="form-control" />
								</div>

							</div>
							<!-- //指导教师 -->

							<!-- 盲审教师 -->
							<div ${showSearch2PR }>
								<div class="form-group">
									<label class="search-label">题目</label>: <input type="text"
										name="Q^TITLE^SL" class="form-control" />
								</div>
							</div>
							<!-- //盲审教师 -->
							<!-- 管理员only -->
							<div ${showSearch2Admin }>
								<div class="form-group">
									<label class="search-label">学生所属团队</label>: <input type="text"
										name="Q^STUTEAM^SL" class="form-control" />
								</div>
								<div class="form-group">
									<label class="search-label">地点</label>: <input type="text"
										name="Q^LOCATION^SL" class="form-control" />
								</div>
								<div class="form-group">
									<label class="search-label">所属学院</label>: <input type="text"
										name="Q^COLLEGE^SL" class="form-control" />
								</div>
							</div>
							<!-- //管理员only -->
						</div>
					</form>
				</div>
				<!--/ 查询条件-->
			</div>
		</div>
		<!--/ 操作、查询-->
		<div class="jqGrid_wrapper">
			<table id="myPaperGrid"></table>
			<div id="myPaperPager"></div>
		</div>
	</div>

</body>

</html>
