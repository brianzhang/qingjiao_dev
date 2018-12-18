
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuanManageStu.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/bishe/urlZhiYuant/LabelDialog.js"></script>
	 <script type="text/javascript">
		function emptyLabelForTch() {
			$.ajax({
				type: "POST",
				url : "/bishe/audit/labelDef/emptyLabelForTch.htm",
				dataType:"json",
				success : function(data) {
					debugger;
					if (data.isSuccess) {
						DialogUtil.msg(data.msg);
						window.location.href = __ctx+'/bishe/urlZhiYuant/urlZhiYuan/manageStu.htm';
					} else {
						DialogUtil.error(data.msg);
					}
				}
			})
		}
		</script>
<title>Insert title here</title>
</head>
<!-- <body>

</body>
</html>  -->
<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
	<div class="toolbar-panel ">
		<div class="toolbar-box">
			<div class="toolbar-head clearfix">
				<!-- 顶部按钮 -->
				<div class="buttons">
					<a class="btn btn-primary fa fa-search" href="javascript:void(0);"><span>搜索</span></a>
					<a class="btn btn-primary fa fa-caret-square-o-right-info"  href="javascript:void(0);"><span>发送通知</span></a>
 					<a onclick="urlZhiYuan.setLabelForTch()"class="btn btn-primary fa fa fa-cog" ><span>设置标签</span></a>
 					<a onclick="emptyLabelForTch()"class="btn btn-primary fa fa-trash" ><span>清空标签</span></a>
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
							<label class="search-label">学号</label>: <input type="text"
								name="Q^XH^SL" class="form-control" />
						</div>
						<div class="form-group">
							<label class="search-label">姓名</label>: <input type="text"
								name="Q^NAME^SL" class="form-control" />
						</div>
						
						<!--     <div class="form-group">
									<label   class="search-label">所属团队</label>:
									<input type="text"  name="Q^TEAM^SL"  class="form-control"  />
								</div>   -->
					</div>
				</form>
			</div>
			<!--/ 查询条件-->
		</div>
	</div>
	<!--/ 操作、查询-->
	<div class="toolbar-body">
		<div class="form-group">
			<label class="search-label">所属团队</label>: <input type="text"
				name="Q^TEAM^SL" class="form-control" value="${team}"
				readonly="readonly" />
		</div>
	</div>
	<div class="toolbar-body">
		<div class="form-group">
			<label class="search-label">标签</label>: <input type="text"
				name="labelName" class="form-control" value="${labelName}"
				readonly="readonly" />
		</div>
	</div>

	<div class="jqGrid_wrapper">
		<table id="urlZhiYuanGrid"></table>
		<div id="urlZhiYuanPager"></div>
	</div>
</div>

</body>

</html>
