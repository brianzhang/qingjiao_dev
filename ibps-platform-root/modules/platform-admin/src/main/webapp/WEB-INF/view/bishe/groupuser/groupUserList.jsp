
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/StuDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/TchDialog.js"></script>
		
		<script type="text/javascript">
	var groupId1 = '${groupId}';
	debugger;
</script>
		<title>小组人员管理</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
<%-- 							<a class="btn btn-primary fa fa-add"   href="${ctx}/bishe/groupuser/groupUser/edit.htm" ><span>添加</span></a>
 --%>							<a class="btn btn-primary fa fa-add"   href="javascript:groupUser.addTch('${groupId}','${typeFlag}');" ><span>添加教师</span></a>
							<a class="btn btn-primary fa fa-add"   href="javascript:groupUser.addStu('${groupId}','${typeFlag}');" ><span>添加学生</span></a>
<%--
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/bishe/groupuser/groupUser/edit.htm" ><span>编辑</span></a>
--%>
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/bishe/groupuser/groupUser/remove.htm"><span>删除</span></a>
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
					<input type="hidden" id="groupId"  value="${groupId}"/>
					<input type="hidden" id="typeFlag"  value="${typeFlag}"/>
						<form role="form" class="search-form">
							<div  class="form-inline p-xxs">
<%--								<div class="form-group">
									<label   class="search-label">小组</label>:
									<input type="text"  name="Q^GROUP_ID_^SL"  class="form-control"  />
								</div> --%>
								<div class="form-group">
									<label   class="search-label">人员</label>:
									<input type="text"  name="Q^USER_ID_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="groupUserGrid" ></table>
				<div id="groupUserPager"></div>
			</div>
		</div>
	
	</body>
	<script type="text/javascript" src="${ctx}/js/lc/bishe/groupuser/groupUser.js"></script>
</html>
