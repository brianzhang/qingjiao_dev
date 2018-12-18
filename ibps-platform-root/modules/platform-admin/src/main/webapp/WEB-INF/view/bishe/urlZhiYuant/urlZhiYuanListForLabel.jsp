
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuanForLabel.js"></script>
		<script type="text/javascript">
/* debugger; */
	var labelName = []; 
	 	$.ajax({
		    type:"post",
		    url:__ctx + '/bishe/audit/labelDef/select2labelName.htm',
		    dataType:"json",
		    contentType:"application/json",
		    success:function(data){
		    	debugger;
		    	labelName = data;
				$("#labelName").select2({
					 		data : labelName, 
							placeholder : '请选择',
							cache : true,
							allowClear : true
						});
		    },
		    error:function(data){
		    }
		}); 

</script>
		<title>t_zyurl管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>	 
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
							

							
							
							
							    <div class="form-group">
									<label   class="search-label">班级</label>:
									<input type="text"  name="Q^CLASSR^SL"  class="form-control"  />
								</div>
							    <div class="form-group">
									<label   class="search-label">学号</label>:
									<input type="text"  name="Q^XH^SL"  class="form-control"  />
								</div>
								<div class="form-group">
									<label   class="search-label">姓名</label>:
									<input type="text"  name="Q^NAME^SL"  class="form-control"  />
								</div> 
								

								<div class="form-group">
									<label   class="search-label">标签</label>:
									<select id="labelName"  name="Q^LABEL_ID_^SL"  class="form-control"  >
									<option value=""></option> 
									</select>
								</div> 

							</div> 
							</div>
					</form>
					</div><!--/ 查询条件-->
					
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="urlZhiYuanGrid" ></table>
				<div id="urlZhiYuanPager"></div>
			</div>
		</div>
	
	</body>
<script type="text/javascript"
		src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
</html>
