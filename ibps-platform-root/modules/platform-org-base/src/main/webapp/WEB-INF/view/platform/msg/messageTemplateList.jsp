<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/msg/messageTemplate.js"></script>
		<title>消息模版管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/msg/messageTemplate/edit.htm" ><span>添加</span></a>
						        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/msg/messageTemplate/edit.htm" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/msg/messageTemplate/remove.htm"><span>删除</span></a>
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
											<label  class="search-label">模板分类</label>:
											<select name="Q^type_key_^SL"  class="form-control search-select" >
													<option value="">全部</option>
		                                			<c:forEach items="${msgTelTypes}" var="msgTelType">
		                                				<option value="${msgTelType.typeKey }">${msgTelType.name }</option>
		                                			</c:forEach>
	                                		</select>
										</div> 
									</div>
									<div  class="form-inline p-xxs">
										<div class="form-group">
											<label   class="search-label">是否默认</label>:
											  	<select name="Q^is_default_^S" class="form-control search-select" >
													<option value="">全部</option>
													<option value="Y" >是</option>
													<option value="N" >否</option>
												</select>
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<textarea id="msgTelTypeJson" style="display: none;" >${fn:escapeXml(msgTelTypeJson)}</textarea>
				<div class="jqGrid_wrapper">
					<table id="messageTemplateGrid" ></table>
					<div id="messageTemplatePager"></div>
				</div>
		</div>
	</body>
</html>