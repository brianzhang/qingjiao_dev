
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/pJNRProcess.js"></script>
		<title>t_p_byyqpjnrygc管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/pg/PGData/pJNRProcess/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/pg/PGData/pJNRProcess/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/pg/PGData/pJNRProcess/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">支撑权重</label>:
									<input type="text"  name="Q^WEIGHT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">考核方式</label>:
									<input type="text"  name="Q^INSPECTION_WAY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">最近一次评价结果文档</label>:
									<input type="text"  name="Q^DOCUMENT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">毕业要求</label>:
									<input type="text"  name="Q^BI_YE_YAO_QIU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">指标点</label>:
									<input type="text"  name="Q^ZHI_BIAO_DIAN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">相关教学活动</label>:
									<input type="text"  name="Q^JIAO_XUE_HUO_DONG_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="pJNRProcessGrid" ></table>
				<div id="pJNRProcessPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
