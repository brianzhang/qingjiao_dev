<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/cgxq.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="cgxqForm" action="save.htm" >
					<input type="hidden" name="m:cgxq:id"  value="${cgxq.id}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq:projectName" value="${cgxq.projectName}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购计划编号</label>
				  	<div class="fr-form-block">
				<div class="input-icon">
					<i class="fa fa-list-ol"></i>
					<input type="text"  readonly="readonly" class="fr-form-control" data-toggle="autoNumber"  data-identity="purchasePlanCode" data-init="true"   name="m:cgxq:purchasePlanCode"  value="${cgxq.purchasePlanCode}" validate="{required:false}"/>
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
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:cgxq:registerDate"   value="<fmt:formatDate value="${cgxq.registerDate}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申报部门</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:cgxq:"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:cgxq:declareDepart" >${cgxq.declareDepart}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购执行部门</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:cgxq:"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:cgxq:purchaseOperateOrg" >${cgxq.purchaseOperateOrg}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购金额</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:cgxq:purchaseAmount"  value="${cgxq.purchaseAmount}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购预算指标</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq:purBudgetIndex" value="${cgxq.purBudgetIndex}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目类型</label>
				  	<div class="fr-form-block">
				 <input type="hidden" id="projectType" name="m:cgxq:projectType"  value="${cgxq.projectType}"/>
				<input type="text" readonly="readonly"  class="fr-form-control comboTree"
						 data-toggle="dictionary"   data-dic="test" data-key="#projectType"
						 data-select_mode="leaf"
						 data-display_mode="path"
						 data-split="/"
		                 value="${f:getDictLabel2(cgxq.projectType,'test', 'key','path','/', '')}"  validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目所属预算年度</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy"   name="m:cgxq:budgetYear"   value="<fmt:formatDate value="${cgxq.budgetYear}"  pattern="yyyy"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">投标人资格要求</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:cgxq:bidderQualiRequire"  validate="{required:false}">${cgxq.bidderQualiRequire}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:cgxq:remark"  validate="{required:false}">${cgxq.remark}</textarea>
				 	</div>
			  	</div>
			</div>
					<input type="hidden" name="m:cgxq:acceptStatus"  value="${cgxq.acceptStatus}"/>
					<input type="hidden" name="m:cgxq:auditStatus"  value="${cgxq.auditStatus}"/>
	  		<table name="s:cgqd" data-mode="inner" data-required="" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">采购清单</div>
				<div class="fr-table-tools">
							<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
							<a class="btn btn-danger fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
				</div>
			</caption>
			<thead>
				<tr>
		     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:cgqd" type="checkbox"></th>
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
				<c:forEach varStatus="stat" var="cgqd" items="${cgxq.cgqdPoList}">	
					<tr>	
						<td><input role="checkbox" class="cbox " type="checkbox" name="s:cgqd" ></td>
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:cgqd:purchaseItem:${stat.index+1}" value="${cgqd.purchaseItem}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:cgqd:purItemName:${stat.index+1}" value="${cgqd.purItemName}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="number"  class="fr-form-control"  name="s:cgqd:purchaseNumber:${stat.index+1}"  value="${cgqd.purchaseNumber}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="number"  class="fr-form-control"  name="s:cgqd:marketRefePrice:${stat.index+1}"  value="${cgqd.marketRefePrice}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="number"  class="fr-form-control"  name="s:cgqd:subtotal:${stat.index+1}"  value="${cgqd.subtotal}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s:cgqd:demandDate:${stat.index+1}"   value="${cgqd.demandDate}" validate="{required:false}"/>
				</div>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:cgqd:description:${stat.index+1}" value="${cgqd.description}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s:cgqd:operateDate:${stat.index+1}"   value="${cgqd.operateDate}" validate="{required:false}"/>
				</div>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:cgqd:operator:${stat.index+1}" value="${cgqd.operator}" validate="{required:false}"/>
												</td>	
						<td class="fr_table_col_remove" width="45px">
									
								<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
	<script type="text/html" id="s:cgqd:TrTemplate">
	 
		<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:cgqd" ></td>
	 	 	 	 	 	 	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:cgqd:purchaseItem:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:cgqd:purItemName:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="number"  class="fr-form-control"  name="s:cgqd:purchaseNumber:{{idx}}"   validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="number"  class="fr-form-control"  name="s:cgqd:marketRefePrice:{{idx}}"   validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="number"  class="fr-form-control"  name="s:cgqd:subtotal:{{idx}}"   validate="{required:false}"/>
			</td>
	 	 	 <td>
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s:cgqd:demandDate:{{idx}}"    validate="{required:false}"/>
				</div>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:cgqd:description:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s:cgqd:operateDate:{{idx}}"    validate="{required:false}"/>
				</div>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:cgqd:operator:{{idx}}"  validate="{required:false}"/>
			</td>
		  	<td class="fr_table_col_remove" width="45px">
				<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
			</td>
		</tr>
	</script>
	  		<table name="s:cgxqfj" data-mode="inner" data-required="" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">采购需求附件</div>
				<div class="fr-table-tools">
							<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
							<a class="btn btn-danger fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
				</div>
			</caption>
			<thead>
				<tr>
		     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:cgxqfj" type="checkbox"></th>
	       			 <th>文档名称</th>
	       			 <th>选择附件</th>
	       			 <th>备注</th>
		      	<th class="fr_table_col_remove" width="45px">管理</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach varStatus="stat" var="cgxqfj" items="${cgxq.cgxqfjPoList}">	
					<tr>	
						<td><input role="checkbox" class="cbox " type="checkbox" name="s:cgxqfj" ></td>
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:cgxqfj:documentName:${stat.index+1}" value="${cgxqfj.documentName}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:cgxqfj:selectAttachment:${stat.index+1}" value="${cgxqfj.selectAttachment}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<textarea class="fr-form-control fr-control-textarea"  name="s:cgxqfj:remark:${stat.index+1}"  validate="{required:false}">${cgxqfj.remark}</textarea>
												</td>	
						<td class="fr_table_col_remove" width="45px">
									
								<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
	<script type="text/html" id="s:cgxqfj:TrTemplate">
	 
		<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:cgxqfj" ></td>
	 	 	 	 	 	 	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:cgxqfj:documentName:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:cgxqfj:selectAttachment:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<textarea class="fr-form-control fr-control-textarea"  name="s:cgxqfj:remark:{{idx}}"  validate="{required:false}"></textarea>
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