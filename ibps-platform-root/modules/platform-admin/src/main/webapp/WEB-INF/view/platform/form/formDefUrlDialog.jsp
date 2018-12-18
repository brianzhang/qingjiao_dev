<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefUrlDialog.js"></script>
	<body>
			<div class="wrapper wrapper-content  col-sm-12">
					<div class="panel-form">
						
						<form class="form-horizontal" >
								<div class="col-sm-12">
											<div class="form-group">
		                                <label class="col-sm-2 control-label">url地址<span class="required">*</span>:</label>
		                                <div class="col-sm-10">
		                                    <input type="text" class="form-control" id="url" name="url" validate="{required:true,maxlength:384}">
		                                </div>
		                            </div>
								</div>
	                            <div  class="form-group row " >
	                            		<div class="col-sm-12">
											<div class="panel-toolbar ">
												<div class="buttons">
													<a href="javascript:void(0);" class="btn btn-primary fa fa-add js-add"><span>添加</span></a>
												</div>
											</div>
										</div>
	                            		<div class="col-sm-12">
	                            		<table  class=" table table-bordered ">
	                            			<thead>
	                            				<tr>
	                            					<td>对话框返回结果字段key</td>
	                            					<td>绑定数据字段</td>
	                            					<td>操作</td>
	                            				</tr>
	                            			</thead>
	                            			<tbody id="resultfieldTb">
	                            				
	                            			</tbody>
	                            		</table>
	                           	 </div>
	                            </div>
                        </form>
                    </div> 
				</div>
	</body>
</html>