<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/zhuDCRYJ.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			
			<div class="">
					<form  class="fr-form"  id="zhuDCRYJForm" ><div class="fr_response_field col-sm-12" >
    <div class ="panel panel-default">
				 <div class="fr_response_field col-sm-12" >
			               <div class="panel-heading">
				                       <div class="fr_response_field col-sm-12" >
			                                      <label class="fr-control-label" style="width:50%">主调查人意见</label>
			 	                      </div>
		                   	</div>
		      	</div>
				 <div class="panel-body">
				 	<div class="fr_response_field col-sm-3" >
			 	        <div class="fr-form-group"> 
				 	        <label class="fr-control-label" style="width:auto">借款人名称</label>
				  	           <div class="fr-form-block">
			                          <p class="form-control-static">${zhuDCRYJ.jkrmc}</p>
			              	 	</div>
			        	</div>
			    </div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">借款人信用等级/得分</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.jkrxydj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">抵押物现值</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.dywxz}</p>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">质押物现值</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.zywxz}</p>
				 	</div>
			  	</div>
			</div>
			 	
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">信用系统查询时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${zhuDCRYJ.xyxtcxsj}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">信贷系统管理系统查询是否有不良信用记录</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${zhuDCRYJ.xdxtglxtcx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">人民银行个人征信数据库查询是否有不良信用记录</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${zhuDCRYJ.rmyxgrzxsjkcx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">1. 进行贷前调查的方式：</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${zhuDCRYJ.dqdcfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">2. 借款申请人所提供贷款申请资料齐备、真实、有效：</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${zhuDCRYJ.zlqbzs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">3. 是否已核实申请人住所：</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${zhuDCRYJ.sqrzsyhs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">申请人住所地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.sqrzsdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">4. 是否已核实申请人收入：</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${zhuDCRYJ.sqrsryhs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">月均收入</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.yjsr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">借款人联系方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.jkrlxfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">借款人配偶联系方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.jkrpolxfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">担保人联系方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.dbrlxfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">担保人配偶联系方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.dbrpolxfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">共有人联系方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.gyrlxfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto"> 5. 采取以下方式核实申请人所提供担保物的情况：</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${zhuDCRYJ.hsdbwfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">6. 借款申请人、担保人是否面签：</label>
				  	<div class="fr-form-block">
				  	<p class="form-control-static">${zhuDCRYJ.dbrsfmq}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">贷款相关情况说明</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.dkxgqksm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">风险预测</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.fxyc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">拟采取的风险控制措施</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.ncqdfxkzcs}</p>
				 	</div>
			  	</div>
			</div>
 </div>
			</div>	
			</div>			
			<div class="fr_response_field col-sm-12" >
				 <div class ="panel panel-default">
				 	 <div class="panel-body">
				 	 	 <div class="fr_response_field col-sm-12" >
				 	 	 	 <p>
				 	 	 	       同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.jkrmc}</label> &nbsp&nbsp&nbsp&nbsp  
				                	授信 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static"> ${zhuDCRYJ.sxje}</label> &nbsp&nbsp&nbsp&nbsp      万元，
				                	授信期限 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.sxqx}</label> &nbsp&nbsp&nbsp&nbsp 月。  </p>
				             <p>
 		  		 	 	 	  	 	同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.jkrmc}</label>&nbsp&nbsp&nbsp&nbsp
				                	发放 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.dbfs}</label>&nbsp&nbsp&nbsp&nbsp  担保方式
				                	 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.dkfs}</label>&nbsp&nbsp&nbsp&nbsp 贷款人民币   
				                	 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.dkje}</label>&nbsp&nbsp&nbsp&nbsp万元，
				                	 期限 &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.dkqx}</label>&nbsp&nbsp&nbsp&nbsp  个月，
				                	 月利率  &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.yll}</label>&nbsp&nbsp&nbsp&nbsp  ‰，
				                	 以  &nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.ghfs}</label>&nbsp&nbsp&nbsp&nbsp方式归还。
				 	 	 	</p>
				 	 	 </div>
				 </div>
			</div>
		</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">主调查人签名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zhuDCRYJ.zdcrqm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">主调查人签字时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${zhuDCRYJ.zdcrqzsj}" /></p>		
				 	</div>
			  	</div>
			</div>
			
	</form>

			</div>
		</div>
	</body>
</html>
