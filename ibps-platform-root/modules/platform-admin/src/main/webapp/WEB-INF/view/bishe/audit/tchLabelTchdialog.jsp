<%-- <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.lc.ibps.api.org.constant.GroupStatus"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
<script type="text/javascript">
var id = '${id}';
</script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyEmployeeSelector.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/TchDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/tchSelector.js"></script>
</head> --%>


<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/TchDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/tchSelector.js"></script>
		<script type="text/javascript">
		var id = '${id}';
		</script>
		<title>教师标签表管理列表</title>
	</head>
<body>
	<div class="wrapper wrapper-content col-sm-12">
		<div>
			<div name="person_container" class="selector-container">
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 animated fadeInLeft">
				<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
					<div class="toolbar-panel ">
						<div class="toolbar-box">
							<div class="toolbar-head clearfix">
								<!-- 顶部按钮 -->
								<div class="buttons">
									<a class="btn btn-primary fa fa-search"
										href="javascript:void(0);"><span>搜索</span></a>
								</div>
								<!-- 收缩 -->
								<div class="tools">
									<a href="javascript:void(0);" class="collapse"> <i
										class="bigger-180 fa  fa-angle-double-up"></i>
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
									<select id="tch" type="text"  name="Q^ID_^SL"  class="form-control"  >
									<option value=""></option>
									</select>
								</div> 
								<div class="form-group">
									<label   class="search-label">标签</label>:
									<select id="labelName" type="text"  name="Q^LABEL_ID_^SL"   class="form-control"  >
									<option value=""></option>
									</select>
								</div> 
						</div>
						</div>
						</form>
					</div><!--/ 查询条件-->
				
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="tchLabelGrid" ></table>
				<div id="tchLabelPager"></div>
			</div>
		</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript"
		src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
<script src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript">
	var tch = []; 
		$.ajax({
	    type:"post",
	    url:__ctx + '/bishe/audit/labelDef/select2tch.htm',
	    dataType:"json",
	    contentType:"application/json",
	    success:function(data){
	    	tch = data;
			$("#tch").select2({
				 		data : tch, 
						placeholder : '请选择',
						cache : true,
						allowClear : true
					});
	    },
	    error:function(data){
	    }
	}); 

	var labelName = []; 
	 	$.ajax({
		    type:"post",
		    url:__ctx + '/bishe/audit/labelDef/select2labelName.htm',
		    dataType:"json",
		    contentType:"application/json",
		    success:function(data){
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
</html>