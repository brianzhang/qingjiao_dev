<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/danBaoCompany/danBaoCompanyInfo.js"></script>
		<script type="text/javascript"  >
		function checkMoney(tid){
	    	  var  money1 = window.document.getElementById(tid);
	    	   var  moneyValue1 = money1.value;
	    	   if(moneyValue1==null||moneyValue1==""){
	    		   return;
	    	   }
	    	   var rule = /^([0-9](\.\d{2}))$/;
	    	   
	    	  if (!(rule.test(moneyValue1))){
	    		 // alert("not 个位");
	    		  var  rule1 = /^([1-9]\d{0,2})(\,\d{3})*(\.\d{2})$/;  
	      	      if(!(rule1.test(moneyValue1))){
	      		   DialogUtil.msg("请填写正确格式的金额",
	      					function(rtn) { 
	      			              
	      					});
	      		   return;
	      	       }         
	 		   }   
	        } 
		function checkNumber(){
		  	  var  lianxi = window.document.getElementById("phone");
		  	   var  lianxicode = lianxi.value;
		  	   var  path2 = /^[0-9]*$|\s /;
		  	   if(!(path2.test(lianxicode))){ 
		  		   DialogUtil.msg("请填写正确的号码",
		  					function(rtn) { 
		  					});
		  	    }
		    }
		 function checkMoneys(tid){
	    	   var  money1 = window.document.getElementById(tid);
	    	   var  moneyValue1 = money1.value;
	    	   var  rule1 = /^([1-9]\d*)(\.\d{2})$/;   
		       if(!(rule1.test(moneyValue1))){
		      		   DialogUtil.msg("请填写正确格式的金额",
		      					function(rtn) { 
		      			              
		      					});
		       }
		}
		</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${ctx}/loanp/danbaoCompany_All/danBaoCompany_all/list.htm?jdid=${Jdid}" class="btn btn-primary fa fa-back" ><span>返回</span></a>				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="danBaoCompanyInfoForm" action="save.htm?Jdid=${Jdid}" >
					<input type="hidden" name="m:danBaoCompanyInfo:id"  value="${danBaoCompanyInfo.id}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保公司客户号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompanyInfo:dbgskhh" value="${danBaoCompanyInfo.dbgskhh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保公司客户名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompanyInfo:dbgskhmc" value="${danBaoCompanyInfo.dbgskhmc}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保性质</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompanyInfo:dbxz" value="${danBaoCompanyInfo.dbxz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">负责人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompanyInfo:fzr" value="${danBaoCompanyInfo.fzr}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系电话</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="phone"  onblur="checkNumber();" name="m:danBaoCompanyInfo:lxdh" value="${danBaoCompanyInfo.lxdh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保经营资格许可证</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompanyInfo:dbjyzgxkz" value="${danBaoCompanyInfo.dbjyzgxkz}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证金账号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompanyInfo:bzjzh" value="${danBaoCompanyInfo.bzjzh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证金分账号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompanyInfo:bzjfzh" value="${danBaoCompanyInfo.bzjfzh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证金金额</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="comein"  onblur="checkMoneys('comein');"  name="m:danBaoCompanyInfo:bzjje" value="${danBaoCompanyInfo.bzjje}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">允许放大倍数</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompanyInfo:yxfdbs" value="${danBaoCompanyInfo.yxfdbs}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开办机构</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompanyInfo:kbjg" value="${danBaoCompanyInfo.kbjg}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">生效日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:danBaoCompanyInfo:sxrq"   value="<fmt:formatDate value="${danBaoCompanyInfo.sxrq}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">到期日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:danBaoCompanyInfo:dqrq"   value="<fmt:formatDate value="${danBaoCompanyInfo.dqrq}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
