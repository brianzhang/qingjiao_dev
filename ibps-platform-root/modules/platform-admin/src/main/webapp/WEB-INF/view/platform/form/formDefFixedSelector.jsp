<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<%@include file="/commons/include/get.jsp"%>
 	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
	 <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
	 <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PositionDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefFixedSelector.js"></script>
	
	<body>
		<div class="wrapper wrapper-content  col-sm-12">
			<div class="panel-form">
					<form class="form-horizontal" >
						<div class="form-group">
							<div class="col-sm-12">
								<input type="hidden" id="type"  value="dynamic" />
									<div class="input-group">
                                              <div class="input-group-btn">
                                                  <button type="button" class="btn   dropdown-toggle" data-toggle="dropdown"><span id="typeSpan"  >动态参数</span>
                                                      <i class="fa fa-angle-down"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                      <li>
                                                          <a href="javascript:;" class="defaultValueType" data-type="dynamic">动态参数</a>
                                                      </li>
                                                      <li>
                                                          <a href="javascript:;" class="defaultValueType"  data-type="fixed"> 固定值 </a>
                                                      </li>
                                                  </ul>
                                              </div>
                                              		 <select class="form-control " id="dynamic"> 
				                                 			<option value=""></option>
				                                 	</select>
                                              
                                              		<div class="input-group"  id="fixed" style="display: none">
														<input type="hidden" name="ownerId"  id="ownerId"  value=""/> 
					                                 	<input type="text" class="form-control "  id="ownerName" name="ownerName" readonly="readonly"/>
					                               	  	<span class="input-group-btn">
					                               	  		<button id="selector_type"  type="button" class="btn  btn-info btn-mm"  
					                               	  			 data-toggle="selectorExt" data-type="user" data-id="#ownerId" data-name="#ownerName" >
					                               	  			<i class="fa fa-user"></i></button>&nbsp;&nbsp;
					                               	  		<button type="button" class="btn  btn-info btn-mm" 
					                               	  			data-toggle="selectorExtClear" data-id="#ownerId" data-name="#ownerName" >
					                               	  			<i class="fa fa-times"></i></button> 
					                               	  	</span>
				                                 	</div>
				                        
                                              
                                         </div>
							</div>
						</div>
                     </form>
	            </div>
		</div>
	</body>
</html>