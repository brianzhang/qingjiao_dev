<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript">
		var struType = "${struType}";
		</script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/dictionary.js"></script>
		<title>数据字典管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a class="btn btn-primary fa fa-add"   href="javascript:void(0);" id="addDictionary"><span>添加</span></a>
						        <a class="btn btn-primary fa fa-pencil-square-o"   href="javascript:void(0);"  id="editDictionary" ><span>编辑</span></a>	 
						        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  id="delDictionary"><span>删除</span></a>
						        <c:if test="${struType == 1}">
						        <span class="red">树形结构-可选中列表中记录添加子集</span>
						        </c:if>
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
											<label   class="search-label">字典对照值</label>:
											<input type="text"  name="Q^NAME_^SL"  class="form-control"  />
												<input type="hidden" name="Q^TYPE_ID_^S"  id="typeId" value="${param.id}">
										</div> 
										<div class="form-group">
											<label   class="search-label">字典对照码</label>:
											<input type="text"  name="Q^KEY_^SL"  class="form-control"  />
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
			
				<div class="jqGrid_wrapper">
					<table id="dictionaryGrid" ></table>
					<div id="dictionaryPager"></div>
				</div>
		</div>
	
	</body>
	
</html>