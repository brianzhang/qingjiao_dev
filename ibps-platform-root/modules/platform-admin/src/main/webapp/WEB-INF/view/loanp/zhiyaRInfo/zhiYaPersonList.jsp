
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/zhiyaRInfo/zhiYaPerson.js"></script>
		<title>t_zyr管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/zhiyaRInfo/zhiYaPerson/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/zhiyaRInfo/zhiYaPerson/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/zhiyaRInfo/zhiYaPerson/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">质押物所有人名称</label>:
									<input type="text"  name="Q^ZYWSYRMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否有户籍证明</label>:
									<input type="text"  name="Q^SFYHJZM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押人证件类型</label>:
									<input type="text"  name="Q^ZYRZJLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押人证件号码</label>:
									<input type="text"  name="Q^ZYRZJHM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押物是否共有</label>:
									<input type="text"  name="Q^ZYWSFGY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质物共有权人</label>:
									<input type="text"  name="Q^ZWGYQR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">共有方式</label>:
									<input type="text"  name="Q^GYFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押物种类</label>:
									<input type="text"  name="Q^ZYWZL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">债券、单、折、票据等证号</label>:
									<input type="text"  name="Q^PJDZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">债单、票据、债券金额</label>:
									<input type="text"  name="Q^ZQJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否办理核押止付</label>:
									<input type="text"  name="Q^SFBLHYZF^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">本行存单（折）账号</label>:
									<input type="text"  name="Q^BXCDZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">债单/票据/债券开始时间 </label>:
									<input type="text" name="Q^ZQKSSJ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^ZQKSSJ^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label class="search-label">债单/票据/债券 截止时间 </label>:
									<input type="text" name="Q^ZQJZSJ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^ZQJZSJ^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">止付单位</label>:
									<input type="text"  name="Q^ZFDW^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">币种</label>:
									<input type="text"  name="Q^BZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押物数量</label>:
									<input type="text"  name="Q^ZYWSL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押物是否已评估</label>:
									<input type="text"  name="Q^ZYWSFYPG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">评估机构</label>:
									<input type="text"  name="Q^PGJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">评估方法</label>:
									<input type="text"  name="Q^PGFF^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">评估日期 </label>:
									<input type="text" name="Q^PGRQ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^PGRQ^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">评估结论有效期限</label>:
									<input type="text"  name="Q^PGJLYXQX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">该质押物贷款金额</label>:
									<input type="text"  name="Q^GZYWDKJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">评估价值</label>:
									<input type="text"  name="Q^PGJZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押率</label>:
									<input type="text"  name="Q^ZYL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否进行质押登记</label>:
									<input type="text"  name="Q^SFJXZYDJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押物是否保证险</label>:
									<input type="text"  name="Q^ZYWSFBZX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">保险机构</label>:
									<input type="text"  name="Q^BXJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">保险金额</label>:
									<input type="text"  name="Q^BXJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">第一受益人名称</label>:
									<input type="text"  name="Q^DYSYRMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">质押物是否办理公证</label>:
									<input type="text"  name="Q^ZYWSFBLGZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">公证机关</label>:
									<input type="text"  name="Q^GZJG^SL"  class="form-control"  />
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
				<table id="zhiYaPersonGrid" ></table>
				<div id="zhiYaPersonPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
