<#assign url ="ctx}/"+app+"/"+module+"/"+classVar>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="<#noparse>${</#noparse>ctx}/js/${cAlias}/${app}/${module}/${classVar}.js"></script>
		<title>${comment}管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<#if (vars.flowKey?exists && vars.flowKey != "") || (vars.selStartFlow?exists && vars.selStartFlow != "")>
							<a class="btn btn-primary fa fa-caret-square-o-right" href="javascript:void(0);"><span>启动</span></a>
							</#if>
							<a class="btn btn-primary fa fa-add"   href="<#noparse>${</#noparse>${url}/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="<#noparse>${</#noparse>${url}/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="<#noparse>${</#noparse>${url}/remove.htm"><span>删除</span></a>
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
			              		<#list commonList as col>
								<#assign colName=col.colName>
								<#if (col.isQuery)>
								<#if (col.colType=="java.util.Date") || (col.colType=="Date")>
								<div class="form-group">
									<label class="search-label">${col.comment} </label>:
									<input type="text" name="Q^${col.columnName?upper_case}^${getDataType("Date","1")}"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^${col.columnName?upper_case}^${getDataType("Date","0")}"  class="form-control date" />
								</div>
	                      		<#else>
								<div class="form-group">
									<label   class="search-label">${col.comment}</label>:
									<input type="text"  name="Q^${col.columnName?upper_case}^${getDataType("${col.colType}","0")}"  class="form-control"  />
								</div> 
				                </#if>
				                </#if>
								</#list>                     	     
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="${classVar}Grid" ></table>
				<div id="${classVar}Pager"></div>
			</div>
		</div>
	
	</body>
	
</html>