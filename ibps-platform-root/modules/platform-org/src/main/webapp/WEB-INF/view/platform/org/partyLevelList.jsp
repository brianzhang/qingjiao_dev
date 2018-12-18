<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyLevel.js"></script>
		<title>参与者等级管理列表</title>
	</head>
	<script type="text/javascript">
		var typeId='${typeId}';
	</script>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/org/partyLevel/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/org/partyLevel/edit.htm" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/org/partyLevel/remove.htm"><span>删除</span></a>
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
											<label   class="search-label">名称</label>:
											<input type="text"  name="Q^NAME_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">参与者类型</label>:
											<select class="form-control search-select" name="Q^TYPE_^S">
												<option value="">请选择</option>
												<option value="org">组织</option>
												<option value="position">岗位</option>
											</select>
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="partyLevelGrid" ></table>
					<div id="partyLevelPager"></div>
				</div>
		</div>
	
	</body>
	
</html>