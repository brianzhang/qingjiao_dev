
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PingJia/pingJia.js"></script>
		<title>t_pymbpj管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/pg/PingJia/pingJia/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/pg/PingJia/pingJia/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/pg/PingJia/pingJia/remove.htm"><span>删除</span></a>
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
									<label class="search-label">创建时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">评价周期</label>:
									<input type="text"  name="Q^ZHOU_QI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">主要评价人</label>:
									<input type="text"  name="Q^PING_JIE_REN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">评价人身份</label>:
									<input type="text"  name="Q^JUAN_FEN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">评价机制</label>:
									<input type="text"  name="Q^PING_JIE_JI_ZHI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">方案ID</label>:
									<input type="text"  name="Q^FANG_AN_I_D_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">方案名称</label>:
									<input type="text"  name="Q^MING_CHENG_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">最近一次评价</label>:
									<input type="text"  name="Q^PING_JIA_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="pingJiaGrid" ></table>
				<div id="pingJiaPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
