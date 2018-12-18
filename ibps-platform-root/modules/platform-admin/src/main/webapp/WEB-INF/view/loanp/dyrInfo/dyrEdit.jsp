<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/dyrInfo/dyr.js"></script>
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
					<a href="${ctx}/loanp/diyarenAll/dyr_All/list.htm?jdid=${jdid}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="dyrForm" action="save.htm?jdid=${jdid}" >
					<input type="hidden" name="m:dyr:id"  value="${dyr.id}"/>
					<div class="fr_response_field col-sm-12" >
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dyr" value="${dyr.dyr}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有户籍证明</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:sfyhjzm"  value="${dyr.sfyhjzm}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.sfyhjzm=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${dyr.sfyhjzm=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人与借款人关系</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dyryjkrgx" value="${dyr.dyryjkrgx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人证件类型 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dyrzjlx"  value="${dyr.dyrzjlx}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dyrzjlx=='1'}">selected="selected"</c:if>>营业执照</option>
				    <option value="2" <c:if test="${dyr.dyrzjlx=='2'}">selected="selected"</c:if>>身份证</option>
				</select>
				 	</div>
			  	</div>
			</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人证件号码 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  name="m:dyr:dyrzjhm" value="${dyr.dyrzjhm}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人婚姻状况</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dyrhyzk" value="${dyr.dyrhyzk}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人配偶名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dyrpomc" value="${dyr.dyrpomc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人配偶证件类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dyrpozjlx" value="${dyr.dyrpozjlx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押人配偶证件号码</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"   name="m:dyr:dyrpozjhm" value="${dyr.dyrpozjhm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否共有</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dywsfgy"  value="${dyr.dywsfgy}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dywsfgy=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${dyr.dywsfgy=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物共有权人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywgyqr" value="${dyr.dywgyqr}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">共有方式</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:gyfs"  value="${dyr.gyfs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.gyfs=='1'}">selected="selected"</c:if>>共同共有比例</option>
				    <option value="2" <c:if test="${dyr.gyfs=='2'}">selected="selected"</c:if>>（按份）共有</option>
				</select>
				 	</div>
			  	</div>
			</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物名称 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywmc" value="${dyr.dywmc}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物位置</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywwz" value="${dyr.dywwz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物取得方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywqdfs" value="${dyr.dywqdfs}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物种类 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dywzl"  value="${dyr.dywzl}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dywzl=='1'}">selected="selected"</c:if>>土地使用权</option>
				    <option value="2" <c:if test="${dyr.dywzl=='2'}">selected="selected"</c:if>>住宅</option>
				    <option value="3" <c:if test="${dyr.dywzl=='3'}">selected="selected"</c:if>>门市、商店、店铺、车库</option>
				    <option value="4" <c:if test="${dyr.dywzl=='4'}">selected="selected"</c:if>>工业厂房、仓库</option>
				    <option value="5" <c:if test="${dyr.dywzl=='5'}">selected="selected"</c:if>>办公用房、办公楼</option>
				    <option value="6" <c:if test="${dyr.dywzl=='6'}">selected="selected"</c:if>>宾馆、酒店</option>
				    <option value="7" <c:if test="${dyr.dywzl=='7'}">selected="selected"</c:if>>问题娱乐用房</option>
				    <option value="8" <c:if test="${dyr.dywzl=='8'}">selected="selected"</c:if>>多功能建筑（综合楼宇）</option>
				    <option value="9" <c:if test="${dyr.dywzl=='9'}">selected="selected"</c:if>>荒地等土地承包经营权抵押</option>
				    <option value="10" <c:if test="${dyr.dywzl=='10'}">selected="selected"</c:if>>水域滩涂使用权</option>
				    <option value="11" <c:if test="${dyr.dywzl=='11'}">selected="selected"</c:if>>林权抵押</option>
				    <option value="12" <c:if test="${dyr.dywzl=='12'}">selected="selected"</c:if>>农机具等农用生产设备抵押</option>
				    <option value="13" <c:if test="${dyr.dywzl=='13'}">selected="selected"</c:if>>交通运输工具抵押</option>
				    <option value="14" <c:if test="${dyr.dywzl=='14'}">selected="selected"</c:if>>机器设备抵押</option>
				    <option value="15" <c:if test="${dyr.dywzl=='15'}">selected="selected"</c:if>>原材料、半成品、产品抵押</option>
				    <option value="16" <c:if test="${dyr.dywzl=='16'}">selected="selected"</c:if>>在建工程</option>
				    <option value="17" <c:if test="${dyr.dywzl=='17'}">selected="selected"</c:if>>其他抵押</option>
				</select>
				 	</div>
			  	</div>
			</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">房屋预登记</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:fwydj"  value="${dyr.fwydj}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.fwydj=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${dyr.fwydj=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">房屋结构</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:fwjg"  value="${dyr.fwjg}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.fwjg=='1'}">selected="selected"</c:if>>砖木结构</option>
				    <option value="2" <c:if test="${dyr.fwjg=='2'}">selected="selected"</c:if>>砖混结构</option>
				    <option value="3" <c:if test="${dyr.fwjg=='3'}">selected="selected"</c:if>>钢筋混凝土结构</option>
				    <option value="4" <c:if test="${dyr.fwjg=='4'}">selected="selected"</c:if>>钢结构</option>
				    <option value="5" <c:if test="${dyr.fwjg=='5'}">selected="selected"</c:if>>其他结构</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 <div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">房产层数</label>
				  	<div class="fr-form-block">
				           <input type="text" class="fr-form-control" name="m:dyr:fccs" value="${dyr.fccs}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">房产所在层数</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:fcszcs" value="${dyr.fcszcs}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywbh" value="${dyr.dywbh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否拥有土地使用权证书</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dywsfyytdsyqzs"  value="${dyr.dywsfyytdsyqzs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dywsfyytdsyqzs=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${dyr.dywsfyytdsyqzs=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物房产土地使用权人名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywfctdsyqrmc" value="${dyr.dywfctdsyqrmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权证号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dyfctdsyqzh" value="${dyr.dyfctdsyqzh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dyfctdsyqlx"  value="${dyr.dyfctdsyqlx}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="出让" <c:if test="${dyr.dyfctdsyqlx=='出让'}">selected="selected"</c:if>>出让</option>
				    <option value="划拨" <c:if test="${dyr.dyfctdsyqlx=='划拨'}">selected="selected"</c:if>>划拨</option>
				    <option value="租赁" <c:if test="${dyr.dyfctdsyqlx=='租赁'}">selected="selected"</c:if>>租赁</option>
				    <option value="其他" <c:if test="${dyr.dyfctdsyqlx=='其他'}">selected="selected"</c:if>>其他</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权面积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dyfctdsyqmj" value="${dyr.dyfctdsyqmj}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权是否</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dyfctdsyqsf"  value="${dyr.dyfctdsyqsf}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dyfctdsyqsf=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${dyr.dyfctdsyqsf=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押房产土地使用权抵押方式</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dyfctdsyqdyfs"  value="${dyr.dyfctdsyqdyfs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dyfctdsyqdyfs=='1'}">selected="selected"</c:if>>零价抵押</option>
				    <option value="2" <c:if test="${dyr.dyfctdsyqdyfs=='2'}">selected="selected"</c:if>>有价值抵押</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物详细描述 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywxxms" value="${dyr.dywxxms}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物相关证明文件 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywxgzmwj" value="${dyr.dywxgzmwj}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">购房合同/抵押物产权证号/使用权证号 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:gfhtDywcqzhSyqzh" value="${dyr.gfhtDywcqzhSyqzh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">发证机关</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:fzjg" value="${dyr.fzjg}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物原置购置价</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywyzgzj" value="${dyr.dywyzgzj}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">面积/数</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:mjS" value="${dyr.mjS}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">建成/购置时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:jcGzsj" value="${dyr.jcGzsj}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物使用年限</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywsynx" value="${dyr.dywsynx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">尚可使用年限</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:sksynx" value="${dyr.sksynx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">折旧率</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="rate"  onblur="checkRate();"  name="m:dyr:zjl" value="${dyr.zjl}‰" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否评估</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dywsfpg"  value="${dyr.dywsfpg}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dywsfpg=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${dyr.dywsfpg=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物评估机构 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywpgjg" value="${dyr.dywpgjg}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估方法 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:pgff"  value="${dyr.pgff}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.pgff=='1'}">selected="selected"</c:if>>重置成本法</option>
				    <option value="2" <c:if test="${dyr.pgff=='2'}">selected="selected"</c:if>>现值成本法</option>
				    <option value="3" <c:if test="${dyr.pgff=='3'}">selected="selected"</c:if>>现行市价法</option>
				    <option value="4" <c:if test="${dyr.pgff=='4'}">selected="selected"</c:if>>收益现值法</option>
				    <option value="5" <c:if test="${dyr.pgff=='5'}">selected="selected"</c:if>>其他方法</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物评估日期 *</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:dyr:dywpgrq"   value="<fmt:formatDate value="${dyr.dywpgrq}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估结论使用有效期限 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:pgjlsyyxqx" value="${dyr.pgjlsyyxqx}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">该抵押物贷款金额 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="comein"  onblur="checkMoneys('comein');" name="m:dyr:gdywdkje" value="${dyr.gdywdkje}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评估价值 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="comein"  onblur="checkMoneys('comein');"name="m:dyr:pgjz" value="${dyr.pgjz}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押率 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="rate"   onblur="checkRate();"name="m:dyr:dyl" value="${dyr.dyl}‰" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否进行抵押登记</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dywsfjxdydj"  value="${dyr.dywsfjxdydj}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dywsfjxdydj=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${dyr.dywsfjxdydj=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物登记机构 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywdjjg" value="${dyr.dywdjjg}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押登记文件号/他项权人 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dydjwjhTxqr" value="${dyr.dydjwjhTxqr}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押价值</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="comein"  onblur="checkMoneys('comein');" name="m:dyr:dyjz" value="${dyr.dyjz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押登记日</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:dyr:dydjr"   value="<fmt:formatDate value="${dyr.dydjr}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押到期日</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:dyr:dydqr"   value="<fmt:formatDate value="${dyr.dydqr}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否保险</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dywsfbx"  value="${dyr.dywsfbx}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dywsfbx=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${dyr.dywsfbx=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险机构名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:bxjgmc" value="${dyr.bxjgmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物保险单号 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dywbxdh" value="${dyr.dywbxdh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险金额</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"   id="comein"  onblur="checkMoneys('comein');" name="m:dyr:bxje" value="${dyr.bxje}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险生效日 *</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:dyr:bxsxr"   value="<fmt:formatDate value="${dyr.bxsxr}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保险到期日 *</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:dyr:bxdqr"   value="<fmt:formatDate value="${dyr.bxdqr}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第一受益人名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:dysyrmc" value="${dyr.dysyrmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抵押物是否办理公证</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:dywsfblgz"  value="${dyr.dywsfblgz}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${dyr.dywsfblgz=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${dyr.dywsfblgz=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公证机关</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:gzjg" value="${dyr.gzjg}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公证日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:dyr:gzrq"   value="<fmt:formatDate value="${dyr.gzrq}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公证书编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:gzsbh" value="${dyr.gzsbh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有协议抵押物</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:sfyxydyw"  value="${dyr.sfyxydyw}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="是" <c:if test="${dyr.sfyxydyw=='是'}">selected="selected"</c:if>>是</option>
				    <option value="否" <c:if test="${dyr.sfyxydyw=='否'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">协议抵押物详细描述</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:xydywxxms" value="${dyr.xydywxxms}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否办理公证</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:dyr:sfblgz"  value="${dyr.sfblgz}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="是" <c:if test="${dyr.sfblgz=='是'}">selected="selected"</c:if>>是</option>
				    <option value="否" <c:if test="${dyr.sfblgz=='否'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dyr:bz" value="${dyr.bz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
