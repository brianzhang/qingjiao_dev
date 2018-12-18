
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/purchaseDemand.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="purchaseDemandForm" action="save.htm" >
					<input type="hidden" name="m:purchaseDemand:id"  value="${purchaseDemand.id}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:purchaseDemand:projectName" value="${purchaseDemand.projectName}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购计划编号</label>
				  	<div class="fr-form-block">
				<div class="input-icon">
					<i class="fa fa-list-ol"></i>
					<input type="text"  readonly="readonly" class="fr-form-control" data-toggle="autoNumber"  data-identity="purchasePlanCode" data-init="true"   name="m:purchaseDemand:purchasePlanCode"  value="${purchaseDemand.purchasePlanCode}" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">登记日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:purchaseDemand:registerDate"   value="<fmt:formatDate value="${purchaseDemand.registerDate}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申报部门</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:purchaseDemand:"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:purchaseDemand:declareDepart" >${purchaseDemand.declareDepart}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购执行部门</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:purchaseDemand:"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:purchaseDemand:purchaseOperateOrg" >${purchaseDemand.purchaseOperateOrg}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购金额</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:purchaseDemand:purchaseAmount"  value="${purchaseDemand.purchaseAmount}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购预算指标</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:purchaseDemand:purBudgetIndex" value="${purchaseDemand.purBudgetIndex}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目类型</label>
				  	<div class="fr-form-block">
				 <input type="hidden" id="projectType" name="m:purchaseDemand:projectType"  value="${purchaseDemand.projectType}"/>
				<input type="text" readonly="readonly"  class="fr-form-control comboTree"
						 data-toggle="dictionary"   data-dic="projectType" data-key="#projectType"
						 data-select_mode="leaf"
						 data-display_mode="path"
						 data-split="/"
		                 value="${f:getDictLabel2(purchaseDemand.projectType,'projectType', 'key','path','/', '')}"  validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目所属预算年度</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy"   name="m:purchaseDemand:budgetYear"   value="<fmt:formatDate value="${purchaseDemand.budgetYear}"  pattern="yyyy"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">投标人资格要求</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:purchaseDemand:bidderQualiRequire"  validate="{required:false}">${purchaseDemand.bidderQualiRequire}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:purchaseDemand:remark"  validate="{required:false}">${purchaseDemand.remark}</textarea>
				 	</div>
			  	</div>
			</div>
					<input type="hidden" name="m:purchaseDemand:acceptStatus"  value="${purchaseDemand.acceptStatus}"/>
					<input type="hidden" name="m:purchaseDemand:auditStatus"  value="${purchaseDemand.auditStatus}"/>
	  
		<table name="s:" data-mode="inner" data-required="" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">采购清单</div>
				<div class="fr-table-tools">
							<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
							<a class="btn btn-danger fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
				</div>
			</caption>
			<thead>
				<tr>
		     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:" type="checkbox"></th>
	       			 <th>采购项品目</th>
	       			 <th>采购项名称</th>
	       			 <th>采购数量</th>
	       			 <th>市场参考价</th>
	       			 <th>小计</th>
	       			 <th>需求时间</th>
	       			 <th>说明</th>
	       			 <th>操作时间</th>
	       			 <th>操作人</th>
		      	<th class="fr_table_col_remove" width="45px">管理</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach varStatus="stat" var="v" items="${purchaseDemand.PoList}">	
					<tr>	
						<td><input role="checkbox" class="cbox " type="checkbox" name="s:" ></td>
				 		<td>
							
				<input type="text" class="fr-form-control" name="s::purchaseItem:${stat.index+1}" value="${v.purchaseItem}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s::purItemName:${stat.index+1}" value="${v.purItemName}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="number"  class="fr-form-control"  name="s::purchaseNumber:${stat.index+1}"  value="${v.purchaseNumber}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="number"  class="fr-form-control"  name="s::marketRefePrice:${stat.index+1}"  value="${v.marketRefePrice}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="number"  class="fr-form-control"  name="s::subtotal:${stat.index+1}"  value="${v.subtotal}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s::demandDate:${stat.index+1}"   value="${v.demandDate}" validate="{required:false}"/>
				</div>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s::description:${stat.index+1}" value="${v.description}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s::operateDate:${stat.index+1}"   value="${.operateDate}" validate="{required:false}"/>
				</div>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s::operator:${stat.index+1}" value="${v.operator}" validate="{required:false}"/>
												</td>	
						<td class="fr_table_col_remove" width="45px">
									
								<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
	<script type="text/html" id="s::TrTemplate">
	 
		<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:" ></td>
	 	 	 	 	 	 	 	 	 <td>
				<input type="text" class="fr-form-control" name="s::purchaseItem:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s::purItemName:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="number"  class="fr-form-control"  name="s::purchaseNumber:{{idx}}"   validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="number"  class="fr-form-control"  name="s::marketRefePrice:{{idx}}"   validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="number"  class="fr-form-control"  name="s::subtotal:{{idx}}"   validate="{required:false}"/>
			</td>
	 	 	 <td>
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s::demandDate:{{idx}}"    validate="{required:false}"/>
				</div>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s::description:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s::operateDate:{{idx}}"    validate="{required:false}"/>
				</div>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s::operator:{{idx}}"  validate="{required:false}"/>
			</td>
		  	<td class="fr_table_col_remove" width="45px">
				<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
			</td>
		</tr>
	</script>
	  
		<table name="s:" data-mode="inner" data-required="" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">采购需求附件</div>
				<div class="fr-table-tools">
							<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
							<a class="btn btn-danger fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
				</div>
			</caption>
			<thead>
				<tr>
		     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:" type="checkbox"></th>
	       			 <th>文档名称</th>
	       			 <th>选择附件</th>
	       			 <th>备注</th>
		      	<th class="fr_table_col_remove" width="45px">管理</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach varStatus="stat" var="v" items="${purchaseDemand.PoList}">	
					<tr>	
						<td><input role="checkbox" class="cbox " type="checkbox" name="s:" ></td>
				 		<td>
							
				<input type="text" class="fr-form-control" name="s::documentName:${stat.index+1}" value="${v.documentName}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s::selectAttachment:${stat.index+1}" value="${v.selectAttachment}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<textarea class="fr-form-control fr-control-textarea"  name="s::remark:${stat.index+1}"  validate="{required:false}">${v.remark}</textarea>
												</td>	
						<td class="fr_table_col_remove" width="45px">
									
								<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
	<script type="text/html" id="s::TrTemplate">
	 
		<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:" ></td>
	 	 	 	 	 	 	 	 	 <td>
				<input type="text" class="fr-form-control" name="s::documentName:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s::selectAttachment:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<textarea class="fr-form-control fr-control-textarea"  name="s::remark:{{idx}}"  validate="{required:false}"></textarea>
			</td>
		  	<td class="fr_table_col_remove" width="45px">
				<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
			</td>
		</tr>
	</script>
</form>

			</div>
		</div>
	</body>
</html>
