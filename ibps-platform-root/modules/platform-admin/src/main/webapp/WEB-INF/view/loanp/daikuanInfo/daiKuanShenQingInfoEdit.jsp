<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/daikuanInfo/daiKuanShenQingInfo.js"></script>
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
		
	    	   
		function checkRate(){
		  	  var  lianxi = window.document.getElementById("rate");
		  	   var  lianxicode = lianxi.value;
		  	   var  path2 = /^(0|([1-9]\d*))(\.\d{3})(‰)$/;
		  	   if(!(path2.test(lianxicode))){ 
		  		   DialogUtil.msg("请正确填写利率",
		  					function(rtn) { 
		  					});
		  	    }
		    }
		
		function checkNumber(){
		  	  var  lianxi = window.document.getElementById("phone");
		  	   var  lianxicode = lianxi.value;
		  	   var  path2 = /^[0-9]*$|\s /;
		  	   if(!(path2.test(lianxicode))){ 
		  		   DialogUtil.msg("请填写正确的电话号码",
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
					<a href="${ctx }/loanp/apply/applyMoney/list.htm?tx=0"  class="btn btn-primary fa fa-back" ><span>返回</span></a>				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="daiKuanShenQingInfoForm" action="save.htm?jdid=${jdid}" >
					<input type="hidden" name="m:daiKuanShenQingInfo:id"  value="${daiKuanShenQingInfo.id}"/>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:khmc" value="${daiKuanShenQingInfo.khmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请授信额度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="comin"  onblur="checkMoneys('comin');"  name="m:daiKuanShenQingInfo:sqsxed" value="${daiKuanShenQingInfo.sqsxed}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请授信期限</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:sqsxqx" value="${daiKuanShenQingInfo.sqsxqx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">授信总额</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="comein"  onblur="checkMoneys('comein');"  name="m:daiKuanShenQingInfo:sxze" value="${daiKuanShenQingInfo.sxze}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">产品名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:cpmc" value="${daiKuanShenQingInfo.cpmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">申请金额 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"   id="cominss"  onblur="checkMoneys('cominss');"  name="m:daiKuanShenQingInfo:sqje" value="${daiKuanShenQingInfo.sqje}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款形式</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:dkxs"  value="${daiKuanShenQingInfo.dkxs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.dkxs=='1'}">selected="selected"</c:if>>新增</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.dkxs=='2'}">selected="selected"</c:if>>收回再贷</option>
				    <option value="3" <c:if test="${daiKuanShenQingInfo.dkxs=='3'}">selected="selected"</c:if>>借新换旧</option>
				    <option value="4" <c:if test="${daiKuanShenQingInfo.dkxs=='4'}">selected="selected"</c:if>>重组</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">期限类别</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:qxlb" value="${daiKuanShenQingInfo.qxlb}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款期限</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:dkqx" value="${daiKuanShenQingInfo.dkqx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保方式</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:daiKuanShenQingInfo:dbfs" class="ibps" value="1" <c:if test="${fn:contains(daiKuanShenQingInfo.dbfs, '1')}">checked="checked"</c:if> validate="{required:false}"/>
					   	<span class="lbl">质押</span>
				  </label>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:daiKuanShenQingInfo:dbfs" class="ibps" value="2" <c:if test="${fn:contains(daiKuanShenQingInfo.dbfs, '2')}">checked="checked"</c:if> validate="{required:false}"/>
					   	<span class="lbl">抵押</span>
				  </label>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:daiKuanShenQingInfo:dbfs" class="ibps" value="3" <c:if test="${fn:contains(daiKuanShenQingInfo.dbfs, '3')}">checked="checked"</c:if> validate="{required:false}"/>
					   	<span class="lbl">保证</span>
				  </label>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:daiKuanShenQingInfo:dbfs" class="ibps" value="4" <c:if test="${fn:contains(daiKuanShenQingInfo.dbfs, '4')}">checked="checked"</c:if> validate="{required:false}"/>
					   	<span class="lbl">信用</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">合同性质</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:htxz"  value="${daiKuanShenQingInfo.htxz}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.htxz=='1'}">selected="selected"</c:if>>非高额合同</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.htxz=='2'}">selected="selected"</c:if>>一般高额合同</option>
				    <option value="3" <c:if test="${daiKuanShenQingInfo.htxz=='3'}">selected="selected"</c:if>>循环高额合同</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">行（社）定利率</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="rate"  onblur="checkRate();"  name="m:daiKuanShenQingInfo:xdll" value="${daiKuanShenQingInfo.xdll}‰" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">执行利率</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="rate"  onblur="checkRate();" name="m:daiKuanShenQingInfo:zxll" value="${daiKuanShenQingInfo.zxll}‰" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">基准利率 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"   id="rate"  onblur="checkRate();" name="m:daiKuanShenQingInfo:jzll" value="${daiKuanShenQingInfo.jzll}‰" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否优惠</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:sfyh"  value="${daiKuanShenQingInfo.sfyh}" validate="{required:false}">
					 <option value="2" <c:if test="${daiKuanShenQingInfo.sfyh=='2'}">selected="selected"</c:if>>否</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.sfyh=='1'}">selected="selected"</c:if>>是</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">利率调整方式</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:lldzfs"  value="${daiKuanShenQingInfo.lldzfs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.lldzfs=='1'}">selected="selected"</c:if>>月调（对月一号</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.lldzfs=='2'}">selected="selected"</c:if>>月调（对月对日）</option>
				    <option value="3" <c:if test="${daiKuanShenQingInfo.lldzfs=='3'}">selected="selected"</c:if>>季调（对月一号</option>
				    <option value="4" <c:if test="${daiKuanShenQingInfo.lldzfs=='4'}">selected="selected"</c:if>>季调（对月对日）</option>
				    <option value="5" <c:if test="${daiKuanShenQingInfo.lldzfs=='5'}">selected="selected"</c:if>>年调（一月一号）</option>
				    <option value="6" <c:if test="${daiKuanShenQingInfo.lldzfs=='6'}">selected="selected"</c:if>>年调（对年对月对日）</option>
				    <option value="7" <c:if test="${daiKuanShenQingInfo.lldzfs=='7'}">selected="selected"</c:if>>立即调整</option>
				    <option value="8" <c:if test="${daiKuanShenQingInfo.lldzfs=='8'}">selected="selected"</c:if>>固定</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">浮动比例</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:fdbl"  id="rate"  onblur="checkRate();" value="${daiKuanShenQingInfo.fdbl}‰" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">结息方式</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:jxfs"  value="${daiKuanShenQingInfo.jxfs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.jxfs=='1'}">selected="selected"</c:if>>利随本清</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.jxfs=='2'}">selected="selected"</c:if>>每月20日结息</option>
				    <option value="3" <c:if test="${daiKuanShenQingInfo.jxfs=='3'}">selected="selected"</c:if>>每季末20日结息</option>
				    <option value="4" <c:if test="${daiKuanShenQingInfo.jxfs=='4'}">selected="selected"</c:if>>每年12月20日结息</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">还款来源</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:hkly"  value="${daiKuanShenQingInfo.hkly}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.hkly=='1'}">selected="selected"</c:if>>薪酬收入</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.hkly=='2'}">selected="selected"</c:if>>生产经营收入</option>
				    <option value="3" <c:if test="${daiKuanShenQingInfo.hkly=='3'}">selected="selected"</c:if>>补贴收入</option>
				    <option value="4" <c:if test="${daiKuanShenQingInfo.hkly=='4'}">selected="selected"</c:if>>其他收入</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有还款计划</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:sfyhkjh"  value="${daiKuanShenQingInfo.sfyhkjh}" validate="{required:false}">
				    <option value="2" <c:if test="${daiKuanShenQingInfo.sfyhkjh=='2'}">selected="selected"</c:if>>否</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.sfyhkjh=='1'}">selected="selected"</c:if>>是</option>
				    
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否政府承诺还款</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:sfzfcnhk"  value="${daiKuanShenQingInfo.sfzfcnhk}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.sfzfcnhk=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.sfzfcnhk=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否合作项目贷款</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:sfhzxmdk"  value="${daiKuanShenQingInfo.sfhzxmdk}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.sfhzxmdk=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.sfhzxmdk=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否涉农贷款 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:sfsndk"  value="${daiKuanShenQingInfo.sfsndk}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.sfsndk=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.sfsndk=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">涉农贷款类别</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:sndklb" value="${daiKuanShenQingInfo.sndklb}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">涉农贷款用途</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:sndkyt" value="${daiKuanShenQingInfo.sndkyt}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款投向</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:dktx" value="${daiKuanShenQingInfo.dktx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款用途 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:dkyt" value="${daiKuanShenQingInfo.dkyt}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款用途明细</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:dkytmx" value="${daiKuanShenQingInfo.dkytmx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否接受短息通</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:sfjsdxt"  value="${daiKuanShenQingInfo.sfjsdxt}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.sfjsdxt=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.sfjsdxt=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:lxrmc" value="${daiKuanShenQingInfo.lxrmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人手机号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="phone"   onblur="checkNumber();"  name="m:daiKuanShenQingInfo:lxrsjh" value="${daiKuanShenQingInfo.lxrsjh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">支付方式</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:zffs"  value="${daiKuanShenQingInfo.zffs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.zffs=='1'}">selected="selected"</c:if>>自主支付</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.zffs=='2'}">selected="selected"</c:if>>受托支付</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否自动扣款</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:sfzdkk"  value="${daiKuanShenQingInfo.sfzdkk}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.sfzdkk=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.sfzdkk=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">自动扣款账号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:daiKuanShenQingInfo:zdkkzh" value="${daiKuanShenQingInfo.zdkkzh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">还款方式</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:daiKuanShenQingInfo:hkfs"  value="${daiKuanShenQingInfo.hkfs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${daiKuanShenQingInfo.hkfs=='1'}">selected="selected"</c:if>>按计划还本、按季结息法</option>
				    <option value="2" <c:if test="${daiKuanShenQingInfo.hkfs=='2'}">selected="selected"</c:if>>按计划还本按月结息法</option>
				    <option value="3" <c:if test="${daiKuanShenQingInfo.hkfs=='3'}">selected="selected"</c:if>>按计划还本、利随本清</option>
				    <option value="4" <c:if test="${daiKuanShenQingInfo.hkfs=='4'}">selected="selected"</c:if>>按季结息（20日）到期一次性还本法</option>
				    <option value="5" <c:if test="${daiKuanShenQingInfo.hkfs=='5'}">selected="selected"</c:if>>按年结息（12月20日）到期一次性还本法</option>
				    <option value="6" <c:if test="${daiKuanShenQingInfo.hkfs=='6'}">selected="selected"</c:if>>按月等额本金还款法</option>
				    <option value="7" <c:if test="${daiKuanShenQingInfo.hkfs=='7'}">selected="selected"</c:if>>按月等额本息还款法</option>
				    <option value="8" <c:if test="${daiKuanShenQingInfo.hkfs=='8'}">selected="selected"</c:if>>按月结息（20日）、到期一次性还本法</option>
				    <option value="9" <c:if test="${daiKuanShenQingInfo.hkfs=='9'}">selected="selected"</c:if>>利随本清</option>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
