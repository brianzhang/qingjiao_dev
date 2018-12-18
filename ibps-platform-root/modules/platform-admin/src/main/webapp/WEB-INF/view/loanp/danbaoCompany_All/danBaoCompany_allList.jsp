
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/danbaoCompany_All/danBaoCompany_all.js"></script>
		<title>t_danbaocompany_all管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/danbaoCompany_All/danBaoCompany_all/edit.htm?jdid=${jdid}" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/danbaoCompany_All/danBaoCompany_all/edit.htm?jdid=${jdid}" ><span>编辑</span></a>
					         <a class="btn btn-primary fa fa-back"   href="${ctx}/loanp/apply/applyMoney/list.htm?tx=0" ><span>返回</span></a>	 	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/danbaoCompany_All/danBaoCompany_all/remove.htm"><span>删除</span></a>
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
						<form role="form" class="search-form"  method="post">
							<div  class="form-inline p-xxs">
								
								<div class="form-group">
									<label   class="search-label">公司名称</label>:
									<input type="text"  name="Q^GSMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">公司法定代表人</label>:
									<input type="text"  name="Q^GSFDDBR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">法人证件类型</label>:
									<input type="text"  name="Q^FRZJLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">法人身份证号</label>:
									<input type="text"  name="Q^FRSFZH^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="danBaoCompany_allGrid" ></table>
				<div id="danBaoCompany_allPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
