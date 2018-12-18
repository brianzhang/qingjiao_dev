
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/LabelDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/labelUse.js"></script>
		<title>t_label_use管理列表</title>
		<style>
		.ops_container_type2 {
		     float: left; 
		    font-size: 12px;
		     left: 43%; 
		    position: relative;
		    top: -10px;
		}
		</style>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add" href="javascript:labelUse.addLabel('');" ><span>设置</span></a>
<%-- 							<a class="btn btn-primary fa fa-add"   href="${ctx}/bishe/audit/labelUse/edit.htm" ><span>添加</span></a> --%>
<%-- 					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/bishe/audit/labelUse/edit.htm" ><span>编辑</span></a>	 
 --%>					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/bishe/audit/labelUse/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">用户</label>:
									<input type="text"  name="Q^USER_ID_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">标签</label>:
									<input type="text"  name="Q^LABEL_ID_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="labelUseGrid" ></table>
				<div id="labelUsePager"></div>
			</div>
		</div>
	
	</body>
	
</html>
