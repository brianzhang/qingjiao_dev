
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/kaitiGroup/kaitiGroup.js"></script>
		<title>t_ktxz管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<%-- <div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-add"   href="${ctx}/bishe/kaitiGroup/kaitiGroup/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/bishe/kaitiGroup/kaitiGroup/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/bishe/kaitiGroup/kaitiGroup/remove.htm"><span>删除</span></a>
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					
						</form>
					</div><!--/ 查询条件-->
				</div> --%>
			</div><!--/ 操作、查询-->
			</br></br>
			<div class="jqGrid_wrapper">
				<table id="kaitiGroupGrid" ></table>
				<div id="kaitiGroupPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
