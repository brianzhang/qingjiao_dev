
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/lyzygl/XiaoBan/xiaoBan.js"></script>
		<style type="text/css">
/* 		.ui-jqgrid .ui-jqgrid-bdiv {
	position: relative; 
	margin: 0; 
	padding:0; 
	overflow-y:auto; 
	overflow-x:auto; 
	text-align:left; 
} */

		</style>
		<title>t_xb管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/lyzygl/XiaoBan/xiaoBan/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/lyzygl/XiaoBan/xiaoBan/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/lyzygl/XiaoBan/xiaoBan/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">idd</label>:
									<input type="text"  name="Q^IDD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">林班号</label>:
									<input type="text"  name="Q^LBH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">小班号</label>:
									<input type="text"  name="Q^XBH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">二级林种</label>:
									<input type="text"  name="Q^EJLZ^SL"  class="form-control"  />
								</div> 
<!-- 								<div class="form-group">
									<label   class="search-label">二级林种1</label>:
									<input type="text"  name="Q^EJLZ1^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">二级林种2</label>:
									<input type="text"  name="Q^EJLZ2^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地类</label>:
									<input type="text"  name="Q^DL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地类1</label>:
									<input type="text"  name="Q^DL1^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地权</label>:
									<input type="text"  name="Q^DQ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">林权</label>:
									<input type="text"  name="Q^LQ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">起源</label>:
									<input type="text"  name="Q^QY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">面积</label>:
									<input type="text"  name="Q^MJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">株数</label>:
									<input type="text"  name="Q^ZS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">蓄积</label>:
									<input type="text"  name="Q^XJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">龄组</label>:
									<input type="text"  name="Q^LZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">林分类型</label>:
									<input type="text"  name="Q^LFLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">树种组成</label>:
									<input type="text"  name="Q^SZZC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">郁闭度</label>:
									<input type="text"  name="Q^YBD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">经营措施</label>:
									<input type="text"  name="Q^JYCS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">龄级</label>:
									<input type="text"  name="Q^LJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">林龄</label>:
									<input type="text"  name="Q^LL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">胸径</label>:
									<input type="text"  name="Q^XIONGJING^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">树高</label>:
									<input type="text"  name="Q^SG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地权使用权</label>:
									<input type="text"  name="Q^DQSYQ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">林权使用权</label>:
									<input type="text"  name="Q^LQSYQ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">工程类别</label>:
									<input type="text"  name="Q^GCLB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">土壤</label>:
									<input type="text"  name="Q^TR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">自然度</label>:
									<input type="text"  name="Q^ZRD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">备注</label>:
									<input type="text"  name="Q^BZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">群落结构</label>:
									<input type="text"  name="Q^QLJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">立地类型</label>:
									<input type="text"  name="Q^LDLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">优势木平均高</label>:
									<input type="text"  name="Q^YSSPJG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地貌</label>:
									<input type="text"  name="Q^DM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">枯倒木蓄积量</label>:
									<input type="text"  name="Q^KDMXJL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">主要下木</label>:
									<input type="text"  name="Q^ZYXM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">下木盖度</label>:
									<input type="text"  name="Q^XMGD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">主要地被物</label>:
									<input type="text"  name="Q^ZYDBW^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地被物盖度</label>:
									<input type="text"  name="Q^DBWGD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">坡向</label>:
									<input type="text"  name="Q^PX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">坡位</label>:
									<input type="text"  name="Q^PW^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">坡度</label>:
									<input type="text"  name="Q^PD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">A1层厚度</label>:
									<input type="text"  name="Q^A1CHD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">海拔</label>:
									<input type="text"  name="Q^HB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">疏密度</label>:
									<input type="text"  name="Q^SMD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">抚育采伐年度</label>:
									<input type="text"  name="Q^FYCFND^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">造林更新年度</label>:
									<input type="text"  name="Q^ZLGXND^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">公顷株数</label>:
									<input type="text"  name="Q^GQZS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">公顷蓄积</label>:
									<input type="text"  name="Q^GQXJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">公顷初植密度</label>:
									<input type="text"  name="Q^GQCZMD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">人工林保存率</label>:
									<input type="text"  name="Q^RGLBCL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">平均木单株材积</label>:
									<input type="text"  name="Q^PJMDZCJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">散生木株数</label>:
									<input type="text"  name="Q^SSMZS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">散生木蓄积</label>:
									<input type="text"  name="Q^SSMXJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">散生木平均胸径</label>:
									<input type="text"  name="Q^SSMPJXJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">导入校验</label>:
									<input type="text"  name="Q^DRJY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">导入校验提示1</label>:
									<input type="text"  name="Q^DRJYTS1^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">导入校验提示2</label>:
									<input type="text"  name="Q^DRJYTS2^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">导入校验提示3</label>:
									<input type="text"  name="Q^DRJYTS3^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">树种组成排序</label>:
									<input type="text"  name="Q^SZZCPX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">GPS横坐标</label>:
									<input type="text"  name="Q^GPSHZB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">GPS纵坐标</label>:
									<input type="text"  name="Q^GPSZZB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">土壤Ab层厚度</label>:
									<input type="text"  name="Q^TRABCHD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">生长率</label>:
									<input type="text"  name="Q^SZL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">枯损量</label>:
									<input type="text"  name="Q^KSL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">生长量</label>:
									<input type="text"  name="Q^SZLIANG^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">非正常消耗量</label>:
									<input type="text"  name="Q^FZCXHL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位编号</label>:
									<input type="text"  name="Q^DWBH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">散生木生长率</label>:
									<input type="text"  name="Q^SSMSZL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">管护费亩标准</label>:
									<input type="text"  name="Q^GHFMBZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">林下收入分成亩标准</label>:
									<input type="text"  name="Q^LXSRFCMBZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">性质年度</label>:
									<input type="text"  name="Q^XZND^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">管护造林面积</label>:
									<input type="text"  name="Q^GHZLMJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">管护抚育面积</label>:
									<input type="text"  name="Q^GHFYMJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">可及度</label>:
									<input type="text"  name="Q^KJD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地位级</label>:
									<input type="text"  name="Q^DWJ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">事权</label>:
									<input type="text"  name="Q^SQ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">工程性质</label>:
									<input type="text"  name="Q^GCXZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">保护等级</label>:
									<input type="text"  name="Q^BHDJ^SL"  class="form-control"  />
								</div>  -->
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper" >
				<table id="xiaoBanGrid" ></table>
				<div id="xiaoBanPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
