<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/zhiyaRInfo/zhiYaPerson.js"></script>
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
		
		</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${ctx}/loanp/zhiyarenAll/zhiYaRenAll/list.htm?jdid=${jdid}" class="btn btn-primary fa fa-back" ><span>返回</span></a>				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="zhiYaPersonForm" action="save.htm?jdxxID=${jdxxID}" >
					<input type="hidden" name="m:zhiYaPerson:id"  value="${zhiYaPerson.id}"/>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物所有人名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:zywsyrmc" value="${zhiYaPerson.zywsyrmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有户籍证明</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:sfyhjzm"  value="${zhiYaPerson.sfyhjzm}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.sfyhjzm=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${zhiYaPerson.sfyhjzm=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押人证件类型 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:zyrzjlx"  value="${zhiYaPerson.zyrzjlx}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.zyrzjlx=='1'}">selected="selected"</c:if>>营业执照</option>
				    <option value="2" <c:if test="${zhiYaPerson.zyrzjlx=='2'}">selected="selected"</c:if>>身份证</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押人证件号码 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:zyrzjhm" value="${zhiYaPerson.zyrzjhm}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押人配偶证件类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:zyrpozjlx" value="${zhiYaPerson.zyrpozjlx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押人配偶名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:zyrpomc" value="${zhiYaPerson.zyrpomc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:zjhm" value="${zhiYaPerson.zjhm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物是否共有</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:zywsfgy"  value="${zhiYaPerson.zywsfgy}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.zywsfgy=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${zhiYaPerson.zywsfgy=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质物共有权人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:zwgyqr" value="${zhiYaPerson.zwgyqr}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">共有方式</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:gyfs"  value="${zhiYaPerson.gyfs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.gyfs=='1'}">selected="selected"</c:if>>共同共有比例 </option>
				    <option value="2" <c:if test="${zhiYaPerson.gyfs=='2'}">selected="selected"</c:if>>（按份）共有</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物种类</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:zywzl"  value="${zhiYaPerson.zywzl}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.zywzl=='1'}">selected="selected"</c:if>>本行存单（折）质押</option>
				    <option value="2" <c:if test="${zhiYaPerson.zywzl=='2'}">selected="selected"</c:if>>他行存单（折）质押</option>
				    <option value="3" <c:if test="${zhiYaPerson.zywzl=='3'}">selected="selected"</c:if>>国债质押 </option>
				    <option value="4" <c:if test="${zhiYaPerson.zywzl=='4'}">selected="selected"</c:if>>金融债券质押 </option>
				    <option value="5" <c:if test="${zhiYaPerson.zywzl=='5'}">selected="selected"</c:if>>其他有价证券质押</option>
				    <option value="6" <c:if test="${zhiYaPerson.zywzl=='6'}">selected="selected"</c:if>>保险单质押</option>
				    <option value="7" <c:if test="${zhiYaPerson.zywzl=='7'}">selected="selected"</c:if>>银行承兑汇票质押</option>
				    <option value="8" <c:if test="${zhiYaPerson.zywzl=='8'}">selected="selected"</c:if>>商业承兑汇票质押</option>
				    <option value="9" <c:if test="${zhiYaPerson.zywzl=='9'}">selected="selected"</c:if>>支票质押</option>
				    <option value="10" <c:if test="${zhiYaPerson.zywzl=='10'}">selected="selected"</c:if>>可转让股权、股票质押</option>
				    <option value="11" <c:if test="${zhiYaPerson.zywzl=='11'}">selected="selected"</c:if>>可转让基金份额质押</option>
				    <option value="12" <c:if test="${zhiYaPerson.zywzl=='12'}">selected="selected"</c:if>>应收账款质押</option>
				    <option value="13" <c:if test="${zhiYaPerson.zywzl=='13'}">selected="selected"</c:if>>粮补账户质押 </option>
				    <option value="14" <c:if test="${zhiYaPerson.zywzl=='14'}">selected="selected"</c:if>>出口退税权质押</option>
				    <option value="15" <c:if test="${zhiYaPerson.zywzl=='15'}">selected="selected"</c:if>>收费权质押 </option>
				    <option value="16" <c:if test="${zhiYaPerson.zywzl=='16'}">selected="selected"</c:if>>经营权、运营权利质押</option>
				    <option value="17" <c:if test="${zhiYaPerson.zywzl=='17'}">selected="selected"</c:if>>仓单，提单质押</option>
				    <option value="18" <c:if test="${zhiYaPerson.zywzl=='18'}">selected="selected"</c:if>>存货质押</option>
				    <option value="19" <c:if test="${zhiYaPerson.zywzl=='19'}">selected="selected"</c:if>>其他动产质押</option>
				    <option value="20" <c:if test="${zhiYaPerson.zywzl=='20'}">selected="selected"</c:if>>知识产权质押</option>
				    <option value="21" <c:if test="${zhiYaPerson.zywzl=='21'}">selected="selected"</c:if>>理财产品收益权质押</option>
				    <option value="22" <c:if test="${zhiYaPerson.zywzl=='22'}">selected="selected"</c:if>>其他质押</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">债券、单、折、票据等证号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:pjdzh" value="${zhiYaPerson.pjdzh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">债单、票据、债券金额 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="money"  onblur="checkMoneys('money');"name="m:zhiYaPerson:zqje" value="${zhiYaPerson.zqje}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否办理核押止付</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:sfblhyzf"  value="${zhiYaPerson.sfblhyzf}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.sfblhyzf=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${zhiYaPerson.sfblhyzf=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">本行存单（折）账号 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:bxcdzh" value="${zhiYaPerson.bxcdzh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">债单/票据/债券开始时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:zhiYaPerson:zqkssj"   value="<fmt:formatDate value="${zhiYaPerson.zqkssj}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">债单/票据/债券 截止时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:zhiYaPerson:zqjzsj"   value="<fmt:formatDate value="${zhiYaPerson.zqjzsj}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">止付单位 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:zfdw" value="${zhiYaPerson.zfdw}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">币种</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:bz"  value="${zhiYaPerson.bz}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.bz=='1'}">selected="selected"</c:if>>人民币</option>
				    <option value="2" <c:if test="${zhiYaPerson.bz=='2'}">selected="selected"</c:if>>外币</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物数量 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:zywsl" value="${zhiYaPerson.zywsl}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物是否已评估 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:zywsfypg"  value="${zhiYaPerson.zywsfypg}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.zywsfypg=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${zhiYaPerson.zywsfypg=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估机构 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:pgjg" value="${zhiYaPerson.pgjg}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估方法 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:pgff"  value="${zhiYaPerson.pgff}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.pgff=='1'}">selected="selected"</c:if>>重置成本法</option>
				    <option value="2" <c:if test="${zhiYaPerson.pgff=='2'}">selected="selected"</c:if>>现值成本法 </option>
				    <option value="3" <c:if test="${zhiYaPerson.pgff=='3'}">selected="selected"</c:if>>现行市价法</option>
				    <option value="4" <c:if test="${zhiYaPerson.pgff=='4'}">selected="selected"</c:if>>收益现值法</option>
				    <option value="5" <c:if test="${zhiYaPerson.pgff=='5'}">selected="selected"</c:if>>其他方法</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:zhiYaPerson:pgrq"   value="<fmt:formatDate value="${zhiYaPerson.pgrq}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估结论有效期限 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:pgjlyxqx" value="${zhiYaPerson.pgjlyxqx}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">该质押物贷款金额 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="money"  onblur="checkMoneys('money');" name="m:zhiYaPerson:gzywdkje" value="${zhiYaPerson.gzywdkje}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估价值 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="money"  onblur="checkMoneys('money');" name="m:zhiYaPerson:pgjz" value="${zhiYaPerson.pgjz}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押率 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="rate"  onblur="checkRate();"  name="m:zhiYaPerson:zyl" value="${zhiYaPerson.zyl}‰" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否进行质押登记 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:sfjxzydj"  value="${zhiYaPerson.sfjxzydj}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.sfjxzydj=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${zhiYaPerson.sfjxzydj=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物是否保证险</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:zywsfbzx"  value="${zhiYaPerson.zywsfbzx}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.zywsfbzx=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${zhiYaPerson.zywsfbzx=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险机构</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:bxjg" value="${zhiYaPerson.bxjg}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险金额</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="money"  onblur="checkMoneys('money');"name="m:zhiYaPerson:bxje" value="${zhiYaPerson.bxje}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">质押物是否办理公证</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zhiYaPerson:zywsfblgz"  value="${zhiYaPerson.zywsfblgz}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zhiYaPerson.zywsfblgz=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${zhiYaPerson.zywsfblgz=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第一受益人名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:dysyrmc" value="${zhiYaPerson.dysyrmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公证机关</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhiYaPerson:gzjg" value="${zhiYaPerson.gzjg}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
