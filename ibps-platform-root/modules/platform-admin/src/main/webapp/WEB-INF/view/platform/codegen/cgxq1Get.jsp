<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/cgxq1.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
					<form  class="fr-form"  id="cgxq1FormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_pro_name_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购计划编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_plan_code_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">登记日期</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_reg_date_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申报部门</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_apply_dept_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购执行部门</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_opera_dept_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_amount_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购预算指标</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_bu_index_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_pro_type_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目所属预算年度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_pro_bud_year_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">投标人资格要求</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_zg_require_}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq1.pur_remark_}</p>
				 	</div>
			  	</div>
			</div>
	  		<table name="s:cgqd1" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">采购清单</div>
			</caption>
			<thead>
				<tr>
	       			 <th>采购项品目</th>
	       			 <th>采购项名称</th>
	       			 <th>采购数量</th>
	       			 <th>市场参考价</th>
	       			 <th>需求时间</th>
	       			 <th>说明</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach var="cgqd1" items="${cgxq1.cgqd1PoList}">	
					<tr>	
				 		<td>
			<p class="form-control-static">${cgqd1.pur_goods_item_}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd1.pur_goods_name_}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd1.pur_number_}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd1.pur_market_price_}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd1.pur_require_date_}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd1.pur_explain_}</p>
						</td>	
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</form>

			</div>
		</div>
	</body>
</html>