
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/model/modelProp.js"></script>
		<title>模板属性设置管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/model/modelProp/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/model/modelProp/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/model/modelProp/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">模板名称</label>:
									<input type="text"  name="Q^PROP_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">模板参数</label>:
									<input type="text"  name="Q^PARAM_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="modelPropGrid" ></table>
				<div id="modelPropPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
