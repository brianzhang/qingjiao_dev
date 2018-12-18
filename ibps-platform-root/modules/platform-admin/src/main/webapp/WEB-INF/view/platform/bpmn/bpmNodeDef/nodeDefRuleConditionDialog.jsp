<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
<title>构造条件</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <%@include file="/commons/include/get.jsp" %>
  <%@include file="/commons/page/tree.jsp" %>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/nodeDefRuleConditionDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmFormVar.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
</head>
	<body class="gray-bg">
		<div class="wrapper wrapper-content col-sm-12">
			 <div class="row">
           		<div class="col-sm-3 panel-left">
					<div id="boTree" class="ztree boTree" ></div>	
					<input type="hidden"  id="defId"   value="${defId }"/>
					<input type="hidden"  id="nodeId"  value="${nodeId }"/>	
				</div>
				  <div class="col-sm-9 animated fadeInRight" style="margin-top:1em;">
					  <div class="treeFrame">
			  			<form id="formVar" class="form-horizontal" > 
						  	<div class="form-group">
                                <label class="col-sm-2 control-label"> 条件预览：</label>
                                <div class="col-sm-10">
                                   <p id="conDesc" class="form-control-static"  > [ ]    [ ]</p>
                                </div>
                            </div>
						  	
						  	<div class="form-group">
                                <label class="col-sm-2 control-label">变量目标：</label>
                                <div class="col-sm-10">
                                	<input type="hidden" class="form-control" name="label"> 
                                	<input type="text" class="form-control" name="name" disabled validate="{required:true}"> 
                                	<input type="hidden" class="form-control" name="source" > 
                                	<input type="hidden" class="form-control" name="dataType" > 
                                  </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="col-sm-2 control-label">表达式：</label>
                                <div class="col-sm-10">
                                   <div class="infont col-md-3 col-sm-4">
										<a href="javascript:void(0);" value="equals" class="btn btn-outline btn-default calTool" title="相等">相等</a>
									</div>
                                   <div class="infont col-md-3 col-sm-4">
										<a href="javascript:void(0);" value="notEquals" class="btn btn-outline btn-default calTool" title="不相等">不相等</a>
									</div>
                                   <div class="infont col-md-3 col-sm-4 ">
										<a href="javascript:void(0);" value="contains" class="btn btn-outline btn-default calTool"  title="包含">包含于</a>
									</div>
                                   <div class="infont col-md-3 col-sm-4">
										<a href="javascript:void(0);" value="notContains" class="btn btn-outline btn-default calTool" title="不包含">不包含于</a>
									</div>
									
                                   <div class="infont col-md-3 col-sm-4" name="specTool" hidden>
										<a href="javascript:void(0);" value=">" class="btn btn-outline btn-default calTool" title="大于">大于</a>
									</div>
                                   <div class="infont col-md-3 col-sm-4" name="specTool" hidden>
										<a href="javascript:void(0);" value="&lt;"  class="btn btn-outline btn-default calTool" title="小于">小于</a>
									</div>
									<div class="infont col-md-3 col-sm-4" name="specTool" hidden>
										<a href="javascript:void(0);" value=">=" class="btn btn-outline btn-default calTool" title="不相等">大于等于</a>
									</div>
									 <div class="infont col-md-3 col-sm-4" name="specTool" hidden>
										<a href="javascript:void(0);" value="&lt;=" class="btn btn-outline btn-default calTool" title="不包含">小于等于</a>
									</div>
                                </div>
                            </div>
                            
						  	<div class="form-group">
                                <label class="col-sm-2 control-label">值类型：</label>
                                <div class="col-sm-10">
                                  <div class="row">
                                		<div class="col-md-4">
                                			<select name="executorType" id="executorType" class="form-control"  onchange="ruleCondition._changeExeType()">
								       		 	<option value="user">用户</option>
								       		 	<option value="org">组织</option>
								       		 	<option value="fixed">固定值</option>
							       		 	</select>
                                		</div>
                                		<div class="col-md-3"  typeId="user">
                                			 <select name="userValType" id="userValType" class="form-control" > 
								       			<option value="userId" >userId</option>
	       		  								<option value="account">account</option>
							       		 	</select>
                                		</div>
                                		<div class="col-md-3"  typeId="org"  hidden >
                                			 <select name="orgValType" id="orgValType" class="form-control" > 
								       			 <option value="orgId">orgId</option>
	       		  								 <option value="orgKey">orgKey</option>
							       		 	</select>
                                		</div>
							       	 </div>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label"> 匹配值：</label>
                                <div class="col-sm-10">
                                    <input type="hidden" class="form-control" name="valueText"  id="valueText"> 
                                    <input type="hidden" class="form-control" name="valueId"  id="valueId"> 
                               		<div id="valueDiv" class="input-group">
                                        <input type="text" id="dt" class="form-control datetime hidden" name="value_dt" onchange="ruleCondition._changeValue(this)" readonly="readonly" validate="{date:true,required:true}"> 
                                        <input type="number" id="num" class="form-control hidden" name="value_num" onchange="ruleCondition._changeValue(this)" validate="{number:true,required:true}"> 
                                        <input type="text" id="txt" class="form-control" name="value" disabled onchange="ruleCondition._changeValue(this)" validate="{required:true}"> 
                                        <span class="input-group-btn"> 
                                        	<button type="button" class="btn btn-primary"  id="valueBut" onclick="ruleCondition._selectVal(this)">选择</button> 
                                        </span>
                                        <a href="#" style="text-decoration: none;" 
                                       		title="如果选择人员变量，则为人员变量所在的组，<br>如果选择组变量，则为该组"
											class="fa fa-exclamation-circle" data-tip></a> 
                                	</div>
                                </div>
                            </div>
			  			</form>
  				   </div>
			  </div>
			</div>
		</div>
	</body>
</html>
