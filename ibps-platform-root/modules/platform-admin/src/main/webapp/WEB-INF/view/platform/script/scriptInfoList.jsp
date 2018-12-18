
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/script/scriptInfo.js"></script>
		<title>脚本管理管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/script/scriptInfo/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/script/scriptInfo/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/script/scriptInfo/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">脚本别名</label>:
									<input type="text"  name="Q^ALIAS_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">类路径</label>:
									<input type="text"  name="Q^CLASS_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">对象名</label>:
									<input type="text"  name="Q^CLASS_INS_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">方法名</label>:
									<input type="text"  name="Q^METHOD_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">脚本分类</label>:
									<select class="form-control search-select" id="Q^type_^SL" name="Q^type_^SL">
                                    	<option selected></option>
                                    	<c:forEach var="scriptType" items="${typeList}">
                                    		<option value="${scriptType.typeKey }" >${scriptType.name }</option>
                                    	</c:forEach>
                                    </select>
								</div> 
								<div class="form-group">
									<label   class="search-label">是否有效</label>:
									<select class="form-control search-select" id="Q^ENABLE_^SL" name="Q^ENABLE_^SL">
                                    	<option selected></option>
                                    	<option value="Y">是</option>
                                    	<option value="N">否</option>
                                    </select>
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="scriptInfoGrid" ></table>
				<div id="scriptInfoPager"></div>
			</div>
		</div>
	</body>
</html>
