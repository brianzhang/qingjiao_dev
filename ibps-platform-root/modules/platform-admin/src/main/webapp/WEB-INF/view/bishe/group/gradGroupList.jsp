
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/group/gradGroup.js"></script>
		<title>t_grad_group管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/bishe/group/gradGroup/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-add"  id="allot" href="javascript:gradGroup.allotStu();" ><span>分配学生</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/bishe/group/gradGroup/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/bishe/group/gradGroup/remove.htm"><span>删除</span></a>
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
<!-- 								<div class="form-group">
									<label   class="search-label">创建人</label>:
									<input type="text"  name="Q^CREATE_BY_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">创建时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">更新人</label>:
									<input type="text"  name="Q^UPDATE_BY_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">更新时间 </label>:
									<input type="text" name="Q^UPDATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^UPDATE_TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label class="search-label">日期 </label>:
									<input type="text" name="Q^DATE_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^DATE_^DG"  class="form-control date" />
								</div> -->
<!-- 								<div class="form-group">
									<label   class="search-label">时间</label>:
									<input type="text"  name="Q^TIME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地点</label>:
									<input type="text"  name="Q^PLACE_^SL"  class="form-control"  />
								</div>  -->
								<div class="form-group">
									<label   class="search-label">名称</label>:
									<input type="text"  name="Q^NAME_^SL"  class="form-control"  />
								</div> 
<!-- 								<div class="form-group">
									<label   class="search-label">类型</label>:
									<input type="text"  name="Q^TYPE_^SL"  class="form-control"  />
								</div>  -->
								
								<div class="form-group">
									<label   class="search-label">小组类型</label>:
									<select id="type" name="Q^TYPE_^S" class="form-control " onchange="isAllot()">
										<option value="">--所有--</option>	
										<c:forEach items="${typeList}" var="type">
											<option value="${type}">${type}</option>
										</c:forEach>
									</select>
								</div>
<!-- 								<div class="form-group">
									<label   class="search-label">组长</label>:
									<input type="text"  name="Q^LEADER_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">组长ID</label>:
									<input type="text"  name="Q^LEADER_ID_^SL"  class="form-control"  />
								</div>  -->
<!-- 								<div class="form-group">
									<label   class="search-label">学期</label>:
									<input type="text"  name="Q^TERM_^SL"  class="form-control"  />
								</div> --> 
<!-- 								<div class="form-group">
									<label   class="search-label">院系ID</label>:
									<input type="text"  name="Q^ORG_ID_^SL"  class="form-control"  />
								</div>  -->
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="gradGroupGrid" ></table>
				<div id="gradGroupPager"></div>
			</div>
		</div>
	
	</body>
<script type="text/javascript">
function isAllot(){
	debugger
	var type = $('#type').val();
	if (type == "")
		$('#allot').hide();
	else
		$('#allot').show();
	$('a.fa-search').click();
}


isAllot();

var makeGroupTypeMapUrl = "/bishe/groupuser/groupUser/makeGroupTypeMap.htm";
debugger
$.ajax({
	type: "POST",
	dataType:"json",
	url:makeGroupTypeMapUrl,
		async: false,
	success:function (data) {
		debugger
		if (data.status) {
			//DialogUtil.msg(data.msg);
		} else {
			DialogUtil.error(data.msg);
		}
	}
});
</script>	
</html>
