<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/msg/innerMessage.js"></script>
		<title>内部消息管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/msg/innerMessage/remove.htm"><span>删除</span></a>
								<a class="btn btn-primary fa fa-check-circle"  href="javascript:void(0);" id="mark"  ><span>标记为已读</span></a>
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
											<label   class="search-lable">主题</label>:
											<input type="text"  name="Q^subject^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-lable">发送人</label>:
											<input type="text"  name="Q^owner_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-lable">消息类型</label>:
											<select name="Q^messageType^SL"  class="form-control search-select" >
													<option value="">全部</option>
		                                			<option value="normal">普通</option>
		                                			<option value="system">系统消息</option>
		                                			<option value="bulletin">公告</option>
		                                	</select>
										</div> 
										<div class="form-group">
											<label class="search-lable">发送时间 </label>:
											<input type="text" name="Q^beginreceiveTime^D"  class="form-control date"  />
										</div>
										<div class="form-group">
											<label class="search-lable" >至</label>:
											<input type="text" name="Q^endreceiveTime^D"  class="form-control date" />
										</div>
									</div> 
										
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="innerMessageReceiveGrid" ></table>
					<div id="innerMessagePager"></div>
				</div>
		</div>
	
	</body>
	
</html>