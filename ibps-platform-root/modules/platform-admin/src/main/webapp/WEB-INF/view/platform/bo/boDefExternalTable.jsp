<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bo/boDef.js"></script>
		<title>外部表列表</title>
		<script type="text/javascript">
				function getData(){
					var grid =$('#boDefExternalTable'),
						rowid = grid.jqGrid('getGridParam', 'selarrrow');
					if (rowid == null || rowid.length == 0) {
						DialogUtil.toastr('请选择记录!');
						return null;
					}
					var	data = grid.jqGrid("getRowData", rowid[0]);
					var columnList = JSON2.parse(data.columnList),
						attrs =[],pk ='',fk='';

					for (var i = 0, c, len = columnList.length; i < len; i ++) {
						c = columnList[i];
						if(c.isPk && c.isPk == 'Y')
							pk = c.name;
						if(c.isFk && c.isFk == 'Y')
							fk = c.name;
						var obj ={
								code:c.name,
								alias:c.name,
								name:c.comment,
								dataType:c.columnType
						}
						attrs.push(obj);
					}

					var d = {
						tableDesc:data.comment,
						tableName:data.name,
						aliasName:data.name,
						dsName: $('#dsAlias').find("option:selected").text(),
						dsAlias: $('#dsAlias').val(),
						pk:pk,
						fk:fk,
						attrs:attrs
					}
					return d;
				}
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
											<label   class="search-label">表名</label>:
											<input type="text"  name="tableName"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label   class="search-label">数据源</label>:
													<select  id="dsAlias" name="dsAlias" class="form-control">
														<c:forEach items="${dataSourceList}" var="dataSource">
																<option value="${dataSource.alias}">${dataSource.name}</option>
														</c:forEach>
												</select>
										</div> 
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="boDefExternalTable" ></table>
					<div id="boDefExternalTablePager"></div>
				</div>
		</div>
	</body>
</html>