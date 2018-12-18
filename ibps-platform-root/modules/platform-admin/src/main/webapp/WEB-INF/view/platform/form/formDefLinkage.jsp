<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefLinkage.js"></script>
	<style>
		.linkage-head {
		    top: 1px;
		    left: 1px;
		    right: 1px;
		    background: #f3f8fb;
		    height: 40px;
		    line-height: 40px;
		    padding: 0 10px;
		    border-top-left-radius: 4px;
		    border-top-right-radius: 4px;
		    font-size: 14px;
		    z-index: 9;
		}
	</style>
	<body>
			<div class="wrapper wrapper-content  col-sm-12">
					<div class="linkage-head ">
							<span class="linkage-name"></span><span class="linkage-equal"> 的联动设置</span>
					</div>
					<div class="panel-form">
						
						<form class="form-horizontal" >
								<div class="form-group">
                                	   <label class="col-sm-2 control-label">数据关联表:</label>
                                  	   <div class="col-sm-10">
                                  	   		<select class="form-control"  id="customDialog" > 
		                                  		<option>-请选择-</option>
		                                  	</select>
                                  		</div>
                            	</div>
	                            <div class="form-group">
	                               		 <label class="col-sm-2 control-label">数据条件字段:</label>
	                                      <div class="col-sm-10">
	                                       		<select id="conditionfield"   class="form-control"  >
	                           			 			<option>-关联表条件字段-</option>
	                           	 				</select>
	                           	 			</div>
	                            </div>
	                            <div  class="form-group row " >
	                            		<div class="col-sm-12">
	                            		<table  class=" table table-bordered ">
	                            			<thead>
	                            				<tr>
	                            					<td>查询返回字段	</td>
	                            					<td>绑定数据字段</td>
	                            				</tr>
	                            			</thead>
	                            			<tbody id="resultfieldTb">
	                            				 	<tr>
	                            				 		<td colspan="2">请选择数据关联表</td>
	                            				 	</tr>
	                            			</tbody>
	                            			
	                            		</table>
	                           	 </div>
	                            </div>
                        </form>
                    </div> 
          <!--                   <p class="form-group col-sm-12"  style="border: 1px solid #eee;"></p>
                            <div  class="form-group col-sm-12" >
                            	<select  id="field"  class="form-control"  style="width: 200px;display:inline;">
                            		<option>-对象字段-</option>
                            	</select>
                            	值等于
                            	 <select id="conditionfield"   class="form-control"  style="width: 200px;display: inline;">
                            			 <option style="color:#FF0000;">-关联表条件字段-</option>
                            	 </select>的值时
                            	
                            </div>
                            <div  class="form-group col-sm-12" >
                            	  <label id="curField"  style="width: 185px;"></label> 联动显示 
                            	  <select  id="resultfield" class="form-control" style="width: 200px;display: inline;">
                            	    	 <option>-关联表返回字段-</option>
                            	  </select>中的对应值
                            </div> -->
				</div>
	</body>
</html>