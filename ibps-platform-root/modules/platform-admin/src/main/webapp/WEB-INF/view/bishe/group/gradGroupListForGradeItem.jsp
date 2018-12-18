
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/group/gradeItem.js"></script>
		<title>t_grad_group管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 
						<a class="btn btn-primary fa fa-export" href="javascript:void(0);"><span>导出中期评价情况</span></a>			
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					<input type="hidden" id="typeFlag"  value="${typeFlag}"/>
					<input type="hidden" id="formkey"  value="${formkey}"/>
					<!-- #查询条件-->
					<div class="toolbar-body" >
						<form role="form" class="search-form">
							<div  class="form-inline p-xxs">

							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">问题学生</label>
				  	<div class="fr-form-block">
				<textarea style="font-size:15px; width:800px; height:200px" class="fr-form-control fr-control-textarea" readOnly="true" id="problemStu"  validate="{required:false}">${problemStu}</textarea>
				 	</div>
			  	</div>
			</div>
			<div class="jqGrid_wrapper">
				<table id="gradeItemGrid" ></table>
				<div id="gradeItemPager"></div>
			</div>
		</div>
	
	</body>	
</html>
