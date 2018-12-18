
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/GRGZLL/gRGZLL.js"></script>
		<title>t_grll管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/GRGZLL/gRGZLL/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/GRGZLL/gRGZLL/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/GRGZLL/gRGZLL/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">客户号</label>:
									<input type="text"  name="Q^KHH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">客户名称</label>:
									<input type="text"  name="Q^KHMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">开始日期</label>:
									<input type="text"  name="Q^KSRQ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">所在单位</label>:
									<input type="text"  name="Q^SZDW^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">所在部门</label>:
									<input type="text"  name="Q^SZBM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">结束日期</label>:
									<input type="text"  name="Q^JSRQ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位性质</label>:
									<input type="text"  name="Q^DWXZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">从事行业描述</label>:
									<input type="text"  name="Q^CSXYMS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担任职务</label>:
									<input type="text"  name="Q^DRZW^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位邮编</label>:
									<input type="text"  name="Q^DWYB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位电话</label>:
									<input type="text"  name="Q^DWDH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位地址</label>:
									<input type="text"  name="Q^DWDZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">月收入</label>:
									<input type="text"  name="Q^YSR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">备注</label>:
									<input type="text"  name="Q^BZZ^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="gRGZLLGrid" ></table>
				<div id="gRGZLLPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
