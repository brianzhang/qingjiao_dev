
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
<%-- 		<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>	
 --%>		<script type="text/javascript" src="${ctx}/js/lc/patrolp/data/classxxInfo.js"></script>
		<title>班级信息管理列表</title>
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
							<a class="btn btn-primary fa fa-add"   href="${ctx}/patrolp/data/classxxInfo/edit.htm" ><span>添加</span></a>
<%-- 					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/patrolp/data/classxxInfo/remove.htm"><span>删除</span></a>
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
<!-- 									<label  type="hidden"  class="search-label">学校</label>: -->
<!-- 									<input  type="hidden" id="school"  name="Q^SCHOOL_^SL"  class="form-control"  value = ${schoolName} />
 --><%-- 									<option value="">${schoolName}</option>
									</select> --%>
								</div>
									<label   class="search-label">班级</label>:
<!-- 									<select id="classxx" style="width:100px;" name="Q^CLASSXX_^SL"  class="form-control"  > -->
									<select id="classxx" style="width:100px;" name="Q^ID_^SL"  class="form-control"  >
									<option value="">""</option>
									</select>
								</div> 
								<div class="form-group">
									<label   class="search-label">班主任</label>:
									<select id="classMaster" style="width:100px;" name="Q^CLASS_MASTER_^SL"  class="form-control"  >
									<option value=""></option>
									</select>
								</div> 
								<div class="form-group">
									<label   class="search-label">教室地点</label>:
									<select id="place" style="width:100px;" name="Q^PLACE_^SL"  class="form-control"  >
									<option value=""></option>
									</select>
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="classxxInfoGrid" ></table>
				<div id="classxxInfoPager"></div>
			</div>
		</div>
	
	</body>
<script type="text/javascript"
	src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript">
 	var classxx = ${classxx}; 
/* 	var classxx = []; */
/* 	$.ajax({
	    type:"post",
	    url:__ctx + '/patrolp/data/select2data/classxx.htm',
	    dataType:"json",
	    contentType:"application/json",
	    success:function(data){
	    	classxx = data;
	    },
	    error:function(data){

	    }
	}); */
	$("#classxx").select2({
/* 		ajax:{
	        type:'POST',
	        url: __ctx + '/patrolp/data/select2data/classxx.htm',
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
		}, */
 		data : classxx, 
		placeholder : '请选择',
		cache : true,
		allowClear : true
	});
	
 	var classMaster = ${classMaster}; 
	
/* 	var classMaster = [];
	$.ajax({
	    type:"post",
	    url:__ctx + '/patrolp/data/select2data/master.htm',
	    dataType:"json",
	    contentType:"application/json",
	    success:function(data){
	    	classMaster = data;
	    },
	    error:function(data){

	    }
	}); */
	$("#classMaster").select2({
		/* data : classMaster, */
/*  		ajax:{
	        type:'POST',
	        url: __ctx + '/patrolp/data/select2data/master.htm',
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
 		data : classMaster, 
		placeholder : '请选择',
		cache : true,
		allowClear : true
	});

 	var place = ${place}; 
	

	$("#place").select2({
		data : place,
		placeholder : '请选择',
		cache : true,
		allowClear : true
	});
	
</script>
</html>
