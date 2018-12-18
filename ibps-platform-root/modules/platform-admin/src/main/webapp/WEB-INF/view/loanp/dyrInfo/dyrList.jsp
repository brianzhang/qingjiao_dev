
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/dyrInfo/dyr.js"></script>
		<title>t_dyr管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/dyrInfo/dyr/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/dyrInfo/dyr/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/dyrInfo/dyr/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">抵押人</label>:
									<input type="text"  name="Q^DYR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否有户籍证明</label>:
									<input type="text"  name="Q^SFYHJZM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押人证件类型</label>:
									<input type="text"  name="Q^DYRZJLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押人证件号码</label>:
									<input type="text"  name="Q^DYRZJHM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押人贷款卡号</label>:
									<input type="text"  name="Q^DYRDKKH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物是否共有</label>:
									<input type="text"  name="Q^DYWSFGY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物共有权人</label>:
									<input type="text"  name="Q^DYWGYQR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">共有方式</label>:
									<input type="text"  name="Q^GYFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物名称</label>:
									<input type="text"  name="Q^DYWMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物位置</label>:
									<input type="text"  name="Q^DYWWZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物种类</label>:
									<input type="text"  name="Q^DYWZL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">房屋预登记</label>:
									<input type="text"  name="Q^FWYDJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">房屋结构</label>:
									<input type="text"  name="Q^FWJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">房产层数</label>:
									<input type="text"  name="Q^FCCS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">房产所在层数</label>:
									<input type="text"  name="Q^FCSZCS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物编号</label>:
									<input type="text"  name="Q^DYWBH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物是否拥有土地使用权证书</label>:
									<input type="text"  name="Q^DYWSFYYTDSYQZS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物房产土地使用权人名称</label>:
									<input type="text"  name="Q^DYWFCTDSYQRMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押房产土地使用权证号</label>:
									<input type="text"  name="Q^DYFCTDSYQZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押房产土地使用权类型</label>:
									<input type="text"  name="Q^DYFCTDSYQLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押房产土地使用权面积</label>:
									<input type="text"  name="Q^DYFCTDSYQMJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押房产土地使用权是否</label>:
									<input type="text"  name="Q^DYFCTDSYQSF^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押房产土地使用权抵押方式</label>:
									<input type="text"  name="Q^DYFCTDSYQDYFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物详细描述</label>:
									<input type="text"  name="Q^DYWXXMS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物相关证明文件</label>:
									<input type="text"  name="Q^DYWXGZMWJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">购房合同/抵押物产权证号/使用权证号</label>:
									<input type="text"  name="Q^GFHT_DYWCQZH_SYQZH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">发证机关</label>:
									<input type="text"  name="Q^FZJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物原置购置价</label>:
									<input type="text"  name="Q^DYWYZGZJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">面积/数</label>:
									<input type="text"  name="Q^MJ_S^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">建成/购置时间</label>:
									<input type="text"  name="Q^JC_GZSJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物使用年限</label>:
									<input type="text"  name="Q^DYWSYNX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">尚可使用年限</label>:
									<input type="text"  name="Q^SKSYNX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">折旧率</label>:
									<input type="text"  name="Q^ZJL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物是否评估</label>:
									<input type="text"  name="Q^DYWSFPG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物评估机构</label>:
									<input type="text"  name="Q^DYWPGJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">评估方法</label>:
									<input type="text"  name="Q^PGFF^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">抵押物评估日期 </label>:
									<input type="text" name="Q^DYWPGRQ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^DYWPGRQ^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">评估结论使用有效期限</label>:
									<input type="text"  name="Q^PGJLSYYXQX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">该抵押物贷款金额</label>:
									<input type="text"  name="Q^GDYWDKJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">评估价值</label>:
									<input type="text"  name="Q^PGJZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押率</label>:
									<input type="text"  name="Q^DYL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物是否进行抵押登记</label>:
									<input type="text"  name="Q^DYWSFJXDYDJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物登记机构</label>:
									<input type="text"  name="Q^DYWDJJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押登记文件号/他项权人</label>:
									<input type="text"  name="Q^DYDJWJH_TXQR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押价值</label>:
									<input type="text"  name="Q^DYJZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">抵押登记日 </label>:
									<input type="text" name="Q^DYDJR^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^DYDJR^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label class="search-label">抵押到期日 </label>:
									<input type="text" name="Q^DYDQR^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^DYDQR^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">抵押物是否保险</label>:
									<input type="text"  name="Q^DYWSFBX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">保险机构名称</label>:
									<input type="text"  name="Q^BXJGMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物保险单号</label>:
									<input type="text"  name="Q^DYWBXDH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">保险金额</label>:
									<input type="text"  name="Q^BXJE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">保险生效日 </label>:
									<input type="text" name="Q^BXSXR^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^BXSXR^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label class="search-label">保险到期日 </label>:
									<input type="text" name="Q^BXDQR^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^BXDQR^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">第一受益人名称</label>:
									<input type="text"  name="Q^DYSYRMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抵押物是否办理公证</label>:
									<input type="text"  name="Q^DYWSFBLGZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">公证机关</label>:
									<input type="text"  name="Q^GZJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">公证日期 </label>:
									<input type="text" name="Q^GZRQ^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^GZRQ^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">公证书编号</label>:
									<input type="text"  name="Q^GZSBH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">备注</label>:
									<input type="text"  name="Q^BZ^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="dyrGrid" ></table>
				<div id="dyrPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
