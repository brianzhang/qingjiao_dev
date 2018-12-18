
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/ZYXX/zYXXB.js"></script>
		<title>t_zyxxb管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/ZYXX/zYXXB/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/ZYXX/zYXXB/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/ZYXX/zYXXB/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">职业</label>:
									<input type="text"  name="Q^ZYNSR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">年收入</label>:
									<input type="text"  name="Q^NSR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否本行员工</label>:
									<input type="text"  name="Q^SFBXYG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">首次合作时间</label>:
									<input type="text"  name="Q^SCHZSJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">首次合作金额</label>:
									<input type="text"  name="Q^SCHZJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">工作单位名称</label>:
									<input type="text"  name="Q^GZDWMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位地址</label>:
									<input type="text"  name="Q^DWDZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位邮编</label>:
									<input type="text"  name="Q^DWYB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位所属行业</label>:
									<input type="text"  name="Q^DWSSXY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位性质</label>:
									<input type="text"  name="Q^DWXZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">职务</label>:
									<input type="text"  name="Q^ZW^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">职称</label>:
									<input type="text"  name="Q^ZC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">月收入</label>:
									<input type="text"  name="Q^YSR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">岗位性质</label>:
									<input type="text"  name="Q^GWXZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位电话</label>:
									<input type="text"  name="Q^DWDH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">本单位工作起始年月</label>:
									<input type="text"  name="Q^BDWGZQSNY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">工资账号</label>:
									<input type="text"  name="Q^GZZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">工资账号开户行</label>:
									<input type="text"  name="Q^GZZHKHX^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="zYXXBGrid" ></table>
				<div id="zYXXBPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
