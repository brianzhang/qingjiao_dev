<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	<%@include file="/commons/include/list.jsp" %>
	<%@include file="/commons/page/layout.jsp" %>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/cat/TypeTree.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/echarts/echarts.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmStatisticsEnd.js"></script>
	<title>结束实例</title>
</head>
<body>

	<div class="ui-layout-center">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search" href="javascript:void(0);"><span>搜索</span></a>
					</div>
					<!-- 收缩 -->
					<div class="tools">
						<a href="javascript:void(0);" class="collapse"> <i class="bigger-180 fa  fa-angle-double-up"></i></a>
					</div>
				</div>

				<!-- #查询条件-->
				<div class="toolbar-body">
					<form role="form" class="search-form end-search-form">
						<input type="hidden" id="partyType" name="Q^partyType^SL" value="employee" /> 
						<input type="hidden" id="typeId" name="Q^type_id_^SL" />
						<div class="form-inline p-xxs">
							<div class="form-group">
								<label class="search-label">流程名称</label>: 
								<input type="text" name="Q^proc_def_name_^SL" class="form-control" />
							</div>

							<label class="search-label">流程创建人</label>:
							<div class="input-group ">
								<input type="hidden" name="Q^creator^S" id="ownerId" value="" />
								<input type="text" class="form-control search-selector" id="ownerName" name="creatorName" readonly="readonly" /> 
								<span class="input-group-btn">
									<button type="button" class="btn  btn-info btn-mm"
										data-toggle="selector" data-type="user" data-id="#ownerId"
										data-name="#ownerName">
										<i class="fa fa-user"></i>
									</button>&nbsp;&nbsp;
									<button type="button" class="btn  btn-info btn-mm"
										data-toggle="clear" data-id="#ownerId" data-name="#ownerName">
										<i class="fa fa-times"></i>
									</button>
								</span>
							</div>
							<div class="form-group">
								<label class="search-label">展示类型</label>: 
								<select id="showType" class="form-control search-select">
									<option value="grid">表格</option>
									<option value="line">折线图</option>
									<option value="pie">饼图</option>
									<option value="bar">柱形图</option>
								</select>
							</div>
						</div>
				</div>
				</form>
			</div>
			<!--/ 查询条件-->
		</div>
	</div>
	<!--/ 操作、查询-->
	<div class="jqGrid_wrapper">
		<table id="endStatGrid"></table>
		<div id="endStatPic" style="display: none;"></div>
		<div id="endProcessPager"></div>
		<div id="endStatPicPager" class="stat-layout" style="display: none;">
			<table class="stat-layout">
				<tr>
					<td class="stat-pre-page">上一页</td>
					<td>第<span class="page">1</span>页,</td>
					<td>共<span class="total">1</span>页</td>
					<td class="stat-next-page">下一页</td>
				</tr>
			</table>
		</div>
	</div>
	</div>

</body>
</html>