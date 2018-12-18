
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/data/tchInfo.js"></script>
		<title>t_tch_inf管理列表</title>
		<style>
		.ops_container_type2 {
		     float: left; 
		    font-size: 12px;
		     left: 40%; 
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
							<a class="btn btn-primary fa fa-export" href="javascript:void(0);"><span>导出课表</span></a>								
							<a class="btn btn-primary fa fa-add"   href="${ctx}/patrolp/data/tchInfo/edit.htm" ><span>添加</span></a>
<%-- 					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/patrolp/data/tchInfo/remove.htm"><span>删除</span></a>
 --%>						</div>
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
									<div class="form-group">
									<label   class="search-label">教师姓名</label>:
									<select id="tchName"  name="Q^ID_^SL"  class="form-control"  >
									<option value="">全部</option>
									</select>
									</div> 
									<div class="form-group">
									<label   class="search-label">科目</label>:
									<select id="subject"  name="Q^SUBJECT_^SL"  class="form-control"  >
									<option value="">全部</option>
									</select>
								</div> 
								</div>
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="tchInfoGrid" ></table>
				<div id="tchInfoPager"></div>
			</div>
		</div>
	
	</body>
<script type="text/javascript"
	src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript">
	

 	var tchName = ${tchName}; 
	$("#tchName").select2({
 		data : tchName ,
		placeholder : '请选择',
		cache : true,
		allowClear : true
	});
	

 	var subject = ${subject}; 
	$("#subject").select2({

 		data : subject,
		placeholder : '请选择',
		cache : true,
		allowClear : true
	});
</script>
</html>
