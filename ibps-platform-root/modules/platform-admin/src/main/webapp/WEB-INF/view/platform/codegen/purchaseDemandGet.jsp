
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/purchaseDemand.js"></script>
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
					<form  class="fr-form"  id="purchaseDemandFormGet" >
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${purchaseDemand.projectName}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购计划编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${purchaseDemand.purchasePlanCode}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">登记日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${purchaseDemand.registerDate}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申报部门</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:purchaseDemand:"  data-rights="r">
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
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:purchaseDemand:"  data-rights="r">
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
			<p class="form-control-static">${purchaseDemand.purchaseAmount}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购预算指标</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${purchaseDemand.purBudgetIndex}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目类型</label>
				  	<div class="fr-form-block">
			 <p class="form-control-static">${f:getDictLabel2(purchaseDemand.projectType,'projectType', 'key','path','/', '')}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目所属预算年度</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${purchaseDemand.budgetYear}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">投标人资格要求</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${purchaseDemand.bidderQualiRequire}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${purchaseDemand.remark}</p>
				 	</div>
			  	</div>
			</div>
			  
		<table name="s:" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">采购清单</div>
			</caption>
			<thead>
				<tr>
	       			 <th>采购项品目</th>
	       			 <th>采购项名称</th>
	       			 <th>采购数量</th>
	       			 <th>市场参考价</th>
	       			 <th>小计</th>
	       			 <th>需求时间</th>
	       			 <th>说明</th>
	       			 <th>操作时间</th>
	       			 <th>操作人</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach var="" items="${purchaseDemand.PoList}">	
					<tr>	
				 		<td>
			<p class="form-control-static">${.purchaseItem}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.purItemName}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.purchaseNumber}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.marketRefePrice}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.subtotal}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.demandDate}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.description}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.operateDate}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.operator}</p>
						</td>	
					</tr>
				</c:forEach>
			</tbody>
		</table>
	  
		<table name="s:" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">采购需求附件</div>
			</caption>
			<thead>
				<tr>
	       			 <th>文档名称</th>
	       			 <th>选择附件</th>
	       			 <th>备注</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach var="" items="${purchaseDemand.PoList}">	
					<tr>	
				 		<td>
			<p class="form-control-static">${.documentName}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.selectAttachment}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${.remark}</p>
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
