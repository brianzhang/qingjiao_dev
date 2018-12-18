<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/shenCRYJ.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			
			<div class="">
					<form  class="fr-form"  id="shenCRYJForm" >
					<div class="fr_response_field col-sm-12" >
			<div class ="panel panel-default">
			<div class="fr_response_field col-sm-12" >
			<div class="panel-heading">
				 <div class="fr_response_field col-sm-12" >
			       <label class="fr-control-label" style="width:50%">审查人意见</label>
			 	</div>
			</div>
			</div>
			<div class="panel-body">	
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">1.贷款申请资料和内部运作资料齐备、真实、有效：</label>
				  	<div class="fr-form-block">
			         <p class="form-control-static">${shenCRYJ.sqzlsfyx}</p>
			  	 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">2.借款申请人具有完全民事行为能力和偿还贷款本息的能力：</label>
				  	<div class="fr-form-block">
			       <p class="form-control-static">${shenCRYJ.jksqrchnl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">3.借款申请人收入明、房产证明核实：</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${shenCRYJ.jksqrsrhs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">4.担保人身份资料、担保资料：</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${shenCRYJ.dbrsfhs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">5.担保人具备担保能力：</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${shenCRYJ.dbrdbnl}</p>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
				 <div class ="panel panel-default">
				 	 <div class="panel-body">
				 	 	 <div class="fr_response_field col-sm-12" >
				 	 	 	 <p>
				 	 	 	       同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.jksqr}</label> &nbsp&nbsp&nbsp&nbsp  
				                	授信  &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.sxje}</label> &nbsp&nbsp&nbsp&nbsp 万元，
				                	授信期限 <label class="form-control-static">${shenCRYJ.sxqx}</label> &nbsp&nbsp&nbsp&nbsp  月。  </p>
				             <p>
 		  		 	 	 	  	 	同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.jksqr}</label> &nbsp&nbsp&nbsp&nbsp  
				                	发放  &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.dbfs}</label> &nbsp&nbsp&nbsp&nbsp  担保方式
				                	 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.dklb}</label> &nbsp&nbsp&nbsp&nbsp 贷款人民币   
				                	 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.dkje}</label> &nbsp&nbsp&nbsp&nbsp 万元，
				                	 期限 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.dkqx}</label>  &nbsp&nbsp&nbsp&nbsp 个月，
				                	 月利率 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.yll}</label> &nbsp&nbsp&nbsp&nbsp  ‰，
				                	 以  &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.ghfs}</label> &nbsp&nbsp&nbsp&nbsp 方式归还。
				 	 	 	</p>
				 	 	 </div>
				 </div>
			</div>	
			</div>
			</div>
			</div>
			</div>			 	
			 
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审查人签字</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${shenCRYJ.scrqz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审查人签字时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${shenCRYJ.scrqzsj}" /></p>		
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
