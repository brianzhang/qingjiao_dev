<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/codegen/cgxq.js"></script>
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
					<form  class="fr-form"  id="cgxqFormGet" >
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq.projectName}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购计划编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq.purchasePlanCode}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">登记日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${cgxq.registerDate}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申报部门</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:cgxq:"  data-rights="r">
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
				<div class="fr-selector" data-toggle="selector" data-type="org" data-bind-id="m:cgxq:"  data-rights="r">
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
			<p class="form-control-static">${cgxq.purchaseAmount}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">采购预算指标</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq.purBudgetIndex}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目类型</label>
				  	<div class="fr-form-block">
			 <p class="form-control-static">${f:getDictLabel2(cgxq.projectType,'test', 'key','path','/', '')}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">项目所属预算年度</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${cgxq.budgetYear}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">投标人资格要求</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq.bidderQualiRequire}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${cgxq.remark}</p>
				 	</div>
			  	</div>
			</div>
			  		<table name="s:cgqd" class="table table-bordered table-hover table-condensed">
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
				<c:forEach var="cgqd" items="${cgxq.cgqdPoList}">	
					<tr>	
				 		<td>
			<p class="form-control-static">${cgqd.purchaseItem}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd.purItemName}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd.purchaseNumber}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd.marketRefePrice}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd.subtotal}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd.demandDate}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd.description}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd.operateDate}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgqd.operator}</p>
						</td>	
					</tr>
				</c:forEach>
			</tbody>
		</table>
	  		<table name="s:cgxqfj" class="table table-bordered table-hover table-condensed">
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
				<c:forEach var="cgxqfj" items="${cgxq.cgxqfjPoList}">	
					<tr>	
				 		<td>
			<p class="form-control-static">${cgxqfj.documentName}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgxqfj.selectAttachment}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${cgxqfj.remark}</p>
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