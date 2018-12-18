<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
</head>
<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search hidden"
							href="javascript:void(0);" id="search"><span>搜索</span></a> <a
							class="btn btn-primary fa fa-remove" href="javascript:void(0);"
							action="${ctx}/gradp/admin/data/removeEntity.htm?type=deleted"><span>禁用</span></a>
						<a class="btn btn-primary fa fa-detail" href="javascript:void(0);"
							action="${ctx}/gradp/admin/data/removeEntity.htm?type=actived"><span>恢复</span></a>
						<a class="btn btn-primary fa fa-ok" href="javascript:void(0);"
							onclick="test()"><span>test</span></a>
						<!--<a class="btn btn-primary fa fa-remove" href="javascript:void(0);"
						   action="${ctx}/gradp/admin/data/addBisheRole.htm?type=actived"><span>添加毕设角色</span></a>-->
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
								<label class="search-label">工号</label>: <input type="text"
									name="Q^party_alias_^SL" class="form-control" />
							</div>
							<div class="form-group">
								<label class="search-label">姓名</label>: <input type="text"
									name="Q^name_^SL" class="form-control" />
							</div>
						</div>
					</form>
				</div>
				<!--/ 查询条件-->
			</div>
		</div>
		<!--/ 操作、查询-->

		<div class="jqGrid_wrapper">
			<table id="entityGrid"></table>
			<div id="entityPager"></div>
		</div>
	</div>
</body>

<script type="text/javascript"
	src="${ctx }/js/lc/platform/form/onlineForm.js"></script>
<script type="text/javascript">
var eType = '<%=request.getParameter("eType")%>';
	function test() {
		OnlineForm.data = {
			createBy : "123",
			createTime : "123",
			field :'123',
			id : "123",
			ip : "123",
			updateBy : "123",
			updateTime : "1"
		}
		OnlineForm.open('test1111', function(json) {
			console.log(json);
		});
	}
</script>
<script type="text/javascript" src="${ctx}/js/lc/gradp/admin/data.js"></script>
</html>