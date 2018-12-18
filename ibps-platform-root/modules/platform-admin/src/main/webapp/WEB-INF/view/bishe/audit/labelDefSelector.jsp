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
<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/labelSelector.js"></script>
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
										href="javascript:void(0);"><span>标签（审核）搜索</span></a>
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
											<label class="search-label">标签名称</label>: <input type="text"
												name="Q^LABEL_NAME_^SL" class="form-control" />
										</div>
										<div class="form-group">
											<label class="search-label">标签状态</label>: 
<!-- 											<input type="text"
												name="Q^LABEL_STATE_^SL" class="form-control" /> -->
											<select class="form-control search-select" id="status" name="Q^LABEL_STATE_^SL" validate="{required:true,maxlength:120}">
												<option value="">全部</option>
												<option value="actived">激活</option>
												<option value="inactive">禁用</option>
												<option value="locked">锁定</option>
											</select>
										</div>


<!-- 										<div class="form-group">
											<label class="search-label">状态</label>: 
											<select class="form-control search-select" id="status" name="Q^STATUS_^S" validate="{required:true,maxlength:120}">
												<option value="">全部</option>
												<option value="actived">激活</option>
												<option value="inactive">禁用</option>
												<option value="locked">锁定</option>
											</select>
										</div> -->
<!-- 										<div class="form-group">
											<label class="search-label">姓名</label>: <input type="text"
												id="fullname" name="Q^name_^SL" class="form-control" />
										</div> -->
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="jqGrid_wrapper">
						<table id="labelDialogGrid"></table>
						<div id="labelDialogPager"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>