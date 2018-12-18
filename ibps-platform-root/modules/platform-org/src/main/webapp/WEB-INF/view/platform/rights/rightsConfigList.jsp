<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
				<f:link href="bootstrap/bootstrap-multiselect.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/platform/rights/rightsConfig.js"></script>
		<title>权限配置管理列表</title>
	</head>
	<body>
		<textarea id="rightsTypes" style="display: none;" >${fn:escapeXml(rightsTypes)}</textarea>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/rights/rightsConfig/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/rights/rightsConfig/edit.htm" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/rights/rightsConfig/remove.htm"><span>删除</span></a>
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
											<label   class="search-label">名称</label>:
											<input type="text"  name="Q^name_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">业务主键</label>:
											<input type="text"  name="Q^key_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">实体表名</label>:
											<input type="text"  name="Q^entity_type_^SL"  class="form-control"  />
										</div> 
									</div> 
									<div  class="form-inline p-xxs">
										<div class="form-group">
											<label   class="search-label">拥有的权限</label>:
											   <select  id="ownRightsSelect"  name="ownRights"  class="form-control" >
											   		<option value="" >--所有权限--</option>
				                                	<c:forEach items="${rightsTypeList}" var="rightsType">
				                                			<option value="${rightsType.key}"  >${rightsType.label }</option>
				                                	</c:forEach>
												</select>
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="rightsConfigGrid" ></table>
					<div id="rightsConfigPager"></div>
				</div>
		</div>
	
	</body>
	
</html>