<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.lc.ibps.api.org.constant.GroupStatus"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<script type="text/javascript">
var id = '${id}';
</script>
<%-- <script type="text/javascript" src="${ctx}/js/lc/platform/org/partyEmployeeSelector.js"></script> --%>
<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/StuDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/stuSelector.js"></script>
</head>
<body>
	<div class="wrapper wrapper-content col-sm-12">
		<div>
			<div name="person_container" class="selector-container">
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 animated fadeInLeft">
				<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
					<div class="toolbar-panel ">
						<div class="toolbar-box">
							<div class="toolbar-head clearfix">
								<!-- 顶部按钮 -->
								<div class="buttons">
									<a class="btn btn-primary fa fa-search"
										href="javascript:void(0);"><span>搜索</span></a>
								</div>
								<!-- 收缩 -->
								<div class="tools">
									<a href="javascript:void(0);" class="collapse"> <i
										class="bigger-180 fa  fa-angle-double-up"></i>
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
								 	
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="urlZhiYuanGrid" ></table>
				<div id="urlZhiYuanPager"></div>
			</div>
		</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>