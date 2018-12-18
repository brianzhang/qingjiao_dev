

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/office/office.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/office/officeDialog.js"></script>
		<title>【Office列表】管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="javascript:office.createOffice();" ><span>新建</span></a> 
							<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/office/officeControl/edit.htm" ><span>添加</span></a> 
						    <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/office/officeControl/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/office/officeControl/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">文件名</label>:
									<input type="text"  name="Q^FILE_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">文件拓展名</label>:
									<input type="text"  name="Q^EXT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">文件大小</label>:
									<input type="text"  name="Q^TOTAL_BYTES_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">文件路径</label>:
									<input type="text"  name="Q^FILE_PATH_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">创建者</label>:
									<input type="text"  name="Q^CREATE_BY_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">修改者</label>:
									<input type="text"  name="Q^UPDATE_BY_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">创建时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div>
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="officeControlGrid" ></table>
				<div id="officeControlPager"></div>
			</div>
		</div>
	
	</body>
	
</html>