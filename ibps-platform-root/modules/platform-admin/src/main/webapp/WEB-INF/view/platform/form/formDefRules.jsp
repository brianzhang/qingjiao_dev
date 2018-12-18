<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<f:link href="ztree/ztree.css"  isCommon="false" />
		<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.min.js"></script>
		<f:link href="query-builder/query-builder.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/	js/plugins/queryBuild/lib/jQuery.extendext.min.js"></script>
		<script type="text/javascript" src="${ctx}/	js/plugins/queryBuild/lib/doT.min.js"></script>
		<script type="text/javascript" src="${ctx}/	js/plugins/queryBuild/lib/interact.min.js"></script>
		<script type="text/javascript" src="${ctx}/	js/plugins/queryBuild/query-builder.min.js"></script>
		<script type="text/javascript" src="${ctx}/	js/lang/rules/zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<f:link href="bootstrap/bootstrap-multiselect.min.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-multiselect.min.js"></script>
				
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
	 <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PositionDialog.js"></script>
	 <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>		
	
	<script type="text/javascript" src="${ctx}/js/lc/commons/utils/dropdownTree.js"></script>
	<script type="text/javascript" src="${ctx }/js/plugins/underscore/underscore.min.js"></script>	
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefRules.js"></script>
		<style type="text/css">
				.btn-primary.active {
				    border-color: #e7505a  !important;
				    background-color: #e7505a  !important;
				    color: #FFFFFF;
				}
				.rule{
				    font-size: 16px;
				}
				
				.conditions{
					padding: 10px 10px 6px;
			   		border: 1px solid #DCC896;
			  	    background: #F8F8F8;
				}
				.conditions  .condition{
					display: inline-block;
				}
				
				.rule-fieldset{
				    padding: .35em .625em .75em;
				    margin: 0 2px;
				    border: 1px solid silver;
				    margin-bottom: 20px;
				}
				
				.rule-legend{
				    display: block;
				    width: 100px;
				    padding: 0;
				    font-size: 16px;
				    line-height: inherit;
				    color: #03A9F4;
				    border: 0;
				}
		</style>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content col-sm-12">
			<div class="panel-form">
				<fieldset >
					  <legend>规则设置 <div class="pull-right"><a href="javascript:void(0)" id="createRules" class="btn btn-xs btn-success"><i class="fa fa-plus"></i>&nbsp;&nbsp;创建规则</a></div></legend>
					 <p>&nbsp;</p>
					 	<div  id="builder"></div>
				</fieldset>
			</div>
		</div>
		
		<script type="text/html"  id='ruleTemp'>
			<fieldset  class="rule-fieldset">
					  			<legend class="rule-legend">规则&nbsp;&nbsp;<a href="javascript:void(0)"  class="btn btn-xs btn-danger remove-rule"><i class="fa fa fa-times-circle"></i>删除</a></legend>
					  				<div id="builder{{id}}" ></div>
					  				<div id="conditions{{id}}"  class="conditions">
					  						<div class="condition">就</div>
					  						<div class="condition">
					  							<select class="form-control condition-type"  style="width:100px;">
						  					 		<option value="show" {{if conditionType=='show'}}selected{{/if}} >显示</option>
						  					 	 	<option value="hide"  {{if conditionType=='hide'}}selected{{/if}} >隐藏</option>
						  					 	 	<option value="required"  {{if conditionType=='required'}}selected{{/if}} >必填</option>
													<option value="notrequired"  {{if conditionType=='notrequired'}}selected{{/if}} >非必填</option>
 													<option value="blank"  {{if conditionType=='blank'}}selected{{/if}} >置空</option>
					  							</select>
					  					</div>
					  					<div  class="condition">
					  							<select class="form-control condition-field"  multiple="multiple" >
			 									 {{each fields as field i}}
					  							<option value="{{field.name}}">{{field.label}}</option>
														{{/each}}
					  							</select>
					  					</div>
					  				</div>
							</fieldset>
		</script>
		
					<!-- 	 	 				<option value="read"  {{if conditionType=='read'}}selected{{/if}} >只读</option>
 													<option value="edit"  {{if conditionType=='eidt'}}selected{{/if}} >编辑</option>
						  					 	 	<option value="cascade"  {{if conditionType=='cascade'}}selected{{/if}} >级联</option> -->
		
	</body>
</html>