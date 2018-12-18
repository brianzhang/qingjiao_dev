
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/danBaoCompany/danBaoCompanyInfo.js"></script>
		<title>t_dbgs管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/danBaoCompany/danBaoCompanyInfo/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/danBaoCompany/danBaoCompanyInfo/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/danBaoCompany/danBaoCompanyInfo/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">担保公司客户名称</label>:
									<input type="text"  name="Q^DBGSKHMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担保性质</label>:
									<input type="text"  name="Q^DBXZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">负责人</label>:
									<input type="text"  name="Q^FZR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">联系电话</label>:
									<input type="text"  name="Q^LXDH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担保经营资格许可证</label>:
									<input type="text"  name="Q^DBJYZGXKZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">保证金账号</label>:
									<input type="text"  name="Q^BZJZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">保证金分账号</label>:
									<input type="text"  name="Q^BZJFZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">保证金金额</label>:
									<input type="text"  name="Q^BZJJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">允许放大倍数</label>:
									<input type="text"  name="Q^YXFDBS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">开办机构</label>:
									<input type="text"  name="Q^KBJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">生效日期 </label>:
									<input type="text" name="Q^SXRQ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^SXRQ^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label class="search-label">到期日期 </label>:
									<input type="text" name="Q^DQRQ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^DQRQ^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">担保公司客户号</label>:
									<input type="text"  name="Q^DBGSKHH^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="danBaoCompanyInfoGrid" ></table>
				<div id="danBaoCompanyInfoPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
