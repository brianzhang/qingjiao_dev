
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/shenCRYJ.js"></script>
		<title>t_scryj管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/DaiKSSCSP/shenCRYJ/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/DaiKSSCSP/shenCRYJ/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/DaiKSSCSP/shenCRYJ/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">申请资料是否有效</label>:
									<input type="text"  name="Q^SQZLSFYX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">借款申请人偿还能力</label>:
									<input type="text"  name="Q^JKSQRCHNL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">借款申请人收入核实</label>:
									<input type="text"  name="Q^JKSQRSRHS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担保人身份核实</label>:
									<input type="text"  name="Q^DBRSFHS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担保人担保能力</label>:
									<input type="text"  name="Q^DBRDBNL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">借款申请人</label>:
									<input type="text"  name="Q^JKSQR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">授信金额</label>:
									<input type="text"  name="Q^SXJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">授信期限</label>:
									<input type="text"  name="Q^SXQX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担保方式</label>:
									<input type="text"  name="Q^DBFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷款类别</label>:
									<input type="text"  name="Q^DKLB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷款金额</label>:
									<input type="text"  name="Q^DKJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷款期限</label>:
									<input type="text"  name="Q^DKQX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">月利率</label>:
									<input type="text"  name="Q^YLL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">归还方式</label>:
									<input type="text"  name="Q^GHFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">借贷Id</label>:
									<input type="text"  name="Q^JDID^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">审查人Id</label>:
									<input type="text"  name="Q^SCRID^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">审查人签字</label>:
									<input type="text"  name="Q^SCRQZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">审查人签字时间 </label>:
									<input type="text" name="Q^SCRQZSJ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^SCRQZSJ^DG"  class="form-control date" />
								</div>
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="shenCRYJGrid" ></table>
				<div id="shenCRYJPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
