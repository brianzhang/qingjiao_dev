
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/labelDefForTch.js"></script>
		<title>t_label_def管理列表</title>
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
							<a class="btn btn-primary fa fa-add"   href="${ctx}/bishe/audit/labelDef/editForTch.htm" ><span>添加</span></a>
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
									<label   class="search-label">标签名称</label>:
									<input type="text"  name="Q^LABEL_NAME_^SL"  class="form-control"  />
								</div> 
								
								<div class="form-group">
									<label   class="search-label">标签类型</label>:
									<select name="Q^TYPE_ID_^S" class="form-control " >
										<option value="">--所有--</option>	
										<c:forEach items="${labelTypeList}" var="type">
											<option value="${type.id}">${type.type}</option>
										</c:forEach>
									</select>
								</div>
<!-- 								<div class="form-group">
									<label   class="search-label">标签状态</label>:
									<input type="text"  name="Q^LABEL_STATE_^SL"  class="form-control"  />
								</div>  -->
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="labelDefGrid" ></table>
				<div id="labelDefPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
