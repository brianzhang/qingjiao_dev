<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	<%@include file="/commons/include/list.jsp" %>
	<%@include file="/commons/page/layout.jsp" %>
	<%@include file="/commons/page/tree.jsp" %>
	<script type="text/javascript" src="${ctx}/js/lc/platform/cat/TypeTree.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/office/bpmProcess.js"></script>
	<title>已办事宜</title>
</head>
<body>
	<div class="ui-layout-west">
		  <div class="layout-header ">
       			<h5>流程分类</h5>
      				<div class="layout-tools">
      						<a herf="javascript:void(0);" class="pinBtn"><i class="fa fa-angle-double-left"></i></a>
                      	</div>
       		</div>
			<div class="tree-toolbar" >
				<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
				<a class="btn btn-primary fa fa-expand" title="展开"></a> 
				<a class="btn btn-primary fa fa-compress" title="收缩"></a>
			</div>
			<div id="typeTree" class="ztree" ></div>	
	</div>
	<div class="ui-layout-center"> 
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
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
								<input type="hidden"  id="typeId"  name="Q^type_id_^SL"  />
								<div  class="form-inline p-xxs">
									<div class="form-group">
										<label   class="search-label">请求标题</label>:
										<input type="text"  name="Q^wfInst.subject_^SL"  class="form-control"  />
									</div>
									<div class="form-group">
										<label   class="search-label">流程名称</label>:
										<input type="text"  name="Q^wfInst.proc_def_name_^SL"  class="form-control"  />
									</div>
										<div class="form-group">
										<label   class="search-label">状态</label>:
										 <select name="Q^wfInst.status_^S" class="form-control  search-select" >
												<option value="">全部</option>
												<option value="running">正在运行</option>
												<option value="end">结束</option>
												<option value="manualend">人工结束</option>
												<option value="cancel">取消</option>
										</select>
									</div>
								</div>
								<div  class="form-inline p-xxs">
									<div class="form-group">
										<label   class="search-label">创建时间 从</label>:
											<input type="text"  name="Q^wfInst.create_time_^DL"  class="form-control date"  />
										
									</div>
										<div class="form-group">
										<label   class="search-label">至</label>:
										<input type="text"  name="Q^wfInst.create_time_^DG"  class="form-control date"  />
									</div>
								</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="handledGrid" ></table>
				<div id="processPager"></div>
			</div>
		</div>

	</body>
</html>