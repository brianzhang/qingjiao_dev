<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyRoleSelector.js"></script>
</head>
<script type="text/javascript">
var type = '${type}';
</script>
<body>
	<div class="wrapper wrapper-content col-sm-12">
		<div>
			<div name="role_container" class="selector-container">
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
							<div class="toolbar-body">
								<form role="form" class="search-form">
									<div class="form-inline p-xxs">
										<div class="form-group">
											<label class="search-label">系统</label>: 
											<select name="Q^system_id_^S" class="form-control">
											<option value="1">全局角色</option>
									     	<c:forEach var="Subsystem" items="${subSystemList}">
											<option value="${Subsystem.id}">${Subsystem.name}</option>
											</c:forEach>
										</select>
										</div>
										<div class="form-group">
											<label class="search-label">角色名</label>: <input type="text"
												id="fullname" name="Q^name_^SL" class="form-control" />
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					
					<div class="jqGrid_wrapper">
						<table id="roleDialogGrid"></table>
						<div id="roleDialogPager"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>