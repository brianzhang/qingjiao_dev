
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/lyzygl/DanWeiGK/danWeiGK.js"></script>
		<title>t_dwgk管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/lyzygl/DanWeiGK/danWeiGK/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/lyzygl/DanWeiGK/danWeiGK/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/lyzygl/DanWeiGK/danWeiGK/remove.htm"><span>删除</span></a>
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
									<label class="search-label">创建时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">单位名称</label>:
									<input type="text"  name="Q^MING_CHEN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">土地总面积</label>:
									<input type="text"  name="Q^MIAN_JI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">经度</label>:
									<input type="text"  name="Q^JING_DU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">纬度</label>:
									<input type="text"  name="Q^WEI_DUO_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地处山系</label>:
									<input type="text"  name="Q^SHAN_XI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地处水系</label>:
									<input type="text"  name="Q^SHUI_XI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地处平原</label>:
									<input type="text"  name="Q^PING_YUAN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">平均海拔</label>:
									<input type="text"  name="Q^HAI_BA_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">平均气温</label>:
									<input type="text"  name="Q^QI_WEN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">年积温</label>:
									<input type="text"  name="Q^NIAN_JI_WEN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">日照时数</label>:
									<input type="text"  name="Q^RI_ZHAO_SHI_SHUO_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">主要土壤</label>:
									<input type="text"  name="Q^ZHU_YAO_TU_RANG_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">植物种类</label>:
									<input type="text"  name="Q^ZHI_WU_CHONG_LEI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">二类调查年度</label>:
									<input type="text"  name="Q^TIAO_ZHA_NIAN_DUO_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">录入年度</label>:
									<input type="text"  name="Q^LU_RU_NIAN_DU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">自然枯损率</label>:
									<input type="text"  name="Q^KU_SUN_SHUAI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">综合生长率</label>:
									<input type="text"  name="Q^SHENG_CHANG_LU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">林分类型</label>:
									<input type="text"  name="Q^LIN_FEN_LEI_XING_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">龄组</label>:
									<input type="text"  name="Q^LING_ZU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">生长率</label>:
									<input type="text"  name="Q^SHENG_ZHANG_LU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">林地</label>:
									<input type="text"  name="Q^LIN_DE_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">林木</label>:
									<input type="text"  name="Q^LIN_MU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">面积1</label>:
									<input type="text"  name="Q^MIAN_JI1_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">蓄积1</label>:
									<input type="text"  name="Q^XU_JI1_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">面积2</label>:
									<input type="text"  name="Q^MIAN_JI2_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">蓄积2</label>:
									<input type="text"  name="Q^XU_JI2_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">平均降水量</label>:
									<input type="text"  name="Q^PING_JUN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">无霜期</label>:
									<input type="text"  name="Q^WU_SHUANG_QI_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="danWeiGKGrid" ></table>
				<div id="danWeiGKPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
