<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.lc.ibps.api.org.constant.PartyAttrDataType" %>
<%@ page import="com.lc.ibps.api.org.constant.PartyAttrType" %>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp" %>
<script type="text/javascript" src="${ctx}/js/lc/commons/utils/form.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyAttr.js"></script>
<script type="text/javascript">
var entityId = '${entityId}';
</script>
</head>
<body>
<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/org/partyAttr/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/org/partyAttr/edit.htm" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/org/partyAttr/remove.htm"><span>删除</span></a>
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
										<label   class="search-label">属性名称</label>:
										<input type="text"  name="Q^NAME_^SL"  class="form-control"  />
									</div> 
									<div class="form-group">
										<label   class="search-label">参与者类型</label>:
										<select class="form-control search-select" name="Q^PARTY_TYPE_^S">
											<option value="">请选择</option>
											<c:forEach items="${partyTypes }" var="partyType">
											<option value="${partyType.value }">${partyType.label }</option>
											</c:forEach>
										</select>
									</div> 
									<div class="form-group">
										<label   class="search-label">属性类型</label>:
										<select class="form-control search-select" name="Q^TYPE_^S">
											<option value="">请选择</option>
											<c:forEach items="${partyAttrTypes }" var="partyAttrType">
												<option value="${partyAttrType.value }">${partyAttrType.label }</option>
											</c:forEach>
										</select>
									</div> 
									<div class="form-group">
										<label   class="search-label">数据类型</label>:
										<select class="form-control search-select" name="Q^DATA_TYPE_^S">
											<option value="">请选择</option>
											<c:forEach items="${partyAttrDataTypes }" var="partyAttrDataType">
												<option value="${partyAttrDataType.value }">${partyAttrDataType.label }</option>
											</c:forEach>
										</select>
									</div> 
								</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div>
				<div class="jqGrid_wrapper">
					<table id="partyAttrGrid" ></table>
					<div id="partyAttrPager"></div>
				</div>
			</div>
</body>
</html>