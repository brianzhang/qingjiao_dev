
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/data/teachInfo.js"></script>
		<title>授课信息管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<%-- <a class="btn btn-primary fa fa-add"   href="${ctx}/patrolp/data/teachInfo/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/patrolp/data/teachInfo/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/patrolp/data/teachInfo/remove.htm"><span>删除</span></a> --%>
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
									<label   class="search-label">教师</label>:
									<select style="width:100px;" id="tch"  name="Q^TCH_ID_^SL"  class="form-control"  >
									<option value=""></option>
									</select>
								</div> 
								<div class="form-group">
									<label   class="search-label">班级</label>:
									<select style="width:100px;" id="classxx"  name="Q^CLASSXX_ID_^SL"  class="form-control"  >
									<option value=""></option>
									</select>
								</div> 
								<div class="form-group">
									<label   class="search-label">星期</label>:
									<select style="width:100px;" id="day"  name="Q^DAY_^SL"  class="form-control"  >
									<option value=""></option>
									</select>
								</div> 
								<div class="form-group">
									<label   class="search-label">节次</label>:
									<select style="width:100px;" id="section"  name="Q^SECTION_^SL"  class="form-control"  >
									<option value=""></option>
									</select>
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="teachInfoGrid" ></table>
				<div id="teachInfoPager"></div>
			</div>
		</div>
	
	</body>
<script type="text/javascript"
	src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript">



	var tch = ${tch}; 
 	$("#tch").select2({
   		data : tch ,
		placeholder : '请选择',
		cache : true,
		allowClear : true
	});


	
 	var classxx = ${classxx}; 
	$("#classxx").select2({

 
  		data : classxx,  
		placeholder : '请选择',
		allowClear : true
	});
	

	
	var day = ${day};
	$("#day").select2({

 		data : day,  
		placeholder : '请选择',
		cache : true,
		allowClear : true
	});

	
	
	
	var section = ${section};
	$("#section").select2({
/*  		ajax:{
	        type:'POST',
	        url: __ctx + '/patrolp/data/select2data/section.htm',
	        dataType: 'json',
		    processResults: function (data) {
		        return {
		          results: data
		        };
		      },
		      escapeMarkup: function (markup) { return markup; },
		      formatSelection : function formatRepo(repo) {       //选中一个后返回值
		         return repo.id;
		      },
		      formatResult: function formatRepoSelection(repo) {   //返回所有内容到下拉框
		         return repo.id;
		      }
		},  */
  		data : section,  
		placeholder : '请选择',
		cache : true,
		allowClear : true
	});
	
</script>	
</html>
