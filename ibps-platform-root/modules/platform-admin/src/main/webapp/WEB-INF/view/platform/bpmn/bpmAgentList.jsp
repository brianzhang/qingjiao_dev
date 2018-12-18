
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmAgent.js"></script>
		<title>流程代理管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/bpmn/bpmAgent/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/bpmn/bpmAgent/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/bpmn/bpmAgent/remove.htm"><span>删除</span></a>
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
									<input type="text"  name="Q^TITLE_^SL"  class="form-control"  />
								</div> 
								<c:if test="${notHide == true || notHide == 'true'}">
								<div class="form-group">
									<label   class="search-label">委托人</label>:
									<div class="input-group ">
										<input type="hidden" name="Q^DELEGATOR_ID_^S"  id="delegator"/> 
		                               	<input type="text" class="form-control"  id="delegatorName" readonly="readonly"/>
		                           	  	<span class="input-group-btn">
		                           	  		<button type="button" class="btn  btn-info btn-mm"  
		                           	  			 data-toggle="selector"  data-type="user" data-single="true"  data-id="#delegator" data-name="#delegatorName" >
		                           	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
		                           	  		<button type="button" class="btn btn-info btn-mm" 
				                               	 data-toggle="clear" data-id="#delegator" data-name="#delegatorName">
				                               	 <i class="fa fa-times"></i></button>
		                           	  	</span>
		                            </div>
								</div> 
								</c:if>
								<div class="form-group">
									<label   class="search-label">是否启用</label>:
									<select class="form-control search-select" name="Q^IS_ENABLED_^S">
										<option value="">请选择</option>
										<option value="enabled">启用</option>
										<option value="disabled">禁用</option>
									</select>
								</div> 
								<div class="form-group">
									<label   class="search-label">代理类型</label>:
									<select class="form-control search-select" name="Q^AGENT_TYPE_^S">
										<option value="">请选择</option>
										<option value="all">全权代理</option>
										<option value="part">部分代理</option>
										<option value="condition">条件代理</option>
									</select>
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="bpmAgentGrid" ></table>
				<div id="bpmAgentPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
