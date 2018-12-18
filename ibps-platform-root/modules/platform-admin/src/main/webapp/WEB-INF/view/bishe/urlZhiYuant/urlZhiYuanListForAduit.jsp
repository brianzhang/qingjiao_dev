
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuanForAduit.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/TchDialog.js"></script>
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
							<a class="btn btn-primary fa fa-caret-square-o-right" href="javascript:void(0);"><span>启动论文审核</span></a>		
							<a class="btn btn-primary fa fa-add"   href="javascript:urlZhiYuan.allotJudgeTch();" ><span>分配审核教师</span></a>
							<a class="btn btn-primary fa fa-add" id="finalTchComment"  onclick="finalTchComment()" href="javascript:void(0);" ><span>指导教师评语</span></a>
							<a class="btn btn-primary fa fa-add"  id="judgeTchComment" onclick="judgeTchComment()" href="javascript:void(0);" ><span>审核教师评语</span></a>
							<a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/bishe/urlZhiYuant/urlZhiYuan/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">指导教师</label>:
									<input type="text"  name="Q^finalteacher^SL"  class="form-control"  />
								</div>
								<div class="form-group">
									<label   class="search-label">评审教师</label>:
									<input type="text"  name="Q^judge_tch_name_^SL"  class="form-control"  />
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
<script type="text/javascript">

$(function(){
	var getAllStuTchUrl = "/bishe/groupuser/groupUser/getAllStuTch.htm";

    $.ajax({
		type: "POST",
		url: getAllStuTchUrl,
		dataType:"json",
		success:function (data) {
			debugger
			if (data.status) {
					//allotStu._initGridList(data.msg);
				//DialogUtil.msg(data.msg);
			} else {
				DialogUtil.error(data.msg);
			}
		}
	})


});
function finalTchComment() {
    var ids = $(urlZhiYuan.consts.GRID).jqGrid('getGridParam','selarrrow');
    if (ids == null || ids.length == 0) {
        DialogUtil.toastr('请选择数据！');
        return;
    }
    //__ctx+'/platform/report/raqsoft/preview2.htm?reportId=444582348479004672&cname1=arg1&cval1={id}' final
    var finalTchCommentUrl = __ctx + "/platform/report/raqsoft/preview2.htm?reportId=444582348479004672&cname1=arg1&cval1="+ids.join(',') ;
    $('a#finalTchComment').attr('href',finalTchCommentUrl);
}

function judgeTchComment() {
    var ids = $(urlZhiYuan.consts.GRID).jqGrid('getGridParam','selarrrow');
    if (ids == null || ids.length == 0) {
        DialogUtil.toastr('请选择数据！');
        return;
    }
    //__ctx+'/platform/report/raqsoft/preview2.htm?reportId=444582348479004672&cname1=arg1&cval1={id}' final
    var judgeTchCommentUrl = __ctx + "/platform/report/raqsoft/preview2.htm?reportId=444530856816541696&cname1=arg1&cval1="+ids.join(',') ;
    $('a#judgeTchComment').attr('href',judgeTchCommentUrl);
}
	</script>
</html>
