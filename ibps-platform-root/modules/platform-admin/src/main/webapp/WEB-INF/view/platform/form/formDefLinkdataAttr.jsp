<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/DataTemplateUtil.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefLinkdataAttr.js"></script>
	<body>
			<div class="wrapper wrapper-content  col-sm-12">
					<div class="panel-form">
						
						<form class="form-horizontal" >
						
	                            <div  class="form-group row " >
	                            		<div class="col-sm-12">
	                            		<table  class=" table table-bordered ">
	                            			<thead>
	                            				<tr>
	                            					<td>返回结果字段	</td>
	                            					<td>绑定显示的属性</td>
	                            				</tr>
	                            			</thead>
	                            			<tbody id="resultfieldTb">
	                            				 	<tr>
	                            				 		<td colspan="2">请选择关联数据</td>
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