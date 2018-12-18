<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/cgxq1.js"></script>
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
				<form  class="fr-form"  id="cgxq1Form" action="save.htm" >
					<input type="hidden" name="m:cgxq1:id"  value="${cgxq1.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq1:pur_pro_name_" value="${cgxq1.pur_pro_name_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购计划编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq1:pur_plan_code_" value="${cgxq1.pur_plan_code_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">登记日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:cgxq1:pur_reg_date_"   value="${cgxq1.pur_reg_date_}" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申报部门</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq1:pur_apply_dept_" value="${cgxq1.pur_apply_dept_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购执行部门</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq1:pur_opera_dept_" value="${cgxq1.pur_opera_dept_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购金额</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:cgxq1:pur_amount_"  value="${cgxq1.pur_amount_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购预算指标</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq1:pur_bu_index_" value="${cgxq1.pur_bu_index_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq1:pur_pro_type_" value="${cgxq1.pur_pro_type_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目所属预算年度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq1:pur_pro_bud_year_" value="${cgxq1.pur_pro_bud_year_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">投标人资格要求</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq1:pur_zg_require_" value="${cgxq1.pur_zg_require_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:cgxq1:pur_remark_" value="${cgxq1.pur_remark_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
	  		<table name="s:cgqd1" data-mode="inner" data-required="" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">采购清单</div>
				<div class="fr-table-tools">
							<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
							<a class="btn btn-danger fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
				</div>
			</caption>
			<thead>
				<tr>
		     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:cgqd1" type="checkbox"></th>
	       			 <th>采购项品目</th>
	       			 <th>采购项名称</th>
	       			 <th>采购数量</th>
	       			 <th>市场参考价</th>
	       			 <th>需求时间</th>
	       			 <th>说明</th>
		      	<th class="fr_table_col_remove" width="45px">管理</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach varStatus="stat" var="cgqd1" items="${cgxq1.cgqd1PoList}">	
					<tr>	
						<td><input role="checkbox" class="cbox " type="checkbox" name="s:cgqd1" ></td>
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:cgqd1:pur_goods_item_:${stat.index+1}" value="${cgqd1.pur_goods_item_}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:cgqd1:pur_goods_name_:${stat.index+1}" value="${cgqd1.pur_goods_name_}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="number"  class="fr-form-control"  name="s:cgqd1:pur_number_:${stat.index+1}"  value="${cgqd1.pur_number_}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<input type="number"  class="fr-form-control"  name="s:cgqd1:pur_market_price_:${stat.index+1}"  value="${cgqd1.pur_market_price_}" validate="{required:false}"/>
												</td>	
				 		<td>
							
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s:cgqd1:pur_require_date_:${stat.index+1}"   value="${cgqd1.pur_require_date_}" validate="{required:false}"/>
				</div>
												</td>	
				 		<td>
							
				<input type="text" class="fr-form-control" name="s:cgqd1:pur_explain_:${stat.index+1}" value="${cgqd1.pur_explain_}" validate="{required:false}"/>
												</td>	
						<td class="fr_table_col_remove" width="45px">
									
								<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
	<script type="text/html" id="s:cgqd1:TrTemplate">
	 
		<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:cgqd1" ></td>
	 	 	 	 	 	 	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:cgqd1:pur_goods_item_:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:cgqd1:pur_goods_name_:{{idx}}"  validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="number"  class="fr-form-control"  name="s:cgqd1:pur_number_:{{idx}}"   validate="{required:false}"/>
			</td>
	 	 	 <td>
				<input type="number"  class="fr-form-control"  name="s:cgqd1:pur_market_price_:{{idx}}"   validate="{required:false}"/>
			</td>
	 	 	 <td>
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="s:cgqd1:pur_require_date_:{{idx}}"    validate="{required:false}"/>
				</div>
			</td>
	 	 	 <td>
				<input type="text" class="fr-form-control" name="s:cgqd1:pur_explain_:{{idx}}"  validate="{required:false}"/>
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