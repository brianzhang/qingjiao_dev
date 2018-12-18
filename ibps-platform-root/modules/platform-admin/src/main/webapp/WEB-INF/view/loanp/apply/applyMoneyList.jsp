
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/apply/applyMoney.js"></script>
		<title>t_jiedai管理列表</title>
	</head>
	<body>
		<input type="text" style="display:none" id="tx" value="<%=request.getParameter("tx")%>">
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/apply/applyMoney/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/apply/applyMoney/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-caret-square-o-right" href="javascript:void(0);"><span>启动审核</span></a>		
					        <a class="btn btn-primary fa print" href="/components/report/center/preview.htm?reportId=342778951791280128"><span>打印信息</span></a>	
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/apply/applyMoney/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">信用社</label>:
									<input type="text"  name="Q^XYS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">客户名</label>:
									<input type="text"  name="Q^CUSTOMER^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">身份证号</label>:
									<input type="text"  name="Q^SFID^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷款类别</label>:
									<input type="text"  name="Q^DKLB^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="applyMoneyGrid" ></table>
				<div id="applyMoneyPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
