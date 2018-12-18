<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/DataTemplateUtil.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefLinkdataCondition.js"></script>
	<body>
			<div class="wrapper wrapper-content  col-sm-12">
					<div class="panel-form">
						<form class="form-horizontal" >
	                			<div  class="form-group row "  id="dynamicParams" >
	                            		<div class="col-sm-12">
	                            		<table  class=" table table-bordered ">
	                            			<thead>
	                            				<tr>
	                            					<td>参数名称	</td>
	                            					<td>参数绑定方式	</td>
	                            					<td>绑定数据字段或固定值</td>
	                            				</tr>
	                            			</thead>
	                            			<tbody id="paramsTb">
	                            				 	<tr>
	                            				 		<td colspan="3">请选择关联数据</td>
	                            				 	</tr>
	                            			</tbody>
	                            		</table>
	                           	 </div>
	                            </div>
                        </form>
                    </div> 
				</div>
	</body>
</html>