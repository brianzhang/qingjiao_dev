
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/bzrAll/baoZhengRenAll.js"></script>
		<title>t_bzr_all管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/bzrAll/baoZhengRenAll/edit.htm?jdid=${jdid}" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/bzrAll/baoZhengRenAll/edit.htm?jdid=${jdid}" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-back"   href="${ctx}/loanp/apply/applyMoney/list.htm?jdid=${jdid}&tx=0" ><span>返回</span></a>	 	
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/bzrAll/baoZhengRenAll/remove.htm"><span>删除</span></a>
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
						<form role="form" class="search-form" method="post">
							<div  class="form-inline p-xxs"> 
								<div class="form-group">
									<label   class="search-label">保证人名称</label>:
									<input type="text"  name="Q^MC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">证件类型</label>:
									<input type="text"  name="Q^ZJLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">证件号码</label>:
									<input type="text"  name="Q^ZJHM^SL"  class="form-control"  />
								</div>
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="baoZhengRenAllGrid" ></table>
				<div id="baoZhengRenAllPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
