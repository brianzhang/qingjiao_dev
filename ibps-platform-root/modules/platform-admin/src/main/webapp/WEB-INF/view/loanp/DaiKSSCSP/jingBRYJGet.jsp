<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/jingBRYJ.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			
			<div class="">
					<form  class="fr-form"  id="jingBRYJForm" >
 <div class ="panel panel-default">
				 <div class="fr_response_field col-sm-12" >
			               <div class="panel-heading">
				                       <div class="fr_response_field col-sm-12" >
			                                      <label class="fr-control-label" style="width:50%">经办调查人意见</label>
			 	                      </div>
		                   	</div>
		      	</div>
				  <div class="panel-body">
				 	 	 <div class="fr_response_field col-sm-12" >
				 	 	 	 <p>
				 	 	 	       同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.jksqr}</label> &nbsp&nbsp&nbsp&nbsp  
				                	授信  &nbsp&nbsp&nbsp&nbsp<label class="form-control-static"> ${jingBRYJ.sxje}</label> &nbsp&nbsp&nbsp&nbsp  万元，
				                	授信期限 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.sxqx}</label> &nbsp&nbsp&nbsp&nbsp  月。  </p>
				             <p>
 		  		 	 	 	  	 	同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.jksqr}</label> &nbsp&nbsp&nbsp&nbsp  
				                	发放  &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.dbfs}</label> &nbsp&nbsp&nbsp&nbsp 担保方式
				                	 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.dklx}</label> &nbsp&nbsp&nbsp&nbsp贷款人民币   
				                	 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.dkje}</label> &nbsp&nbsp&nbsp&nbsp 万元，
				                	 期限 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.dkqx}</label> &nbsp&nbsp&nbsp&nbsp  个月，
				                	 月利率  &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.yll}</label> &nbsp&nbsp&nbsp&nbsp    ‰，
				                	 以   &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.ghfs}</label> &nbsp&nbsp&nbsp&nbsp 方式归还。
				 	 	 	</p>
				 	 	 </div>
				 </div>
			</div>	
			</div>
		
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经办人签字</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${jingBRYJ.jbrqz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经办人签字时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${jingBRYJ.jbrqzsj}" /></p>		
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
