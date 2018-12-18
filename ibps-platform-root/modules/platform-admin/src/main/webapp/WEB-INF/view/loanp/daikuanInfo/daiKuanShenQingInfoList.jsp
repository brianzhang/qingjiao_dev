
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/daikuanInfo/daiKuanShenQingInfo.js"></script>
		<title>t_sxsq管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/daikuanInfo/daiKuanShenQingInfo/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/daikuanInfo/daiKuanShenQingInfo/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/daikuanInfo/daiKuanShenQingInfo/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">申请授信额度</label>:
									<input type="text"  name="Q^SQSXED^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">申请授信期限</label>:
									<input type="text"  name="Q^SQSXQX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">授信总额</label>:
									<input type="text"  name="Q^SXZE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">客户名称</label>:
									<input type="text"  name="Q^KHMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">产品名称</label>:
									<input type="text"  name="Q^CPMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">申请金额</label>:
									<input type="text"  name="Q^SQJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷款形式</label>:
									<input type="text"  name="Q^DKXS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">期限类别</label>:
									<input type="text"  name="Q^QXLB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担保方式</label>:
									<input type="text"  name="Q^DBFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">合同性质</label>:
									<input type="text"  name="Q^HTXZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">行（社）定利率</label>:
									<input type="text"  name="Q^XDLL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">执行利率</label>:
									<input type="text"  name="Q^ZXLL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">基准利率</label>:
									<input type="text"  name="Q^JZLL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否优惠</label>:
									<input type="text"  name="Q^SFYH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">利率调整方式</label>:
									<input type="text"  name="Q^LLDZFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">浮动比例</label>:
									<input type="text"  name="Q^FDBL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">结息方式</label>:
									<input type="text"  name="Q^JXFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">还款来源</label>:
									<input type="text"  name="Q^HKLY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否有还款计划</label>:
									<input type="text"  name="Q^SFYHKJH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否政府承诺还款</label>:
									<input type="text"  name="Q^SFZFCNHK^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否合作项目贷款</label>:
									<input type="text"  name="Q^SFHZXMDK^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否涉农贷款</label>:
									<input type="text"  name="Q^SFSNDK^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">涉农贷款类别</label>:
									<input type="text"  name="Q^SNDKLB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">涉农贷款用途</label>:
									<input type="text"  name="Q^SNDKYT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷款投向</label>:
									<input type="text"  name="Q^DKTX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷款用途</label>:
									<input type="text"  name="Q^DKYT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷款用途明细</label>:
									<input type="text"  name="Q^DKYTMX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否接受短息通</label>:
									<input type="text"  name="Q^SFJSDXT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">联系人名称</label>:
									<input type="text"  name="Q^LXRMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">联系人手机号</label>:
									<input type="text"  name="Q^LXRSJH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">支付方式</label>:
									<input type="text"  name="Q^ZFFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否自动扣款</label>:
									<input type="text"  name="Q^SFZDKK^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">自动扣款账号</label>:
									<input type="text"  name="Q^ZDKKZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">还款方式</label>:
									<input type="text"  name="Q^HKFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">借贷Id</label>:
									<input type="text"  name="Q^JDID^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="daiKuanShenQingInfoGrid" ></table>
				<div id="daiKuanShenQingInfoPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
