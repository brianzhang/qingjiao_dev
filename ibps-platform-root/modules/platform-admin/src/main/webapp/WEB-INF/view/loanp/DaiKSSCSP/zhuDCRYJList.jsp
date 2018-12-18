
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/zhuDCRYJ.js"></script>
		<title>t_zdcryj管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/DaiKSSCSP/zhuDCRYJ/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/DaiKSSCSP/zhuDCRYJ/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/DaiKSSCSP/zhuDCRYJ/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">借款人名称</label>:
									<input type="text"  name="Q^JKRMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">借款人信用等级/得分</label>:
									<input type="text"  name="Q^JKRXYDJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物现值</label>:
									<input type="text"  name="Q^DYWXZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押物现值</label>:
									<input type="text"  name="Q^ZYWXZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">信用系统查询时间 </label>:
									<input type="text" name="Q^XYXTCXSJ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^XYXTCXSJ^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">信贷系统管理系统查询</label>:
									<input type="text"  name="Q^XDXTGLXTCX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">人民银行个人征信数据库查询</label>:
									<input type="text"  name="Q^RMYXGRZXSJKCX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷前调查方式</label>:
									<input type="text"  name="Q^DQDCFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">资料齐备真实</label>:
									<input type="text"  name="Q^ZLQBZS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">申请人住所已核实</label>:
									<input type="text"  name="Q^SQRZSYHS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">申请人住所地址</label>:
									<input type="text"  name="Q^SQRZSDZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">申请人收入已核实</label>:
									<input type="text"  name="Q^SQRSRYHS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">月均收入</label>:
									<input type="text"  name="Q^YJSR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">借款人联系方式</label>:
									<input type="text"  name="Q^JKRLXFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">借款人配偶联系方式</label>:
									<input type="text"  name="Q^JKRPOLXFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担保人联系方式</label>:
									<input type="text"  name="Q^DBRLXFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担保人配偶联系方式</label>:
									<input type="text"  name="Q^DBRPOLXFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">共有人联系方式</label>:
									<input type="text"  name="Q^GYRLXFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">核实担保物方式</label>:
									<input type="text"  name="Q^HSDBWFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">担保人是否面签</label>:
									<input type="text"  name="Q^DBRSFMQ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">贷款相关情况说明</label>:
									<input type="text"  name="Q^DKXGQKSM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">风险预测</label>:
									<input type="text"  name="Q^FXYC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">拟采取的风险控制措施</label>:
									<input type="text"  name="Q^NCQDFXKZCS^SL"  class="form-control"  />
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
									<label   class="search-label">贷款方式</label>:
									<input type="text"  name="Q^DKFS^SL"  class="form-control"  />
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
									<label   class="search-label">主调查人签名</label>:
									<input type="text"  name="Q^ZDCRQM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">主调查人签字时间 </label>:
									<input type="text" name="Q^ZDCRQZSJ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^ZDCRQZSJ^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">借贷Id</label>:
									<input type="text"  name="Q^JDID^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">主调查人Id</label>:
									<input type="text"  name="Q^ZDCRID^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="zhuDCRYJGrid" ></table>
				<div id="zhuDCRYJPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
