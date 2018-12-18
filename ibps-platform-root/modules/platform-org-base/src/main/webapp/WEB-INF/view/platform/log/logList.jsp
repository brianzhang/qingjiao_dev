<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/log/log.js"></script>
		<title>系统操作日志管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<%-- <a class="btn btn-primary fa fa-add"   href="${ctx}/platform/log/log/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/log/log/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/log/log/remove.htm"><span>删除</span></a> --%>
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
									<label   class="search-label">标题</label>:
									<input type="text"  name="Q^title_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">类型</label>:
									<select class="form-control search-select"    name="Q^type_^S"  >
										<option value="">-请选择-</option>
										<option value="access">访问日志</option>
										<option value="exception">异常日志</option>
										<option value="login">登录日志</option>
										<option value="loginError">登录异常</option>
									</select>
								</div> 
								<div class="form-group">
									<label   class="search-label">IP地址</label>:
									<input type="text"  name="Q^ip_addr_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">请求URI</label>:
									<input type="text"  name="Q^request_uri_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">操作方式</label>:
									<input type="text"  name="Q^method_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">操作人</label>:
									<input type="text"  name="Q^createor_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">创建时间 </label>:
									<input type="text" name="Q^create_time_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^create_time_^DG"  class="form-control date" />
								</div>
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="logGrid" ></table>
				<div id="logPager"></div>
			</div>
		</div>
	
	</body>
	
</html>