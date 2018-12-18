

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmCommonStatment.js"></script>
		<title>常用语管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/bpmn/bpmCommonStatment/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/bpmn/bpmCommonStatment/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/bpmn/bpmCommonStatment/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">内容</label>:
									<input type="text"  name="Q^VALUE_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">动作类型</label>:
									<select name="Q^ACTION_^S"  class="form-control search-select" >
										<option value=""></option>
										<option value="agree">同意</option>
										<option value="oppose">反对</option>
										<option value="reject">驳回</option>
										<option value="rejectToStart">驳回到发起人</option>
										<option value="abandon">弃权</option>
										<option value="manualend">终止</option>
									</select>
								</div> 
								<div class="form-group">
									<label class="search-label">创建时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">是否默认</label>:
									<select name="Q^IS_DEFAULT_^S"  class="form-control search-select" >
										<option value=""></option>
										<option value="Y">是</option>
										<option value="N">否</option>
									</select>
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="bpmCommonStatmentGrid" ></table>
				<div id="bpmCommonStatmentPager"></div>
			</div>
		</div>
	
	</body>
	
</html>