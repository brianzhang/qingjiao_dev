
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="select2/select2.min.css"/>
		<f:link href="select2/select2-bootstrap.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/data/scheduleInfo.js"></script>
		<title>课表信息管理列表</title>
		
		<style>
		.ops_container_type2 {
		     float: left; 
		    font-size: 12px;
		     left: 40%; 
		    position: relative;
		    top: -10px;
		}
		</style>
<script>
	var index = null;
	function upload() {
		var path = $('#xlsFile').val();
		var extNaem = path.substring(path.length - 7, path.length);
		alert(extNaem);
		var reg=/^([一|二|三|四|五|六|七|八|九|十| 十一|十二])年级.xls+$/g ;
 		var result = extNaem.match(reg);
 		alert(result);
		if (result == null) {
			DialogUtil.warn("请按格式(六年级.xls)选择xls文件!");
			return;
		}

		var frm = $('#importForm').form();

		frm.ajaxForm({
			dataType : 'json',
			success : function(data) {
				data.success ? DialogUtil.alert(data.msg) : DialogUtil
						.error(data.msg);
				DialogUtil.close(index);
				location.reload();
			},
			error : function(msg) {
				DialogUtil.error(msg)
			}
		});

		if (frm.valid()) {
			index = DialogUtil.load();
			$('#importForm').submit();
		}
	}
</script>

	</head>

<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a> 
							<a class="btn btn-primary fa fa-upload" href="javascript:void(0);""><span>导入课表</span></a>
			 		    	<a class="btn btn-primary fa fa-check-square" href="javascript:void(0);"><span>启动课表</span></a>	 
					        <a class="btn btn-primary fa fa-times-circle" href="javascript:void(0);"><span>停用课表</span></a>		 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/patrolp/data/scheduleInfo/remove.htm"><span>删除</span></a>
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>

				<div class="toolbar-body" >
						<form role="form" class="search-form">
							<div  class="form-inline p-xxs">
								<div class="form-group">
									<div class="form-group">
<!-- 									<label  type="hidden"  class="search-label">学校</label>: -->
									<input  type="hidden" id="school"  name="Q^SCHOOL_^SL"  class="form-control"  value = ${schoolName} />
<%-- 									<option value="">${schoolName}</option>
									</select> --%>
								</div>  
									<label   class="search-label">名称</label>:
									<select id="className"  name="Q^NAME_^SL"  class="form-control"  >
									<option value="">全部</option> 
									</select>
								</div> 
								<div class="form-group">
									<label   class="search-label">状态</label>: 
										<select id="state" name="Q^STATE_^SL" class="form-control">
										<option value="">全部</option> 
								</select>
							</div>

						</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			
			<form id="importForm" method="post"
		action="/patrolp/data/tchInfo/savetodb.htm" enctype="multipart/form-data">
			<input  style="display: none" type="file" size="40" name="xlsFile" id="xlsFile"accept="	application/vnd.ms-excel" class="inputText input-wh-9" onchange="upload()"></input>
			</form>
			
			<div class="jqGrid_wrapper">
				<table id="scheduleInfoGrid" ></table>
				<div id="scheduleInfoPager"></div>
			</div>
		</div>
	
	</body>
	<script type="text/javascript" src="${ctx}/js/plugins/select2/select2.full.min.js"></script>
    <script src="${ctx}/js/lang/select2/zh_CN.js"></script>
<script type="text/javascript">
	var state = [ {
		id : '停用',
		text : '停用'
	}, {
		id : '使用',
		text : '使用'
	} ];
	$("#state").select2({
		data : state,
		placeholder : '请选择',
		allowClear : true
	});
	var className = ${className};
	$("#className").select2({
		data : className,
		placeholder : '请选择',
		allowClear : true
	});
</script>
</html>
