
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/GTGSHXX/gTGSHXX.js"></script>
		<title>t_gtgshxxb管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/GTGSHXX/gTGSHXX/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/GTGSHXX/gTGSHXX/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/GTGSHXX/gTGSHXX/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">营业执照号码</label>:
									<input type="text"  name="Q^YYZZHM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">营业执照年检时间</label>:
									<input type="text"  name="Q^YYZZNJSJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">成立时间</label>:
									<input type="text"  name="Q^CLSJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">经营范围</label>:
									<input type="text"  name="Q^JYFW^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">经营方式</label>:
									<input type="text"  name="Q^JYFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">门店字号</label>:
									<input type="text"  name="Q^MDZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">门店地址</label>:
									<input type="text"  name="Q^MDDZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">经营规模</label>:
									<input type="text"  name="Q^JYGM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">基本账号开户行</label>:
									<input type="text"  name="Q^JBZHKHX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">基本账号</label>:
									<input type="text"  name="Q^JBZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">经营面积</label>:
									<input type="text"  name="Q^JYMJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">关联账户类型</label>:
									<input type="text"  name="Q^GLZHLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">从业人数</label>:
									<input type="text"  name="Q^CYRS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">组成形式</label>:
									<input type="text"  name="Q^ZCXS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">营业用房</label>:
									<input type="text"  name="Q^YYYF^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">管户机构</label>:
									<input type="text"  name="Q^GHJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">备注</label>:
									<input type="text"  name="Q^BZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">合伙人名称</label>:
									<input type="text"  name="Q^HHRMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">证件类型</label>:
									<input type="text"  name="Q^ZJLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">证件有效期限</label>:
									<input type="text"  name="Q^ZJYXQX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">证件号码</label>:
									<input type="text"  name="Q^ZJHM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">户籍地址</label>:
									<input type="text"  name="Q^HJDZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">客户性别</label>:
									<input type="text"  name="Q^KHXB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">民族</label>:
									<input type="text"  name="Q^MZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">联系电话</label>:
									<input type="text"  name="Q^LXDH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">合伙方式</label>:
									<input type="text"  name="Q^HHFS^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="gTGSHXXGrid" ></table>
				<div id="gTGSHXXPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
